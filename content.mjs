import { applyEditorial } from './editorial.mjs';
import feesBooking from './guides-extra/fees-booking.mjs';
import travelNoVisa from './guides-extra/travel-no-visa.mjs';
import canadaEstaScams from './guides-extra/canada-esta-scams.mjs';
import segments from './guides-extra/segments.mjs';
import longtailA from './guides-extra/longtail-a.mjs';
import longtailB from './guides-extra/longtail-b.mjs';
import longtailC from './guides-extra/longtail-c.mjs';
import glossaryHub from './guides-extra/glossary-hub.mjs';
import faqExtra from './guides-extra/faq-extra.mjs';
export const ANALYTICS_ID = '';
export const CONTACT_FORM_ENABLED = process.env.VISAS_CONTACT_FORM === '1';
export const WA_MENU = [
  ['turista', 'Visa de turista EE.UU. primera vez'],
  ['renovacion', 'Renovar mi visa americana'],
  ['estudiante', 'Visa de estudiante o Work and Travel'],
  ['denegada', 'Me negaron la visa'],
  ['otro-destino', 'Otro destino (Canadá, España, Australia)'],
  ['paraguay', 'Residencia o visa para entrar a Paraguay'],
  ['otra', 'Otra consulta'],
].map(([id, label]) => ({ id, label, text: context => `Hola! Mi consulta: ${label}. ¿Qué necesito para empezar?` }));
export const SITE = 'https://visas.com.py';
export const WA_NUMBER = '595995628862';
export const DISCLAIMER = 'visas.com.py es un sitio privado e independiente de información sobre visas. No estamos afiliados a la Embajada de los Estados Unidos ni a ningún gobierno. La decisión sobre cada visa la toma la autoridad competente. Ningún resultado está asegurado ni prometido.';

