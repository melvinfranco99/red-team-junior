window.VIDEOS = [
 {
  "id": "01",
  "titulo": "Redes y TCP/IP desde cero",
  "subtitulo": "IP, puertos, el saludo TCP y DNS: cómo viaja la información que vas a auditar",
  "nivel": "Fundamentos",
  "modulo": 1,
  "duracion": 230.5,
  "palabras": 570,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 26.9,
    "titulo": "La analogía del edificio"
   },
   {
    "t": 66.1,
    "titulo": "IP: públicas y privadas"
   },
   {
    "t": 106.7,
    "titulo": "TCP vs UDP y el saludo de tres pasos"
   },
   {
    "t": 150.6,
    "titulo": "Puertos que debes saberte de memoria"
   },
   {
    "t": 188.6,
    "titulo": "DNS: la agenda de Internet"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Bienvenido al primer vídeo del curso. Antes de atacar nada, hay que entender cómo viaja la información por una red. En este vídeo verás, con analogías muy sencillas, qué es una dirección IP, qué es un puerto, cómo se saludan dos equipos con el protocolo TCP y para qué sirve el DNS. Son los cimientos: si los dominas, todo lo demás encaja. Vamos paso a paso."
   },
   {
    "titulo": "La analogía del edificio",
    "texto": "Imagina que cada ordenador o servidor de Internet es un edificio de oficinas. La dirección IP es la calle y el número: identifica al edificio. Un puerto es cada puerta numerada del edificio, y hay sesenta y cinco mil quinientas treinta y seis. Detrás de cada puerta abierta hay un servicio escuchando. Y el protocolo es el idioma que se habla en esa puerta: en el ochenta se habla HTTP, en el veintidós se habla SSH. Lo primero que hace un pentester es dibujar el plano del edificio: qué puertas están abiertas y qué idioma se habla en cada una. Eso es, exactamente, escanear."
   },
   {
    "titulo": "IP: públicas y privadas",
    "texto": "Las direcciones tienen dos sabores. Las privadas, como las que empiezan por ciento noventa y dos punto ciento sesenta y ocho, se usan dentro de casas y empresas y no navegan por Internet directamente. Las públicas sí son visibles desde Internet, y son precisamente la superficie de ataque externa que auditarás. Una dirección especial es la ciento veintisiete punto cero punto cero punto uno, que siempre apunta a tu propio equipo. Y fíjate en la notación con barra, como barra veinticuatro: indica cuántas direcciones abarca una red. Barra veinticuatro son doscientas cincuenta y seis direcciones. Lo verás constantemente en Nmap."
   },
   {
    "titulo": "TCP vs UDP y el saludo de tres pasos",
    "texto": "Para hablar, dos equipos usan sobre todo dos protocolos. TCP es como una llamada de teléfono: primero saludas y confirmas que te oyen. El saludo tiene tres pasos: el cliente envía un paquete SYN que significa quiero conectar; el servidor responde SYN ACK, de acuerdo; y el cliente confirma con ACK. Ya hay conexión. UDP, en cambio, es como gritar un mensaje por la ventana: rápido, pero sin confirmación. Esto importa para el escaneo: el escaneo SYN de Nmap envía solo el primer paquete y, si recibe respuesta, corta sin terminar el saludo. Por eso se llama medio abierto y es más sigiloso."
   },
   {
    "titulo": "Puertos que debes saberte de memoria",
    "texto": "Hay un puñado de puertos que debes reconocer al instante, porque aparecerán en todos tus escaneos. El veintidós es SSH, el acceso remoto seguro en Linux. El ochenta es la web sin cifrar y el cuatrocientos cuarenta y tres la web cifrada. El cuatrocientos cuarenta y cinco es SMB, la compartición de ficheros de Windows, muy interesante en auditorías internas. El tres mil trescientos ochenta y nueve es el escritorio remoto, RDP. Y el cincuenta y tres es el DNS. Memoriza estos cinco y tendrás ya una intuición rapidísima al leer un escaneo."
   },
   {
    "titulo": "DNS: la agenda de Internet",
    "texto": "Por último, el DNS. Es la agenda de contactos de Internet: convierte un nombre fácil de recordar, como telefónica punto com, en la dirección IP real del servidor, igual que tu móvil convierte Mamá en su número. En reconocimiento mirarás varios tipos de registro: el A da la dirección, el MX los servidores de correo, el TXT guarda verificaciones que a veces filtran información útil. Y algo clave: cada subdominio, como vpn punto, dev punto o api punto, es una posible puerta nueva. Enumerar subdominios amplía la superficie de ataque, y lo veremos en el nivel de reconocimiento. Nos vemos en el siguiente vídeo."
   }
  ]
 },
 {
  "id": "02",
  "titulo": "La web por dentro: HTTP y HTTPS",
  "subtitulo": "Petición y respuesta, métodos, códigos de estado, cookies y TLS",
  "nivel": "Fundamentos",
  "modulo": 2,
  "duracion": 219.4,
  "palabras": 523,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 24.1,
    "titulo": "HTTP es una conversación"
   },
   {
    "t": 63.2,
    "titulo": "Métodos HTTP"
   },
   {
    "t": 97.3,
    "titulo": "Códigos de estado"
   },
   {
    "t": 138.2,
    "titulo": "Cookies y sesiones"
   },
   {
    "t": 177.4,
    "titulo": "HTTPS = HTTP + TLS"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "En este vídeo abrimos el capó de la web. Casi todos los ataques que verás ocurren dentro del protocolo HTTP, así que entenderlo es media batalla ganada. Vamos a ver cómo es una petición y una respuesta, los métodos, los códigos de estado, las cookies y qué añade exactamente el HTTPS. Todo con ejemplos que luego reconocerás en Burp Suite."
   },
   {
    "titulo": "HTTP es una conversación",
    "texto": "La web funciona con un esquema muy simple: petición y respuesta. Tu navegador, el cliente, pide algo, y el servidor responde. Es como pedir en un bar: ponme un café, y te lo sirven. Cada petición lleva una línea con el método y la ruta, y unas cabeceras con información extra. La respuesta trae un código de estado y el contenido. En Burp Suite, la herramienta que verás más adelante, pasarás horas leyendo y, sobre todo, modificando estas peticiones antes de enviarlas. Entender esta conversación es, literalmente, la mitad del trabajo en pentest web."
   },
   {
    "titulo": "Métodos HTTP",
    "texto": "Cada petición usa un método, que es el verbo de la acción. GET sirve para pedir o leer datos, como consultar el menú. POST envía datos, por ejemplo cuando haces login o rellenas un formulario; sería hacer un pedido. PUT y PATCH crean o actualizan un recurso. Y DELETE lo borra. En las APIs REST estos verbos son el abecé: GET lee, POST crea, PUT y PATCH actualizan, DELETE borra. Y un fallo clásico que buscarás es un DELETE accesible por alguien que no debería poder borrar."
   },
   {
    "titulo": "Códigos de estado",
    "texto": "La respuesta siempre empieza con un número de tres cifras. El primer dígito te dice la familia. Los doscientos son éxito. Los trescientos son redirecciones. Los cuatrocientos son errores tuyos, del cliente: el cuatrocientos uno significa que no has iniciado sesión, y el cuatrocientos tres que estás identificado pero no tienes permiso. Ojo a esa diferencia, es pregunta de entrevista. Los quinientos son errores del servidor, y son muy interesantes: si al meter una comilla la página devuelve un quinientos, puede que hayas tocado una vulnerabilidad. En el fuzzing te guiarás por estos códigos todo el rato."
   },
   {
    "titulo": "Cookies y sesiones",
    "texto": "Hay un detalle importante: HTTP no tiene memoria, no recuerda quién eres de una petición a la siguiente. Para mantenerte logueado se usa una cookie de sesión: el servidor te da una pulsera, un token, y tú la enseñas en cada petición. Esa cookie se puede proteger con tres banderas que debes conocer. HttpOnly impide que el JavaScript la lea, lo que frena su robo mediante un ataque XSS. Secure hace que solo se envíe por HTTPS. Y SameSite limita que se mande entre sitios distintos, lo que mitiga el CSRF. Tres palabras que debes saber explicar."
   },
   {
    "titulo": "HTTPS = HTTP + TLS",
    "texto": "Y por último, el candado. HTTPS es simplemente HTTP metido dentro de un túnel cifrado llamado TLS. Aporta tres cosas, como una carta certificada. Confidencialidad: nadie en el camino puede leer el contenido. Integridad: nadie puede alterar el mensaje sin que se note. Y autenticidad: el certificado demuestra que el servidor es quien dice ser. En tus auditorías reportarás problemas como certificados caducados, autofirmados o con cifrados antiguos e inseguros, usando herramientas como testssl punto sh. Con esto ya entiendes la web por dentro. Vamos a por Linux."
   }
  ]
 },
 {
  "id": "03",
  "titulo": "Linux esencial para pentesting",
  "subtitulo": "Navegación, permisos, usuarios y tuberías: tu herramienta de trabajo diaria",
  "nivel": "Fundamentos",
  "modulo": 3,
  "duracion": 211.6,
  "palabras": 538,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 22.3,
    "titulo": "Por qué Linux"
   },
   {
    "t": 60.0,
    "titulo": "Comandos de navegación"
   },
   {
    "t": 94.6,
    "titulo": "Permisos: la clave de la escalada"
   },
   {
    "t": 132.9,
    "titulo": "Usuarios, root y sudo"
   },
   {
    "t": 170.5,
    "titulo": "Tuberías: encadenar comandos"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "La mayoría de servidores corren Linux, y tu distribución de trabajo será Kali o Parrot. Dominar la terminal no es opcional en este puesto. En este vídeo verás lo esencial para moverte, buscar, entender permisos y encadenar comandos. No necesitas memorizarlo todo: necesitas perderle el miedo a la línea de comandos."
   },
   {
    "titulo": "Por qué Linux",
    "texto": "Empecemos por el porqué. Las distribuciones de pentesting, como Kali Linux y Parrot, traen preinstaladas cientos de herramientas ofensivas, y todas se manejan desde la terminal. Por eso la línea de comandos es tu banco de trabajo. Lo ideal es que montes un laboratorio seguro: Kali en una máquina virtual, junto a máquinas vulnerables como Metasploitable, en una red privada y aislada. Y una advertencia que repetiré en todo el curso: practica solo en sistemas que sean tuyos o en retos autorizados como TryHackMe o HackTheBox. Escanear o atacar algo ajeno sin permiso es delito."
   },
   {
    "titulo": "Comandos de navegación",
    "texto": "Veamos los comandos básicos para moverte. ele ese guion ele a lista todo lo que hay en una carpeta, incluidos los ficheros ocultos y sus permisos. ce de cambia de directorio. cat o less muestran el contenido de un fichero. find busca ficheros por nombre en todo el sistema. Y grep, que es quizá el más útil, busca un texto dentro de los ficheros; por ejemplo, buscar la palabra password en todo un directorio. Con estos cinco ya te defiendes para explorar un sistema que acabas de comprometer en un laboratorio."
   },
   {
    "titulo": "Permisos: la clave de la escalada",
    "texto": "Los permisos en Linux son la clave de muchas escaladas de privilegios, así que préstales atención. Cada fichero tiene tres permisos, leer, escribir y ejecutar, que se abrevian erre uve equis, y se definen para tres grupos: el dueño, el grupo y los demás. En números, chmod siete cinco cinco significa todos los permisos para el dueño y lectura y ejecución para el resto. Y hay un truco fundamental: algunos binarios tienen el bit SUID, lo que hace que se ejecuten con los privilegios de su dueño, a veces root. Buscar esos binarios es uno de los primeros pasos de una escalada de privilegios."
   },
   {
    "titulo": "Usuarios, root y sudo",
    "texto": "En Linux, el administrador todopoderoso se llama root, y tiene el identificador de usuario cero. Un usuario normal, cuando necesita hacer algo con privilegios, usa sudo delante del comando. Para orientarte nada más entrar en un sistema, whoami te dice quién eres, e id te muestra tus grupos. Pero el comando estrella para una escalada es sudo guion ele: te lista qué comandos puedes ejecutar como root. Si esa lista es demasiado permisiva, probablemente tengas ahí tu camino directo para convertirte en administrador. Recuérdalo: sudo guion ele es de las primeras cosas que se prueban."
   },
   {
    "titulo": "Tuberías: encadenar comandos",
    "texto": "Terminamos con un superpoder de la terminal: la tubería, esa barra vertical. Pasa la salida de un comando como entrada del siguiente, como una cadena de montaje. Por ejemplo, puedes leer un registro, filtrar las líneas con la palabra admin, ordenarlas y contar las repetidas, todo en una sola línea encadenada. Los filtros que más usarás son grep para buscar, cut y awk para columnas, sort para ordenar y wc guion ele para contar líneas. Y para la red, recuerda curl para ver cabeceras, wget para descargar y netcat para abrir conexiones. Con esto ya tienes base de Linux. Vamos con Windows."
   }
  ]
 },
 {
  "id": "04",
  "titulo": "Windows y Active Directory esencial",
  "subtitulo": "El entorno corporativo que auditarás: dominio, SMB, hashes y PowerShell",
  "nivel": "Fundamentos",
  "modulo": 4,
  "duracion": 224.5,
  "palabras": 541,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 21.7,
    "titulo": "Active Directory: la recepción del edificio"
   },
   {
    "t": 60.9,
    "titulo": "Puertos Windows"
   },
   {
    "t": 100.1,
    "titulo": "Hashes, NTLM y Kerberos"
   },
   {
    "t": 139.7,
    "titulo": "PowerShell y herramientas"
   },
   {
    "t": 182.2,
    "titulo": "El flujo de un ataque interno"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Casi todas las empresas gestionan sus equipos con Windows y Active Directory. Si en la oferta hablan de infraestructuras internas, gran parte es esto. Aunque es un puesto júnior, necesitas conocer el mapa: qué es un dominio, cómo se autentican los usuarios y qué herramientas suenan. Vamos a ello sin agobios."
   },
   {
    "titulo": "Active Directory: la recepción del edificio",
    "texto": "Empecemos por el corazón de la red Windows: Active Directory. Imagínalo como la recepción de un gran edificio, que tiene la lista de todos los empleados, sus llaves y a qué salas puede entrar cada uno. Es una base de datos central de usuarios, equipos y permisos. El servidor que la guarda y la valida se llama Controlador de Dominio. Dentro encontrarás conceptos como el dominio, los usuarios y grupos, las políticas o GPO, y las unidades organizativas. En una auditoría interna, Active Directory es casi siempre el objetivo número uno, porque quien lo controla, controla toda la empresa."
   },
   {
    "titulo": "Puertos Windows",
    "texto": "Igual que en Linux, hay puertos que delatan un entorno Windows. El ochenta y ocho es Kerberos, el sistema de autenticación del dominio. El cuatrocientos cuarenta y cinco es SMB, que sirve para compartir ficheros y, a menudo, para ejecutar comandos en remoto. El trescientos ochenta y nueve es LDAP, que permite consultar el directorio. El tres mil trescientos ochenta y nueve es el escritorio remoto. Y el cinco mil novecientos ochenta y cinco es WinRM, la administración remota. Cuando veas estos puertos en un escaneo, piensa inmediatamente en Windows y Active Directory."
   },
   {
    "titulo": "Hashes, NTLM y Kerberos",
    "texto": "Windows no guarda tu contraseña en texto claro, sino su hash, una huella irreversible. Alrededor de esto hay dos técnicas ofensivas que debes poder nombrar. La primera es Pass-the-Hash: en ciertos casos, basta con tener ese hash, sin conocer la contraseña real, para autenticarte haciéndote pasar por el usuario. La segunda es Kerberoasting: consiste en pedir tickets de servicio y tratar de crackear offline la contraseña de las cuentas de servicio. No necesitas ejecutarlas para la entrevista júnior, pero sí explicar la idea: en Windows las credenciales se manejan como hashes, y hay técnicas para reutilizarlos o romperlos."
   },
   {
    "titulo": "PowerShell y herramientas",
    "texto": "Para orientarte en una máquina Windows, hay comandos equivalentes a los de Linux. whoami barra all te da tu usuario, grupos y privilegios. systeminfo revela la versión y los parches instalados, útil para buscar vulnerabilidades conocidas. Y net user lista los usuarios. PowerShell es, a la vez, la navaja suiza de administración y una potente herramienta de ataque, por eso las empresas vigilan su uso. Finalmente, hay tres nombres que debes conocer aunque no los domines: BloodHound, que dibuja las rutas de ataque dentro de Active Directory; Impacket, una suite de scripts; y CrackMapExec. Saber qué hacen ya suma puntos en la entrevista."
   },
   {
    "titulo": "El flujo de un ataque interno",
    "texto": "Para cerrar, quédate con el mapa mental de un ataque interno, que te permitirá hablar el idioma del equipo. Primero entras, comprometiendo un equipo o un usuario. Luego enumeras: usuarios, grupos y recursos compartidos por SMB. Después escalas privilegios, de usuario normal a administrador local. A continuación te mueves lateralmente de una máquina a otra. Y el objetivo final es llegar al Controlador de Dominio y conseguir ser administrador del dominio, es decir, dueño de toda la red. Como júnior, lo importante es entender este flujo, no ejecutarlo entero el primer día. Con esto cerramos los fundamentos."
   }
  ]
 },
 {
  "id": "05",
  "titulo": "Qué es un pentest y un Red Team",
  "subtitulo": "Tipos de prueba, fases, alcance, reglas de enganche y marco legal",
  "nivel": "Metodología",
  "modulo": 5,
  "duracion": 228.0,
  "palabras": 548,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 22.5,
    "titulo": "Vocabulario que confunde a todos"
   },
   {
    "t": 65.5,
    "titulo": "Las fases de un pentest"
   },
   {
    "t": 112.2,
    "titulo": "Tipos de caja y alcance"
   },
   {
    "t": 148.7,
    "titulo": "El marco legal (no te lo saltes)"
   },
   {
    "t": 189.7,
    "titulo": "Metodologías de referencia"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "En este vídeo ordenamos el vocabulario que todo el mundo confunde: pentesting, Red Team, bug bounty y análisis de vulnerabilidades. Verás las fases de un pentest, los tipos de caja, qué es el alcance y, muy importante, el marco legal. Porque en este trabajo, saber qué NO puedes tocar es tan importante como saber atacar."
   },
   {
    "titulo": "Vocabulario que confunde a todos",
    "texto": "Empecemos distinguiendo cuatro términos que mucha gente mezcla. Un análisis de vulnerabilidades busca y lista fallos, normalmente con un escáner, pero no los explota. Un pentesting va más allá: identifica y además explota los fallos de forma controlada, para demostrar el impacto real. Un ejercicio de Red Team simula a un atacante real contra toda la organización, con sigilo y objetivos concretos, y evalúa también si el equipo defensivo detecta y responde. Y un bug bounty es un programa abierto donde investigadores reportan fallos a cambio de recompensa. La oferta es de Red Team, pero el día a día que describe es, sobre todo, pentesting y gestión de vulnerabilidades."
   },
   {
    "titulo": "Las fases de un pentest",
    "texto": "Un pentest sigue unas fases ordenadas. Primero se define el alcance: las reglas, los permisos y los objetivos. Segundo, el reconocimiento, donde recoges información. Tercero, la enumeración de puertos, servicios y versiones. Cuarto, la explotación, donde validas las vulnerabilidades explotándolas. Quinto, la post-explotación: escalas privilegios, te mueves y mides el impacto real. Y sexto, el informe, que es el producto final. En la entrevista, ser capaz de recitar estas fases, cada una con una frase de ejemplo, transmite inmediatamente que tienes método. Añade siempre, al principio, la autorización por escrito."
   },
   {
    "titulo": "Tipos de caja y alcance",
    "texto": "Las pruebas se clasifican según la información que te dan. En caja negra no sabes nada del objetivo, como un atacante externo real. En caja blanca te dan todo: código fuente, credenciales, diagramas, lo que da la máxima cobertura. Y en caja gris te dan información parcial, por ejemplo un usuario de prueba; es el escenario más habitual en el mundo real. Por encima de todo está el alcance, el scope, que define exactamente qué activos puedes tocar y cuáles no. Y las reglas de enganche fijan horarios, técnicas permitidas y a quién avisar si algo se rompe."
   },
   {
    "titulo": "El marco legal (no te lo saltes)",
    "texto": "Y llegamos a lo más importante de este vídeo: la legalidad. Para cualquier prueba necesitas autorización por escrito, firmada por quien pueda autorizar ese activo. En España, el Código Penal castiga el acceso no autorizado y los daños a sistemas en sus artículos ciento noventa y siete bis y doscientos sesenta y cuatro. Y la regla de oro: si durante el reconocimiento descubres un activo jugoso pero fuera del alcance acordado, no lo tocas. Lo documentas y preguntas. Salirte del scope puede ser delito aunque te hayan contratado. Interioriza esto: un buen pentester es, ante todo, alguien de fiar."
   },
   {
    "titulo": "Metodologías de referencia",
    "texto": "Por último, no inventamos la rueda: existen metodologías de referencia que dan rigor a tu trabajo. Para web, la biblia es la OWASP Web Security Testing Guide. Para móvil, la guía MASTG, también de OWASP. Para describir técnicas de ataque de forma estandarizada, el framework MITRE ATT and CK, muy usado en Red Team. Y para el proceso general, el PTES o la guía del NIST ochocientos guion ciento quince. En la entrevista, citar OWASP para web y MITRE ATT and CK para técnicas te hace sonar como alguien con método profesional. Vamos ahora con las vulnerabilidades."
   }
  ]
 },
 {
  "id": "06",
  "titulo": "Vulnerabilidades: CVE, CVSS, CWE y priorización",
  "subtitulo": "Cómo se identifican, puntúan y priorizan las vulnerabilidades",
  "nivel": "Metodología",
  "modulo": 6,
  "duracion": 224.4,
  "palabras": 552,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 21.6,
    "titulo": "Las siglas que lo ordenan todo"
   },
   {
    "t": 65.5,
    "titulo": "CVSS por dentro"
   },
   {
    "t": 105.9,
    "titulo": "Escala de severidad"
   },
   {
    "t": 137.9,
    "titulo": "Priorizar: la nota no lo es todo"
   },
   {
    "t": 182.2,
    "titulo": "El ciclo de gestión de vulnerabilidades"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Este vídeo te da el lenguaje con el que hablarás de vulnerabilidades y escribirás informes. Vas a entender de una vez por todas las siglas CVE, CWE, CVSS y EPSS, cómo se lee una puntuación de gravedad y, sobre todo, cómo se priorizan cien vulnerabilidades, que es justo lo que pide la oferta."
   },
   {
    "titulo": "Las siglas que lo ordenan todo",
    "texto": "Cuatro siglas ordenan todo este mundo. El CVE es el identificador único de una vulnerabilidad concreta, como un número de expediente. El CWE es el tipo o categoría de debilidad, por ejemplo la inyección SQL. El CVSS es la puntuación de gravedad, de cero a diez. Y el EPSS estima la probabilidad de que esa vulnerabilidad se explote pronto. Una analogía: el CWE es la enfermedad, por ejemplo la gripe; el CVE es el paciente concreto, la gripe de Juan el martes; el CVSS es la gravedad de su caso; y el EPSS, la probabilidad de contagio. Con esta imagen no los volverás a confundir."
   },
   {
    "titulo": "CVSS por dentro",
    "texto": "La puntuación CVSS no sale de la nada: se calcula a partir de un vector con varias métricas base. El vector de ataque indica desde dónde se explota: por red, que es lo más grave, o en local. La complejidad dice si es fácil o requiere condiciones especiales. Los privilegios requeridos y la interacción del usuario miden si hace falta ya tener permisos o engañar a alguien. Y las tres últimas, ce, i y a, miden el impacto en la confidencialidad, la integridad y la disponibilidad. No necesitas calcularlo a mano: en el laboratorio de este módulo tienes una calculadora interactiva para que juegues con el vector."
   },
   {
    "titulo": "Escala de severidad",
    "texto": "La nota se traduce en una severidad con nombre. De nueve a diez, es crítica: hay que actuar ya. De siete a ocho con nueve, alta. De cuatro a seis con nueve, media. Y por debajo de cuatro, baja. Estas etiquetas son las que verá el cliente en tu informe, así que conviene que las tengas automatizadas en la cabeza. Un nueve coma ocho es casi el peor caso posible: explotable por red, fácil, sin privilegios y con impacto total."
   },
   {
    "titulo": "Priorizar: la nota no lo es todo",
    "texto": "Y aquí viene el error típico de un júnior: ordenar los hallazgos solo por la nota CVSS. El riesgo real combina cuatro cosas. La gravedad, que es el CVSS. La explotabilidad: ¿existe ya un exploit público? ¿qué dice el EPSS? La exposición: ¿está en Internet o en una red interna aislada? Y la criticidad del activo: ¿afecta a datos de clientes o a un sistema crítico de negocio? Por eso, una vulnerabilidad media en un servidor expuesto a Internet, con exploit público y datos sensibles, puede ser más urgente que una crítica en un sistema de pruebas aislado. Saber decir esto en una entrevista marca la diferencia."
   },
   {
    "titulo": "El ciclo de gestión de vulnerabilidades",
    "texto": "Todo esto se enmarca en un ciclo que es, literalmente, lo que pide la oferta. Primero se descubren las vulnerabilidades, con escáneres como Nessus u OpenVAS y con el pentest manual. Segundo, se validan, quitando los falsos positivos, porque un escáner genera mucho ruido. Tercero, se priorizan por riesgo real. Cuarto, se remedia, con un parche o una mitigación. Y quinto, se verifica con un retest. Tu valor como analista no es lanzar el escáner, que eso lo hace cualquiera: tu valor es validar y priorizar con criterio. Vamos ahora con la estrella de la entrevista: el OWASP Top Ten."
   }
  ]
 },
 {
  "id": "07",
  "titulo": "OWASP Top 10 explicado desde cero",
  "subtitulo": "Las 10 categorías de riesgo web más críticas, con ejemplo y defensa",
  "nivel": "Metodología",
  "modulo": 7,
  "duracion": 207.2,
  "palabras": 509,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 22.4,
    "titulo": "Qué es el OWASP Top 10"
   },
   {
    "t": 56.1,
    "titulo": "A01, A02 y A03"
   },
   {
    "t": 94.3,
    "titulo": "A04, A05 y A06"
   },
   {
    "t": 131.2,
    "titulo": "A07, A08, A09 y A10"
   },
   {
    "t": 171.3,
    "titulo": "Cómo lo verás en la práctica"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Este es, probablemente, el vídeo más importante del curso para tu entrevista. El OWASP Top Ten es la pregunta estrella en cualquier puesto de seguridad web. Vamos a ver las diez categorías de la versión de dos mil veintiuno, cada una con un ejemplo sencillo y su defensa principal. Si dominas esto, ya partes con ventaja."
   },
   {
    "titulo": "Qué es el OWASP Top 10",
    "texto": "Primero, qué es. OWASP es una comunidad mundial, sin ánimo de lucro, dedicada a la seguridad del software. Su Top Ten es la lista de las diez categorías de riesgo web más críticas, y se revisa cada pocos años. Es la pregunta estrella en cualquier entrevista de seguridad web, así que tienes que dominarla. Un matiz importante: son categorías de riesgo, no vulnerabilidades concretas. La versión vigente es la de dos mil veintiuno. Vamos a recorrerlas, empezando por la más importante."
   },
   {
    "titulo": "A01, A02 y A03",
    "texto": "Las tres primeras. La A cero uno, pérdida de control de acceso, es el número uno: un usuario accede a algo que no le corresponde, como cambiar en la URL el identificador quince por el dieciséis y ver la factura de otro cliente. La A cero dos son los fallos criptográficos: datos sensibles sin cifrar o con algoritmos débiles. La A cero tres es la inyección, que incluye la inyección SQL y, desde dos mil veintiuno, también el XSS. Las defensas: verificar permisos siempre en el servidor, usar cifrado fuerte y, contra la inyección, consultas parametrizadas."
   },
   {
    "titulo": "A04, A05 y A06",
    "texto": "Las siguientes tres. La A cero cuatro es el diseño inseguro: el fallo está en el diseño, no en un bug de código; faltan controles desde el principio. La A cero cinco es la configuración de seguridad incorrecta, muy común: paneles con credenciales admin admin por defecto, directorios abiertos, mensajes de error con demasiados detalles. Y la A cero seis son los componentes vulnerables y desactualizados: usar librerías o gestores de contenido con vulnerabilidades conocidas. Se defienden con modelado de amenazas, bastionado y un buen inventario de dependencias que parchear."
   },
   {
    "titulo": "A07, A08, A09 y A10",
    "texto": "Y las cuatro últimas. La A cero siete son los fallos de identificación y autenticación: contraseñas débiles, ausencia de doble factor, sesiones mal gestionadas. La A cero ocho, fallos de integridad del software y los datos, como actualizaciones o deserializaciones sin verificar. La A cero nueve, fallos de registro y monitorización: si no hay logs ni alertas, los ataques pasan desapercibidos. Y la A diez es el SSRF, donde consigues que el propio servidor haga peticiones a donde tú le digas, por ejemplo a la metadata interna de la nube. Memoriza el orden: es una pregunta clásica."
   },
   {
    "titulo": "Cómo lo verás en la práctica",
    "texto": "Para terminar, cómo se prueba todo esto en la práctica. Casi todo el Top Ten se audita con Burp Suite, interceptando y modificando peticiones, algo que verás en el nivel de explotación web. Y si quieres practicar de verdad, el mejor recurso gratuito del mundo es la PortSwigger Web Security Academy: tiene cientos de laboratorios organizados por categoría, cada uno con su solución. Probablemente sea la mejor inversión de tiempo para preparar esta entrevista. Dedícale horas y llegarás con una confianza enorme. Nos vemos en el nivel de reconocimiento."
   }
  ]
 },
 {
  "id": "08",
  "titulo": "Reconocimiento, OSINT y superficie de ataque",
  "subtitulo": "Recoger información antes de atacar: pasivo, activo, subdominios y ASM",
  "nivel": "Reconocimiento",
  "modulo": 8,
  "duracion": 222.1,
  "palabras": 510,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 20.4,
    "titulo": "Pasivo vs activo"
   },
   {
    "t": 61.3,
    "titulo": "OSINT: inteligencia de fuentes abiertas"
   },
   {
    "t": 99.9,
    "titulo": "Descubrimiento de subdominios"
   },
   {
    "t": 140.1,
    "titulo": "Attack Surface Management"
   },
   {
    "t": 178.8,
    "titulo": "De recon a hallazgos: automatización"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "El reconocimiento es la fase que más rentabiliza: cuanto mejor conoces al objetivo, más fácil es todo lo demás. En este vídeo verás la diferencia entre reconocimiento pasivo y activo, qué es el OSINT, cómo se enumeran subdominios y qué es la gestión de superficie de ataque, algo que la oferta pide de forma explícita."
   },
   {
    "titulo": "Pasivo vs activo",
    "texto": "Como un ladrón que vigila el edificio antes de entrar, el pentester recopila información primero. Hay dos modos. El reconocimiento pasivo no toca al objetivo: buscas en Google, en el DNS público, en los certificados, en LinkedIn. Es prácticamente indetectable. El reconocimiento activo sí interactúa con el objetivo: resuelves sus subdominios, escaneas, pruebas. Eso deja rastro en sus registros. La regla: lo pasivo se puede hacer con cabeza casi siempre, pero lo activo solo dentro del alcance y con autorización. Esta distinción es una pregunta habitual de entrevista."
   },
   {
    "titulo": "OSINT: inteligencia de fuentes abiertas",
    "texto": "El OSINT es la inteligencia de fuentes abiertas, y tiene herramientas muy potentes. Los Google Dorks son búsquedas avanzadas, con operadores como site o filetype, que destapan ficheros y paneles que Google ha indexado sin querer. La web crt punto sh lista subdominios a partir de los certificados emitidos. Shodan y Censys son buscadores de dispositivos y servicios expuestos en Internet. theHarvester recopila correos, subdominios y hosts. Y whois y dig te dan el titular del dominio y sus registros DNS. Con un buen OSINT, a veces encuentras la puerta antes de escanear nada."
   },
   {
    "titulo": "Descubrimiento de subdominios",
    "texto": "Una técnica central del reconocimiento es descubrir subdominios. Cada subdominio, como vpn punto, dev punto, api punto o old punto, es una posible puerta nueva, y a menudo las olvidadas son las más vulnerables. Las herramientas modernas: subfinder enumera subdominios de forma pasiva consultando muchas fuentes. amass hace lo mismo combinando pasivo y activo. Y httpx te dice cuáles de esos subdominios tienen una web viva. Todo esto se alimenta de diccionarios, siendo SecLists la colección de referencia. Más subdominios descubiertos significan más superficie de ataque donde buscar."
   },
   {
    "titulo": "Attack Surface Management",
    "texto": "La oferta menciona expresamente el análisis de la superficie de ataque externa. Esto se llama Attack Surface Management, y consiste en descubrir y vigilar de forma continua todo lo que una organización tiene expuesto a Internet: dominios, direcciones, servicios, certificados, recursos en la nube. El objetivo es encontrar aquello que la empresa ni siquiera sabe que tiene expuesto, lo que se llama shadow IT. El ciclo tiene cuatro pasos: descubrir los activos, inventariar sus servicios, evaluar su exposición y riesgo, y monitorizar los cambios de forma continua. Es un área con mucho futuro."
   },
   {
    "titulo": "De recon a hallazgos: automatización",
    "texto": "Y aquí conectamos con la automatización que también pide la oferta. Se pueden encadenar herramientas: subfinder descubre subdominios, httpx filtra los que tienen web, y nuclei lanza plantillas de comprobaciones conocidas contra todos ellos. nuclei detecta configuraciones peligrosas, paneles expuestos y vulnerabilidades conocidas a gran escala, en segundos. Es el reconocimiento moderno en una sola tubería. Eso sí, insisto en la responsabilidad: automatizar genera muchísimo tráfico y queda registrado, así que estas cadenas se lanzan exclusivamente contra activos que tengas autorización para probar. Vamos ahora con la reina de la enumeración: Nmap."
   }
  ]
 },
 {
  "id": "09",
  "titulo": "Escaneo de puertos con Nmap",
  "subtitulo": "Tipos de escaneo, detección de versiones, scripts NSE e interpretación",
  "nivel": "Reconocimiento",
  "modulo": 9,
  "duracion": 215.4,
  "palabras": 535,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 22.4,
    "titulo": "Anatomía de un comando Nmap"
   },
   {
    "t": 62.2,
    "titulo": "Paso 1 y 2: descubrir y escanear"
   },
   {
    "t": 99.8,
    "titulo": "Estados de un puerto"
   },
   {
    "t": 134.0,
    "titulo": "Scripts NSE: buscar vulnerabilidades"
   },
   {
    "t": 172.1,
    "titulo": "Metodología: el flujo completo"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Nmap es la herramienta de escaneo más famosa del mundo, y la oferta la cita por su nombre, así que vamos a dominarla. Verás cómo descubrir equipos, cómo detectar servicios y versiones, qué significan los estados de un puerto y cómo usar los scripts para buscar vulnerabilidades. Recuerda: escanear sin autorización puede ser delito."
   },
   {
    "titulo": "Anatomía de un comando Nmap",
    "texto": "Empecemos diseccionando un comando típico. La estructura es siempre la misma: nmap, luego el tipo de escaneo, luego las opciones y, al final, el objetivo. Por ejemplo, guion ese ese es el escaneo SYN, rápido y sigiloso. Guion ese uve le pide que detecte el servicio y la versión de cada puerto. Guion pe guion escanea los sesenta y cinco mil puertos. Y guion o ene guarda la salida en un fichero, porque en una auditoría siempre hay que dejar evidencias. Recuerda la regla: el objetivo, ya sea una dirección, un rango o un dominio, va siempre al final del comando."
   },
   {
    "titulo": "Paso 1 y 2: descubrir y escanear",
    "texto": "En la práctica, primero descubres qué hay vivo con guion ese ene, que hace un barrido rápido sin escanear puertos. Una vez identificada la víctima, lanzas guion ese uve, que te devuelve una tabla con el puerto, el estado, el servicio y la versión. Y fíjate en la versión, porque es oro puro: con ella buscas vulnerabilidades conocidas. Por ejemplo, si ves el servidor de ficheros vsftpd versión dos punto tres punto cuatro, esa versión concreta es famosa por tener una puerta trasera. De la versión al CVE, y del CVE al exploit: ese es el camino."
   },
   {
    "titulo": "Estados de un puerto",
    "texto": "Nmap clasifica cada puerto en un estado, y debes saber interpretarlo. Abierto significa que hay un servicio aceptando conexiones: es lo que más nos interesa, para identificar la versión y buscar fallos. Cerrado significa que el equipo responde, pero no hay nadie escuchando en ese puerto. Y filtrado significa que un cortafuegos se está tragando nuestra sonda y no obtenemos respuesta, así que Nmap no sabe qué hay detrás. Distinguir cerrado de filtrado es una pregunta clásica de entrevista: cerrado responde, filtrado no responde."
   },
   {
    "titulo": "Scripts NSE: buscar vulnerabilidades",
    "texto": "Pero Nmap no solo escanea: tiene un motor de scripts llamado NSE que automatiza comprobaciones. Hay más de seiscientos scripts. El más vistoso es guion guion script vuln, que lanza todos los scripts de la categoría de vulnerabilidades contra el objetivo y te dice cuáles son explotables, dándote incluso el CVE. También está guion ese ce, que ejecuta los scripts por defecto, y guion a mayúscula, el modo agresivo, que junta la detección de sistema operativo, versiones y scripts en un solo comando. Con esto, Nmap pasa de hacer un plano a señalarte directamente las puertas débiles."
   },
   {
    "titulo": "Metodología: el flujo completo",
    "texto": "Pongamos el flujo en orden, como en una auditoría real. Primero, descubres qué equipos están vivos en el rango autorizado. Segundo, escaneas todos los puertos de cada equipo, no solo los mil más comunes, porque los servicios escondidos en puertos raros son los más jugosos. Tercero, sobre los puertos abiertos, lanzas la detección de versiones y los scripts. Y cuarto, buscas vulnerabilidades y guardas todas las evidencias. En la web tienes un laboratorio, el constructor de comandos Nmap, donde puedes marcar opciones y ver el comando resultante con su explicación. Úsalo para perder el miedo. Vamos con la enumeración y el fuzzing."
   }
  ]
 },
 {
  "id": "10",
  "titulo": "Enumeración y fuzzing web",
  "subtitulo": "Descubrir directorios, ficheros y subdominios ocultos con diccionarios",
  "nivel": "Reconocimiento",
  "modulo": 10,
  "duracion": 192.6,
  "palabras": 507,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 21.6,
    "titulo": "Qué es el fuzzing"
   },
   {
    "t": 53.9,
    "titulo": "Fuzzing con ffuf"
   },
   {
    "t": 86.1,
    "titulo": "Leer los códigos de estado"
   },
   {
    "t": 120.3,
    "titulo": "Filtrar el ruido"
   },
   {
    "t": 154.7,
    "titulo": "gobuster y buenas prácticas"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "El fuzzing es el arte de probar miles de valores automáticamente para descubrir lo que no está enlazado: directorios ocultos, ficheros de copia, parámetros y subdominios. En este vídeo verás cómo se usan ffuf y gobuster, y, sobre todo, cómo leer los resultados, que es lo que separa a quien sabe de quien solo lanza la herramienta."
   },
   {
    "titulo": "Qué es el fuzzing",
    "texto": "Empecemos por la idea. El fuzzing consiste en probar automáticamente muchísimos valores para descubrir recursos que no están enlazados en ninguna parte: directorios ocultos como admin o backup, ficheros sensibles como un punto env o una copia de seguridad, parámetros y subdominios. Es como coger un llavero enorme e ir probando todas las llaves en una cerradura hasta que una abre. El combustible de todo esto son los diccionarios, también llamados wordlists, siendo la colección SecLists la referencia que usa todo el mundo."
   },
   {
    "titulo": "Fuzzing con ffuf",
    "texto": "La herramienta más popular es ffuf. Su truco es la palabra clave FUZZ en mayúsculas: la pones en el punto de la petición que quieres probar, y ffuf la va sustituyendo por cada entrada del diccionario. Por ejemplo, apuntas a la URL del sitio seguido de FUZZ, y le pasas una lista de nombres de directorios comunes. Con la opción guion eme ce le dices qué códigos de estado quieres que te muestre. Es rapidísimo y muy flexible, y sirve igual para directorios, para parámetros ocultos o para subdominios."
   },
   {
    "titulo": "Leer los códigos de estado",
    "texto": "Y aquí está la clave del fuzzing: leer los códigos de estado. Un doscientos significa que el recurso existe y es accesible, así que míralo. Un trescientos uno o trescientos dos es una redirección, que a menudo apunta a una carpeta real o a un login. Un cuatrocientos tres es muy interesante: el recurso existe pero el acceso está prohibido, lo que invita a intentar un bypass. Y un cuatrocientos cuatro significa que no existe, así que se descarta. Interpretar bien esta tabla es lo que distingue a un buen analista."
   },
   {
    "titulo": "Filtrar el ruido",
    "texto": "Hay un problema habitual: algunas webs devuelven un doscientos para todo, con páginas de error suaves. Si no filtras, te ahogas en falsos positivos. La solución es filtrar por el tamaño de la respuesta o por el número de palabras, con las opciones guion efe ese y guion efe doble uve. Dominar el filtrado es, otra vez, lo que separa al júnior del que de verdad sabe. Además, elige el diccionario según el contexto, la tecnología y el idioma, y controla el ritmo de las peticiones para no tumbar el servicio que estás auditando."
   },
   {
    "titulo": "gobuster y buenas prácticas",
    "texto": "Otra herramienta clásica es gobuster, con modos para directorios, para subdominios por DNS y para hosts virtuales. Y terminamos con las buenas prácticas, que importan tanto como la técnica. Verifica siempre manualmente lo que encuentres: el fuzzing te da pistas, no conclusiones. Guarda la salida para el informe. Y recuerda que el fuzzing genera muchísimo tráfico y queda registrado en los logs, así que se hace solo dentro del alcance acordado. Practica en la web con el laboratorio de lectura de fuzzing. Con esto cerramos el reconocimiento y entramos en la explotación web."
   }
  ]
 },
 {
  "id": "11",
  "titulo": "Burp Suite a fondo",
  "subtitulo": "Proxy, Repeater, Intruder y el flujo de trabajo del pentest web",
  "nivel": "Explotación web",
  "modulo": 11,
  "duracion": 207.4,
  "palabras": 508,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 21.2,
    "titulo": "Qué es Burp y por qué es el rey"
   },
   {
    "t": 57.6,
    "titulo": "Configuración básica"
   },
   {
    "t": 91.9,
    "titulo": "Las pestañas que usarás"
   },
   {
    "t": 129.8,
    "titulo": "El flujo de trabajo típico"
   },
   {
    "t": 168.7,
    "titulo": "Community, Professional y alternativas"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Burp Suite es la herramienta más usada en pentest web, y la oferta la cita por su nombre. En este vídeo verás qué es, cómo se configura, para qué sirve cada una de sus pestañas y, sobre todo, el flujo de trabajo con el que encontrarás vulnerabilidades reales. Es tu herramienta de cabecera: vamos a conocerla bien."
   },
   {
    "titulo": "Qué es Burp y por qué es el rey",
    "texto": "Empecemos por lo esencial. Burp Suite es un proxy de interceptación: se coloca justo entre tu navegador y el servidor, de modo que puedes ver y, lo más importante, modificar cada petición antes de que se envíe. Esto te da un control total sobre la conversación HTTP. Donde el navegador solo te deja usar la web como un usuario normal, Burp te deja manipularla a tu antojo: cambiar parámetros, cabeceras, cookies, lo que quieras. Por eso es, con diferencia, la herramienta más usada en pentest web y una de las que te preguntarán en la entrevista."
   },
   {
    "titulo": "Configuración básica",
    "texto": "Configurarlo es sencillo. Burp escucha por defecto en tu propia máquina, en el puerto ocho mil ochenta. Configuras el navegador, o usas el navegador que Burp trae integrado, para que todo el tráfico pase por ese proxy. Un paso que mucha gente olvida: para poder ver el tráfico HTTPS sin errores de certificado, tienes que instalar el certificado de autoridad de Burp en tu navegador. Una vez hecho esto, en la pestaña Proxy puedes interceptar peticiones una a una, y en el historial ves absolutamente todo lo que ha pasado por Burp."
   },
   {
    "titulo": "Las pestañas que usarás",
    "texto": "Burp tiene varias pestañas, pero estas son las que de verdad usarás. Proxy, para interceptar y revisar el historial. Repeater, probablemente la que más usarás, para coger una petición y reenviarla una y otra vez cambiándola a mano. Intruder, para automatizar ataques como el fuzzing de parámetros o la fuerza bruta. Decoder, para codificar y decodificar datos en Base64, URL o hexadecimal. Y Comparer, para comparar dos respuestas y detectar diferencias sutiles. Con Proxy y Repeater ya puedes hacer el ochenta por ciento del trabajo."
   },
   {
    "titulo": "El flujo de trabajo típico",
    "texto": "Veamos el flujo real. Primero mapeas la aplicación navegándola con Burp activo, para que registre todas sus peticiones. Luego observas: qué parámetros hay, qué cookies, qué llamadas a APIs. Después manipulas: coges una petición interesante, la mandas al Repeater, cambias un valor y la reenvías para ver cómo reacciona el servidor. Y cuando algo promete, lo automatizas con Intruder. Por ejemplo, capturas una petición que pide la factura con identificador quince, la mandas a Repeater, la cambias a dieciséis, y si ves la factura de otro cliente, acabas de encontrar un IDOR."
   },
   {
    "titulo": "Community, Professional y alternativas",
    "texto": "Por último, las versiones. La Community es gratuita y te sirve para aprender, aunque el Intruder va limitado en velocidad. La Professional, de pago, añade el escáner automático y quita esos límites. Burp admite extensiones muy útiles, como Autorize, que prueba automáticamente los fallos de control de acceso, o JWT Editor, para manipular tokens. Y si quieres una alternativa totalmente gratuita y muy completa, ahí tienes OWASP ZAP, que es otro proxy de interceptación. Con Burp dominado, vamos a usarlo para atacar: empezamos con las inyecciones."
   }
  ]
 },
 {
  "id": "12",
  "titulo": "Inyección: SQLi e inyección de comandos",
  "subtitulo": "Por qué ocurre, cómo se detecta y cómo se defiende la inyección",
  "nivel": "Explotación web",
  "modulo": 12,
  "duracion": 216.8,
  "palabras": 561,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 21.7,
    "titulo": "La raíz del problema"
   },
   {
    "t": 59.6,
    "titulo": "SQL Injection"
   },
   {
    "t": 95.0,
    "titulo": "Tipos de SQLi"
   },
   {
    "t": 133.5,
    "titulo": "Inyección de comandos del sistema"
   },
   {
    "t": 174.1,
    "titulo": "La defensa"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "La inyección es el clásico de los clásicos, la categoría A cero tres de OWASP. En este vídeo entenderás por qué ocurre, verás la inyección SQL con sus variantes, la inyección de comandos del sistema, y cómo se defienden. Lo importante no es memorizar payloads, sino entender la idea, que es lo que valoran en la entrevista."
   },
   {
    "titulo": "La raíz del problema",
    "texto": "Toda inyección, sea del tipo que sea, nace de lo mismo: la aplicación mezcla los datos que escribe el usuario con el código que va a ejecutar, sin separarlos. El intérprete, ya sea la base de datos o el sistema operativo, no puede distinguir qué es un dato y qué es una instrucción. La analogía es esta: estás dictando una carta a una secretaria y, en mitad del texto, dices y ahora ignora lo anterior y envíame el saldo. Si ella lo obedece ciegamente, eso es una inyección. De esta misma raíz salen la inyección SQL, el XSS y la inyección de comandos."
   },
   {
    "titulo": "SQL Injection",
    "texto": "Veamos la inyección SQL. La aplicación construye una consulta a la base de datos pegando directamente tu entrada. Si en el campo de usuario escribes comilla OR uno igual uno con dos guiones, la consulta se transforma en una condición que siempre es verdadera, y el login cae: entras sin contraseña. Con técnicas similares se pueden extraer datos enteros de la base. Existe una herramienta, sqlmap, que automatiza toda la detección y explotación, pero en la entrevista valoran que entiendas cómo funciona por dentro, no solo que sepas lanzar la herramienta."
   },
   {
    "titulo": "Tipos de SQLi",
    "texto": "La inyección SQL tiene varias modalidades según cómo recuperas la información. En la de tipo UNION, los datos vuelven directamente en la respuesta de la página. En la basada en errores, es el propio mensaje de error el que filtra los datos. Pero a veces no ves nada, y ahí entran las ciegas. En la ciega booleana, la página cambia ligeramente según si tu condición es verdadera o falsa, y vas deduciendo los datos letra a letra. Y en la ciega por tiempo, inyectas un comando que duerme cinco segundos: si la respuesta tarda, la condición era cierta. Ingenioso, ¿verdad?"
   },
   {
    "titulo": "Inyección de comandos del sistema",
    "texto": "La otra inyección importante es la de comandos del sistema operativo. Ocurre cuando la aplicación coge tu entrada y la mete en un comando del sistema. Imagina un formulario web que hace ping a la dirección que tú escribas. Si el campo no está protegido, puedes escribir la dirección, un punto y coma, y a continuación otro comando como whoami. El sistema ejecutará el ping y, además, tu comando. Los operadores clave para encadenar son el punto y coma, la doble y comercial, la doble barra vertical, la barra simple y el signo de dólar con paréntesis. Así se pasa de un simple ping a ejecutar lo que quieras."
   },
   {
    "titulo": "La defensa",
    "texto": "Terminamos con lo que más te preguntarán: la defensa. Contra la inyección SQL, la solución número uno son las consultas parametrizadas, también llamadas prepared statements, que separan el código de los datos para que la entrada del usuario nunca se interprete como instrucción. Se complementa con la validación de entradas mediante listas de permitidos y con el mínimo privilegio: el usuario de la base de datos no debe ser administrador, para limitar el daño. Contra los comandos, evitar llamar al shell. Un cortafuegos de aplicación, un WAF, ayuda, pero nunca sustituye a arreglar el código. Vamos con XSS, CSRF y SSRF."
   }
  ]
 },
 {
  "id": "13",
  "titulo": "XSS, CSRF y SSRF",
  "subtitulo": "Tres fallos web imprescindibles y cómo diferenciarlos",
  "nivel": "Explotación web",
  "modulo": 13,
  "duracion": 214.0,
  "palabras": 544,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 20.5,
    "titulo": "XSS: tu script en el navegador ajeno"
   },
   {
    "t": 54.9,
    "titulo": "Tipos de XSS"
   },
   {
    "t": 92.1,
    "titulo": "CSRF: te usan sin que lo sepas"
   },
   {
    "t": 129.9,
    "titulo": "XSS vs CSRF: no los confundas"
   },
   {
    "t": 169.8,
    "titulo": "SSRF: el servidor pide por ti"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Tres siglas que suenan parecido y que no debes confundir nunca en una entrevista: XSS, CSRF y SSRF. En este vídeo verás qué hace cada una, con ejemplos claros, cómo se defienden y, sobre todo, cómo distinguirlas. Dominar estas diferencias te hará destacar."
   },
   {
    "titulo": "XSS: tu script en el navegador ajeno",
    "texto": "Empecemos por el XSS, Cross-Site Scripting. Ocurre cuando una web refleja lo que tú escribes sin limpiarlo, y así consigues que tu código JavaScript se ejecute en el navegador de otra persona. Por ejemplo, si un campo de comentarios muestra tal cual lo que escribes, puedes meter una etiqueta script que lea las cookies. El impacto es serio: robar la cookie de sesión de la víctima, hacer acciones en su nombre, redirigirla. Es tan importante que, desde dos mil veintiuno, OWASP lo integró dentro de la categoría de inyección."
   },
   {
    "titulo": "Tipos de XSS",
    "texto": "Hay tres tipos de XSS. El reflejado viaja en la URL o en la petición, y la respuesta lo devuelve; requiere engañar a la víctima para que haga clic en un enlace preparado. El almacenado es el más peligroso: el payload se guarda en el servidor, por ejemplo en un comentario o en un perfil, y afecta a todo el que lo vea, sin necesidad de engañar a nadie. Y el de tipo DOM ocurre enteramente en el JavaScript del navegador, sin pasar por el servidor. Se defiende escapando la salida según el contexto, con una buena política de seguridad de contenido y con cookies HttpOnly."
   },
   {
    "titulo": "CSRF: te usan sin que lo sepas",
    "texto": "Vamos con el CSRF, Cross-Site Request Forgery. Aquí una web maliciosa consigue que tu navegador, que ya está logueado en otro sitio, envíe una petición que tú no querías: cambiar tu correo, hacer una transferencia. El truco es que aprovecha que la cookie de sesión se envía automáticamente en cada petición a ese sitio. Por ejemplo, una imagen oculta cuyo origen apunta a una URL de transferencia de tu banco. La defensa es un token anti-CSRF, un valor impredecible en cada formulario, y las cookies con la marca SameSite, que limita su envío entre sitios distintos."
   },
   {
    "titulo": "XSS vs CSRF: no los confundas",
    "texto": "Esta diapositiva es clave para la entrevista: la diferencia entre XSS y CSRF. El XSS ejecuta tu script en el navegador de la víctima, aprovechando que la web no sanea la salida, y se defiende con codificación y política de seguridad de contenido. El CSRF, en cambio, no ejecuta scripts: fuerza una acción usando la cookie de sesión que se envía sola, y se defiende con un token y con SameSite. Un detalle que impresiona: un XSS puede saltarse las protecciones CSRF, porque si ejecutas JavaScript, puedes leer el token. Por eso el XSS es tan peligroso."
   },
   {
    "titulo": "SSRF: el servidor pide por ti",
    "texto": "Y cerramos con el SSRF, Server-Side Request Forgery, la categoría A diez. Aquí consigues que sea el propio servidor el que haga una petición a una URL que tú controlas. Es especialmente grave en la nube, porque el servidor puede acceder a servicios internos o a la metadata del proveedor. El ejemplo clásico es hacer que el servidor pida a la dirección ciento sesenta y nueve punto doscientos cincuenta y cuatro punto ciento sesenta y nueve punto doscientos cincuenta y cuatro, que en muchos entornos cloud devuelve credenciales temporales. La defensa: listas de permitidos de destinos, bloquear las direcciones internas y validar las URLs. Vamos con el control de acceso y las APIs."
   }
  ]
 },
 {
  "id": "14",
  "titulo": "Control de acceso, autenticación, JWT y APIs",
  "subtitulo": "IDOR, escalada de privilegios, tokens JWT y seguridad de APIs REST",
  "nivel": "Explotación web",
  "modulo": 14,
  "duracion": 219.6,
  "palabras": 554,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 20.7,
    "titulo": "Autenticación vs autorización"
   },
   {
    "t": 59.2,
    "titulo": "IDOR y escalada de privilegios"
   },
   {
    "t": 97.3,
    "titulo": "JWT por dentro"
   },
   {
    "t": 137.7,
    "titulo": "Seguridad de APIs REST"
   },
   {
    "t": 178.6,
    "titulo": "Cómo se prueba"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "En este vídeo entramos en el corazón del A cero uno y el A cero siete de OWASP: los fallos de control de acceso y autenticación. Verás qué es un IDOR, la diferencia entre autenticación y autorización, cómo es un token JWT por dentro y los fallos típicos de las APIs REST, que son cada vez más el objetivo principal."
   },
   {
    "titulo": "Autenticación vs autorización",
    "texto": "Primero, dos palabras que se confunden constantemente. La autenticación responde a la pregunta quién eres: es verificar tu identidad con un login y, idealmente, un segundo factor. La autorización responde a qué puedes hacer: son los permisos que tienes una vez identificado. El fallo aparece cuando estás perfectamente autenticado, pero la autorización está rota y puedes hacer cosas que no te corresponden. Eso es el control de acceso roto, la categoría A cero uno. Distinguir autenticación de autorización con claridad es una pregunta de entrevista casi segura, así que tenlo muy claro."
   },
   {
    "titulo": "IDOR y escalada de privilegios",
    "texto": "El fallo estrella del control de acceso es el IDOR: acceder a un recurso que no es tuyo simplemente cambiando un identificador, porque el servidor no comprueba de quién es. Si pides tu pedido mil uno y, al cambiarlo por mil dos, ves el pedido de otro cliente, eso es un IDOR. Relacionado está la escalada de privilegios, que tiene dos sabores. La horizontal es acceder a datos de otro usuario de tu mismo nivel. Y la vertical es ganar permisos de un rol superior, por ejemplo pasar de usuario normal a administrador. En Burp, la extensión Autorize automatiza la detección de estos fallos."
   },
   {
    "titulo": "JWT por dentro",
    "texto": "Hoy muchas APIs usan tokens JWT para la sesión. Un JWT tiene tres partes separadas por puntos: la cabecera, el payload y la firma, todo en Base64. Algo crucial que debes saber: el payload no está cifrado, solo codificado, así que cualquiera puede leerlo; nunca se meten secretos ahí. Los fallos típicos: el llamado alg none, donde el servidor acepta tokens sin firma válida; o que el servidor no verifique bien la firma, lo que te permitiría cambiar en el payload tu rol de usuario a administrador y colártelo. En Burp tienes la extensión JWT Editor para jugar con todo esto."
   },
   {
    "titulo": "Seguridad de APIs REST",
    "texto": "Las APIs tienen su propio OWASP, el API Security Top Ten. Los fallos más frecuentes: el primero, llamado BOLA, es el IDOR a nivel de objeto, y es el número uno en APIs con diferencia. El segundo es la autenticación rota, con logins o tokens mal implementados. El cuarto es la falta de límites de peticiones, que permite fuerza bruta y abuso. Y el quinto, llamado BFLA, es acceder a funciones reservadas a otro rol. Para probarlas, capturas las llamadas con Burp, buscas identificadores que cambiar, repites peticiones con otra sesión y revisas la documentación Swagger en busca de endpoints ocultos."
   },
   {
    "titulo": "Cómo se prueba",
    "texto": "Para cerrar, el método práctico. Capturas todas las llamadas de la aplicación con Burp. Repites peticiones sensibles usando otra sesión distinta, o sin token, para ver si el servidor comprueba de verdad los permisos; la extensión Autorize lo hace por ti. Manipulas el token JWT probando el truco del alg none y los cambios de rol. Y revisas la documentación de la API, como Swagger u OpenAPI, para descubrir endpoints que no están enlazados. Para practicar todo esto sin riesgo, tienes la PortSwigger Academy y APIs deliberadamente vulnerables como crAPI o VAmPI. Pasamos al nivel avanzado."
   }
  ]
 },
 {
  "id": "15",
  "titulo": "Contraseñas, hashes y fuerza bruta",
  "subtitulo": "Hashing, salting, ataques online y offline, Hydra, Hashcat y John",
  "nivel": "Infra y avanzado",
  "modulo": 15,
  "duracion": 206.0,
  "palabras": 512,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 18.3,
    "titulo": "Hash: huella de un solo sentido"
   },
   {
    "t": 54.2,
    "titulo": "Salting y hashing lento"
   },
   {
    "t": 93.6,
    "titulo": "Online vs offline"
   },
   {
    "t": 127.8,
    "titulo": "Diccionarios, reglas y tipos de hash"
   },
   {
    "t": 167.1,
    "titulo": "La defensa y el MFA"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "En este vídeo entenderás cómo se guardan las contraseñas y cómo se rompen. Verás qué es un hash y una sal, la diferencia entre ataques online y offline, y las herramientas Hydra, Hashcat y John. Y, al final, por qué el doble factor cambia por completo esta partida."
   },
   {
    "titulo": "Hash: huella de un solo sentido",
    "texto": "Empecemos por el hash. Un hash convierte cualquier texto en una huella de longitud fija, y lo hace de forma irreversible. La analogía perfecta es una picadora de carne: del filete sacas carne picada, pero no puedes recomponer el filete. Cuando haces login, el sistema no compara tu contraseña en claro: hashea lo que escribes y lo compara con el hash que tiene guardado. Si coinciden, entras. Un detalle importante: algoritmos como MD5 o SHA uno son demasiado rápidos, y por eso no sirven para guardar contraseñas de forma segura."
   },
   {
    "titulo": "Salting y hashing lento",
    "texto": "Para proteger bien las contraseñas se usan dos trucos. El primero es la sal: un valor aleatorio y único que se añade a cada contraseña antes de hashear. Esto impide usar tablas precalculadas, las llamadas rainbow tables, y hace que dos usuarios con la misma contraseña tengan hashes distintos. El segundo truco es usar algoritmos deliberadamente lentos, como bcrypt, scrypt o Argon dos. Al ser lentos, probar millones de contraseñas se vuelve carísimo en tiempo para el atacante. Esa lentitud, que sería un defecto en otros contextos, aquí es justo la virtud que buscamos."
   },
   {
    "titulo": "Online vs offline",
    "texto": "Hay dos escenarios de ataque a contraseñas. El ataque online se hace contra un servicio vivo, como un login o un SSH, probando contraseñas una a una; la herramienta típica es Hydra, y es lento porque hay bloqueos y queda registrado. El ataque offline se hace sobre hashes que ya has robado; aquí usas Hashcat o John the Ripper, que aprovechan la tarjeta gráfica para probar millones de candidatos por segundo, sin bloqueos ni logs. Por eso, cuando una empresa sufre una filtración de hashes, la carrera es contrarreloj antes de que los crackeen."
   },
   {
    "titulo": "Diccionarios, reglas y tipos de hash",
    "texto": "El combustible del cracking son los diccionarios. El más famoso es rockyou punto txt, con millones de contraseñas reales filtradas. Además, se aplican reglas que mutan cada palabra imitando lo que hacen los humanos, convirtiendo por ejemplo password en pe arroba ese ese uve cero erre con admiración. También conviene reconocer los hashes de un vistazo: treinta y dos caracteres hexadecimales suele ser MD5; si empieza por dólar dos be, es bcrypt; y los hashes con dos partes separadas por dos puntos suelen ser NTLM de Windows. Herramientas como hashid te ayudan a identificarlos."
   },
   {
    "titulo": "La defensa y el MFA",
    "texto": "Terminamos con la defensa. En tus informes recomendarás hashing fuerte con sal, usando bcrypt o Argon dos, políticas de longitud razonables y bloqueo tras varios intentos fallidos. Pero la medida reina es el doble factor, el MFA: aunque un atacante robe la contraseña, sin el segundo factor no entra. Por eso el MFA neutraliza la mayoría de los robos de credenciales. Y recuerda la ética: el cracking se practica solo sobre hashes que tengas autorización para probar, como los de un CTF o un laboratorio. Vamos con la explotación y la post-explotación."
   }
  ]
 },
 {
  "id": "16",
  "titulo": "Explotación, post-explotación y escalada",
  "subtitulo": "Exploits, shells, Metasploit, escalada de privilegios y movimiento lateral",
  "nivel": "Infra y avanzado",
  "modulo": 16,
  "duracion": 206.3,
  "palabras": 538,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 21.8,
    "titulo": "Exploit, payload y shell"
   },
   {
    "t": 56.3,
    "titulo": "Bind shell vs reverse shell"
   },
   {
    "t": 92.1,
    "titulo": "Metasploit en una frase"
   },
   {
    "t": 126.1,
    "titulo": "Escalada de privilegios"
   },
   {
    "t": 164.0,
    "titulo": "Movimiento lateral, persistencia y C2"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "En este vídeo juntamos las piezas que van de la vulnerabilidad al control del sistema. Verás qué es un exploit, un payload y una shell, la diferencia entre bind y reverse shell, qué es Metasploit, cómo se escalan privilegios y qué son el movimiento lateral y el C2. Son conceptos que un júnior debe conocer para hablar el idioma del equipo."
   },
   {
    "titulo": "Exploit, payload y shell",
    "texto": "Tres términos que debes separar bien. El exploit es el código que aprovecha una vulnerabilidad concreta: sería la ganzúa que abre la cerradura. El payload es lo que se ejecuta una vez has entrado: lo que haces una vez dentro de la casa. Y la shell es el acceso a la línea de comandos del sistema objetivo: serían las llaves que te permiten moverte por toda la casa. El flujo es: el exploit abre la puerta, el payload te da una shell, y con esa shell ya controlas el equipo. Memoriza esta cadena, porque ordena todo lo demás."
   },
   {
    "titulo": "Bind shell vs reverse shell",
    "texto": "Hay dos formas de conseguir esa shell. En la bind shell, la víctima abre un puerto y se queda esperando, y tú te conectas a ella. El problema es que los cortafuegos suelen bloquear las conexiones entrantes, así que a menudo no funciona. En la reverse shell, al revés, es la víctima la que se conecta a tu máquina, que está escuchando con netcat. Como la mayoría de firewalls permiten las conexiones de salida, la reverse shell esquiva mucho mejor las defensas, y por eso es la más usada. Es un concepto que se pregunta con frecuencia: quién inicia la conexión."
   },
   {
    "titulo": "Metasploit en una frase",
    "texto": "Metasploit es la navaja suiza de la explotación: un enorme catálogo de exploits y payloads con un flujo de trabajo común. Buscas un exploit con search, lo seleccionas con use, configuras el objetivo con set, y lanzas con exploit. Si todo va bien, se abre una sesión y tienes tu shell. Para generar payloads personalizados, como reverse shells a medida, se usa una utilidad llamada msfvenom. Para un júnior, lo importante es saber qué es Metasploit y reconocer ese flujo de cuatro pasos, no conocer de memoria cada módulo."
   },
   {
    "titulo": "Escalada de privilegios",
    "texto": "Una vez dentro como usuario sin privilegios, buscas convertirte en administrador. En Linux, las vías típicas son los binarios con bit SUID, un sudo guion ele demasiado permisivo, tareas programadas que puedes editar, o un kernel con una vulnerabilidad conocida. En Windows, servicios mal configurados, permisos indebidos sobre rutas, o credenciales olvidadas en ficheros y en el registro. Lo bueno es que hay scripts que automatizan esta búsqueda: LinPEAS en Linux y WinPEAS en Windows te delatan las vías de escalada en segundos. Son herramientas que debes conocer por su nombre."
   },
   {
    "titulo": "Movimiento lateral, persistencia y C2",
    "texto": "Para cerrar el mapa, tres conceptos de post-explotación. El movimiento lateral es saltar de un equipo comprometido a otro, acercándote al objetivo. La persistencia es asegurarte de mantener el acceso aunque el sistema se reinicie, mediante tareas o servicios. Y el C2, de command and control, es la infraestructura desde la que se controlan todos los equipos comprometidos, muy típica en Red Team. Como júnior, raramente harás un ataque de dominio completo el primer día; lo que sí harás es validar vulnerabilidades, lanzar un exploit conocido en laboratorio, conseguir una shell y documentarlo. Todo, siempre, en entornos autorizados."
   }
  ]
 },
 {
  "id": "17",
  "titulo": "Scripting e IA en el pentesting",
  "subtitulo": "Automatizar con Bash y Python, y usar la IA de forma útil y segura",
  "nivel": "Infra y avanzado",
  "modulo": 17,
  "duracion": 205.9,
  "palabras": 500,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 20.3,
    "titulo": "Por qué automatizar"
   },
   {
    "t": 56.0,
    "titulo": "Bash: el pegamento del pentester"
   },
   {
    "t": 90.0,
    "titulo": "Python: cuando Bash se queda corto"
   },
   {
    "t": 128.1,
    "titulo": "IA aplicada al pentesting"
   },
   {
    "t": 164.6,
    "titulo": "IA con cabeza: riesgos"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "La oferta valora el scripting y la inteligencia artificial aplicada. En este vídeo verás por qué y cuándo automatizar, lo esencial de Bash y Python para un pentester, y cómo usar la IA para acelerar tu trabajo sin comprometer los datos del cliente. Dos valores diferenciales que puedes mencionar en la entrevista."
   },
   {
    "titulo": "Por qué automatizar",
    "texto": "Empecemos por el porqué. El pentesting tiene muchísimo trabajo repetitivo: lanzar el mismo escaneo contra cincuenta equipos, probar cien endpoints, procesar salidas enormes. El scripting consiste, simplemente, en convertir todo eso en un único comando que lo hace por ti. Te ahorra tiempo y reduce errores. La oferta valora explícitamente que sepas Python y Bash, así que aunque empieces por lo básico, es un área donde conviene invertir. No necesitas ser programador experto: necesitas poder automatizar tus propias tareas."
   },
   {
    "titulo": "Bash: el pegamento del pentester",
    "texto": "Bash es el pegamento del pentester, el lenguaje de la propia terminal. Con unas pocas piezas ya haces maravillas: variables, bucles for y while, condicionales con if, y las tuberías y redirecciones que ya vimos. Por ejemplo, con un simple bucle for puedes recorrer una lista de direcciones y lanzar Nmap contra cada una, guardando el resultado en un fichero por host. Bash es ideal para encadenar herramientas rápidamente y para esas tareas de una sola línea que repetirías mil veces a mano. Es lo primero que conviene soltar."
   },
   {
    "titulo": "Python: cuando Bash se queda corto",
    "texto": "Cuando la tarea tiene lógica más compleja, parseas datos o hablas con APIs, das el salto a Python. La librería estrella es requests, que te permite hacer peticiones web con muy poco código. Por ejemplo, en unas pocas líneas puedes escribir un bucle que pida los pedidos del mil al mil diez en una API y te diga cuáles son accesibles, detectando así un posible IDOR. Otras librerías útiles son argparse para los parámetros, re para expresiones regulares, BeautifulSoup para procesar HTML, y pwntools para explotación y CTF. Python es tu herramienta cuando Bash se queda corto."
   },
   {
    "titulo": "IA aplicada al pentesting",
    "texto": "La oferta valora el uso de la inteligencia artificial, así que veamos usos reales y legítimos. La IA te ayuda a entender rápido una tecnología o un error que no conocías. Puede proponerte variantes de un payload o wordlists adaptadas al contexto. Es excelente para parsear y resumir salidas enormes, quedándote con lo relevante. Y acelera la redacción de informes, generando borradores de hallazgos y recomendaciones. También te ayuda a escribir y depurar tus scripts. Bien usada, la IA es como tener un compañero junior incansable a tu lado."
   },
   {
    "titulo": "IA con cabeza: riesgos",
    "texto": "Pero hay que usarla con cabeza, y esto es importante decirlo en una entrevista. Primera regla: nunca subas datos del cliente, credenciales ni información del engagement a servicios de IA públicos, porque sería una fuga de confidencialidad grave. Segunda: la IA alucina, es decir, se inventa comandos, rutas o incluso CVEs que no existen, con total seguridad. Por eso debes verificar siempre lo que te genera antes de usarlo. La IA acelera tu trabajo, pero la responsabilidad y el criterio son siempre tuyos. Mencionar estos riesgos demuestra madurez profesional. Vamos con la seguridad móvil."
   }
  ]
 },
 {
  "id": "18",
  "titulo": "Seguridad de aplicaciones móviles",
  "subtitulo": "Android e iOS, OWASP Mobile, análisis estático y dinámico, y herramientas",
  "nivel": "Infra y avanzado",
  "modulo": 18,
  "duracion": 208.7,
  "palabras": 522,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 22.1,
    "titulo": "Android e iOS en un minuto"
   },
   {
    "t": 56.2,
    "titulo": "OWASP Mobile Top 10"
   },
   {
    "t": 92.6,
    "titulo": "Estático vs dinámico y la API"
   },
   {
    "t": 130.0,
    "titulo": "Herramientas"
   },
   {
    "t": 169.8,
    "titulo": "El reto del SSL pinning"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "La oferta valora el análisis de seguridad de aplicaciones móviles. En este vídeo verás, a alto nivel, cómo se auditan apps de Android e iOS, el OWASP Mobile Top Ten, la diferencia entre análisis estático y dinámico, y las herramientas clave. No necesitas ser experto para entrar, pero sí demostrar que conoces el terreno."
   },
   {
    "titulo": "Android e iOS en un minuto",
    "texto": "Dos mundos, parecidos en el fondo. En Android, las apps vienen empaquetadas en ficheros APK, están escritas en Java o Kotlin, y se pueden decompilar con herramientas como apktool o jadx para leer su código. En iOS, el paquete es un IPA, el lenguaje es Swift u Objective-C, y el ecosistema es más cerrado, por lo que a menudo se necesita un dispositivo con jailbreak. En ambos, los datos se guardan en almacenes locales que conviene revisar en busca de secretos. Conocer estas diferencias básicas ya te sitúa."
   },
   {
    "titulo": "OWASP Mobile Top 10",
    "texto": "Igual que en web, hay un OWASP específico para móvil. Los riesgos más habituales: el almacenamiento inseguro, cuando la app guarda secretos o credenciales en claro en el dispositivo. La comunicación insegura, sin cifrado o sin fijación de certificado. La autenticación y la criptografía débiles. Y la facilidad para hacer ingeniería inversa cuando la app no está protegida ni ofuscada. La referencia formal son los estándares MASVS, que define los requisitos, y MASTG, que es la guía de pruebas. Cítalos y sonarás con conocimiento de causa."
   },
   {
    "titulo": "Estático vs dinámico y la API",
    "texto": "Hay dos enfoques de análisis. El estático consiste en decompilar la app y revisar su código sin ejecutarla, buscando claves, URLs, permisos y secretos. El dinámico se hace con la app en marcha: interceptas su tráfico, manipulas en tiempo real, saltas comprobaciones. Y una idea que debes tener muy clara: gran parte de las vulnerabilidades reales no están en la app en sí, sino en la API del backend que la app consume. Por eso se dice que una app móvil es, en el fondo, un cliente más una API, y ahí aplicas todo lo que viste en el módulo de APIs."
   },
   {
    "titulo": "Herramientas",
    "texto": "Las herramientas que debes conocer por su nombre. MobSF, Mobile Security Framework, es la más completa para empezar: hace análisis estático y dinámico de forma automatizada, y es ideal para un primer vistazo a un APK. apktool y jadx sirven para desempaquetar la app y leer su código. Frida permite instrumentación dinámica, es decir, modificar funciones de la app en caliente mientras se ejecuta. Y objection es una capa que simplifica Frida, permitiendo, por ejemplo, saltar comprobaciones sin escribir scripts. Con haber pasado un APK por MobSF, ya tienes una anécdota que contar."
   },
   {
    "titulo": "El reto del SSL pinning",
    "texto": "Terminamos con un reto muy habitual: el SSL pinning. Muchas apps solo confían en su propio certificado, de modo que, de primeras, Burp no puede interceptar su tráfico. Esto se salta en laboratorio usando Frida u objection, para poder auditar la comunicación. No necesitas ser un experto en móvil para entrar en el puesto, pero sí entender que una app es cliente más API, saber que existen el MASVS y el MASTG, y conocer estas herramientas. Con eso demuestras el interés real que busca la oferta. Analiza siempre apps propias o de laboratorio. Vamos al último nivel: la entrevista."
   }
  ]
 },
 {
  "id": "19",
  "titulo": "Informe, PoC y la entrevista técnica",
  "subtitulo": "Cómo se escribe un informe, preguntas modelo, certificaciones y 90 días",
  "nivel": "Entrevista",
  "modulo": 19,
  "duracion": 241.2,
  "palabras": 575,
  "capitulos": [
   {
    "t": 0,
    "titulo": "Introducción"
   },
   {
    "t": 22.1,
    "titulo": "El informe: tu producto final"
   },
   {
    "t": 63.4,
    "titulo": "Anatomía de un buen hallazgo"
   },
   {
    "t": 109.3,
    "titulo": "Preguntas técnicas frecuentes"
   },
   {
    "t": 152.1,
    "titulo": "Actitud (STAR) y certificaciones"
   },
   {
    "t": 194.0,
    "titulo": "Plataformas y tus primeros 90 días"
   }
  ],
  "guion": [
   {
    "titulo": "Introducción",
    "texto": "Llegamos al final: la entrevista. En este vídeo verás cómo se estructura un informe y una prueba de concepto, las preguntas técnicas más frecuentes con su respuesta, el método STAR para las preguntas de actitud, las certificaciones recomendadas y un plan para tus primeros noventa días. Es el momento de poner en valor todo lo aprendido."
   },
   {
    "titulo": "El informe: tu producto final",
    "texto": "La oferta repite informes técnicos y pruebas de concepto, así que empecemos por ahí. El informe es lo que el cliente paga: si está mal, el mejor pentest no vale nada. Su estructura típica empieza por un resumen ejecutivo, dirigido a la dirección y sin tecnicismos. Sigue con el alcance y la metodología: qué se probó, cuándo y cómo. Luego los hallazgos, ordenados por severidad. Después la remediación, cómo arreglar cada cosa. Y los anexos con las evidencias. Saber comunicar a dos públicos, el técnico y el de gestión, es una habilidad muy valorada, y la oferta lo menciona expresamente."
   },
   {
    "titulo": "Anatomía de un buen hallazgo",
    "texto": "Cada hallazgo del informe tiene su anatomía. Un título claro, como inyección SQL en el login del panel de administración. La severidad, con su CVSS y la justificación del riesgo real. Una descripción de qué es y por qué importa, en lenguaje del cliente. La evidencia, con una prueba de concepto reproducible, con pasos y capturas. El impacto en el negocio. Una remediación concreta y accionable. Y las referencias a CWE, OWASP o el CVE. Y recuerda la regla de oro de la prueba de concepto: debe ser reproducible y mínima, los pasos justos para confirmar el fallo sin causar daño. Demuestra, no destruyas."
   },
   {
    "titulo": "Preguntas técnicas frecuentes",
    "texto": "Vamos con las preguntas técnicas que caen una y otra vez. Que enumeres el OWASP Top Ten, con un ejemplo de dos o tres. Cómo funciona una inyección SQL y cuál es su defensa, las consultas parametrizadas. La diferencia entre XSS y CSRF, y entre los códigos cuatrocientos uno y cuatrocientos tres. Qué hace Nmap guion ese uve. Cómo priorizas vulnerabilidades, combinando CVSS con exposición, explotabilidad y criticidad. Qué es un IDOR. Todas estas respuestas están en los módulos del curso, y en la chuleta de la web las tienes resumidas. Repásalas en voz alta hasta que te salgan solas."
   },
   {
    "titulo": "Actitud (STAR) y certificaciones",
    "texto": "Para las preguntas de actitud, del tipo háblame de una vez que, usa el método STAR: describe la Situación, la Tarea, la Acción que tomaste tú y el Resultado. Y para lo que no sepas, nada de fingir: di que no lo has usado aún, pero que sabes para qué sirve y cómo lo investigarías. La honestidad con curiosidad siempre gana. Sobre certificaciones, la ruta recomendada para júnior empieza por la eJPT y la PNPT, que son prácticas y asequibles, con vistas a la OSCP o la OSWA más adelante, y la CRTO para Red Team. La oferta cita precisamente estas. Menciona cuál estás preparando: demuestra compromiso."
   },
   {
    "titulo": "Plataformas y tus primeros 90 días",
    "texto": "Para terminar, dónde practicar y cómo arrancar. Practica gratis o casi en PortSwigger Academy para web, TryHackMe para aprender guiado y HackTheBox para escenarios realistas. Y para tus primeros noventa días, un plan sencillo: el primer mes, aprende los procesos, las plantillas de informe y las herramientas internas, y pregunta mucho. El segundo mes, asume tareas de validación de vulnerabilidades con apoyo. Y el tercero, lleva hallazgos de principio a fin y propón alguna automatización o mejora. Y un consejo final: lleva dos o tres preguntas preparadas para ellos; muestra interés y proyección. Has llegado al final del curso. Mucha suerte en tu entrevista. ¡Vas a hacerlo genial!"
   }
  ]
 }
];
