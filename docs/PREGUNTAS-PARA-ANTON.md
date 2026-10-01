# Lo que necesito de vos (mañana)

Nada de esto bloquea el diseño. Cada respuesta desbloquea una mejora concreta.

## A. Negocio (decide el copy)
1. **¿Quién entrega el servicio?** ¿Vos con un socio/gestor de visas, o vendés los
   leads a una agencia (pilot USD 500/mes del plan del 13-09)? Cambia "nosotros"
   y el aviso legal.
2. **Lista real de servicios y precios.** Hoy: turista, renovación, estudiante,
   trabajo, entrevista/simulacro, denegada, Canadá, México, residencia PY.
   ¿Sacamos alguno? ¿Precios en Gs. o USD? ¿Se publican o "consultá"?
3. **Número de WhatsApp de visas.com.py.** Hoy uso el número compartido de
   etapa 1 (595995628862, el de tasacion). Si hay otro, cambio una constante.
4. **¿Hay oficina física / dirección en Asunción?** (Google Business Profile,
   LocalBusiness JSON-LD.) Si no, queda "atención por WhatsApp y videollamada".
5. **¿Abogado involucrado?** Si no, la palabra "abogado" no aparece.
6. **Horario de atención** para el texto de contacto.

## B. Datos oficiales a confirmar (docs/FACTS.md)
7. Monto vigente del arancel MRV B1/B2 (uso USD 185) y si ya aplica el "visa
   integrity fee" anunciado en 2025.
8. Redacción exacta de la exención de México para paraguayos con visa de EE.UU.

## C. Google Keyword Planner (lo hacemos juntos)
9. Exportá del KWP (Paraguay, español) las ideas para: visa americana, visa
   estados unidos, ds-160, entrevista visa, renovar visa americana, visa
   estudiante, work and travel, visa canada, visa mexico, residencia paraguay.
   Con volúmenes y CPC. Lo pego en docs/KWP-2026-09.csv y reordeno títulos,
   H1 y el mapa de páginas (docs/KEYWORD-SEEDS.md tiene mi lista previa).

## D. VenderCRM
10. El negocio "Visas" y el sitio visas.com.py YA existen en el CRM (creados en el
    bulk del 10-09, activos), pero la clave en texto plano se perdió por el bug
    del script. Necesito: CRM -> negocio Visas -> Sitios -> visas.com.py ->
    **nueva API key**, y la pegás en `lead-forward.php` (constante
    VENDERCRM_API_KEY_FALLBACK) o en el env de Hostinger. Hasta entonces los
    leads del formulario quedan en `leads.log` en el servidor, no se pierden.
11. La base local del repo vendercrm da "Access denied" por IPv4 e IPv6: la
    contraseña de `.env` está vieja otra vez (copiar del env del app en vivo).
    Quedó un batch vacío 01M2EV472ENBE143NZJ37Z619Y en Claude Ops (falló en
    tenant porque "visas" ya existía); se puede cerrar.

## E. Deploy
12. ¿Qué cuenta/slot de Hostinger para visas.com.py? Cuando confirmes, armo el
    zip plano (skill hostinger-html-php-deploy) y lo subís.

## F. Imágenes
13. v1 no tiene fotos a propósito (diseño tipográfico "pasaporte editorial").
    Si querés fotos: 4-6 imágenes vía Higgsfield + webimg (coste en créditos,
    te confirmo antes de generar).
