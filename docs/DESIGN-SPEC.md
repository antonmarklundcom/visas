# Design spec — visas.com.py

Concept: **"pasaporte editorial"**. A confident travel-document aesthetic: warm paper,
ink navy typography, one stamp-red accent, ticket-shaped cards with perforated
edges, rotated stamp rings as decoration. It must NOT look like a generic SaaS
template (no purple gradients, no glassmorphism, no stock-photo hero). Zero photos
in v1: the design carries itself with type, color, and SVG.

## Tokens (`:root` in assets/css/site.css)
```
--paper:      #F6F1E7;   /* page background */
--paper-2:    #EEE6D6;   /* alternating sections, card fill */
--ink:        #0F1B33;   /* text, headings, dark sections */
--ink-2:      #3A4660;   /* secondary text */
--line:       #D9CFBB;   /* hairlines, perforations */
--stamp:      #C6392C;   /* accent: stamp red, eyebrow labels, marks */
--sky:        #2457C5;   /* links, focus rings, secondary buttons */
--wa:         #25D366;   /* WhatsApp only */
--wa-ink:     #0B3D22;
--radius:     14px; --radius-lg: 22px;
--shadow:     0 10px 30px rgba(15,27,51,.10);
--container:  1160px;
```
Dark sections (`.section--ink`) invert: background var(--ink), text var(--paper),
accent stays stamp red, hairlines rgba(246,241,231,.18).

## Type (Google Fonts, preconnect, display=swap; real fallback stacks)
- Display: `Fraunces` (opsz, wght 500-700, font-variation-settings "opsz" 144),
  fallback Georgia/serif. Headlines tight: letter-spacing -0.02em, line-height 1.05.
- Body/UI: `Manrope` 400/500/700, fallback system-ui. 17px base desktop, 16px mobile,
  line-height 1.6.
- Labels/stamps: `JetBrains Mono` 500, uppercase, letter-spacing .12em, 12px.
  Used for eyebrows ("VISA AMERICANA · B1/B2"), ticket meta, step numbers.
Type scale: h1 clamp(2.4rem, 6vw, 4.4rem); h2 clamp(1.8rem, 3.6vw, 2.8rem);
h3 1.35rem; eyebrow .75rem mono.

## Components
1. **Header**: paper background, hairline bottom. Logo = wordmark "visas.com.py"
   in Fraunces with a small stamp-red circle before it. Nav: Visa americana
   (dropdown with the 6 subpages), Canadá, Residencia en Paraguay, Guías,
   Contacto. Right: green WhatsApp button (icon + "WhatsApp"). Mobile: burger ->
   full-screen panel, big links.
2. **Hero (home)**: two columns on desktop, stacked on mobile. Left: eyebrow
   "ASESORÍA DE VISAS · PARAGUAY", h1 "Tu visa americana, sin improvisar.",
   lead paragraph, primary CTA (WhatsApp green, large, "Evaluar mi caso por
   WhatsApp") + secondary link ("Ver cómo trabajamos"). Under the CTAs a row of
   three mono "proof chips" (e.g. "DS-160 revisado", "Simulacro de entrevista",
   "Respuesta el mismo día"). Right: the **boarding-pass card** (see 3) with a
   rotated stamp ring behind it (see 4), gently floating (CSS keyframes, 6s,
   translateY 0 -> -8px, prefers-reduced-motion respected).
3. **Ticket card** (`.ticket`): paper-2 fill, radius-lg, hairline border, a
   vertical perforation line (dashed, using repeating-linear-gradient) with two
   half-circle notches (paper-colored ::before/::after circles) separating a
   main body and a stub. Mono meta rows: "DESDE ASU", "HACIA USA", "TIPO B1/B2",
   "ESTADO: EN PREPARACIÓN". Big Fraunces text "ASU -> USA" with an inline SVG
   plane between codes. Reused for service cards (each service = a ticket).
4. **Stamp ring** (`.stamp`): inline SVG, two concentric circles, text on a
   circular path (SVG textPath) reading "ASESORÍA DE VISAS · PARAGUAY ·", rotated
   -12deg, stroke stamp red, opacity .85, slight roughness via
   stroke-dasharray 2 1 on the outer ring. Never says APROBADA / APPROVED.
5. **Route stepper** (`.ruta`): 5 steps in a horizontal line on desktop (mono
   number in a circle, title, one line), vertical on mobile with a dashed left
   line. Steps: 01 Evaluación, 02 DS-160, 03 Arancel y cita, 04 Simulacro,
   05 Entrevista.
6. **Service grid**: 3 columns of ticket cards (2 on tablet, 1 on mobile), each
   with eyebrow, h3, 2-line summary, "Ver detalle" link with arrow, and a tiny
   mono tag at the stub ("PRIMERA VEZ", "RENOVACIÓN", "ESTUDIANTE"...).
7. **Section with checklist**: two columns, title left sticky, list right, each
   item with a stamp-red check mark SVG (16px) in a circle.
8. **FAQ accordion**: native `<details>`, styled: hairline dividers, Fraunces
   question, plus/minus rotate. FAQPage JSON-LD.
9. **Testimonials**: none in v1 (no invented quotes). Instead a "Lo que revisamos
   antes de tu cita" block (3 mono-labeled cards).
10. **CTA band** (`.section--ink`): big Fraunces line "Contanos tu caso hoy.",
    WhatsApp button + "o dejanos tu número" form link.
11. **Contact form** (`/contacto/`): fields nombre, teléfono (required, tel),
    email (optional), tipo de visa (select: Turista EE.UU., Renovación,
    Estudiante, Trabajo, Canadá, Residencia en Paraguay, Otro), mensaje,
    honeypot `website`, hidden page_url. Posts to /lead-forward.php. Ticket-styled
    card. Below it the WhatsApp alternative.
12. **Footer** (ink): 4 columns (Servicios, Guías, Empresa, Contacto), the legal
    disclaimer paragraph (docs/CONTENT-BRIEF.md), copyright, link to
    /privacidad/ (simple page).
13. **Mobile sticky bar**: bottom, WhatsApp green full-width button, hidden on
    desktop, hidden when the contact form is in view.
14. **WhatsApp prefill**: every WhatsApp link carries a message naming the page
    (Hola, vengo de visas.com.py (visa de turista) y quiero evaluar mi caso ...).
    One constant WA_NUMBER in content.mjs.

## Motion
- IntersectionObserver `.reveal` -> opacity/translateY 16px, 500ms, stagger via
  a custom property. Disabled under prefers-reduced-motion.
- Ticket float animation (hero only).
- Links: underline offset 4px, stamp-red on hover.

## Layout
- Container max 1160px, gutters 20px mobile / 32px desktop.
- Section padding clamp(56px, 9vw, 120px).
- Alternate paper / paper-2 / ink backgrounds for rhythm; never two ink in a row.

## Accessibility / perf
- Contrast: ink on paper passes AAA; stamp red only for text >= 14px bold or
  labels; WhatsApp button text is --wa-ink on --wa (dark on green, never white).
- Focus rings sky, 3px, visible.
- No external JS libs. Inline critical SVGs. Fonts via Google Fonts link tags.
- Every image slot (none in v1) reserved with aspect-ratio boxes for later.
