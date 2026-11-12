# CLAUDE.md — Portafolio de Manuel Andrés Cárdenas Suárez

Contexto persistente para Claude Code. Léelo al inicio de cada sesión antes de generar o modificar código.

---

## 1. Objetivo del proyecto

Portafolio personal de desarrollador de software. Sitio de una sola página (one-page), oscuro, moderno y muy optimizado. El elemento protagonista es una **tarjeta-carnet 3D** que se inclina siguiendo el mouse. Meta de rendimiento: **90–100 en Lighthouse**, excelente en móvil.

**Para qué sirve hoy (desde nov 2026):** mostrarlo a empresas (lo usa para conseguir su etapa productiva del SENA, pero eso **no se dice** en el sitio ni en el CV: ver §8 Formación). El público son áreas de talento humano y líderes técnicos que deciden en una lectura rápida, así que el sitio y el CV dicen de entrada quién es Manuel y qué pruebas tiene: proyectos en producción con cifras verificables y certificaciones.

## 2. Dueño / datos de contacto

- **Nombre:** Manuel Andrés Cárdenas Suárez
- **Rol mostrado:** Analista y Desarrollador de Software
- **Email:** Manuelcardenassuarez2005@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/manuel-cardenas-89b03b424
- **GitHub:** https://github.com/Manuel151025
- **Dominio de producción:** https://manuelcardenas.online

## 3. Stack técnico

- **Framework:** Astro v7 (sin TypeScript). Componentes `.astro` que compilan a HTML estático.
- **Estilos:** CSS3 vanilla, mobile-first, con custom properties en `:root`. Sin Bootstrap ni Tailwind.
- **Interactividad:** JavaScript vanilla (ES6+), en archivos `.js` separados por responsabilidad. Sin librerías.
- **Despliegue:** Docker (Dockerfile multi-stage con nginx) → Dokploy sobre VPS Hostinger → Traefik + Let's Encrypt.

## 4. Reglas de código (obligatorias)

- **Separación estricta de responsabilidades.** Los `.astro` contienen solo HTML (template) y lógica de build (frontmatter entre `---`). **Nada de JavaScript de navegador embebido en el HTML.** Todo el JS del cliente va en `src/scripts/*.js` y se carga con `<script>`.
- **Un archivo, una responsabilidad (SRP):** cada script JS hace una sola cosa (`card-tilt.js`, `scroll-reveal.js`, `navbar.js`).
- **Mobile-first:** escribe el CSS para móvil primero, escala con `min-width`.
- **Datos separados de la vista:** el contenido de los proyectos vive en `src/data/projects.js` y el de estudios y certificaciones en `src/data/formacion.js`. Los componentes lo renderizan en bucle.
- **Componentización real:** una tarjeta de proyecto se define UNA vez (`ProjectCard.astro`) y se reutiliza.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `style:`, `docs:`). Rama principal: `main`.

## 5. Sistema de diseño (aprobado)

### Paleta (dark, monocromática + glow blanco)
- Fondo base: `#0A0A0B`
- Superficies / cards: `#141417` a `#1C1C21`
- Bordes sutiles: `#26262B`
- Texto principal: `#F5F5F7`
- Texto secundario: `#A1A1AA`
- Glow / sombra blanca: `rgba(255,255,255,0.08)` a `rgba(255,255,255,0.15)`
- Acento: por ahora ninguno (el "color" es el glow blanco). Reserva: violeta `#8B5CF6` o cian `#22D3EE`.

### Tipografías (Google Fonts, con preconnect + font-display: swap)
- **Space Grotesk** → títulos / display
- **Inter** → cuerpo
- **JetBrains Mono** → chips de tecnologías y detalles tipo `< />`

