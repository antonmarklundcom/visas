// Presentation and enquiry improvements on the recovered information-only site.
export function applyRefresh(pages, nav) {
 const get=path=>pages.find(p=>p.path===path);
 const home=get('/');
 const destinationsNav=nav.find(item=>item.label==='Otros destinos');
 if(destinationsNav)destinationsNav.href='/#destinos';
 home.hero.image='destino-nueva-york';
 home.hero.imageAlt='Ilustración generada con IA del horizonte de Manhattan visto desde Brooklyn, al atardecer';
 home.hero.lead='Requisitos, formularios y próximos pasos para viajar desde Paraguay. Empezá por tu situación y encontrá las fuentes oficiales para preparar tu visa americana.';
 home.hero.primary='Hacer una consulta';
 home.hero.secondary={href:'#destinos',label:'Explorar destinos'};
 home.hero.chips=['Guías de acceso libre','Enlaces a las autoridades','Sin promesas de aprobación'];
 const choose=home.sections.find(s=>s.type==='services');
 choose.id='servicios';choose.eyebrow='Visa americana';choose.title='Un punto de partida para cada situación.';
 choose.body='Primera solicitud, renovación o una negativa: elegí la guía que responde a tu próximo paso.';
 const route=home.sections.find(s=>s.type==='route');
 route.id='ruta';route.title='De la primera duda al siguiente paso.';
 route.items=[
  {title:'Ubicá tu categoría',body:'Empezá por el motivo del viaje y las instrucciones oficiales.',href:'/guias/requisitos-visa-americana-paraguay/',label:'Ver requisitos'},
  {title:'Prepará el DS-160',body:'Organizá tus datos y revisá las respuestas antes de enviar.',href:'/guias/como-llenar-el-ds-160/',label:'Abrir la guía del formulario'},
  {title:'Revisá arancel y cita',body:'Confirmá el pago oficial y seguí las instrucciones de la embajada.',href:'/guias/cuanto-cuesta-la-visa-americana/',label:'Separar los costos'},
 ];
 const faq=home.sections.find(s=>s.type==='faq');
 const cta=home.sections.find(s=>s.type==='cta');
 home.sections=[
  {type:'destinationCards',id:'destinos',eyebrow:'Tu destino, tu guía',title:'¿A dónde querés ir?',body:'Cada destino tiene su propio recorrido. Estas guías te ayudan a encontrar el tuyo.',items:[
   {href:'/visa-americana/',title:'Estados Unidos',tag:'Visita · estudios · trabajo',body:'Categorías, DS-160, arancel y entrevista.',image:'destino-nueva-york'},
   {href:'/visa-canada/',title:'Canadá',tag:'Visita · estudios',body:'Empezá por las instrucciones de IRCC.',image:get('/visa-canada/').hero.image},
   {href:'/visa-espana/',title:'España',tag:'Viaje · larga estadía',body:'Diferenciá una visita de un proyecto de residencia.',image:get('/visa-espana/').hero.image},
   {href:'/residencia-en-paraguay/',title:'Paraguay',tag:'Residencia · mudanza',body:'Requisitos y fuentes de Migraciones.',image:get('/residencia-en-paraguay/').hero.image},
  ]},
  choose,route,
  {type:'guideCards',eyebrow:'Prepará tu viaje',title:'Respuestas que podés usar.',body:'Información práctica, con enlaces para comprobar cada paso.',items:[
   {href:'/guias/como-llenar-el-ds-160/',title:'Cómo llenar el DS-160',body:'Organizá tus respuestas y ubicá las instrucciones oficiales.',tag:'Formulario'},
   {href:'/guias/cuanto-cuesta-la-visa-americana/',title:'Cuánto cuesta la solicitud',body:'Arancel consular, otros cargos y gastos personales, por separado.',tag:'Presupuesto'},
   {href:'/guias/checklist-visa-americana/',title:'Tu lista de preparación',body:'Una checklist que podés leer e imprimir sin entregar tus datos.',tag:'Checklist'},
  ]},
  {type:'scope',eyebrow:'Información con límites claros',title:'Tu solicitud es tuya. La decisión es oficial.',body:'visas.com.py es un sitio privado e independiente de información. No es una embajada ni gestiona decisiones migratorias.',items:[
   {title:'Lo que encontrás acá',body:'Guías para orientarte, enlaces oficiales y un canal para preguntas generales.'},
   {title:'Antes de contratar ayuda',body:'Pedí la identidad del responsable, las tareas incluidas y los honorarios por escrito. El arancel oficial es un concepto separado.'},
  ]},faq,cta,
 ];
 // Expose the two additional destinations without inventing services.
 home.sections[0].more=[{href:'/visa-australia/',label:'Australia'},{href:'/work-and-travel/',label:'Work and Travel'},{href:'/guias/',label:'Todas las guías'}];
 for(const path of ['/contacto/','/en/contact/']) {
  const page=get(path),en=page.lang==='en';
  page.hero.lead=en?'Start with your destination and a general question. You can prepare a short message below, then open WhatsApp to send it.':'Empezá con tu destino y una duda general. Prepará un mensaje breve y abrí WhatsApp cuando quieras enviarlo.';
 }
 // Explain the current public channel; describe dormant form handling only when enabled.
 for(const path of ['/privacidad/','/en/privacy/']) {
  const page=get(path),en=page.lang==='en';
  if(process.env.VISAS_CONTACT_FORM!=='1')page.sections=[{type:'prose',items:[
   {title:en?'Current contact channel':'El canal de contacto actual',body:en?'The public site uses WhatsApp. The message helper works in your browser; it does not send or store your selections on this website. Opening WhatsApp does not send a message automatically. WhatsApp processes messages on its own platform.':'El sitio público usa WhatsApp. El preparador de mensajes funciona en tu navegador; no envía ni guarda tus selecciones en este sitio. Abrir WhatsApp no envía automáticamente el mensaje. WhatsApp procesa los mensajes en su propia plataforma.'},
   {title:en?'Share only what is needed':'Compartí solo lo necesario',body:en?'A destination and a general question are enough for a first contact. Do not send passports, identity documents, passwords, medical records or payment information. Ask who will handle your enquiry before sharing further information.':'Para una primera consulta alcanza con el destino y una duda general. No envíes pasaportes, documentos de identidad, contraseñas, antecedentes médicos ni datos de pago. Confirmá quién atenderá tu consulta antes de compartir más información.'},
   {title:en?'Questions about your information':'Consultas sobre tus datos',body:en?'Ask the operator of the WhatsApp channel about access, correction, deletion, retention and any onward transfer. This website does not publish a verified legal operator identity or a CRM retention policy.':'Consultá al responsable del canal de WhatsApp sobre acceso, corrección, eliminación, conservación y cualquier derivación. Este sitio no publica una identidad legal verificada del operador ni una política de conservación en el CRM.',links:[{label:en?'Contact about privacy':'Consultar sobre mis datos',href:en?'/en/contact/':'/contacto/'}]},
   {title:en?'Optional measurement':'Medición opcional',body:en?'Optional analytics are currently disabled. If enabled in a future release, the website asks for your choice before loading them. Message helper selections are never included in analytics events.':'La analítica opcional está deshabilitada actualmente. Si se habilita en una versión futura, el sitio pide tu elección antes de cargarla. Las selecciones del preparador de mensajes no se incluyen en eventos de analítica.'},
  ]}];
 }
 const costs=get('/guias/cuanto-cuesta-la-visa-americana/');
 costs.sections.find(s=>s.type==='article').items[0].rows[0]=['Solicitud B1/B2 (MRV)','USD 185 por solicitante; no reembolsable. Verificá el importe oficial antes de pagar.'];
 costs.updated='2026-10-04';
 costs.sections.find(s=>s.type==='article').items[0].paragraphs.push('Importe B1/B2 contrastado con la tabla de aranceles del Departamento de Estado el 4 de octubre de 2026. No es el precio de un servicio de visas.com.py ni el costo total del viaje. Otros cargos oficiales, cuando correspondan, se verifican por separado.');
 // The merged main branch includes travel guides whose generic source assignment
 // pointed to US visa pages even for Mexico, the UK and Paraguayan passports.
 const official={
  mexico:{label:'Embajada de México en Paraguay: visas y exenciones',href:'https://embamex.sre.gob.mx/paraguay/index.php/index.php?id=15&option=com_content&view=article'},
  uk:{label:'Gobierno del Reino Unido: comprobar visa o ETA',href:'https://www.gov.uk/check-uk-visa'},
  eta:{label:'Gobierno del Reino Unido: autorización ETA',href:'https://www.gov.uk/eta'},
  passport:{label:'Policía Nacional: Departamento de Identificaciones',href:'https://www.policianacional.gov.py/identificaciones/'},
  chile:{label:'Chile: Permanencia Transitoria (SERMIG)',href:'https://serviciomigraciones.cl/permanencia-transitoria/'},
  uruguay:{label:'Uruguay: visas de ingreso (Ministerio de Relaciones Exteriores)',href:'https://www.gub.uy/ministerio-relaciones-exteriores/comunicacion/publicaciones/visas-para-ingresar-uruguay'},
  argentina:{label:'Argentina: documentos de viaje del MERCOSUR',href:'https://www.argentina.gob.ar/migraciones/documentos-de-viaje-del-mercosur'},
  brasil:{label:'Brasil: información consular de visas',href:'https://www.gov.br/mre/pt-br/assuntos/portal-consular/quem-contatar/vistos'},
  vwp:{label:'Estados Unidos: países y condiciones del Visa Waiver Program',href:'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visa-waiver-program.html'},
  photo:{label:'Estados Unidos: requisitos oficiales de fotografías',href:'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html'},
  denial:{label:'Estados Unidos: negativas y procesamiento administrativo',href:'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/visa-denials.html'},
 };
 for(const [path,keys]of Object.entries({
  '/guias/viajar-a-mexico-desde-paraguay/':['mexico'],
  '/guias/viajar-al-reino-unido-desde-paraguay/':['uk','eta'],
  '/guias/renovar-pasaporte-paraguayo/':['passport'],
  '/guias/viajar-a-chile-y-uruguay-desde-paraguay/':['chile','uruguay'],
  '/guias/viajar-brasil-argentina-desde-paraguay/':['brasil','argentina'],
  '/guias/esta-paraguayos-no-aplica/':['vwp'],
  '/guias/foto-para-visa-americana-requisitos/':['photo'],
  '/guias/procesamiento-administrativo-221g-visa-americana/':['denial'],
  '/guias/destinos-sin-visa-para-paraguayos/':['mexico','uk','eta','brasil','argentina'],
 }))get(path).sources=keys.map(key=>official[key]);
 // Remove the inherited universal interview-timing claim; waivers exist.
 const scams=get('/guias/estafas-visa-americana-paraguay/').sections.find(s=>s.type==='article');
 for(const part of scams.items)part.paragraphs=part.paragraphs.map(p=>p.replace('y se toma después de una entrevista.','y se toma mediante el procedimiento oficial aplicable.'));
}
