/**
 * Preguntas frecuentes publicadas en marchalconsultores.com, recogidas de las
 * páginas de cada ramo y ordenadas aquí por el ramo al que corresponden.
 *
 * Solo cuatro páginas del sitio original tenían bloque de FAQ —salud, vida,
 * hogar y automóvil—, así que el resto de ramos se queda con las preguntas
 * propias que ya lleva `ramos.ts`.
 *
 * `faqsDe()` une ambas fuentes y descarta las repetidas: las de `ramos.ts` van
 * primero porque son las que responden a lo que se compara en esta web
 * (copagos, carencias, franquicias), y detrás el fondo completo del sitio.
 */

import type { Ramo } from "./ramos";

type Faq = { p: string; r: string };

export const faqsMarchal: Record<string, Faq[]> = {
  salud: [
    { p: "¿Es obligatorio tener un seguro de salud privado en España?", r: "No, en España la sanidad pública cubre a todos los ciudadanos y residentes. Sin embargo, muchos optan por un seguro privado para reducir tiempos de espera y acceder a especialistas sin pasar por el médico de cabecera." },
    { p: "¿Qué cubre un seguro de salud básico?", r: "Un seguro de salud básico suele cubrir consultas médicas, urgencias, pruebas diagnósticas sencillas y algunas especialidades médicas, según la póliza contratada." },
    { p: "¿Puedo elegir el médico o centro con un seguro privado?", r: "Sí. Una de las ventajas del seguro privado es la libre elección de profesionales y centros médicos dentro del cuadro médico de la aseguradora." },
    { p: "¿El seguro de salud cubre hospitalización?", r: "Depende del tipo de póliza. Muchas incluyen hospitalización médica y quirúrgica, habitación individual con cama para acompañante, y gastos asociados a la intervención." },
    { p: "¿Hay periodo de carencia en los seguros de salud?", r: "Sí. Las pólizas pueden tener periodos de carencia (espera) para ciertos servicios como hospitalización, intervenciones quirúrgicas o partos, normalmente de 6 a 10 meses." },
    { p: "¿Cubre el seguro privado tratamientos dentales?", r: "No todos. Algunos seguros los excluyen o los ofrecen como complemento. Hay pólizas con cobertura dental básica o posibilidad de contratar un seguro dental adicional." },
    { p: "¿Puedo usar el seguro privado en el extranjero?", r: "Algunas pólizas incluyen asistencia en viaje o cobertura internacional en casos de urgencia. Verifica si tu seguro incluye este servicio o si es opcional." },
    { p: "¿Qué tipos de seguros de salud existen?", r: "Existen seguros de salud básicos, con copago y sin copago, seguros de reembolso y seguros de cuadro médico. Cada uno se adapta a distintas necesidades y presupuestos." },
    { p: "¿Qué es un seguro de salud con copago?", r: "Es un tipo de seguro en el que pagas una pequeña cantidad cada vez que usas un servicio médico. A cambio, la prima mensual suele ser más baja." },
    { p: "¿Qué es un seguro de salud sin copago?", r: "Es un seguro que cubre todos los servicios médicos incluidos en la póliza sin que tengas que pagar nada adicional por cada consulta o prueba." },
    { p: "¿Qué es un seguro de reembolso?", r: "Es un seguro que te permite acudir a cualquier médico o centro, incluso fuera del cuadro médico, y la aseguradora te reembolsa un porcentaje del coste." },
    { p: "¿El seguro de salud cubre el embarazo y el parto?", r: "Sí, pero suele haber un periodo de carencia de entre 8 y 10 meses desde la contratación para poder usar estas coberturas." },
    { p: "¿El seguro de salud incluye medicina general?", r: "Sí, la mayoría de seguros de salud cubren medicina general y pediatría desde el primer día." },
    { p: "¿Qué no cubre un seguro de salud?", r: "No suele cubrir tratamientos estéticos, enfermedades preexistentes no declaradas, accidentes laborales ni tratamientos fuera del territorio nacional sin autorización." },
    { p: "¿El seguro de salud cubre psicología?", r: "Algunas aseguradoras incluyen sesiones de psicología clínica, aunque suelen tener un número limitado de sesiones al año." },
    { p: "¿Puedo usar el seguro de salud desde el primer día?", r: "Depende de la cobertura. Consultas médicas y pruebas básicas suelen estar activas desde el primer día, pero hospitalización y cirugía pueden tener carencia." },
    { p: "¿Los seguros de salud cubren enfermedades crónicas?", r: "Depende de la aseguradora y si la enfermedad ha sido declarada. En muchos casos se excluyen o tienen limitaciones." },
    { p: "¿Puedo contratar un seguro de salud si tengo más de 65 años?", r: "Sí, aunque hay menos opciones y los precios suelen ser más altos. Algunas compañías tienen seguros específicos para mayores." },
    { p: "¿Se puede contratar un seguro de salud para niños?", r: "Sí. Existen pólizas infantiles y familiares con coberturas de pediatría, vacunas y revisiones incluidas." },
    { p: "¿El seguro de salud cubre vacunas?", r: "Algunas pólizas incluyen la administración de vacunas y otras también cubren el coste, especialmente en seguros infantiles o familiares." },
    { p: "¿Qué documentación necesito para contratar un seguro de salud?", r: "Normalmente bastan con DNI/NIE y una declaración de salud. Algunas compañías pueden requerir informes médicos adicionales." },
    { p: "¿El seguro de salud cubre pruebas COVID-19?", r: "Muchas aseguradoras incluyen pruebas PCR o antígenos, aunque suele requerirse prescripción médica. Consulta las condiciones de tu póliza." },
    { p: "¿Puedo cambiar de seguro de salud en cualquier momento?", r: "Puedes cambiar al final del contrato anual. Debes avisar con al menos un mes de antelación a la fecha de renovación." },
    { p: "¿Qué pasa si no pago una cuota del seguro?", r: "La aseguradora puede suspender la cobertura si no se paga dentro del primer mes desde el vencimiento del recibo." },
    { p: "¿El seguro de salud cubre operaciones quirúrgicas?", r: "Sí, las intervenciones quirúrgicas programadas están cubiertas, aunque pueden estar sujetas a carencias y autorizaciones previas." },
    { p: "¿Incluye el seguro de salud atención telefónica 24h?", r: "Sí, muchas aseguradoras ofrecen líneas médicas telefónicas disponibles las 24 horas para orientación o urgencias." },
    { p: "¿Puedo contratar un seguro de salud sólo para hospitalización?", r: "Sí, hay seguros limitados que cubren exclusivamente hospitalización, aunque son menos comunes que los seguros completos." },
    { p: "¿Los seguros de salud cubren la fisioterapia?", r: "Sí, pero suelen requerir prescripción médica y un número limitado de sesiones anuales incluidas." },
    { p: "¿Qué cubre la medicina preventiva en el seguro de salud?", r: "Incluye revisiones periódicas, chequeos médicos, ginecología preventiva, análisis y detección precoz de enfermedades comunes." },
    { p: "¿El seguro de salud incluye servicios dentales?", r: "Normalmente incluye consultas, limpiezas y extracciones básicas. Otros tratamientos suelen tener descuentos, pero no están cubiertos íntegramente salvo en pólizas específicas." },
    { p: "¿Puedo contratar el seguro de salud online?", r: "Sí, puedes comparar coberturas y contratar por internet. Asegúrate de revisar bien las condiciones generales y particulares." },
    { p: "¿Puedo dar de baja mi seguro de salud antes de que acabe el año?", r: "Solo si la aseguradora incumple sus obligaciones. Si no, debes esperar al vencimiento del contrato para cancelarlo avisando con 30 días de antelación." },
    { p: "¿Qué es el cuadro médico?", r: "Es el listado de médicos, clínicas y hospitales con los que la aseguradora tiene convenio. Puedes acudir a ellos sin pagar directamente." },
    { p: "¿El seguro de salud cubre medicina alternativa?", r: "En general no, aunque algunas aseguradoras ofrecen terapias alternativas como acupuntura u homeopatía con copago o descuentos." },
    { p: "¿Puedo añadir a mi familia al seguro de salud?", r: "Sí, puedes incluir a tu cónyuge e hijos en una póliza familiar, lo cual suele reducir el coste por persona." },
    { p: "¿Qué hacer si tengo una urgencia médica?", r: "Acude directamente al centro de urgencias concertado más cercano o contacta con la línea de atención 24h de tu aseguradora." },
    { p: "¿Qué diferencia hay entre póliza individual y familiar?", r: "La individual cubre solo al tomador. La familiar incluye a varios miembros con condiciones y precios más ventajosos que contratar por separado." },
    { p: "¿El seguro de salud cubre hospitalización por COVID?", r: "Sí, si la póliza incluye hospitalización, la cobertura se aplica también a ingresos por COVID-19, igual que cualquier otra enfermedad." },
    { p: "¿Puedo usar el seguro fuera de mi provincia?", r: "Sí. El seguro de salud tiene cobertura nacional y puedes acudir a cualquier centro del cuadro médico en toda España." },
    { p: "¿Qué es una autorización médica?", r: "Es un permiso que debe otorgar la aseguradora para realizar pruebas, ingresos u operaciones no urgentes. Se solicita con un informe médico." },
  ],

  vida: [
    { p: "¿Qué es un seguro de vida?", r: "Es un contrato que garantiza el pago de una indemnización a los beneficiarios designados en caso de fallecimiento o invalidez del asegurado." },
    { p: "¿Quién debe contratar un seguro de vida?", r: "Cualquier persona con personas a su cargo o con deudas (como hipotecas) puede beneficiarse de un seguro de vida para proteger a su familia financieramente." },
    { p: "¿Qué cubre un seguro de vida?", r: "Fallecimiento por cualquier causa (accidente o enfermedad) y, en muchos casos, invalidez absoluta y permanente. Algunas pólizas también incluyen enfermedades graves." },
    { p: "¿Cuál es la diferencia entre seguro de vida riesgo y seguro de ahorro?", r: "El seguro de vida riesgo cubre el fallecimiento. El seguro de vida ahorro combina protección con ahorro a largo plazo, como para la jubilación." },
    { p: "¿Qué ocurre si dejo de pagar el seguro de vida?", r: "La póliza se suspende y pierde su efecto. Algunas aseguradoras ofrecen un periodo de gracia o posibilidad de rehabilitar la póliza." },
    { p: "¿Cuánto cuesta un seguro de vida?", r: "Depende de la edad, capital asegurado, estado de salud y coberturas contratadas. Puede costar desde 5 €/mes en jóvenes sin enfermedades previas." },
    { p: "¿Qué capital debo asegurar?", r: "Se recomienda cubrir al menos el total de deudas y unos años de ingresos familiares. La media suele estar entre 50.000 y 150.000 euros." },
    { p: "¿Qué documentación se necesita para contratarlo?", r: "DNI, cuenta bancaria y, en algunos casos, cuestionario de salud o revisión médica si el capital asegurado es alto." },
    { p: "¿Puede contratarlo alguien con enfermedad grave?", r: "Dependerá de la enfermedad y la aseguradora. En algunos casos se aplica exclusión, prima más alta o rechazo de la solicitud." },
    { p: "¿Se puede tener más de un seguro de vida?", r: "Sí. No hay límite legal. Se pueden contratar varios seguros de vida con diferentes aseguradoras o beneficiarios." },
    { p: "¿Cuándo entra en vigor el seguro?", r: "Normalmente desde el momento de la contratación y pago del primer recibo, salvo que haya periodos de carencia para ciertas coberturas." },
    { p: "¿Qué es el periodo de carencia?", r: "Es un plazo inicial durante el cual ciertas coberturas no están activas. Suele durar entre 6 y 12 meses." },
    { p: "¿Se puede modificar el capital asegurado?", r: "Sí. Se puede aumentar o reducir el capital en función de las necesidades, aunque puede implicar revisión médica." },
    { p: "¿Qué pasa si el beneficiario muere antes que el asegurado?", r: "Se puede designar un beneficiario sustituto o la indemnización pasará a los herederos legales si no se especifica otro beneficiario." },
    { p: "¿Puedo contratar un seguro de vida si soy autónomo?", r: "Sí. Es especialmente recomendable para autónomos con responsabilidades familiares y sin prestación por baja o fallecimiento empresarial." },
    { p: "¿Qué es la invalidez absoluta y permanente?", r: "Es una situación reconocida por la Seguridad Social en la que el asegurado no puede ejercer ninguna actividad laboral. Está cubierta en muchos seguros de vida." },
    { p: "¿El seguro cubre fallecimiento por COVID-19?", r: "Sí, si no existía exclusión explícita y el seguro estaba en vigor antes del diagnóstico." },
    { p: "¿Cuánto tarda en pagarse la indemnización?", r: "Una vez aportada toda la documentación, las aseguradoras suelen abonar el capital en un plazo máximo de 40 días hábiles." },
    { p: "¿Puedo deducirme el seguro de vida en la declaración?", r: "Sólo en ciertos casos, como si está vinculado a la hipoteca con deducción por vivienda habitual anterior a 2013." },
    { p: "¿Puede el banco obligarme a contratar su seguro de vida?", r: "No. Puede ofrecer mejores condiciones si se contrata, pero tienes derecho a elegir libremente la compañía aseguradora." },
    { p: "¿Qué pasa si no informo de una enfermedad diagnosticada después?", r: "No afecta. Solo deben declararse enfermedades conocidas antes de la contratación. Las posteriores no influyen." },
    { p: "¿El seguro cubre accidentes laborales?", r: "Sí, el fallecimiento o invalidez por accidente laboral está cubierto siempre que no haya exclusiones en la póliza." },
    { p: "¿Qué ocurre si hay varios beneficiarios?", r: "La indemnización se reparte en el porcentaje indicado en la póliza. Si no se indica, se divide a partes iguales." },
    { p: "¿Qué es el tomador del seguro?", r: "Es quien contrata y paga la póliza. Puede ser diferente al asegurado o al beneficiario." },
    { p: "¿Qué ocurre si hay un error en los datos del beneficiario?", r: "Puede retrasar o dificultar el pago. Es importante revisar periódicamente la póliza para mantener los datos actualizados." },
    { p: "¿Puedo cancelar el seguro en cualquier momento?", r: "Sí, notificándolo por escrito con al menos 30 días de antelación a la fecha de renovación." },
    { p: "¿Un menor puede ser beneficiario?", r: "Sí, pero la indemnización quedará administrada por su tutor legal hasta que alcance la mayoría de edad." },
    { p: "¿El seguro de vida cubre enfermedades preexistentes?", r: "No si han sido excluidas o no se han declarado. Cada caso debe ser analizado por la aseguradora al contratar." },
    { p: "¿Es lo mismo seguro de vida que seguro de accidentes?", r: "No. El de vida cubre fallecimiento por cualquier causa. El de accidentes cubre sólo si es consecuencia de un accidente." },
    { p: "¿El seguro cubre muerte natural?", r: "Sí, siempre que no haya exclusiones o se esté dentro del periodo de carencia si lo hubiera." },
    { p: "¿Qué pasa si el asegurado muere en el extranjero?", r: "Se cubre igual que si ocurre en España, pero puede requerir documentación adicional como traducciones o certificado consular." },
    { p: "¿Puedo contratar un seguro temporal?", r: "Sí. Hay seguros de vida con duración de 1, 5 o 10 años, ideales para cubrir etapas concretas como una hipoteca o la crianza de los hijos." },
    { p: "¿Qué ocurre si sobrevivo a la duración del seguro?", r: "Si es un seguro de vida riesgo, simplemente finaliza. Si es un seguro con ahorro, puedes recuperar el capital acumulado." },
    { p: "¿Cómo elegir el mejor seguro de vida?", r: "Compara coberturas, precios, exclusiones, flexibilidad para modificar el capital y reputación de la aseguradora. Un mediador puede ayudarte." },
  ],

  hogar: [
    { p: "¿Qué cubre un seguro de hogar básico?", r: "Un seguro de hogar básico suele cubrir daños por incendio, agua, robo, responsabilidad civil y asistencia en el hogar. Es ideal para propietarios o inquilinos que buscan protección esencial." },
    { p: "¿Qué diferencia hay entre seguro multirriesgo y seguro básico?", r: "El multirriesgo incluye más coberturas: robo, rotura de cristales, asistencia jurídica, daños eléctricos, etc. El básico se centra en coberturas esenciales." },
    { p: "¿Cuánto cuesta un seguro de hogar al mes?", r: "El precio medio de un seguro de hogar en España ronda los 10 a 30 euros al mes, dependiendo de las coberturas, el tipo de vivienda y su ubicación." },
    { p: "¿Puedo asegurar una casa alquilada?", r: "Sí. Tanto el propietario (para asegurar el continente) como el inquilino (contenido y responsabilidad civil) pueden contratar un seguro de hogar adaptado a su situación." },
    { p: "¿Qué hago si tengo un siniestro en casa?", r: "Debes notificarlo lo antes posible a tu aseguradora o mediador, preferiblemente en las primeras 24-48 h. Aporta fotos, facturas o cualquier evidencia para agilizar la tramitación." },
    { p: "¿El seguro de hogar cubre daños por goteras o fugas de agua?", r: "Sí, siempre que no sean por falta de mantenimiento. Las pólizas suelen cubrir los daños por escapes de agua accidentales o roturas de tuberías." },
    { p: "¿Puedo cambiar de aseguradora si ya tengo un seguro en vigor?", r: "Sí, pero debes avisar con al menos 30 días de antelación a la fecha de renovación. Es recomendable comparar coberturas antes de cambiar." },
    { p: "¿Qué documentos necesito para contratar un seguro de hogar?", r: "Generalmente: dirección del inmueble, tipo de vivienda, metros cuadrados, valor del contenido, y si es vivienda habitual o en alquiler." },
    { p: "¿El seguro de hogar cubre robo en la vivienda?", r: "Sí, si tienes contratada la cobertura de robo. Incluye el valor de los objetos sustraídos y los daños por entrada forzada, siempre que estén declarados correctamente." },
    { p: "¿Qué no cubre un seguro de hogar?", r: "Las exclusiones frecuentes son los daños por falta de mantenimiento, las inundaciones por fenómenos extraordinarios no cubiertos por el Consorcio, los objetos no declarados o sin factura y el uso indebido de instalaciones eléctricas." },
    { p: "¿Qué ocurre si tengo una segunda residencia?", r: "Puedes asegurarla con una póliza distinta adaptada a su uso y frecuencia de ocupación. Algunas aseguradoras ofrecen paquetes especiales para viviendas vacacionales." },
    { p: "¿Es lo mismo el seguro del propietario que el del inquilino?", r: "No. El propietario protege el continente y posibles daños a terceros. El inquilino asegura sus pertenencias y su responsabilidad civil personal frente al propietario." },
    { p: "¿Puedo contratar un seguro de hogar online?", r: "Sí. En menos de 5 minutos puedes calcular el precio, comparar coberturas y contratarlo. No obstante, siempre es aconsejable recibir asesoramiento por parte de un mediador de seguros." },
    { p: "¿Qué es la responsabilidad civil en un seguro de hogar?", r: "Es la cobertura que te protege si causas daños involuntarios a terceros, por ejemplo, si se rompe una tubería y moja el piso del vecino. Es una de las coberturas más importantes." },
    { p: "¿El seguro cubre electrodomésticos averiados?", r: "Normalmente se cubren si han sido dañados por sobretensión o siniestros cubiertos. Algunas aseguradoras permiten contratar una cobertura adicional para avería mecánica o electrónica, que suele tener límite de antigüedad." },
    { p: "¿Puedo asegurar objetos de valor como joyas o arte?", r: "Sí, pero deben estar declarados explícitamente en la póliza y, en algunos casos, acompañados de una tasación o factura." },
    { p: "¿Qué hacer si el perito del seguro no está de acuerdo conmigo?", r: "Puedes solicitar un segundo peritaje independiente. La Ley de Contrato de Seguro permite el nombramiento de un tercer perito si ambas partes discrepan." },
    { p: "¿Cómo se calcula la indemnización en caso de siniestro?", r: "Depende del valor asegurado (a nuevo o a valor real), la franquicia y el tipo de daño. Es clave evitar el infraseguro para que no te apliquen la regla proporcional." },
    { p: "¿Qué cubre el seguro de hogar ante un incendio?", r: "Cubre los daños directos por fuego, humo, explosiones y los gastos de extinción. También puede cubrir el alojamiento temporal si la vivienda queda inhabitable." },
    { p: "¿Cubre el seguro de hogar el trastero?", r: "Sí, siempre que esté declarado en la póliza y se encuentre en el mismo edificio. Puede cubrir contenido y daños estructurales en caso de robo o siniestro." },
    { p: "¿Qué es el infraseguro?", r: "Ocurre cuando el valor asegurado es inferior al valor real de los bienes. En caso de siniestro, la indemnización será proporcional, no total." },
    { p: "¿Cómo afecta a la prima tener una alarma o rejas?", r: "Dispositivos de seguridad como alarmas o rejas pueden reducir el riesgo de robo, por lo que algunas aseguradoras aplican descuentos en la prima." },
    { p: "¿Cubre el seguro de hogar los daños por tormentas?", r: "Sí, si están incluidos en la póliza. Suele cubrir daños por viento, lluvia, granizo o nieve, siempre que superen un umbral fijado (normalmente 40 km/h para viento)." },
    { p: "¿Qué ocurre si la vivienda está vacía mucho tiempo?", r: "Las viviendas deshabitadas por más de 90 días pueden tener exclusiones o necesitar pólizas específicas. Es importante notificarlo a la aseguradora." },
    { p: "¿Puedo incluir a mis mascotas en el seguro de hogar?", r: "Algunas aseguradoras incluyen la responsabilidad civil por daños causados por mascotas. No suele cubrir daños al propio animal." },
    { p: "¿Qué pasa si me entran a robar mientras estoy de vacaciones?", r: "Si tienes cobertura de robo, se indemnizarán los bienes sustraídos y los daños materiales. Es importante presentar denuncia policial." },
    { p: "¿Puedo pagar el seguro de hogar en cuotas?", r: "Sí. Muchas aseguradoras permiten pagos mensuales, trimestrales o semestrales, aunque suelen aplicar un recargo sobre el pago anual." },
    { p: "¿Cubre el seguro los daños provocados por el inquilino?", r: "Depende. El propietario puede contratar cobertura por impago y actos vandálicos del inquilino, aunque no todas las aseguradoras lo ofrecen." },
    { p: "¿Qué es la asistencia en el hogar?", r: "Es un servicio que incluye reparación urgente de averías (fontanería, electricidad, cerrajería) y puede incluir manitas o servicios de urgencia 24 h." },
    { p: "¿El seguro cubre actos vandálicos?", r: "Sí, si están incluidos en la póliza y hay denuncia. Suele cubrir daños causados por terceros dentro de la propiedad." },
    { p: "¿Puedo asegurar sólo el contenido?", r: "Sí, especialmente útil para inquilinos. Se asegura el contenido y la responsabilidad civil, sin necesidad de asegurar el continente." },
    { p: "¿Cuánto tarda la aseguradora en arreglar un daño?", r: "Depende del tipo de siniestro y la disponibilidad del perito y proveedor, pero suele resolverse entre 48 h y 15 días desde la aceptación." },
    { p: "¿Qué es una franquicia en el seguro de hogar?", r: "Es la cantidad que el asegurado asume en caso de siniestro. Si hay una franquicia de 100 €, la aseguradora solo pagará por encima de ese importe." },
    { p: "¿Puedo modificar mi seguro a mitad de año?", r: "Sí, aunque depende del tipo de cambio. Puedes añadir coberturas o modificar capitales asegurados, aunque podría implicar recálculo de la prima." },
    { p: "¿Cubre el seguro los daños por cortes eléctricos?", r: "Sí, si están incluidos. Puede cubrir aparatos eléctricos dañados por sobretensión o fallo en la red, si lo establece la póliza." },
    { p: "¿Qué hacer si tengo filtraciones de agua del vecino?", r: "Debes notificar los hechos a tu vecino y también a las aseguradoras, la suya y la tuya. El seguro del responsable suele cubrir los daños. Si no hay acuerdo, se inicia peritación y reclamación." },
    { p: "¿Cubre el seguro la rotura de la vitrocerámica?", r: "Sí, si tu póliza incluye la cobertura de rotura de cristales y encimeras. Esta suele estar presente en los seguros multirriesgo." },
    { p: "¿Qué cubre la cobertura de fenómenos atmosféricos?", r: "Incluye daños por lluvia, viento, granizo o nieve si superan ciertos umbrales. Consulta tu póliza para conocer las condiciones específicas." },
    { p: "¿Qué documentos necesito para dar parte de un siniestro?", r: "Generalmente necesitarás DNI, número de póliza, fecha y descripción del siniestro, fotos del daño y, si aplica, denuncia o facturas." },
    { p: "¿Cómo puedo saber si estoy infrasegurado?", r: "Compara el valor asegurado en tu póliza con el valor de reposición de la vivienda y el contenido. Si el capital declarado es inferior, estás infrasegurado." },
    { p: "¿Qué ocurre si vendo mi vivienda asegurada?", r: "Debes notificar a tu aseguradora. La póliza puede cancelarse o transferirse al nuevo propietario si ambas partes están de acuerdo." },
    { p: "¿Cubre el seguro de hogar las humedades?", r: "Sólo si son causadas por un daño súbito, como la rotura de una tubería. No se cubren humedades por condensación o mala ventilación." },
    { p: "¿Qué pasa si olvido cerrar una ventana y llueve dentro?", r: "Normalmente no se cubren los daños si hay negligencia o descuido por parte del asegurado, salvo que la póliza lo contemple expresamente." },
    { p: "¿Puedo deducir el seguro de hogar en la renta?", r: "Solo en algunos casos, como si la vivienda se destina al alquiler o es vivienda habitual con hipoteca anterior a 2013. Consulta a un asesor fiscal." },
    { p: "¿Qué es la carencia en seguros de hogar?", r: "Es el tiempo que tienes que esperar desde que contratas la póliza hasta que puedes usar una cobertura. No es habitual en seguros de hogar: las coberturas suelen activarse desde la fecha de efecto, salvo excepciones pactadas." },
    { p: "¿El seguro cubre los daños por obras en casa?", r: "No cubre daños ocasionados por reformas mal ejecutadas. Si contratas a un profesional, este debe tener su propio seguro de responsabilidad civil." },
    { p: "¿Cubre el seguro el robo en el trastero?", r: "Sí, si está cubierto en la póliza, y suele tener un límite de indemnización. Es imprescindible que haya signos de fuerza o violencia." },
    { p: "¿Qué incluye la cobertura de defensa jurídica?", r: "Gastos legales por reclamaciones, conflictos con vecinos o proveedores, y asesoramiento legal en temas relacionados con la vivienda." },
    { p: "¿Puedo contratar el seguro por teléfono o internet?", r: "Sí. Puedes comparar precios y contratar online o telefónicamente. Asegúrate de recibir la documentación por escrito." },
    { p: "¿Qué hago si tengo una urgencia fuera de horario?", r: "Las pólizas incluyen asistencia 24/7 para siniestros urgentes como fugas, cerraduras o apagones. Llama al teléfono de emergencias de tu aseguradora." },
    { p: "¿Cómo se calcula el valor del contenido?", r: "Sumando el valor de tus bienes personales. Es recomendable hacer un inventario aproximado y actualizarlo periódicamente." },
    { p: "¿El seguro cubre filtraciones desde el tejado?", r: "Sí, si son causadas por fenómenos cubiertos como tormentas o por daños accidentales. No se cubren filtraciones por falta de mantenimiento." },
    { p: "¿Qué hacer si me quedo fuera de casa sin llaves?", r: "Si tu seguro incluye cerrajería urgente, puedes llamar al servicio de asistencia 24 h para que te abran la puerta. Algunas pólizas cubren este servicio sin coste adicional." },
  ],

  automovil: [
    { p: "¿Qué es un seguro de coche obligatorio?", r: "Es el seguro de responsabilidad civil que cubre los daños que causes a terceros. Es obligatorio para poder circular legalmente en España." },
    { p: "¿Qué incluye un seguro a terceros ampliado?", r: "Incluye responsabilidad civil obligatoria más coberturas adicionales como robo, incendio y rotura de lunas." },
    { p: "¿Qué cubre un seguro a todo riesgo?", r: "Cubre los daños a terceros y también los daños propios del vehículo, aunque el conductor sea responsable del siniestro." },
    { p: "¿Qué es una franquicia?", r: "Es la parte del coste de la reparación que paga el asegurado. El seguro cubre el resto. Reduce el precio del seguro a cambio de asumir ese importe." },
    { p: "¿Cuándo es recomendable un seguro a todo riesgo sin franquicia?", r: "Cuando el vehículo es nuevo o de alto valor, ya que protege íntegramente cualquier daño propio sin costes añadidos." },
    { p: "¿Cuándo se puede cambiar de compañía aseguradora?", r: "Hasta 30 días antes del vencimiento de la póliza actual. Es necesario notificar la cancelación a la aseguradora anterior." },
    { p: "¿Qué cubre la asistencia en carretera?", r: "Incluye remolque del vehículo, asistencia mecánica in situ, envío de taxi, alojamiento si es necesario, y repatriación del vehículo y ocupantes." },
    { p: "¿Qué ocurre si conduzco sin seguro?", r: "Es una infracción grave sancionada con multas desde 601 € hasta 3.005 €, inmovilización del vehículo y posible retirada del permiso." },
    { p: "¿Qué pasa si mi coche tiene más de un conductor?", r: "Debe incluirse al segundo conductor en la póliza para que esté cubierto. Si no está declarado, puede haber problemas en caso de siniestro." },
    { p: "¿Se puede asegurar un coche sin ser el propietario?", r: "Sí. El tomador del seguro puede ser distinto del propietario, pero debe haber una relación legal o familiar demostrable." },
    { p: "¿Cómo se calcula el precio de un seguro de coche?", r: "Depende de factores como edad y experiencia del conductor, historial de siniestralidad, tipo de coche, lugar de residencia y coberturas contratadas." },
    { p: "¿Puedo asegurar un coche con matrícula extranjera?", r: "Sólo temporalmente y bajo condiciones específicas. Lo habitual es tener que matricularlo en España para contratar un seguro estándar." },
    { p: "¿Qué cubre el seguro si me roban el coche?", r: "Si tienes cobertura de robo, se indemniza el valor venal o de reposición del coche. También se cubren los daños por intento de robo." },
    { p: "¿Qué es el valor venal?", r: "Es el valor de mercado del vehículo en el momento del siniestro, teniendo en cuenta su antigüedad y estado." },
    { p: "¿Qué es el valor de nuevo?", r: "Es el precio del coche nuevo, como si lo compraras por primera vez. Algunos seguros lo cubren durante los primeros 2 años." },
    { p: "¿Qué es el valor de mercado mejorado?", r: "Es una modalidad que ofrece una indemnización superior al valor venal, sin llegar al valor de nuevo. Mejora la compensación tras un siniestro total." },
    { p: "¿El seguro cubre los daños por granizo?", r: "Sólo si tienes un seguro a todo riesgo. Las pólizas a terceros no suelen incluir este tipo de daños." },
    { p: "¿El seguro cubre los neumáticos?", r: "Normalmente no, salvo que se dañen en un siniestro cubierto por la póliza. El desgaste por uso nunca se cubre." },
    { p: "¿Qué es un parte amistoso?", r: "Es un documento firmado por los implicados en un accidente que detalla cómo ocurrió el siniestro, facilitando la gestión del parte por las aseguradoras." },
    { p: "¿Puedo declarar un parte por la app del seguro?", r: "Sí. La mayoría de aseguradoras permiten notificar siniestros y enviar fotos a través de sus aplicaciones móviles." },
    { p: "¿El seguro cubre el remolque si me quedo sin gasolina?", r: "En general sí, si tienes contratada la asistencia en carretera desde el kilómetro 0. Algunas aseguradoras también ofrecen repostaje in situ." },
    { p: "¿Puedo conducir un coche asegurado si no soy el titular?", r: "Sí, si estás autorizado y no existe una limitación específica en la póliza respecto a conductores no declarados." },
    { p: "¿Qué cubre el seguro si el conductor tiene menos de 25 años?", r: "Si está declarado en la póliza, está cubierto. Si no, la aseguradora puede no asumir el siniestro o aplicar franquicias especiales." },
    { p: "¿Qué es la bonificación por no siniestralidad?", r: "Es un descuento progresivo en la prima que premia a los conductores que no declaran siniestros durante varios años." },
    { p: "¿Puedo contratar un seguro de coche online?", r: "Sí. Puedes comparar precios, contratar y recibir toda la documentación por email sin moverte de casa." },
    { p: "¿Qué hago si me chocan y el otro conductor se da a la fuga?", r: "Debes presentar denuncia a la policía y avisar a tu aseguradora. El Consorcio de Compensación de Seguros podría cubrirte en casos graves." },
    { p: "¿Qué cubre la responsabilidad civil voluntaria?", r: "Amplía los límites de indemnización de la responsabilidad civil obligatoria para cubrir daños mayores." },
    { p: "¿Qué ocurre si el accidente es culpa mía?", r: "Si tienes seguro a terceros, solo se cubrirán los daños al otro vehículo. Si tienes todo riesgo, también se cubren tus daños." },
    { p: "¿Es obligatorio declarar los accesorios del coche?", r: "Sí, si son elementos no de serie como llantas especiales o equipos de sonido. De lo contrario, no estarán cubiertos." },
    { p: "¿El seguro cubre los daños por colisión con animales?", r: "Depende de la póliza. Algunos seguros a todo riesgo o ampliados lo incluyen. Es más común en zonas rurales." },
    { p: "¿Qué hago si vendo mi coche asegurado?", r: "Debes notificar a la aseguradora para cancelar la póliza o transferirla al nuevo propietario si es posible." },
    { p: "¿Puedo asegurar un coche sin ITV?", r: "No. Para contratar un seguro en vigor, el coche debe tener la ITV al día." },
    { p: "¿El seguro cubre un coche parado en garaje?", r: "Sí, siempre que esté asegurado. Aunque no circule, puede sufrir incendios, robos o causar daños a terceros." },
    { p: "¿Qué pasa si cambio de domicilio?", r: "Debes comunicarlo a la aseguradora. El precio del seguro puede variar en función del nuevo código postal." },
    { p: "¿El seguro cubre los daños a terceros en caso de lluvia intensa?", r: "Sí, si el accidente fue inevitable y no hubo negligencia. Los fenómenos meteorológicos extremos pueden estar cubiertos por el Consorcio." },
    { p: "¿Qué diferencia hay entre tomador, asegurado y conductor habitual?", r: "El tomador paga la póliza, el asegurado es quien recibe las coberturas y el conductor habitual es quien usa el coche a diario. Pueden coincidir o no." },
    { p: "¿Qué es el Consorcio de Compensación de Seguros?", r: "Es una entidad pública que cubre daños extraordinarios como inundaciones, terremotos o terrorismo cuando tienes un seguro en vigor." },
    { p: "¿Qué es la carta verde?", r: "Es un documento que acredita la validez del seguro en viajes internacionales fuera de la UE. Puede ser necesario en algunos países." },
    { p: "¿Qué pasa si tengo un accidente en el extranjero?", r: "Tu seguro te cubre en la UE y países del Convenio Multilateral. Consulta el alcance de asistencia en viaje en tu póliza." },
  ],
};

/** Normaliza una pregunta para detectar repetidas escritas de otra forma. */
const clave = (p: string) =>
  p
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?.,;:!¡]/g, "")
    .replace(/\bde (salud|vida|hogar|coche|automovil)\b/g, "")
    .replace(/\b(el|la|los|las|un|una|mi|tu)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Preguntas de un ramo: primero las propias del comparador, después las que
 * ya estaban publicadas en la web de la correduría, sin repetir ninguna.
 */
export function faqsDe(ramo: Ramo) {
  const fuera = faqsMarchal[ramo.slug] ?? [];
  const vistas = new Set(ramo.faqs.map((f) => clave(f.p)));
  const extra = fuera.filter((f) => {
    const k = clave(f.p);
    if (vistas.has(k)) return false;
    vistas.add(k);
    return true;
  });
  return [...ramo.faqs, ...extra];
}