### Efectos
- **Carnet 3D:** tilt/parallax siguiendo el mouse con `transform: rotateX/rotateY` + sheen holográfico que sigue el cursor. Al hacer click también reacciona. Sin librerías.
- **Scroll reveal:** `IntersectionObserver` para animaciones de entrada (fade + subida sutil).
- **Navbar:** semitransparente con blur al hacer scroll.
- **Hover en tarjetas:** leve elevación + borde que se ilumina.
- Todo movimiento **discreto**, nunca distrae del contenido.

### Tono visual
Premium, técnico y sobrio. Sensación: "esta persona sabe lo que hace y cuida los detalles."

### Dirección y reglas al tocar la interfaz
- La dirección de diseño ("el carnet de un desarrollador") está escrita al inicio de `src/styles/variables.css`; el CV sigue la misma (`scripts/gen-cv.mjs`).
- **Único color:** el punto de estado (verde = disponible / en producción / completado; ámbar = en curso). Nada más lleva color.
- **Todo valor sale de los tokens** de `variables.css` (nada de medidas sueltas).
- **Objetivos táctiles de 44px** (`min-height: 2.75rem`) en botones y enlaces.
- **Probar en 360, 768 y 1280 px**, sin scroll horizontal, y revisar con capturas del navegador antes de dar algo por terminado.
- Un título con `.reveal-wipe` arranca recortado: `scroll-reveal.js` observa a su contenedor (si se observa el título, Chrome nunca lo revela).

## 6. Arquitectura de archivos

```
portafolio/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # shell HTML, <head>, meta SEO, fuentes
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── IdCard.astro          # el carnet 3D
│   │   ├── About.astro
│   │   ├── Stack.astro
│   │   ├── Projects.astro        # itera sobre projects.js
│   │   ├── ProjectCard.astro     # fila de proyecto (reutilizable) + su modal
│   │   ├── Formacion.astro       # estudios (línea de tiempo) + certificaciones
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── data/
│   │   ├── projects.js           # datos de proyectos (fuente única)
│   │   └── formacion.js          # estudios y certificaciones (fuente única)
│   ├── scripts/
│   │   ├── card-tilt.js
│   │   ├── scroll-reveal.js
│   │   ├── navbar.js
│   │   ├── project-slides.js     # carrusel de capturas + pie de la captura actual
│   │   └── project-gallery.js    # galería del modal (flechas, miniaturas, teclado, swipe)
│   ├── styles/
│   │   ├── variables.css         # tokens (fuente única de verdad)
│   │   ├── base.css              # reset + globales, mobile-first
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── animations.css
│   └── pages/
│       └── index.astro           # compone todos los componentes
├── public/
│   ├── img/
│   │   ├── perfil.jpg            # foto del carnet (placeholder por ahora)
│   │   └── proyectos/            # 3 capturas por proyecto: <slug>-1..3.webp (1280x720)
│   ├── cv.pdf / cv-en.pdf        # CV (generado: node scripts/gen-cv.mjs)
│   ├── favicon.svg               # fuente del favicon (monograma M_)
│   ├── favicon.ico               # generado: node scripts/gen-favicon.mjs
│   └── apple-touch-icon.png      # generado: node scripts/gen-favicon.mjs
├── scripts/                      # generadores locales (no corren en el despliegue)
│   ├── gen-cv.mjs                # CV ES/EN: contenido + diseño; --keep-html para depurar
│   ├── cv-foto.jpg               # foto a color del CV
│   ├── gen-og.mjs                # imagen Open Graph (public/img/og-image.png)
│   └── gen-favicon.mjs
├── Dockerfile                    # multi-stage: build Astro + nginx
├── .dockerignore
├── nginx.conf                    # config nginx para SPA estática
├── astro.config.mjs
└── README.md
```

## 7. Secciones de la página (orden)