export const SERVICES = [
  { icon: 'passport', href: '/visa-americana/turista/', eyebrow: 'Estados Unidos · B1/B2', title: 'Visa de turista', body: 'Tu primer trámite, con el formulario y el motivo de viaje bien claros.', tag: 'Primera vez' },
  { icon: 'refresh', href: '/visa-americana/renovacion/', eyebrow: 'Estados Unidos', title: 'Renovación de visa', body: 'Revisamos tu visa anterior y orientamos el nuevo trámite según tu caso.', tag: 'Renovación' },
  { icon: 'graduation-cap', href: '/visa-americana/estudiante/', eyebrow: 'Estados Unidos · F-1 / J-1', title: 'Visa de estudiante', body: 'Ordenamos la preparación de tu solicitud para estudiar o hacer un intercambio.', tag: 'Estudiante' },
  { icon: 'briefcase', href: '/visa-americana/trabajo/', eyebrow: 'Estados Unidos', title: 'Visa de trabajo', body: 'Orientación para preparar la etapa consular de tu proyecto laboral.', tag: 'Trabajo' },
  { icon: 'chat-bubbles', href: '/visa-americana/entrevista/', eyebrow: 'Preparación consular', title: 'Preguntas de la entrevista', body: 'Practicá cómo explicar tu viaje con claridad, sin memorizar un personaje.', tag: 'Entrevista' },
  { icon: 'document-alert', href: '/visa-americana/denegada/', eyebrow: 'Revisión del caso', title: 'Visa denegada', body: 'Revisamos qué pasó y qué cambió antes de pensar en otra solicitud.', tag: 'Nueva solicitud' },
  { icon: 'maple-leaf', href: '/visa-canada/', eyebrow: 'Canadá', title: 'Visa para Canadá', body: 'Contanos tu plan de visita o estudio y ordenamos la documentación con vos.', tag: 'Canadá' },
  { icon: 'house', href: '/residencia-en-paraguay/', eyebrow: 'Paraguay', title: 'Residencia en Paraguay', body: 'Un punto de partida para extranjeros que quieren establecerse en el país.', tag: 'Residencia' },
];
export const NAV = [
  { label: 'Visa americana', href: '/visa-americana/', children: SERVICES.slice(0, 6).map(s => ({ label: s.title, href: s.href })) },
  { label: 'Canadá', href: '/visa-canada/' },
  { label: 'Residencia en Paraguay', href: '/residencia-en-paraguay/' },
  { label: 'Guías', href: '/guias/' }, { label: 'Contacto', href: '/contacto/' },
];
export const FOOTER = [
  { title: 'Servicios', links: NAV.slice(0, 4) },
  { title: 'Guías', links: [
    { label: 'Requisitos para tu visa', href: '/guias/requisitos-visa-americana-paraguay/' },
    { label: 'Cómo llenar el DS-160', href: '/guias/como-llenar-el-ds-160/' },
    { label: 'Prepará tu entrevista', href: '/guias/preguntas-entrevista-visa-americana/' },
    { label: 'Después de una negativa', href: '/guias/visa-americana-denegada-214b/' },
  ] },
  { title: 'Empresa', links: [{ label: 'Nosotros', href: '/nosotros/' }, { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes/' }, { label: 'Privacidad', href: '/privacidad/' }] },
  { title: 'Contacto', links: [{ label: 'Dejanos tu consulta', href: '/contacto/' }], whatsapp: true, note: 'Asunción, Paraguay. Respondemos en horario de oficina, lun-vie.' },
];
export const VISA_OPTIONS = ['Turista EE.UU.', 'Renovación EE.UU.', 'Estudiante o Work and Travel', 'Trabajo EE.UU.', 'Canadá', 'España', 'Australia', 'Residencia en Paraguay', 'Visa para entrar a Paraguay', 'Otro'];
export const ROUTE_STEPS = [
  { title: 'Evaluación', body: 'Conversamos sobre tu viaje y tu situación.' },
  { title: 'DS-160', body: 'Completamos y revisamos tus datos con vos.' },
  { title: 'Arancel y cita', body: 'Te acompañamos en el sistema oficial.' },
  { title: 'Simulacro', body: 'Practicamos respuestas claras y sinceras.' },
  { title: 'Entrevista', body: 'Llegás con tu preparación y tus documentos.' },
];
const homeFaq = [
  { question: '¿Ustedes deciden si me dan la visa?', answer: 'No. Somos una asesoría privada e independiente. La decisión sobre la solicitud corresponde a la autoridad consular.  Nuestro trabajo es ayudarte a preparar tu solicitud con información clara y verdadera.' },
  { question: '¿Me ayudan a completar el DS-160?', answer: 'Sí, lo completamos con vos y revisamos la información antes de enviarlo. El formulario DS-160 se completa en línea, en inglés, antes de agendar la cita. Necesitamos que confirmes tus datos y antecedentes.' },
  { question: '¿Dónde se hace la entrevista?', answer: 'La entrevista se realiza en la Embajada de los Estados Unidos en Asunción. En el simulacro practicamos cómo explicar tu motivo de viaje y tu situación sin aprender respuestas de memoria.' },
  { question: '¿Pueden ayudarme si ya me negaron la visa?', answer: 'Sí. Empezamos por revisar tu solicitud anterior, la información que presentaste y los cambios en tu situación. Repetir el trámite sin revisar el caso no asegura un resultado diferente.' },
  { question: '¿Cómo empiezo y dónde pago el arancel?', answer: 'Escribinos por WhatsApp o dejanos tu número para conversar sobre tu caso. El pago del arancel y la cita se gestionan a través del sistema oficial de citas (ais.usvisa-info.com). Para el arancel, consultá el monto vigente.' },
];
export const CTA = { type: 'cta', title: 'Contanos tu caso hoy.', body: 'Un viaje empieza con una idea. Tu preparación, con una conversación.', label: 'Evaluar mi caso por WhatsApp' };

export const FACTS = {
  F1: 'El formulario DS-160 se completa en línea, en inglés, antes de agendar la cita.',
  F2: 'La entrevista se realiza en la Embajada de los Estados Unidos en Asunción.',
  F3: 'El arancel de solicitud (MRV) para visas B1/B2 es de USD 185 y no se devuelve, se apruebe o no la visa.',
  F4: 'El pago del arancel y la cita se gestionan a través del sistema oficial de citas (ais.usvisa-info.com).',
  F5: 'La decisión sobre la solicitud corresponde a la autoridad consular. ',
  F6: 'Una negativa bajo 214(b) puede indicar que no se demostró la elegibilidad para la categoría solicitada o que no se superó la presunción de intención inmigratoria. Una nueva solicitud requiere un nuevo arancel; revisá primero el motivo y los cambios de tu caso.',
  F7: 'Para renovar, algunos solicitantes califican para el trámite sin entrevista (interview waiver) según reglas vigentes de la embajada.',
  F9: 'Ciudadanos paraguayos NO necesitan visa para turismo en México, el espacio Schengen ni el Reino Unido.',
};
export const DISCLAIMER_EN = 'visas.com.py is a private, independent information website about visas. We are not affiliated with any embassy or government. Visa and entry decisions are made solely by the consular or migration authority. No outcome is assured or promised.';
const items = pairs => pairs.map(([title, body]) => ({ title, body }));
const questions = pairs => pairs.map(([question, answer]) => ({ question, answer }));
// These helpers only shape records. Each service supplies its own editorial copy.
function service(d) {
  const en = d.lang === 'en';
  return {
    type: d.type || 'service', path: d.path, lang: d.lang || 'es', label: d.label,
    waContext: d.label, title: d.title, description: d.description, alternates: d.alternates,
    breadcrumbs: d.path.startsWith('/visa-americana/') && d.path !== '/visa-americana/'
      ? [{ label: 'Visa americana', href: '/visa-americana/' }, { label: d.label, href: d.path }] : undefined,
    hero: { eyebrow: d.eyebrow, title: d.h1, lead: d.lead, primary: en ? 'Discuss my case on WhatsApp' : 'Evaluar mi caso por WhatsApp' },
    sections: [
      ...(d.before || []),
      { type: 'bullets', title: en ? 'Who this is for' : 'Para quién es', items: d.audience },
      { type: 'checklist', tone: 'paper-2', title: en ? 'How we help you' : 'Qué hacemos por vos', items: items(d.help) },
      { type: 'route', title: en ? 'How the process works' : 'Cómo es el proceso', items: items(d.steps) },
      { type: 'cards', tone: 'paper-2', title: en ? 'Where preparation can go wrong' : 'Lo que suele salir mal', items: items(d.mistakes) },
      ...(d.extra || []),
      { type: 'faq', title: en ? 'Questions about this service' : 'Preguntas sobre este servicio', items: questions(d.faq) },
      en ? { type: 'cta', title: 'Tell us about your travel plans.', body: 'Start with your nationality, where you live and your destination. We will clarify what preparation you need.', label: 'Discuss my visa enquiry' } : CTA,
    ],
  };
}

// A page is a record; ordered section records use the shared block renderers.
export const PAGES = [
  {
    type: 'home', path: '/', label: 'Inicio', waContext: 'inicio · visa americana en Paraguay',
    title: 'Visa americana desde Paraguay: asesoría para Estados Unidos',
    description: 'Prepará tu visa americana desde Paraguay: revisión del DS-160, cita y simulacro de entrevista. Contanos tu caso por WhatsApp.',
    hero: { eyebrow: 'Asesoría de visas · Paraguay', title: 'Tu visa americana, sin improvisar.', lead: 'Te acompañamos en todo el trámite: evaluamos tu caso, completamos el DS-160 con vos, agendamos la cita y practicamos la entrevista hasta que llegues seguro a la ventanilla.', primary: 'Evaluar mi caso por WhatsApp', secondary: { label: 'Ver cómo trabajamos', href: '#ruta' }, chips: ['DS-160 revisado', 'Preguntas de la entrevista', 'Preparación con vos'], ticket: true },
    sections: [
      { type: 'services', id: 'servicios', eyebrow: 'Elegí tu próximo paso', title: 'Distintos planes. Una preparación a tu medida.', body: 'Sea tu primer viaje o un nuevo comienzo, empezamos por entender tu caso.', items: SERVICES },
      { type: 'route', id: 'ruta', tone: 'paper-2', eyebrow: 'Cómo trabajamos', title: 'Del «quiero viajar» a tu entrevista.', body: 'Este es el recorrido de preparación para una primera solicitud de visa americana.', items: ROUTE_STEPS },
      { type: 'checklist', eyebrow: 'Antes de tu cita', title: 'Lo que revisamos antes de tu cita', body: 'Tu historia tiene que ser la misma en el formulario, en tus documentos y cuando la contás.', items: [
        { label: 'Tu información', title: 'Datos que coinciden', body: 'Nombre, pasaporte, antecedentes y datos del formulario: revisamos que no haya contradicciones ni campos completados por apuro.' },
        { label: 'Tu viaje', title: 'Un motivo claro', body: 'Conversamos sobre tu plan y cómo lo vas a explicar. Trabajamos con tu situación real, sin inventar una historia para la entrevista.' },
        { label: 'Tu preparación', title: 'Documentos y respuestas', body: 'Ordenamos lo que vas a presentar y practicamos cómo responder con claridad. Si algo no se entiende, lo revisamos con vos.' },
      ] },
      { type: 'cards', tone: 'paper-2', eyebrow: 'Lo que suele salir mal', title: 'Errores de preparación que podemos ayudarte a evitar', body: 'Un rechazo no siempre se explica por un error. La decisión es consular. Estos son problemas de preparación que sí podemos trabajar con vos.', items: [
        { title: 'Documentos inconsistentes', body: 'Un dato en el formulario y otro en los documentos deja preguntas abiertas. Revisamos la información en conjunto antes de la cita.' },
        { title: 'DS-160 con errores', body: 'Copiar respuestas o completar campos sin entenderlos puede desordenar tu solicitud. Lo leemos con vos y confirmamos cada dato.' },
        { title: 'Respuestas ensayadas', body: 'Memorizar lo que le funcionó a otra persona no explica tu caso. El simulacro te ayuda a contar tu propia situación con naturalidad.' },
      ] },
      { type: 'teaser', eyebrow: 'Un nuevo comienzo', title: '¿Tu próximo destino es Paraguay?', body: 'Si sos extranjero y querés establecerte en Paraguay, contanos de dónde venís y cuál es tu proyecto. Te orientamos para empezar a ordenar tu trámite de residencia.', links: [{ label: 'Residencia en Paraguay', href: '/residencia-en-paraguay/' }, { label: 'Read about residency in English', href: '/en/residency-in-paraguay/', lang: 'en' }] },
      { type: 'faq', tone: 'paper-2', eyebrow: 'Antes de escribirnos', title: 'Preguntas que vale la pena hacer.', items: homeFaq },
      CTA,
    ],
  },
  {
    type: 'simple', path: '/contacto/', label: 'Contacto', waContext: 'contacto',
    title: 'Contacto para asesoría de visas | visas.com.py', description: 'Contanos qué visa necesitás. Dejanos tu número o escribinos por WhatsApp para conversar sobre tu caso desde Paraguay.',
    hero: { eyebrow: 'Empecemos por tu caso', title: 'Contanos adónde querés ir.', lead: 'No hace falta que tengas todo resuelto. Dejanos tu consulta y un número para conversar. Respondemos en horario de oficina, lun-vie.' },
    sections: [{ type: 'contact', title: 'Tu consulta', body: 'El teléfono es el único dato obligatorio.', alternative: '¿Preferís escribirnos directamente?', alternativeBody: 'Abrí WhatsApp y contanos qué viaje tenés en mente.' }],
  },
  {
    type: 'simple', path: '/privacidad/', label: 'Privacidad', waContext: 'privacidad',
    title: 'Privacidad de tu consulta | visas.com.py', description: 'Conocé cómo usamos los datos que compartís con visas.com.py para responder tu consulta sobre visas y residencia.',
    hero: { eyebrow: 'Tu información', title: 'Privacidad de tu consulta.', lead: 'Usamos los datos que compartís para responder tu consulta y darle seguimiento.' },
    sections: [{ type: 'prose', items: [
      { title: 'Qué información recibimos', body: 'Recibimos tu teléfono y los datos que elijas completar: nombre, correo, tipo de visa y mensaje. También recibimos la dirección de la página desde la que consultás y la información de procedencia de tu visita cuando está disponible.' },
      { title: 'Para qué la usamos', body: 'Usamos esa información únicamente para atender tu consulta y coordinar la conversación con vos. El formulario se procesa mediante nuestro sistema de gestión de consultas. Si elegís WhatsApp, tu mensaje se procesa también en esa plataforma.' },
      { title: 'Qué conviene compartir', body: 'Para esta primera conversación, contanos tu consulta de forma general. No envíes contraseñas, datos de pago ni copias de documentos sensibles por este formulario.' },
      { title: 'Consultas sobre tus datos', body: 'Podés contactarnos para pedir que revisemos, corrijamos o eliminemos la información de tu consulta.', links: [{ label: 'Contactanos', href: '/contacto/' }] },
    ] }],
  },
  {
    type: 'simple', path: '/gracias.html', label: 'Gracias', waContext: 'gracias por tu consulta', sitemap: false,
    title: 'Gracias por tu consulta | visas.com.py', description: 'Gracias por contactarnos. Podés continuar tu consulta de visa por WhatsApp o volver al inicio.',
    hero: { eyebrow: 'Consulta enviada', title: 'Gracias por contarnos tu plan.', lead: 'Vamos a revisar tu consulta. Respondemos en horario de oficina, lun-vie. Si querés agregar algo, podés seguir la conversación por WhatsApp.', primary: 'Seguir por WhatsApp', secondary: { label: 'Volver al inicio', href: '/' } }, sections: [],
  },
  {
    type: 'simple', path: '/404.html', label: 'Página no encontrada', waContext: 'página no encontrada', sitemap: false,
    title: 'Página no encontrada | visas.com.py', description: 'No encontramos esta página. Volvé al inicio o escribinos por WhatsApp para orientarte sobre tu consulta de visa.',
    hero: { eyebrow: 'Fuera de ruta', title: 'Esta página no está en el itinerario.', lead: 'El enlace puede haber cambiado o estar incompleto. Volvé al inicio para encontrar tu próximo paso, o contanos qué necesitás.', primary: 'Consultar por WhatsApp', secondary: { label: 'Volver al inicio', href: '/' } }, sections: [],
  },
];

export const INTERVIEW_QUESTIONS = [
  '¿Cuál es el motivo de tu viaje?', '¿Qué lugares pensás visitar?',
  '¿Dónde pensás alojarte?', '¿Con quién vas a viajar?',
  '¿Quién va a pagar el viaje?', '¿A qué te dedicás en Paraguay?',
  '¿Qué estudiás actualmente?', '¿Tenés familiares en Estados Unidos?',
  '¿Viajaste antes al exterior?', '¿Qué planes tenés al regresar a Paraguay?',
];

PAGES.push(
  service({
    path: '/visa-canada/', label: 'Visa para Canadá', eyebrow: 'Canadá · Visita y estudios',
    title: 'Visa Canadá desde Paraguay | Asesoría',
    description: 'Ordená tu solicitud para Canadá desde Paraguay. Orientación para visita o estudios, documentos, solicitud en línea y biometría según tu caso.',
    h1: 'Visa para Canadá desde Paraguay: ordená tu solicitud',
    lead: 'Un viaje de visita y un proyecto de estudios necesitan una preparación distinta. Te ayudamos a identificar tu propósito, ordenar documentos y entender las instrucciones de la solicitud canadiense sin trasladar reglas del trámite estadounidense.',
    audience: [
      'Querés visitar Canadá y buscás orientación sobre la preparación de una visa de visitante, conocida como TRV, con información coherente sobre el viaje y su financiación.',
      'Estás organizando estudios y necesitás distinguir la documentación de la institución de la preparación de una solicitud de permiso de estudios.',
      'Ya abriste una solicitud en línea, pero tenés dudas sobre documentos, respuestas o instrucciones de biometría y preferís revisar el conjunto antes de continuar.',
    ],
    help: [
      ['Definir el propósito', 'Conversamos sobre la actividad que querés realizar y lo que ya organizaste. No presentamos un proyecto de estudios como una simple visita para simplificar la conversación.'],
      ['Ordenar la documentación', 'Revisamos identidad, antecedentes y respaldos del propósito de viaje según las instrucciones aplicables. Armamos una lista de pendientes propia de tu caso, no una carpeta universal.'],
      ['Revisar la financiación', 'Trabajamos cómo explicar los recursos del viaje o del proyecto académico. Si recibís ayuda, diferenciamos quién aporta y qué documentación permite entender esa relación.'],
      ['Preparar la solicitud en línea', 'Te acompañamos en la lectura y preparación de la información para el sistema oficial canadiense. Revisás lo que se declara y conservás el control de tu participación.'],
      ['Entender la biometría', 'Si el trámite indica aportar biometría, te ayudamos a leer las instrucciones y a distinguirlas de la carga de documentos. No anticipamos condiciones que deban confirmarse oficialmente.'],
      ['Revisar comunicaciones', 'Ordenamos los mensajes y pedidos relacionados con la preparación de tu solicitud. Una confirmación de carga no se presenta como una decisión sobre el permiso o la visa.'],
    ],
    steps: [
      ['Plan', 'Nos contás si viajás de visita o para estudiar, y qué información recibiste hasta ahora.'],
      ['Requisitos', 'Revisamos las instrucciones oficiales correspondientes y diferenciamos documentos disponibles de información que todavía falta.'],
      ['Solicitud', 'Preparamos los datos con vos y comprobamos que los archivos y respuestas cuenten la misma situación.'],
      ['Indicaciones', 'Te orientamos sobre los pasos que comunique el sistema, incluida la biometría cuando corresponda.'],
      ['Seguimiento', 'Leemos las comunicaciones del trámite y aclaramos qué requieren, sin confundir una actualización con un resultado favorable.'],
    ],
    mistakes: [
      ['Usar la lista de Estados Unidos', 'Canadá tiene su propio proceso. El DS-160 y la preparación consular estadounidense no sirven como instrucciones para una solicitud canadiense.'],
      ['Subir archivos sin revisarlos', 'Un archivo legible puede contener un nombre distinto o información incompleta. Revisamos el contenido y su relación con lo declarado, además de su presentación.'],
      ['Confundir visita y estudios', 'El propósito real importa desde el principio. Si tu plan cambió, revisamos qué orientación necesitás antes de seguir preparando una solicitud con otro motivo.'],
    ],
    faq: [
      ['¿Preparan visitas y permisos de estudios?', 'Podemos orientar la preparación documental de ambos proyectos. Primero necesitamos conocer tu propósito y la etapa en la que estás para definir el alcance del acompañamiento.'],
      ['¿Se usa el DS-160 para Canadá?', 'No. Ese formulario corresponde al trámite estadounidense que explicamos en otras páginas. Para Canadá trabajamos con las instrucciones de su sistema oficial y el tipo de solicitud correspondiente.'],
      ['¿Me van a pedir biometría?', 'Revisamos la indicación que corresponda a tu solicitud; no damos una respuesta universal. Si recibís una comunicación, te ayudamos a entender qué pide antes de coordinar el siguiente paso.'],
      ['¿La asesoría toma alguna decisión migratoria?', `No. La autoridad canadiense evalúa el trámite. Para distinguirlo de nuestro servicio estadounidense, allí rige esta advertencia: ${FACTS.F5} Ninguna de esas decisiones depende de nuestra asesoría.`],
    ],
  }),
  service({
    path: '/residencia-en-paraguay/', label: 'Residencia en Paraguay', eyebrow: 'Paraguay · Prepará tu mudanza',
    title: 'Residencia en Paraguay para extranjeros | Asesoría',
    description: 'Prepará tu residencia en Paraguay: orientación documental, citas y coordinación de traducciones según tu caso. Atención también en inglés.',
    h1: 'Residencia en Paraguay para extranjeros: empezá con orden',
    lead: 'Mudarte implica decisiones personales y documentación que puede venir de distintos países. Te ayudamos a organizar la preparación de tu residencia, identificar pendientes y separar lo que podés resolver antes del viaje de lo que requiere instrucciones locales.',
    audience: [
      'Vivís en el exterior y querés establecerte en Paraguay, pero todavía no sabés qué documentos consultar en tu país antes de organizar la mudanza.',
      'Ya estás en Paraguay y buscás ordenar tu situación documental, entender las consultas pendientes y preparar el siguiente paso ante la autoridad migratoria.',
      'Te mudás con tu familia y necesitás distinguir los documentos y circunstancias de cada integrante, sin asumir que todos siguen exactamente el mismo recorrido.',
    ],
    help: [
      ['Entender tu situación', 'Conversamos sobre nacionalidad, país de residencia, documentos disponibles y proyecto de vida. Esa información permite orientar las preguntas iniciales sin prometer una categoría por adelantado.'],
      ['Ordenar los documentos', 'Armamos con vos un inventario: qué tenés, quién lo emitió y qué dato falta confirmar. Evitamos pedir documentos por costumbre sin revisar su función en el trámite.'],
      ['Consultar formalidades', 'Identificamos qué consultas hacer sobre apostillas, legalizaciones o traducciones según el documento y su origen. Antes de encargar gestiones, confirmamos las instrucciones aplicables a tu situación.'],
      ['Coordinar traducciones', 'Si necesitás traducciones mediante colaboradores, primero confirmamos disponibilidad, alcance y quién realiza el trabajo. No damos por contratado un servicio externo ni asumimos que cualquier traducción será aceptada.'],
      ['Preparar citas', 'Te orientamos para organizar las gestiones y las instrucciones de presentación que correspondan. Distinguimos tu preparación de la disponibilidad y de las decisiones de la autoridad.'],
      ['Dar contexto', 'Te ayudamos a distinguir residencia temporal y permanente como caminos que requieren revisar tu caso. El trámite se realiza ante la Dirección Nacional de Migraciones, no ante nuestra asesoría.'],
    ],
    steps: [
      ['Conversación', 'Contanos desde dónde consultás, tu nacionalidad y si ya estás en Paraguay o planificás viajar.'],
      ['Inventario', 'Revisamos los documentos que tenés y anotamos los pendientes de cada integrante de tu familia.'],
      ['Consultas', 'Ordenamos las dudas sobre documentos y formalidades antes de que encargues nuevas gestiones.'],
      ['Coordinación', 'Preparamos el orden de las citas y los apoyos externos que hayas aceptado, sujetos a confirmación.'],
      ['Presentación', 'Repasamos lo preparado y las instrucciones recibidas. La autoridad migratoria conserva la evaluación de tu solicitud.'],
    ],
    mistakes: [
      ['Usar la carpeta de otra persona', 'Una experiencia puede orientar preguntas, pero no define tus requisitos. Nacionalidad, documentos y situación familiar deben revisarse por separado.'],
      ['Encargar documentos sin consultar', 'Antes de pagar por una gestión o traducción, verificá qué documento necesitás y cómo debe presentarse. Un formato incorrecto puede obligarte a reorganizar la preparación.'],
      ['Confundir residencia con otros trámites', 'No presentamos la residencia como ciudadanía ni como una solución automática para asuntos fiscales o bancarios. Esas decisiones requieren su propia información y revisión.'],
    ],
    extra: [{ type: 'prose', items: [{ title: 'Información para planificar tu llegada', body: 'Podés empezar por la marca informativa Paraguay Residency Guide y contrastar las instrucciones del trámite con Migraciones. Una guía ayuda a formular preguntas; no sustituye la revisión individual.', links: [{ label: 'Paraguay Residency Guide', href: 'https://paraguayresidencyguide.com/' }, { label: 'Leer esta página en inglés', href: '/en/residency-in-paraguay/', lang: 'en' }] }] }],
    faq: [
      ['¿Puedo consultar antes de llegar?', 'Sí. Empezar desde el exterior permite organizar preguntas sobre los documentos que ya tenés y los que podrías necesitar obtener en tu país, antes de coordinar la mudanza.'],
      ['¿Temporal y permanente se eligen libremente?', 'No presentamos esas alternativas como opciones intercambiables. La orientación empieza por tu situación y por las instrucciones de Migraciones que correspondan al camino que estés evaluando.'],
      ['¿Quién realiza las traducciones?', 'Cuando haga falta apoyo externo, confirmamos quién lo prestará y el alcance antes de coordinarlo con vos. La primera consulta no implica que una traducción esté incluida o contratada.'],
      ['¿Ustedes deciden mi residencia?', `No, la residencia se tramita ante Migraciones. Nuestro aviso sobre visas estadounidenses corresponde a otro servicio: ${FACTS.F5} Esa frase no describe una decisión de residencia paraguaya.`],
    ],
  }),
);

PAGES.push(
  service({
    path: '/visa-americana/turista/', label: 'Visa de turista', eyebrow: 'Estados Unidos · B1/B2',
    title: 'Visa de turista Estados Unidos: requisitos | Paraguay',
    description: 'Revisá los requisitos de tu visa de turista para Estados Unidos. Preparamos el DS-160 y la entrevista con vos desde Paraguay.',
    h1: 'Visa de turista para Estados Unidos: requisitos y preparación',
    lead: 'Si tu primer trámite te genera dudas, empecemos por tu viaje real y por cómo lo vas a sostener. Te ayudamos a ordenar la solicitud B1/B2, revisar tus datos y explicar tu situación sin inventar respuestas.',
    audience: [
      'Querés viajar por turismo y necesitás entender qué información reunir antes de completar el formulario, aunque todavía no tengas un itinerario cerrado.',
      'Vas a visitar familiares o amistades y querés distinguir quién te recibe, quién paga y cuál es tu propio motivo para regresar a Paraguay.',
      'Ya empezaste el DS-160, pero encontraste preguntas que no entendés o datos que no coinciden con tus documentos y preferís revisarlos antes de enviarlo.',
    ],
    help: [
      ['Definir el viaje', 'Conversamos sobre el motivo, las personas que viajan con vos y el alojamiento previsto. Identificamos qué está decidido y qué sigue siendo una posibilidad.'],
      ['Revisar tu información', 'Contrastamos los datos del pasaporte con tus antecedentes, ocupación y viajes anteriores. Si falta información, la dejamos pendiente hasta que puedas confirmarla.'],
      ['Completar con vos', `${FACTS.F1} Leemos las preguntas juntos para que sepas qué estás declarando y puedas reconocer tu propia información.`],
      ['Ordenar los respaldos', 'Separamos los documentos que explican tu trabajo, estudios o financiación. No armamos una carpeta voluminosa por costumbre: buscamos consistencia y una función clara para cada respaldo.'],
      ['Orientar la cita', `${FACTS.F4} Te ayudamos a entender ese recorrido; para el arancel, consultá el monto vigente.`],
      ['Practicar respuestas', 'Hacemos un simulacro centrado en tu caso. Trabajamos respuestas breves sobre el viaje, tus recursos y tu vida en Paraguay, sin frases prestadas de otros solicitantes.'],
    ],
    steps: [
      ['Evaluación', 'Contanos qué querés hacer en Estados Unidos y si hubo solicitudes anteriores. Acordamos qué parte de la preparación necesitás.'],
      ['Formulario', 'Reunimos los datos, completamos el DS-160 y repasamos las respuestas con vos antes del envío.'],
      ['Cita', 'Revisamos las indicaciones del sistema oficial y organizamos los comprobantes que corresponda conservar para tu trámite.'],
      ['Simulacro', 'Practicamos cómo contar tu viaje y revisamos cualquier contradicción que aparezca entre tus respuestas y el formulario.'],
      ['Entrevista', `${FACTS.F2} Llevás tu preparación y atendés las indicaciones oficiales de ingreso.`],
    ],
    mistakes: [
      ['Confundir planes con reservas', 'Un plan tentativo debe explicarse como tal. No inventes alojamientos, contactos o compras para que el viaje parezca más organizado.'],
      ['Ocultar quién paga', 'Si otra persona financia el viaje, revisamos cómo describir esa ayuda. Presentarla como ingreso propio puede crear contradicciones innecesarias.'],
      ['Aprender una historia ajena', 'Una respuesta popular en internet puede no tener relación con tu vida. La preparación sirve para expresarte mejor, no para representar otro perfil.'],
    ],
    faq: [
      ['¿Necesito tener todos los documentos para consultar?', 'No. Podés empezar con una explicación de tu viaje y de lo que ya tenés. Después identificamos qué información falta y cómo conseguirla sin llenar espacios con suposiciones.'],
      ['¿Una invitación de un familiar alcanza?', 'La invitación ayuda a explicar una visita, pero no sustituye tu situación personal. Revisamos también tu ocupación, la financiación y cómo se relaciona el viaje con tus planes de regreso.'],
      ['¿Completan el formulario sin que yo participe?', 'No. Tu participación es necesaria porque los datos y antecedentes son tuyos. Te acompañamos en la preparación y pedimos que revises las respuestas antes de enviarlas.'],
      ['¿Qué resultado puedo esperar del servicio?', `Podés esperar una preparación ordenada y una revisión de coherencia. ${FACTS.F5} Contratar ayuda privada no modifica esa decisión.`],
    ],
  }),
  service({
    path: '/visa-americana/renovacion/', label: 'Renovación de visa', eyebrow: 'Estados Unidos · Nueva solicitud',
    title: 'Renovar visa americana en Paraguay | Asesoría',
    description: 'Prepará la renovación de tu visa americana en Paraguay. Revisamos tu visa anterior, los cambios en tu caso y las instrucciones oficiales.',
    h1: 'Renovar visa americana en Paraguay, con tus datos al día',
    lead: 'Haber tenido una visa no significa que el nuevo trámite se resuelva solo. Revisamos tu solicitud anterior y lo que cambió en tu vida para preparar una renovación coherente con tu situación actual.',
    audience: [
      'Tenés una visa anterior y querés entender cómo empezar otra solicitud sin asumir que el formulario viejo sigue describiendo tu trabajo, domicilio o situación familiar.',
      'Cambiaste de pasaporte o conservás documentos de distintos viajes y necesitás ordenar la información antes de entrar al sistema de citas.',
      'Escuchaste hablar de una posible exención de entrevista y querés revisar las instrucciones oficiales sin confiar en experiencias ajenas ni reglas compartidas fuera de contexto.',
    ],
    help: [
      ['Leer los antecedentes', 'Revisamos la visa anterior y lo que conservás de la solicitud. Identificamos qué datos podés comprobar y cuáles necesitás recuperar antes de completar otra declaración.'],
      ['Actualizar tu perfil', 'Conversamos sobre cambios de empleo, actividad independiente, estudios, familia y domicilio. El objetivo es describir el presente, no copiar una versión antigua de tu vida.'],
      ['Repasar los viajes', 'Ordenamos con vos los antecedentes de viaje y las dudas que surjan. No completamos fechas de memoria si tenés documentos que permiten revisarlas.'],
      ['Preparar el formulario', `${FACTS.F1} Lo completamos con información actual y revisamos los campos que puedan contradecir la solicitud anterior.`],
      ['Leer la vía indicada', `${FACTS.F7} Te orientamos sobre las instrucciones que muestre tu trámite, sin anticipar elegibilidad.`],
      ['Preparar el siguiente paso', 'Ordenamos los documentos según las instrucciones recibidas. Si te corresponde entrevista, practicamos cómo explicar tu nuevo viaje y los cambios desde la visa anterior.'],
    ],
    steps: [
      ['Antecedentes', 'Empezamos por tu visa anterior, tus pasaportes y la información que conservás de otros trámites.'],
      ['Cambios', 'Armamos una lista concreta de lo que cambió y verificamos cómo declararlo de manera consistente.'],
      ['Solicitud', 'Completamos y repasamos el formulario con vos, sin tratar una renovación como una copia automática.'],
      ['Instrucciones', 'Revisamos el sistema oficial para identificar los pasos que correspondan a tu caso particular.'],
      ['Preparación', 'Organizamos los respaldos y resolvemos dudas sobre las indicaciones recibidas antes de que continúes el trámite.'],
    ],
    mistakes: [
      ['Copiar datos desactualizados', 'Mantener el empleo anterior porque figuraba en el formulario viejo deja de describir tu situación. Revisá cada campo aunque ya lo hayas completado antes.'],
      ['Confundir una experiencia con una regla', 'El recorrido de un familiar puede ser distinto al tuyo. Una experiencia anterior no reemplaza las instrucciones vigentes que reciba tu solicitud.'],
      ['Dar por hecho el resultado', 'Una visa previa no elimina la evaluación de la nueva solicitud. Prepararte incluye revisar los cambios que puedan generar preguntas.'],
    ],
    faq: [
      ['¿Renovar significa conservar el mismo formulario?', 'No trabajamos copiando respuestas sin revisarlas. Usamos la información anterior como referencia y confirmamos tu situación actual con vos antes de preparar la nueva solicitud.'],
      ['¿Pueden decirme ahora si tendré entrevista?', 'No anticipamos esa respuesta. La posible exención depende de las reglas vigentes y de la evaluación del trámite; revisamos las instrucciones oficiales que correspondan a tu caso.'],
      ['¿Qué hago si perdí la información anterior?', 'Contanos qué documentos conservás y qué datos no recordás. Empezamos por recuperar información comprobable; no reemplazamos antecedentes faltantes con respuestas que parezcan convenientes.'],
      ['¿La visa anterior asegura otra visa?', `No. Cada solicitud tiene su propia evaluación. Para los casos que pasan por entrevista: ${FACTS.F5} Nuestro servicio prepara tu información, sin prometer el resultado.`],
    ],
  }),
  service({
    path: '/visa-americana/estudiante/', label: 'Visa de estudiante', eyebrow: 'Estados Unidos · F-1 / J-1',
    title: 'Visa de estudiante Estados Unidos | Paraguay',
    description: 'Prepará tu visa de estudiante para Estados Unidos. Orientación F-1 y J-1, revisión de documentos y práctica de entrevista desde Paraguay.',
    h1: 'Visa de estudiante para Estados Unidos: prepará tu proyecto',
    lead: 'La admisión a un programa y la preparación de la visa son partes distintas de tu proyecto. Te ayudamos a conectar la información de la institución, tu financiación y tus planes personales en una solicitud que puedas explicar.',
    audience: [
      'Querés estudiar en una universidad o en un programa de inglés y necesitás ordenar la preparación consular vinculada a una solicitud F-1.',
      'Estás organizando un intercambio J-1, como Work and Travel o au pair, y ya conversás con una entidad que coordina el programa.',
      'Recibiste documentación de la institución o del patrocinador, pero encontraste diferencias en tus datos o dudas sobre cómo reflejar tu proyecto en la solicitud.',
    ],
    help: [
      ['Ubicar la categoría', 'Conversamos sobre el programa concreto y la documentación que te entregaron. No elegimos una categoría por su nombre comercial ni por el trámite de otra persona.'],
      ['Revisar los documentos del programa', 'El I-20 o el DS-2019 proviene de la institución o del patrocinador correspondiente. Revisamos tus datos; si hay un error, identificamos qué consultar con quien lo emitió.'],
      ['Explicar la financiación', 'Ordenamos cómo se cubre el proyecto y quién aporta los recursos. Buscamos que tu explicación coincida con la información y los respaldos que realmente tenés.'],
      ['Preparar el DS-160', `${FACTS.F1} Trabajamos con vos para relacionar tus antecedentes académicos, tu ocupación y el propósito del programa.`],
      ['Separar responsabilidades', 'Te ayudamos a distinguir consultas sobre la visa de preguntas que debe responder la institución. No emitimos documentos académicos ni sustituimos al patrocinador del intercambio.'],
      ['Practicar la entrevista', 'Ensayamos cómo explicar por qué elegiste ese programa, cómo se conecta con tus estudios o trabajo y qué planes tenés después, sin inventar un recorrido profesional.'],
    ],
    steps: [
      ['Proyecto', 'Nos contás qué vas a estudiar o qué intercambio preparás, y en qué etapa está tu conversación con la entidad.'],
      ['Documentos', 'Revisamos los datos del programa y anotamos las consultas pendientes para la institución o el patrocinador.'],
      ['Solicitud', 'Ordenamos tu información personal y completamos el formulario con tu participación y revisión.'],
      ['Coherencia', 'Contrastamos programa, financiación y antecedentes para identificar preguntas que todavía no podés responder con claridad.'],
      ['Simulacro', 'Practicamos una explicación natural de tu proyecto y repasamos las instrucciones oficiales para la etapa consular.'],
    ],
    mistakes: [
      ['Confundir admisión con visa', 'Recibir una aceptación académica no resuelve la evaluación consular. Separá los documentos del programa de la decisión sobre la solicitud.'],
      ['No conocer el programa', 'Repetir el nombre de una institución sin poder explicar qué vas a hacer deja tu proyecto incompleto. Revisá la información que te entregaron.'],
      ['Financiación poco clara', 'Decir que alguien paga sin entender qué cubre esa ayuda puede generar contradicciones. Ordenamos esa conversación antes de practicar respuestas.'],
    ],
    faq: [
      ['¿Ustedes consiguen la admisión?', 'Nuestro trabajo se concentra en la preparación de la visa. La admisión y los documentos del programa se coordinan con la institución o el patrocinador, según el proyecto que estés organizando.'],
      ['¿Work and Travel y un curso universitario son iguales?', 'No los tratamos como el mismo proyecto. Revisamos la categoría y los documentos del programa específico para preparar la solicitud correspondiente sin mezclar información de experiencias distintas.'],
      ['¿Qué hago si hay un error en el I-20 o DS-2019?', 'Señalamos la diferencia y te ayudamos a formular la consulta para quien emitió el documento. No alteramos ese documento ni completamos el formulario ignorando la inconsistencia.'],
      ['¿Una buena institución asegura la decisión?', `${FACTS.F5} La preparación ayuda a explicar el proyecto, pero no sustituye esa evaluación. Trabajamos con tus antecedentes reales y con la documentación emitida para tu programa.`],
    ],
  }),
);

PAGES.push(
  service({
    path: '/visa-americana/trabajo/', label: 'Visa de trabajo', eyebrow: 'Estados Unidos · Orientación consular',
    title: 'Visa de trabajo Estados Unidos | Orientación',
    description: 'Orientación sobre la etapa consular de visas de trabajo para Estados Unidos. Revisamos tu caso y la documentación del empleador con vos.',
    h1: 'Visa de trabajo para Estados Unidos: ubicá tu próximo paso',
    lead: 'Una oferta laboral y una visa de trabajo no son lo mismo. Te orientamos para entender en qué etapa está tu proyecto con el empleador y qué información necesitás ordenar antes de preparar la parte consular.',
    audience: [
      'Tenés contacto con un empleador estadounidense y querés distinguir una conversación laboral de la documentación que respalda un trámite migratorio concreto.',
      'Te hablaron de H-2B o H-1B y necesitás ubicar qué parte depende del empleador, qué información te corresponde aportar y qué consultas siguen pendientes.',
      'Tu proyecto ya avanzó y buscás apoyo para revisar los datos de la solicitud, los documentos recibidos y la explicación de tu función en la entrevista.',
    ],
    help: [
      ['Entender la propuesta', 'Conversamos sobre la empresa, el puesto y lo que te comunicaron. Si solo existe una promesa verbal, lo dejamos claro antes de hablar de preparación consular.'],
      ['Ubicar la petición', 'Las categorías laborales H-2B y H-1B requieren una petición de un empleador estadounidense. Revisamos qué documentación recibiste y qué etapa informa, sin sustituir la gestión del empleador.'],
      ['Separar las consultas', 'Armamos con vos las preguntas que debe responder la empresa o quien lleva la petición. No interpretamos un mensaje comercial como confirmación de un trámite oficial.'],
      ['Revisar tu perfil', 'Ordenamos tus antecedentes de trabajo y estudios para que describan tu experiencia real. No adaptamos títulos ni funciones para aparentar requisitos que no podés respaldar.'],
      ['Preparar la solicitud', 'Cuando corresponda avanzar, revisamos los datos de la etapa consular con vos y los contrastamos con los documentos disponibles. Las diferencias se aclaran antes de continuar.'],
      ['Practicar tu explicación', 'Ensayamos cómo contar qué trabajo vas a hacer, quién te emplea y qué antecedentes tenés. El simulacro parte del puesto real, sin fabricar una trayectoria.'],
    ],
    steps: [
      ['Situación', 'Contanos qué propuesta recibiste y si hay documentación formal del empleador vinculada al trámite.'],
      ['Etapa', 'Diferenciamos la gestión del empleador de la preparación que podemos realizar con vos para la solicitud consular.'],
      ['Pendientes', 'Identificamos documentos faltantes y preguntas que deben resolverse con quienes intervienen en la petición.'],
      ['Preparación', 'Ordenamos tus antecedentes y revisamos la coherencia entre el puesto, tus datos y los documentos recibidos.'],
      ['Entrevista', 'Practicamos cómo explicar el proyecto laboral y repasamos las instrucciones oficiales aplicables a tu solicitud.'],
    ],
    mistakes: [
      ['Comprar una promesa de empleo', 'No confundas un anuncio con una contratación o una petición. Antes de avanzar, identificá quién ofrece el puesto y qué documentación existe.'],
      ['Presentar turismo como trabajo', 'El motivo declarado debe corresponder a tu proyecto real. Si querés trabajar, la conversación debe empezar por la categoría laboral correspondiente.'],
      ['Inflar la experiencia', 'Cambiar funciones o formación para que el perfil parezca encajar puede crear inconsistencias. Trabajamos con antecedentes que puedas explicar y respaldar.'],
    ],
    faq: [
      ['¿Consiguen empleos en Estados Unidos?', 'No. Este servicio orienta y prepara la etapa consular de un proyecto laboral. No ofrecemos puestos, colocación laboral ni una bolsa de trabajo vinculada a la solicitud.'],
      ['¿Puedo iniciar H-2B o H-1B sin empleador?', 'La orientación empieza por aclarar que esas categorías requieren la intervención de un empleador estadounidense mediante una petición. No ofrecemos reemplazar esa etapa con un formulario de turista.'],
      ['¿Una oferta por mensaje alcanza para preparar todo?', 'Necesitamos entender qué existe más allá del mensaje: quién es el empleador, cuál es el puesto y qué documentación del trámite recibiste. Si hay dudas, empezamos por ordenarlas.'],
      ['¿La petición decide el resultado consular?', `${FACTS.F5} Nuestro acompañamiento no convierte la documentación del empleador en una promesa de emisión de visa; te ayuda a preparar tu propia participación.`],
    ],
  }),
  service({
    path: '/visa-americana/entrevista/', label: 'Preparación de entrevista', eyebrow: 'Estados Unidos · Simulacro',
    title: 'Entrevista visa americana: preguntas y preparación',
    description: 'Practicá preguntas de la entrevista de visa americana. Un simulacro con tu caso real, revisión del DS-160 y respuestas claras desde Paraguay.',
    h1: 'Entrevista de visa americana: preguntas para preparar tu caso',
    lead: 'Los nervios pueden hacer difícil explicar algo que conocés bien: tu propia vida. En el simulacro practicamos cómo responder con claridad y revisamos si tu explicación coincide con el formulario y con el viaje que querés hacer.',
    audience: [
      'Tenés una entrevista por delante y te preocupa quedarte en blanco, responder demasiado o no entender cómo resumir tu motivo de viaje.',
      'Completaste el formulario con ayuda de otra persona y querés leerlo con atención para reconocer los datos que se declararon sobre vos.',
      'Ya tuviste una entrevista y querés revisar cómo explicaste tu trabajo, financiación o vínculos con Paraguay sin atribuir el resultado solamente a los nervios.',
    ],
    help: [
      ['Leer tu solicitud', 'Empezamos por la información del DS-160 que conservás. Identificamos respuestas que no reconocés o dudas que requieren revisión antes de ensayar la conversación.'],
      ['Ordenar el motivo', 'Te ayudamos a explicar qué querés hacer durante el viaje. Separamos el motivo principal de detalles accesorios que pueden volver confusa una respuesta sencilla.'],
      ['Hablar de tus vínculos', 'Conversamos sobre trabajo, familia, estudios y propiedades cuando formen parte de tu vida. No usamos una lista de bienes como receta ni inventamos vínculos.'],
      ['Practicar preguntas', 'Hacemos preguntas de preparación sobre tu situación. No son un guion oficial ni una predicción de lo que te van a preguntar en la ventanilla.'],
      ['Dar una devolución', 'Señalamos contradicciones, respuestas poco claras y datos que conviene verificar. Practicamos otra vez con esa información corregida, sin pedirte que memorices un discurso.'],
    ],
    steps: [
      ['Contexto', 'Contanos el motivo de viaje y qué parte de la entrevista te genera más preocupación.'],
      ['Revisión', 'Leemos los datos disponibles para que el simulacro tenga relación con tu solicitud concreta.'],
      ['Práctica', 'Respondés con tus propias palabras y trabajamos una pregunta por vez, sin agregar historias ajenas.'],
      ['Devolución', 'Revisamos qué se entendió, qué quedó ambiguo y qué dato necesitás comprobar antes de continuar.'],
      ['Preparación final', `${FACTS.F2} Repasamos las instrucciones oficiales y las dudas que quedaron abiertas.`],
    ],
    mistakes: [
      ['Memorizar respuestas', 'Repetir frases de un video puede hacerte hablar de una situación que no es la tuya. Practicá ideas verdaderas, no un personaje.'],
      ['Responder más de lo preguntado', 'Agregar detalles por nervios puede desordenar tu explicación. Escuchá la pregunta y respondé sobre ese punto con naturalidad.'],
      ['Suponer que un respaldo decide', 'Trabajo, estudios o propiedades aportan contexto si existen. Ningún documento aislado permite anticipar por sí solo la evaluación consular.'],
    ],
    extra: [{ type: 'bullets', title: 'Preguntas habituales para practicar', body: 'Estas preguntas son ejercicios de preparación; la entrevista real puede seguir otro recorrido.', items: INTERVIEW_QUESTIONS }],
    faq: [
      ['¿Me dan las respuestas correctas?', 'Trabajamos con tus respuestas verdaderas. Podemos ayudarte a hacerlas más claras, pero no existe una frase que resuelva todos los casos ni una historia que debas copiar.'],
      ['¿Sirve practicar si me pongo nervioso?', 'Sí, el ensayo permite reconocer dudas y familiarizarte con explicar tu viaje. No prometemos eliminar los nervios ni atribuimos una negativa solamente a la manera de hablar.'],
      ['¿Tengo que llevar propiedades a mi nombre?', 'No inventamos condiciones universales para practicar. Si tenés propiedades, las incluimos como parte de tu contexto; también conversamos sobre los otros vínculos reales de tu vida.'],
      ['¿El simulacro permite saber el resultado?', `${FACTS.F5} El simulacro sirve para revisar tu preparación, no para reproducir la evaluación del oficial ni anticipar una decisión.`],
    ],
  }),
  service({
    path: '/visa-americana/denegada/', label: 'Visa denegada', eyebrow: 'Estados Unidos · Revisión de antecedentes',
    title: 'Visa americana denegada: volver a aplicar',
    description: 'Revisá tu caso después de una visa americana denegada. Qué significa 214(b), qué cambió y cómo preparar una nueva solicitud con honestidad.',
    h1: 'Visa americana denegada: qué revisar antes de volver a aplicar',
    lead: 'Después de una negativa, es comprensible querer intentarlo de nuevo enseguida. Antes de repetir el trámite, revisamos qué presentaste, qué entendés de la decisión y qué cambios reales podés explicar en otra solicitud.',
    audience: [
      'Recibiste una negativa bajo 214(b) y necesitás separar lo que dice la comunicación oficial de las explicaciones que escuchaste de otras personas.',
      'Querés volver a solicitar, pero todavía no tenés claro si cambió tu situación o si solo pensás modificar la forma de responder.',
      'Detectaste un dato incorrecto en el formulario anterior y buscás ordenar los antecedentes sin ocultar la solicitud ni construir una versión distinta por conveniencia.',
    ],
    help: [
      ['Leer la comunicación', 'Empezamos por el documento recibido. No tratamos todas las negativas como iguales ni suponemos un motivo que la comunicación no permita identificar.'],
      ['Revisar lo presentado', 'Leemos la información anterior que conservás y conversamos sobre la entrevista. Diferenciamos datos comprobables, recuerdos y dudas que no podemos resolver por suposición.'],
      ['Comprender 214(b)', FACTS.F6],
      ['Identificar cambios', 'Conversamos sobre modificaciones reales en trabajo, estudios, financiación o motivo de viaje. Cambiar palabras no equivale a cambiar las circunstancias de tu caso.'],
      ['Ordenar otra solicitud', 'Si decidís continuar, preparamos información actual y coherente con tus antecedentes. Las solicitudes anteriores forman parte de la revisión; no proponemos esconderlas.'],
      ['Preparar la explicación', 'Practicamos cómo contar tu situación presente y los cambios que podés respaldar. La conversación parte de hechos concretos, sin culpar automáticamente a los nervios o al formulario.'],
    ],
    steps: [
      ['Antecedentes', 'Contanos cuándo solicitaste y qué documentación conservás, sin enviar datos sensibles en la primera consulta.'],
      ['Lectura', 'Revisamos el tipo de comunicación recibida y evitamos dar por sentado que cualquier caso corresponde a 214(b).'],
      ['Comparación', 'Ponemos en orden tu situación anterior y la actual para identificar diferencias reales y preguntas pendientes.'],
      ['Decisión personal', 'Conversamos sobre el alcance de la preparación. Vos decidís si querés avanzar, con conocimiento de que el resultado sigue abierto.'],
      ['Nueva preparación', 'Si continuás, revisamos la solicitud y practicamos cómo explicar tu caso actual sin borrar ni disimular el anterior.'],
    ],
    mistakes: [
      ['Repetir por impulso', 'Volver a pagar sin revisar qué cambió puede llevarte a presentar el mismo caso. Primero ordená los antecedentes y tus motivos para intentarlo otra vez.'],
      ['Inventar una mejora', 'Un empleo, ingreso o vínculo que no existe no es una solución. Una solicitud debe describir tu vida real, incluso cuando no parezca un perfil ideal.'],
      ['Buscar una explicación única', 'No podemos conocer toda la valoración del oficial a partir de un relato breve. Evitamos afirmar que una palabra o un gesto causó la negativa.'],
    ],
    faq: [
      ['¿Toda negativa es por 214(b)?', 'No tratamos todas las comunicaciones de la misma manera. Antes de orientar otra solicitud, necesitamos revisar qué indica el documento que recibiste y qué información tenés sobre el trámite.'],
      ['¿Cambiar de asesoría cambia el resultado?', 'Puede cambiar la manera de preparar y revisar tu información, pero no modifica por sí solo tus circunstancias ni la autoridad que evalúa la solicitud. No ofrecemos resultados por cambiar de acompañamiento.'],
      ['¿Tengo que ocultar la negativa anterior?', 'No. Trabajamos con los antecedentes reales y revisamos cómo declararlos según las preguntas del formulario. Omitirlos para presentar una historia más favorable contradice nuestra forma de preparar el caso.'],
      ['¿Cuándo tiene sentido volver a conversar?', `Cuando podás explicar qué cambió o qué información anterior necesitás revisar. ${FACTS.F5} La evaluación de una nueva solicitud no está resuelta de antemano.`],
    ],
  }),
);

PAGES.push(service({
  type: 'hub', path: '/visa-americana/', label: 'Visa americana', eyebrow: 'Desde Paraguay · Estados Unidos',
  title: 'Visa americana en Paraguay | Elegí tu preparación',
  description: 'Encontrá orientación para tu visa americana: turismo, renovación, estudios, trabajo, entrevista y revisión después de una negativa.',
  h1: 'Visa americana: encontrá la preparación que necesitás',
  lead: 'Tu motivo de viaje y tus antecedentes definen por dónde conviene empezar. Elegí el servicio relacionado con tu situación o contanos qué querés hacer para ordenar el próximo paso con vos.',
  before: [
    { type: 'services', title: 'Un punto de partida para cada caso', items: SERVICES.slice(0, 6) },
    { type: 'comparison', title: 'Compará los recorridos', body: FACTS.F7, columns: ['Tipo', 'Para quién', 'Entrevista'], rows: [
      ['Turista B1/B2', 'Viajes de turismo o visita', 'Preparación para entrevista; seguí la indicación oficial.'],
      ['Renovación', 'Solicitantes con una visa anterior', 'Posible exención según reglas vigentes, sin anticipar elegibilidad.'],
      ['Estudiante F-1 / J-1', 'Estudios o intercambio con institución o patrocinador', 'Preparación consular según el programa y las instrucciones.'],
      ['Trabajo', 'Proyecto laboral con petición del empleador', 'Etapa consular según el trámite correspondiente.'],
      ['Simulacro', 'Personas que necesitan practicar su explicación', 'Es preparación privada para la entrevista oficial.'],
      ['Después de una negativa', 'Personas que quieren revisar otra solicitud', 'Primero revisamos antecedentes y cambios reales.'],
    ] },
  ],
  audience: ['Solicitás por primera vez y querés ordenar el propósito del viaje antes de empezar el formulario.', 'Ya tenés antecedentes de solicitud y necesitás revisar cambios, una renovación o una negativa.', 'Tu proyecto incluye estudios o trabajo y necesitás distinguir la preparación consular de las gestiones de la institución o del empleador.'],
  help: [
    ['Escuchar tu proyecto', 'Empezamos por lo que querés hacer y los antecedentes que ya existen, sin elegir una categoría por conveniencia.'],
    ['Ubicar el servicio', 'Diferenciamos una preparación completa de una revisión puntual o un simulacro para orientar la conversación inicial.'],
    ['Ordenar información', 'Identificamos datos disponibles, documentos por revisar y preguntas que todavía requieren una respuesta comprobable.'],
    ['Revisar coherencia', 'Comparamos lo que contás con los documentos y con el formulario para detectar diferencias antes de continuar.'],
    ['Preparar tu participación', 'Te explicamos qué revisamos y qué necesitás confirmar personalmente. Tus respuestas siguen siendo tuyas.'],
  ],
  steps: [
    ['Consulta', 'Contanos tu motivo de viaje y si ya solicitaste una visa.'],
    ['Alcance', 'Acordamos qué parte de la preparación necesitás trabajar con nosotros.'],
    ['Revisión', 'Ordenamos tus datos y las preguntas pendientes del trámite.'],
    ['Preparación', 'Trabajamos formulario, documentos o simulacro según tu caso.'],
    ['Próximo paso', 'Repasamos las instrucciones oficiales que correspondan a tu solicitud.'],
  ],
  mistakes: [
    ['Elegir por facilidad', 'La categoría debe reflejar el motivo real del viaje. No tratamos una solicitud de turismo como sustituto de un proyecto laboral.'],
    ['Copiar un trámite ajeno', 'Las circunstancias de otra persona no describen las tuyas. Revisamos tu información y tus antecedentes por separado.'],
    ['Confundir ayuda y decisión', 'Una asesoría organiza la preparación. No controla la evaluación consular ni convierte un expediente ordenado en un resultado previsto.'],
  ],
  faq: [
    ['¿Por dónde empiezo si no sé qué servicio elegir?', 'Contanos qué querés hacer en Estados Unidos, si tuviste una visa y qué parte del trámite ya empezaste. Con esa información podemos orientar la primera conversación.'],
    ['¿Puedo pedir solamente un simulacro?', 'Sí, podemos conversar sobre una preparación de entrevista. Necesitamos conocer tu solicitud para que el ejercicio refleje tu caso y no sea una lista de respuestas genéricas.'],
    ['¿Quién completa los datos del formulario?', 'Lo preparamos con tu participación. Revisás los datos y aclarás antecedentes antes del envío, incluso cuando otra persona te haya ayudado con una solicitud anterior.'],
    ['¿Qué autoridad decide?', `${FACTS.F5} Nuestro trabajo consiste en ayudarte a presentar información verdadera y a comprender lo que estás preparando.`],
  ],
}));

function guide(d) {
  return {
    type: 'guide', path: d.path, label: d.label, waContext: d.label, title: d.title, description: d.description,
    hero: { eyebrow: 'Guías · Preparación desde Paraguay', title: d.h1, lead: d.lead },
    breadcrumbs: [{ label: 'Guías', href: '/guias/' }, { label: d.label, href: d.path }],
    sections: [{ type: 'article', title: 'En esta guía', items: d.parts.map(([id, title, paragraphs]) => ({ id, title, paragraphs })), inline: d.inline }, CTA],
  };
}
export const GUIDES = [
  guide({
    path: '/guias/requisitos-visa-americana-paraguay/', label: 'Requisitos de visa americana',
    title: 'Requisitos visa americana Paraguay | Guía práctica',
    description: 'Qué información ordenar para tu visa americana desde Paraguay: pasaporte, DS-160, motivo de viaje, financiación y preparación de entrevista.',
    h1: 'Requisitos de visa americana en Paraguay: prepará la información',
    lead: 'Antes de buscar una carpeta perfecta, necesitás entender qué viaje querés hacer y qué información describe tu situación. Esta guía te ayuda a organizar la preparación de una solicitud de turismo sin confundir documentos con una decisión consular.',
    inline: { label: 'Prepará tu visa de turista con nosotros', href: '/visa-americana/turista/', body: 'Si querés revisar tu información antes de seguir, contanos qué tenés preparado y dónde aparecen las dudas.' },
    parts: [
      ['motivo', 'Empezá por el motivo real del viaje', [
        'Escribí con tus palabras qué querés hacer en Estados Unidos. Visitar a un familiar, conocer un lugar o acompañar a alguien son planes que necesitan una explicación propia. No hace falta adornarla con reservas inexistentes ni adoptar el itinerario que otra persona presentó.',
        'Diferenciá lo que ya está decidido de lo que depende del resultado del trámite. Anotá quién viajaría con vos y dónde pensás alojarte, dejando claros los datos todavía tentativos. Si tu intención es estudiar o trabajar, revisá el servicio correspondiente: esta orientación sobre turismo no reemplaza la preparación de esas categorías.',
      ]],
      ['identidad', 'Revisá identidad y antecedentes', [
        'Usá el pasaporte como referencia para revisar tu nombre y los datos de identidad. Comparalos con la información que conservás de solicitudes anteriores. Si encontrás diferencias, identificá de dónde vienen antes de trasladarlas a otro formulario. Una lectura pausada es más útil que corregir por intuición.',
        'Ordená también tus antecedentes de viajes y solicitudes. No respondas de memoria cuando podés consultar tus documentos. Si no encontrás un dato, registralo como pendiente de revisión. Preparar bien no significa tener todas las respuestas de inmediato, sino saber cuáles son comprobables y cuáles necesitan atención antes del envío.',
      ]],
      ['formulario', 'Entendé qué vas a declarar en el DS-160', [
        FACTS.F1,
        'La ayuda de una asesoría no reemplaza tu participación. Leé las preguntas y revisá las respuestas que se carguen sobre tu ocupación, viajes y antecedentes. Si alguien completó el formulario por vos, pedí revisar la información para reconocer tu propia solicitud.',
        'Prestá atención a los campos que conectan distintas partes de tu historia. Tu empleo, quién paga y el motivo del viaje deberían poder explicarse juntos. Si algo no coincide, buscá el dato correcto; no cambies otra respuesta solamente para que las dos parezcan encajar. Podés usar nuestra guía del DS-160 para preparar esa lectura.',
      ]],
      ['recursos', 'Ordená cómo se financia el viaje', [
        'Anotá de dónde saldrían los recursos y qué gastos cubriría cada persona si viajás con ayuda. No presentes apoyo familiar como ingreso propio ni describas una invitación como si incluyera gastos que nadie se comprometió a pagar. La explicación debe reflejar los acuerdos reales.',
        'Los respaldos tienen que ayudar a entender esa situación. Antes de sumar un documento, preguntate qué dato explica y si coincide con lo declarado. Una carpeta grande no resuelve por sí sola una contradicción. Si tu actividad es independiente, describí lo que hacés con claridad y revisá qué información disponible permite comprenderla sin inventar un empleo formal.',
      ]],
      ['cita', 'Separá formulario, arancel y cita', [
        FACTS.F4,
        'Para el arancel, consultá el monto vigente en la fuente oficial antes de organizar un pago. Diferenciá la preparación privada del trámite que realizás en el sistema oficial. Una conversación con una asesoría no equivale a una cita confirmada ni a una comunicación consular.',
        'Conservá los comprobantes y revisá las instrucciones que recibas. Prestá atención a qué corresponde presentar y a qué paso del proceso pertenece cada indicación. Si algo no coincide con lo que te contaron, detené esa gestión y consultá la instrucción oficial antes de seguir usando una explicación de terceros.',
      ]],
      ['entrevista', 'Prepará una conversación sobre tu vida', [
        FACTS.F2,
        'Practicá cómo explicar tu viaje, ocupación, financiación y planes de regreso. Tus vínculos con Paraguay pueden incluir trabajo, familia, estudios o propiedades, según tu realidad. No los conviertas en una lista obligatoria de cosas que debés aparentar tener.',
        'Un ensayo sirve para detectar respuestas confusas y preguntas que no entendiste. Escuchá antes de responder y evitá memorizar historias ajenas. Si te preguntan algo que no comprendés, el objetivo de la preparación es que puedas reconocer esa dificultad y expresarte con honestidad, no que recites un discurso completo cualquiera sea la pregunta.',
      ]],
      ['revision', 'Hacé una revisión final con criterio', [
        'Antes de continuar, repasá si tu nombre, antecedentes, propósito y financiación son coherentes entre sí. Identificá pendientes concretos en lugar de decir simplemente que la carpeta está lista. Si otra persona te ayudó, asegurate de entender qué se preparó y qué te corresponde confirmar.',
        `${FACTS.F5} Esta guía organiza la preparación; no ofrece una fórmula de aprobación ni sustituye las instrucciones oficiales. Si necesitás acompañamiento, empezá con una consulta sobre tu caso y los documentos que ya tenés, sin enviar información sensible en el primer mensaje.`,
      ]],
    ],
  }),
];

GUIDES.push(
  guide({
    path: '/guias/como-llenar-el-ds-160/', label: 'Cómo llenar el DS-160',
    title: 'Cómo llenar el DS-160 desde Paraguay | Guía',
    description: 'Prepará los datos del DS-160, revisá respuestas y evitá contradicciones. Una guía para completar tu solicitud con información verdadera.',
    h1: 'Cómo llenar el DS-160: prepará, revisá y entendé tus respuestas',
    lead: 'Completar el DS-160 no consiste solamente en traducir datos al inglés. Necesitás comprender qué se pregunta, reunir información comprobable y revisar que las respuestas describan tu situación antes de enviar la solicitud.',
    inline: { label: 'Pedí ayuda para tu solicitud de turista', href: '/visa-americana/turista/', body: 'Podemos revisar el DS-160 con vos y ordenar las preguntas que todavía no podés responder con certeza.' },
    parts: [
      ['preparar', 'Reuní la información antes de escribir', [
        FACTS.F1,
        'Antes de abrir el formulario, organizá tu pasaporte, información laboral o académica y antecedentes de viaje. Prepará una lista aparte para los datos que no recordás. Ese inventario te permite distinguir un campo listo para completar de una pregunta que necesita una revisión adicional.',
        'No copies el formulario de un amigo como modelo de respuestas. Puede ayudarte a reconocer que existe una pregunta, pero su ocupación, contactos y antecedentes no son los tuyos. La preparación empieza con tu información y con las instrucciones del sistema oficial, no con una versión que supuestamente le funcionó a alguien.',
      ]],
      ['preguntas', 'Leé la pregunta completa', [
        'Un término en inglés puede cambiar el sentido de lo que te están pidiendo. Leé la pregunta completa y su ayuda contextual antes de responder. Si no entendés una palabra o no sabés a qué período se refiere, aclaralo antes de elegir una opción.',
        'La asistencia sirve para comprender y revisar; no para decidir por vos hechos personales. Si alguien te propone una respuesta porque parece más conveniente, volvé a la pregunta original. Anotá qué información falta y buscá una forma de comprobarla. No es una carrera por llenar todos los espacios: cada respuesta debe tener una base que puedas reconocer y explicar.',
      ]],
      ['identidad', 'Contrastá los datos personales', [
        'Compará el nombre y los datos de identidad con tu documento. Prestá atención cuando copiás información de archivos viejos, mensajes o formularios anteriores. Un error repetido sigue siendo un error aunque aparezca en varios lugares. Revisá el origen de la información, no solamente que dos copias coincidan.',
        'Si tuviste cambios personales o tenés antecedentes de solicitudes, revisá cómo se relacionan con las preguntas actuales. No borres una parte de tu historia para simplificar la carga. Cuando haya una duda sobre cómo declarar algo, separá el hecho real de la forma de ingresarlo y buscá aclarar esa forma antes de continuar.',
      ]],
      ['ocupacion', 'Describí tu trabajo o tus estudios reales', [
        'Tu actividad debe poder entenderse sin títulos inventados. Si trabajás por cuenta propia, prepará una explicación concreta de lo que hacés. Si estudiás, revisá los datos de la institución y de tu actividad académica. Si cambiaste de ocupación, no copies automáticamente lo que figuraba en otra solicitud.',
        'Contrastá la información con los documentos que conservás. El objetivo no es hacer que tu perfil parezca más importante, sino que sea consistente. Si el nombre de una empresa, una función o un antecedente genera dudas, anotá qué necesitás consultar. La claridad de una descripción no depende de exagerar responsabilidades ni de presentar un ingreso que no existe.',
      ]],
      ['viaje', 'Separá planes, contactos y financiación', [
        'Revisá qué está confirmado en tu viaje y qué sigue siendo tentativo. Una persona que te recibe no necesariamente paga todos tus gastos. Un lugar que te interesa visitar no es una reserva realizada. Mantené esas diferencias claras al preparar las respuestas y al conversar sobre el viaje.',
        'Preguntate si podrías explicar con tus palabras la relación entre el motivo, el alojamiento y los recursos. Si no podés, quizás falta una conversación con quien viaja con vos o con quien te ayuda. Resolvé esa duda de fondo; cambiar una frase del formulario no arregla un plan que todavía no entendiste.',
      ]],
      ['antecedentes', 'Revisá viajes y solicitudes anteriores', [
        'Usá documentos disponibles para revisar antecedentes en lugar de adivinar. Si ya solicitaste una visa, recuperá la información que conservás y señalá cualquier diferencia con tu situación actual. Una negativa anterior no debe desaparecer de la preparación porque resulte incómodo hablar de ella.',
        'Si encontrás un dato que pudo haberse declarado mal antes, no fabriques otro para sostenerlo. Ordená qué pasó, cuál es la información correcta y qué consulta necesitás hacer sobre tu nueva solicitud. Revisar antecedentes no significa poder reconstruir todo de memoria: significa trabajar con lo comprobable y reconocer con honestidad dónde hay información pendiente.',
      ]],
      ['enviar', 'Revisá antes del envío y conservá el contexto', [
        'Hacé una lectura completa, incluso de campos que parecían sencillos. Si otra persona te ayudó, revisá con ella las respuestas y pedí que explique lo que no comprendés. Buscá diferencias entre nombres, ocupación, financiación y motivo del viaje; evitá corregir una parte sin revisar sus efectos en las otras.',
        `${FACTS.F4} Después, seguí las instrucciones oficiales aplicables y conservá los comprobantes correspondientes. El formulario es una parte del trámite, no una decisión consular. Prepararte para la entrevista incluye conocer lo que declaraste y poder contarlo sin depender de quien escribió las respuestas.`,
      ]],
    ],
  }),
  guide({
    path: '/guias/preguntas-entrevista-visa-americana/', label: 'Preguntas de entrevista',
    title: 'Preguntas entrevista visa americana | Guía Paraguay',
    description: 'Cómo practicar preguntas de entrevista para tu visa americana: viaje, financiación, trabajo y vínculos con Paraguay, sin memorizar respuestas.',
    h1: 'Preguntas de entrevista de visa americana: practicá tu explicación',
    lead: 'No existe una lista de respuestas que sirva para todas las entrevistas. Prepararte consiste en conocer tu solicitud, escuchar cada pregunta y explicar tu situación real sin construir una historia para agradar.',
    inline: { label: 'Prepará un simulacro de entrevista', href: '/visa-americana/entrevista/', body: 'Si querés una devolución sobre tu explicación, practicamos con el contexto de tu solicitud y señalamos las dudas que conviene revisar.' },
    parts: [
      ['contexto', 'Entendé para qué sirve practicar', [
        FACTS.F2,
        'Un simulacro privado no reproduce toda la evaluación que hace el oficial. Sirve para reconocer qué información conocés, qué respuestas son poco claras y qué datos todavía necesitás comprobar. Llegar preparado significa entender tu caso, no llevar un personaje aprendido de memoria.',
        'Separá dos preocupaciones distintas: sentir nervios y tener contradicciones en la solicitud. La práctica puede ayudarte a expresarte, mientras que una contradicción necesita revisar los hechos y los documentos. Hablar con seguridad sobre un dato equivocado no corrige la información. Por eso conviene leer el formulario antes de empezar a ensayar preguntas.',
      ]],
      ['motivo', 'Preguntas sobre el motivo y el recorrido', [
        'Practicá estas preguntas: ¿cuál es el motivo de tu viaje?, ¿qué lugares pensás visitar?, ¿dónde pensás alojarte? Contestá distinguiendo decisiones tomadas de planes tentativos. Si vas a visitar a alguien, explicá la relación sin agregar compromisos que esa persona no asumió.',
        'Una respuesta clara puede ser breve y después ampliarse si la conversación lo requiere. No necesitás recitar todo el itinerario frente a una pregunta sobre el motivo principal. Si todavía no definiste algo, revisá cómo describir esa incertidumbre con honestidad. Inventar reservas o actividades para que el plan parezca cerrado puede crear preguntas nuevas que no sabés responder.',
      ]],
      ['recursos', 'Preguntas sobre acompañantes y recursos', [
        'Ensayá cómo responder ¿con quién vas a viajar? y ¿quién va a pagar el viaje? Si varias personas participan, distinguí quién organiza, quién acompaña y quién aporta recursos. Son funciones que pueden coincidir o estar repartidas; tu explicación debe reflejar el acuerdo real.',
        'Si recibís ayuda familiar, entendé qué cubre y qué parte te corresponde. No presentes recursos ajenos como si fueran propios. También revisá si esa explicación coincide con el formulario. Cuando aparece una diferencia durante la práctica, el siguiente paso es aclarar la información, no aprender a ocultar la diferencia con una respuesta más larga.',
      ]],
      ['vinculos', 'Preguntas sobre tu vida en Paraguay', [
        '¿A qué te dedicás en Paraguay?, ¿qué estudiás actualmente? y ¿qué planes tenés al regresar? son ejercicios útiles para ordenar tu explicación. Trabajo, familia, estudios y propiedades pueden formar parte de tus vínculos cuando existen; no son una lista de requisitos que debas aparentar cumplir.',
        'Describí tu ocupación con términos que entendás y podás sostener. Si trabajás de manera independiente, explicá la actividad sin inventar un cargo. Si un proyecto todavía es una posibilidad, no lo presentes como un compromiso firmado. La práctica busca que tu vida se entienda, incluso cuando no se parece al ejemplo que viste en una publicación.',
      ]],
      ['antecedentes', 'Preguntas sobre familiares y viajes anteriores', [
        'Practicá ¿tenés familiares en Estados Unidos? y ¿viajaste antes al exterior? Revisá los antecedentes antes de ensayar. No uses la memoria como única fuente cuando conservás documentación que puede ayudarte a comprobar datos. Si necesitás consultar algo, anotá el pendiente.',
        'Estas preguntas de preparación no son un cuestionario oficial ni una predicción del orden de la entrevista. Sirven para encontrar temas que tenés que conocer sobre tu propia solicitud. Si hubo una negativa anterior, prepará una revisión específica del caso. No supongas que cambiar la manera de hablar modifica por sí solo las circunstancias que se evaluaron antes.',
      ]],
      ['escuchar', 'Escuchá y respondé sobre lo que te preguntan', [
        'Durante un ensayo, dejá que la otra persona termine la pregunta. Respondé sobre ese punto y observá si agregás detalles para llenar el silencio. Muchas explicaciones se vuelven difíciles de seguir porque mezclan el motivo del viaje con antecedentes que nadie preguntó todavía.',
        'Si no comprendiste, reconocé la dificultad en lugar de responder otra cosa. Practicar también permite detectar palabras que usás sin conocer bien su significado. No necesitás una voz ensayada ni un tono comercial. Necesitás poder explicar lo que declaraste con naturalidad, sin convertir cada pregunta en una oportunidad para recitar la misma respuesta preparada.',
      ]],
      ['devolucion', 'Usá la devolución para revisar hechos', [
        'Después de practicar, separá observaciones concretas: un dato por confirmar, una respuesta confusa y una contradicción con el formulario. Cada problema tiene una solución distinta. Confirmá el dato, simplificá la explicación o revisá la información; no los reduzcas todos a falta de confianza.',
        `${FACTS.F5} Ningún simulacro puede anticipar ese resultado. Nuestro trabajo es ayudarte a conocer tu solicitud y expresarte de forma coherente. Si querés practicar con acompañamiento, empezá contándonos tu motivo de viaje y qué parte de la conversación te preocupa más.`,
      ]],
    ],
  }),
);

GUIDES.push(guide({
  path: '/guias/visa-americana-denegada-214b/', label: 'Visa denegada bajo 214(b)',
  title: 'Visa americana denegada 214(b) | Qué revisar',
  description: 'Qué revisar después de una negativa 214(b): comunicación oficial, solicitud anterior y cambios reales antes de volver a solicitar la visa.',
  h1: 'Visa americana denegada por 214(b): revisá antes de repetir',
  lead: 'Una negativa puede dejarte con preguntas y con ganas de volver a intentar inmediatamente. Antes de preparar otra solicitud, conviene distinguir lo que sabés de la decisión, lo que recordás de la entrevista y lo que realmente cambió en tu situación.',
  inline: { label: 'Pedí una revisión de tu visa denegada', href: '/visa-americana/denegada/', body: 'Contanos qué comunicación recibiste y qué cambió desde tu solicitud. Empezamos por los antecedentes, sin anticipar el resultado de otro trámite.' },
  parts: [
    ['comunicacion', 'Empezá por la comunicación recibida', [
      'Revisá el documento que te entregaron y conservá su contenido para entender qué tipo de situación estás evaluando. No asumas que todas las negativas tienen el mismo fundamento. El relato de otra persona puede parecerse al tuyo y aun así referirse a una comunicación diferente.',
      'Anotá también qué recordás de la entrevista, separando preguntas, respuestas y conclusiones personales. Decir que te preguntaron sobre tu trabajo es distinto de afirmar que el trabajo fue la única causa del resultado. Esa distinción permite revisar lo que pasó sin convertir una impresión en un hecho que nadie confirmó.',
    ]],
    ['significado', 'Qué expresa una negativa bajo 214(b)', [
      FACTS.F6,
      'Esta explicación no permite identificar toda la valoración del oficial en tu caso concreto. Una conversación breve con una asesoría tampoco permite reconstruirla por completo. Por eso conviene desconfiar de diagnósticos que atribuyen el resultado a una palabra, una prenda o una pausa al hablar.',
      'La revisión útil se concentra en información que podés comprobar: lo que declaraste, lo que llevaste, lo que recordás haber explicado y tu situación actual. No ofrece una lectura de las intenciones del oficial ni una receta que convierta otra solicitud en un resultado distinto.',
    ]],
    ['solicitud', 'Releé lo que presentaste antes', [
      'Si conservás la información del formulario, leela completa. Revisá motivo de viaje, ocupación, financiación y antecedentes. Buscá datos que no reconocés o respuestas que no coinciden con tu vida. Si alguien te ayudó a completarlo, pedí una explicación de lo que se declaró.',
      'Un error identificado debe revisarse con honestidad. No propongas otro dato falso para que la historia anterior se sostenga. Anotá cuál era la información real, qué quedó registrado y qué consulta necesitás resolver antes de una nueva solicitud. Si no conservás todo, trabajá con lo disponible y reconocé los límites de esa revisión en lugar de reconstruir respuestas por conveniencia.',
    ]],
    ['cambios', 'Diferenciá cambios reales de cambios de discurso', [
      'Preguntate qué es distinto desde la solicitud anterior. Puede haber cambios en tu trabajo, estudios, situación familiar, financiación o motivo del viaje. Describilos de manera concreta y revisá qué información permite entenderlos. No necesitás calificarlos como grandes mejoras para poder hablar de ellos.',
      'Cambiar una frase, elegir otro asesor o llevar más papeles no modifica necesariamente las circunstancias. Tampoco corresponde inventar un empleo o presentar recursos que no son tuyos. Si el caso sigue siendo el mismo, reconocelo antes de decidir otra solicitud. La revisión debe ayudarte a comprender tu situación, aunque la conclusión sea que todavía tenés preguntas importantes sin resolver.',
    ]],
    ['vinculos', 'Revisá cómo explicaste tu contexto', [
      'Tu vida en Paraguay puede incluir trabajo, familia, estudios o propiedades. Revisá cómo lo describiste y si esa explicación coincidía con el formulario. No trates esos vínculos como una lista de objetos que debés conseguir para poder solicitar otra vez.',
      'También mirá el viaje desde el principio: qué querías hacer, cómo lo ibas a financiar y qué planes tenías al regresar. Una explicación confusa puede trabajarse, pero no permite afirmar que fue la causa exclusiva de la negativa. Separá la calidad de tu preparación de la decisión consular, que no depende de una evaluación hecha por nuestra asesoría.',
    ]],
    ['decision', 'Tomá la decisión de volver a solicitar con información', [
      'Volver a solicitar es una decisión personal que conviene tomar entendiendo que el resultado sigue abierto. Antes de organizar otro trámite, preguntate si podés explicar qué cambió y qué información anterior necesitás corregir o aclarar. Evitá decidir solamente por la presión de una fecha de viaje o por la insistencia de alguien que promete resolverlo.',
      'Para el arancel, consultá el monto vigente en el sistema oficial. No confundas ese pago con la contratación de una preparación privada. Conversar sobre tu caso no implica que debas iniciar otra solicitud: primero podés ordenar antecedentes, pendientes y el alcance de la ayuda que necesitás.',
    ]],
    ['preparacion', 'Prepará otra solicitud sin borrar la anterior', [
      'Si decidís continuar, trabajá con información actual y con tus antecedentes reales. Una solicitud anterior no deja de existir porque resulte incómoda. Revisá cómo responder las preguntas del formulario y practicá una explicación clara de tu situación presente, sin fingir que estás empezando una historia nueva.',
      `${FACTS.F5} Podemos ayudarte a comparar información, identificar dudas y practicar respuestas verdaderas. No ofrecemos una promesa por tratarse de otro intento. Para empezar, contanos qué comunicación recibiste, qué documentos conservás y qué cambios podés describir con hechos, sin compartir información sensible en el primer mensaje.`,
    ]],
  ],
}));

PAGES.push(...GUIDES,
  {
    type: 'hub', path: '/guias/', label: 'Guías', waContext: 'guías de preparación de visas',
    title: 'Guías de visa americana en Paraguay | visas.com.py',
    description: 'Leé nuestras guías sobre requisitos, DS-160, preguntas de entrevista y negativas 214(b). Prepará tu solicitud desde Paraguay con información clara.',
    hero: { eyebrow: 'Una lectura antes del próximo paso', title: 'Guías para preparar tu visa con criterio.', lead: 'Empezá por la duda que tenés hoy. Estas guías te ayudan a ordenar preguntas y documentos; las instrucciones del trámite se consultan en las fuentes oficiales.' },
    sections: [{ type: 'services', title: 'Elegí qué necesitás revisar', items: GUIDES.map(g => ({ eyebrow: 'Guía de preparación', title: g.label, body: g.description, href: g.path, tag: 'Leé la guía' })) }, CTA],
  },
  {
    type: 'faq', path: '/preguntas-frecuentes/', label: 'Preguntas frecuentes', waContext: 'preguntas frecuentes',
    title: 'Preguntas frecuentes sobre visas | visas.com.py',
    description: 'Respuestas sobre DS-160, entrevista, renovación, estudios, trabajo, Canadá y residencia en Paraguay. Conocé el alcance de nuestra asesoría.',
    hero: { eyebrow: 'Antes de empezar', title: 'Preguntas frecuentes sobre tu preparación.', lead: 'Entendé qué hacemos, qué depende de vos y qué corresponde a las autoridades. Si tu situación no está acá, contanos el destino y los antecedentes para orientar la consulta.' },
    sections: [{ type: 'faq', title: 'Lo que necesitás saber', items: questions([
      ['¿Ustedes son una oficina del gobierno?', 'No. Somos una asesoría privada e independiente en Asunción. Ayudamos a preparar información y documentos con vos, sin afiliación a una embajada ni facultades para decidir un trámite.'],
      ['¿Quién decide si recibo la visa americana?', FACTS.F5],
      ['¿Para qué sirve la ayuda con el DS-160?', `${FACTS.F1} Lo preparamos con vos, revisamos los datos y aclaramos dudas antes del envío. La información debe ser verdadera y reconocible para vos.`],
      ['¿Dónde se hace la entrevista de visa americana?', `${FACTS.F2} El simulacro es una preparación privada distinta de esa entrevista oficial.`],
      ['¿Dónde se paga el arancel estadounidense?', `${FACTS.F4} Consultá el monto vigente antes de pagar; el arancel y la preparación privada son conceptos distintos.`],
      ['¿Una renovación puede tener exención de entrevista?', `${FACTS.F7} No publicamos criterios ni anticipamos si calificás; revisamos las instrucciones oficiales que correspondan a tu trámite.`],
      ['¿Me ayudan si ya recibí una negativa?', `${FACTS.F6} Empezamos por revisar la comunicación recibida y qué cambió en tu situación, sin prometer otro resultado.`],
      ['¿Consiguen empleos para visas de trabajo?', 'No buscamos empleos. Orientamos la preparación de la etapa consular de un proyecto laboral. Para categorías como H-2B y H-1B, la petición del empleador estadounidense es una parte distinta del recorrido.'],
      ['¿Quién entrega el I-20 o DS-2019?', 'La institución o el patrocinador del programa correspondiente. Revisamos tus datos y preparamos la parte de la visa; no emitimos documentación académica ni reemplazamos a esas entidades.'],
      ['¿Canadá utiliza el mismo trámite que Estados Unidos?', 'No. Orientamos solicitudes de visita y permisos de estudios según el sistema canadiense. Revisamos documentos y las indicaciones de biometría cuando correspondan, sin trasladar instrucciones del DS-160.'],
      ['¿Puedo consultar por residencia en Paraguay en inglés?', 'Sí. Tenemos una página en inglés y podés iniciar la conversación en ese idioma. La preparación considera tu nacionalidad, documentos y proyecto; la residencia se tramita ante Migraciones.'],
      ['¿Necesito una visa de turismo para México, Schengen o Reino Unido?', `${FACTS.F9} La exención de visa no elimina las condiciones de ingreso ni posibles autorizaciones de viaje; consultá las instrucciones oficiales del destino antes de organizarlo.`],
    ]) }, CTA],
  },
  {
    type: 'simple', path: '/nosotros/', label: 'Nosotros', waContext: 'cómo trabaja visas.com.py',
    title: 'Nosotros: asesoría privada de visas | visas.com.py',
    description: 'Conocé cómo trabajamos en visas.com.py: preparación con vos, responsabilidades claras y una primera conversación por WhatsApp desde Asunción.',
    hero: { eyebrow: 'Asunción · Asesoría independiente', title: 'La preparación la hacemos con vos.', lead: 'visas.com.py es una asesoría privada de visas en Asunción. Nuestro trabajo es ayudarte a ordenar tu solicitud y comprender lo que estás preparando, con una participación activa de tu parte.' },
    sections: [{ type: 'prose', items: [
      { title: 'Empezamos por escuchar tu caso', body: 'No todos los viajes necesitan la misma preparación. Primero conversamos sobre destino, motivo y antecedentes: una primera solicitud, una renovación o un proyecto de estudios plantea preguntas distintas. Con esa información definimos qué parte del proceso podemos trabajar con vos y cuáles son los pendientes antes de continuar.' },
      { title: 'Qué hacemos nosotros', body: 'Ordenamos información, revisamos coherencia y te acompañamos en la preparación de formularios, documentos y entrevista según el servicio acordado. Señalamos las dudas que necesitan una respuesta comprobable. Si aparece información que no podemos confirmar, lo decimos y revisamos la instrucción correspondiente antes de darla por resuelta.' },
      { title: 'Qué te corresponde a vos', body: 'Vos aportás los datos y antecedentes reales, confirmás lo que se prepara y decidís si querés avanzar. No inventamos empleos, ingresos, reservas ni vínculos para que un perfil parezca diferente. La ayuda tiene sentido cuando entendés tu solicitud y podés reconocer tu información, incluso después de terminar nuestra conversación.' },
      { title: 'Qué corresponde a otras personas y autoridades', body: 'Las instituciones y patrocinadores emiten la documentación de los programas de estudios; el empleador interviene en la petición laboral cuando corresponde. Las autoridades evalúan las solicitudes. Para residencia, las gestiones se realizan ante Migraciones. Cualquier apoyo externo, como una traducción, requiere confirmar proveedor y alcance antes de coordinarlo con vos.' },
      { title: 'Por qué empezamos por WhatsApp', body: 'Una consulta breve permite identificar el destino, la etapa del trámite y tu principal duda antes de pedir documentación. Podés contarnos tu situación de manera general. No necesitás enviar copias de documentos sensibles en el primer mensaje. Si preferís dejar tu número, el formulario de contacto permite iniciar esa misma conversación.', links: [{ label: 'Dejanos tu consulta', href: '/contacto/' }] },
      { title: 'Nuestro alcance, por escrito', body: DISCLAIMER },
    ] }, CTA],
  },
);

// P3: keyword-planner destinations and residency cluster. No eligibility inference.
const residencyFact = 'La residencia en Paraguay se tramita ante la Dirección Nacional de Migraciones; existen la residencia temporal y la residencia permanente.';
const newServices = [
  {
    path: '/visa-espana/', label: 'Visa España', title: 'Visa España desde Paraguay: estudios y larga estadía',
    description: 'Orientación para viajar a España desde Paraguay: turismo, estudios, trabajo y residencia. Prepará tus preguntas para el consulado.',
    lead: 'Tu preparación para España empieza por distinguir turismo de un proyecto de estudios, trabajo o residencia. Contanos qué querés hacer y revisamos con vos las preguntas que necesitás resolver antes de preparar una solicitud.',
    focus: ['Definir el motivo para España', 'Ciudadanos paraguayos no necesitan visa para viajar a España como turistas; para estudiar, trabajar o residir sí necesitan un visado de larga estadía que se tramita en el Consulado de España en Asunción.'],
    audience: ['Querés viajar como turista y necesitás ordenar tus dudas sin confundir una exención de visa con la preparación de una mudanza.', 'Estás considerando estudiar en España y querés separar tu proyecto académico de las preguntas sobre el visado de larga estadía.', 'Tu proyecto es trabajar o residir en España, incluso si lo describís como nómada digital, y necesitás consultar qué encuadre corresponde.'],
    review: ['Estudios, trabajo o residencia', 'Anotamos qué actividad querés desarrollar y qué información recibiste hasta ahora. Si consultás por nómada digital, lo dejamos como una pregunta específica para el consulado, sin atribuirte una categoría ni afirmar requisitos que todavía no confirmaste.'],
    mistake: ['Tratar una mudanza como turismo', 'Explicar un proyecto de residencia como unas vacaciones deja afuera el motivo real. Trabajamos con lo que querés hacer en España y preparamos las dudas de larga estadía antes de avanzar.'],
    faq: [['¿Necesito visa para hacer turismo en España?', FACTS.F9], ['¿Dónde se tramita la larga estadía?', 'Para estudiar, trabajar o residir en España, ciudadanos paraguayos necesitan un visado de larga estadía que se tramita en el Consulado de España en Asunción.'], ['¿Puedo consultar por nómada digital?', 'Sí. Contanos tu proyecto para ordenar la consulta al Consulado de España en Asunción. No anticipamos qué categoría corresponde ni publicamos requisitos para esa consulta.'], ['¿Quién decide sobre la visa?', FACTS.F5]],
    image: 'visa-europa-estudiante-paraguaya-barcelona',
  },
  {
    path: '/work-and-travel/', label: 'Work and Travel', title: 'Work and Travel desde Paraguay: orientación de visa',
    description: 'Prepará tu consulta sobre Work and Travel USA y Working Holiday Australia. Orientación con sponsor y elegibilidad por confirmar.',
    lead: 'Si buscás Work and Travel desde Paraguay, empezá por identificar el destino y el programa que estás considerando. Te ayudamos a ordenar tu información y a distinguir la preparación de la visa de las respuestas que necesitás del programa.',
    focus: ['Work and Travel USA', 'El programa Work and Travel de Estados Unidos usa la visa J-1 y requiere un sponsor autorizado. Identificá con quién estás conversando y traé las instrucciones que recibiste para revisarlas con vos sin reemplazar al sponsor.'],
    audience: ['Estás explorando Work and Travel USA y querés entender cómo organizar tu preparación antes de completar información sobre tu viaje.', 'Ya conversaste con un programa y necesitás revisar que tus datos personales y el plan que describís sean coherentes con lo recibido.', 'Buscás Working Holiday Australia desde Paraguay y querés ordenar una consulta oficial sobre elegibilidad antes de asumir que podés solicitarla.'],
    review: ['Working Holiday Australia', 'La consulta sobre Australia se trabaja por separado. Antes de preparar una solicitud de Work and Holiday, consultá la elegibilidad vigente para tu pasaporte con la autoridad australiana. Esta página no confirma acceso al programa para ciudadanos paraguayos.'],
    mistake: ['Mezclar destinos y programas', 'No trasladés las instrucciones de un sponsor estadounidense a una consulta australiana. Guardá por separado los mensajes de cada destino e identificá a qué proyecto pertenece cada respuesta antes de usarla.'],
    faq: [['¿Qué visa usa Work and Travel USA?', 'El programa Work and Travel de Estados Unidos usa la visa J-1 y requiere un sponsor autorizado.'], ['¿Ustedes reemplazan al sponsor?', 'No. Nuestro apoyo se concentra en preparar tu información; el programa requiere un sponsor autorizado.'], ['¿Puedo solicitar Working Holiday Australia con mi pasaporte?', 'Consultá la elegibilidad vigente con la autoridad australiana antes de avanzar. No confirmamos aquí elegibilidad para ciudadanos paraguayos.'], ['¿La preparación asegura una visa estadounidense?', FACTS.F5]],
    image: 'visa-de-estudiante-campus-universidad-estados-unidos',
  },
  {
    path: '/visa-australia/', label: 'Visa Australia', title: 'Visa Australia desde Paraguay: prepará tu consulta',
    description: 'Ordená tu plan de visita, estudios o Work and Holiday Australia. Revisamos tus dudas sin anticipar elegibilidad ni requisitos.',
    lead: 'Viajar, estudiar y consultar por Work and Holiday Australia son puntos de partida distintos. Te ayudamos a explicar tu proyecto desde Paraguay y a preparar las preguntas que necesitás confirmar en la fuente oficial antes de avanzar.',
    focus: ['Visita, estudios o Work and Holiday', 'Empezá por escribir qué querés hacer en Australia. Si buscaste visitor o student, contanos el motivo real de esa búsqueda; usamos esas palabras para orientar la conversación, sin asignarte una visa ni dar por confirmados requisitos.'],
    audience: ['Querés visitar Australia y necesitás ordenar tu idea de viaje antes de consultar qué trámite corresponde a tu pasaporte y situación.', 'Estás considerando estudiar en Australia y querés preparar una consulta con información clara sobre el proyecto que tenés en mente.', 'Te interesa Work and Holiday y necesitás confirmar primero la elegibilidad, sin basarte en lo que pudo hacer alguien de otra nacionalidad.'],
    review: ['La elegibilidad queda por confirmar', 'Consultá con la autoridad australiana qué opciones corresponden a tu nacionalidad y proyecto. Para Work and Holiday no afirmamos elegibilidad paraguaya. Guardamos esa pregunta como pendiente, en lugar de convertir el nombre del programa en una invitación a solicitarlo.'],
    mistake: ['Elegir por el nombre de una visa', 'Que una categoría aparezca en una búsqueda no confirma que corresponda a tu caso. Revisá el destino, tu nacionalidad y lo que querés hacer antes de completar información o contratar preparación adicional.'],
    faq: [['¿Me orientan si quiero visitar Australia?', 'Sí. Empezamos por ordenar tu plan y tus preguntas para consultar las instrucciones oficiales, sin anticipar la categoría que corresponde.'], ['¿Puedo consultar por estudios?', 'Sí. Contanos qué proyecto estás considerando para preparar tus preguntas sobre el trámite con la autoridad australiana.'], ['¿Está confirmada mi elegibilidad para Work and Holiday?', 'No. Consultá la elegibilidad vigente para tu pasaporte con la autoridad australiana antes de preparar una solicitud.'], ['¿Publican aranceles o requisitos australianos?', 'No. Confirmá esas instrucciones con la autoridad australiana; esta página orienta la preparación de tu consulta.']],
  },
  ...[
    ['permanente', 'Residencia permanente', 'Residencia permanente en Paraguay: orientación', 'Querés establecerte en Paraguay y estás buscando información sobre residencia permanente. Revisamos tu punto de partida y las preguntas que necesitás plantear a Migraciones, sin asumir que esa vía corresponde automáticamente a tu caso.', 'Tu proyecto de radicación', 'Contanos si ya tenés un trámite previo y qué comunicación recibiste. Si buscás carné de residencia permanente o admisión permanente, identificamos a qué consulta te referís sin afirmar equivalencias, requisitos ni efectos que no estén confirmados.', 'Dar por hecha la residencia permanente', 'El nombre de la opción no confirma que tu situación encaje en ella. Antes de organizar una presentación, contrastá tu caso con Migraciones y conservá la respuesta que recibas.'],
    ['temporal', 'Residencia temporal', 'Residencia temporal en Paraguay: preparación del trámite', 'Si estás explorando la residencia temporal en Paraguay, empezá por ordenar tu situación actual y tu proyecto. Te ayudamos a preparar la consulta a Migraciones y a revisar la información que ya tenés, sin anticipar una decisión.', 'Tu situación al empezar', 'Anotá desde dónde consultás, tu nacionalidad y si ya recibiste indicaciones sobre residencia temporal. No tratamos la residencia temporal como una etapa obligatoria para todos; dejamos cualquier relación con otro trámite como pregunta para Migraciones.', 'Confundir temporal con precaria', 'Si tu búsqueda menciona residencia precaria, traé el documento o la indicación que motivó esa duda. No damos por hecho que esas expresiones describan el mismo trámite ni cambiamos su nombre por intuición.'],
    ['requisitos', 'Requisitos de residencia', 'Requisitos de residencia en Paraguay: qué consultar', 'Una lista encontrada en internet no alcanza para definir los requisitos de tu residencia en Paraguay. Te ayudamos a ordenar documentos y preguntas para que consultes tu caso con Migraciones antes de encargar gestiones que todavía no confirmaste.', 'Una lista de preguntas para tu caso', 'Anotá qué documento tenés, quién lo emitió y qué instrucción necesitás aclarar. Las preguntas sobre traducción, legalización o presentación se confirman con Migraciones; mencionarlas aquí no significa que sean exigencias para todas las personas.', 'Tomar una lista orientativa como requisito', 'No conviertas una experiencia ajena en una instrucción oficial. Marcá el origen de cada dato y verificá si corresponde a tu situación antes de pedir documentos o dar por completa la carpeta.'],
  ].map(([slug, label, title, lead, reviewTitle, reviewBody, errorTitle, errorBody]) => ({
    path: `/residencia-en-paraguay/${slug}/`, label, title,
    description: `Orientación sobre ${label.toLowerCase()} en Paraguay. Ordená tus documentos y preguntas para la Dirección Nacional de Migraciones.`,
    lead, focus: ['La autoridad del trámite', residencyFact], review: [reviewTitle, reviewBody], mistake: [errorTitle, errorBody],
    audience: ['Sos extranjero y querés preparar tu radicación en Paraguay con una revisión de tu situación, sin usar una lista ajena como respuesta definitiva.', 'Ya tenés documentos o comunicaciones sobre residencia y necesitás ordenar qué está confirmado, qué falta leer y qué debés consultar a Migraciones.', 'Estás organizando una mudanza con otras personas y querés separar las preguntas de cada integrante, sin asumir que todos tienen el mismo caso.'],
    faq: [['¿Dónde se tramita la residencia?', residencyFact], ['¿Esta página confirma mis requisitos?', 'No. Te ayudamos a preparar la consulta; las instrucciones aplicables a tu caso deben confirmarse ante la Dirección Nacional de Migraciones.'], ['¿Puedo consultar por radicación?', 'Sí. Usamos radicación para orientar la conversación sobre residencia en Paraguay, sin atribuirle requisitos adicionales ni un resultado automático.'], ['¿La asesoría decide mi residencia?', 'No. La residencia se tramita ante la Dirección Nacional de Migraciones. La preparación privada no sustituye ese trámite.']],
    image: 'residencia-en-paraguay-extranjeros-costanera-asuncion',
  })),
];
for (const d of newServices) {
  const page = service({ ...d, h1: d.title, eyebrow: 'Asesoría independiente · Preparación con vos',
    help: [d.focus, d.review,
      ['Inventario de información', 'Revisamos con vos lo que ya tenés y anotamos el origen de cada dato. Separar documentos disponibles de dudas pendientes permite conversar con claridad y evitar que una suposición termine presentada como información confirmada.'],
      ['Coherencia antes de avanzar', 'Comparamos nombres, antecedentes y el motivo que describís. Si aparece una diferencia, la señalamos para revisarla con vos; no inventamos una explicación ni completamos datos que todavía necesitás comprobar por tu cuenta.'],
      ['Preguntas por escrito', 'Armamos una lista concreta para la consulta oficial. Una pregunta bien planteada identifica tu situación y el punto que necesitás aclarar, sin pedir que alguien confirme de forma general todo un proyecto todavía indefinido.'],
      ['Alcance acordado', 'Antes de continuar, definimos qué preparación podemos hacer con vos y qué queda pendiente de otra entidad. Conservás una referencia clara de las tareas acordadas y de las respuestas que necesitás obtener para seguir.'],
    ],
    steps: [
      ['Contanos tu plan', 'Empezamos por tu nacionalidad, el destino y el motivo de la consulta. No necesitás compartir documentos sensibles en el primer mensaje.'],
      ['Ordenamos lo recibido', 'Leemos las indicaciones que ya tenés y distinguimos su origen. Si hay versiones diferentes, dejamos la diferencia visible para aclararla.'],
      ['Identificamos pendientes', 'Anotamos preguntas concretas antes de preparar material adicional. Un dato desconocido queda pendiente; no lo reemplazamos con la experiencia de otra persona.'],
      ['Confirmás las instrucciones', 'Consultá los puntos abiertos en la fuente oficial correspondiente. Con esa respuesta podemos revisar qué parte de tu preparación necesita ajustes.'],
      ['Revisamos con vos', 'Repasamos la información acordada y lo que sigue sin resolverse. La revisión privada organiza tu preparación y no anticipa el resultado del trámite.'],
    ],
    mistakes: [d.mistake,
      ['Completar por suposición', 'Si no recordás un dato, buscá la referencia antes de usarlo. Copiar una respuesta que parece razonable puede introducir una contradicción que después resulte difícil explicar con tus propios documentos.'],
      ['Confundir ayuda con decisión', 'La asesoría prepara información y preguntas. No controla decisiones oficiales ni disponibilidad de atención; mantené esa diferencia presente cuando evaluás cómo organizar tu próximo paso.'],
    ],
    extra: [{ type: 'prose', items: [{ title: d.path.startsWith('/residencia-') ? 'Alcance de la preparación y servicios consulares' : 'Decisiones sobre visas', body: `${d.path.startsWith('/residencia-') ? 'Para residencia, la autoridad es Migraciones. La siguiente aclaración corresponde a nuestros servicios de visas estadounidenses: ' : 'En nuestros servicios de visa estadounidense: '}${FACTS.F5}` }] }],
  });
  page.hero.image = d.image;
  if (d.path.startsWith('/residencia-en-paraguay/')) page.breadcrumbs = [{ label: 'Residencia en Paraguay', href: '/residencia-en-paraguay/' }, { label: d.label, href: d.path }];
  PAGES.push(page);
}

const newGuides = [guide({
  path: '/guias/embajada-de-estados-unidos-en-paraguay/', label: 'Embajada de Estados Unidos en Paraguay',
  title: 'Embajada de Estados Unidos en Paraguay: guía de citas',
  description: 'Cómo orientar tu consulta de visa a la Embajada de Estados Unidos en Paraguay. Citas oficiales y preparación privada, con roles claros.',
  h1: 'Embajada de Estados Unidos en Paraguay: citas y preparación',
  lead: 'Si buscaste la embajada americana en Paraguay, conviene distinguir la información oficial de una asesoría privada. Esta guía te ayuda a ordenar la preparación y a ubicar cada consulta en el canal que corresponde, sin presentar nuestro servicio como parte del gobierno estadounidense.',
  inline: { label: 'Preparar mi visa de turista', href: '/visa-americana/turista/', body: 'Podemos ayudarte a revisar tu preparación. La cita oficial y la entrevista consular son distintas de nuestra conversación de asesoría.' },
  parts: [
    ['embajada', 'La embajada está en Asunción', [
      'La Embajada de los Estados Unidos en Paraguay está en Asunción; las citas para visas se gestionan únicamente por el sistema oficial en línea, nunca por terceros. visas.com.py no es la embajada. Somos un servicio privado e independiente de asesoría y esta página es una guía para organizar tus preguntas, no un canal de atención consular.',
      'Para ubicarte antes de una cita, consultá la información oficial que corresponda a tu trámite. No publicamos una dirección de calle ni un teléfono. Tampoco tomes una foto de oficina de este sitio como referencia del lugar de atención: las imágenes son ilustrativas y no identifican una dependencia de la embajada. Revisá la procedencia de cualquier indicación antes de organizar tu traslado.',
    ]],
    ['citas', 'Las citas se hacen en el sistema oficial', [
      FACTS.F4,
      'La preparación privada puede ayudarte a entender qué información tenés y qué duda necesitás resolver. No crea una vía alternativa para agendar. Si alguien te ofrece coordinar por un canal diferente, contrastá esa indicación con el sistema oficial antes de seguir. Tu conversación por WhatsApp con nosotros inicia una consulta de asesoría; no es una reserva de entrevista en la embajada.',
      'Separá las tareas en tus notas: preparar datos, leer instrucciones oficiales y gestionar la cita son asuntos relacionados pero diferentes. Conservá las comunicaciones del sistema y verificá que estás leyendo las que corresponden a tu caso. No interpretes una respuesta de nuestro equipo como confirmación oficial de una cita ni como cambio de una instrucción consular.',
    ]],
    ['formulario', 'Revisá el formulario antes de la cita', [
      FACTS.F1,
      'Completá la información con tus antecedentes reales y revisá cualquier dato que no recordás. Usar las respuestas de un amigo puede introducir información que no describe tu viaje. Preparar el formulario con ayuda tiene sentido si vos entendés lo que dice y podés identificar de dónde sale cada respuesta antes de avanzar.',
      'Si conservás información de una solicitud anterior, leela con atención y distinguí qué sigue igual de lo que cambió. No cambies una respuesta solamente para que parezca más conveniente. Cuando encontrás una diferencia, anotá qué documento o recuerdo necesitás revisar. El objetivo de esta preparación es ordenar información verdadera, no escribir una historia que alguien pueda memorizar.',
    ]],
    ['documentos', 'Qué llevar: seguí las instrucciones de tu caso', [
      'Antes de preparar una carpeta, leé las indicaciones oficiales asociadas a tu cita. Esta guía no establece una lista universal de documentos exigidos. Como ejercicio de preparación, inventariá tus documentos y las comunicaciones que recibiste; después contrastá ese inventario con la instrucción oficial. Tener un documento disponible no significa que sea obligatorio presentarlo.',
      'Marcá cualquier duda sobre qué versión llevar o qué información verificar. Si viajás con familiares, separá las preguntas de cada persona en vez de asumir que una sola lista sirve para todos. No encargues material adicional solamente porque apareció en una publicación ajena. Una consulta concreta sobre una indicación que no entendés resulta más útil que acumular papeles sin saber para qué los preparaste.',
    ]],
    ['entrevista', 'La entrevista y el simulacro son distintos', [
      FACTS.F2,
      'El simulacro que ofrecemos es una práctica privada para explicar tu situación con claridad. Podés trabajar cómo describís tu motivo de viaje y cómo respondés cuando necesitás pensar antes de hablar. No se trata de memorizar frases ni de anticipar exactamente lo que te van a preguntar. Tu propia información sigue siendo el punto de partida.',
      FACTS.F5,
      'La preparación no permite anticipar esa decisión. Conservá la diferencia entre sentirte más ordenado para explicar tu viaje y conocer el resultado. Si una respuesta tuya no se entiende, revisamos qué querés decir con tus propios datos; no inventamos empleo, vínculos ni planes para reemplazar lo que realmente corresponde a tu situación.',
    ]],
    ['alcance', 'Qué corresponde a la asesoría privada', [
      'No confundas la función consular de la embajada con nuestro trabajo de preparación privada. visas.com.py revisa información con vos y ayuda a ordenar preguntas; no habla en nombre de la embajada ni emite decisiones consulares. Una consulta por nuestros servicios tampoco sustituye la gestión de la cita mediante el sistema oficial.',
      'Si necesitás apoyo, contanos primero si estás preparando una solicitud, una renovación o una revisión después de una negativa. Podemos orientarte hacia el servicio relacionado con esa etapa. Para instrucciones oficiales y citas, acudí al canal correspondiente. Mantené esa separación también al guardar mensajes: identificá qué viene del sistema oficial y qué forma parte de la preparación que acordaste con nosotros.',
    ]],
  ],
}), guide({
  path: '/guias/migraciones-paraguay/', label: 'Migraciones Paraguay',
  title: 'Migraciones Paraguay: guía para preparar tu residencia',
  description: 'Qué consultar a Migraciones Paraguay sobre residencia temporal, permanente y requisitos. Ordená tu radicación sin asumir condiciones.',
  h1: 'Migraciones Paraguay: prepará tu consulta de residencia',
  lead: 'Buscar Migraciones Paraguay puede ser el comienzo de una mudanza o una duda sobre un trámite que ya empezaste. Esta guía te ayuda a ordenar la consulta de residencia y a distinguir la información oficial de la preparación privada que podemos hacer con vos.',
  inline: { label: 'Ver el hub de residencia en Paraguay', href: '/residencia-en-paraguay/', body: 'Elegí entre residencia temporal, permanente y requisitos para organizar tu próxima consulta según la duda que tenés hoy.' },
  parts: [
    ['autoridad', 'La Dirección Nacional de Migraciones y la residencia', [
      residencyFact,
      'Si tu búsqueda dice inmigración Paraguay o radicación, empezá por precisar qué querés consultar. Podés estar explorando una mudanza, revisando una comunicación recibida o intentando entender qué documentación preparar. Anotar esa diferencia te ayuda a plantear una pregunta concreta, sin pedir una respuesta general que mezcle situaciones distintas.',
      'visas.com.py es una asesoría privada e independiente. No es la Dirección Nacional de Migraciones ni un canal para obtener una decisión oficial sobre residencia. Podemos ayudarte a ordenar la preparación y las preguntas, pero la conversación con nosotros no sustituye el trámite ante la autoridad. Conservá esa distinción al interpretar cualquier orientación que recibas durante tu planificación.',
    ]],
    ['consulta', 'Dónde consultar y cómo ordenar la pregunta', [
      'La referencia para el trámite de residencia es la Dirección Nacional de Migraciones. Consultá sus canales oficiales para confirmar dónde y cómo corresponde presentar tu consulta. Esta guía no publica direcciones de atención ni teléfonos, y no ofrece una ubicación de oficina como si estuviera verificada. La foto que acompaña la página es ilustrativa de una asesoría, no de Migraciones.',
      'Antes de organizar un traslado, escribí qué necesitás resolver y qué información ya recibiste. Si estás fuera de Paraguay, dejá clara esa situación en tu pregunta. Si ya tenés una comunicación sobre un trámite, identificá el asunto sin compartir datos sensibles innecesariamente. Una pregunta que describe tu punto de partida permite evitar respuestas pensadas para otra persona o para una etapa diferente.',
    ]],
    ['opciones', 'Temporal y permanente: empezá por tu situación', [
      'Existen la residencia temporal y la residencia permanente. Eso no permite concluir desde esta guía cuál corresponde a tu caso ni cómo se relacionan en tu situación. Antes de elegir por el nombre, anotá tu nacionalidad, dónde vivís y qué proyecto tenés en Paraguay. Si ya empezaste una gestión, agregá qué indicaciones recibiste hasta ahora.',
      'Nuestro hub separa las páginas de residencia temporal, permanente y requisitos para que encuentres la conversación que necesitás. Son puntos de entrada a la preparación, no confirmaciones de elegibilidad. Si buscás admisión permanente, carné o residencia precaria, conservá la expresión que aparece en tu documento y consultá su significado a Migraciones; no asumas que todas esas búsquedas nombran una misma gestión.',
    ]],
    ['requisitos', 'Qué necesitás: confirmar antes de encargar documentos', [
      'Esta página no establece una lista oficial de requisitos. Para preparar tu consulta, armá un inventario con el nombre de cada documento que ya tenés, su emisor y la duda que querés aclarar. Si recibiste una lista, anotá quién te la dio y a qué trámite se refiere antes de tratarla como una instrucción aplicable a vos.',
      'Las preguntas sobre traducción, legalización o forma de presentación deben confirmarse para tu caso. Mencionarlas no significa que se exijan siempre. Evitá encargar gestiones solamente porque otra persona las hizo. Podés organizar los pendientes en lenguaje sencillo: qué tengo, qué me indicaron y qué necesito confirmar. Esa separación permite revisar la preparación sin convertir cada duda en una obligación que nadie te pidió.',
    ]],
    ['familia', 'Una mudanza compartida necesita preguntas individuales', [
      'Si organizás la llegada con tu familia, prepará un resumen separado para cada integrante. Es una forma de ordenar la conversación, no una afirmación sobre requisitos familiares. Anotá nacionalidad, situación actual y las indicaciones recibidas por cada persona; después identificá qué dudas comparten y cuáles conviene consultar de manera individual.',
      'No copies automáticamente un dato o una instrucción de una carpeta a otra. Si alguien ya hizo una consulta, revisá a quién se refería la respuesta. Durante la preparación privada podemos ayudarte a mantener esa información ordenada. Cualquier conclusión sobre el trámite aplicable necesita la confirmación correspondiente ante Migraciones, incluso cuando el proyecto de mudanza es el mismo para toda la familia.',
    ]],
    ['siguiente', 'Tu próximo paso después de leer la guía', [
      'Elegí una pregunta pendiente que te impida avanzar y formulala con tu situación real. Por ejemplo, podés necesitar aclarar a qué trámite corresponde una comunicación que ya tenés. Guardá la respuesta oficial junto con la pregunta original; así podés revisar después qué quedó confirmado y qué asunto todavía no fue tratado, sin depender de un recuerdo incompleto.',
      'Si preferís apoyo para ordenar esa preparación, escribinos y contanos desde dónde consultás y cuál es tu principal duda. No necesitás enviar documentos sensibles para empezar. Nuestro trabajo consiste en revisar información con vos y definir un alcance de ayuda concreto. La radicación se tramita ante Migraciones; una guía o una conversación privada no anticipa el resultado ni reemplaza sus instrucciones.',
    ]],
  ],
})];
GUIDES.push(...newGuides);
PAGES.push(...newGuides);
PAGES.find(p => p.path === '/guias/').sections[0].items = GUIDES.map(g => ({ eyebrow: 'Guía de preparación', title: g.label, body: g.description, href: g.path, tag: 'Leé la guía' }));
PAGES.find(p => p.path === '/guias/').description = 'Guías sobre visa americana, DS-160, embajada y Migraciones Paraguay. Ordená tus preguntas de visa y residencia con información clara.';
PAGES.find(p => p.path === '/guias/como-llenar-el-ds-160/').title = 'Formulario DS-160: cómo llenarlo desde Paraguay';
PAGES.find(p => p.path === '/').hero.lead = 'Prepará tu visa para Estados Unidos desde Paraguay con nosotros: evaluamos tu caso, completamos el DS-160 con vos, te orientamos en el sistema oficial de citas y practicamos la entrevista.';
const usTitles = {
  '/visa-americana/': 'Visa americana desde Paraguay: asesoría y preparación',
  '/visa-americana/turista/': 'Visa de turista a Estados Unidos desde Paraguay',
  '/visa-americana/renovacion/': 'Renovar visa americana desde Paraguay',
  '/visa-americana/estudiante/': 'Visa de estudiante a Estados Unidos desde Paraguay',
  '/visa-americana/trabajo/': 'Visa de trabajo a Estados Unidos desde Paraguay',
  '/visa-americana/entrevista/': 'Entrevista de visa americana desde Paraguay',
  '/visa-americana/denegada/': 'Visa americana denegada: nueva solicitud desde Paraguay',
};
for (const p of PAGES) if (usTitles[p.path]) p.title = usTitles[p.path];
SERVICES.push(...newServices.filter(d => !d.path.startsWith('/residencia-')).map(d => ({ icon: d.path === '/work-and-travel/' ? 'graduation-cap' : 'plane', href: d.path, eyebrow: 'Otros destinos', title: d.label, body: d.description, tag: 'Preparación' })));
Object.assign(NAV.find(n => n.href === '/visa-canada/'), { label: 'Otros destinos', href: '/#servicios', children: ['/visa-canada/', '/visa-espana/', '/visa-australia/', '/work-and-travel/'].map(href => ({ label: SERVICES.find(s => s.href === href).title, href })) });
const residencyTickets = newServices.filter(d => d.path.startsWith('/residencia-')).map(d => ({ icon: 'house', eyebrow: 'Radicación en Paraguay', title: d.label, body: d.description, href: d.path, tag: 'Preparación' }));
PAGES.find(p => p.path === '/residencia-en-paraguay/').sections.unshift({ type: 'services', title: 'Elegí qué necesitás revisar sobre tu residencia', items: residencyTickets });
PAGES.find(p => p.path === '/residencia-en-paraguay/').sections.find(s => s.type === 'prose').items[0].links.push({ label: 'Guía de Migraciones Paraguay', href: '/guias/migraciones-paraguay/' });
PAGES.find(p => p.path === '/preguntas-frecuentes/').sections[0].items.push(...questions([
  ['¿Cuánto cuesta la visa americana?', FACTS.F3],
  ['¿Necesito visa para México?', FACTS.F9],
  ['¿Necesito visa para China?', 'Consultá los requisitos vigentes con el consulado de China.'],
  ['¿Necesito visa para Japón?', 'Consultá los requisitos vigentes con el consulado de Japón.'],
  ['¿Necesito visa para el Reino Unido?', `${FACTS.F9} Consultá las instrucciones vigentes con el consulado del Reino Unido.`],
]));

// Complete the existing navigation groups without adding another top-level row.
NAV.find(n => n.href === '/residencia-en-paraguay/').children = [
  ...residencyTickets.map(t => ({ label: t.title, href: t.href })),
  { label: 'Residency in English', href: '/en/residency-in-paraguay/', lang: 'en' },
];
NAV.find(n => n.href === '/guias/').children = GUIDES.map(g => ({ label: g.label, href: g.path }));
NAV.find(n => n.href === '/contacto/').children = [
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes/' }, { label: 'Nosotros', href: '/nosotros/' },
];
FOOTER[0].links = [{ label: 'Visa americana', href: '/visa-americana/' }, ...SERVICES.map(s => ({ label: s.title, href: s.href })), { label: 'Residency in English', href: '/en/residency-in-paraguay/' }];
FOOTER[0].links.push(...residencyTickets.map(t => ({ label: t.title, href: t.href })));
FOOTER[1].links = [{ label: 'Todas las guías', href: '/guias/' }, ...GUIDES.map(g => ({ label: g.label, href: g.path }))];

export const EN_LABELS = {
  'Otros destinos': 'Other destinations', 'Visa España': 'Spain visa', 'Visa Australia': 'Australia visa',
  'Residencia permanente': 'Permanent residency', 'Residencia temporal': 'Temporary residency',
  'Requisitos de residencia': 'Residency requirements', 'Migraciones Paraguay': 'Paraguay migration authority',
  'Embajada de Estados Unidos en Paraguay': 'US Embassy in Paraguay',
  'Inicio': 'Home', 'Visa americana': 'US visas', 'Canadá': 'Canada', 'Residencia en Paraguay': 'Residency in Paraguay',
  'Guías': 'Guides', 'Contacto': 'Contact', 'Visa de turista': 'Visitor visa', 'Renovación de visa': 'Visa renewal',
  'Visa de estudiante': 'Student visa', 'Visa de trabajo': 'Work visa', 'Preguntas de la entrevista': 'Interview preparation',
  'Visa denegada': 'After a visa refusal', 'Visa para Canadá': 'Canada visa', 'Servicios': 'Services', 'Empresa': 'About',
  'Nosotros': 'About us', 'Preguntas frecuentes': 'Frequently asked questions', 'Privacidad': 'Privacy',
  'Dejanos tu consulta': 'Send an enquiry', 'Todas las guías': 'All guides',
  'Requisitos de visa americana': 'US visa preparation requirements', 'Cómo llenar el DS-160': 'Completing the DS-160',
  'Preguntas de entrevista': 'Interview questions', 'Visa denegada bajo 214(b)': 'Visa refusal under 214(b)',
  'Asunción, Paraguay. Respondemos en horario de oficina, lun-vie.': 'Asunción, Paraguay. We respond during office hours, Monday to Friday.',
};

const IMAGE_SLOTS = [
 ['pareja-paraguaya-aeropuerto-asuncion-pasaportes', ['/']],
 ['pasaporte-formulario-ds-160-escritorio-terere', ['/visa-americana/', '/guias/', '/guias/como-llenar-el-ds-160/']],
 ['visa-de-turista-viajera-calle-miami', ['/visa-americana/turista/', '/guias/requisitos-visa-americana-paraguay/']],
 ['renovacion-visa-pasaporte-sellos-asuncion', ['/visa-americana/renovacion/']],
 ['visa-de-estudiante-campus-universidad-estados-unidos', ['/visa-americana/estudiante/']],
 ['visa-de-trabajo-obrero-estados-unidos', ['/visa-americana/trabajo/']],
 ['simulacro-entrevista-visa-oficina-asuncion', ['/visa-americana/entrevista/', '/guias/preguntas-entrevista-visa-americana/']],
 ['visa-denegada-revisar-documentos-en-casa', ['/visa-americana/denegada/', '/guias/visa-americana-denegada-214b/']],
 ['visa-canada-viajero-toronto-cn-tower', ['/visa-canada/']],
 ['residencia-en-paraguay-extranjeros-costanera-asuncion', ['/residencia-en-paraguay/', '/en/residency-in-paraguay/']],
];
for (const page of PAGES) {
 page.hero.image = IMAGE_SLOTS.find(([, routes]) => routes.includes(page.path))?.[0] || page.hero.image;
 if (page.path === '/guias/migraciones-paraguay/') page.hero.image = 'oficina-asesoria-de-visas-asuncion';
 if (page.path === '/nosotros/') page.hero.introImage = 'oficina-asesoria-de-visas-asuncion';
 for (const section of page.sections) {
  if (section.type === 'contact') section.image = 'oficina-asesoria-de-visas-asuncion';
  if (page.type === 'home' && section.type === 'checklist') section.image = 'simulacro-entrevista-visa-oficina-asuncion';
  if (page.type === 'home' && section.type === 'teaser') section.image = 'residencia-en-paraguay-extranjeros-costanera-asuncion';
 }
}

// P4: English services are separate from the Spanish home ticket collection.
export const RESIDENCY_GUIDE_URL = 'https://paraguayresidencyguide.com';
export const F5_EN = 'The competent authority decides each application.';
export const EN_NAV = [
  { label: 'Paraguay visa', href: '/en/paraguay-visa/' },
  { label: 'US visa', href: '/en/us-visa-from-paraguay/' },
  { label: 'Canada visa', href: '/en/canada-visa-from-paraguay/' },
  { label: 'Residency', href: '/en/residency-in-paraguay/' },
  { label: 'Contact', href: '/en/contact/' },
  { label: 'ES', href: '/' },
];
const entryPage = service({
  path: '/en/paraguay-visa/', lang: 'en', label: 'Paraguay entry visa', eyebrow: 'Paraguay · Before you travel',
  title: 'Paraguay visa: entry advice in English | visas.com.py',
  description: 'Check your Paraguay entry visa route by nationality. Get help preparing a consular file and coordinating an appointment before you travel.',
  h1: 'Paraguay visa: check your route before you travel',
  lead: 'Whether you need a visa to enter Paraguay depends on your nationality. We help you check the route that applies to you and prepare a consular application when one is needed, without treating another traveller’s experience as your instructions.',
  audience: [
    'You are planning a visit and want to check whether your nationality allows visa-free entry, a visa on arrival or requires a consular application before travel.',
    'You have found conflicting advice online and need to separate your own entry questions from someone else’s experience with a different passport.',
    'You need help organising a consular file and coordinating the appointment once the applicable route and instructions have been confirmed.',
  ],
  help: [
    ['Check your nationality and route', 'Some nationalities enter visa-free, some eligible nationalities can obtain a visa on arrival at Silvio Pettirossi airport in Asunción, and others must apply at a Paraguayan consulate before travelling. We check which route applies to you.'],
    ['Clarify your purpose', 'Tell us whether you are planning tourism, a business visit or something else. We use your actual plans to frame the questions for the relevant consulate instead of guessing from a broad visa label.'],
    ['Review document instructions', 'We help check what the consulate asks for in your case. Questions can include how to present your passport details, travel purpose and supporting material; this is a preparation discussion, not a universal required-document list.'],
    ['Prepare the consular file', 'Once instructions are confirmed, we help organise the information and documents for your application. You review the details with us so that the file reflects your circumstances and any unresolved questions stay visible.'],
    ['Coordinate the appointment', 'We help coordinate the consular appointment according to the applicable instructions. Availability and the assessment remain with the authority; our involvement does not establish eligibility or decide whether you may enter.'],
  ],
  steps: [
    ['Tell us your starting point', 'Share your nationality, where you live and the purpose of your intended visit.'],
    ['Check the entry route', 'We identify which nationality-dependent route needs confirmation before you make travel arrangements.'],
    ['Confirm the instructions', 'We organise questions for the consulate where a pre-travel application is needed.'],
    ['Prepare and coordinate', 'We review the consular file with you and help coordinate the appointment.'],
    ['Follow the authority’s response', 'Read the instructions issued for your case and resolve open questions before travelling.'],
  ],
  mistakes: [
    ['Assuming every passport is treated alike', 'Advice from another traveller may concern a different nationality. Start with your own passport and route.'],
    ['Confusing entry with residency', 'For residency, citizenship or living in Paraguay, use the separate Paraguay Residency Guide linked from our residency page.'],
    ['Treating a checklist as official confirmation', 'An online list cannot confirm your individual instructions. Check the consulate’s requirements before preparing the file.'],
  ],
  faq: [
    ['Do Indian citizens need a Paraguay visa?', 'The route depends on nationality. We check the current route for your Indian passport with the relevant authority before advising on preparation.'],
    ['Do Pakistani citizens need a Paraguay visa?', 'Entry routes depend on nationality. We check the route for your Pakistani passport rather than assuming that another traveller’s arrangements apply.'],
    ['Do Bangladeshi citizens need a Paraguay visa?', 'We check the nationality-dependent route for your Bangladeshi passport and whether a consular application is needed before travel.'],
    ['Do Filipino citizens need a Paraguay visa?', 'The answer depends on the nationality rules. We check the route for your Philippine passport before helping you prepare any consular file.'],
    ['Is a visa on arrival available in Paraguay?', 'Some eligible nationalities can obtain a visa on arrival at Silvio Pettirossi airport in Asunción. We check your nationality; do not assume this route applies to you.'],
    ['Can I apply for a Paraguay e-visa?', 'We do not assume an online route is available. We check your nationality-dependent entry route and confirm application instructions with the relevant consulate.'],
    ['What are the Paraguay tourist visa requirements?', 'They need to be checked for your nationality and route. We help confirm the consular document instructions for your intended visit, without presenting a universal checklist.'],
    ['Is a business visit the same as tourism?', 'Tell us your actual purpose. We check your nationality-dependent route and ask the consulate which instructions apply to your plans.'],
    ['Can you help with a Paraguay work visa?', 'We start with your nationality and proposed activity, then clarify the entry route and the questions to put to the authority. We do not treat an entry route as permission to work.'],
    ['Does a US citizen need a Paraguay visa?', 'We check the route for your US passport under the nationality rules. We do not infer your entry arrangements from residence in another country.'],
  ],
});
entryPage.hero.image = 'paraguay-entry-visa-arrivals-hall-asuncion';
const usPage = service({
  path: '/en/us-visa-from-paraguay/', lang: 'en', label: 'US visa from Paraguay', eyebrow: 'United States · Visitor visa',
  title: 'US visa from Paraguay: English help | visas.com.py',
  description: 'US visitor visa preparation in English from Paraguay: DS-160 review, official appointment guidance and interview practice for your circumstances.',
  h1: 'Apply for a US visa from Paraguay with clear preparation',
  lead: 'Applying from Paraguay can raise extra questions when you hold another country’s passport. We help foreign residents and Paraguayans who prefer English prepare a US visitor visa application, starting with their real travel plans and the instructions that apply to their case.',
  audience: [
    'You are a third-country national living in Paraguay and want to check the applicable embassy instructions before preparing a US visa application in Asunción.',
    'You are Paraguayan and prefer to discuss your visitor visa application in English, including the form, documents and interview preparation.',
    'You have started a DS-160 but want to review the information against your circumstances before continuing with the official appointment process.',
  ],
  help: [
    ['Review your circumstances', 'We ask about your nationality, where you live, your travel purpose and any previous applications. Applying from Paraguay does not itself establish that the embassy will accept your case; the applicable instructions need checking.'],
    ['Work through the DS-160', 'The DS-160 is completed online in English before scheduling the appointment. We work through the questions with you and ask you to confirm the information rather than filling gaps with assumptions.'],
    ['Check the supporting information', 'We review whether the information you plan to present matches the form and your travel purpose. Your documents should describe your actual circumstances, including questions that still need clarification before you proceed.'],
    ['Explain the official appointment system', 'The US Embassy in Paraguay is in Asunción. Visa appointments are managed only through the official online system, never through third parties. We guide you through the instructions; we do not provide a separate appointment channel.'],
    ['Practise the interview', 'We help you explain your plans clearly in your own words. Practice is a chance to identify confusing details, not to memorise a story or hide information that matters to your application.'],
    ['Review the final preparation', 'We go through the information and the appointment instructions with you. You remain responsible for confirming your answers, and the consular officer alone decides the application during the interview.'],
  ],
  steps: [
    ['Discuss your trip', 'Tell us your nationality, residence and reason for visiting the United States.'],
    ['Review the form', 'We complete and check the DS-160 with you before the appointment stage.'],
    ['Use the official system', 'Follow the payment and appointment instructions at ais.usvisa-info.com, after checking applicability to your case.'],
    ['Practise clear answers', 'Talk through your purpose and circumstances without rehearsing a false version of events.'],
    ['Attend the interview', 'The interview takes place at the US Embassy in Asunción. The decision belongs to the officer.'],
  ],
  mistakes: [
    ['Assuming local residence settles eligibility', 'A Paraguay address is not a substitute for checking the embassy’s instructions for your nationality and circumstances.'],
    ['Leaving contradictions in the form', 'If dates or details do not match, review them before proceeding. Do not guess an answer to move past a question.'],
    ['Buying a promised outcome', 'Preparation cannot decide the result. We help organise your case and practise an honest explanation of your plans.'],
  ],
  faq: [
    ['Can a foreign resident apply from Paraguay?', 'We first check the embassy instructions for your nationality and residence. We do not assume every third-country national can apply in Asunción simply because they are currently in Paraguay.'],
    ['Can Paraguayans use this English service?', 'Yes. You can discuss your preparation with us in English. The DS-160 is completed in English, and we review your own information with you.'],
    ['Do you book through a separate embassy channel?', 'No. Appointments are managed only through the official online system. We help you understand the instructions and prepare, without claiming special access to appointments.'],
    ['Will interview practice secure a visa?', 'No. Practice helps you explain your circumstances clearly. The competent authority decides each application.'],
    ['What should I send in my first message?', 'Start with your nationality, where you live and your travel purpose. Tell us if you have already submitted a form; sensitive document copies are not needed to open the conversation.'],
  ],
});
usPage.hero.image = 'expat-us-visa-application-office-asuncion';
const canadaPage = service({
  path: '/en/canada-visa-from-paraguay/', lang: 'en', label: 'Canada visa from Paraguay', eyebrow: 'Canada · Visits and studies',
  title: 'Canada visa from Paraguay: English advice | visas.com.py',
  description: 'English guidance on Canadian visitor visa and study permit preparation from Paraguay. Review your purpose, documents and online application.',
  h1: 'Canada visa from Paraguay: prepare for your purpose',
  lead: 'A visit to Canada and a plan to study there call for different preparation. We help you organise your questions, documents and online application in English, with visitor visa support and study permit orientation based on your actual plans.',
  audience: [
    'You live in Paraguay and want to prepare a Canadian visitor visa application with a clear account of your travel purpose and how you plan to support the visit.',
    'You are exploring studies in Canada and need help separating questions for the institution from questions about a study permit application.',
    'You have started an online application and want to review your information, supporting documents or biometrics instructions before taking the next step.',
  ],
  help: [
    ['Clarify the purpose', 'We start with your nationality, where you live and what you intend to do in Canada. A visitor visa discussion and a study permit discussion should reflect different plans, rather than reuse someone else’s application.'],
    ['Organise the document inventory', 'Together, we list what you have and which instructions still need checking. This makes gaps easier to discuss without assuming that a document prepared for another destination will suit a Canadian application.'],
    ['Review the online answers', 'We help you read the questions and compare your answers with the supporting information. You confirm the details before proceeding; uncertain information should be resolved rather than replaced with a convenient guess.'],
    ['Orient the study permit preparation', 'We help you organise questions about the study plan and the material from your institution. We do not treat admission as an immigration decision, and we keep institutional and application responsibilities clear.'],
    ['Review biometrics instructions', 'If you receive biometrics instructions for your application, we help you understand what they ask and organise the next questions. Follow the instructions issued for your own case rather than a previous applicant’s schedule.'],
    ['Check the file together', 'We review the preparation as a whole so the purpose, answers and documents tell a consistent story. The Canadian authority assesses the application; our review cannot assure or promise a decision.'],
  ],
  steps: [
    ['Describe the plan', 'Tell us whether you are visiting or considering studies, and where you currently live.'],
    ['Confirm the instructions', 'We identify the application questions and document instructions that need checking for your circumstances.'],
    ['Prepare the material', 'We organise your information and review the online answers with you for consistency.'],
    ['Follow individual requests', 'Review any further instructions, including biometrics where relevant, against your own application.'],
    ['Keep the decision separate', 'Follow the authority’s response. Completing the preparation does not establish the outcome of the application.'],
  ],
  mistakes: [
    ['Mixing a visit with a study plan', 'Explain what you actually intend to do. An unclear purpose makes it harder to prepare coherent information.'],
    ['Reusing another country’s checklist', 'Canadian instructions need their own review. Documents assembled for a US application do not establish what Canada asks of you.'],
    ['Treating submission as approval', 'Sending an application is a procedural step. It does not mean that the authority has accepted your plans or decided the result.'],
  ],
  faq: [
    ['Do you help with visitor visas?', 'Yes. We help organise visitor visa preparation, review the online information and clarify document questions. We start with your circumstances rather than assume a single checklist fits everyone.'],
    ['Do you help with study permits?', 'We provide orientation on preparing the application and organising questions about your study plan. The institution and the Canadian authority have separate responsibilities; neither decision is ours.'],
    ['Will I need biometrics?', 'We help you review the applicable instructions and any request issued for your case. Do not arrange the next step solely on the basis of another applicant’s experience.'],
    ['Can I use documents from my US application?', 'We can review what you already hold, but Canadian instructions must be checked separately. We do not assume that the same document set or answers will be suitable.'],
    ['How do I start in English?', 'Send your nationality, where you live and whether your plan is a visit or studies. Tell us what you have already started so we can discuss the appropriate preparation.'],
  ],
});
canadaPage.hero.image = 'visa-canada-viajero-toronto-cn-tower';
canadaPage.hero.imageAlt = 'Traveller with a suitcase overlooking Toronto and the CN Tower at sunset';
const residencyBridge = {
  type: 'simple', path: '/en/residency-in-paraguay/', lang: 'en', label: 'Residency in Paraguay', waContext: 'Residency bridge: entry, US or Canada visa',
  title: 'Residency in Paraguay: where to start | visas.com.py',
  description: 'Find the Paraguay Residency Guide for residency, citizenship and living in Paraguay. Contact visas.com.py for entry, US or Canada visa preparation.',
  hero: { eyebrow: 'Planning your move', title: 'Residency in Paraguay: start with the guide', lead: 'For questions about settling in Paraguay, start with the Paraguay Residency Guide. It is the place to explore residency, citizenship and living in Paraguay, and to organise the questions that matter to your own move.', image: 'residencia-en-paraguay-extranjeros-costanera-asuncion', imageAlt: 'A couple walking along the Costanera in Asunción with Palacio de López in the background' },
  sections: [
    { type: 'prose', items: [
      { title: 'Temporary and permanent residency', body: 'Paraguay has temporary and permanent residency routes. Applications are handled by the Dirección Nacional de Migraciones, the national migration authority. These routes need to be considered in light of your circumstances; this short page does not set out eligibility criteria or a document checklist. Use the guide to frame your questions and check the official instructions for your application.' },
      { title: 'Read the Paraguay Residency Guide', body: 'Continue to the guide for residency, citizenship and everyday life in Paraguay. Keep your nationality, current location and plans in mind as you read. Information is a starting point for understanding your options, not an individual decision from the migration authority.', links: [{ label: 'Visit the Paraguay Residency Guide', href: RESIDENCY_GUIDE_URL, rel: 'noopener' }] },
    ] },
    { type: 'cta', title: 'Also need help with a visa?', body: 'Contact us on WhatsApp if you also need an entry visa for Paraguay or help preparing a US or Canada visa application. Tell us your nationality, where you live and your destination so we can discuss the visa question separately from your residency plans.', label: 'Ask about an entry, US or Canada visa' },
  ],
};
const enTickets = [entryPage, usPage, canadaPage, residencyBridge].map((p, i) => ({ href: p.path, eyebrow: i === 3 ? 'Planning your move' : 'Visa preparation', title: p.label, body: p.description, tag: i === 3 ? 'Guide' : 'English', icon: ['passport', 'plane', 'maple-leaf', 'house'][i] }));
PAGES.push(entryPage, usPage, canadaPage, residencyBridge, {
  type: 'en-index', path: '/en/', lang: 'en', label: 'Visa help in Paraguay', waContext: 'English visa help in Paraguay',
  title: 'Visa help in Paraguay | visas.com.py',
  description: 'Visa advice in English: entry to Paraguay, US and Canada applications from Paraguay, and a separate guide for residency questions.',
  hero: { eyebrow: 'Independent advice · In English', title: 'Your visa plans, clearly prepared.', lead: 'Coming to Paraguay or planning a trip from here? Start with your nationality, where you live and your destination. We help you prepare your application with clear information and honest answers.', primary: 'Discuss my visa enquiry', image: 'expat-us-visa-application-office-asuncion' },
  sections: [{ type: 'services', title: 'Where would you like to start?', body: 'Choose your destination for visa preparation. For settling in Paraguay, follow the residency page to the separate guide.', items: enTickets }],
});

export const EN_VISA_OPTIONS = ['Paraguay entry visa', 'US visitor visa', 'US visa renewal', 'Canada visa', 'Other'];
PAGES.find(p => p.path === '/').sections.find(s => s.type === 'services').groups = [
 { title: 'Estados Unidos', body: 'Elegí la preparación que corresponde a tu trámite estadounidense.', items: SERVICES.slice(0, 6) },
 { title: 'Otros destinos', body: 'Explorá la orientación para tu próximo destino o intercambio.', items: ['/visa-canada/', '/visa-espana/', '/visa-australia/', '/work-and-travel/'].map(href => SERVICES.find(s => s.href === href)) },
 { title: 'Paraguay', body: 'Conocé la orientación para establecerte en Paraguay.', items: SERVICES.filter(s => s.href === '/residencia-en-paraguay/') },
];
PAGES.push(
 { type: 'simple', lang: 'en', path: '/en/contact/', label: 'Contact', waContext: 'English contact form',
 title: 'Contact us for visa advice | visas.com.py', description: 'Tell us about your destination and visa enquiry. Leave your phone number or contact us on WhatsApp for advice in English.',
 hero: { eyebrow: 'Let’s talk', title: 'Tell us about your travel plans.', lead: 'Share your destination and your main question so we can discuss your next step.' },
 sections: [{ type: 'contact', title: 'Your enquiry', body: 'Your phone number is the only required detail.', alternative: 'Prefer to message us directly?', alternativeBody: 'Open WhatsApp and tell us about the trip you have in mind.' }] },
 { type: 'simple', lang: 'en', path: '/en/thank-you.html', label: 'Thank you', waContext: 'English enquiry follow-up', sitemap: false,
 title: 'Thank you for your enquiry | visas.com.py', description: 'Your enquiry has been sent. Continue the conversation on WhatsApp or return to our English home page.',
 hero: { eyebrow: 'Enquiry sent', title: 'Thank you for sharing your plans.', lead: 'We will review your enquiry. We reply during office hours, Monday to Friday. You can add more details on WhatsApp.', primary: 'Continue on WhatsApp', secondary: { label: 'Back to home', href: '/en/' } }, sections: [] }
);

// P6: editorial guides, contextual links and the single language-pair registry.
const p6Guides = [guide({
  path: '/guias/cuanto-cuesta-la-visa-americana/', label: 'Cuánto cuesta la visa americana',
  title: 'Cuánto cuesta la visa americana desde Paraguay',
  description: 'Conocé el arancel MRV, cómo se paga y qué gastos separar al preparar tu visa americana desde Paraguay, sin confundir asesoría con decisión.',
  h1: 'Cuánto cuesta la visa americana: ordená tu presupuesto',
  lead: 'Si buscás el precio de la visa americana, empezá por separar el arancel oficial de los gastos de preparación. Así podés decidir qué necesitás y preguntar por cada concepto sin confundir un pago con el resultado.',
  inline: { label: 'Ver preparación de visa de turista', href: '/visa-americana/turista/', body: 'Si tu consulta es por turismo, contanos qué parte de la solicitud necesitás preparar y revisamos el alcance de la asesoría con vos.' },
  parts: [
    ['arancel-mrv', 'El arancel MRV y su alcance', [
      FACTS.F3,
      'Ese importe corresponde al arancel de solicitud para la categoría indicada. No lo interpretes como el precio de una visa ya aprobada ni como un presupuesto que reúne todo lo que vas a gastar. Para organizarte, anotá el arancel por separado y dejá otra parte de tu presupuesto para los gastos personales y la preparación que elijas.',
      'La condición de no devolución importa antes de pagar. Pensá si tenés claro el propósito del viaje y si podés explicar tu situación con información verdadera. La preparación sirve para revisar esos puntos; no transforma el arancel en una compra de aprobación. Si una explicación comercial mezcla ambos conceptos, pedí que te los aclaren antes de continuar.',
    ]],
    ['pago-oficial', 'Dónde se gestiona el pago', [
      FACTS.F4,
      'Consultá las instrucciones dentro del sistema oficial para tu propia solicitud. Evitá copiar indicaciones de pago de una captura vieja o de la experiencia de otra persona. Guardá el comprobante y distinguí ese registro de cualquier conversación sobre asesoría privada. Al revisar tu presupuesto, identificá qué concepto pagaste y cuál sigue pendiente de aclaración.',
      FACTS.F1,
      'Ordená la preparación del formulario antes de pensar en la cita. Tener apuro por pagar no resuelve una respuesta que todavía no entendés. Leé tus datos, comparalos con tu pasaporte y marcá las dudas para revisarlas. Esa revisión te ayuda a decidir con más claridad qué apoyo necesitás y qué podés preparar por tu cuenta.',
    ]],
    ['otros-gastos', 'Qué más conviene presupuestar', [
      FACTS.F2,
      'Si tenés que trasladarte, contemplá el transporte a Asunción dentro de tu organización personal. Separá ese gasto del arancel: no describe lo mismo y depende de cómo organices tu viaje. Anotá las alternativas que estás considerando y revisalas cuando tengas clara tu cita, sin presentar una estimación propia como si fuera un costo oficial.',
      'Las fotos y las traducciones, si fueran necesarias según las instrucciones aplicables, son otros conceptos para consultar. No encargues material por repetir una lista ajena. Primero identificá qué necesitás, después preguntá por el trabajo concreto. Esta guía no fija formatos, documentos para traducir ni cantidades; dejá esas dudas anotadas para contrastarlas con la indicación correspondiente.',
      'Si elegís nuestra asesoría, pedí que te expliquemos el alcance del servicio por separado. Contanos si estás empezando, si ya completaste parte del formulario o si querés practicar la entrevista. Así la conversación puede centrarse en la ayuda que necesitás, sin suponer que todos llegan con los mismos pendientes ni mezclar honorarios con el arancel oficial.',
    ]],
    ['comparar', 'Cómo comparar propuestas de preparación', [
      'Antes de elegir ayuda, escribí qué parte querés revisar: datos del formulario, organización de documentos o claridad para explicar tu viaje. Pedí una descripción concreta de las tareas. Un presupuesto se entiende mejor cuando podés reconocer el trabajo propuesto, lo que tenés que aportar vos y las dudas que deben resolverse por el canal oficial.',
      'No compares solamente una cifra aislada. Preguntá si el concepto corresponde a asesoría, a un gasto personal o al arancel de solicitud. Conservá tus anotaciones para no contar lo mismo de nuevo. Si algo no queda claro, pedí una explicación antes de asumir que está incluido; no hace falta decidir mientras todavía estás tratando de entender la propuesta.',
    ]],
    ['decision', 'Pagar más no cambia quién decide', [
      FACTS.F5,
      'Ningún tercero puede acelerar la decisión consular ni influir en ella. Nuestro trabajo es ayudarte a preparar información clara y verdadera, no ofrecer intervención en la evaluación. Tampoco tomes una promesa de prioridad como parte del valor de una asesoría. El presupuesto debe describir preparación, con el resultado siempre separado de ese trabajo.',
      'Para cerrar tu lista, revisá el arancel, el traslado, las fotos, las traducciones si hacen falta y el apoyo privado que decidas contratar. Marcá qué conocés y qué necesitás consultar. Podés empezar la conversación con esos pendientes concretos: entender cada concepto es más útil que buscar un total que supuestamente sirva para cualquier solicitud.',
    ]],
  ],
}), guide({
  path: '/guias/requisitos-para-viajar-a-espana-desde-paraguay/', label: 'Requisitos para viajar a España',
  title: 'Requisitos para viajar a España desde Paraguay',
  description: 'Turismo en España con pasaporte paraguayo: cómo preparar tu plan de regreso, alojamiento y medios, y cuándo consultar por una larga estadía.',
  h1: 'Requisitos para viajar a España desde Paraguay',
  lead: 'Antes de armar una carpeta, distinguí un viaje turístico de un proyecto de estudio, trabajo o residencia. Esa diferencia te ayuda a hacer las preguntas correctas y a preparar información que coincida con tu plan real.',
  inline: { label: 'Consultar la orientación para visa España', href: '/visa-espana/', body: 'Si tu proyecto es estudiar, trabajar o residir, revisá nuestra página de España y contanos el propósito real de tu viaje.' },
  parts: [
    ['turismo', 'Turismo y larga estadía son consultas distintas', [
      'Ciudadanos paraguayos no necesitan visa para viajar a España como turistas hasta 90 días; para estudiar, trabajar o residir sí necesitan un visado de larga estadía que se tramita en el Consulado de España en Asunción.',
      'Empezá por describir lo que vas a hacer, sin adaptar la explicación a la opción que parezca más sencilla. Si tu idea es visitar y volver, ordená ese itinerario. Si el proyecto incluye estudios, trabajo o establecerte, plantealo desde el principio como una consulta de larga estadía. No uses una descripción de turismo para esconder otro propósito.',
      'Esta guía está dirigida a ciudadanos paraguayos que preparan esa consulta. No traslades su contenido automáticamente a un acompañante con otra nacionalidad. Anotá las circunstancias de cada persona y separá las preguntas que necesitan una respuesta propia. Preparar el viaje en grupo no significa que debas dar por resueltas todas las situaciones con la misma lectura.',
    ]],
    ['regreso', 'El regreso y el sentido de tu itinerario', [
      'En la práctica habitual del control fronterizo pueden preguntarte por el pasaje de regreso y por el propósito de la visita. Prepará una explicación sencilla de tu itinerario y tené ubicada la información del retorno. Lo útil es que puedas relacionar el viaje con lo que efectivamente organizaste, sin repetir una respuesta aprendida que no describe tus planes.',
      'Revisá que tus propias anotaciones no se contradigan: dónde pensás estar, cómo imaginás el recorrido y cuál es tu plan de regreso. Si todavía hay una parte abierta, identificá la duda para consultar antes de viajar. No inventes reservas ni presentes una idea tentativa como un acuerdo confirmado solamente para que tu carpeta parezca completa.',
      'Estas preguntas se describen como práctica habitual, no como un cuestionario fijo que todas las personas reciben. Usalas para detectar lo que te falta entender sobre tu propio viaje. Preparar una explicación no consiste en ensayar una historia convincente, sino en poder contar con calma lo que ya sabés y reconocer lo que necesitás aclarar.',
    ]],
    ['alojamiento', 'Dónde vas a alojarte', [
      'El alojamiento es otro tema por el que suelen preguntar. Tené clara la organización que elegiste y ubicá la información que la respalda. Si tu plan incluye distintos lugares, ordenalos según tu recorrido para poder explicarlos. No hace falta añadir una historia distinta a cada papel: empezá por comprobar que todos describen el mismo viaje.',
      'No confundas esta orientación con una lista cerrada de documentos. Una pregunta sobre dónde vas a quedarte no permite deducir por sí sola qué formato te corresponde presentar. Si necesitás aclarar la documentación aplicable a tu alojamiento, hacé esa consulta concreta. Evitá encargar trámites basándote únicamente en lo que le pidieron a una amistad.',
    ]],
    ['medios-seguro', 'Medios para el viaje y seguro', [
      'También es habitual que consulten por los medios para sostener la visita y por el seguro de viaje. Revisá cómo vas a cubrir lo que organizaste y qué información tenés sobre tu seguro. Esta guía no establece montos, coberturas mínimas ni una forma única de demostrar medios; esos detalles necesitan la consulta de las instrucciones aplicables.',
      'Para prepararte, separá lo que entendés de lo que todavía necesitás preguntar. Podés anotar dudas sobre la documentación de tus medios o sobre el alcance del seguro que estás considerando. Pedí que te expliquen cualquier condición que no comprendás antes de tomarla como resuelta. Una carpeta ordenada no sustituye entender qué representa cada documento.',
      'Mantené juntas las preguntas del viaje, pero diferenciá sus temas. El regreso explica una parte del itinerario; el alojamiento, otra; los medios y el seguro tienen su propio sentido. No supongas que contar con un elemento responde por todos los demás. Revisarlos por separado te permite reconocer pendientes sin convertir recomendaciones generales en exigencias universales.',
    ]],
    ['larga-estadia', 'Si querés estudiar, trabajar o residir', [
      'Cuando tu propósito es una larga estadía, orientá la consulta al visado correspondiente ante el Consulado de España en Asunción. Contá cuál es tu proyecto y qué información tenés reunida. No intentes resolver esa preparación agregando papeles a una carpeta turística: primero necesitás distinguir la consulta y las instrucciones que corresponden a tu intención real.',
      'En nuestra página de visa España podés continuar con la orientación de preparación y plantearnos tus dudas. La asesoría privada ayuda a ordenar la conversación; no reemplaza la decisión de la autoridad. Para empezar, resumí tu propósito, separá los documentos que ya tenés y anotá lo que falta confirmar. Ese resumen permite hablar de tu caso sin inventar requisitos.',
    ]],
  ],
}), guide({
  path: '/guias/checklist-visa-americana/', label: 'Checklist de visa americana',
  title: 'Checklist visa americana: lista para imprimir',
  description: 'Imprimí una lista para ordenar pasaporte, DS-160, cita, comprobante de pago y respaldos de vínculos antes de tu entrevista de visa americana.',
  h1: 'Checklist de visa americana para imprimir y revisar',
  lead: 'Usá esta lista como ayuda de organización personal. Marcá lo que ya revisaste y dejá visibles tus pendientes; una casilla completa no representa una evaluación consular ni reemplaza las instrucciones de tu solicitud.',
  inline: { label: 'Ver preparación para la entrevista', href: '/visa-americana/entrevista/', body: 'Si necesitás ayuda para explicar tu situación con claridad, revisá cómo trabajamos la preparación de la entrevista con vos.' },
  parts: [
    ['antes-ds-160', 'Antes del DS-160', [
      FACTS.F1,
      'Empezá con el pasaporte a mano y compará los datos que vas a utilizar. Leé cada pregunta antes de responder y marcá cualquier expresión en inglés que no entendás. No completes un espacio con una suposición para poder avanzar. Esta parte de la lista busca que distingas información comprobada de recuerdos o dudas que todavía necesitan revisión.',
      'Ordená lo que describe tus vínculos reales: trabajo, estudios, familia o propiedades, cuando corresponda a tu situación. No hace falta que tu vida coincida con todos esos ejemplos. Tampoco agregues una actividad que no tenés. Prepará la información que te permita hablar de tu realidad y mantené separados los puntos que todavía no podés explicar con claridad.',
      'Si alguien te ayuda a completar el formulario, revisá las respuestas con esa persona. La información debe seguir siendo tuya y reflejar lo que conocés de tu situación. Evitá aceptar una frase solamente porque parece más conveniente. Anotá las dudas junto a esta lista y volvé a ellas antes de dar por terminada la preparación del formulario.',
    ]],
    ['respaldos', 'Documentos de respaldo', [
      'Ubicá la confirmación del DS-160, la confirmación de cita y el comprobante del arancel dentro de tu organización. Son conceptos distintos: no marques una confirmación porque ya encontraste la otra. Contrastá cada registro con tus datos y con las instrucciones del sistema oficial. Esta lista te ayuda a localizarlos, sin fijar formatos ni cantidades de copias.',
      FACTS.F4,
      'Para los respaldos de vínculos, pensá en información de trabajo, estudios, familia o propiedades que describa tu situación verdadera. Es una orientación general, no una obligación de reunir algo de cada grupo. No inventes documentos ni relaciones para completar casillas. Si un punto no corresponde a tu caso, dejalo señalado como tal en tu ejemplar impreso.',
      'Evitá medir tu preparación por el volumen de la carpeta. Leé lo que reuniste y preguntate si entendés qué representa, si coincide con tus respuestas y si podés ubicarlo. Cuando encuentres una diferencia, revisala; no la tapes con otro papel. Ordenar los respaldos significa reconocer qué información tenés y qué duda sigue abierta, no presumir un resultado.',
    ]],
    ['entrevista', 'Día de la entrevista', [
      FACTS.F2,
      'Antes de salir, revisá el pasaporte y localizá las confirmaciones y el comprobante que preparaste. Consultá las indicaciones de tu cita para organizar esa jornada. No uses esta hoja para deducir reglas sobre objetos permitidos, horarios o documentación adicional: esos detalles no están definidos acá y deben consultarse en las instrucciones correspondientes a tu trámite.',
      'Revisá los respaldos que correspondan a tus vínculos y repasá la información de tu formulario. La idea no es memorizar una presentación. Escuchá la pregunta y explicá tu situación con tus palabras, sin agregar trabajo, estudios, familia o propiedades que no forman parte de tu realidad. Si una duda sigue pendiente, identificála en lugar de ensayar una respuesta inventada.',
      FACTS.F5,
      'Llevar una lista ordenada no cambia quién decide. Las casillas representan tareas de preparación que vos revisaste, no puntos a favor ni una promesa de resultado. Usá el espacio de tu copia para anotar preguntas concretas que quieras aclarar antes de la entrevista, sin transformar la hoja en un guion para responder algo distinto de lo verdadero.',
    ]],
    ['usar-lista', 'Cómo usar tu copia impresa', [
      'Seleccioná Imprimir esta lista para abrir la impresión del navegador. Podés revisar la vista previa antes de imprimir y marcar los cuadros a mano. Conservá las casillas pendientes sin completar hasta que hayas revisado el punto correspondiente. Si una categoría de vínculos no aplica, escribilo al lado para distinguir ese caso de un documento que todavía estás buscando.',
      'Volvé a leer tus pendientes al terminar. Separá una duda sobre tus datos de una consulta sobre el sistema oficial o de una pregunta para la asesoría. Esa distinción te ayuda a buscar la aclaración adecuada. La utilidad de esta hoja está en hacer visible lo que falta revisar, no en terminarla rápido ni reunir material que no describe tu situación.',
    ]],
  ],
})];
for (const [index, image] of ['pasaporte-formulario-ds-160-escritorio-terere', 'visa-europa-estudiante-paraguaya-barcelona', 'simulacro-entrevista-visa-oficina-asuncion'].entries()) p6Guides[index].hero.image = image;
const printableGuide = p6Guides[2];
printableGuide.printable = true;
const printableArticle = printableGuide.sections[0];
printableArticle.printable = true;
[
  ['Pasaporte: datos revisados antes de completar el formulario.', 'Información real de trabajo, estudios, familia o propiedades, según mi situación.'],
  ['Confirmación del DS-160 localizada y revisada.', 'Confirmación de cita localizada y revisada.', 'Comprobante del arancel localizado.', 'Respaldos de trabajo, estudios, familia o propiedades que correspondan a mi caso.'],
  ['Pasaporte ubicado para la entrevista.', 'Confirmación del DS-160, confirmación de cita y comprobante de pago ubicados.', 'Respaldos de mis vínculos organizados según mi situación.'],
].forEach((items, index) => { printableArticle.items[index].checkboxes = items; });
GUIDES.push(...p6Guides);
PAGES.push(...p6Guides);
PAGES.find(p => p.path === '/guias/').sections[0].items = GUIDES.map(g => ({ eyebrow: 'Guía de preparación', title: g.label, body: g.description, href: g.path, tag: 'Leé la guía' }));
NAV.find(n => n.href === '/guias/').children = GUIDES.map(g => ({ label: g.label, href: g.path }));
FOOTER[1].links = [{ label: 'Todas las guías', href: '/guias/' }, ...GUIDES.map(g => ({ label: g.label, href: g.path }))];

// Guides ported from the rebuild (information-only, voseo). They appear in the /guias/ hub and the
// sitemap; the header menu and footer keep the original shorter list.
// Related links for the first batch of ported guides (the later batches carry their own `related`).
const RELATED_FIRST_BATCH = {
  '/guias/pagar-tasa-y-agendar-visa-eeuu/': ['/guias/como-llenar-el-ds-160/', '/guias/cuanto-tarda-la-visa-americana-paraguay/', '/guias/estafas-visa-americana-paraguay/'],
  '/guias/visa-integrity-fee-usa-paraguay/': ['/guias/cuanto-cuesta-la-visa-americana/', '/guias/pagar-tasa-y-agendar-visa-eeuu/', '/guias/estafas-visa-americana-paraguay/'],
  '/guias/etias-europa-paraguayos/': ['/guias/requisitos-para-viajar-a-espana-desde-paraguay/', '/guias/destinos-sin-visa-para-paraguayos/', '/guias/estafas-visa-americana-paraguay/'],
  '/guias/viajar-brasil-argentina-desde-paraguay/': ['/guias/destinos-sin-visa-para-paraguayos/', '/guias/seguro-de-viaje-desde-paraguay/', '/guias/migraciones-paraguay/'],
  '/guias/visa-canada-paraguayos/': ['/visa-canada/', '/guias/seguro-de-viaje-desde-paraguay/', '/guias/estafas-visa-americana-paraguay/'],
  '/guias/esta-paraguayos-no-aplica/': ['/visa-americana/turista/', '/guias/estafas-visa-americana-paraguay/', '/guias/requisitos-visa-americana-paraguay/'],
  '/guias/estafas-visa-americana-paraguay/': ['/guias/pagar-tasa-y-agendar-visa-eeuu/', '/guias/esta-paraguayos-no-aplica/', '/guias/embajada-de-estados-unidos-en-paraguay/'],
  '/guias/visa-americana-familias/': ['/guias/como-llenar-el-ds-160/', '/guias/foto-para-visa-americana-requisitos/', '/guias/preguntas-entrevista-visa-americana/'],
  '/guias/visa-americana-comerciantes-empresarios/': ['/guias/demostrar-vinculos-con-paraguay-visa-americana/', '/guias/preguntas-entrevista-visa-americana/', '/guias/que-se-puede-hacer-con-visa-b2/'],
  '/guias/visa-americana-tratamiento-medico/': ['/guias/que-se-puede-hacer-con-visa-b2/', '/guias/demostrar-vinculos-con-paraguay-visa-americana/', '/guias/preguntas-entrevista-visa-americana/'],
};
const extraGuides = [...feesBooking, ...travelNoVisa, ...canadaEstaScams, ...segments, ...longtailA, ...longtailB, ...longtailC, ...glossaryHub]
  .map(d => ({ ...guide(d), updated: '2026-10-01', relatedOverride: d.related || RELATED_FIRST_BATCH[d.path] }));
GUIDES.push(...extraGuides);
PAGES.push(...extraGuides);
PAGES.find(p => p.path === '/guias/').sections[0].items = GUIDES.map(g => ({ eyebrow: 'Guía de preparación', title: g.label, body: g.description, href: g.path, tag: 'Leé la guía' }));

export const LANGUAGE_PAIRS = [
  ['/', '/en/'],
  ['/contacto/', '/en/contact/'],
  ['/residencia-en-paraguay/', '/en/residency-in-paraguay/'],
  ['/visa-canada/', '/en/canada-visa-from-paraguay/'],
  ['/visa-americana/turista/', '/en/us-visa-from-paraguay/'],
  ['/gracias.html', '/en/thank-you.html'],
];
for (const [es, en] of LANGUAGE_PAIRS) {
  const alternates = [{ lang: 'es', path: es }, { lang: 'en', path: en }, { lang: 'x-default', path: es }];
  for (const path of [es, en]) PAGES.find(p => p.path === path).alternates = alternates;
}
export function relatedPaths(page) {
  const defaults = page.lang === 'en'
    ? ['/en/paraguay-visa/', '/en/us-visa-from-paraguay/', '/en/canada-visa-from-paraguay/', '/en/residency-in-paraguay/']
    : ['/visa-americana/', '/guias/como-llenar-el-ds-160/', '/guias/preguntas-entrevista-visa-americana/', '/guias/requisitos-visa-americana-paraguay/'];
  return [...new Set([...(page.related || []), ...defaults])].filter(path => path !== page.path).slice(0, 3);
}
for (const page of PAGES) {
  if (page.path.startsWith('/residencia-en-paraguay/') || page.path === '/guias/migraciones-paraguay/') {
    page.related = ['/residencia-en-paraguay/', '/guias/migraciones-paraguay/', '/residencia-en-paraguay/requisitos/', '/residencia-en-paraguay/temporal/'].filter(path => path !== page.path).slice(0, 3);
  } else if (page.path === '/visa-espana/' || page.path === p6Guides[1].path) {
    page.related = [page.path === '/visa-espana/' ? p6Guides[1].path : '/visa-espana/', '/guias/', '/contacto/'];
  } else if (page.type === 'service' || page.type === 'guide' || page.path === '/visa-americana/') {
    page.related = page.lang === 'en' ? relatedPaths(page) : page.path === '/visa-canada/' || page.path === '/visa-australia/'
      ? ['/guias/', '/contacto/', '/visa-americana/']
      : ['/visa-americana/', p6Guides[0].path, p6Guides[2].path].filter(path => path !== page.path);
    page.related = relatedPaths(page);
  }
}
for (const g of extraGuides) if (g.relatedOverride) g.related = g.relatedOverride;
PAGES.find(p => p.path === '/404.html').sections = [{ type: 'prose', id: 'recovery-links', items: [{
  title: 'Retomá tu consulta desde acá',
  body: 'Revisá que el enlace esté completo o elegí el tema que más se acerque a tu consulta.',
  links: [
    { label: 'Visa americana', href: '/visa-americana/' },
    { label: 'Guía de la Embajada de Estados Unidos', href: '/guias/embajada-de-estados-unidos-en-paraguay/' },
    { label: 'Residencia en Paraguay', href: '/residencia-en-paraguay/' },
    { label: 'Todas las guías', href: '/guias/' },
    { label: 'Contacto', href: '/contacto/' },
    { label: 'Visa help in English', href: '/en/', lang: 'en' },
  ],
}] }];

// P7: page records can override the shared default intent by id.
for (const page of PAGES) {
  if (page.lang === 'en') continue;
  if (page.path.includes('renovacion')) page.waDefault = 'renovacion';
  else if (/estudiante|work-and-travel/.test(page.path)) page.waDefault = 'estudiante';
  else if (/denegada/.test(page.path)) page.waDefault = 'denegada';
  else if (/residencia|migraciones/.test(page.path)) page.waDefault = 'paraguay';
  else if (/canada|espana|australia/.test(page.path)) page.waDefault = 'otro-destino';
}
PAGES.push({
  type: 'landing', path: '/lp/visa-americana/', sitemap: false, waDefault: 'turista',
  label: 'Asesoría para visa americana', waContext: 'asesoría para visa americana en Paraguay',
  title: 'Asesoría para tu visa americana en Paraguay',
  description: 'Contanos tu caso: preparación del DS-160, orientación para la cita y práctica de entrevista para tu visa americana desde Paraguay.',
  hero: { eyebrow: 'Asesoría privada · Paraguay', title: 'Asesoría para tu visa americana en Paraguay',
    lead: 'Evaluamos tu caso, revisamos el DS-160 con vos y practicamos cómo explicar tu viaje con claridad.',
    chips: ['DS-160 revisado', 'Preguntas de la entrevista', 'Preparación con vos'] },
  sections: [
    { ...PAGES.find(p => p.path === '/contacto/').sections[0], id: 'consulta' },
    { type: 'route', title: 'Tu ruta de preparación', items: ROUTE_STEPS },
    { ...PAGES.find(p => p.path === '/').sections.find(s => s.type === 'checklist'), title: 'Lo que revisamos', tone: 'paper-2' },
    { type: 'faq', title: 'Preguntas frecuentes', items: homeFaq.slice(0, 4) },
  ],
});

applyEditorial({ PAGES, NAV, FOOTER, SERVICES, DISCLAIMER, DISCLAIMER_EN, LANGUAGE_PAIRS });

// Extra FAQ entries for existing pages (additive; schema is built from the visible FAQ sections).
for (const [path, pairs] of Object.entries(faqExtra)) {
  const page = PAGES.find(p => p.path === path);
  if (!page) throw new Error('faq-extra: unknown page ' + path);
  let faq = page.sections.find(s => s.type === 'faq');
  if (!faq) {
    faq = { type: 'faq', title: 'Preguntas frecuentes', items: [] };
    const cta = page.sections.findIndex(s => s.type === 'cta');
    page.sections.splice(cta === -1 ? page.sections.length : cta, 0, faq);
  }
  const seen = new Set(faq.items.map(i => i.question));
  for (const [question, answer] of pairs) if (!seen.has(question)) faq.items.push({ question, answer });
}
