#!/usr/bin/env python3
"""Generador de vídeos del curso: diapositivas (Pillow) + narración (edge-tts) + subtítulos + capítulos.

Uso:  python generar_videos.py [id_video ...]
Requiere: ffmpeg, edge-tts (CLI) y Pillow.
"""
import importlib.util, json, os, re, subprocess, sys, wave, shutil
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

BASE = Path(__file__).resolve().parent
RAIZ = BASE.parent
SALIDA = RAIZ / "videos"
TMP = Path(os.environ.get("TMP_VIDEOS", BASE / ".tmp"))
EDGE = os.environ.get("EDGE_TTS", "/tmp/claude-1000/-home-melvin-Documentos-melvin-proyectos-claude-57-entrevista-telefonica/fe4108cb-ed2e-467c-b2a6-f45cdba25bd4/scratchpad/venv/bin/edge-tts")
VOZ = os.environ.get("VOZ", "es-ES-AlvaroNeural")
W, H = 1920, 1080
SR = 24000
PAUSA = 0.85

F_TIT = "/home/melvin/.local/share/fonts/clarity-city/ClarityCity-Bold.ttf"
F_SEMI = "/home/melvin/.local/share/fonts/clarity-city/ClarityCity-SemiBold.ttf"
F_TXT = "/usr/share/fonts/Adwaita/AdwaitaSans-Regular.ttf"
for f in (F_TIT, F_SEMI, F_TXT):
    if not Path(f).exists():
        F_TIT = F_SEMI = F_TXT = "/usr/share/fonts/liberation/LiberationSans-Bold.ttf"

BG = (11, 20, 38)
BG2 = (18, 31, 56)
TXT = (232, 238, 247)
MUTED = (148, 163, 190)
NIVEL_COLOR = {
    "Fundamentos": (45, 212, 191),
    "Metodología": (96, 165, 250),
    "Reconocimiento": (34, 211, 238),
    "Explotación web": (192, 132, 252),
    "Infra y avanzado": (244, 114, 182),
    "Entrevista": (251, 191, 36),
}
AMBAR = (251, 191, 36)


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= maxw:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def lienzo(meta, n, total):
    acc = NIVEL_COLOR.get(meta["nivel"], (45, 212, 191))
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # degradado sutil
    for y in range(H):
        k = y / H
        c = tuple(int(BG[i] * (1 - k) + BG2[i] * k) for i in range(3))
        d.line([(0, y), (W, y)], fill=c)
    # rejilla decorativa
    for x in range(1500, W, 36):
        for y in range(60, 360, 36):
            d.ellipse([x, y, x + 3, y + 3], fill=(40, 58, 92))
    # cabecera
    d.rounded_rectangle([90, 60, 90 + 22 + d.textlength(meta["nivel"].upper(), font=font(F_SEMI, 26)) + 22, 108], 24, fill=acc)
    d.text((112, 70), meta["nivel"].upper(), font=font(F_SEMI, 26), fill=BG)
    d.text((90 + 66 + d.textlength(meta["nivel"].upper(), font=font(F_SEMI, 26)), 70),
           f"Vídeo {meta['id']} · {meta['titulo']}", font=font(F_SEMI, 26), fill=MUTED)
    # pie
    d.text((90, H - 70), "Red Team Junior · Curso de pentesting para la entrevista", font=font(F_TXT, 24), fill=MUTED)
    t = f"{n} / {total}"
    d.text((W - 90 - d.textlength(t, font=font(F_SEMI, 24)), H - 70), t, font=font(F_SEMI, 24), fill=MUTED)
    d.rectangle([0, H - 8, W, H], fill=(30, 45, 75))
    d.rectangle([0, H - 8, int(W * n / total), H], fill=acc)
    return img, d, acc


def titulo(d, txt, acc, y=150):
    f = font(F_TIT, 64)
    lines = wrap(d, txt, f, W - 180)
    if len(lines) > 2:
        f = font(F_TIT, 52)
        lines = wrap(d, txt, f, W - 180)
    for ln in lines:
        d.text((90, y), ln, font=f, fill=TXT)
        y += f.size + 14
    d.rectangle([90, y + 8, 210, y + 14], fill=acc)
    return y + 50


def render_portada(meta, total):
    img, d, acc = lienzo(meta, 1, total)
    d.text((90, 300), f"VÍDEO {meta['id']}", font=font(F_SEMI, 40), fill=acc)
    y = 370
    f = font(F_TIT, 96)
    for ln in wrap(d, meta["titulo"], f, W - 260):
        d.text((90, y), ln, font=f, fill=TXT)
        y += 112
    y += 20
    for ln in wrap(d, meta.get("subtitulo", ""), font(F_TXT, 40), W - 400):
        d.text((90, y), ln, font=font(F_TXT, 40), fill=MUTED)
        y += 54
    d.rectangle([90, y + 30, 330, y + 40], fill=acc)
    return img