1. **Navbar** — fijo, minimal. Nombre a la izquierda; links (Sobre mí · Stack · Proyectos · Formación · Contacto) a la derecha. Blur al scrollear.
2. **Hero** — dos columnas. Izquierda: estado, rol, nombre, botones (Ver proyectos / Ver CV). Derecha: el carnet 3D.
3. **Sobre mí** (01) — párrafo + workflow con IA + cuatro áreas de enfoque.
4. **Stack** (02) — tarjetas de tecnología agrupadas por categoría.
5. **Proyectos** (03) — una fila por proyecto desde `projects.js`: captura enmarcada con carrusel a un lado y texto con tres cifras al otro; las filas pares invierten el lado. En móvil se apilan.
6. **Formación** (04) — estudios como línea de tiempo y certificaciones como credenciales con talón, desde `formacion.js`.
7. **Contacto** (05) — formulario, redes y estado.
8. **Footer** — copyright, links rápidos.

## 8. Contenido real

### Hero
- Estado (píldora con punto verde): **2 sistemas en producción**. El mismo texto va en el CV y en la imagen Open Graph (`scripts/gen-og.mjs`).
- Rol: **Analista y Desarrollador de Software**
- Nombre: **Manuel Andrés Cárdenas Suárez**
- Sin tagline.

### Carnet (IdCard)
Foto (placeholder por ahora) + nombre + rol + un ID decorativo (`DEV-2026`) + QR pequeño opcional que apunte al GitHub.

### Sobre mí (perfil individual + workflow con IA)
> Analista y Desarrollador de Software. Desarrollo aplicaciones web y móviles con foco en arquitectura limpia, código mantenible y buenas prácticas. Trabajo con PHP 8 y Python (FastAPI) en el backend, MySQL y PostgreSQL en datos, JavaScript y TypeScript en el frontend, y Kotlin con Jetpack Compose para desarrollo móvil nativo. En infraestructura administro despliegues con Docker y Dokploy sobre servidores Linux, usando Git y GitHub para el control de versiones.
>
> **Trabajo asistido por IA:** integro herramientas como Claude y Claude Code en mi flujo de desarrollo para acelerar la construcción, mientras yo defino la arquitectura, tomo las decisiones técnicas y reviso cada línea que entra a producción. La IA multiplica mi productividad; el criterio y el diseño son míos.

### Stack (chips agrupados)
- **Backend:** PHP 8, MySQL 8, PDO, APIs REST, Python, FastAPI, PostgreSQL
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5, Astro, Next.js, TypeScript
- **Móvil:** Kotlin, Jetpack Compose, Room, Retrofit, Hilt
- **Calidad y seguridad:** pytest, Playwright, GitHub Actions, OWASP ZAP, JMeter
- **DevOps / Infra:** Docker, Dokploy, Linux, Nginx, Traefik, VPS
- **Herramientas:** Git, GitHub, VS Code, Claude Code, MySQL Workbench, Jira

### Proyectos (data/projects.js)
Solo van los proyectos **en producción** que mejor muestran el trabajo (decisión de nov 2026: menos proyectos, mejor contados). Cada proyecto: `titulo`, `rol` (contexto: equipo, cliente…), `descripcion`, `cifras` (tres `{ valor, etiqueta }` verificables), `destacados` (detalle para el modal), `stack` (array), `estado`, `repo` (o null), `demo` (o null), `capturas` (array de `{ src, alt }`; la primera es la portada). La fila rota las capturas en carrusel y el modal las muestra en galería.

1. **KondID** (proyecto final del tecnólogo, en equipo con Emerson Corredor)
   - Descripción: Plataforma web que lee con OCR las cédulas de las fichas PDF del SENA y las concilia contra la planilla oficial en Excel. La construí con Emerson Corredor; mi parte fue la seguridad, las pruebas y la documentación.
   - Cifras (del informe de pruebas, v2.7.0): 386 pruebas automáticas · 26/26 casos de seguridad · 3 motores OCR en cascada. Otros datos del informe: errores 500 bajo ataque de OWASP ZAP de 3.201 a 17; 22 defectos encontrados, 17 cerrados.
   - Stack: Python 3.12, FastAPI, PostgreSQL, Next.js, TypeScript, Document AI, RapidOCR, pytest, Playwright, Docker
   - Estado: **Producción**
   - Repo: https://github.com/V44nxx/Proyecto_ocr (cuenta de Emerson)
   - Demo: https://proyectoocr.v44nxx.online

