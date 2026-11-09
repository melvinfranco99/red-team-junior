/* Contenido del curso Red Team Junior: niveles, módulos, tests, glosario y chuleta */
window.NIVELES = [
  { id: "Fundamentos", color: "basico", desc: "Redes, TCP/IP, la web por dentro, Linux y Windows: la base que todo pentester necesita." },
  { id: "Metodología", color: "intermedio", desc: "Qué es un pentest, fases, OWASP Top 10 y gestión de vulnerabilidades (CVE, CVSS)." },
  { id: "Reconocimiento", color: "recon", desc: "OSINT, superficie de ataque, escaneo con Nmap, enumeración y fuzzing." },
  { id: "Explotación web", color: "profesional", desc: "Burp Suite, inyecciones (SQLi, XSS, SSRF), control de acceso, autenticación y APIs." },
  { id: "Infra y avanzado", color: "avanzado", desc: "Contraseñas y hashes, post-explotación, scripting, IA aplicada y seguridad móvil." },
  { id: "Entrevista", color: "entrevista", desc: "Informes y PoC, preguntas técnicas, certificaciones y tus primeros 90 días." }
];

window.MODULOS = [
/* ═══════════════════ FUNDAMENTOS ═══════════════════ */
{
  id: 1, nivel: "Fundamentos", lab: "http", min: 22,
  titulo: "Redes y TCP/IP desde cero",
  resumen: "IP, puertos, el modelo OSI/TCP-IP, el saludo de tres pasos y DNS: cómo viaja la información que vas a auditar.",
  objetivos: ["Explicar qué es una IP, un puerto y un protocolo con analogías", "Entender el saludo TCP (SYN, SYN/ACK, ACK)", "Diferenciar TCP de UDP y conocer los puertos más habituales", "Saber qué hace el DNS y por qué importa en reconocimiento"],
  secciones: [
    { h: "1. La analogía del edificio", html: `<p>Imagina que cada ordenador o servidor de Internet es un <strong>edificio de oficinas</strong>:</p>
      <div class="grid3">
        <div class="mini-card"><span class="tag c">IP</span><h4>La dirección</h4><p>La <strong>dirección IP</strong> (ej. <code>192.168.1.10</code>) es la calle y el número: identifica al edificio en la red.</p></div>
        <div class="mini-card"><span class="tag i">Puerto</span><h4>La puerta</h4><p>Un <strong>puerto</strong> (0–65535) es cada puerta numerada. Detrás de cada una hay un servicio escuchando.</p></div>
        <div class="mini-card"><span class="tag d">Protocolo</span><h4>El idioma</h4><p>El <strong>protocolo</strong> (HTTP, SSH…) es el idioma que se habla en esa puerta.</p></div>
      </div>
      <p>Un pentester, antes de nada, hace un plano del edificio: <strong>qué puertas están abiertas y qué idioma se habla en cada una</strong>. Eso es escanear.</p>` },
    { h: "2. Direcciones IP: públicas y privadas", html: `<p>Hay dos versiones: <strong>IPv4</strong> (<code>192.168.0.1</code>, 4 números de 0 a 255) e <strong>IPv6</strong> (más larga, hexadecimal). Además:</p>
      <table class="tbl"><tr><th>Tipo</th><th>Rango</th><th>Para qué</th></tr>
      <tr><td>Privada</td><td><code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code></td><td>Redes internas (casa, empresa). No navegan por Internet directamente.</td></tr>
      <tr><td>Pública</td><td>El resto</td><td>Visible en Internet. Es la "superficie de ataque externa".</td></tr>
      <tr><td>Loopback</td><td><code>127.0.0.1</code> (localhost)</td><td>El propio equipo.</td></tr></table>
      <div class="callout">La <strong>notación CIDR</strong> <code>/24</code> indica cuántas direcciones abarca una red. <code>192.168.1.0/24</code> = 256 direcciones (de .0 a .255). Lo verás constantemente en Nmap.</div>` },
    { h: "3. El modelo por capas (OSI y TCP/IP)", html: `<p>La comunicación se organiza en <strong>capas</strong>, como una carta dentro de sobres dentro de sobres. Cada capa añade su "sobre" (cabecera).</p>
      <table class="tbl"><tr><th>Capa (TCP/IP)</th><th>Hace</th><th>Ejemplos</th></tr>
      <tr><td>Aplicación</td><td>Lo que ve el usuario / la app</td><td>HTTP, DNS, SSH, FTP, SMTP</td></tr>
      <tr><td>Transporte</td><td>Entrega fiable y puertos</td><td>TCP, UDP</td></tr>
      <tr><td>Internet / Red</td><td>Direccionamiento y rutas</td><td>IP, ICMP</td></tr>
      <tr><td>Enlace</td><td>La red física local</td><td>Ethernet, Wi-Fi, MAC</td></tr></table>
      <p class="muted">Truco para recordar las 7 capas OSI: <em>"Please Do Not Throw Sausage Pizza Away"</em> (Physical, Data link, Network, Transport, Session, Presentation, Application).</p>` },
    { h: "4. TCP vs UDP y el saludo de tres pasos", html: `<p><strong>TCP</strong> es como una llamada telefónica: primero saludas y confirmas que te oyen. <strong>UDP</strong> es como gritar un mensaje por la ventana: rápido, pero sin confirmación.</p>
      <div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>TCP three-way handshake</b></div><pre><span class="o">Cliente  →  Servidor</span>
<span class="p2">1)</span> <span class="hl">SYN</span>        →   "¿Puedo conectar?"
<span class="p2">2)</span>        <span class="ok2">SYN/ACK</span> ←   "Sí, adelante"
<span class="p2">3)</span> <span class="hl">ACK</span>        →   "Confirmado, hablemos"
      <span class="o">── conexión establecida ──</span></pre></div>
      <p>Entender esto es clave: el escaneo <code>-sS</code> de Nmap (SYN scan) envía solo el primer SYN y, si recibe SYN/ACK, corta con RST sin completar el saludo. Por eso se llama <strong>"medio abierto"</strong> y es más sigiloso.</p>` },
    { h: "5. Puertos que debes saberte de memoria", html: `<table class="tbl"><tr><th>Puerto</th><th>Servicio</th><th>Nota para pentest</th></tr>
      <tr><td><code>21</code></td><td>FTP</td><td>Transferencia de ficheros, a menudo en texto claro</td></tr>
      <tr><td><code>22</code></td><td>SSH</td><td>Acceso remoto seguro (Linux)</td></tr>
      <tr><td><code>23</code></td><td>Telnet</td><td>Texto claro, inseguro: hallazgo típico</td></tr>
      <tr><td><code>25 / 587</code></td><td>SMTP</td><td>Correo saliente</td></tr>
      <tr><td><code>53</code></td><td>DNS</td><td>Resolución de nombres (TCP y UDP)</td></tr>
      <tr><td><code>80</code></td><td>HTTP</td><td>Web sin cifrar</td></tr>
      <tr><td><code>139 / 445</code></td><td>SMB</td><td>Compartición Windows: muy jugoso</td></tr>
      <tr><td><code>443</code></td><td>HTTPS</td><td>Web cifrada</td></tr>
      <tr><td><code>3306</code></td><td>MySQL</td><td>Base de datos</td></tr>
      <tr><td><code>3389</code></td><td>RDP</td><td>Escritorio remoto Windows</td></tr></table>` },
    { h: "6. DNS: la agenda de contactos de Internet", html: `<p>El <strong>DNS</strong> traduce nombres (<code>telefonicatech.com</code>) a direcciones IP, como una agenda que convierte "Mamá" en su número de teléfono.</p>
      <p>Tipos de registro que verás en reconocimiento:</p>
      <table class="tbl"><tr><th>Registro</th><th>Qué contiene</th></tr>
      <tr><td><code>A / AAAA</code></td><td>IPv4 / IPv6 del dominio</td></tr>
      <tr><td><code>MX</code></td><td>Servidores de correo</td></tr>
      <tr><td><code>NS</code></td><td>Servidores de nombres</td></tr>
      <tr><td><code>TXT</code></td><td>SPF, verificaciones… (filtra info útil)</td></tr>
      <tr><td><code>CNAME</code></td><td>Alias a otro dominio</td></tr></table>
      <div class="callout tip">💡 Enumerar subdominios (<code>mail.</code>, <code>vpn.</code>, <code>dev.</code>) amplía la superficie de ataque. Lo verás en el módulo de reconocimiento.</div>` }
  ],
  claves: ["IP = dirección · Puerto = puerta · Protocolo = idioma", "TCP = fiable (handshake) · UDP = rápido sin confirmación", "22 SSH · 80 HTTP · 443 HTTPS · 445 SMB · 3389 RDP", "DNS traduce nombres a IPs"],
  entrevista: ["Explícame el saludo TCP de tres pasos", "¿Qué diferencia hay entre los puertos 80 y 443?", "¿Qué es una red /24 y cuántas IPs tiene?"],
  quiz: [
    { q: "¿Qué identifica una dirección IP?", op: ["El servicio concreto", "El equipo en la red (el 'edificio')", "El protocolo usado", "El usuario conectado"], ok: 1, exp: "La IP identifica al host; el puerto identifica el servicio dentro de él." },
    { q: "En el saludo TCP, ¿qué envía primero el cliente?", op: ["ACK", "SYN", "SYN/ACK", "RST"], ok: 1, exp: "El cliente inicia con SYN; el servidor responde SYN/ACK y el cliente confirma con ACK." },
    { q: "El puerto 445 corresponde habitualmente a…", op: ["SSH", "RDP", "SMB (compartición Windows)", "MySQL"], ok: 2, exp: "445 es SMB, muy relevante en entornos Windows." },
    { q: "¿Cuántas direcciones abarca una red /24?", op: ["24", "128", "256", "65535"], ok: 2, exp: "/24 deja 8 bits para hosts: 2^8 = 256 direcciones." },
    { q: "¿Para qué sirve el DNS?", op: ["Cifrar el tráfico", "Traducir nombres de dominio a direcciones IP", "Asignar puertos", "Escanear puertos"], ok: 1, exp: "El DNS resuelve nombres legibles a IPs." }
  ]
},
{
  id: 2, nivel: "Fundamentos", lab: "http", min: 24,
  titulo: "La web por dentro: HTTP y HTTPS",
  resumen: "Petición y respuesta, métodos, códigos de estado, cabeceras, cookies y sesiones: el lenguaje donde ocurren casi todos los ataques web.",
  objetivos: ["Leer una petición y una respuesta HTTP", "Conocer los métodos y los códigos de estado principales", "Entender cookies, sesiones y cabeceras de seguridad", "Saber qué aporta HTTPS/TLS"],
  secciones: [
    { h: "1. HTTP es una conversación", html: `<p>La web funciona con <strong>petición → respuesta</strong>. Tu navegador (cliente) pide algo y el servidor responde. Como pedir en un bar: "ponme un café" (petición) → "aquí tienes" (respuesta).</p>
      <div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>Petición HTTP</b></div><pre><span class="hl">GET</span> /perfil?id=15 <span class="p2">HTTP/1.1</span>
<span class="c">Host:</span> tienda.ejemplo.com
<span class="c">User-Agent:</span> Mozilla/5.0
<span class="c">Cookie:</span> session=a1b2c3d4
<span class="c">Accept:</span> text/html</pre></div>
      <div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>Respuesta HTTP</b></div><pre><span class="p2">HTTP/1.1</span> <span class="ok2">200 OK</span>
<span class="c">Content-Type:</span> text/html
<span class="c">Set-Cookie:</span> session=a1b2c3d4; HttpOnly; Secure
<span class="o">&lt;html&gt;...&lt;/html&gt;</span></pre></div>
      <p>En Burp Suite (que verás más adelante) pasarás horas leyendo y <strong>modificando</strong> estas peticiones. Entenderlas es el 50 % del pentest web.</p>` },
    { h: "2. Métodos HTTP", html: `<table class="tbl"><tr><th>Método</th><th>Para qué</th><th>Analogía</th></tr>
      <tr><td><code>GET</code></td><td>Pedir/leer datos (va en la URL)</td><td>Consultar el menú</td></tr>
      <tr><td><code>POST</code></td><td>Enviar datos (login, formularios)</td><td>Hacer un pedido</td></tr>
      <tr><td><code>PUT</code></td><td>Crear/reemplazar un recurso</td><td>Sustituir un plato</td></tr>
      <tr><td><code>DELETE</code></td><td>Borrar un recurso</td><td>Cancelar el pedido</td></tr>
      <tr><td><code>PATCH</code></td><td>Modificar parte de un recurso</td><td>Cambiar la guarnición</td></tr>
      <tr><td><code>OPTIONS</code></td><td>Preguntar qué métodos admite</td><td>"¿Qué puedo pedir?"</td></tr></table>
      <div class="callout">En <strong>APIs REST</strong> estos métodos son el ABC: GET lee, POST crea, PUT/PATCH actualiza, DELETE borra. Un fallo clásico: un <code>DELETE</code> accesible sin permisos.</div>` },
    { h: "3. Códigos de estado", html: `<p>La respuesta empieza con un número de 3 cifras. El primer dígito te dice la familia:</p>
      <div class="flow">
        <div class="fstep"><b>2xx</b><span>Éxito. <code>200 OK</code>, <code>201 Created</code></span></div>
        <div class="fstep"><b>3xx</b><span>Redirección. <code>301</code>, <code>302 Found</code></span></div>
        <div class="fstep"><b>4xx</b><span>Error del cliente. <code>401</code>, <code>403</code>, <code>404</code></span></div>
        <div class="fstep"><b>5xx</b><span>Error del servidor. <code>500</code>, <code>502</code></span></div>
      </div>
      <table class="tbl"><tr><th>Código</th><th>Significado</th><th>Útil en pentest</th></tr>
      <tr><td><code>200</code></td><td>OK</td><td>El recurso existe y responde</td></tr>
      <tr><td><code>301/302</code></td><td>Redirección</td><td>Posible login requerido o cambio de ruta</td></tr>
      <tr><td><code>401</code></td><td>No autenticado</td><td>Falta iniciar sesión</td></tr>
      <tr><td><code>403</code></td><td>Prohibido</td><td>Existe pero no tienes permiso (¡bypass?)</td></tr>
      <tr><td><code>404</code></td><td>No encontrado</td><td>Guía el fuzzing de directorios</td></tr>
      <tr><td><code>500</code></td><td>Error interno</td><td>¡Posible inyección o fallo explotable!</td></tr></table>
      <div class="callout tip">💡 En fuzzing de directorios te fijas en los códigos: <code>200</code> y <code>403</code> suelen marcar rutas interesantes; <code>404</code> se descarta.</div>` },
    { h: "4. Cabeceras (headers) y cabeceras de seguridad", html: `<p>Las cabeceras son metadatos de la conversación. Algunas son controles de seguridad que debes saber reconocer (y echar en falta) en un informe:</p>
      <table class="tbl"><tr><th>Cabecera</th><th>Protege contra</th></tr>
      <tr><td><code>Content-Security-Policy</code></td><td>XSS e inyección de recursos</td></tr>
      <tr><td><code>Strict-Transport-Security</code> (HSTS)</td><td>Forzar HTTPS (degradado a HTTP)</td></tr>
      <tr><td><code>X-Frame-Options</code></td><td>Clickjacking</td></tr>
      <tr><td><code>X-Content-Type-Options: nosniff</code></td><td>MIME sniffing</td></tr>
      <tr><td><code>Set-Cookie: HttpOnly; Secure; SameSite</code></td><td>Robo de cookies vía XSS/CSRF</td></tr></table>` },
    { h: "5. Cookies, sesiones y estado", html: `<p>HTTP <strong>no recuerda</strong> quién eres entre peticiones (es "sin estado"). Para mantenerte logueado se usan <strong>cookies de sesión</strong>: el servidor te da una pulsera (token) y la enseñas en cada petición.</p>
      <ul>
        <li><code>HttpOnly</code>: la cookie no es accesible desde JavaScript (mitiga robo por XSS).</li>
        <li><code>Secure</code>: solo se envía por HTTPS.</li>
        <li><code>SameSite</code>: limita el envío entre sitios (mitiga CSRF).</li>
      </ul>
      <div class="callout">Hoy muchas APIs usan <strong>tokens JWT</strong> en la cabecera <code>Authorization: Bearer ...</code> en lugar de cookies. Lo verás en el módulo de autenticación.</div>` },
    { h: "6. HTTPS = HTTP + TLS", html: `<p>HTTPS es HTTP dentro de un túnel cifrado (<strong>TLS</strong>). Aporta tres cosas, como una carta certificada:</p>
      <div class="grid3">
        <div class="mini-card"><h4>🔒 Confidencialidad</h4><p>Nadie en el camino lee el contenido.</p></div>
        <div class="mini-card"><h4>✅ Integridad</h4><p>Nadie altera el mensaje sin que se note.</p></div>
        <div class="mini-card"><h4>🪪 Autenticidad</h4><p>El certificado prueba que el servidor es quien dice ser.</p></div>
      </div>
      <p class="muted">Un certificado caducado, autofirmado o con cifrados débiles (SSLv3, TLS 1.0) es un hallazgo habitual que reportarás con herramientas como <code>testssl.sh</code> o <code>sslscan</code>.</p>` }
  ],
  claves: ["Petición → respuesta", "GET lee · POST envía · PUT/PATCH actualiza · DELETE borra", "2xx OK · 3xx redirige · 4xx tú · 5xx servidor", "HttpOnly, Secure, SameSite protegen las cookies", "HTTPS = HTTP + TLS (cifra, integra, autentica)"],
  entrevista: ["Diferencia entre 401 y 403", "¿Qué hace la bandera HttpOnly en una cookie?", "¿Cómo mantiene una web la sesión si HTTP no tiene estado?"],
  quiz: [
    { q: "¿Qué método HTTP se usa normalmente para enviar las credenciales de un login?", op: ["GET", "POST", "OPTIONS", "HEAD"], ok: 1, exp: "POST envía datos en el cuerpo; GET los pondría visibles en la URL." },
    { q: "Un recurso devuelve 403. ¿Qué significa?", op: ["No existe", "Error del servidor", "Existe pero no tienes permiso", "Redirección"], ok: 2, exp: "403 Forbidden: el recurso existe pero el acceso está prohibido (401 sería 'no autenticado')." },
    { q: "La bandera HttpOnly en una cookie sirve para…", op: ["Cifrarla", "Que no sea accesible desde JavaScript", "Enviarla solo por HTTP", "Hacerla permanente"], ok: 1, exp: "HttpOnly impide que scripts (p. ej. un XSS) lean la cookie." },
    { q: "Un código 500 en una respuesta puede indicar…", op: ["Que todo va bien", "Un posible error explotable (inyección, fallo del backend)", "Que falta login", "Una redirección"], ok: 1, exp: "Los 5xx revelan errores del servidor, a veces provocables con inyecciones." },
    { q: "¿Qué añade HTTPS respecto a HTTP?", op: ["Más velocidad", "Cifrado, integridad y autenticidad vía TLS", "Nuevos métodos", "Cookies"], ok: 1, exp: "HTTPS encapsula HTTP en TLS, aportando esas tres garantías." }
  ]
},
{
  id: 3, nivel: "Fundamentos", lab: null, min: 20,
  titulo: "Linux esencial para pentesting",
  resumen: "Navegación, permisos, usuarios, procesos y tuberías en la línea de comandos: tu herramienta de trabajo diaria (Kali, Parrot).",
  objetivos: ["Moverte por el sistema de ficheros y buscar cosas", "Entender permisos y usuarios (root, sudo)", "Encadenar comandos con tuberías y filtros", "Conocer ficheros clave para un pentester"],
  secciones: [
    { h: "1. Por qué Linux", html: `<p>La mayoría de servidores de Internet corren Linux, y las distros de pentesting (<strong>Kali Linux</strong>, <strong>Parrot OS</strong>) traen cientos de herramientas preinstaladas. Dominar la terminal es <strong>innegociable</strong> para este puesto.</p>
      <div class="legal">🧪 Monta un laboratorio seguro: Kali en una VM (VirtualBox/VMware) + máquinas vulnerables (Metasploitable, DVWA) en red privada. Nunca practiques contra sistemas que no sean tuyos o de un reto autorizado.</div>` },
    { h: "2. Navegación y ficheros", html: `<table class="tbl"><tr><th>Comando</th><th>Hace</th></tr>
      <tr><td><code>pwd</code></td><td>Dónde estoy (ruta actual)</td></tr>
      <tr><td><code>ls -la</code></td><td>Listar todo, con permisos y ocultos</td></tr>
      <tr><td><code>cd /ruta</code></td><td>Cambiar de directorio</td></tr>
      <tr><td><code>cat / less</code></td><td>Ver el contenido de un fichero</td></tr>
      <tr><td><code>find / -name "*.conf" 2&gt;/dev/null</code></td><td>Buscar ficheros</td></tr>
      <tr><td><code>grep -ri "password" .</code></td><td>Buscar texto dentro de ficheros</td></tr>
      <tr><td><code>cp / mv / rm</code></td><td>Copiar / mover / borrar</td></tr></table>` },
    { h: "3. Permisos: la clave de la escalada", html: `<p>Cada fichero tiene permisos de <strong>lectura (r), escritura (w) y ejecución (x)</strong> para tres grupos: <strong>dueño, grupo y otros</strong>.</p>
      <div class="anatomy">
        <div class="pz c"><code>-rwx</code><small>Dueño: leer, escribir, ejecutar</small></div>
        <div class="pz y"><code>r-x</code><small>Grupo: leer y ejecutar</small></div>
        <div class="pz g"><code>r--</code><small>Otros: solo leer</small></div>
      </div>
      <p>En números: <code>chmod 755</code> = rwx r-x r-x. El comando <code>chmod</code> cambia permisos y <code>chown</code> el propietario.</p>
      <div class="callout tip">💡 Buscar binarios con <strong>SUID</strong> (<code>find / -perm -4000 2&gt;/dev/null</code>) es un clásico de la escalada de privilegios: se ejecutan como root.</div>` },
    { h: "4. Usuarios, root y sudo", html: `<p><strong>root</strong> es el administrador todopoderoso (UID 0). Un usuario normal usa <code>sudo</code> para ejecutar algo puntual como root.</p>
      <table class="tbl"><tr><th>Comando</th><th>Hace</th></tr>
      <tr><td><code>whoami</code> / <code>id</code></td><td>Quién soy y mis grupos</td></tr>
      <tr><td><code>sudo -l</code></td><td>Qué puedo ejecutar como root (¡clave en privesc!)</td></tr>
      <tr><td><code>su - usuario</code></td><td>Cambiar de usuario</td></tr>
      <tr><td><code>cat /etc/passwd</code></td><td>Lista de usuarios del sistema</td></tr></table>` },
    { h: "5. Tuberías: encadenar comandos", html: `<p>La <strong>tubería</strong> <code>|</code> pasa la salida de un comando como entrada del siguiente. Es como una cadena de montaje.</p>
      <div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>kali@lab: ~</b></div><pre><span class="p">$</span> cat accesos.log <span class="hl">|</span> grep "admin" <span class="hl">|</span> sort <span class="hl">|</span> uniq -c <span class="hl">|</span> sort -rn <span class="hl">|</span> head
   <span class="o">142 admin login OK
    37 admin login FAIL</span></pre></div>
      <p>Filtros que usarás a diario: <code>grep</code> (buscar), <code>cut</code>/<code>awk</code> (columnas), <code>sort</code>, <code>uniq</code>, <code>wc -l</code> (contar), <code>tr</code>.</p>` },
    { h: "6. Redes y descargas desde Linux", html: `<table class="tbl"><tr><th>Comando</th><th>Hace</th></tr>
      <tr><td><code>ip a</code> / <code>ifconfig</code></td><td>Ver interfaces y mi IP</td></tr>
      <tr><td><code>ping host</code></td><td>Comprobar conectividad</td></tr>
      <tr><td><code>curl -I https://web</code></td><td>Ver cabeceras HTTP</td></tr>
      <tr><td><code>wget url</code></td><td>Descargar un fichero</td></tr>
      <tr><td><code>nc -lvnp 4444</code></td><td>Netcat: abrir un listener (reverse shells)</td></tr>
      <tr><td><code>ss -tulpn</code></td><td>Ver puertos abiertos localmente</td></tr></table>
      <div class="callout">Practica en línea sin instalar nada si quieres empezar ya: hay terminales gratuitas en OverTheWire (reto <em>Bandit</em>), ideal para aprender bash jugando.</div>` }
  ],
  claves: ["Kali/Parrot = tu banco de trabajo", "rwx para dueño/grupo/otros · chmod 755", "sudo -l y SUID = oro para la escalada", "La tubería | encadena comandos", "curl, nc, grep y find: tus mejores amigos"],
  entrevista: ["¿Cómo buscarías todos los ficheros con SUID?", "¿Qué hace sudo -l y por qué te interesa?", "Explícame qué significa chmod 755"],
  quiz: [
    { q: "¿Qué comando muestra qué puedes ejecutar como root?", op: ["whoami", "sudo -l", "ls -la", "id"], ok: 1, exp: "sudo -l lista los permisos sudo del usuario: punto de partida de muchas escaladas." },
    { q: "chmod 755 sobre un fichero significa…", op: ["Solo root puede leerlo", "rwx para el dueño, r-x para grupo y otros", "Nadie puede ejecutarlo", "Lo borra"], ok: 1, exp: "7=rwx (dueño), 5=r-x (grupo), 5=r-x (otros)." },
    { q: "La tubería | en Linux sirve para…", op: ["Comentar código", "Pasar la salida de un comando a otro", "Redirigir a un fichero", "Ejecutar como root"], ok: 1, exp: "| conecta la stdout de un comando con la stdin del siguiente." },
    { q: "¿Qué hace find / -perm -4000 2>/dev/null?", op: ["Busca ficheros grandes", "Busca binarios SUID (se ejecutan como su dueño)", "Lista usuarios", "Borra temporales"], ok: 1, exp: "Busca el bit SUID; esos binarios corren con privilegios del propietario (a veces root)." },
    { q: "Para ver solo las cabeceras HTTP de una web usarías…", op: ["cat web", "curl -I https://web", "ping web", "ls web"], ok: 1, exp: "curl -I hace una petición HEAD y muestra las cabeceras de respuesta." }
  ]
},
{
  id: 4, nivel: "Fundamentos", lab: null, min: 20,
  titulo: "Windows y Active Directory esencial",
  resumen: "Cómo funciona Windows en empresa, el Directorio Activo, usuarios, hashes NTLM y PowerShell: el entorno corporativo que auditarás.",
  objetivos: ["Entender qué es Active Directory y por qué es el objetivo nº1 interno", "Conocer SMB, RDP y los puertos Windows", "Saber qué son los hashes NTLM y Kerberos a alto nivel", "Soltar los primeros comandos de PowerShell y CMD"],
  secciones: [
    { h: "1. Windows manda en las empresas", html: `<p>Casi todas las empresas gestionan sus equipos y usuarios con <strong>Active Directory (AD)</strong>. Si en la oferta hablan de "infraestructuras internas", gran parte es Windows + AD. Aunque es un puesto junior, debes conocer el mapa.</p>` },
    { h: "2. Active Directory: la guía telefónica de la empresa", html: `<p>AD es una <strong>base de datos central</strong> de usuarios, equipos y permisos, gestionada por un <strong>Controlador de Dominio (DC)</strong>. Analogía: es la recepción de un edificio que tiene la lista de todos los empleados, sus llaves y a qué salas pueden entrar.</p>
      <table class="tbl"><tr><th>Concepto</th><th>Qué es</th></tr>
      <tr><td>Dominio</td><td>Agrupación lógica (ej. <code>empresa.local</code>)</td></tr>
      <tr><td>Controlador de dominio (DC)</td><td>El servidor que guarda y valida todo</td></tr>
      <tr><td>Usuario / Grupo</td><td>Identidades y colecciones de permisos</td></tr>
      <tr><td>GPO</td><td>Políticas que se aplican a equipos y usuarios</td></tr>
      <tr><td>OU</td><td>Unidad organizativa (carpetas de objetos)</td></tr></table>
      <div class="callout">Herramientas que oirás nombrar: <strong>BloodHound</strong> (mapea rutas de ataque en AD), <strong>Impacket</strong> (suite de scripts) y <strong>CrackMapExec/NetExec</strong>. No hace falta dominarlas para júnior, pero saber qué hacen suma.</div>` },
    { h: "3. Protocolos y puertos Windows", html: `<table class="tbl"><tr><th>Puerto</th><th>Servicio</th><th>Uso ofensivo típico</th></tr>
      <tr><td><code>88</code></td><td>Kerberos</td><td>Autenticación AD (Kerberoasting)</td></tr>
      <tr><td><code>135 / 139 / 445</code></td><td>RPC / NetBIOS / SMB</td><td>Enumeración de recursos, ejecución remota</td></tr>
      <tr><td><code>389 / 636</code></td><td>LDAP / LDAPS</td><td>Consultar el directorio</td></tr>
      <tr><td><code>3389</code></td><td>RDP</td><td>Escritorio remoto</td></tr>
      <tr><td><code>5985 / 5986</code></td><td>WinRM</td><td>Administración remota (Evil-WinRM)</td></tr></table>` },
    { h: "4. Hashes, NTLM y Kerberos (alto nivel)", html: `<p>Windows no guarda tu contraseña en claro: guarda un <strong>hash</strong> (huella irreversible). Dos conceptos ofensivos clave que debes poder nombrar:</p>
      <ul>
        <li><strong>Pass-the-Hash</strong>: en algunos casos basta con el hash NTLM (sin la contraseña) para autenticarte.</li>
        <li><strong>Kerberoasting</strong>: pedir tickets de servicio para intentar crackear offline la contraseña de cuentas de servicio.</li>
      </ul>
      <p class="muted">No necesitas ejecutarlos para la entrevista júnior, pero sí explicar la idea: "las credenciales de Windows se manejan como hashes, y hay técnicas para reutilizarlos o crackearlos".</p>` },
    { h: "5. PowerShell y CMD: primeros comandos", html: `<table class="tbl"><tr><th>Comando</th><th>Hace</th></tr>
      <tr><td><code>whoami /all</code></td><td>Usuario, grupos y privilegios</td></tr>
      <tr><td><code>ipconfig /all</code></td><td>Configuración de red</td></tr>
      <tr><td><code>net user</code> / <code>net group</code></td><td>Usuarios y grupos locales/dominio</td></tr>
      <tr><td><code>systeminfo</code></td><td>Versión y parches (busca CVEs)</td></tr>
      <tr><td><code>Get-ChildItem</code> (PS)</td><td>Equivalente a <code>ls</code></td></tr>
      <tr><td><code>Get-Process</code> (PS)</td><td>Procesos en ejecución</td></tr></table>
      <div class="callout tip">💡 PowerShell es, a la vez, herramienta de administración y de ataque. Por eso las empresas vigilan su uso (logging, AMSI). Es la "navaja suiza" de Windows.</div>` },
    { h: "6. Mapa mental para la entrevista", html: `<div class="flow">
        <div class="fstep"><b>Entras</b><span>Equipo o usuario comprometido</span></div>
        <div class="fstep"><b>Enumeras</b><span>Usuarios, grupos, shares (SMB), AD</span></div>
        <div class="fstep"><b>Escalas</b><span>Local admin → dominio</span></div>
        <div class="fstep"><b>Te mueves</b><span>Lateral hasta el DC</span></div>
        <div class="fstep"><b>Dominas</b><span>Domain Admin / toda la red</span></div>
      </div>
      <p>Para un júnior, lo importante es <strong>entender el flujo</strong> y conocer las herramientas, no ejecutar un ataque de dominio completo.</p>` }
  ],
  claves: ["AD = base central de usuarios y permisos (DC)", "445 SMB · 3389 RDP · 88 Kerberos · 5985 WinRM", "Windows usa hashes (NTLM); Pass-the-Hash y Kerberoasting", "PowerShell: whoami /all, systeminfo, net user", "BloodHound, Impacket, CrackMapExec: suena, conócelas"],
  entrevista: ["¿Qué es Active Directory y qué es un controlador de dominio?", "¿Qué diferencia hay entre NTLM y Kerberos a grandes rasgos?", "¿Para qué sirve BloodHound?"],
  quiz: [
    { q: "El servidor que guarda y valida la base de datos de Active Directory se llama…", op: ["Servidor web", "Controlador de dominio (DC)", "Proxy", "Firewall"], ok: 1, exp: "El Domain Controller aloja AD y autentica a usuarios y equipos." },
    { q: "El puerto 445 en Windows corresponde a…", op: ["RDP", "Kerberos", "SMB", "LDAP"], ok: 2, exp: "445 es SMB, usado para compartición y ejecución remota." },
    { q: "¿Qué permite, en esencia, un ataque Pass-the-Hash?", op: ["Descifrar TLS", "Autenticarse usando el hash NTLM sin conocer la contraseña", "Escanear puertos", "Leer cookies"], ok: 1, exp: "Reutiliza el hash NTLM directamente para autenticarse." },
    { q: "¿Qué comando de Windows muestra la versión y los parches instalados?", op: ["whoami", "systeminfo", "ls", "ping"], ok: 1, exp: "systeminfo revela build y hotfixes, útil para buscar CVEs." },
    { q: "BloodHound se usa para…", op: ["Cifrar discos", "Mapear rutas de ataque y relaciones en Active Directory", "Hacer phishing", "Escanear webs"], ok: 1, exp: "BloodHound grafica relaciones y caminos hacia Domain Admin." }
  ]
},
/* ═══════════════════ METODOLOGÍA ═══════════════════ */
{
  id: 5, nivel: "Metodología", lab: null, min: 22,
  titulo: "Qué es un pentest y un Red Team",
  resumen: "Tipos de prueba, las fases de un pentesting, el alcance (scope), las reglas de enganche y el marco legal que no puedes saltarte.",
  objetivos: ["Diferenciar pentest, Red Team, bug bounty y análisis de vulnerabilidades", "Memorizar las fases de un pentest", "Entender scope, reglas de enganche y autorización", "Conocer metodologías de referencia (PTES, OWASP, OSSTMM)"],
  secciones: [
    { h: "1. Vocabulario que confunde a todos", html: `<table class="tbl"><tr><th>Actividad</th><th>Qué es</th></tr>
      <tr><td><strong>Análisis de vulnerabilidades</strong></td><td>Buscar y listar fallos (a menudo con escáneres). No se explotan.</td></tr>
      <tr><td><strong>Pentesting</strong></td><td>Identificar <em>y explotar</em> fallos de forma controlada para demostrar el impacto real.</td></tr>
      <tr><td><strong>Red Team</strong></td><td>Simular un atacante real contra toda la organización, con sigilo y objetivos concretos (ej. llegar a un dato). Evalúa también detección y respuesta (Blue Team).</td></tr>
      <tr><td><strong>Bug bounty</strong></td><td>Programa abierto donde investigadores reportan fallos a cambio de recompensa.</td></tr></table>
      <div class="callout">La oferta es de <strong>Red Team junior</strong>, pero el día a día que describe es sobre todo <strong>pentesting</strong> de web, APIs, móvil e infraestructura + gestión de vulnerabilidades. Perfecto, porque eso es lo que cubre este curso.</div>` },
    { h: "2. Las fases de un pentest", html: `<div class="flow">
        <div class="fstep"><b>1. Alcance</b><span>Reglas, permisos, objetivos</span></div>
        <div class="fstep"><b>2. Reconocimiento</b><span>OSINT, superficie de ataque</span></div>
        <div class="fstep"><b>3. Enumeración</b><span>Puertos, servicios, versiones</span></div>
        <div class="fstep"><b>4. Explotación</b><span>Validar vulnerabilidades</span></div>
        <div class="fstep"><b>5. Post-explotación</b><span>Escalada, movimiento, impacto</span></div>
        <div class="fstep"><b>6. Informe</b><span>Hallazgos, PoC, remediación</span></div>
      </div>
      <p>En entrevista, saber recitar estas fases <strong>con una frase de ejemplo cada una</strong> transmite método. Añade una fase 0 ("autorización por escrito") y una final ("reevaluación / retest").</p>` },
    { h: "3. Tipos de caja", html: `<div class="grid3">
        <div class="mini-card"><h4>⬛ Caja negra</h4><p>Sin información previa. Simula un atacante externo real.</p></div>
        <div class="mini-card"><h4>⬜ Caja blanca</h4><p>Con todo el conocimiento (código, credenciales, diagramas). Máxima cobertura.</p></div>
        <div class="mini-card"><h4>🔲 Caja gris</h4><p>Información parcial (p. ej. un usuario de prueba). El más habitual.</p></div>
      </div>` },
    { h: "4. Scope y reglas de enganche (ROE)", html: `<p>El <strong>alcance (scope)</strong> define qué puedes tocar (IPs, dominios, apps) y qué no. Las <strong>reglas de enganche</strong> fijan horarios, técnicas permitidas (¿DoS? casi nunca), datos sensibles y a quién avisar si algo se rompe.</p>
      <div class="legal">⚖️ <b>Regla de oro:</b> salirse del scope puede ser ilegal aunque te hayan contratado. Si en el reconocimiento descubres un activo "jugoso" fuera del alcance, <strong>no lo tocas</strong>: lo documentas y preguntas.</div>` },
    { h: "5. Marco legal (España)", html: `<ul>
        <li><strong>Autorización por escrito</strong> siempre, firmada por quien pueda autorizar ese activo.</li>
        <li>Código Penal: <strong>art. 197 bis</strong> (acceso no autorizado), <strong>art. 264</strong> (daños a sistemas/datos).</li>
        <li>Protección de datos (RGPD/LOPDGDD) si manejas datos personales durante la prueba.</li>
        <li>Si es un sistema de un tercero (cloud), revisa sus políticas de pentest.</li>
      </ul>` },
    { h: "6. Metodologías de referencia", html: `<table class="tbl"><tr><th>Marco</th><th>Para qué</th></tr>
      <tr><td><strong>PTES</strong></td><td>Estándar de ejecución de pentests (las 7 fases)</td></tr>
      <tr><td><strong>OWASP WSTG</strong></td><td>Guía de testing de seguridad web (la biblia del pentest web)</td></tr>
      <tr><td><strong>OWASP MASTG/MASVS</strong></td><td>Testing y verificación de apps móviles</td></tr>
      <tr><td><strong>OSSTMM</strong></td><td>Metodología abierta de testing de seguridad</td></tr>
      <tr><td><strong>MITRE ATT&CK</strong></td><td>Catálogo de tácticas y técnicas de adversarios (muy usado en Red Team)</td></tr>
      <tr><td><strong>NIST SP 800-115</strong></td><td>Guía técnica de evaluaciones de seguridad</td></tr></table>
      <div class="callout tip">💡 Cita <strong>OWASP WSTG</strong> para web y <strong>MITRE ATT&CK</strong> para describir técnicas: suena a profesional con método.</div>` }
  ],
  claves: ["Pentest explota; análisis de vulns solo lista", "Fases: alcance → recon → enum → explotación → post → informe", "Negra/blanca/gris según la info previa", "Sin autorización por escrito, no se toca nada", "OWASP WSTG (web) y MITRE ATT&CK (técnicas)"],
  entrevista: ["Enumérame las fases de un pentest", "¿Diferencia entre un pentest y un ejercicio de Red Team?", "¿Qué harías si encuentras un activo vulnerable fuera del scope?"],
  quiz: [
    { q: "¿Qué distingue a un pentest de un simple análisis de vulnerabilidades?", op: ["El pentest solo escanea", "El pentest explota los fallos para demostrar impacto", "No hay diferencia", "El análisis es ilegal"], ok: 1, exp: "El pentest valida explotando; el análisis se queda en listar los fallos." },
    { q: "Un test 'de caja negra' significa que el auditor…", op: ["Tiene el código fuente", "No tiene información previa del objetivo", "Tiene credenciales de admin", "Solo revisa documentación"], ok: 1, exp: "Caja negra = sin conocimiento previo, simula un externo." },
    { q: "Descubres un servidor vulnerable claramente fuera del alcance acordado. ¿Qué haces?", op: ["Lo explotas, está vulnerable", "No lo tocas; lo documentas y consultas", "Lo apagas", "Lo publicas"], ok: 1, exp: "Salirse del scope puede ser ilegal; se documenta y se consulta al cliente." },
    { q: "¿Qué marco es la referencia para el testing de seguridad web?", op: ["MITRE ATT&CK", "OWASP WSTG", "DORA", "ISO 9001"], ok: 1, exp: "El OWASP Web Security Testing Guide es el estándar de facto para web." },
    { q: "La autorización para un pentest debe ser…", op: ["Verbal basta", "Por escrito y de quien pueda autorizar el activo", "No hace falta si es cliente", "La da el propio auditor"], ok: 1, exp: "Siempre autorización escrita y de quien tenga potestad sobre el activo." }
  ]
},
{
  id: 6, nivel: "Metodología", lab: "cvss", min: 22,
  titulo: "Vulnerabilidades: CVE, CVSS, CWE y priorización",
  resumen: "Cómo se identifican, puntúan y priorizan las vulnerabilidades. El lenguaje con el que escribirás informes y hablarás con el cliente.",
  objetivos: ["Distinguir CVE, CWE, CVSS y EPSS", "Interpretar un vector y una puntuación CVSS", "Priorizar hallazgos por riesgo real, no solo por nota", "Usar fuentes como NVD, Exploit-DB y CISA KEV"],
  secciones: [
    { h: "1. Las siglas que lo ordenan todo", html: `<table class="tbl"><tr><th>Sigla</th><th>Qué es</th><th>Ejemplo</th></tr>
      <tr><td><strong>CVE</strong></td><td>Identificador único de <em>una</em> vulnerabilidad concreta</td><td><code>CVE-2021-44228</code> (Log4Shell)</td></tr>
      <tr><td><strong>CWE</strong></td><td>Tipo o categoría de debilidad</td><td><code>CWE-89</code> (SQL Injection)</td></tr>
      <tr><td><strong>CVSS</strong></td><td>Puntuación de gravedad (0–10)</td><td><code>9.8 Crítica</code></td></tr>
      <tr><td><strong>EPSS</strong></td><td>Probabilidad de que se explote en breve</td><td><code>0,92</code> (92 %)</td></tr></table>
      <p>Analogía: el <strong>CWE</strong> es la enfermedad ("gripe"), el <strong>CVE</strong> es el paciente concreto ("la gripe de Juan el martes"), el <strong>CVSS</strong> es la gravedad del caso y el <strong>EPSS</strong> la probabilidad de contagio.</p>` },
    { h: "2. CVSS por dentro (v3.1)", html: `<p>La nota sale de un <strong>vector</strong>. Para júnior basta con reconocer las métricas base:</p>
      <table class="tbl"><tr><th>Métrica</th><th>Pregunta</th></tr>
      <tr><td><code>AV</code> Attack Vector</td><td>¿Desde dónde? Red / Adyacente / Local / Físico</td></tr>
      <tr><td><code>AC</code> Attack Complexity</td><td>¿Es fácil o requiere condiciones? Baja / Alta</td></tr>
      <tr><td><code>PR</code> Privileges Required</td><td>¿Necesita privilegios? Ninguno / Bajo / Alto</td></tr>
      <tr><td><code>UI</code> User Interaction</td><td>¿Hace falta que la víctima haga algo?</td></tr>
      <tr><td><code>C/I/A</code></td><td>Impacto en confidencialidad, integridad y disponibilidad</td></tr></table>
      <div class="payload">CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H  →  9.8 (Crítica)</div>
      <p>Ese vector significa: atacable por red, fácil, sin privilegios ni interacción, con impacto alto en todo. El peor caso.</p>` },
    { h: "3. Escala de severidad", html: `<table class="tbl"><tr><th>Rango CVSS</th><th>Severidad</th></tr>
      <tr><td>9.0 – 10.0</td><td><span class="sev crit">Crítica</span></td></tr>
      <tr><td>7.0 – 8.9</td><td><span class="sev high">Alta</span></td></tr>
      <tr><td>4.0 – 6.9</td><td><span class="sev med">Media</span></td></tr>
      <tr><td>0.1 – 3.9</td><td><span class="sev low">Baja</span></td></tr>
      <tr><td>0.0</td><td><span class="sev info">Informativa</span></td></tr></table>` },
    { h: "4. Priorizar: la nota no lo es todo", html: `<p>Un error de júnior es ordenar los hallazgos solo por CVSS. El <strong>riesgo real</strong> combina:</p>
      <div class="flow">
        <div class="fstep"><b>Gravedad</b><span>CVSS</span></div>
        <div class="fstep"><b>Explotabilidad</b><span>EPSS, ¿hay exploit público?</span></div>
        <div class="fstep"><b>Exposición</b><span>¿Internet o interno?</span></div>
        <div class="fstep"><b>Criticidad del activo</b><span>¿Afecta a datos/negocio clave?</span></div>
      </div>
      <div class="callout tip">💡 Frase para la entrevista: <em>"Una vulnerabilidad media en un servidor expuesto a Internet con exploit público y datos de clientes puede ser más urgente que una crítica en un sistema de pruebas aislado."</em></div>` },
    { h: "5. Dónde se investiga", html: `<table class="tbl"><tr><th>Fuente</th><th>Para qué</th></tr>
      <tr><td><strong>NVD</strong> (nvd.nist.gov)</td><td>Base oficial de CVEs con su CVSS</td></tr>
      <tr><td><strong>MITRE CVE</strong></td><td>Registro de CVEs</td></tr>
      <tr><td><strong>Exploit-DB</strong> / <code>searchsploit</code></td><td>Exploits públicos (PoC)</td></tr>
      <tr><td><strong>CISA KEV</strong></td><td>Catálogo de vulns <em>explotadas activamente</em></td></tr>
      <tr><td><strong>GitHub Advisories / vendor</strong></td><td>Avisos de fabricantes y dependencias</td></tr></table>` },
    { h: "6. El ciclo de gestión de vulnerabilidades", html: `<div class="flow">
        <div class="fstep"><b>Descubrir</b><span>Escáneres + pentest</span></div>
        <div class="fstep"><b>Validar</b><span>Quitar falsos positivos</span></div>
        <div class="fstep"><b>Priorizar</b><span>Riesgo real</span></div>
        <div class="fstep"><b>Remediar</b><span>Parche / mitigación</span></div>
        <div class="fstep"><b>Verificar</b><span>Retest</span></div>
      </div>
      <p>Esto es <strong>exactamente</strong> lo que pide la oferta: "gestión y revisión de vulnerabilidades detectadas por herramientas automáticas" + "seguimiento". Un escáner (Nessus, OpenVAS) genera ruido; tu valor es <strong>validar y priorizar</strong>.</p>` }
  ],
  claves: ["CWE = tipo · CVE = caso concreto · CVSS = gravedad · EPSS = probabilidad", "CVSS 9.0+ = Crítica", "Riesgo = gravedad × explotabilidad × exposición × criticidad", "NVD, Exploit-DB, CISA KEV", "Validar y priorizar > escanear"],
  entrevista: ["¿Diferencia entre CVE y CWE?", "¿Qué métricas base componen el CVSS?", "¿Cómo priorizarías 100 vulnerabilidades de un escáner?"],
  quiz: [
    { q: "CVE-2021-44228 es un ejemplo de…", op: ["Un tipo de debilidad", "Una vulnerabilidad concreta identificada", "Una puntuación de gravedad", "Una herramienta"], ok: 1, exp: "Un CVE identifica una vulnerabilidad específica; el tipo sería un CWE." },
    { q: "Una puntuación CVSS de 9.8 corresponde a severidad…", op: ["Media", "Alta", "Crítica", "Baja"], ok: 2, exp: "9.0–10.0 es Crítica." },
    { q: "En el vector CVSS, AV:N significa que el ataque es…", op: ["Local", "Físico", "A través de la red", "Imposible"], ok: 2, exp: "Attack Vector: Network, explotable remotamente por red." },
    { q: "¿Qué fuente te dice si una vulnerabilidad se está explotando activamente?", op: ["CISA KEV", "ISO 27001", "RGPD", "OSI"], ok: 0, exp: "El catálogo KEV de CISA lista vulnerabilidades explotadas en la práctica." },
    { q: "Al priorizar hallazgos, ADEMÁS del CVSS deberías considerar…", op: ["Solo el color del informe", "Exposición, explotabilidad y criticidad del activo", "El número de páginas", "La marca del escáner"], ok: 1, exp: "El riesgo real combina gravedad con exposición, exploit disponible y valor del activo." }
  ]
},
{
  id: 7, nivel: "Metodología", lab: "owasp", min: 26,
  titulo: "OWASP Top 10 explicado desde cero",
  resumen: "Las 10 categorías de riesgo web más importantes (2021), cada una con analogía, ejemplo y defensa. El contenido estrella de tu entrevista.",
  objetivos: ["Nombrar y explicar las 10 categorías del OWASP Top 10 2021", "Dar un ejemplo real de cada una", "Proponer la defensa principal de cada riesgo", "Relacionar cada fallo con lo que verás en Burp"],
  secciones: [
    { h: "1. Qué es el OWASP Top 10", html: `<p><strong>OWASP</strong> (Open Worldwide Application Security Project) es una comunidad sin ánimo de lucro. Su <strong>Top 10</strong> es la lista de las categorías de riesgo web más críticas, revisada cada pocos años. <strong>Es la pregunta estrella</strong> en cualquier entrevista de seguridad web: domínalo.</p>
      <div class="callout">Ojo: son <strong>categorías de riesgo</strong>, no vulnerabilidades sueltas. La versión vigente es la de <strong>2021</strong>.</div>` },
    { h: "2. A01 – Pérdida de control de acceso", html: `<p><strong>El nº1.</strong> Un usuario hace o ve algo que no le corresponde. Ejemplo típico: <strong>IDOR</strong>, cambiar <code>/factura?id=15</code> por <code>id=16</code> y ver la de otro cliente.</p>
      <p>🛡️ Defensa: verificar permisos <strong>en el servidor</strong> en cada petición; denegar por defecto.</p>` },
    { h: "3. A02 – Fallos criptográficos", html: `<p>Datos sensibles mal protegidos: sin cifrar, con algoritmos débiles (MD5, SHA1 para contraseñas) o en claro. Antes se llamaba "exposición de datos sensibles".</p>
      <p>🛡️ Defensa: TLS en tránsito, cifrado fuerte en reposo, hashing lento (bcrypt, Argon2) para contraseñas.</p>` },
    { h: "4. A03 – Inyección", html: `<p>La app mezcla datos del usuario con un comando/consulta. Incluye <strong>SQLi</strong>, inyección de comandos y, aquí, también <strong>XSS</strong>. Ejemplo: <code>' OR '1'='1</code> en un login.</p>
      <p>🛡️ Defensa: consultas parametrizadas, validación y <em>escaping</em>, nunca concatenar entrada del usuario.</p>` },
    { h: "5. A04 – Diseño inseguro", html: `<p>El fallo está en el <strong>diseño</strong>, no en un bug de código: faltan controles desde el principio (sin límite de intentos, lógica de negocio abusable).</p>
      <p>🛡️ Defensa: modelado de amenazas, patrones seguros, requisitos de seguridad desde el diseño.</p>` },
    { h: "6. A05 – Configuración de seguridad incorrecta", html: `<p>Muy común: paneles por defecto, credenciales <code>admin/admin</code>, directorios abiertos, mensajes de error con detalles, cabeceras de seguridad ausentes, servicios de más.</p>
      <p>🛡️ Defensa: bastionado (hardening), quitar lo innecesario, revisar configuraciones y cabeceras.</p>` },
    { h: "7. A06 a A08", html: `<table class="tbl"><tr><th>Cat.</th><th>Qué es</th><th>Defensa</th></tr>
      <tr><td><strong>A06</strong> Componentes vulnerables y desactualizados</td><td>Usar librerías/CMS con CVEs conocidos</td><td>Inventario de dependencias, parcheo, SCA</td></tr>
      <tr><td><strong>A07</strong> Fallos de identificación y autenticación</td><td>Contraseñas débiles, sin MFA, sesiones mal gestionadas</td><td>MFA, políticas robustas, gestión de sesión segura</td></tr>
      <tr><td><strong>A08</strong> Fallos de integridad de software y datos</td><td>Actualizaciones o deserialización sin verificar</td><td>Firmas, verificación, CI/CD seguro</td></tr></table>` },
    { h: "8. A09 y A10", html: `<table class="tbl"><tr><th>Cat.</th><th>Qué es</th><th>Defensa</th></tr>
      <tr><td><strong>A09</strong> Fallos de registro y monitorización</td><td>No hay logs ni alertas: los ataques pasan desapercibidos</td><td>Logging, alertas, detección y respuesta</td></tr>
      <tr><td><strong>A10</strong> SSRF (Server-Side Request Forgery)</td><td>La app hace peticiones a donde le pide el atacante (p. ej. a la metadata interna del cloud)</td><td>Listas de permitidos, bloquear IPs internas, validar URLs</td></tr></table>
      <div class="callout tip">💡 Truco mnemotécnico del Top 10 2021: <em>control de acceso, cripto, inyección, diseño, config, componentes, autenticación, integridad, logging, SSRF</em>.</div>` },
    { h: "9. Cómo lo verás en la práctica", html: `<p>Casi todo el Top 10 se prueba con <strong>Burp Suite</strong> interceptando y modificando peticiones. El laboratorio gratuito de referencia es <strong>PortSwigger Web Security Academy</strong>: cientos de labs por categoría, con solución. Es, probablemente, el mejor recurso para preparar esta entrevista.</p>` }
  ],
  claves: ["A01 Control de acceso es el nº1 (IDOR)", "A03 Inyección incluye SQLi y XSS", "A05 Config incorrecta: credenciales por defecto, cabeceras", "A10 SSRF: la app pide por ti a destinos internos", "PortSwigger Academy para practicar gratis"],
  entrevista: ["Nómbrame el OWASP Top 10 y pon un ejemplo de 3", "¿Qué es un IDOR y en qué categoría cae?", "¿Cómo se defiende una inyección SQL?"],
  quiz: [
    { q: "Cambiar id=15 por id=16 en una URL y ver datos de otro usuario es un ejemplo de…", op: ["Inyección", "Pérdida de control de acceso (IDOR)", "SSRF", "Fallo criptográfico"], ok: 1, exp: "Es un IDOR, dentro de A01 Broken Access Control." },
    { q: "¿En qué categoría del Top 10 2021 entra el XSS?", op: ["A01", "A03 Inyección", "A07", "A10"], ok: 1, exp: "Desde 2021 el XSS se integra en A03 Injection." },
    { q: "Dejar un panel con credenciales admin/admin es un caso de…", op: ["A02 Cripto", "A05 Configuración incorrecta", "A09 Logging", "A04 Diseño"], ok: 1, exp: "Credenciales por defecto = Security Misconfiguration (A05)." },
    { q: "La mejor defensa contra la inyección SQL es…", op: ["Un antivirus", "Consultas parametrizadas", "Cambiar de puerto", "Ocultar la versión"], ok: 1, exp: "Las consultas parametrizadas separan código de datos y evitan la inyección." },
    { q: "Que la aplicación realice peticiones a una URL controlada por el atacante (p. ej. metadata interna) es…", op: ["CSRF", "SSRF (A10)", "IDOR", "XXE"], ok: 1, exp: "Server-Side Request Forgery: el servidor hace la petición por el atacante." }
  ]
},
/* ═══════════════════ RECONOCIMIENTO ═══════════════════ */
{
  id: 8, nivel: "Reconocimiento", lab: null, min: 22,
  titulo: "Reconocimiento, OSINT y superficie de ataque",
  resumen: "Recoger información antes de atacar: pasivo vs activo, OSINT, descubrimiento de subdominios y gestión de la superficie de ataque externa (ASM).",
  objetivos: ["Diferenciar reconocimiento pasivo y activo", "Enumerar subdominios y activos expuestos", "Usar OSINT (Google dorks, certificados, DNS)", "Entender el Attack Surface Management que pide la oferta"],
  secciones: [
    { h: "1. La fase que más rentabiliza", html: `<p>Como un ladrón que vigila el edificio antes de entrar, el pentester <strong>recopila información</strong> primero. Cuanto mejor sea el reconocimiento, más fácil el resto. La oferta lo pide explícitamente: <em>"análisis y seguimiento de activos de la superficie de ataque externa"</em> y <em>"descubrimiento de activos expuestos"</em>.</p>` },
    { h: "2. Pasivo vs activo", html: `<div class="grid3">
        <div class="mini-card"><h4>🔇 Pasivo</h4><p>Sin tocar al objetivo: buscas en Google, DNS público, certificados, LinkedIn, filtraciones. Indetectable.</p></div>
        <div class="mini-card"><h4>📡 Activo</h4><p>Interactúas con el objetivo: resuelves DNS, escaneas, pruebas subdominios. Deja rastro.</p></div>
        <div class="mini-card"><h4>⚖️ Regla</h4><p>Lo activo solo dentro del scope y la autorización. Lo pasivo, con cabeza (no es "gratis" legalmente si accedes a datos privados).</p></div>
      </div>` },
    { h: "3. OSINT: inteligencia de fuentes abiertas", html: `<table class="tbl"><tr><th>Técnica/Herramienta</th><th>Qué obtienes</th></tr>
      <tr><td><strong>Google Dorks</strong> (<code>site:</code>, <code>filetype:</code>, <code>intitle:</code>)</td><td>Ficheros, paneles y datos indexados</td></tr>
      <tr><td><strong>crt.sh</strong> / Certificate Transparency</td><td>Subdominios a partir de certificados</td></tr>
      <tr><td><strong>Shodan / Censys</strong></td><td>Dispositivos y servicios expuestos a Internet</td></tr>
      <tr><td><strong>theHarvester</strong></td><td>Correos, subdominios y hosts</td></tr>
      <tr><td><strong>whois / dig</strong></td><td>Titular del dominio y registros DNS</td></tr>
      <tr><td><strong>Wayback Machine</strong></td><td>Versiones antiguas y rutas olvidadas</td></tr></table>
      <div class="payload">site:telefonicatech.com filetype:pdf confidential</div>` },
    { h: "4. Descubrimiento de subdominios", html: `<p>Cada subdominio (<code>vpn.</code>, <code>dev.</code>, <code>api.</code>, <code>old.</code>) es una posible puerta. Más subdominios = más superficie.</p>
      <table class="tbl"><tr><th>Herramienta</th><th>Modo</th></tr>
      <tr><td><code>subfinder -d dominio.com</code></td><td>Pasivo (APIs públicas)</td></tr>
      <tr><td><code>amass enum -d dominio.com</code></td><td>Pasivo + activo</td></tr>
      <tr><td><code>dnsx</code> / <code>massdns</code></td><td>Resolver y validar en masa</td></tr>
      <tr><td><code>httpx -l hosts.txt</code></td><td>Ver cuáles responden por HTTP(S)</td></tr></table>` },
    { h: "5. Attack Surface Management (ASM)", html: `<p>ASM es <strong>descubrir y vigilar de forma continua</strong> todo lo que una organización tiene expuesto a Internet: dominios, IPs, servicios, certificados, nubes, buckets. El objetivo: encontrar lo que la empresa <em>no sabe que tiene</em> (shadow IT).</p>
      <div class="flow">
        <div class="fstep"><b>Descubrir</b><span>Dominios, IPs, cloud</span></div>
        <div class="fstep"><b>Inventariar</b><span>Servicios y versiones</span></div>
        <div class="fstep"><b>Evaluar</b><span>Exposición y riesgo</span></div>
        <div class="fstep"><b>Monitorizar</b><span>Cambios continuos</span></div>
      </div>
      <p class="muted">Herramientas/plataformas que suenan: Amass, el toolkit de ProjectDiscovery (subfinder, httpx, nuclei), Shodan Monitor, y soluciones comerciales de ASM.</p>` },
    { h: "6. De recon a hallazgos: nuclei", html: `<p><strong>nuclei</strong> lanza plantillas (templates) de comprobaciones conocidas contra una lista de hosts: detecta configuraciones, exposiciones y CVEs conocidos a escala. Encaja con lo que pide la oferta sobre automatización.</p>
      <div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>kali@lab: ~</b></div><pre><span class="p">$</span> subfinder -d ejemplo.com -silent <span class="hl">|</span> httpx -silent <span class="hl">|</span> nuclei -t cves/
<span class="o">[</span><span class="ko">critical</span><span class="o">] CVE-2021-XXXX  https://old.ejemplo.com</span>
<span class="o">[</span><span class="c">medium</span><span class="o">]   exposed-panel https://dev.ejemplo.com</span></pre></div>
      <div class="legal">⚖️ Estas cadenas se lanzan solo contra activos autorizados. Automatizar no exime de tener permiso.</div>` }
  ],
  claves: ["Pasivo = sin tocar · Activo = interactúas", "Google dorks, crt.sh, Shodan, theHarvester", "subfinder + httpx + nuclei = recon moderno", "ASM = descubrir y vigilar lo expuesto (shadow IT)", "Más subdominios = más superficie de ataque"],
  entrevista: ["¿Diferencia entre reconocimiento pasivo y activo?", "¿Cómo enumerarías subdominios de una empresa?", "¿Qué es la gestión de superficie de ataque?"],
  quiz: [
    { q: "Consultar crt.sh y Google sin tocar los servidores del objetivo es reconocimiento…", op: ["Activo", "Pasivo", "Ilegal siempre", "Interno"], ok: 1, exp: "No interactúas con el objetivo: es pasivo." },
    { q: "¿Qué herramienta busca dispositivos y servicios expuestos en Internet?", op: ["Shodan", "chmod", "Hashcat", "John"], ok: 0, exp: "Shodan (y Censys) indexan servicios expuestos a Internet." },
    { q: "subfinder se usa para…", op: ["Crackear contraseñas", "Enumerar subdominios", "Escanear puertos UDP", "Interceptar HTTP"], ok: 1, exp: "subfinder descubre subdominios de forma pasiva." },
    { q: "El objetivo principal del ASM es…", op: ["Cifrar datos", "Descubrir y vigilar continuamente lo expuesto (incluido shadow IT)", "Formar empleados", "Escribir políticas"], ok: 1, exp: "Attack Surface Management inventaría y monitoriza la exposición externa." },
    { q: "httpx en una cadena de recon sirve para…", op: ["Resolver qué hosts responden por HTTP(S)", "Romper hashes", "Enviar phishing", "Cifrar tráfico"], ok: 0, exp: "httpx prueba qué hosts tienen servicios web vivos." }
  ]
},
{
  id: 9, nivel: "Reconocimiento", lab: "nmap", min: 26,
  titulo: "Escaneo de puertos con Nmap",
  resumen: "La herramienta estrella de la oferta. Tipos de escaneo, detección de servicios y versiones, scripts NSE e interpretación de resultados.",
  objetivos: ["Lanzar los escaneos de Nmap más útiles", "Interpretar estados de puerto y versiones", "Usar scripts NSE para detectar vulnerabilidades", "Diseccionar un comando Nmap pieza a pieza"],
  secciones: [
    { h: "1. Qué hace Nmap", html: `<p><strong>Nmap</strong> (Network Mapper) descubre qué equipos hay en una red, qué puertos tienen abiertos y qué servicios/versiones corren. Es lo primero que hace un auditor. La oferta lo cita por su nombre: <strong>domínalo</strong>.</p>
      <div class="legal">⚖️ Escanear sistemas sin autorización puede ser delito. Usa tu propio laboratorio (p. ej. Metasploitable en una red privada) o retos autorizados (HackTheBox, TryHackMe).</div>` },
    { h: "2. Anatomía de un comando", html: `<div class="anatomy">
        <div class="pz o"><code>sudo</code><small>Permisos root (para -sS, -O)</small></div>
        <div class="pz c"><code>nmap</code><small>La herramienta</small></div>
        <div class="pz y"><code>-sS</code><small>Escaneo SYN (medio abierto)</small></div>
        <div class="pz g"><code>-sV</code><small>Servicio y versión</small></div>
        <div class="pz p"><code>-p-</code><small>Todos los puertos (65535)</small></div>
        <div class="pz k"><code>-oN out.txt</code><small>Guarda la salida</small></div>
        <div class="pz b"><code>10.10.10.5</code><small>El objetivo</small></div>
      </div>
      <p>Estructura: <code>nmap [tipo de escaneo] [opciones] [objetivo]</code>. El objetivo siempre al final.</p>` },
    { h: "3. Paso 1: ¿quién está vivo?", html: `<div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>descubrimiento de hosts</b></div><pre><span class="p">$</span> sudo nmap <span class="hl">-sn</span> 192.168.56.0/24
<span class="o">Nmap scan report for 192.168.56.101
Host is up (0.00048s latency).
MAC Address: 08:00:27:3A:1F:C2 (Oracle VirtualBox)
Nmap done: 256 IP addresses (</span><span class="ok2">3 hosts up</span><span class="o">)</span></pre></div>
      <p><code>-sn</code> = solo ping sweep, sin escanear puertos. Rápido para mapear la red.</p>` },
    { h: "4. Paso 2: puertos, servicios y versiones", html: `<div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>escaneo de versiones</b></div><pre><span class="p">$</span> sudo nmap <span class="hl">-sV</span> 192.168.56.101
<span class="o">PORT     STATE SERVICE  VERSION</span>
21/tcp   <span class="ok2">open</span>  ftp      <span class="ko">vsftpd 2.3.4</span>
22/tcp   <span class="ok2">open</span>  ssh      OpenSSH 4.7p1
23/tcp   <span class="ok2">open</span>  telnet   Linux telnetd
80/tcp   <span class="ok2">open</span>  http     Apache httpd 2.2.8
445/tcp  <span class="ok2">open</span>  smb      Samba 3.0.20</pre></div>
      <p>La <strong>versión</strong> es oro: con ella buscas CVEs. Aquí <code>vsftpd 2.3.4</code> es famoso por una puerta trasera (CVE-2011-2523).</p>` },
    { h: "5. Estados de un puerto", html: `<table class="tbl"><tr><th>Estado</th><th>Significa</th><th>Qué haces</th></tr>
      <tr><td><code>open</code></td><td>Hay un servicio aceptando conexiones</td><td>Identificar versión y buscar fallos</td></tr>
      <tr><td><code>closed</code></td><td>Responde (RST) pero sin servicio</td><td>Poco interés</td></tr>
      <tr><td><code>filtered</code></td><td>Un firewall se traga la sonda (sin respuesta)</td><td>Probar otras técnicas</td></tr>
      <tr><td><code>open|filtered</code></td><td>No se distingue (típico en UDP)</td><td>Confirmar con -sV</td></tr></table>` },
    { h: "6. Scripts NSE y chuleta", html: `<p>El <strong>motor NSE</strong> automatiza comprobaciones (más de 600 scripts en Lua).</p>
      <div class="payload">nmap -p 21 --script ftp-vsftpd-backdoor 192.168.56.101
nmap --script vuln 10.10.10.5      # busca vulnerabilidades conocidas</div>
      <table class="tbl"><tr><th>Opción</th><th>Para qué</th></tr>
      <tr><td><code>-sn</code></td><td>Descubrir hosts (sin puertos)</td></tr>
      <tr><td><code>-p- / -p 22,80</code></td><td>Todos los puertos / concretos</td></tr>
      <tr><td><code>-sV</code></td><td>Versión del servicio</td></tr>
      <tr><td><code>-O</code></td><td>Detectar sistema operativo</td></tr>
      <tr><td><code>-sC / --script</code></td><td>Scripts NSE</td></tr>
      <tr><td><code>-A</code></td><td>Agresivo (-O -sV -sC + traceroute)</td></tr>
      <tr><td><code>-T4</code></td><td>Más rápido</td></tr>
      <tr><td><code>-oA informe</code></td><td>Guardar en 3 formatos</td></tr></table>
      <div class="callout tip">💡 Flujo típico: <code>-sn</code> para descubrir → <code>-p-</code> para todos los puertos → <code>-sV -sC</code> sobre los abiertos → <code>--script vuln</code>. Practícalo en el laboratorio "Constructor de comandos Nmap".</div>` }
  ],
  claves: ["nmap [tipo] [opciones] [objetivo]", "-sn descubre · -sS SYN · -sV versión · -p- todos", "open/closed/filtered", "-sC/--script = NSE; --script vuln busca CVEs", "La versión del servicio te lleva al CVE"],
  entrevista: ["¿Qué hace nmap -sV y por qué es importante?", "Diferencia entre closed y filtered", "¿Cómo buscarías vulnerabilidades conocidas con Nmap?"],
  quiz: [
    { q: "¿Qué opción de Nmap detecta la versión del servicio?", op: ["-sn", "-sV", "-p-", "-O"], ok: 1, exp: "-sV identifica servicio y versión, base para buscar CVEs." },
    { q: "Un puerto 'filtered' en Nmap indica que…", op: ["Hay un servicio abierto", "No llega respuesta, probablemente por un firewall", "El host no existe", "Está cerrado con RST"], ok: 1, exp: "filtered = la sonda no obtiene respuesta; suele haber filtrado de por medio." },
    { q: "¿Qué hace nmap -sn 192.168.1.0/24?", op: ["Escanea todos los puertos", "Descubre qué hosts están vivos sin escanear puertos", "Detecta el SO", "Lanza scripts NSE"], ok: 1, exp: "-sn hace un ping sweep: solo descubrimiento de hosts." },
    { q: "Para lanzar scripts que buscan vulnerabilidades conocidas usarías…", op: ["--script vuln", "-sn", "-p 80", "-T4"], ok: 0, exp: "La categoría vuln del NSE comprueba vulnerabilidades conocidas." },
    { q: "En el comando, ¿dónde va siempre el objetivo?", op: ["Al principio", "Justo tras nmap", "Al final", "No importa"], ok: 2, exp: "La estructura es nmap [tipo] [opciones] [objetivo], con el objetivo al final." }
  ]
},
{
  id: 10, nivel: "Reconocimiento", lab: "fuzz", min: 22,
  titulo: "Enumeración y fuzzing web",
  resumen: "Descubrir directorios, ficheros, parámetros y subdominios ocultos con diccionarios. ffuf, gobuster, feroxbuster y el arte de leer códigos de estado.",
  objetivos: ["Entender qué es el fuzzing y para qué sirve", "Manejar ffuf y gobuster con diccionarios", "Fuzzear directorios, vhosts y parámetros", "Interpretar respuestas y filtrar ruido"],
  secciones: [
    { h: "1. Qué es el fuzzing", html: `<p><strong>Fuzzing</strong> = probar muchísimos valores automáticamente para descubrir lo que no está enlazado: directorios ocultos (<code>/admin</code>, <code>/backup</code>), ficheros (<code>.env</code>, <code>config.php.bak</code>), parámetros y subdominios. Es como probar todas las llaves de un llavero en una cerradura.</p>
      <p>El combustible son los <strong>diccionarios (wordlists)</strong>, como los de <strong>SecLists</strong> (el repositorio de referencia).</p>` },
    { h: "2. Fuzzing de directorios con ffuf", html: `<div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>ffuf</b></div><pre><span class="p">$</span> ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt \\
      -u https://objetivo.com/<span class="hl">FUZZ</span> -mc 200,301,403
<span class="o">admin                   [Status: </span><span class="c">301</span><span class="o">]</span>
<span class="o">login                   [Status: </span><span class="ok2">200</span><span class="o">]</span>
<span class="o">backup                  [Status: </span><span class="c">403</span><span class="o">]</span></pre></div>
      <p>La palabra <code>FUZZ</code> marca dónde se prueba cada entrada del diccionario. <code>-mc</code> = qué códigos mostrar.</p>` },
    { h: "3. Leer los códigos de estado", html: `<table class="tbl"><tr><th>Código</th><th>Interpretación en fuzzing</th></tr>
      <tr><td><code>200</code></td><td>Existe y accesible: ¡míralo!</td></tr>
      <tr><td><code>301/302</code></td><td>Redirige: a menudo carpeta real o login</td></tr>
      <tr><td><code>403</code></td><td>Existe pero prohibido: intenta bypass</td></tr>
      <tr><td><code>401</code></td><td>Requiere autenticación</td></tr>
      <tr><td><code>404</code></td><td>No existe: se descarta</td></tr></table>
      <div class="callout tip">💡 Si <strong>todo</strong> devuelve 200 (páginas de error "suaves"), filtra por tamaño o palabras: <code>-fs</code> (filter size), <code>-fw</code> (filter words). Dominar el filtrado separa al júnior del que sabe.</div>` },
    { h: "4. Gobuster y feroxbuster", html: `<table class="tbl"><tr><th>Herramienta</th><th>Ejemplo</th></tr>
      <tr><td><code>gobuster dir</code></td><td><code>gobuster dir -u http://sitio -w lista.txt -x php,txt</code></td></tr>
      <tr><td><code>gobuster dns</code></td><td><code>gobuster dns -d sitio.com -w subdominios.txt</code></td></tr>
      <tr><td><code>gobuster vhost</code></td><td>Virtual hosts con el mismo IP</td></tr>
      <tr><td><code>feroxbuster</code></td><td>Recursivo y rápido: <code>feroxbuster -u http://sitio</code></td></tr>
      <tr><td><code>dirsearch</code></td><td>Clásico en Python, buenos diccionarios por defecto</td></tr></table>` },
    { h: "5. Fuzzing de parámetros y vhosts", html: `<div class="payload"># Parámetros ocultos
ffuf -w params.txt -u "https://api.sitio.com/user?FUZZ=1" -fc 404

# Virtual hosts (cabecera Host)
ffuf -w subdominios.txt -u https://sitio.com -H "Host: FUZZ.sitio.com" -fs 1234</div>
      <p>Descubrir un parámetro oculto (<code>debug=true</code>, <code>admin=1</code>) o un vhost interno (<code>dev.</code>) puede abrir la puerta a un hallazgo serio.</p>` },
    { h: "6. Buenas prácticas", html: `<ul>
        <li>Elige el <strong>diccionario</strong> según el contexto (tecnología, idioma, tamaño).</li>
        <li>Controla el <strong>ritmo</strong> (<code>-rate</code>, <code>-t</code>) para no tumbar el servicio.</li>
        <li><strong>Verifica manualmente</strong> lo que encuentres: el fuzzing da pistas, no conclusiones.</li>
        <li>Guarda la salida para el informe.</li>
      </ul>
      <div class="legal">⚖️ El fuzzing genera mucho tráfico y queda en los logs. Solo dentro del scope y respetando las reglas de enganche.</div>` }
  ],
  claves: ["Fuzzing = probar miles de valores con diccionarios", "SecLists = diccionarios de referencia", "ffuf FUZZ marca el punto de prueba", "200/301/403 interesan; 404 se descarta", "Filtra ruido con -fs, -fw, -fc"],
  entrevista: ["¿Qué es el fuzzing de directorios y para qué sirve?", "¿Cómo filtrarías falsos positivos en ffuf?", "¿Qué diferencia hay entre fuzzear directorios y subdominios?"],
  quiz: [
    { q: "En ffuf, la palabra FUZZ indica…", op: ["El objetivo final", "El punto donde se inserta cada valor del diccionario", "El código de estado", "El usuario"], ok: 1, exp: "FUZZ es el marcador que ffuf sustituye por cada entrada de la wordlist." },
    { q: "Durante el fuzzing, un 403 suele significar…", op: ["No existe", "Existe pero el acceso está prohibido (prueba bypass)", "Error del servidor", "Redirección"], ok: 1, exp: "403 revela un recurso existente pero protegido: candidato a bypass." },
    { q: "¿Qué repositorio es la referencia de diccionarios?", op: ["SecLists", "Metasploit", "BloodHound", "Wireshark"], ok: 0, exp: "SecLists reúne wordlists para fuzzing, contraseñas, etc." },
    { q: "Si casi todas las respuestas son 200 con páginas de error 'suaves', deberías…", op: ["Rendirte", "Filtrar por tamaño o número de palabras (-fs, -fw)", "Cambiar de IP", "Usar HTTPS"], ok: 1, exp: "Filtrar por tamaño/palabras elimina ese ruido de falsos 200." },
    { q: "gobuster dns -d sitio.com -w lista.txt sirve para…", op: ["Escanear puertos", "Enumerar subdominios", "Crackear hashes", "Interceptar peticiones"], ok: 1, exp: "El modo dns de gobuster descubre subdominios por fuerza bruta." }
  ]
},
/* ═══════════════════ EXPLOTACIÓN WEB ═══════════════════ */
{
  id: 11, nivel: "Explotación web", lab: null, min: 24,
  titulo: "Burp Suite a fondo",
  resumen: "La herramienta citada en la oferta. Proxy, Repeater, Intruder, Decoder y Scanner: cómo interceptar, modificar y reenviar peticiones para encontrar fallos.",
  objetivos: ["Configurar Burp como proxy y capturar tráfico", "Usar Repeater, Intruder, Decoder y Comparer", "Entender el flujo de trabajo del pentest web con Burp", "Conocer las diferencias Community vs Professional"],
  secciones: [
    { h: "1. Qué es Burp y por qué es el rey", html: `<p><strong>Burp Suite</strong> es un <strong>proxy de interceptación</strong>: se coloca entre tu navegador y el servidor para que veas y <strong>modifiques</strong> cada petición antes de enviarla. Es, con diferencia, la herramienta más usada en pentest web y la cita la oferta.</p>
      <div class="flow">
        <div class="fstep"><b>Navegador</b><span>Tú</span></div>
        <div class="fstep"><b>Burp Proxy</b><span>Interceptas y editas</span></div>
        <div class="fstep"><b>Servidor</b><span>Objetivo</span></div>
      </div>` },
    { h: "2. Configuración básica", html: `<ol class="steps">
        <li>Burp escucha en <code>127.0.0.1:8080</code>.</li>
        <li>Configura el navegador (o usa el navegador integrado de Burp) para pasar por ese proxy.</li>
        <li>Instala el <strong>certificado CA de Burp</strong> para ver tráfico HTTPS sin errores.</li>
        <li>En <em>Proxy → Intercept</em> capturas; en <em>HTTP history</em> ves todo lo que ha pasado.</li>
      </ol>` },
    { h: "3. Las pestañas que usarás", html: `<table class="tbl"><tr><th>Módulo</th><th>Para qué</th></tr>
      <tr><td><strong>Proxy</strong></td><td>Interceptar y ver el historial de peticiones</td></tr>
      <tr><td><strong>Repeater</strong></td><td>Reenviar una petición una y otra vez cambiándola a mano (¡el más usado!)</td></tr>
      <tr><td><strong>Intruder</strong></td><td>Automatizar: fuzzing de parámetros, fuerza bruta, enumeración</td></tr>
      <tr><td><strong>Decoder</strong></td><td>Codificar/decodificar Base64, URL, hex…</td></tr>
      <tr><td><strong>Comparer</strong></td><td>Comparar dos respuestas (detectar diferencias)</td></tr>
      <tr><td><strong>Scanner</strong> (Pro)</td><td>Análisis automático de vulnerabilidades</td></tr>
      <tr><td><strong>Sequencer</strong></td><td>Analizar la aleatoriedad de tokens de sesión</td></tr></table>` },
    { h: "4. El flujo de trabajo típico", html: `<div class="flow">
        <div class="fstep"><b>Mapea</b><span>Navega la app con Burp activo</span></div>
        <div class="fstep"><b>Observa</b><span>Parámetros, cookies, APIs</span></div>
        <div class="fstep"><b>Manipula</b><span>Repeater: cambia valores</span></div>
        <div class="fstep"><b>Automatiza</b><span>Intruder sobre lo prometedor</span></div>
        <div class="fstep"><b>Confirma</b><span>Reproduce y documenta PoC</span></div>
      </div>
      <p>Ejemplo: capturas <code>GET /factura?id=15</code>, lo mandas a <strong>Repeater</strong> (Ctrl+R), cambias a <code>id=16</code> y lo reenvías. Si ves la factura de otro, tienes un <strong>IDOR</strong>.</p>` },
    { h: "5. Intruder: ataques", html: `<table class="tbl"><tr><th>Tipo</th><th>Uso</th></tr>
      <tr><td><strong>Sniper</strong></td><td>Un payload en una posición (p. ej. probar contraseñas)</td></tr>
      <tr><td><strong>Battering ram</strong></td><td>El mismo payload en varias posiciones</td></tr>
      <tr><td><strong>Pitchfork</strong></td><td>Varias listas en paralelo (usuario+contraseña emparejados)</td></tr>
      <tr><td><strong>Cluster bomb</strong></td><td>Todas las combinaciones (fuerza bruta clásica)</td></tr></table>
      <p class="muted">En la versión Community el Intruder va limitado en velocidad; para práctica seria se usa la Professional (de pago) o alternativas como <strong>OWASP ZAP</strong> (gratuito).</p>` },
    { h: "6. Community vs Professional + alternativas", html: `<table class="tbl"><tr><th></th><th>Community (gratis)</th><th>Professional</th></tr>
      <tr><td>Proxy, Repeater</td><td>✅</td><td>✅</td></tr>
      <tr><td>Intruder</td><td>⚠️ limitado</td><td>✅ completo</td></tr>
      <tr><td>Scanner automático</td><td>❌</td><td>✅</td></tr>
      <tr><td>Extensiones (BApp Store)</td><td>✅ (parcial)</td><td>✅</td></tr></table>
      <div class="callout tip">💡 Extensiones útiles: <strong>Logger++</strong>, <strong>Autorize</strong> (prueba control de acceso automáticamente), <strong>JWT Editor</strong>, <strong>Param Miner</strong>. Alternativa libre completa: <strong>OWASP ZAP</strong>.</div>` }
  ],
  claves: ["Burp = proxy que intercepta y modifica peticiones", "Repeater para manipular a mano; Intruder para automatizar", "Instala el CA de Burp para ver HTTPS", "Sniper/Pitchfork/Cluster bomb en Intruder", "ZAP es la alternativa gratuita"],
  entrevista: ["¿Para qué usas Burp Repeater frente a Intruder?", "¿Cómo configurarías Burp para interceptar HTTPS?", "Descríbeme cómo encontrarías un IDOR con Burp"],
  quiz: [
    { q: "¿Qué es, en esencia, Burp Suite?", op: ["Un antivirus", "Un proxy de interceptación entre navegador y servidor", "Un escáner de puertos", "Un gestor de contraseñas"], ok: 1, exp: "Burp se sitúa en medio para ver y modificar el tráfico HTTP(S)." },
    { q: "Para reenviar la misma petición cambiándola a mano usarías…", op: ["Intruder", "Repeater", "Decoder", "Comparer"], ok: 1, exp: "Repeater permite editar y reenviar peticiones manualmente." },
    { q: "¿Qué necesitas instalar para interceptar HTTPS sin errores de certificado?", op: ["Un nuevo navegador", "El certificado CA de Burp", "Un VPN", "Nmap"], ok: 1, exp: "El certificado CA de Burp evita los avisos de TLS al interceptar." },
    { q: "El ataque 'Cluster bomb' del Intruder prueba…", op: ["Un payload en una posición", "Todas las combinaciones de varias listas", "Solo usuarios", "Nada, es un escáner"], ok: 1, exp: "Cluster bomb combina todas las entradas de cada lista entre sí." },
    { q: "Una alternativa gratuita y completa a Burp es…", op: ["OWASP ZAP", "Shodan", "Hashcat", "BloodHound"], ok: 0, exp: "OWASP ZAP es un proxy de interceptación libre y completo." }
  ]
},
{
  id: 12, nivel: "Explotación web", lab: "inyeccion", min: 26,
  titulo: "Inyección: SQLi e inyección de comandos",
  resumen: "El clásico A03 de OWASP. Cómo se mezcla la entrada del usuario con una consulta o un comando, cómo se detecta y cómo se defiende.",
  objetivos: ["Entender por qué ocurre una inyección", "Reconocer SQLi (in-band, ciega, basada en errores)", "Detectar inyección de comandos del SO", "Explicar la defensa: consultas parametrizadas"],
  secciones: [
    { h: "1. La raíz del problema", html: `<p>Toda inyección nace de lo mismo: la aplicación <strong>mezcla datos del usuario con código</strong> (una consulta SQL, un comando del sistema) sin separarlos. El intérprete no distingue qué es dato y qué es instrucción.</p>
      <p>Analogía: dictas una carta a una secretaria y, en mitad del texto, dices "…y ahora ignora lo anterior y envíame el saldo". Si ella obedece ciegamente, eso es una inyección.</p>` },
    { h: "2. SQL Injection (SQLi)", html: `<p>La app construye una consulta concatenando tu entrada:</p>
      <div class="payload">consulta = "SELECT * FROM users WHERE user='" + entrada + "' AND pass='" + clave + "'"</div>
      <p>Si en <code>entrada</code> escribes <code>' OR '1'='1' -- </code>, la consulta se convierte en algo siempre verdadero y el login cae:</p>
      <div class="payload">SELECT * FROM users WHERE user='' OR '1'='1' -- ' AND pass='...'</div>` },
    { h: "3. Tipos de SQLi", html: `<table class="tbl"><tr><th>Tipo</th><th>Cómo obtienes datos</th></tr>
      <tr><td><strong>In-band / UNION</strong></td><td>Los datos vuelven en la propia respuesta (<code>UNION SELECT</code>)</td></tr>
      <tr><td><strong>Basada en errores</strong></td><td>El mensaje de error filtra información</td></tr>
      <tr><td><strong>Ciega booleana</strong></td><td>La página cambia (verdadero/falso) según la condición</td></tr>
      <tr><td><strong>Ciega por tiempo</strong></td><td><code>SLEEP(5)</code>: si tarda, la condición es cierta</td></tr>
      <tr><td><strong>Out-of-band</strong></td><td>Los datos salen por otro canal (DNS/HTTP)</td></tr></table>
      <div class="callout">Herramienta de referencia: <strong>sqlmap</strong> automatiza la detección y explotación. Pero en entrevista valoran que <strong>entiendas</strong> la manual, no solo que lances la herramienta.</div>` },
    { h: "4. Inyección de comandos del SO", html: `<p>Cuando la app pasa tu entrada a un comando del sistema. Ejemplo: un formulario de "ping" que ejecuta <code>ping &lt;tu_entrada&gt;</code>.</p>
      <div class="payload">127.0.0.1; whoami          # ejecuta ping y además whoami
127.0.0.1 && id            # encadena con &&
127.0.0.1 | cat /etc/passwd</div>
      <p>Operadores clave: <code>;</code>, <code>&&</code>, <code>||</code>, <code>|</code>, backticks y <code>$()</code>.</p>` },
    { h: "5. Cómo se detecta", html: `<ul>
        <li><strong>Payloads de prueba</strong>: comillas (<code>'</code>, <code>"</code>), <code>;</code>, que provoquen error o cambio de comportamiento.</li>
        <li><strong>Respuestas anómalas</strong>: error 500, mensaje de BD, tiempos raros.</li>
        <li><strong>Burp Repeater</strong> para probar variantes con método.</li>
      </ul>
      <div class="legal">⚖️ Solo en entornos autorizados. Para practicar: DVWA, PortSwigger Academy, bWAPP, SQLi-labs. Nunca contra una web real sin permiso.</div>` },
    { h: "6. Defensa", html: `<div class="grid3">
        <div class="mini-card"><h4>✅ Consultas parametrizadas</h4><p>Separan código de datos (prepared statements). La defensa nº1.</p></div>
        <div class="mini-card"><h4>✅ Validación / allowlist</h4><p>Acepta solo lo esperado; rechaza lo demás.</p></div>
        <div class="mini-card"><h4>✅ Mínimo privilegio</h4><p>El usuario de BD no debe ser admin; limita el daño.</p></div>
      </div>
      <p class="muted">Para comandos: evitar llamar al shell, usar APIs seguras y listas de permitidos. Un WAF ayuda, pero no sustituye a arreglar el código.</p>` }
  ],
  claves: ["Inyección = mezclar datos del usuario con código", "' OR '1'='1 es el SQLi de manual", "SQLi: UNION, error, ciega booleana/tiempo", "Command injection: ; && | $()", "Defensa nº1: consultas parametrizadas"],
  entrevista: ["Explícame cómo funciona un SQL injection", "¿Qué es una SQLi ciega basada en tiempo?", "¿Cómo se previene la inyección SQL?"],
  quiz: [
    { q: "La causa raíz de toda inyección es…", op: ["Un puerto abierto", "Mezclar datos del usuario con código sin separarlos", "Una contraseña débil", "Un certificado caducado"], ok: 1, exp: "El intérprete no distingue dato de instrucción cuando se concatenan." },
    { q: "El payload ' OR '1'='1 en un login busca…", op: ["Cifrar la base", "Que la condición sea siempre verdadera y saltarse la autenticación", "Borrar la tabla", "Abrir un puerto"], ok: 1, exp: "Hace la cláusula WHERE siempre cierta, devolviendo un usuario válido." },
    { q: "Una SQLi 'ciega por tiempo' se confirma cuando…", op: ["Aparece un error", "La respuesta tarda lo que indica un SLEEP()", "Cambia el puerto", "Se ve la contraseña"], ok: 1, exp: "Si al inyectar SLEEP(5) la respuesta tarda 5 s, la condición se ejecutó." },
    { q: "En un campo que hace ping, el payload '; whoami' intenta…", op: ["Una SQLi", "Inyección de comandos del SO", "Un XSS", "Un IDOR"], ok: 1, exp: "El ; encadena un segundo comando: inyección de comandos." },
    { q: "La principal defensa contra SQLi es…", op: ["Ocultar la versión", "Consultas parametrizadas (prepared statements)", "Cambiar de puerto", "Usar HTTP"], ok: 1, exp: "Las consultas parametrizadas separan el código de los datos." }
  ]
},
{
  id: 13, nivel: "Explotación web", lab: "inyeccion", min: 24,
  titulo: "XSS, CSRF y SSRF",
  resumen: "Tres fallos web imprescindibles: ejecutar scripts en el navegador de la víctima (XSS), abusar de su sesión (CSRF) y hacer que el servidor pida por ti (SSRF).",
  objetivos: ["Distinguir XSS reflejado, almacenado y DOM", "Explicar el impacto real de un XSS", "Entender CSRF y su defensa (tokens, SameSite)", "Reconocer un SSRF y por qué es grave en la nube"],
  secciones: [
    { h: "1. XSS: tu script en el navegador ajeno", html: `<p><strong>Cross-Site Scripting</strong>: la web refleja tu entrada sin sanear y tu <strong>JavaScript se ejecuta en el navegador de otra persona</strong>. Si un campo de comentario muestra lo que escribes tal cual:</p>
      <div class="payload">&lt;script&gt;alert(document.cookie)&lt;/script&gt;</div>
      <p>Impacto: robar cookies de sesión, hacer acciones como la víctima, keylogging, redirigir. En 2021 OWASP metió el XSS dentro de <strong>A03 Inyección</strong>.</p>` },
    { h: "2. Tipos de XSS", html: `<table class="tbl"><tr><th>Tipo</th><th>Dónde vive el payload</th></tr>
      <tr><td><strong>Reflejado</strong></td><td>En la URL/petición; la respuesta lo devuelve. Requiere engañar a la víctima para que haga clic.</td></tr>
      <tr><td><strong>Almacenado</strong></td><td>Se guarda en el servidor (comentario, perfil) y afecta a todo el que lo vea. El más grave.</td></tr>
      <tr><td><strong>DOM</strong></td><td>Ocurre en el propio JavaScript del cliente, sin pasar por el servidor.</td></tr></table>` },
    { h: "3. Defensa contra XSS", html: `<ul>
        <li><strong>Escapar/encode</strong> la salida según el contexto (HTML, atributo, JS).</li>
        <li><strong>Content-Security-Policy</strong> para limitar qué scripts se ejecutan.</li>
        <li><strong>Cookies HttpOnly</strong> para que el JS no las lea.</li>
        <li>Frameworks modernos que escapan por defecto; no insertar HTML crudo.</li>
      </ul>` },
    { h: "4. CSRF: te usan sin que lo sepas", html: `<p><strong>Cross-Site Request Forgery</strong>: una web maliciosa hace que <strong>tu navegador</strong>, ya logueado en otro sitio, envíe una petición no deseada (cambiar tu email, transferir dinero). Aprovecha que la cookie de sesión se envía automáticamente.</p>
      <div class="payload">&lt;img src="https://banco.com/transferir?a=atacante&importe=1000"&gt;</div>
      <p>🛡️ Defensa: <strong>tokens anti-CSRF</strong> (un valor impredecible por formulario), cookies <strong>SameSite</strong> y revalidar acciones sensibles.</p>` },
    { h: "5. XSS vs CSRF (no los confundas)", html: `<table class="tbl"><tr><th></th><th>XSS</th><th>CSRF</th></tr>
      <tr><td>Qué hace</td><td>Ejecuta <em>tu</em> script en la víctima</td><td>Fuerza una <em>acción</em> con la sesión de la víctima</td></tr>
      <tr><td>Necesita</td><td>Falta de saneo de salida</td><td>Que la acción dependa solo de la cookie</td></tr>
      <tr><td>Defensa clave</td><td>Encoding + CSP</td><td>Token anti-CSRF + SameSite</td></tr></table>
      <div class="callout tip">💡 Un XSS puede <strong>saltarse</strong> las protecciones CSRF (si ejecutas JS, lees el token). Por eso el XSS es tan peligroso.</div>` },
    { h: "6. SSRF: el servidor pide por ti", html: `<p><strong>Server-Side Request Forgery</strong> (A10): consigues que el <strong>servidor</strong> haga una petición a una URL que tú controlas. Muy grave en la nube: puede acceder a servicios internos o a la <strong>metadata del proveedor</strong>.</p>
      <div class="payload"># Clásico en AWS: robar credenciales temporales
http://169.254.169.254/latest/meta-data/iam/security-credentials/</div>
      <p>🛡️ Defensa: listas de permitidos de destinos, bloquear IPs internas/metadata, validar y normalizar URLs, segmentar red.</p>` }
  ],
  claves: ["XSS: tu JS corre en el navegador de la víctima", "Almacenado > Reflejado > DOM en gravedad", "CSRF abusa de la cookie automática → token + SameSite", "XSS ejecuta script; CSRF fuerza acción", "SSRF: el servidor pide por ti (metadata cloud 169.254.169.254)"],
  entrevista: ["¿Diferencia entre XSS reflejado y almacenado?", "¿XSS y CSRF son lo mismo? Diferéncialos", "¿Por qué es tan peligroso un SSRF en cloud?"],
  quiz: [
    { q: "Un XSS que se guarda en un comentario y afecta a todo el que lo vea es…", op: ["Reflejado", "Almacenado", "DOM", "Ciego"], ok: 1, exp: "El XSS almacenado persiste en el servidor y es el más grave." },
    { q: "La bandera de cookie que mitiga el robo por XSS es…", op: ["Secure", "HttpOnly", "SameSite", "Domain"], ok: 1, exp: "HttpOnly impide que el JavaScript lea la cookie." },
    { q: "Un ataque CSRF se aprovecha de que…", op: ["El servidor hace peticiones", "La cookie de sesión se envía automáticamente en cada petición", "Hay un puerto abierto", "La contraseña es débil"], ok: 1, exp: "El navegador adjunta la cookie aunque la petición venga de otro sitio." },
    { q: "La defensa principal contra CSRF es…", op: ["Antivirus", "Token anti-CSRF + cookies SameSite", "Cambiar de puerto", "Ocultar la versión"], ok: 1, exp: "Un token impredecible por formulario y SameSite cortan el CSRF." },
    { q: "Acceder a http://169.254.169.254/ desde el servidor objetivo es típico de…", op: ["XSS", "SSRF", "CSRF", "SQLi"], ok: 1, exp: "Es la metadata del cloud: objetivo clásico de un SSRF." }
  ]
},
{
  id: 14, nivel: "Explotación web", lab: null, min: 24,
  titulo: "Control de acceso, autenticación, JWT y APIs",
  resumen: "IDOR y escalada de privilegios, fallos de autenticación, tokens JWT y la seguridad de las APIs REST: el corazón del A01 y A07 de OWASP.",
  objetivos: ["Detectar IDOR y escaladas horizontal/vertical", "Reconocer fallos de autenticación y de sesión", "Entender la estructura de un JWT y sus fallos", "Aplicar el OWASP API Security Top 10"],
  secciones: [
    { h: "1. Autenticación vs autorización", html: `<p>Dos palabras que se confunden:</p>
      <div class="grid3">
        <div class="mini-card"><h4>🪪 Autenticación (AuthN)</h4><p>¿Quién eres? Verificar identidad (login, MFA).</p></div>
        <div class="mini-card"><h4>🔑 Autorización (AuthZ)</h4><p>¿Qué puedes hacer? Los permisos una vez identificado.</p></div>
        <div class="mini-card"><h4>💥 El fallo</h4><p>Estar bien autenticado pero con autorización rota = control de acceso roto (A01).</p></div>
      </div>` },
    { h: "2. IDOR y escalada de privilegios", html: `<p><strong>IDOR</strong> (Insecure Direct Object Reference): accedes a un recurso ajeno cambiando un identificador porque el servidor no comprueba de quién es.</p>
      <div class="payload">GET /api/pedidos/1001   →  tu pedido
GET /api/pedidos/1002   →  ¡el pedido de OTRO cliente!</div>
      <table class="tbl"><tr><th>Escalada</th><th>Qué es</th></tr>
      <tr><td><strong>Horizontal</strong></td><td>Accedes a datos de otro usuario del mismo nivel</td></tr>
      <tr><td><strong>Vertical</strong></td><td>Ganas permisos de un rol superior (usuario → admin)</td></tr></table>
      <div class="callout tip">💡 La extensión <strong>Autorize</strong> de Burp automatiza la detección de IDOR repitiendo peticiones con otra sesión.</div>` },
    { h: "3. Fallos de autenticación (A07)", html: `<ul>
        <li>Contraseñas débiles o por defecto, sin bloqueo tras intentos (fuerza bruta).</li>
        <li>Enumeración de usuarios (mensajes distintos para "usuario no existe" vs "contraseña incorrecta").</li>
        <li>Recuperación de contraseña débil, tokens predecibles.</li>
        <li>Sesiones que no caducan, IDs de sesión predecibles, sin invalidar al cerrar sesión.</li>
        <li>Falta de <strong>MFA</strong>.</li>
      </ul>` },
    { h: "4. JWT por dentro", html: `<p>Un <strong>JWT</strong> (JSON Web Token) son tres partes en Base64 separadas por puntos: <code>cabecera.payload.firma</code>.</p>
      <div class="payload">eyJhbGciOiJIUzI1NiJ9 . eyJ1c2VyIjoiam9lIiwicm9sZSI6InVzZXIifQ . &lt;firma&gt;
   └ header (alg)         └ payload (user, role, exp)        └ firma</div>
      <p>Fallos clásicos de JWT:</p>
      <table class="tbl"><tr><th>Fallo</th><th>Idea</th></tr>
      <tr><td><code>alg: none</code></td><td>El servidor acepta tokens sin firma</td></tr>
      <tr><td>Firma no verificada</td><td>Cambias <code>role:user</code> → <code>role:admin</code></td></tr>
      <tr><td>Clave débil (HS256)</td><td>Se crackea el secreto y se forjan tokens</td></tr>
      <tr><td>Confusión de algoritmo</td><td>RS256 → HS256 usando la clave pública como secreto</td></tr></table>
      <p class="muted">El payload NO está cifrado, solo codificado: cualquiera lo lee. Nunca metas secretos ahí.</p>` },
    { h: "5. Seguridad de APIs REST", html: `<p>Las APIs tienen su propio <strong>OWASP API Security Top 10</strong>. Los más frecuentes:</p>
      <table class="tbl"><tr><th>Riesgo API</th><th>Qué es</th></tr>
      <tr><td><strong>BOLA</strong> (API1)</td><td>IDOR a nivel de objeto: el fallo nº1 en APIs</td></tr>
      <tr><td><strong>Broken Authentication</strong> (API2)</td><td>Login/token mal implementado</td></tr>
      <tr><td><strong>BOPLA</strong> (API3)</td><td>Exceso de datos/propiedades expuestos o modificables</td></tr>
      <tr><td><strong>Falta de rate limiting</strong> (API4)</td><td>Sin límites: fuerza bruta, abuso</td></tr>
      <tr><td><strong>BFLA</strong> (API5)</td><td>Acceso a funciones de otro rol</td></tr></table>` },
    { h: "6. Cómo se prueba", html: `<ul>
        <li>Captura las llamadas con Burp; busca identificadores que cambiar (BOLA/IDOR).</li>
        <li>Repite peticiones con <strong>otra sesión</strong> o sin token (Autorize).</li>
        <li>Manipula el JWT (extensión JWT Editor); prueba <code>alg:none</code> y cambios de rol.</li>
        <li>Revisa la documentación (Swagger/OpenAPI) para descubrir endpoints ocultos.</li>
      </ul>
      <div class="legal">⚖️ Siempre sobre entornos autorizados. Practica BOLA/JWT en PortSwigger Academy y en crAPI/VAmPI (APIs vulnerables de laboratorio).</div>` }
  ],
  claves: ["AuthN = quién eres · AuthZ = qué puedes", "IDOR/BOLA: cambiar un id y ver lo ajeno", "Escalada horizontal (otro usuario) vs vertical (más rango)", "JWT = header.payload.firma (payload legible)", "APIs: BOLA es el fallo nº1 (OWASP API Top 10)"],
  entrevista: ["¿Diferencia entre autenticación y autorización?", "¿Qué es un IDOR/BOLA y cómo lo detectas?", "Explícame la estructura de un JWT y un fallo común"],
  quiz: [
    { q: "Cambiar /pedidos/1001 por /pedidos/1002 y ver el pedido de otro es…", op: ["XSS", "IDOR / BOLA", "CSRF", "SSRF"], ok: 1, exp: "Insecure Direct Object Reference: falta comprobar la propiedad del recurso." },
    { q: "La autorización (AuthZ) responde a la pregunta…", op: ["¿Quién eres?", "¿Qué puedes hacer?", "¿Desde dónde entras?", "¿Cuándo entras?"], ok: 1, exp: "AuthZ son los permisos; AuthN es la identidad." },
    { q: "En un JWT, el payload está…", op: ["Cifrado y es ilegible", "Solo codificado en Base64, cualquiera lo lee", "Firmado por el usuario", "Vacío"], ok: 1, exp: "El payload va en Base64, no cifrado: no se guardan secretos ahí." },
    { q: "El fallo JWT 'alg: none' consiste en que el servidor…", op: ["Cifra dos veces", "Acepta tokens sin firma válida", "Bloquea el login", "Usa HTTPS"], ok: 1, exp: "Si acepta alg:none, cualquiera forja tokens sin firmarlos." },
    { q: "En el OWASP API Security Top 10, el riesgo nº1 (API1) es…", op: ["SSRF", "BOLA (control de acceso a objetos roto)", "XSS", "Logging insuficiente"], ok: 1, exp: "Broken Object Level Authorization (BOLA) encabeza el Top 10 de APIs." }
  ]
},
/* ═══════════════════ INFRA Y AVANZADO ═══════════════════ */
{
  id: 15, nivel: "Infra y avanzado", lab: null, min: 22,
  titulo: "Contraseñas, hashes y fuerza bruta",
  resumen: "Qué es un hash, cómo se rompen las contraseñas (Hashcat, John, Hydra), diccionarios, salting y por qué el MFA lo cambia todo.",
  objetivos: ["Entender hashing, salting y por qué no se guardan contraseñas en claro", "Diferenciar ataque online y offline", "Usar Hydra, Hashcat y John a nivel conceptual", "Reconocer tipos de hash comunes"],
  secciones: [
    { h: "1. Hash: huella de un solo sentido", html: `<p>Un <strong>hash</strong> convierte un texto en una huella de longitud fija, de forma <strong>irreversible</strong>. Como una picadora: del filete sacas carne picada, pero no al revés.</p>
      <div class="payload">password123  →  (SHA-256)  →  ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f</div>
      <p>Para validar tu login, el sistema hashea lo que escribes y lo compara con el hash guardado. Si coincide, entras.</p>` },
    { h: "2. Salting y hashing lento", html: `<ul>
        <li><strong>Sal (salt)</strong>: un valor aleatorio único por usuario que se añade antes de hashear. Impide usar tablas precalculadas (rainbow tables) y que dos usuarios con la misma contraseña tengan el mismo hash.</li>
        <li><strong>Hashing lento</strong>: para contraseñas se usan algoritmos deliberadamente lentos (<strong>bcrypt, scrypt, Argon2</strong>) para que probar millones sea costoso. MD5/SHA1 son <strong>demasiado rápidos</strong> e inseguros para contraseñas.</li>
      </ul>` },
    { h: "3. Online vs offline", html: `<table class="tbl"><tr><th></th><th>Ataque online</th><th>Ataque offline</th></tr>
      <tr><td>Contra</td><td>Un servicio vivo (login, SSH)</td><td>Hashes ya robados</td></tr>
      <tr><td>Herramienta</td><td>Hydra, Medusa</td><td>Hashcat, John the Ripper</td></tr>
      <tr><td>Límite</td><td>Lento, bloqueos, logs</td><td>Muy rápido (GPU), sin bloqueos</td></tr></table>
      <div class="payload">hydra -l admin -P rockyou.txt ssh://10.10.10.5
hashcat -m 0 hashes.txt rockyou.txt      # -m 0 = MD5
john --wordlist=rockyou.txt hashes.txt</div>` },
    { h: "4. Diccionarios y reglas", html: `<p><strong>rockyou.txt</strong> es el diccionario legendario (millones de contraseñas filtradas). Las <strong>reglas</strong> mutan cada palabra (<code>password</code> → <code>P@ssw0rd!</code>) para cubrir variaciones humanas. También existen ataques por <strong>máscara</strong> (<code>?u?l?l?l?d?d</code>) y fuerza bruta pura.</p>` },
    { h: "5. Reconocer tipos de hash", html: `<table class="tbl"><tr><th>Pista</th><th>Probable</th></tr>
      <tr><td>32 hex</td><td>MD5</td></tr>
      <tr><td>40 hex</td><td>SHA-1</td></tr>
      <tr><td>64 hex</td><td>SHA-256</td></tr>
      <tr><td>Empieza por <code>$2b$</code></td><td>bcrypt</td></tr>
      <tr><td>Empieza por <code>$6$</code></td><td>SHA-512 crypt (Linux)</td></tr>
      <tr><td><code>aad3b...:</code></td><td>NTLM (Windows)</td></tr></table>
      <p class="muted">Herramientas como <code>hashid</code> o <code>hash-identifier</code> ayudan a identificarlos.</p>` },
    { h: "6. La defensa y el MFA", html: `<p>La mejor contraseña es la que no basta por sí sola. El <strong>MFA</strong> (algo que sabes + algo que tienes/eres) hace inútil una contraseña robada. Por eso en los informes recomendarás: hashing fuerte con sal, políticas de longitud, bloqueo tras intentos y, sobre todo, <strong>MFA</strong>.</p>
      <div class="legal">⚖️ El cracking solo sobre hashes que tengas autorización para probar (de un CTF, laboratorio o engagement). rockyou.txt se usa en formación; practica en TryHackMe/HackTheBox.</div>` }
  ],
  claves: ["Hash = huella irreversible", "Salt único por usuario + hashing lento (bcrypt/Argon2)", "Online: Hydra · Offline: Hashcat/John", "rockyou.txt + reglas + máscaras", "MFA neutraliza la contraseña robada"],
  entrevista: ["¿Qué es una sal y por qué se usa?", "¿Diferencia entre un ataque de contraseñas online y offline?", "¿Por qué MD5 no sirve para guardar contraseñas?"],
  quiz: [
    { q: "Un hash es…", op: ["Un cifrado reversible", "Una huella de un solo sentido (irreversible)", "Una contraseña en claro", "Un puerto"], ok: 1, exp: "El hashing no se puede revertir; solo se compara." },
    { q: "La 'sal' (salt) sirve para…", op: ["Acelerar el login", "Que dos contraseñas iguales den hashes distintos y frenar rainbow tables", "Cifrar el disco", "Abrir puertos"], ok: 1, exp: "El salt único evita precálculo y colisiones entre usuarios." },
    { q: "Para crackear hashes robados de forma offline usarías…", op: ["Hydra", "Hashcat o John the Ripper", "Nmap", "Burp"], ok: 1, exp: "Hashcat/John atacan hashes offline; Hydra es para servicios vivos (online)." },
    { q: "Un hash de 32 caracteres hexadecimales probablemente es…", op: ["bcrypt", "SHA-256", "MD5", "NTLM"], ok: 2, exp: "MD5 produce 128 bits = 32 hex. bcrypt empieza por $2b$." },
    { q: "¿Por qué bcrypt/Argon2 son mejores que MD5 para contraseñas?", op: ["Son reversibles", "Son deliberadamente lentos, encareciendo el cracking", "Ocupan menos", "Son más rápidos"], ok: 1, exp: "La lentitud intencionada hace inviable probar millones de candidatos." }
  ]
},
{
  id: 16, nivel: "Infra y avanzado", lab: null, min: 20,
  titulo: "Explotación, post-explotación y escalada",
  resumen: "De la vulnerabilidad al acceso: shells, Metasploit, escalada de privilegios, movimiento lateral y persistencia. Conceptos que un júnior debe conocer.",
  objetivos: ["Entender qué es un exploit, un payload y una shell", "Diferenciar bind shell y reverse shell", "Conocer la escalada de privilegios en Linux y Windows", "Situar movimiento lateral, persistencia y C2"],
  secciones: [
    { h: "1. Exploit, payload y shell", html: `<table class="tbl"><tr><th>Término</th><th>Qué es</th><th>Analogía</th></tr>
      <tr><td><strong>Exploit</strong></td><td>El código que aprovecha la vulnerabilidad</td><td>La ganzúa</td></tr>
      <tr><td><strong>Payload</strong></td><td>Lo que se ejecuta tras entrar</td><td>Lo que haces una vez dentro</td></tr>
      <tr><td><strong>Shell</strong></td><td>Acceso a la línea de comandos del objetivo</td><td>Las llaves de la casa</td></tr></table>` },
    { h: "2. Bind shell vs reverse shell", html: `<div class="grid3">
        <div class="mini-card"><h4>➡️ Bind shell</h4><p>La víctima abre un puerto y espera. Tú te conectas. Problema: los firewalls suelen bloquear conexiones entrantes.</p></div>
        <div class="mini-card"><h4>⬅️ Reverse shell</h4><p>La víctima se conecta <em>a ti</em> (tú escuchas con <code>nc -lvnp 4444</code>). Esquiva mejor el firewall de salida. La más usada.</p></div>
        <div class="mini-card"><h4>🔼 Web shell</h4><p>Un script subido al servidor web que ejecuta comandos vía HTTP.</p></div>
      </div>` },
    { h: "3. Metasploit en una frase", html: `<p><strong>Metasploit Framework</strong> es la navaja suiza de la explotación: un catálogo de exploits y payloads con un flujo común.</p>
      <div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>msfconsole</b></div><pre><span class="p2">msf6 &gt;</span> search vsftpd
<span class="p2">msf6 &gt;</span> use exploit/unix/ftp/vsftpd_234_backdoor
<span class="p2">msf6 &gt;</span> set RHOSTS 10.10.10.5
<span class="p2">msf6 &gt;</span> <span class="hl">exploit</span>
<span class="ok2">[*] Command shell session 1 opened</span></pre></div>
      <p class="muted"><code>msfvenom</code> genera payloads (reverse shells) a medida. Para júnior: saber qué es y el flujo básico.</p>` },
    { h: "4. Escalada de privilegios", html: `<p>Entras como usuario sin privilegios y buscas pasar a <strong>root/SYSTEM</strong>. Pistas habituales:</p>
      <table class="tbl"><tr><th>Linux</th><th>Windows</th></tr>
      <tr><td>Binarios SUID (<code>find / -perm -4000</code>)</td><td>Servicios mal configurados</td></tr>
      <tr><td><code>sudo -l</code> permisivo</td><td>Permisos sobre servicios/rutas (unquoted path)</td></tr>
      <tr><td>Cron jobs editables</td><td>Tokens y privilegios (SeImpersonate)</td></tr>
      <tr><td>Kernel/software con CVE</td><td>Credenciales en registro/ficheros</td></tr></table>
      <p class="muted">Scripts de enumeración automática: <strong>LinPEAS/WinPEAS</strong>, <strong>linux-smart-enumeration</strong>. Delatan vías de escalada en segundos.</p>` },
    { h: "5. Movimiento lateral, persistencia y C2", html: `<ul>
        <li><strong>Movimiento lateral</strong>: saltar de un equipo a otro (Pass-the-Hash, PsExec, RDP) hasta el objetivo.</li>
        <li><strong>Persistencia</strong>: asegurar el acceso si reinician (tareas programadas, servicios, claves).</li>
        <li><strong>C2</strong> (Command &amp; Control): la infraestructura desde la que se controla el acceso (Metasploit, Cobalt Strike, Sliver). Habitual en Red Team.</li>
      </ul>` },
    { h: "6. Dónde encaja el júnior", html: `<p>En un puesto júnior de Red Team/pentest, raramente harás un ataque de dominio completo el primer día. Lo que sí harás: <strong>validar vulnerabilidades, lanzar un exploit conocido en laboratorio, obtener una shell y documentarlo</strong>. Entender este mapa te permite hablar el idioma del equipo.</p>
      <div class="legal">⚖️ Todo esto, exclusivamente en entornos autorizados. El mejor campo de prácticas legal: TryHackMe, HackTheBox, VulnHub, laboratorios de certificaciones.</div>` }
  ],
  claves: ["Exploit = ganzúa · Payload = lo que haces dentro · Shell = acceso", "Reverse shell esquiva el firewall de salida (nc -lvnp)", "Metasploit: search → use → set → exploit", "Escalada: SUID/sudo -l (Linux), servicios (Windows); LinPEAS/WinPEAS", "Lateral → persistencia → C2"],
  entrevista: ["¿Diferencia entre bind shell y reverse shell?", "¿Qué buscarías para escalar privilegios en Linux?", "¿Qué es un C2 y para qué se usa?"],
  quiz: [
    { q: "En una reverse shell…", op: ["Tú te conectas a un puerto de la víctima", "La víctima se conecta a tu máquina, que está escuchando", "No hay conexión", "Se usa solo en web"], ok: 1, exp: "La víctima inicia la conexión saliente hacia tu listener, esquivando el firewall." },
    { q: "El 'payload' en explotación es…", op: ["La vulnerabilidad", "El código que aprovecha el fallo", "Lo que se ejecuta una vez dentro", "El puerto"], ok: 2, exp: "El exploit abre la puerta; el payload es lo que se ejecuta después." },
    { q: "En Linux, un primer paso típico de escalada es revisar…", op: ["ipconfig", "sudo -l y binarios SUID", "el navegador", "los cookies"], ok: 1, exp: "sudo -l y SUID revelan vías directas a root." },
    { q: "LinPEAS/WinPEAS se usan para…", op: ["Escanear puertos", "Enumerar automáticamente vías de escalada de privilegios", "Interceptar HTTP", "Crackear hashes"], ok: 1, exp: "Automatizan la enumeración local buscando debilidades para escalar." },
    { q: "Un C2 (Command & Control) es…", op: ["Un tipo de hash", "La infraestructura desde la que se controla el acceso obtenido", "Un puerto", "Una cabecera HTTP"], ok: 1, exp: "El C2 gestiona las sesiones y órdenes sobre los equipos comprometidos." }
  ]
},
{
  id: 17, nivel: "Infra y avanzado", lab: null, min: 22,
  titulo: "Scripting (Python/Bash) e IA en el pentesting",
  resumen: "Automatizar tareas repetitivas con Bash y Python, y usar la IA para acelerar enumeración, análisis y redacción. Dos valores diferenciales de la oferta.",
  objetivos: ["Escribir bucles y automatizaciones simples en Bash", "Usar Python con requests para tocar APIs", "Saber cuándo automatizar y cuándo no", "Aplicar IA de forma útil y segura al pentesting"],
  secciones: [
    { h: "1. Por qué automatizar", html: `<p>El pentesting tiene mucho trabajo repetitivo: lanzar el mismo escaneo a 50 hosts, probar 100 endpoints, parsear salidas. <strong>Scripting</strong> = convertir eso en un comando. La oferta valora Python y Bash explícitamente.</p>` },
    { h: "2. Bash: pegamento del pentester", html: `<div class="term"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>escaneo en bucle</b></div><pre><span class="p">$</span> <span class="hl">for</span> ip <span class="hl">in</span> $(cat hosts.txt)<span class="hl">; do</span>
      echo "== $ip =="
      nmap -sV -T4 $ip -oN scan_$ip.txt
<span class="hl">done</span></pre></div>
      <p>Piezas clave de Bash: variables (<code>$var</code>), bucles (<code>for</code>/<code>while</code>), condicionales (<code>if</code>), tuberías y redirección (<code>&gt;</code>, <code>&gt;&gt;</code>, <code>2&gt;/dev/null</code>).</p>` },
    { h: "3. Python: cuando Bash se queda corto", html: `<p>Para lógica compleja, parseo y hablar con APIs, Python. La librería <strong>requests</strong> es el pan de cada día:</p>
      <div class="payload">import requests
for i in range(1000, 1010):
    r = requests.get(f"https://api.sitio.com/pedidos/{i}",
                     headers={"Authorization": "Bearer TOKEN"})
    if r.status_code == 200:
        print(i, "ACCESIBLE", len(r.text))   # ¿IDOR?</div>
      <p>Otras útiles: <code>argparse</code> (parámetros), <code>re</code> (regex), <code>BeautifulSoup</code> (HTML), <code>pwntools</code> (explotación/CTF).</p>` },
    { h: "4. Cuándo NO automatizar", html: `<div class="callout">Automatizar sin entender es peligroso: puedes tumbar un servicio, generar ruido o perder matices. Regla: <strong>primero hazlo a mano y entiéndelo; luego automatiza lo que ya dominas</strong>. Y nunca lances scripts agresivos fuera del scope.</div>` },
    { h: "5. IA aplicada al pentesting", html: `<p>La oferta valora la IA aplicada. Usos reales y legítimos:</p>
      <table class="tbl"><tr><th>Tarea</th><th>Cómo ayuda la IA</th></tr>
      <tr><td>Explicar un error/código</td><td>Entender rápido una tecnología desconocida</td></tr>
      <tr><td>Generar payloads/variantes</td><td>Ideas de bypass, wordlists contextuales</td></tr>
      <tr><td>Parsear y resumir salidas</td><td>De un escaneo enorme a lo relevante</td></tr>
      <tr><td>Redacción de informes</td><td>Borradores de hallazgos y remediación</td></tr>
      <tr><td>Scripting asistido</td><td>Escribir y depurar automatizaciones</td></tr></table>
      <p class="muted">Herramientas/ideas que suenan: asistentes tipo copilot, PentestGPT, agentes que orquestan herramientas, Nuclei + IA para triaje.</p>` },
    { h: "6. IA con cabeza: riesgos", html: `<div class="legal">⚖️ <b>Nunca</b> subas datos de cliente, credenciales o información del engagement a servicios de IA públicos (fuga de datos, confidencialidad). Verifica siempre lo que genera la IA: puede <strong>alucinar</strong> comandos o CVEs inexistentes. La IA acelera; la responsabilidad y el criterio son tuyos.</div>` }
  ],
  claves: ["Automatiza lo repetitivo con Bash (for/while) y Python (requests)", "Primero entiende a mano, luego automatiza", "IA: enumerar, parsear, redactar, generar payloads", "Nunca subas datos de cliente a IA pública", "Verifica siempre la salida de la IA (alucinaciones)"],
  entrevista: ["¿Qué automatizarías de un pentest y cómo?", "¿Cómo usarías la IA en tu día a día sin comprometer datos?", "Escríbeme en pseudocódigo un bucle para probar IDOR"],
  quiz: [
    { q: "¿Cuándo conviene automatizar una tarea?", op: ["Siempre, sin entenderla", "Cuando ya la dominas a mano y es repetitiva", "Nunca", "Solo en producción del cliente"], ok: 1, exp: "Se automatiza lo que ya se entiende y se repite; si no, se cometen errores." },
    { q: "La librería de Python para hacer peticiones HTTP se llama…", op: ["numpy", "requests", "flask", "os"], ok: 1, exp: "requests es el estándar para consumir webs y APIs desde Python." },
    { q: "Un riesgo clave al usar IA pública en un pentest es…", op: ["Que sea gratis", "Filtrar datos del cliente o del engagement", "Que vaya lenta", "Que use HTTPS"], ok: 1, exp: "Subir datos sensibles a IA pública es una fuga de confidencialidad." },
    { q: "La IA generativa puede 'alucinar', es decir…", op: ["Cifrar datos", "Inventar comandos o CVEs que no existen", "Escanear puertos", "Bloquear el firewall"], ok: 1, exp: "Hay que verificar siempre su salida; puede inventar información." },
    { q: "En Bash, 'for ip in $(cat hosts.txt); do ... done' sirve para…", op: ["Cifrar un fichero", "Repetir una acción por cada host del fichero", "Abrir un puerto", "Crackear un hash"], ok: 1, exp: "Es un bucle que itera sobre cada línea/host del fichero." }
  ]
},
{
  id: 18, nivel: "Infra y avanzado", lab: null, min: 20,
  titulo: "Seguridad de aplicaciones móviles",
  resumen: "Lo valorado en la oferta: cómo se auditan apps Android e iOS, el OWASP Mobile Top 10 y las herramientas básicas (MobSF, Frida, apktool).",
  objetivos: ["Conocer la estructura de una app Android (APK) e iOS (IPA)", "Enumerar el OWASP Mobile Top 10 a alto nivel", "Diferenciar análisis estático y dinámico", "Nombrar las herramientas móviles clave"],
  secciones: [
    { h: "1. Android e iOS en 1 minuto", html: `<table class="tbl"><tr><th></th><th>Android</th><th>iOS</th></tr>
      <tr><td>Paquete</td><td><code>.apk</code> / <code>.aab</code></td><td><code>.ipa</code></td></tr>
      <tr><td>Lenguaje</td><td>Java/Kotlin (Dalvik/ART)</td><td>Swift/Objective-C</td></tr>
      <tr><td>Decompilar</td><td>apktool, jadx</td><td>más cerrado (jailbreak)</td></tr>
      <tr><td>Almacenamiento</td><td>SharedPreferences, SQLite</td><td>Keychain, plist</td></tr></table>` },
    { h: "2. OWASP Mobile Top 10 (resumen)", html: `<ul>
        <li><strong>Credenciales/almacenamiento inseguro</strong>: secretos en claro en el dispositivo.</li>
        <li><strong>Comunicación insegura</strong>: sin TLS o sin <em>pinning</em>.</li>
        <li><strong>Autenticación/autorización débil</strong>.</li>
        <li><strong>Criptografía insuficiente</strong>.</li>
        <li><strong>Code tampering / ingeniería inversa</strong>: sin ofuscación ni anti-tamper.</li>
        <li><strong>Exposición de datos y APIs del backend</strong> (¡la API suele ser el verdadero objetivo!).</li>
      </ul>
      <p class="muted">La referencia formal es <strong>OWASP MASVS</strong> (requisitos) y <strong>MASTG</strong> (guía de testing).</p>` },
    { h: "3. Estático vs dinámico", html: `<div class="grid3">
        <div class="mini-card"><h4>📄 Análisis estático</h4><p>Sin ejecutar: decompilar el APK, buscar claves, URLs, permisos, secretos en el código.</p></div>
        <div class="mini-card"><h4>▶️ Análisis dinámico</h4><p>Con la app corriendo: interceptar tráfico, manipular en tiempo real, saltar comprobaciones.</p></div>
        <div class="mini-card"><h4>🔗 La API detrás</h4><p>Gran parte de los fallos están en la API que consume la app: ahí aplicas el módulo 14.</p></div>
      </div>` },
    { h: "4. Herramientas", html: `<table class="tbl"><tr><th>Herramienta</th><th>Para qué</th></tr>
      <tr><td><strong>MobSF</strong></td><td>Análisis estático y dinámico automatizado (la más completa para empezar)</td></tr>
      <tr><td><strong>apktool</strong></td><td>Desempaquetar/recompilar APK</td></tr>
      <tr><td><strong>jadx</strong></td><td>Ver el código Java decompilado</td></tr>
      <tr><td><strong>Frida</strong></td><td>Instrumentación dinámica (hookear funciones en caliente)</td></tr>
      <tr><td><strong>objection</strong></td><td>Frida simplificado: bypass de pinning/root sin escribir scripts</td></tr>
      <tr><td><strong>Burp + proxy</strong></td><td>Interceptar el tráfico de la app</td></tr></table>` },
    { h: "5. Reto típico: SSL pinning", html: `<p>Muchas apps usan <strong>certificate pinning</strong>: solo confían en su certificado, así que Burp no puede interceptar el tráfico de primeras. Se "salta" en laboratorio con <strong>Frida/objection</strong> para poder auditar la comunicación. Es un escenario muy habitual que conviene conocer.</p>` },
    { h: "6. Qué se espera de un júnior", html: `<p>No necesitas ser experto en móvil para entrar, pero sí: entender que <strong>una app móvil = cliente + API</strong>, saber que existe el MASVS/MASTG, haber pasado un APK por <strong>MobSF</strong> y conocer la idea de interceptar tráfico y saltar pinning. Con eso demuestras interés real, que es lo que valora la oferta.</p>
      <div class="legal">⚖️ Analiza solo apps propias o de laboratorio (por ejemplo, APKs deliberadamente vulnerables como DIVA, InsecureBankv2, o retos de MAS).</div>` }
  ],
  claves: ["Android = APK (jadx/apktool) · iOS = IPA", "Estático (código) vs dinámico (en ejecución)", "La API del backend suele ser el verdadero objetivo", "MobSF, Frida, objection, apktool, jadx", "Pinning se salta con Frida/objection en laboratorio"],
  entrevista: ["¿Diferencia entre análisis estático y dinámico de una app?", "¿Qué es el SSL pinning y por qué complica el pentest?", "¿Qué herramientas usarías para analizar un APK?"],
  quiz: [
    { q: "El paquete de una aplicación Android tiene extensión…", op: [".ipa", ".apk", ".exe", ".dmg"], ok: 1, exp: "Android usa .apk (o .aab); iOS usa .ipa." },
    { q: "Analizar el código de un APK sin ejecutarlo es análisis…", op: ["Dinámico", "Estático", "De red", "Físico"], ok: 1, exp: "El análisis estático inspecciona el código/recursos sin ejecutar la app." },
    { q: "En muchas apps, el verdadero objetivo de un pentest es…", op: ["El icono", "La API del backend que consume la app", "El idioma", "El tamaño del APK"], ok: 1, exp: "Gran parte de las vulnerabilidades reales están en la API detrás." },
    { q: "Frida/objection se usan para…", op: ["Escanear puertos", "Instrumentación dinámica y saltar pinning/root en laboratorio", "Crackear WiFi", "Enviar phishing"], ok: 1, exp: "Permiten hookear funciones en caliente y bypassear comprobaciones." },
    { q: "La herramienta todo-en-uno para empezar con análisis de móviles es…", op: ["MobSF", "Nmap", "Hydra", "BloodHound"], ok: 0, exp: "MobSF automatiza análisis estático y dinámico de APK/IPA." }
  ]
},
/* ═══════════════════ ENTREVISTA ═══════════════════ */
{
  id: 19, nivel: "Entrevista", lab: "entrevista", min: 26,
  titulo: "Informe, PoC y la entrevista técnica",
  resumen: "Cómo se escribe un informe y una prueba de concepto, las preguntas más frecuentes con respuestas modelo, las certificaciones y tus primeros 90 días.",
  objetivos: ["Estructurar un informe técnico y una PoC", "Responder las preguntas clásicas con método (STAR)", "Elegir una ruta de certificaciones", "Planificar tus primeros 90 días en el puesto"],
  secciones: [
    { h: "1. El informe: tu producto final", html: `<p>La oferta repite "informes técnicos" y "PoC". El informe es lo que el cliente paga: si está mal, el mejor pentest no vale nada. Estructura típica:</p>
      <div class="flow">
        <div class="fstep"><b>Resumen ejecutivo</b><span>Para dirección, sin tecnicismos</span></div>
        <div class="fstep"><b>Alcance y metodología</b><span>Qué, cuándo, cómo</span></div>
        <div class="fstep"><b>Hallazgos</b><span>Por severidad</span></div>
        <div class="fstep"><b>Remediación</b><span>Cómo arreglarlo</span></div>
        <div class="fstep"><b>Anexos</b><span>Evidencias, PoC</span></div>
      </div>` },
    { h: "2. Anatomía de un buen hallazgo", html: `<table class="tbl"><tr><th>Campo</th><th>Contenido</th></tr>
      <tr><td>Título</td><td>Claro: "SQL Injection en el login de /admin"</td></tr>
      <tr><td>Severidad</td><td>CVSS + justificación del riesgo real</td></tr>
      <tr><td>Descripción</td><td>Qué es y por qué importa (en lenguaje del cliente)</td></tr>
      <tr><td>Evidencia / PoC</td><td>Pasos reproducibles + capturas + petición</td></tr>
      <tr><td>Impacto</td><td>Qué puede pasar en el negocio</td></tr>
      <tr><td>Remediación</td><td>Solución concreta y accionable</td></tr>
      <tr><td>Referencias</td><td>CWE, OWASP, CVE</td></tr></table>
      <div class="callout tip">💡 Una PoC debe ser <strong>reproducible y mínima</strong>: los pasos justos para que el cliente confirme el fallo, sin causar daño. "Demuestra, no destruyas".</div>` },
    { h: "3. Preguntas técnicas frecuentes (con respuesta)", html: `<ul>
        <li><strong>"Enumérame el OWASP Top 10"</strong> → recítalo con un ejemplo de 2-3 (módulo 7).</li>
        <li><strong>"¿Cómo funciona un SQLi?"</strong> → mezcla de datos y código; <code>' OR '1'='1</code>; defensa parametrizada (módulo 12).</li>
        <li><strong>"Diferencia entre XSS y CSRF"</strong> → script vs acción forzada (módulo 13).</li>
        <li><strong>"¿Qué hace nmap -sV?"</strong> → detecta servicio y versión para buscar CVEs (módulo 9).</li>
        <li><strong>"Diferencia 401 vs 403"</strong> → no autenticado vs sin permiso (módulo 2).</li>
        <li><strong>"¿Cómo priorizas vulnerabilidades?"</strong> → CVSS + exposición + explotabilidad + criticidad (módulo 6).</li>
        <li><strong>"Explícame el saludo TCP"</strong> → SYN, SYN/ACK, ACK (módulo 1).</li>
        <li><strong>"¿Qué es un IDOR?"</strong> → acceso a objeto ajeno por id; A01/BOLA (módulo 14).</li>
      </ul>` },
    { h: "4. Preguntas de actitud: método STAR", html: `<p>Para "háblame de una vez que…", usa <strong>STAR</strong>:</p>
      <div class="anatomy">
        <div class="pz c"><code>S</code><small>Situación: el contexto</small></div>
        <div class="pz y"><code>T</code><small>Tarea: tu objetivo</small></div>
        <div class="pz g"><code>A</code><small>Acción: qué hiciste tú</small></div>
        <div class="pz b"><code>R</code><small>Resultado: el impacto</small></div>
      </div>
      <p>Y para lo que no sepas: <em>"No lo he usado aún, pero sé que sirve para X y así es como lo investigaría"</em>. La honestidad + curiosidad gana a fingir.</p>` },
    { h: "5. Certificaciones (ruta recomendada)", html: `<table class="tbl"><tr><th>Cert</th><th>Nivel</th><th>Nota</th></tr>
      <tr><td><strong>eJPT</strong></td><td>Entrada</td><td>Ideal para júnior; práctica, asequible</td></tr>
      <tr><td><strong>PNPT</strong></td><td>Entrada-medio</td><td>Pentest real + informe, muy valorada</td></tr>
      <tr><td><strong>CPSA / CRT</strong></td><td>Medio</td><td>Reconocidas en entornos UK/consultoría</td></tr>
      <tr><td><strong>OSCP</strong></td><td>Medio-alto</td><td>La referencia del sector; exigente</td></tr>
      <tr><td><strong>OSWA / OSWE</strong></td><td>Web</td><td>Especialización en web</td></tr>
      <tr><td><strong>CRTO</strong></td><td>Red Team</td><td>Red Team ops (AD, C2)</td></tr></table>
      <p class="muted">La oferta cita eJPT, PNPT, OSCP, OSWA, CPSA, CRTO. Menciona que conoces la ruta y cuál estás preparando: demuestra compromiso.</p>` },
    { h: "6. Plataformas y tus primeros 90 días", html: `<p><strong>Dónde practicar (gratis o barato):</strong> PortSwigger Web Security Academy (web), TryHackMe (guiado), HackTheBox (realista), VulnHub (máquinas), Root-Me, OverTheWire (bases).</p>
      <div class="flow">
        <div class="fstep"><b>Días 1-30</b><span>Aprende procesos, plantillas de informe, herramientas internas. Pregunta mucho.</span></div>
        <div class="fstep"><b>Días 31-60</b><span>Asume tareas de validación de vulnerabilidades y partes de un pentest con apoyo.</span></div>
        <div class="fstep"><b>Días 61-90</b><span>Lleva hallazgos de principio a fin, propón automatizaciones y una mejora.</span></div>
      </div>
      <div class="callout tip">💡 Cierre de entrevista: ten preparadas 2-3 preguntas para ellos ("¿cómo es un engagement típico del equipo?", "¿qué esperáis de un júnior a los 3 meses?"). Muestra interés y proyección.</div>` }
  ],
  claves: ["Informe: resumen ejecutivo + hallazgos + remediación", "PoC reproducible y mínima: demuestra, no destruyas", "STAR para preguntas de actitud", "Ruta cert: eJPT → PNPT → OSCP/OSWA → CRTO", "Practica en PortSwigger, TryHackMe, HackTheBox"],
  entrevista: ["¿Cómo estructuras un informe de pentest?", "Háblame de un fallo que encontraste y cómo lo reportaste (STAR)", "¿Qué certificación estás preparando y por qué?"],
  quiz: [
    { q: "El apartado del informe dirigido a la dirección, sin tecnicismos, es…", op: ["Los anexos", "El resumen ejecutivo", "La PoC", "Las referencias"], ok: 1, exp: "El resumen ejecutivo traduce el riesgo al lenguaje del negocio." },
    { q: "Una buena prueba de concepto (PoC) debe ser…", op: ["Lo más destructiva posible", "Reproducible y mínima, sin causar daño", "Secreta", "Solo verbal"], ok: 1, exp: "Demuestra el fallo con los pasos justos: 'demuestra, no destruyas'." },
    { q: "El método STAR sirve para…", op: ["Escanear puertos", "Estructurar respuestas de actitud (Situación, Tarea, Acción, Resultado)", "Priorizar CVEs", "Crackear hashes"], ok: 1, exp: "STAR ordena las respuestas sobre experiencias con método." },
    { q: "¿Qué certificación suele recomendarse como primera para un perfil júnior?", op: ["OSCP", "eJPT", "CRTO", "OSWE"], ok: 1, exp: "La eJPT es práctica, asequible y pensada para iniciarse." },
    { q: "Al priorizar un hallazgo en el informe, la severidad se justifica con…", op: ["El color favorito", "CVSS y el riesgo real (exposición, impacto en negocio)", "El número de páginas", "La hora del escaneo"], ok: 1, exp: "Se combina el CVSS con el contexto real del activo y el negocio." }
  ]
},
];
