// Glossary of US visa terms and a quick-reference hub on trips without a visa for Paraguayan citizens.
// Record shape matches guide(d) in content.mjs: { path, label, title, description, h1, lead, inline, related, parts }.
export default [
  {
    path: '/guias/glosario-visa-americana/',
    label: 'Glosario de visa americana',
    title: 'Glosario de visa americana: términos clave',
    description: 'Qué significan DS-160, CEAC, MRV, 214(b), 221(g), I-94 y otros términos de la visa americana, explicados en simple para solicitantes paraguayos.',
    h1: 'Glosario de la visa americana: los términos que vas a encontrar',
    lead: 'El trámite de la visa americana viene cargado de siglas y números de sección que confunden a cualquiera. Este glosario explica cada término en palabras simples y te indica dónde leer la regla oficial.',
    inline: { label: 'Contanos qué término te generó dudas', href: '/contacto/', body: 'Si una sigla o un mensaje de tu solicitud no te cierra, escribinos y te orientamos sobre dónde confirmarlo en la fuente oficial.' },
    related: ['/guias/como-llenar-el-ds-160/', '/guias/procesamiento-administrativo-221g-visa-americana/', '/guias/visa-americana-denegada-214b/'],
    parts: [
      ['ds-160', 'DS-160', [
        'Es el formulario electrónico de solicitud de visa de no inmigrante que se completa en línea antes de la entrevista. Allí declarás tus datos personales, tu viaje, tu trabajo o estudios y tus antecedentes. Lo que cargás tiene que ser verdadero y coherente con lo que explicarás después. Las instrucciones vigentes están en travel.state.gov y en ceac.state.gov.',
      ]],
      ['confirmacion-del-ds-160', 'Confirmación del DS-160', [
        'Es la página con código de barras que aparece cuando el formulario se envía correctamente. Sirve para vincular el formulario con tu solicitud en el sistema de citas y para presentarla cuando se te indique. Guardala completa, con el número de identificación visible. Si no la tenés, el formulario no quedó enviado. Verificá en el sitio oficial qué te piden llevar.',
      ]],
      ['ceac', 'CEAC', [
        'Es la sigla en inglés del Centro Consular de Asuntos Electrónicos, el portal del Departamento de Estado donde se completa y consulta el DS-160. Allí podés retomar un formulario guardado o reimprimir una confirmación con el número que recibiste. No es una oficina a la que se vaya en persona ni un servicio de terceros. El portal oficial es ceac.state.gov.',
      ]],
      ['mrv', 'MRV (arancel de solicitud)', [
        'Es la sigla de Machine Readable Visa, y en la práctica nombra el arancel de solicitud que se paga para poder pedir una cita de entrevista. Es un cobro distinto de cualquier otro cargo y no equivale a una visa aprobada. El monto, los medios de pago y la vigencia del recibo cambian, así que consultalos siempre en travel.state.gov o en ais.usvisa-info.com.',
      ]],
      ['tasa-de-integridad-de-visa', 'Tasa de integridad de visa', [
        'Es un cargo adicional previsto en normas recientes de Estados Unidos para ciertas visas de no inmigrante. Su alcance, su monto y el momento en que se aplica dependen de lo que establezcan las autoridades y pueden cambiar. No la des por sentada ni por descartada: leé el anuncio vigente en travel.state.gov antes de pagar nada y desconfiá de quien te cobre por adelantado.',
      ]],
      ['oficial-consular', 'Oficial consular', [
        'Es el funcionario del Departamento de Estado que atiende la entrevista y decide sobre tu solicitud según la ley estadounidense. Trabaja en la embajada o consulado, no en una empresa de asesoría ni en una agencia de viajes. Nadie fuera de esa oficina puede asegurar cuál será su decisión. Para entender cómo se evalúa un caso, la referencia es travel.state.gov.',
      ]],
      ['b1-b2', 'B1/B2', [
        'Es la categoría de visa de no inmigrante para visitantes. La B1 corresponde a ciertas actividades de negocios de corta duración y la B2 a turismo, visitas familiares o tratamientos médicos, y suelen otorgarse en conjunto como B1/B2. No autorizan a trabajar ni a estudiar en forma regular. Las actividades permitidas se detallan en travel.state.gov, en la sección de visas de visitante.',
      ]],
      ['seccion-214b', 'Sección 214(b)', [
        'Es el artículo de la ley migratoria estadounidense que parte de presumir que el solicitante quiere quedarse a vivir en el país, salvo que demuestre lo contrario. Cuando una solicitud no se aprueba por este motivo, el oficial indica la sección. No es una sanción ni un registro permanente, y se puede volver a solicitar con información nueva. La norma está en travel.state.gov.',
      ]],
      ['seccion-221g', 'Sección 221(g)', [
        'Es la referencia que aparece cuando el oficial no puede resolver la solicitud en el momento, por ejemplo porque necesita documentos adicionales o una revisión extra. No equivale a una aprobación ni a una negativa definitiva. Te entregan una hoja con las instrucciones a seguir, y conviene leerla completa y responder solo lo que piden. El detalle de cada caso lo informa la sede consular.',
      ]],
      ['procesamiento-administrativo', 'Procesamiento administrativo', [
        'Es una revisión adicional que puede aplicarse a una solicitud después de la entrevista, normalmente bajo la sección 221(g). El expediente queda a la espera de verificaciones internas de la autoridad. No se sabe de antemano cuánto dura ni se puede acelerar con intermediarios. Mantené tus datos de contacto al día y seguí el estado del caso en el portal oficial que te indicaron.',
      ]],
      ['exencion-de-entrevista', 'Exención de entrevista', [
        'Es la posibilidad de que ciertos solicitantes, bajo condiciones fijadas por el Departamento de Estado, presenten su solicitud sin pasar por la entrevista en persona. Las condiciones dependen de la categoría de visa, de visas anteriores y de otros factores, y pueden modificarse. Que exista no significa que te corresponda: confirmá si cumplís los requisitos en travel.state.gov antes de dar nada por hecho.',
      ]],
      ['validez-vs-permanencia', 'Validez de la visa vs. permanencia autorizada', [
        'Son dos ideas distintas que suelen mezclarse. La validez es el período en que podés usar la visa para presentarte en una frontera o aeropuerto. La permanencia autorizada es el tiempo que te permiten quedarte una vez dentro, y la define el oficial de frontera al admitirte. Una visa vigente no te da derecho a quedarte hasta que venza; revisá tu registro de entrada.',
      ]],
      ['i-94', 'I-94', [
        'Es el registro de entrada y salida que la autoridad de frontera estadounidense asocia a tu ingreso. Indica hasta cuándo podés permanecer, y esa fecha manda más que la del sello o la de la visa. Podés consultarlo e imprimirlo en el sitio oficial de la agencia de aduanas y protección fronteriza de Estados Unidos. Revisalo apenas ingreses y avisá si encontrás errores.',
      ]],
      ['datos-biometricos', 'Datos biométricos', [
        'Son las huellas dactilares y la fotografía que se toman como parte de la solicitud, en general cuando asistís a tu cita en la sede consular. Se usan para verificar tu identidad frente a registros de seguridad. El procedimiento exacto y qué hacer si ya los diste en un trámite previo lo informa el portal de citas, así que seguí allí las indicaciones de tu cita.',
      ]],
      ['esta', 'ESTA', [
        'Es la autorización electrónica de viaje del Programa de Exención de Visa, pensada para ciudadanos de países que Estados Unidos incluye en ese programa. Paraguay no figura entre ellos, por lo que quienes tienen pasaporte paraguayo no pueden usarla en lugar de una visa. Desconfiá de sitios que ofrezcan ESTA para paraguayos. La lista de países vigente está en cbp.gov.',
      ]],
      ['etias', 'ETIAS', [
        'Es el futuro sistema europeo de autorización de viaje para ciudadanos de países que no necesitan visa para el espacio Schengen. No es una visa ni una solicitud de residencia: se trata de un control previo de seguridad. Su puesta en marcha depende de lo que anuncie la Unión Europea, así que confirmá el estado actual en el sitio oficial antes de planificar o pagar algo.',
      ]],
    ],
  },
  {
    path: '/guias/destinos-sin-visa-para-paraguayos/',
    label: 'Destinos sin visa para paraguayos',
    title: 'Viajar sin visa desde Paraguay: guía rápida',
    description: 'Qué destinos suelen no pedir visa a paraguayos (Mercosur, México, Schengen, Reino Unido) y cuáles sí (EE. UU., Canadá). Verificá en la fuente oficial.',
    h1: 'Destinos sin visa para paraguayos y dónde sí hace falta una',
    lead: 'No todos los viajes desde Paraguay exigen una visa, pero las reglas cambian según el país y el motivo. Esta guía rápida te ubica en general y te recuerda que la palabra final la tiene siempre el sitio oficial de cada gobierno.',
    inline: { label: 'Contanos adónde querés viajar', href: '/contacto/', body: 'Si no sabés por dónde empezar con tu destino, escribinos y te orientamos sobre qué fuente oficial consultar para tu caso.' },
    related: ['/guias/viajar-a-mexico-desde-paraguay/', '/guias/viajar-brasil-argentina-desde-paraguay/', '/guias/etias-europa-paraguayos/'],
    parts: [
      ['como-leer-esta-guia', 'Cómo leer esta guía rápida', [
        'Esta página es una referencia general para ubicarte, no una lista de requisitos. Que un destino no pida visa a ciudadanos paraguayos para una visita corta no significa que no pida nada: puede haber exigencias de documento, de ingreso o de autorización electrónica. Tampoco vale para estadías de estudio, trabajo o residencia, que suelen tener reglas propias. Si tu viaje tiene un motivo distinto del turismo, revisá esa categoría por separado.',
        'Los gobiernos modifican sus políticas de entrada con frecuencia y no siempre lo anuncian con anticipación. Por eso, tomá lo que leas acá como punto de partida y confirmá siempre en el sitio oficial del país de destino, o en la autoridad migratoria correspondiente, antes de comprar pasajes o reservas. En esa fuente está la decisión que cuenta, y ninguna guía privada la reemplaza. Guardá la fecha en que consultaste cada dato.',
      ]],
      ['vecinos-del-mercosur', 'Vecinos del Mercosur', [
        'Dentro del Mercosur existen acuerdos que facilitan la circulación de las personas de la región, por lo que para viajar a países vecinos como Argentina, Brasil, Uruguay o Chile en general no se pide una visa para turismo. Lo habitual es presentar un documento de identidad o pasaporte vigente, según lo que admita cada país y cada paso de frontera. Ese acuerdo regional facilita el viaje, pero no elimina los controles ni la facultad de cada país de decidir quién ingresa.',
        'Los detalles prácticos son los que más varían: qué documento aceptan, cuánto tiempo podés quedarte, qué se exige a los menores y qué cambia si cruzás en bus o en auto. Para eso, consultá la página de la autoridad migratoria del país al que vas y la de migraciones.gov.py. Tené en cuenta que las normas de tránsito y de seguros también cuentan, sobre todo si viajás en vehículo propio, y que algunas exigencias cambian cuando viaja un menor sin ambos padres.',
      ]],
      ['mexico', 'México', [
        'En general, los ciudadanos paraguayos pueden viajar a México por turismo sin una visa previa, pero eso no reemplaza el control en el aeropuerto. Puede pedirse que justifiques el motivo de tu visita, que muestres reservas de alojamiento o un pasaje de salida, y que cumplas con las condiciones de ingreso que fije la autoridad migratoria mexicana al momento de tu viaje. Llevá esos datos a mano, ordenados y consistentes con lo que contés en el control.',
        'Además, la admisión final se decide en la frontera y no está asegurada por el hecho de no necesitar visa. Revisá la vigencia de tu pasaporte, el tiempo de permanencia que te asignen y los datos de tu itinerario. La información vigente la publican el instituto de migración y la cancillería de México, y conviene consultarlas antes de salir, además de repasar si tu aerolínea pide algún documento extra antes de embarcar.',
      ]],
      ['espacio-schengen', 'Espacio Schengen', [
        'Los ciudadanos paraguayos, en general, pueden entrar al espacio Schengen para visitas cortas de turismo sin tramitar una visa. Eso no quita que en la frontera te pidan explicar el viaje, mostrar medios económicos, alojamiento y un pasaje de regreso, y cumplir con los requisitos de pasaporte y de seguro que fije cada país. Cada estado puede tener indicaciones propias, y el control en el primer punto de entrada es el que decide si te admiten o no en ese momento.',
        'Aparte, la Unión Europea prepara un sistema de autorización previa llamado ETIAS para viajeros que no necesitan visa. Su funcionamiento y su calendario dependen de decisiones oficiales y pueden variar, así que no pagues nada a páginas que lo ofrezcan sin verificar. La información válida está en los sitios oficiales de la Unión Europea y del país donde vas a entrar, junto con el resto de los requisitos de tu itinerario.',
      ]],
      ['reino-unido', 'Reino Unido', [
        'El Reino Unido no forma parte del espacio Schengen y tiene su propio régimen de entrada. En general, quienes viajan desde Paraguay por turismo en una visita corta no necesitan una visa, pero pueden exigirse trámites previos, como una autorización electrónica de viaje, que se han ido incorporando para distintas nacionalidades. Qué se pide hoy a quien tiene pasaporte paraguayo hay que confirmarlo, porque esa exigencia puede aparecer o modificarse sin demasiado aviso y varía según el motivo del viaje.',
        'Para estudiar, trabajar o quedarse más tiempo, las reglas son otras y suelen requerir una visa específica. Como estas políticas se revisan con frecuencia, usá el sitio oficial del gobierno británico para saber qué autorización corresponde a tu caso y cuándo conviene gestionarla. Un buscador, un foro o una agencia no reemplazan esa consulta, y conviene guardar una copia de lo que figure en la página oficial al momento de consultarla.',
      ]],
      ['donde-si-hace-falta-visa', 'Dónde sí hace falta una visa: Estados Unidos y Canadá', [
        'Para Estados Unidos, los ciudadanos paraguayos necesitan una visa para viajar por turismo o por negocios. Paraguay no integra el programa que permite usar la autorización electrónica ESTA, por lo que no es una alternativa. La solicitud incluye un formulario, un arancel y una entrevista, y la decisión corresponde al oficial consular. Las instrucciones oficiales están en travel.state.gov, y ninguna reserva de viaje anticipa lo que resuelva la autoridad.',
        'Para Canadá, en general también se necesita una visa de visitante, y la autorización electrónica simple no sustituye ese trámite para quien tiene pasaporte paraguayo. Cada solicitud se evalúa de manera individual por la autoridad canadiense, que publica los pasos en ircc.canada.ca. En ambos casos, verificá siempre en la fuente oficial, porque los requisitos y los pasos pueden modificarse, y no conviene comprar pasajes antes de entender cuál es el camino que corresponde a tu caso.',
      ]],
    ],
  },
];