2. **BreadControl** (cliente real, desarrollo individual)
   - Descripción: Sistema web de gestión para una panadería familiar: compras, inventario, producción, ventas y cierre diario, con costeo FIFO por lotes y pagos por Nequi/Wompi.
   - Cifras (de su propia landing): 10 módulos integrados · 19 tablas en MySQL · 4 sprints con Scrum (Jira).
   - Stack: PHP 8, MySQL 8, Bootstrap 5, JavaScript, PDO, Docker
   - Estado: **Producción**
   - Repo: https://github.com/Manuel151025/breadcontrol
   - Demo: https://breadcontrol.manuelcardenas.online

**Fuera del portafolio por ahora** (siguen en el historial de git y en GitHub): Lector de Cédulas (app de escritorio, sin repo ni demo públicos; se solapa con KondID), Proyecto Offline y SeguimientoSENA (en desarrollo). Vuelven cuando estén en producción y con demo abierta.

### Formación (data/formacion.js)
- **Estudios:** Tecnólogo en Análisis y Desarrollo de Software — SENA, Centro Tecnológico de la Amazonia, Florencia (Caquetá), 2025–2027, en curso (sin nota). Bootcamp de Programación Nivel Explorador — Talento Tech (MinTIC y CUN), 164 horas, ago 2025. Técnico en Sistemas por Competencias Laborales — SENA, 2024. (Bachiller no va: el CV lo quitó por espacio.)
- **Idioma:** Inglés "Básico · Nivel 3 (SENA)", como dice su certificado (48 h, jun 2026). No poner "Intermedio".
- **Fuera a propósito:** Diplomado en Ofimática (Academia Nacional de Sistemas, 2023): no suma para un cargo de desarrollo.
- Los PDF originales están en `C:\Users\manue\Documents\DOCUMENTOS MANUEL` (junto a documentos personales: cédula, antecedentes… no abrir más que los certificados). Los códigos de verificación del SENA llevan la cédula: no publicarlos.
- **El sitio y el CV no hablan de la búsqueda de empresa** (decisión de Manuel, 12 nov 2026): nada de "aprendiz SENA", "etapa productiva", etapa lectiva, duración (6 meses), modalidad (contrato de aprendizaje, pasantía…), "disponible para…" ni "busco empresa". Solo formación, proyectos, stack y certificaciones; el SENA aparece únicamente como institución en Formación y en los proyectos. Contexto (no publicarlo): terminó la etapa lectiva y su etapa productiva de 6 meses puede empezar desde el 11 nov 2026.
- **Certificaciones:** Certificado Profesional de Google AI (Google · Coursera) — completado el 11 de nov de 2026 (8 cursos), con verificación pública en https://www.coursera.org/verify/professional-cert/H1LCXVM8XO2D. Redes y Seguridad — SENA, 40 horas, oct 2024 (completado). En curso: Ciberseguridad de Google y Análisis de Datos de Google (8 cursos cada uno; en el CV van juntos en una línea por espacio). Cada credencial lleva `icono` (simple-icons) o `sigla`, y `carga` ({ valor, unidad }: cursos u horas).
- Al terminar un certificado: actualizar `formacion.js` (fecha, estado y enlace `credencial`), el bloque `certs` de `scripts/gen-cv.mjs` (su `link`) y regenerar el CV. El enlace es la dirección `coursera.org/verify/…` que Coursera imprime en el certificado; si Manuel pasa un enlace corto (`share.google/…`), seguirlo y confirmar que abre su certificado antes de usarlo.