def render_puntos(meta, s, n, total):
    img, d, acc = lienzo(meta, n, total)
    y = titulo(d, s["titulo"], acc)
    puntos = s.get("puntos", [])
    nota = s.get("nota")
    limite = H - 130 - (190 if nota else 0)
    for size in (50, 46, 42, 38, 34, 31, 28):
        f = font(F_TXT, size)
        bloques = [wrap(d, p, f, W - 300) for p in puntos]
        alto = sum(len(b) * (size + 12) + 26 for b in bloques)
        if y + alto <= limite:
            break
    gap = 26
    for b in bloques:
        d.ellipse([100, y + size * 0.35, 100 + size * 0.42, y + size * 0.35 + size * 0.42], fill=acc)
        yy = y
        for ln in b:
            # resalta lo que va antes de ':' en la primera línea
            if yy == y and ":" in ln and ln.index(":") < 48:
                a, r = ln.split(":", 1)
                fb = font(F_SEMI, size)
                bl = yy + size * 0.9
                d.text((150, bl), a + ":", font=fb, fill=TXT, anchor="ls")
                d.text((150 + d.textlength(a + ":", font=fb), bl), r, font=f, fill=(205, 214, 230), anchor="ls")
            else:
                d.text((150, yy + size * 0.9), ln, font=f, fill=(205, 214, 230), anchor="ls")
            yy += size + 12
        y = yy + gap
    if nota:
        fn = font(F_TXT, 34)
        lines = wrap(d, nota, fn, W - 330)
        bh = len(lines) * 46 + 50
        top = H - 120 - bh
        d.rounded_rectangle([90, top, W - 90, top + bh], 18, fill=(36, 33, 20), outline=AMBAR, width=3)
        import math
        cx0, cy0 = 140, top + 45
        pts = [(cx0 + (18 if k % 2 == 0 else 8) * math.cos(-math.pi / 2 + k * math.pi / 5),
                cy0 + (18 if k % 2 == 0 else 8) * math.sin(-math.pi / 2 + k * math.pi / 5)) for k in range(10)]
        d.polygon(pts, fill=AMBAR)
        yy = top + 25
        for ln in lines:
            d.text((175, yy), ln, font=fn, fill=(250, 236, 200))
            yy += 46
    return img


def render_tabla(meta, s, n, total):
    img, d, acc = lienzo(meta, n, total)
    y = titulo(d, s["titulo"], acc)
    cols, filas = s["cols"], s["filas"]
    pesos = s.get("pesos") or [1] * len(cols)
    tw = W - 180
    anchos = [tw * p / sum(pesos) for p in pesos]
    for size in (34, 31, 28, 26, 24, 22):
        f, fb = font(F_TXT, size), font(F_SEMI, size)
        celdas = [[wrap(d, c, f, anchos[i] - 40) for i, c in enumerate(r)] for r in filas]
        alto = (size + 40) + sum(max(len(c) for c in r) * (size + 8) + 28 for r in celdas)
        if y + alto <= H - 120:
            break
    x = 90
    d.rounded_rectangle([90, y, W - 90, y + size + 40], 10, fill=acc)
    for i, c in enumerate(cols):
        d.text((x + 20, y + 18), c, font=fb, fill=BG)
        x += anchos[i]
    y += size + 40
    for k, r in enumerate(celdas):
        h = max(len(c) for c in r) * (size + 8) + 28
        d.rectangle([90, y, W - 90, y + h], fill=(22, 37, 66) if k % 2 == 0 else (17, 29, 52))
        x = 90
        for i, c in enumerate(r):
            yy = y + 14
            for ln in c:
                d.text((x + 20, yy), ln, font=fb if i == 0 else f, fill=TXT if i == 0 else (205, 214, 230))
                yy += size + 8
            x += anchos[i]
        y += h
    return img


def render_cifra(meta, s, n, total):
    img, d, acc = lienzo(meta, n, total)
    y = titulo(d, s["titulo"], acc)
    f = font(F_TIT, 230)
    c = s["cifra"]
    d.text(((W - d.textlength(c, font=f)) / 2, y + 40), c, font=f, fill=acc)
    yy = y + 340
    for ln in wrap(d, s.get("pie", ""), font(F_TXT, 42), W - 400):
        d.text(((W - d.textlength(ln, font=font(F_TXT, 42))) / 2, yy), ln, font=font(F_TXT, 42), fill=TXT)
        yy += 58
    return img


def cargar(ruta):
    spec = importlib.util.spec_from_file_location(ruta.stem, ruta)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m.VIDEOS


def tts(texto, mp3, srt):
    if mp3.exists() and srt.exists() and mp3.stat().st_size > 0:
        return
    for intento in range(4):
        r = subprocess.run([EDGE, "--voice", VOZ, "--text", texto, "--write-media", str(mp3),
                            "--write-subtitles", str(srt)], capture_output=True)
        if r.returncode == 0 and mp3.exists() and mp3.stat().st_size > 0:
            return
    raise RuntimeError(f"TTS falló: {mp3}: {r.stderr[-300:]}")


def pcm(mp3):
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", str(mp3), "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
                       capture_output=True, check=True)
    return r.stdout


def t2s(t):
    h, m, s = t.replace(",", ".").split(":")
    return int(h) * 3600 + int(m) * 60 + float(s)


