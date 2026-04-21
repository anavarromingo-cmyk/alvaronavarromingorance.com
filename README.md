# Web provisional · Alvaro Navarro Mingorance

Sitio estático en HTML + CSS + JS vanilla, sin frameworks ni build. Listo para desplegar en GitHub Pages con dominio propio (`alvaronavarromingorance.com`).

> Versión: **v1 provisional · 18 de abril de 2026**
> Diseño: Minimalista Tech (paleta azul profundo + naranja cálido, tipografía Inter)
> Idioma: español
> Autor: Alvaro Navarro Mingorance

---

## 1. Estructura del proyecto

```
web-provisional/
├── index.html                  ← Home
├── 404.html                    ← Página de error
├── CNAME                       ← Dominio propio (alvaronavarromingorance.com)
├── robots.txt
├── sitemap.xml
├── README.md                   ← Este archivo
│
├── sobre-alvaro/index.html
├── curso/index.html
├── clase-0/index.html
├── blog/index.html
├── newsletter/index.html
├── contacto/index.html
│
├── legal/
│   ├── aviso-legal/index.html
│   ├── privacidad/index.html
│   └── cookies/index.html
│
└── assets/
    ├── css/main.css            ← Diseño completo (~770 líneas, un solo archivo)
    ├── js/main.js              ← Menú móvil, cookie banner, fade-up, año dinámico
    └── img/alvaro.png          ← Foto de perfil (copia de FotoPerfil.png)
```

**Cada página HTML es autónoma:** comparten el mismo `<header>`, `<footer>` y `<div class="cookie-banner">` duplicados. No hay motor de plantillas. Si cambias el menú, hay que cambiarlo en cada página (10 archivos).

---

## 2. Cómo previsualizar la web en local

No hace falta nada complicado. Tres opciones:

### Opción A — Abrir el HTML directamente
Doble clic en `index.html` y se abre en el navegador. ⚠️ Algunas rutas absolutas (`/assets/...`) pueden fallar al abrir como `file://`. Mejor usar la opción B o C.

### Opción B — Servidor estático con Python (ya viene en macOS y Linux)
```bash
cd web-provisional
python3 -m http.server 8000
```
Luego abrir <http://localhost:8000> en el navegador.

### Opción C — Servidor estático con Node
```bash
cd web-provisional
npx serve
```

---

## 3. Despliegue en GitHub Pages (paso a paso)

### Paso 3.1 — Crear el repositorio en GitHub

1. Ve a <https://github.com/new>.
2. Crea un repositorio nuevo. Recomendado:
   - **Nombre del repo:** `alvaronavarromingorance.com` (o `web-personal`, da igual)
   - **Visibilidad:** Public (para usar GitHub Pages gratis con dominio propio)
   - **NO marques** "Add a README", "Add .gitignore" ni "Add license" (los añadirás tú).
3. Click en `Create repository`.

### Paso 3.2 — Subir los archivos al repositorio

Desde la carpeta `web-provisional` en tu ordenador, en una terminal:

```bash
cd web-provisional
git init
git add .
git commit -m "v1 provisional"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/alvaronavarromingorance.com.git
git push -u origin main
```

> Sustituye `TU-USUARIO` por tu nombre de usuario de GitHub.

### Paso 3.3 — Activar GitHub Pages

1. En el repositorio en GitHub, ve a `Settings` (arriba a la derecha) → `Pages` (menú izquierdo).
2. En **Source**, selecciona `Deploy from a branch`.
3. En **Branch**, selecciona `main` y carpeta `/ (root)`. Click en `Save`.
4. Espera 1-2 minutos. La web ya está disponible en `https://TU-USUARIO.github.io/alvaronavarromingorance.com/` (o similar).

### Paso 3.4 — Conectar el dominio propio

En la misma página de `Settings → Pages`, sección **Custom domain**:

1. Escribe `alvaronavarromingorance.com` y click en `Save`.
2. GitHub validará el dominio (puede tardar unas horas tras configurar el DNS, ver siguiente paso).
3. Una vez validado, marca la casilla `Enforce HTTPS`.

> El archivo `CNAME` ya está en el repo con el dominio. GitHub lo detectará automáticamente.

### Paso 3.5 — Configurar el DNS del dominio

En el panel del registrador donde tengas comprado `alvaronavarromingorance.com` (Namecheap, GoDaddy, IONOS, Google Domains, etc.):

**Para el dominio raíz (`alvaronavarromingorance.com`)** — añade 4 registros tipo **A** apuntando a las IPs oficiales de GitHub Pages:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

