import { applyInformationStage } from './content-information.mjs';
// Editorial revision, 2026-09-19. Business facts remain owner-supplied.
export const SOURCES = {
  exchange: { label: 'Summer Work Travel — BridgeUSA', href: 'https://j1visa.state.gov/programs/summer-work-travel/' },
  visitor: { label: 'Visa de visitante — Departamento de Estado', href: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html' },
  ds160: { label: 'DS-160: instrucciones y preguntas frecuentes', href: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html' },
  form: { label: 'Completar el DS-160 en CEAC', href: 'https://ceac.state.gov/GenNIV/' },
  fees: { label: 'Aranceles oficiales de visas estadounidenses', href: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/fees/fees-visa-services.html' },
  denial: { label: 'Negativas y sección 214(b)', href: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/visa-denials.html' },
  waiver: { label: 'Reglas de exención de entrevista', href: 'https://travel.state.gov/content/travel/en/News/visas-news/interview-waiver-update-sept-18-2025.html' },
  embassy: { label: 'Embajada de Estados Unidos en Paraguay', href: 'https://py.usembassy.gov/visas/' },
  migration: { label: 'Dirección Nacional de Migraciones', href: 'https://migraciones.gov.py/' },
  etias: {label:'ETIAS: información oficial de la Unión Europea',href:'https://travel-europe.europa.eu/en/etias'},
  spain: { label: 'Servicios consulares de España en Asunción', href: 'https://www.exteriores.gob.es/Embajadas/asuncion/es/ServiciosConsulares/Paginas/index.aspx' },
  canada: { label: 'Canada: immigration and visas — IRCC', href: 'https://www.canada.ca/en/services/immigration-citizenship.html' },
  australia: { label: 'Australia: explorar las opciones de visa', href: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder' },
  caps: { label: 'Work and Holiday: países y cupos', href: 'https://immi.homeaffairs.gov.au/what-we-do/whm-program/status-of-country-caps' },
};
const section = (id, title, paragraphs, links = [], checkboxes) => ({ id, title, paragraphs, links: links.map(k => SOURCES[k]), checkboxes });
const guides = {
  '/guias/requisitos-visa-americana-paraguay/': [
    section('tramite', 'Empezá por el trámite correcto', ['Esta guía se refiere a visitas por turismo o negocios. Para estudiar o trabajar, revisá la categoría correspondiente antes de usar una lista de turismo. La autoridad puede pedir información adicional para tu caso.'], ['visitor']),
    section('documentos', 'Solicitud y documentos de base', ['La guía oficial de visitante describe el pasaporte, la confirmación del DS-160, el comprobante de pago cuando corresponda y la fotografía según las instrucciones. Contrastá vigencia, formato y entrega con tu cita; no todas las carpetas se preparan igual.'], ['visitor', 'ds160']),
    section('respaldo', 'Respaldos según tu situación', ['Prepará información verdadera sobre el motivo del viaje, cómo lo financiás y tu situación fuera de Estados Unidos. Trabajo, estudios o familia son ejemplos de contexto; no constituyen una lista de vínculos que todas las personas deban tener.']),
    section('revision', 'Antes de enviar o pagar', ['Compará nombres y antecedentes con tus documentos. Conservá la confirmación y usá el canal oficial para la cita. Separá los honorarios privados del arancel consular.'], ['fees', 'embassy']),
  ],
  '/guias/como-llenar-el-ds-160/': [
    section('empezar', 'Abrí el formulario oficial', ['Usá CEAC y seleccioná el lugar donde presentarás la solicitud. Tené a mano tu pasaporte, antecedentes de viajes y datos de trabajo o estudios. No copies respuestas personales de otra solicitud.'], ['form', 'ds160']),
    section('guardar', 'Guardá el identificador y tu avance', ['Anotá el identificador de solicitud que muestra el sistema y conservá de forma privada la información necesaria para recuperarla. Usá las opciones de guardar y recuperar de CEAC; evitá depender de una pestaña abierta. No compartas contraseñas ni respuestas de seguridad por nuestro formulario.'], ['ds160']),
    section('revisar', 'Revisá antes de firmar', ['Leé cada respuesta aunque otra persona te haya ayudado a cargarla. El nombre, los antecedentes y los planes deben describir tu situación. Si encontrás un dato dudoso, resolvelo antes del envío.']),
    section('confirmacion', 'Conservá la confirmación', ['Después del envío, guardá la página de confirmación con código de barras y seguí las instrucciones de la sede consular para la cita. Si necesitás corregir algo después, consultá las indicaciones oficiales para tu caso.'], ['ds160', 'embassy']),
  ],
  '/guias/preguntas-entrevista-visa-americana/': [
    section('temas', 'Temas para conversar con claridad', ['Podés practicar explicar tu motivo de viaje, duración prevista, financiación y ocupación. Son temas de preparación, no un cuestionario oficial ni preguntas aseguradas. Escuchá lo que te preguntan y respondé con tu propia información.']),
    section('practica', 'Un ejercicio útil', ['Contá tu plan en una explicación breve. Pedile a alguien que señale lo que no entendió. Revisá si coincide con tu formulario y corregí cualquier confusión; no memorices una respuesta ajena.']),
    section('documentos', 'Tené ubicados los respaldos', ['Organizá lo que indiquen las instrucciones de tu cita. Diferenciá una confirmación de solicitud de una confirmación de cita. Una carpeta grande no sustituye la elegibilidad.'], ['visitor', 'embassy']),
    section('decision', 'Preparación y decisión son distintas', ['La autoridad consular evalúa la solicitud. Una práctica puede ayudarte a comunicarte, pero no permite asegurar una aprobación ni una duración de entrevista.'], ['denial']),
  ],
  '/guias/visa-americana-denegada-214b/': [
    section('significado', 'Qué significa 214(b)', ['Puede tratarse de no haber demostrado los requisitos de la categoría o de no haber superado la presunción de intención inmigratoria. No toda negativa tiene el mismo fundamento: empezá por leer la comunicación recibida.'], ['denial']),
    section('cambios', 'Qué revisar antes de volver a solicitar', ['Compará tu solicitud anterior con tu situación actual. Identificá cambios reales o información relevante que no se consideró. No inventes empleo, ingresos o viajes para presentar un perfil diferente.']),
    section('nueva', 'Una nueva solicitud tiene un nuevo costo', ['El Departamento de Estado indica que no hay apelación de una negativa 214(b). Para volver a solicitar se presenta una nueva solicitud y se paga de nuevo el arancel. Repetir el trámite no asegura un resultado distinto.'], ['denial', 'fees']),
    section('consulta', 'Cómo plantear tu consulta', ['Contanos el tipo de visa, cuándo solicitaste y qué cambió. Para el primer contacto alcanza un resumen: no adjuntes tu pasaporte ni información sensible.']),
  ],
  '/guias/cuanto-cuesta-la-visa-americana/': [
    section('arancel', 'Arancel de solicitud B1/B2', ['El arancel de solicitud (MRV) para visas B1/B2 debe confirmarse en la página oficial antes de pagar y no es reembolsable. Es el arancel de solicitud, no un presupuesto total. Verificá posibles cargos aplicables a tu nacionalidad y categoría en la fuente oficial antes del pago.'], ['fees']),
    section('honorarios', 'Honorarios de preparación', ['Pedí una propuesta por escrito que indique las tareas incluidas y excluidas. La revisión del formulario, la orientación para la cita y la práctica de entrevista son trabajos distintos; no asumas que todos están incluidos.']),
    section('otros', 'Gastos personales y otros conceptos', ['Presupuestá por separado traslado, fotografías y servicios documentales que realmente correspondan a tu trámite. Confirmá primero qué exige la autoridad antes de pagar por documentos adicionales.']),
    section('pago', 'Dónde confirmar el pago', ['Entrá al sistema de citas desde el sitio oficial de la embajada. Identificá qué concepto estás abonando y guardá el comprobante. Un pago a una asesoría no es el pago consular ni compra una decisión favorable.'], ['embassy', 'fees']),
  ],
  '/guias/embajada-de-estados-unidos-en-paraguay/': [
    section('oficial', 'Entrá por el sitio oficial', ['visas.com.py no es la embajada. Para instrucciones de visa, ubicación de atención y avisos vigentes, consultá el sitio de la Embajada de Estados Unidos en Paraguay. No uses una captura antigua como instrucción de cita.'], ['embassy']),
    section('cita', 'Solicitud, arancel y cita', ['Son pasos diferentes: completá la solicitud que corresponda, verificá el pago aplicable y seguí el enlace al sistema de citas publicado por la embajada. Nuestro WhatsApp no es un canal consular.'], ['form', 'fees']),
    section('visita', 'Antes de ir', ['Leé las instrucciones de tu cita para confirmar dónde presentarte, qué llevar y las condiciones de ingreso. No deduzcas horarios u objetos permitidos a partir de una guía general.']),
    section('privado', 'Qué consultar a una asesoría', ['Podés pedir ayuda para entender el proceso o revisar tu preparación. La disponibilidad de citas y las decisiones pertenecen a la autoridad. Acordá el alcance y el costo privado antes de contratar.']),
  ],
  '/guias/migraciones-paraguay/': [
    section('consulta', 'Residencia y entrada al país son distintas', ['Antes de reunir documentos, definí si tu consulta es sobre ingresar, permanecer como visitante o solicitar residencia. Tu nacionalidad, situación y propósito determinan qué instrucciones necesitás consultar.'], ['migration']),
    section('categoria', 'Buscá la categoría en Migraciones', ['Consultá directamente las secciones de radicación de la Dirección Nacional de Migraciones. Compará requisitos, aranceles y modalidad de presentación de la categoría aplicable. No uses un checklist de otra nacionalidad como si fuera universal.'], ['migration']),
    section('origen', 'Confirmá los documentos de origen', ['Antes de encargar antecedentes, legalizaciones o traducciones, verificá emisor, vigencia y formalidades en la lista oficial. Anotá qué tenés, qué falta y qué necesita una aclaración.']),
    section('guia', 'Organizá tu siguiente paso', ['La guía de residencia puede ayudarte a ubicar temas y preparar preguntas. Las instrucciones oficiales y la revisión de tu situación siguen siendo necesarias.'], ['migration']),
  ],
  '/guias/requisitos-para-viajar-a-espana-desde-paraguay/': [
    section('motivo', 'Separá turismo de larga estadía', ['Una visita corta y un proyecto de estudios, trabajo o residencia no son el mismo trámite. Empezá por tu nacionalidad, motivo y duración prevista; confirmá las condiciones de entrada o el visado aplicable con la autoridad española.'], ['spain']),
    section('entrada', 'Qué consultar para una visita', ['Revisá documentación de viaje, condiciones de estancia, medios económicos y cualquier autorización aplicable a tu fecha de viaje. La exención de visado, cuando corresponda, no equivale a una entrada incondicional.'], ['spain']),
    section('larga', 'Estudios, trabajo o residencia', ['Buscá la sección consular específica de tu proyecto. No prepares una solicitud de larga estadía usando una lista turística. Antes de pagar traducciones o reservas, confirmá qué documentos y formalidades corresponden.']),
    section('preparar', 'Una consulta más útil', ['Anotá tu propósito, fecha tentativa y documentos disponibles. Pedí que te expliquen qué servicio privado te ofrecen y qué parte depende del consulado u otra institución.']),
  ],
  '/guias/checklist-visa-americana/': [
    section('antes', 'Antes del DS-160', ['Lista personal de organización; contrastala con las instrucciones oficiales de tu categoría.'], ['ds160'], ['Pasaporte y datos personales revisados.', 'Datos reales de trabajo, estudios y viajes reunidos.', 'Dudas del formulario identificadas antes del envío.']),
    section('solicitud', 'Después de completar la solicitud', ['Conservá los registros por separado y comprobá que correspondan a tu trámite.'], ['visitor', 'embassy'], ['Confirmación del DS-160 ubicada.', 'Instrucciones y confirmación de cita revisadas.', 'Comprobante del arancel ubicado cuando corresponda.']),
    section('entrevista', 'Antes de la cita', ['La autoridad puede pedir información adicional. Las casillas no representan una evaluación ni una promesa de aprobación.'], [], ['Documentos indicados para mi cita organizados.', 'Lugar e instrucciones de ingreso confirmados.', 'Información de mi viaje repasada con mis propias palabras.']),
    section('pendientes', 'Mis pendientes', ['Usá el espacio de la copia impresa para anotar las preguntas que todavía necesitás aclarar. No incluyas contraseñas, números completos de documentos ni datos de pago.']),
  ],
};
export function applyEditorial({ PAGES, NAV, FOOTER, SERVICES, DISCLAIMER, DISCLAIMER_EN, LANGUAGE_PAIRS }) {
  const get = path => PAGES.find(p => p.path === path);
  const home = get('/');
  home.hero.lead = 'Encontrá las instrucciones oficiales y prepará tu consulta: primera visa, renovación o una negativa anterior. Empezá por tu situación, sin promesas de aprobación.';
  home.hero.primary = 'Consultar por WhatsApp';
  home.hero.chips = ['Fuentes oficiales', 'Información clara', 'Sin promesas de aprobación'];
  const choose = home.sections.find(s => s.type === 'services');
  choose.title = '¿En qué etapa estás?'; choose.body = 'Elegí el punto de partida de tu consulta.'; delete choose.groups;
  choose.items = ['/visa-americana/turista/','/visa-americana/renovacion/','/visa-americana/denegada/'].map(path => SERVICES.find(s => s.href === path));
  const faq = home.sections.find(s => s.type === 'faq');
  const route = home.sections.find(s => s.type === 'route');
  route.title = 'Tu solicitud, paso a paso.';
  route.body = 'Este es el recorrido general de una solicitud; las instrucciones oficiales determinan qué corresponde a tu caso.';
  route.items = [{title:'Elegí la categoría',body:'Relacioná el motivo del viaje con el trámite oficial.'},{title:'Prepará tus datos',body:'Revisá el DS-160 y conservá la confirmación.'},{title:'Seguí las instrucciones',body:'Confirmá arancel, cita y preparación según tu solicitud.'}];
  const scope = { type:'prose', title:'Antes de contratar ayuda', items:[{title:'Conocé a la persona que atenderá tu caso',body:'Pedí el nombre del responsable, las tareas incluidas, los honorarios y el canal de seguimiento antes de compartir documentación o contratar un servicio. Una consulta inicial no es una cita consular.',links:[{label:'Cómo usar este sitio',href:'/nosotros/'}]}] };
  home.sections = [choose, scope, route, {type:'destinations',title:'Otros planes de viaje',items:SERVICES.filter(s=>!choose.items.includes(s))}, {type:'prose',title:'Respuestas para empezar',items:[{title:'Requisitos, costos y formulario',body:'Separá las instrucciones oficiales de los servicios privados. Estas guías te ayudan a ubicar cada paso.',links:[{label:'Requisitos de visa americana',href:'/guias/requisitos-visa-americana-paraguay/'},{label:'Costos de la solicitud',href:'/guias/cuanto-cuesta-la-visa-americana/'},{label:'Guía del DS-160',href:'/guias/como-llenar-el-ds-160/'}]}]},faq,home.sections.at(-1)];
  for (const item of NAV) if(item.href === '/contacto/') delete item.children;
  FOOTER.splice(0,FOOTER.length,
    {title:'Visas',links:[{label:'Estados Unidos',href:'/visa-americana/'},{label:'Canadá',href:'/visa-canada/'},{label:'España',href:'/visa-espana/'},{label:'Australia',href:'/visa-australia/'},{label:'Residencia en Paraguay',href:'/residencia-en-paraguay/'}]},
    {title:'Información',links:[{label:'Guías',href:'/guias/'},{label:'Preguntas frecuentes',href:'/preguntas-frecuentes/'},{label:'Sobre este sitio',href:'/nosotros/'},{label:'Privacidad',href:'/privacidad/'}]},
    {title:'Tu consulta',links:[{label:'Contacto por WhatsApp',href:'/contacto/'},{label:'Information in English',href:'/en/'}],whatsapp:true});
  get('/nosotros/').hero.title = 'Información para dar tu próximo paso.';
  get('/nosotros/').hero.lead = 'visas.com.py reúne información sobre visas y un canal para consultas desde Paraguay. Es un sitio privado e independiente de las autoridades migratorias.';
  get('/nosotros/').sections = [{type:'prose',items:[
    {title:'Información y atención son cosas distintas',body:'Las guías te ayudan a ubicar fuentes oficiales y preparar preguntas. Si consultás por un servicio, confirmá quién atenderá tu caso y cuál es su alcance antes de avanzar.'},
    {title:'Una propuesta clara, antes de contratar',body:'Pedí las tareas incluidas, los honorarios, los plazos de respuesta y las condiciones del servicio por escrito. Diferenciá esos honorarios de los aranceles oficiales y de los gastos de viaje.'},
    {title:'Tu información, con cuidado',body:'Para empezar alcanza con tu destino y una consulta general. No envíes pasaportes, antecedentes, contraseñas o datos de pago por el formulario inicial.',links:[{label:'Cómo se procesa tu consulta',href:'/privacidad/'}]},
    {title:'Imágenes y fuentes',body:'Las imágenes del sitio son ilustrativas; no representan clientes, integrantes de un equipo ni una oficina verificada. Cada guía enlaza las autoridades que debés consultar para tu trámite.'},
    {title:'Decisiones oficiales',body:DISCLAIMER},
  ]},home.sections.at(-1)];
  for(const p of PAGES) {
    const en=p.lang==='en';
    if(p.type==='service') {
      // Remove repetitive generic warnings; retain topic-specific requirements and FAQs.
      p.sections=p.sections.filter(s=>s.type!=='cards');
      for(const s of p.sections) {
        if(s.type==='checklist') { s.title=en?'What to clarify before proceeding':'Qué conviene aclarar antes de avanzar'; s.items=s.items.slice(0,4); }
        if(s.type==='route') s.items=s.items.slice(0,3);
      }
    }
    for(const s of p.sections) if(s.type==='contact') { delete s.image; s.body=en?'Only your phone number is required.':'Solo tu teléfono es obligatorio.'; }
    p.sections=p.sections.filter(s=>!(s.type==='prose'&&s.items?.some(i=>i.body?.startsWith('En nuestros servicios de visa estadounidense:'))));
    if(p.path==='/contacto/'||p.path==='/en/contact/') p.hero.lead=en?'Share your destination and your question. Please do not send sensitive documents.':'Contanos tu destino y tu consulta. No envíes documentos sensibles.';
    if(p.path.endsWith('gracias.html')||p.path.endsWith('thank-you.html')) {p.hero.eyebrow=en?'Your enquiry':'Tu consulta';p.hero.lead=en?'If you have not submitted an enquiry yet, use the contact form or WhatsApp. Only a submission confirmation verifies receipt.':'Si todavía no enviaste tu consulta, usá el formulario o WhatsApp. La recepción se confirma al completar el envío.';}
    const relevant = /canada/.test(p.path)?['canada']:/work-and-travel/.test(p.path)?['exchange','embassy']:/australia/.test(p.path)?['australia','caps']:/espana/.test(p.path)?['spain','etias']:/residen|migraciones|paraguay-visa/.test(p.path)?['migration']:['visitor','ds160','fees','embassy'];
    if(/denegada/.test(p.path)) relevant.unshift('denial');
    if(/renovacion/.test(p.path)) relevant.unshift('waiver');
    if(['service','guide','hub'].includes(p.type)) p.sources = relevant.map(k=>({...SOURCES[k],label:en?new URL(SOURCES[k].href).hostname:SOURCES[k].label}));
    if(guides[p.path]) {const a=p.sections.find(s=>s.type==='article');a.items=guides[p.path];if(p.path==='/guias/cuanto-cuesta-la-visa-americana/')a.items[0].rows=[['Solicitud B1/B2 (MRV)','Importe oficial vigente; no reembolsable'],['Otros cargos oficiales','Según categoría y nacionalidad; confirmar en la fuente oficial'],['Honorarios privados','Solicitar propuesta y alcance por escrito'],['Gastos personales','Traslado, fotos y documentos que correspondan']];p.updated='2026-09-19';}
  }
  // Remove an absolute claim everywhere, including old English content records.
  const clean = x => typeof x==='string'?x.replace(/during the interview\./g,'through the applicable official process.').replace(/únicamente el oficial consular\./g,'la autoridad competente.'):Array.isArray(x)?x.map(clean):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,clean(v)])):x;
  for(let i=0;i<PAGES.length;i++) PAGES[i]=clean(PAGES[i]);
  const privacy = (en) => [{title:en?'Information collected':'Información que recibimos',body:en?'Your phone number and any optional name, email, visa topic and message you provide. We also process the enquiry page and campaign attribution when available. Do not submit sensitive documents.':'Tu teléfono y los datos opcionales que ingreses: nombre, correo, tema y mensaje. También procesamos la página de consulta y, cuando existe, la procedencia de la campaña. No envíes documentación sensible.'},
    {title:en?'Purpose and delivery':'Finalidad y envío',body:en?'We use this information to handle your enquiry. The website forwards it to VenderCRM when configured. If delivery is interrupted, a private temporary queue holds the enquiry for retry; the response distinguishes queued from delivered enquiries. WhatsApp processes messages on its own platform.':'Usamos la información para atender tu consulta. El sitio la envía a VenderCRM cuando está configurado. Si el envío se interrumpe, una cola privada conserva temporalmente la consulta para reintentar; la respuesta distingue una consulta pendiente de una entregada. WhatsApp procesa los mensajes en su propia plataforma.'},
    {title:en?'Retention and access':'Conservación y acceso',body:en?'Pending enquiries are retained for up to 30 days in the website queue. Delivery receipts without the message are kept briefly for retry protection. Retention in the CRM or WhatsApp is separate: ask the responsible operator for its policy before sharing further information.':'Las consultas pendientes se conservan hasta 30 días en la cola del sitio. Los recibos sin el mensaje se conservan brevemente para evitar duplicaciones. La conservación en el CRM o WhatsApp es independiente: consultá su política al responsable antes de compartir más información.'},
    {title:en?'Requests about your data':'Consultas sobre tus datos',body:en?'Use the WhatsApp contact link to request access, correction or deletion, or ask who is responsible for handling your enquiry. Identify your original contact channel without sending identity documents. A transfer to a separate service provider must be explained before it takes place.':'Usá el contacto por WhatsApp para pedir acceso, corrección o eliminación, o consultar quién es responsable de atender tu consulta. Indicá el canal de contacto original sin enviar documentos de identidad. Una derivación a un prestador independiente debe explicarse antes de realizarse.',links:[{label:en?'Contact about privacy':'Consultar sobre mis datos',href:en?'/en/contact/':'/contacto/'}]},
    {title:en?'Optional measurement':'Medición opcional',body:en?'If enabled, optional analytics measure page visits and contact actions after your choice. They do not receive the text or phone number from your form. You can change your preference using the Privacy settings control.':'Si se habilita, la analítica opcional mide visitas y acciones de contacto después de tu elección. No recibe el texto ni el teléfono del formulario. Podés cambiar tu preferencia con el control Preferencias de privacidad.'}];
  get('/privacidad/').sections=[{type:'prose',items:privacy(false)}];
  get('/privacidad/').alternates=[{lang:'es',path:'/privacidad/'},{lang:'en',path:'/en/privacy/'},{lang:'x-default',path:'/privacidad/'}];
  PAGES.push({type:'simple',path:'/en/privacy/',lang:'en',label:'Privacy',title:'Privacy of your enquiry | visas.com.py',description:'How visas.com.py handles enquiry information, delivery, retention and requests about your data.',hero:{eyebrow:'Your information',title:'Privacy of your enquiry.',lead:'Understand what you share and how to ask about it.'},sections:[{type:'prose',items:privacy(true)}],alternates:get('/privacidad/').alternates});
  LANGUAGE_PAIRS.push(['/privacidad/','/en/privacy/']);
  // Both languages explain the onward guide; existing useful Spanish subtopics remain linked.
  get('/residencia-en-paraguay/').sections.unshift({type:'prose',items:[{title:'Una guía para orientarte',body:'Para explorar residencia y vida en Paraguay, podés continuar en Paraguay Residency Guide. Es un recurso informativo separado; los trámites se confirman ante Migraciones.',links:[{label:'Visitar Paraguay Residency Guide',href:'https://paraguayresidencyguide.com/',rel:'noopener'}]}]});
  applyInformationStage(PAGES);

}