### CV (scripts/gen-cv.mjs)
Una página carta, ES y EN. Abre igual que el hero (estado, rol, nombre) y su columna oscura repite el carnet (cabecera `SOFTWARE DEV · DEV-2026`, foto, QR al portafolio). Lleva las tipografías del sitio embebidas (devDependencies `@fontsource/*`). Contenido: perfil, tres cifras (3 motores OCR · 386 pruebas · 8 cursos de Google AI; "2 sistemas en producción" ya va en la píldora), los mismos dos proyectos, certificaciones y educación. Si el contenido se pasa de una página, Chrome empuja el QR y el pie a una segunda: recortar texto, no bajar la letra.

El CV se regenera con el mismo nombre de archivo, así que no puede quedar en la caché del navegador: `Hero.astro` enlaza cada PDF con la huella de su contenido (`/cv.pdf?v=…`, calculada al compilar; `cv-viewer.js` la lee del `<dialog>`) y `nginx.conf` deja los PDF fuera de la caché de 30 días.

### Contacto
- Email: Manuelcardenassuarez2005@gmail.com
- GitHub: https://github.com/Manuel151025
- LinkedIn: https://www.linkedin.com/in/manuel-cardenas-89b03b424
- Teléfono: +57 3209891830

## 9. Optimización (requisitos)

- Imágenes en WebP/AVIF, `loading="lazy"`, `width`/`height` explícitos (evita CLS).
- Fuentes con `preconnect` + `font-display: swap`.
- Scripts con `defer` o cargados al final. Sin render-blocking.
- Meta description, Open Graph y título por página para SEO.

## 10. Despliegue

- **Dockerfile multi-stage:** etapa 1 `node:22-alpine` compila (`npm ci` + `npm run build` → `dist/`); etapa 2 `nginx:alpine` sirve el `dist/`. Node NO queda en la imagen final.
- **Dokploy:** conectar repo `Manuel151025/portafolio`, rama `main`, build por Dockerfile, auto-deploy en cada push.
- **Dominio:** `manuelcardenas.online` (registro A → IP del VPS; CNAME `www` → dominio raíz). HTTPS con Let's Encrypt.
- **Nota VPS compartido:** el build consume recursos; si el VPS sufre, migrar el build a GitHub Actions.

## 11. Pendientes

- [ ] Foto real para el carnet (`public/img/perfil.jpg`).
- [x] CV en PDF (`public/cv.pdf` y `public/cv-en.pdf`): se edita y regenera con `node scripts/gen-cv.mjs`.
- [x] Capturas de proyectos (`public/img/proyectos/`): 3 por proyecto, con datos de demostración o inventados (nunca datos reales).
- [x] Enlace de verificación del Certificado Profesional de Google AI: puesto en `src/data/formacion.js` (`credencial`) y en el CV.
- [ ] Al terminar Ciberseguridad y Análisis de Datos de Google: pasarlos a "Completado" en el sitio y en el CV.
- [ ] Terminar Proyecto Offline y SeguimientoSENA → cuando estén en producción y con demo abierta, devolverlos a `projects.js`.
- [ ] BreadControl se va a reestructurar (dic 2026 o antes): quedará solo el inventario de la panadería y se quita el portal de aprendices. Cuando esté publicada, rehacer en `projects.js` y en el CV la descripción, las cifras (10 módulos, 19 tablas) y las 3 capturas. Las fechas del CV ("2025 – Presente") siguen sin confirmar: el primer commit del repo es de junio de 2026.


## Infraestructura (IMPORTANTE)

El VPS es COMPARTIDO. nginx corre fuera de Docker y ocupa los
puertos 80/443; Traefik escucha en el 9080.

- En Dokploy los dominios van con HTTPS **OFF** (Certificate: None).
  Activarlo rompe el sitio con un bucle de redirecciones.
- El SSL lo emite certbot sobre el nginx del host, igual que el resto
  de subdominios del servidor.
- Server block del sitio: /etc/nginx/sites-available/manuelcardenas.online
  → proxy_pass a localhost:9080 con Host header passthrough.
- Sudo limitado: nginx -t, reload/restart nginx, nano sobre
  sites-available/*, ln -s a sites-enabled/*. certbot NO está permitido.