**Para `www.alvaronavarromingorance.com`** — añade 1 registro tipo **CNAME**:

```
CNAME   www   TU-USUARIO.github.io.
```
(Sustituye `TU-USUARIO` por tu nombre de usuario de GitHub. ⚠️ Importante el punto final.)

### Paso 3.6 — Esperar la propagación DNS

La propagación DNS puede tardar entre 15 minutos y 24 horas. Puedes comprobar el estado con:

```bash
dig alvaronavarromingorance.com +short
```

Cuando devuelva las IPs `185.199.108.153` (etc.), está listo. Vuelve a `Settings → Pages` y verás un check verde junto al dominio. Activa `Enforce HTTPS` si aún no lo hiciste.

---

## 4. Alternativa: despliegue en Cloudflare Pages

Si en el futuro necesitas más velocidad global, mejor analítica integrada, despliegues por previews por rama o reglas avanzadas, **Cloudflare Pages** es muy buena opción y también gratis. Para este proyecto, GitHub Pages es suficiente. Si más adelante quieres migrar:

1. Crea cuenta en <https://pages.cloudflare.com>.
2. Conecta tu repo de GitHub.
3. Build settings: vacíos (es un sitio estático, no hay build).
4. Cloudflare detecta el `CNAME` y asume el dominio. Configura DNS automáticamente si tu dominio está en Cloudflare.

---

## 5. Cómo añadir un artículo de blog en el futuro

1. Crea una carpeta nueva: `blog/slug-del-articulo/`
2. Dentro, crea `index.html` copiando la estructura de cualquier página existente (header + footer + cookie banner).
3. Dentro de `<main>`, escribe el artículo entre `<article class="post-card">...</article>`.
4. En `blog/index.html`, descomenta el bloque de ejemplo de post o añade uno nuevo enlazando al `slug`.
5. Añade la nueva URL al `sitemap.xml`.
6. Commit + push y la web se actualiza sola en 1 minuto.

---

## 6. Antes de hacer el sitio público

Pendientes de completar antes del lanzamiento (marcados con `[pendiente]` o `[A definir]` en el código):

- [ ] **Aviso legal** → añadir NIF y dirección profesional
- [ ] **Privacidad** → añadir NIF y dirección profesional
- [ ] **Cookies** → completar tabla de analítica cuando se elija herramienta (Plausible / Fathom / GA4)
- [ ] **Newsletter** → conectar formulario real (MailerLite, Beehiiv, Substack, ConvertKit…)
- [ ] **Clase 0** → grabar vídeo + maquetar PDF resumen + conectar formulario
- [ ] **Curso** → cerrar fechas y precio, conectar pasarela de pago + LMS
- [ ] **Charlas/Notion** → reemplazar URLs placeholder de Notion (`https://notion.so/placeholder`) por las URLs reales públicas
- [ ] **Contacto** → conectar formulario real (Formspree, Basin, etc.) o quedarse solo con email
- [ ] **Email del dominio** → activar `hola@alvaronavarromingorance.com` (Google Workspace, Zoho, Fastmail, etc.)
- [ ] **Favicon profesional** → ahora mismo se usa la foto de perfil; convendría un favicon dedicado (ANM o un símbolo)
- [ ] **OG image** → diseñar imagen 1200×630px para previsualizaciones en redes y añadir `<meta property="og:image">` en cada página

---

## 7. Stack tecnológico recomendado para la versión definitiva

Cuando llegue el momento de cerrar el stack final, queda pendiente decidir:

| Categoría | Recomendación |
|---|---|
| Hosting | GitHub Pages (gratis) o Cloudflare Pages (gratis) |
| Email profesional | Google Workspace, Zoho Mail o Fastmail |
| Email marketing | MailerLite (RGPD-friendly) o Beehiiv (UX moderna) |
| Pasarela de pago | Stripe (estándar internacional) |
| LMS para el curso | Teachable, Thrivecart Learn+ o Podia |
| Analítica | Plausible (RGPD-friendly, sin cookies) o Fathom |
| Formulario de contacto | Formspree, Basin o el del proveedor de email marketing |

Esto se trabajará en una próxima fase específica del proyecto.

---

## 8. Soporte

Cualquier duda sobre este código o el despliegue:
- Email: hola@alvaronavarromingorance.com
- Documentación oficial GitHub Pages: <https://docs.github.com/es/pages>

---

— Alvaro Navarro Mingorance
