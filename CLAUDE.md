# CLAUDE.md — Portafolio de Manuel Andrés Cárdenas Suárez

Contexto persistente para Claude Code. Léelo al inicio de cada sesión antes de generar o modificar código.

---

## 1. Objetivo del proyecto

Portafolio personal de desarrollador de software. Sitio de una sola página (one-page), oscuro, moderno y muy optimizado. El elemento protagonista es una **tarjeta-carnet 3D** que se inclina siguiendo el mouse. Meta de rendimiento: **90–100 en Lighthouse**, excelente en móvil.

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
- **Datos separados de la vista:** el contenido de los proyectos vive en `src/data/projects.js`. Los componentes lo renderizan en bucle.
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
│   │   ├── ProjectCard.astro     # tarjeta reutilizable
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── data/
│   │   └── projects.js           # datos de proyectos (fuente única)
│   ├── scripts/
│   │   ├── card-tilt.js
│   │   ├── scroll-reveal.js
│   │   └── navbar.js
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
│   │   └── proyectos/            # capturas de proyectos
│   ├── cv.pdf                    # CV descargable (pendiente)
│   └── favicon.svg
├── Dockerfile                    # multi-stage: build Astro + nginx
├── .dockerignore
├── nginx.conf                    # config nginx para SPA estática
├── astro.config.mjs
└── README.md
```

## 7. Secciones de la página (orden)

1. **Navbar** — fijo, minimal. Nombre a la izquierda; links (Sobre mí · Stack · Proyectos · Contacto) a la derecha. Blur al scrollear.
2. **Hero** — dos columnas. Izquierda: nombre, rol, botones (Ver proyectos / Descargar CV). Derecha: el carnet 3D.
3. **Sobre mí** — párrafo + workflow con IA (ver contenido abajo).
4. **Stack** — chips agrupados por categoría.
5. **Proyectos** — grid de tarjetas desde `projects.js`.
6. **Contacto** — email, GitHub, LinkedIn + CTA.
7. **Footer** — copyright, links rápidos.

## 8. Contenido real

### Hero
- Nombre: **Manuel Andrés Cárdenas Suárez**
- Rol: **Analista y Desarrollador de Software**
- Sin tagline.

### Carnet (IdCard)
Foto (placeholder por ahora) + nombre + rol + un ID decorativo (`DEV-2026`) + QR pequeño opcional que apunte al GitHub.

### Sobre mí (perfil individual + workflow con IA)
> Analista y Desarrollador de Software. Desarrollo aplicaciones web y móviles con foco en arquitectura limpia, código mantenible y buenas prácticas. Trabajo principalmente con PHP 8 y MySQL 8 en el backend, JavaScript y Bootstrap en el frontend, y Kotlin con Jetpack Compose para desarrollo móvil nativo. En infraestructura administro despliegues con Docker y Dokploy sobre servidores Linux, usando Git y GitHub para el control de versiones.
>
> **Trabajo asistido por IA:** integro herramientas como Claude y Claude Code en mi flujo de desarrollo para acelerar la construcción, mientras yo defino la arquitectura, tomo las decisiones técnicas y reviso cada línea que entra a producción. La IA multiplica mi productividad; el criterio y el diseño son míos.

### Stack (chips agrupados)
- **Backend:** PHP 8, MySQL 8, PDO, APIs REST
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5, Astro
- **Móvil:** Kotlin, Jetpack Compose, Room, Retrofit, Hilt
- **DevOps / Infra:** Docker, Dokploy, Linux, Nginx, Traefik, VPS
- **Herramientas:** Git, GitHub, VS Code, Claude Code, MySQL Workbench

### Proyectos (data/projects.js)
Cada proyecto: `titulo`, `descripcion`, `stack` (array), `estado`, `repo`, `demo` (o null), `imagen`.

1. **BreadControl**
   - Descripción: Sistema web de gestión para panadería (caso real: panadería familiar). Control de ventas, producción, inventario y finanzas con costeo FIFO y pagos vía Nequi/Wompi.
   - Stack: PHP 8, MySQL 8, Bootstrap 5, PDO
   - Estado: **Producción**
   - Repo: https://github.com/Manuel151025/breadcontrol
   - Demo: https://breadcontrol.manuelcardenas.online

2. **Proyecto Offline**
   - Descripción: App Android nativa offline-first para encuestas de campo (caso Ministerio de Salud). Sincronización con resolución de conflictos Last-Write-Wins y patrón outbox.
   - Stack: Kotlin, Jetpack Compose, Room, WorkManager, Retrofit, Hilt, Clean Architecture/MVVM, PHP 8, MySQL 8
   - Estado: **En desarrollo**
   - Repo: https://github.com/Manuel151025/proyecto_offline
   - Demo: https://encuestas.manuelcardenas.online

3. **SeguimientoSENA**
   - Descripción: Sistema de seguimiento de proyectos formativos con tres roles (coordinador, instructor, aprendiz). Exportación PDF/Excel y recuperación de contraseña por email.
   - Stack: PHP 8, MySQL 8, Bootstrap 5, PDO
   - Estado: **En desarrollo**
   - Repo: https://github.com/Manuel151025/proyecto_sena
   - Demo: https://sena.manuelcardenas.online

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
- [ ] CV en PDF (`public/cv.pdf`).
- [ ] Capturas de proyectos (`public/img/proyectos/`).
- [ ] Terminar Proyecto Offline y SeguimientoSENA → cambiar badge a "Producción" y agregar demo.


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