def s2vtt(x):
    h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"


def parse_srt(p):
    cues = []
    for bloque in re.split(r"\n\s*\n", p.read_text(encoding="utf-8").strip()):
        ls = bloque.strip().splitlines()
        if len(ls) >= 3 and "-->" in ls[1]:
            a, b = [t2s(x.strip()) for x in ls[1].split("-->")]
            cues.append((a, b, " ".join(ls[2:])))
    return cues


def construir(v):
    vid = v["id"]
    tmp = TMP / vid
    tmp.mkdir(parents=True, exist_ok=True)
    slides = [{"tipo": "portada", "titulo": v["titulo"], "texto": v["intro"]}] + v["slides"]
    total = len(slides)
    # 1) imágenes
    for i, s in enumerate(slides, 1):
        tipo = s.get("tipo", "puntos")
        if tipo == "portada":
            img = render_portada(v, total)
        elif tipo == "tabla":
            img = render_tabla(v, s, i, total)
        elif tipo == "cifra":
            img = render_cifra(v, s, i, total)
        else:
            img = render_puntos(v, s, i, total)
        img.save(tmp / f"s{i:02d}.png")
    # 2) audio en paralelo
    with ThreadPoolExecutor(6) as ex:
        list(ex.map(lambda a: tts(a[1]["texto"], tmp / f"a{a[0]:02d}.mp3", tmp / f"a{a[0]:02d}.srt"),
                    enumerate(slides, 1)))
    # 3) unir audio + tiempos
    audio = bytearray()
    silencio = b"\x00\x00" * int(SR * PAUSA)
    t, cues, caps, lista = 0.4, [], [], []
    audio += b"\x00\x00" * int(SR * 0.4)
    for i, s in enumerate(slides, 1):
        p = pcm(tmp / f"a{i:02d}.mp3")
        dur = len(p) / 2 / SR
        for a, b, txt in parse_srt(tmp / f"a{i:02d}.srt"):
            cues.append((t + a, min(t + b, t + dur), txt))
        caps.append({"t": round(t if i > 1 else 0, 1), "titulo": s["titulo"] if i > 1 else "Introducción"})
        audio += p + silencio
        seg = dur + PAUSA + (0.4 if i == 1 else 0)
        lista.append(f"file '{tmp / f's{i:02d}.png'}'\nduration {seg:.3f}")
        t += dur + PAUSA
    lista.append(f"file '{tmp / f's{total:02d}.png'}'")
    (tmp / "lista.txt").write_text("\n".join(lista))
    with wave.open(str(tmp / "audio.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(bytes(audio))
    # 4) vídeo
    SALIDA.mkdir(exist_ok=True)
    out = SALIDA / f"video{vid}.mp4"
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(tmp / "lista.txt"),
                    "-i", str(tmp / "audio.wav"), "-vf", "fps=4,format=yuv420p", "-c:v", "libx264",
                    "-tune", "stillimage", "-preset", "medium", "-crf", "30", "-g", "40",
                    "-c:a", "aac", "-b:a", "64k", "-shortest", "-movflags", "+faststart", str(out)], check=True)
    # 5) subtítulos y póster
    vtt = ["WEBVTT", ""]
    for k, (a, b, txt) in enumerate(cues, 1):
        vtt += [str(k), f"{s2vtt(a)} --> {s2vtt(b)}", txt, ""]
    (SALIDA / f"video{vid}.vtt").write_text("\n".join(vtt), encoding="utf-8")
    Image.open(tmp / "s01.png").resize((960, 540), Image.LANCZOS).save(SALIDA / f"video{vid}.jpg", quality=82)
    palabras = sum(len(s["texto"].split()) for s in slides)
    return {"id": vid, "titulo": v["titulo"], "subtitulo": v.get("subtitulo", ""), "nivel": v["nivel"],
            "modulo": v.get("modulo"), "duracion": round(t, 1), "palabras": palabras, "capitulos": caps,
            "guion": [{"titulo": s["titulo"] if i else "Introducción", "texto": s["texto"]} for i, s in enumerate(slides)]}


def main():
    videos = []
    for f in sorted((BASE / "guiones").glob("*.py")):
        videos += cargar(f)
    filtro = set(sys.argv[1:])
    datos_p = RAIZ / "assets" / "js" / "videos-data.js"
    previos = {}
    if datos_p.exists():
        txt = datos_p.read_text(encoding="utf-8")
        previos = {d["id"]: d for d in json.loads(txt[txt.index("["):txt.rindex("]") + 1])}
    for v in videos:
        if filtro and v["id"] not in filtro:
            continue
        print(f"→ Vídeo {v['id']}: {v['titulo']}", flush=True)
        previos[v["id"]] = construir(v)
        d = previos[v["id"]]
        print(f"   {d['duracion']/60:.1f} min · {d['palabras']} palabras", flush=True)
    orden = [previos[k] for k in sorted(previos)]
    datos_p.parent.mkdir(parents=True, exist_ok=True)
    datos_p.write_text("window.VIDEOS = " + json.dumps(orden, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")


if __name__ == "__main__":
    main()
