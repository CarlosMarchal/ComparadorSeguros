import type { FamiliaSlug } from "./site";

export type TipoCriterio = "bool" | "texto" | "importe" | "escala";

export type Criterio = {
  /** clave usada en cada producto */
  id: string;
  /** etiqueta de la fila en la tabla comparativa */
  label: string;
  tipo: TipoCriterio;
  /** ayuda contextual que se muestra en un tooltip */
  ayuda?: string;
  /** true cuando un valor más alto es mejor (para el resaltado) */
  masEsMejor?: boolean;
  /** se muestra en la vista resumida de la tarjeta */
  destacado?: boolean;
};

export type Ramo = {
  slug: string;
  nombre: string;
  nombreCorto: string;
  familia: FamiliaSlug;
  icono: string;
  /** frase de una línea para tarjetas y menús */
  resumen: string;
  /**
   * Cómo se nombra el ramo detrás de «Comparar seguros …». Va aparte de
   * `nombreCorto` porque la gente busca «seguros de coche», no «de automóvil»,
   * y porque los colectivos piden plural: «seguros colectivos de salud».
   */
  paraTitulo: string;
  /** dos o tres párrafos para la cabecera de la página */
  intro: string[];
  /** ventajas cortas, se pintan como chips */
  claves: string[];
  /** filas de la tabla comparativa */
  criterios: Criterio[];
  /** para la ficha del ramo: qué mirar antes de contratar */
  consejos: { titulo: string; texto: string }[];
  faqs: { p: string; r: string }[];
  /** URL equivalente en la web corporativa actual */
  urlOriginal: string;
  comparable: boolean;
};

const criteriosSalud: Criterio[] = [
  { id: "modalidad", label: "Modalidad", tipo: "texto", destacado: true, ayuda: "Cuadro médico, con copago o reembolso de gastos." },
  { id: "copago", label: "Copago por acto médico", tipo: "texto", destacado: true },
  { id: "cuadroMedico", label: "Tamaño del cuadro médico", tipo: "texto", destacado: true },
  { id: "carenciaGeneral", label: "Carencia general", tipo: "texto" },
  { id: "carenciaParto", label: "Carencia parto", tipo: "texto" },
  { id: "hospitalizacion", label: "Hospitalización", tipo: "bool" },
  { id: "urgencias24h", label: "Urgencias 24 h", tipo: "bool" },
  { id: "dental", label: "Dental incluido", tipo: "bool" },
  { id: "psicologia", label: "Psicología", tipo: "bool" },
  { id: "reembolso", label: "Reembolso de gastos", tipo: "texto" },
  { id: "extranjero", label: "Cobertura en el extranjero", tipo: "texto" },
  { id: "telemedicina", label: "Videoconsulta 24 h", tipo: "bool" },
  { id: "edadMaxima", label: "Edad máxima de contratación", tipo: "texto" },
];

const criteriosHogar: Criterio[] = [
  { id: "continente", label: "Continente asegurado", tipo: "texto", destacado: true },
  { id: "contenido", label: "Contenido asegurado", tipo: "texto", destacado: true },
  { id: "rc", label: "Responsabilidad civil", tipo: "importe", destacado: true },
  { id: "aguaElectricidad", label: "Daños por agua y electricidad", tipo: "bool" },
  { id: "robo", label: "Robo dentro y fuera del hogar", tipo: "bool" },
  { id: "joyas", label: "Joyas y objetos de valor", tipo: "texto" },
  { id: "asistencia", label: "Asistencia 24 h (manitas)", tipo: "bool" },
  { id: "cristales", label: "Rotura de cristales", tipo: "bool" },
  { id: "bricolaje", label: "Servicio de bricolaje anual", tipo: "texto" },
  { id: "franquicia", label: "Franquicia", tipo: "texto" },
  { id: "inquilinos", label: "Válido para inquilinos", tipo: "bool" },
];

const criteriosAuto: Criterio[] = [
  { id: "modalidad", label: "Modalidad", tipo: "texto", destacado: true },
  { id: "franquicia", label: "Franquicia", tipo: "texto", destacado: true },
  { id: "asistencia", label: "Asistencia en carretera", tipo: "texto", destacado: true },
  { id: "lunas", label: "Lunas", tipo: "bool" },
  { id: "roboIncendio", label: "Robo e incendio", tipo: "bool" },
  { id: "vehiculoSustitucion", label: "Vehículo de sustitución", tipo: "texto" },
  { id: "conductorOcasional", label: "Conductor ocasional", tipo: "bool" },
  { id: "defensaJuridica", label: "Defensa jurídica y multas", tipo: "bool" },
  { id: "tallerLibre", label: "Libre elección de taller", tipo: "bool" },
  { id: "valorNuevo", label: "Indemnización a valor de nuevo", tipo: "texto" },
];

const criteriosVida: Criterio[] = [
  { id: "capital", label: "Capital asegurado", tipo: "texto", destacado: true },
  { id: "invalidez", label: "Invalidez absoluta y permanente", tipo: "bool", destacado: true },
  { id: "graves", label: "Enfermedades graves", tipo: "bool", destacado: true },
  { id: "accidente", label: "Doble capital por accidente", tipo: "bool" },
  { id: "anticipo", label: "Anticipo de capital", tipo: "bool" },
  { id: "cuestionario", label: "Cuestionario de salud", tipo: "texto" },
  { id: "edadMaxima", label: "Edad máxima de contratación", tipo: "texto" },
  { id: "fiscalidad", label: "Beneficiarios modificables", tipo: "bool" },
];

const criteriosDecesos: Criterio[] = [
  { id: "modalidad", label: "Modalidad de prima", tipo: "texto", destacado: true, ayuda: "Natural, nivelada, mixta o prima única." },
  { id: "capital", label: "Capital de servicio", tipo: "texto", destacado: true },
  { id: "traslado", label: "Traslado nacional e internacional", tipo: "bool", destacado: true },
  { id: "tramites", label: "Gestión de trámites y testamentaría", tipo: "bool" },
  { id: "asistenciaViaje", label: "Asistencia en viaje", tipo: "bool" },
  { id: "carencia", label: "Carencia", tipo: "texto" },
  { id: "edadMaxima", label: "Edad máxima de contratación", tipo: "texto" },
  { id: "libreEleccion", label: "Libre elección de funeraria", tipo: "bool" },
];

const criteriosMascotas: Criterio[] = [
  { id: "rc", label: "Responsabilidad civil", tipo: "importe", destacado: true },
  { id: "veterinario", label: "Gastos veterinarios", tipo: "texto", destacado: true },
  { id: "urgencias", label: "Urgencias veterinarias 24 h", tipo: "bool", destacado: true },
  { id: "vacunas", label: "Vacunas y desparasitación", tipo: "texto" },
  { id: "ppp", label: "Perros potencialmente peligrosos", tipo: "bool" },
  { id: "sacrificio", label: "Sacrificio e incineración", tipo: "bool" },
  { id: "extravio", label: "Búsqueda por extravío", tipo: "bool" },
  { id: "edadMaxima", label: "Edad máxima de alta", tipo: "texto" },
];

const criteriosViaje: Criterio[] = [
  { id: "gastosMedicos", label: "Gastos médicos en el extranjero", tipo: "importe", destacado: true },
  { id: "repatriacion", label: "Repatriación sanitaria", tipo: "bool", destacado: true },
  { id: "cancelacion", label: "Cancelación de viaje", tipo: "texto", destacado: true },
  { id: "equipaje", label: "Pérdida de equipaje", tipo: "importe" },
  { id: "demoras", label: "Demoras y pérdida de enlaces", tipo: "bool" },
  { id: "deportes", label: "Deportes de aventura", tipo: "bool" },
  { id: "covid", label: "Cobertura por enfermedad infecciosa", tipo: "bool" },
  { id: "ambito", label: "Ámbito geográfico", tipo: "texto" },
];

const criteriosAhorro: Criterio[] = [
  { id: "producto", label: "Tipo de producto", tipo: "texto", destacado: true, ayuda: "PIAS, SIALP, unit linked, plan de pensiones o renta vitalicia." },
  { id: "aportacionMinima", label: "Aportación mínima", tipo: "texto", destacado: true },
  { id: "rentabilidad", label: "Rentabilidad", tipo: "texto", destacado: true },
  { id: "garantizado", label: "Capital garantizado", tipo: "bool" },
  { id: "liquidez", label: "Liquidez", tipo: "texto" },
  { id: "fiscalidad", label: "Ventaja fiscal", tipo: "texto" },
  { id: "aportacionExtra", label: "Aportaciones extraordinarias", tipo: "bool" },
];

const criteriosAccidentes: Criterio[] = [
  { id: "fallecimiento", label: "Capital por fallecimiento", tipo: "texto", destacado: true },
  { id: "invalidez", label: "Invalidez permanente", tipo: "texto", destacado: true },
  { id: "ambito", label: "Ámbito de cobertura", tipo: "texto", destacado: true },
  { id: "asistenciaSanitaria", label: "Asistencia sanitaria por accidente", tipo: "bool" },
  { id: "hospitalizacion", label: "Subsidio por hospitalización", tipo: "texto" },
  { id: "deportes", label: "Práctica deportiva amateur", tipo: "bool" },
  { id: "laboral", label: "Accidente laboral incluido", tipo: "bool" },
];

const criteriosRC: Criterio[] = [
  { id: "limite", label: "Límite por siniestro", tipo: "importe", destacado: true },
  { id: "explotacion", label: "RC de explotación", tipo: "bool", destacado: true },
  { id: "patronal", label: "RC patronal", tipo: "texto", destacado: true },
  { id: "productos", label: "RC de productos y post-trabajos", tipo: "bool" },
  { id: "locativa", label: "RC locativa", tipo: "bool" },
  { id: "defensaJuridica", label: "Defensa jurídica y fianzas", tipo: "bool" },
  { id: "ambito", label: "Ámbito territorial", tipo: "texto" },
  { id: "franquicia", label: "Franquicia", tipo: "texto" },
];

const criteriosEmpresa: Criterio[] = [
  { id: "continente", label: "Continente", tipo: "texto", destacado: true },
  { id: "existencias", label: "Existencias y mercancías", tipo: "texto", destacado: true },
  { id: "perdidaBeneficios", label: "Pérdida de beneficios", tipo: "texto", destacado: true },
  { id: "rc", label: "Responsabilidad civil incluida", tipo: "importe" },
  { id: "averiaMaquinaria", label: "Avería de maquinaria", tipo: "bool" },
  { id: "equiposElectronicos", label: "Equipos electrónicos", tipo: "bool" },
  { id: "roboMetalico", label: "Robo de metálico", tipo: "texto" },
  { id: "ciber", label: "Cobertura ciber", tipo: "bool" },
  { id: "asistencia24", label: "Asistencia 24 h al negocio", tipo: "bool" },
];

const criteriosComunidad: Criterio[] = [
  { id: "continente", label: "Continente del edificio", tipo: "texto", destacado: true },
  { id: "rc", label: "Responsabilidad civil de la comunidad", tipo: "importe", destacado: true },
  { id: "danosAgua", label: "Daños por agua y localización de averías", tipo: "bool", destacado: true },
  { id: "rcPresidente", label: "RC de administradores y presidente", tipo: "bool" },
  { id: "instalaciones", label: "Piscina, ascensor y zonas comunes", tipo: "bool" },
  { id: "defensaJuridica", label: "Defensa jurídica y reclamación de cuotas", tipo: "bool" },
  { id: "asistencia", label: "Asistencia 24 h", tipo: "bool" },
  { id: "franquicia", label: "Franquicia", tipo: "texto" },
];

const criteriosTransporte: Criterio[] = [
  { id: "modalidad", label: "Modalidad", tipo: "texto", destacado: true, ayuda: "Póliza por viaje o abono anual." },
  { id: "capital", label: "Capital máximo por expedición", tipo: "texto", destacado: true },
  { id: "ambito", label: "Ámbito geográfico", tipo: "texto", destacado: true },
  { id: "medios", label: "Medios de transporte cubiertos", tipo: "texto" },
  { id: "todoRiesgo", label: "Todo riesgo de daños", tipo: "bool" },
  { id: "roboExpoliacion", label: "Robo y expoliación", tipo: "bool" },
  { id: "estancias", label: "Estancias intermedias", tipo: "bool" },
  { id: "franquicia", label: "Franquicia", tipo: "texto" },
];

const criteriosMaquinaria: Criterio[] = [
  { id: "cobertura", label: "Tipo de cobertura", tipo: "texto", destacado: true },
  { id: "capital", label: "Capital asegurado", tipo: "texto", destacado: true },
  { id: "manoObra", label: "Mano de obra y transporte", tipo: "bool", destacado: true },
  { id: "equiposElectronicos", label: "Equipos electrónicos y datos", tipo: "bool" },
  { id: "portatiles", label: "Equipos móviles fuera del recinto", tipo: "bool" },
  { id: "errorHumano", label: "Error humano y negligencia", tipo: "bool" },
  { id: "depreciacion", label: "Indemnización a valor de nuevo", tipo: "texto" },
  { id: "franquicia", label: "Franquicia", tipo: "texto" },
];

const criteriosColectivoSalud: Criterio[] = [
  { id: "minimoAsegurados", label: "Número mínimo de asegurados", tipo: "texto", destacado: true },
  { id: "modalidad", label: "Modalidad", tipo: "texto", destacado: true },
  { id: "carencias", label: "Supresión de carencias", tipo: "bool", destacado: true },
  { id: "preexistencias", label: "Preexistencias admitidas", tipo: "texto" },
  { id: "familiares", label: "Extensible a familiares", tipo: "bool" },
  { id: "retribucionFlexible", label: "Apto para retribución flexible", tipo: "bool" },
  { id: "portal", label: "Portal de gestión para RR. HH.", tipo: "bool" },
];

const criteriosColectivoAccidentes: Criterio[] = [
  { id: "convenio", label: "Adaptado a convenio colectivo", tipo: "bool", destacado: true },
  { id: "capitales", label: "Capitales asegurados", tipo: "texto", destacado: true },
  { id: "ambito", label: "Ámbito de cobertura", tipo: "texto", destacado: true },
  { id: "invalidez", label: "Invalidez permanente", tipo: "bool" },
  { id: "granInvalidez", label: "Gran invalidez", tipo: "bool" },
  { id: "asistencia", label: "Asistencia sanitaria ilimitada", tipo: "bool" },
  { id: "altasBajas", label: "Altas y bajas automáticas", tipo: "bool" },
];

const criteriosColectivoVida: Criterio[] = [
  { id: "capitales", label: "Capitales asegurados", tipo: "texto", destacado: true },
  { id: "invalidez", label: "Invalidez absoluta y permanente", tipo: "bool", destacado: true },
  { id: "cuestionario", label: "Cuestionario de salud", tipo: "texto", destacado: true },
  { id: "convenio", label: "Cumple compromiso por convenio", tipo: "bool" },
  { id: "exteriorizacion", label: "Exteriorización de compromisos", tipo: "bool" },
  { id: "graves", label: "Enfermedades graves", tipo: "bool" },
  { id: "altasBajas", label: "Altas y bajas automáticas", tipo: "bool" },
];

export const ramos: Ramo[] = [
  {
    slug: "salud",
    nombre: "Seguro de Salud y Asistencia Sanitaria Privada",
    nombreCorto: "Salud",
    familia: "personales",
    icono: "salud",
    resumen:
      "Cuadro médico, copago o reembolso: compara coberturas, carencias y precio entre las principales aseguradoras.",
    paraTitulo: "de salud",
    intro: [
      "Un seguro de salud privado te da acceso directo a consultas, pruebas diagnósticas, hospitalización, urgencias y cirugía sin listas de espera, eligiendo tú el médico y el centro.",
      "La diferencia real entre pólizas no está en el titular, está en tres detalles: si hay copago y de cuánto, qué carencias aplican durante el primer año y qué tamaño tiene el cuadro médico en tu provincia.",
      "Abajo tienes la comparativa compañía a compañía. Si prefieres que lo veamos contigo, en una llamada te decimos cuál encaja con tu edad, tu ciudad y el uso que vayas a darle.",
    ],
    claves: [
      "Sin listas de espera",
      "Eliges médico y centro",
      "Cobertura familiar",
      "Videoconsulta 24 h",
    ],
    criterios: criteriosSalud,
    consejos: [
      {
        titulo: "Mira el copago antes que la prima",
        texto:
          "Una póliza con copago sale más barata al mes, pero si vas al especialista con frecuencia acabas pagando más al año. Calcula tus visitas previstas y multiplica.",
      },
      {
        titulo: "Comprueba el cuadro médico en tu código postal",
        texto:
          "Un cuadro médico enorme a nivel nacional no sirve de nada si el especialista que necesitas no pasa consulta cerca de casa. Revisa por provincia y por especialidad.",
      },
      {
        titulo: "Las carencias marcan el primer año",
        texto:
          "Hospitalización, parto y pruebas de alta tecnología suelen tener carencia. Si vienes de otra compañía, muchas aseguradoras las suprimen aportando el recibo anterior.",
      },
    ],
    faqs: [
      {
        p: "¿Cuánto cuesta un seguro de salud en España?",
        r: "Depende sobre todo de la edad y de la modalidad. Una póliza con copago para un adulto joven parte de cifras muy contenidas, mientras que una póliza de reembolso para una persona mayor de 60 años puede multiplicar esa cifra por varias veces. Lo que sí se mantiene es la lógica: a más edad y menos copago, más prima.",
      },
      {
        p: "¿Qué es el periodo de carencia?",
        r: "Es el tiempo que debe transcurrir desde el alta hasta que una cobertura concreta está disponible. Las consultas de medicina general suelen estar cubiertas desde el primer día; la hospitalización, la cirugía o el parto tienen carencias que van de unos meses a varios meses según la compañía.",
      },
      {
        p: "¿Cubre el seguro las enfermedades preexistentes?",
        r: "Como norma general, no: lo que ya existe antes de contratar queda excluido si se declaró, y puede anular la cobertura si no se declaró. Por eso el cuestionario de salud hay que rellenarlo con exactitud. En pólizas colectivas de empresa es frecuente que sí se admitan.",
      },
      {
        p: "¿Qué diferencia hay entre cuadro médico y reembolso?",
        r: "Con cuadro médico acudes a los profesionales concertados por la compañía y no pagas (o pagas el copago). Con reembolso eliges cualquier médico del mundo, pagas tú y la aseguradora te devuelve un porcentaje de la factura, normalmente entre el 80 % y el 90 %.",
      },
      {
        p: "¿Puedo deducir el seguro de salud en la declaración de la renta?",
        r: "Los autónomos pueden deducir las primas propias, del cónyuge y de los hijos menores de 25 años que convivan con ellos, con un límite anual por persona. Para trabajadores por cuenta ajena, la vía habitual es la retribución flexible a través de la empresa.",
      },
      {
        p: "¿Puedo cambiar de compañía sin perder la antigüedad?",
        r: "Sí. La mayoría de aseguradoras suprimen las carencias si acreditas que vienes de otra póliza de salud en vigor. Hay que solicitarlo al contratar y aportar el último recibo o un certificado de la compañía anterior.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-de-salud-y-asistencia-sanitaria-privada/",
    comparable: true,
  },
  {
    slug: "vida",
    nombre: "Seguro de Vida",
    nombreCorto: "Vida",
    familia: "personales",
    icono: "vida",
    resumen:
      "Capital para los tuyos ante fallecimiento, invalidez o enfermedad grave. Compara coberturas y condiciones de contratación.",
    paraTitulo: "de vida",
    intro: [
      "El seguro de vida paga un capital a las personas que designes si tú faltas, y en las modalidades más completas también si sufres una invalidez absoluta o te diagnostican una enfermedad grave.",
      "Es el producto que sostiene una hipoteca, un negocio familiar o los estudios de los hijos cuando desaparece un ingreso. Y es también donde más se nota la letra pequeña: el cuestionario de salud, las exclusiones y la definición exacta de invalidez.",
    ],
    claves: [
      "Capital libre de elección",
      "Invalidez y enfermedades graves",
      "Beneficiarios modificables",
      "Primas ajustadas por edad",
    ],
    criterios: criteriosVida,
    consejos: [
      {
        titulo: "Calcula el capital, no lo intuyas",
        texto:
          "Una referencia sensata: deuda pendiente más entre tres y cinco años de los ingresos que aporta la persona asegurada. Quedarse corto hace inútil la póliza.",
      },
      {
        titulo: "Lee cómo define la compañía la invalidez",
        texto:
          "No es lo mismo invalidez absoluta para toda profesión que invalidez para la profesión habitual. La segunda es mucho más protectora y no todas las pólizas la ofrecen.",
      },
      {
        titulo: "No firmes la vida que te vende el banco sin comparar",
        texto:
          "Vincular el seguro de vida a la hipoteca es legal, contratarlo obligatoriamente con la entidad no lo es. Puedes llevártelo a otra compañía manteniendo al banco como beneficiario.",
      },
    ],
    faqs: [
      {
        p: "¿Es obligatorio contratar el seguro de vida con el banco de la hipoteca?",
        r: "No. El banco puede exigir que exista un seguro de vida, pero no puede obligarte a contratarlo con él. Puedes contratarlo con la compañía que prefieras y designar a la entidad como beneficiaria por el importe pendiente.",
      },
      {
        p: "¿Qué pasa si oculto algo en el cuestionario de salud?",
        r: "La aseguradora puede reducir la indemnización proporcionalmente o rechazarla si demuestra que hubo dolo o culpa grave. Declarar de más nunca perjudica; declarar de menos puede dejar a tu familia sin cobro.",
      },
      {
        p: "¿Tributa el capital que reciben los beneficiarios?",
        r: "El capital por fallecimiento tributa en el Impuesto de Sucesiones y Donaciones, con reducciones que varían mucho según la comunidad autónoma y el parentesco. Si el tomador y el beneficiario son la misma persona, tributa en el IRPF.",
      },
      {
        p: "¿Puedo cambiar de beneficiarios?",
        r: "Sí, en cualquier momento y sin dar explicaciones, salvo que hayas hecho una designación irrevocable. Conviene revisarlos tras cualquier cambio familiar importante.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-de-vida/",
    comparable: true,
  },
  {
    slug: "decesos",
    nombre: "Seguro de Decesos y Gastos de Sepelio",
    nombreCorto: "Decesos",
    familia: "personales",
    icono: "decesos",
    resumen:
      "Servicio funerario completo y gestión de trámites. Compara modalidad de prima, capital y traslados.",
    paraTitulo: "de decesos",
    intro: [
      "El seguro de decesos cubre el coste del servicio funerario y, sobre todo, se ocupa de organizarlo: tanatorio, traslado, ceremonia, esquelas y los trámites administrativos posteriores.",
      "La decisión importante no es el precio de hoy, es la modalidad de prima: determina cuánto pagarás dentro de veinte años.",
    ],
    claves: [
      "Servicio completo organizado",
      "Traslado nacional e internacional",
      "Gestión de testamentaría",
      "Asistencia en viaje incluida",
    ],
    criterios: criteriosDecesos,
    consejos: [
      {
        titulo: "Prima natural, nivelada o mixta",
        texto:
          "La natural empieza barata y sube cada año con la edad. La nivelada cuesta más al principio pero se mantiene estable. La mixta sube hasta cierta edad y luego se estabiliza. Para una persona joven, la nivelada suele salir mejor a largo plazo.",
      },
      {
        titulo: "Comprueba el capital de servicio",
        texto:
          "Un servicio funerario completo en una capital española tiene un coste considerable y creciente. Si el capital contratado se queda corto, la diferencia la paga la familia.",
      },
      {
        titulo: "Si eres de fuera de España, mira el traslado internacional",
        texto:
          "No todas las pólizas cubren la repatriación al país de origen, y las que lo hacen pueden limitar países o exigir antigüedad. Es la cobertura decisiva para población extranjera residente.",
      },
    ],
    faqs: [
      {
        p: "¿Qué modalidad de prima me conviene?",
        r: "Depende de tu edad. Por debajo de los 45-50 años, la prima nivelada suele compensar porque congela el coste. A partir de cierta edad, la diferencia se estrecha y conviene comparar el coste acumulado previsto, no la cuota del primer año.",
      },
      {
        p: "¿Puedo elegir yo la funeraria?",
        r: "La ley reconoce el derecho de la familia a elegir prestador funerario. En la práctica, si eliges uno fuera del cuadro de la compañía, esta indemniza hasta el límite del capital contratado y la diferencia la asume la familia.",
      },
      {
        p: "¿Hay carencia en el seguro de decesos?",
        r: "Lo habitual es una carencia de unos meses para fallecimiento por enfermedad, sin carencia cuando se debe a accidente. Varía por compañía y conviene confirmarlo antes de firmar.",
      },
      {
        p: "¿Qué pasa si dejo de pagar tras muchos años?",
        r: "En pólizas de prima nivelada suele existir un derecho de rescate o de reducción que conserva parte del capital. En prima natural, normalmente se pierde la cobertura sin valor residual.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-de-decesos/",
    comparable: true,
  },
  {
    slug: "accidentes-personales",
    nombre: "Seguro de Accidentes Personales",
    nombreCorto: "Accidentes",
    familia: "personales",
    icono: "accidentes",
    resumen:
      "Capital ante fallecimiento o invalidez por accidente, las 24 horas del día y en cualquier lugar.",
    paraTitulo: "de accidentes",
    intro: [
      "El seguro de accidentes paga un capital si sufres un accidente que provoque fallecimiento o una invalidez permanente, dentro o fuera del trabajo según lo que contrates.",
      "Es un complemento barato al seguro de vida y, en muchos convenios colectivos, una obligación de la empresa.",
    ],
    claves: [
      "Cobertura 24 h",
      "Dentro y fuera del trabajo",
      "Capitales a medida",
      "Compatible con otras pólizas",
    ],
    criterios: criteriosAccidentes,
    consejos: [
      {
        titulo: "Revisa el baremo de invalidez",
        texto:
          "El capital por invalidez parcial se paga según un baremo porcentual. Dos pólizas con el mismo capital pueden indemnizar muy distinto por la misma lesión.",
      },
      {
        titulo: "Comprueba si tu deporte está excluido",
        texto:
          "Escalada, motociclismo, buceo o esquí fuera de pista suelen quedar fuera salvo cobertura expresa. Si los practicas, hay que decirlo.",
      },
    ],
    faqs: [
      {
        p: "¿Es lo mismo que un seguro de vida?",
        r: "No. El de vida paga por fallecimiento sea cual sea la causa, incluida la enfermedad. El de accidentes solo cubre el accidente, y por eso es mucho más barato.",
      },
      {
        p: "¿Cubre los accidentes laborales?",
        r: "Sí si contratas el ámbito 24 horas. Muchos convenios obligan a la empresa a tener una póliza específica para sus trabajadores, que es compatible con la que contrates tú a título individual.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-de-accidentes-personales/",
    comparable: true,
  },
  {
    slug: "ahorro",
    nombre: "Planes de Ahorro, Pensiones, PIAS y SIALP",
    nombreCorto: "Ahorro",
    familia: "personales",
    icono: "ahorro",
    resumen:
      "PIAS, SIALP, unit linked y planes de pensiones. Compara rentabilidad, liquidez y ventaja fiscal.",
    paraTitulo: "de ahorro",
    intro: [
      "Los seguros de ahorro son vehículos para acumular capital a medio y largo plazo con un tratamiento fiscal propio: PIAS, SIALP, unit linked, rentas vitalicias y planes de pensiones.",
      "Cada uno responde a un objetivo distinto. La pregunta correcta no es cuál renta más, sino cuándo vas a necesitar el dinero y qué riesgo estás dispuesto a asumir hasta entonces.",
    ],
    claves: [
      "Ventajas fiscales",
      "Aportaciones flexibles",
      "Horizonte a medida",
      "Opción de capital garantizado",
    ],
    criterios: criteriosAhorro,
    consejos: [
      {
        titulo: "La liquidez es la variable olvidada",
        texto:
          "Un plan de pensiones no se puede rescatar libremente hasta la jubilación salvo supuestos excepcionales. Un PIAS sí. Si el dinero puede hacerte falta antes, esto pesa más que medio punto de rentabilidad.",
      },
      {
        titulo: "Compara la rentabilidad neta de comisiones",
        texto:
          "La cifra que importa es la que queda después de gastos de gestión y depósito. Pide siempre la rentabilidad histórica neta, no la bruta.",
      },
    ],
    faqs: [
      {
        p: "¿Qué diferencia hay entre un PIAS y un SIALP?",
        r: "Ambos premian el largo plazo exonerando de tributación la rentabilidad si se cumplen los requisitos. El PIAS exige cobrar en forma de renta vitalicia tras un plazo mínimo; el SIALP tiene un límite de aportación anual más bajo y exige mantener la inversión un mínimo de años cobrando en forma de capital.",
      },
      {
        p: "¿Los planes de pensiones siguen siendo interesantes?",
        r: "Su atractivo se ha reducido porque el límite de aportación individual con derecho a deducción se recortó de forma notable en los últimos años. Los planes de empleo promovidos por la empresa mantienen límites más altos.",
      },
      {
        p: "¿Puedo dejar de aportar cuando quiera?",
        r: "En la mayoría de productos de ahorro-seguro sí, sin penalización, manteniendo el capital acumulado. Conviene confirmarlo porque algunos exigen una aportación mínima para conservar las condiciones pactadas.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguros-de-ahorro/",
    comparable: true,
  },
  {
    slug: "hogar",
    nombre: "Seguro Multirriesgo de Hogar",
    nombreCorto: "Hogar",
    familia: "hogar",
    icono: "hogar",
    resumen:
      "Continente, contenido, responsabilidad civil y asistencia 24 h. Compara capitales y franquicias.",
    paraTitulo: "de hogar",
    intro: [
      "El multirriesgo de hogar protege la vivienda (continente), lo que hay dentro (contenido) y tu responsabilidad frente a terceros, además de darte asistencia urgente cuando algo se rompe.",
      "El error más común es asegurar mal los capitales: si declaras un continente por debajo de su valor de reconstrucción, la compañía aplica la regla proporcional y te paga solo una parte del daño.",
    ],
    claves: [
      "Daños por agua",
      "Robo dentro y fuera",
      "Asistencia 24 h",
      "Responsabilidad civil",
    ],
    criterios: criteriosHogar,
    consejos: [
      {
        titulo: "El continente no es el precio de compra",
        texto:
          "Es lo que costaría reconstruir la vivienda sin contar el suelo. Declararlo por el precio de mercado suele llevar a sobreasegurar y pagar de más; declararlo a la baja activa la regla proporcional.",
      },
      {
        titulo: "Cuenta el contenido habitación por habitación",
        texto:
          "Sumar electrodomésticos, ropa, mobiliario y electrónica casi siempre da una cifra más alta de la que la gente estima a ojo.",
      },
      {
        titulo: "Si alquilas, el reparto cambia",
        texto:
          "El propietario asegura el continente; el inquilino, su contenido y su responsabilidad civil. Pagar por el continente siendo inquilino es tirar el dinero.",
      },
    ],
    faqs: [
      {
        p: "¿Es obligatorio el seguro de hogar?",
        r: "Solo lo es el seguro de daños sobre el continente cuando hay una hipoteca, por exigencia de la Ley del Mercado Hipotecario. Puedes contratarlo con la compañía que quieras, no necesariamente con el banco.",
      },
      {
        p: "¿Cubre las averías de los electrodomésticos?",
        r: "El daño eléctrico por sobretensión sí suele estar cubierto. La avería por uso o desgaste, no: para eso existen coberturas específicas de reparación de electrodomésticos, que algunas compañías ofrecen como complemento.",
      },
      {
        p: "¿Qué es la regla proporcional?",
        r: "Si el capital declarado es inferior al valor real del bien, la aseguradora indemniza en la misma proporción. Con un capital declarado a la mitad de su valor, un siniestro se cobra a la mitad.",
      },
      {
        p: "¿Cubre los daños que yo cause a un vecino?",
        r: "Sí, esa es la cobertura de responsabilidad civil. Es la que responde cuando un escape de agua en tu vivienda daña el piso de abajo.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-de-hogar/",
    comparable: true,
  },
  {
    slug: "comunidad-de-propietarios",
    nombre: "Seguro de Comunidad de Propietarios",
    nombreCorto: "Comunidad",
    familia: "hogar",
    icono: "comunidad",
    resumen:
      "Edificio, zonas comunes y responsabilidad civil de la comunidad, con asistencia y defensa jurídica.",
    paraTitulo: "de comunidad de propietarios",
    intro: [
      "Cubre el edificio y los elementos comunes, la responsabilidad civil de la comunidad como propietaria y la defensa jurídica frente a reclamaciones, incluida la de cuotas impagadas.",
      "Es obligatorio en varias comunidades autónomas y, en la práctica, imprescindible en cualquier edificio con ascensor, piscina o garaje.",
    ],
    claves: [
      "Zonas comunes",
      "RC de la comunidad",
      "Localización de averías",
      "Reclamación de cuotas",
    ],
    criterios: criteriosComunidad,
    consejos: [
      {
        titulo: "Actualiza el valor del edificio",
        texto:
          "Los costes de construcción se han encarecido mucho. Una póliza con el continente declarado hace diez años está casi con seguridad infrasegurada.",
      },
      {
        titulo: "Comprueba quién responde en el ascensor",
        texto:
          "La RC del mantenedor y la de la comunidad se solapan pero no cubren lo mismo. Conviene revisar ambos contratos a la vez.",
      },
    ],
    faqs: [
      {
        p: "¿Es obligatorio el seguro de comunidad?",
        r: "La Ley de Propiedad Horizontal no lo impone con carácter general, pero varias comunidades autónomas sí lo exigen en su normativa de vivienda. Además, la junta puede acordarlo por mayoría y entonces vincula a todos los propietarios.",
      },
      {
        p: "¿Se solapa con el seguro de hogar de cada vecino?",
        r: "En parte, y es normal. Ante un daño por agua desde una zona común, responde la póliza de la comunidad; si el origen está dentro de una vivienda, responde la del propietario. Cuando hay duda, las compañías aplican convenios entre aseguradoras para agilizarlo.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-de-comunidad-de-propietarios/",
    comparable: true,
  },
  {
    slug: "automovil",
    nombre: "Seguro de Automóvil",
    nombreCorto: "Automóvil",
    familia: "autos",
    icono: "auto",
    resumen:
      "Terceros, terceros ampliado o todo riesgo. Compara franquicias, asistencia y coberturas opcionales.",
    paraTitulo: "de coche",
    intro: [
      "El seguro de automóvil es obligatorio en su cobertura de responsabilidad civil, pero es todo lo que añades encima lo que marca la diferencia el día que tienes un percance.",
      "Las tres decisiones que más dinero mueven: la modalidad, la franquicia del todo riesgo y desde qué kilómetro empieza la asistencia en carretera.",
    ],
    claves: [
      "Asistencia desde el km 0",
      "Lunas sin franquicia",
      "Vehículo de sustitución",
      "Libre elección de taller",
    ],
    criterios: criteriosAuto,
    consejos: [
      {
        titulo: "La franquicia solo compensa si puedes asumirla",
        texto:
          "Un todo riesgo con franquicia alta abarata mucho la prima, pero significa pagar esa cantidad en cada siniestro. Si no la tienes disponible, no es un ahorro, es un problema aplazado.",
      },
      {
        titulo: "Asistencia desde el kilómetro 0",
        texto:
          "Muchas pólizas básicas solo mandan grúa a partir de cierta distancia de tu domicilio. La avería más probable es justo la que ocurre en casa.",
      },
      {
        titulo: "Por encima de los 8-10 años, replantea el todo riesgo",
        texto:
          "Cuando el valor venal del coche baja lo suficiente, la indemnización máxima posible deja de justificar la prima. Ahí suele ganar el terceros ampliado.",
      },
    ],
    faqs: [
      {
        p: "¿Qué cubre exactamente el seguro a terceros?",
        r: "Los daños que causes a otras personas y a sus bienes, más la defensa jurídica y la reclamación de daños. No cubre nada de tu propio vehículo.",
      },
      {
        p: "¿Qué es el terceros ampliado?",
        r: "Terceros más lunas, robo e incendio, y en muchos casos daños por fenómenos atmosféricos. Es el punto dulce para coches de entre cinco y diez años.",
      },
      {
        p: "¿Pierdo la bonificación si doy un parte?",
        r: "Solo si el siniestro es con culpa. Los partes sin responsabilidad, las lunas y la asistencia no suelen afectar a la bonificación, aunque cada compañía tiene su política.",
      },
      {
        p: "¿Puedo elegir el taller?",
        r: "Tienes derecho a hacerlo, pero muchas pólizas aplican una franquicia mayor o indemnizan a valor de peritación si sales de la red concertada. Conviene revisarlo antes de contratar.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-de-automovil/",
    comparable: true,
  },
  {
    slug: "multirriesgo-empresarial",
    nombre: "Seguro Multirriesgo Empresarial",
    nombreCorto: "Multirriesgo empresa",
    familia: "empresariales",
    icono: "empresa",
    resumen:
      "Local, existencias, maquinaria y pérdida de beneficios en una sola póliza para tu negocio.",
    paraTitulo: "de empresa",
    intro: [
      "El multirriesgo empresarial reúne en un contrato los daños materiales al local y su contenido, el robo, la avería de maquinaria, la responsabilidad civil y la pérdida de beneficios derivada de una parada de actividad.",
      "En una pyme, la cobertura que de verdad salva el negocio no es la del incendio: es la de pérdida de beneficios, que paga los gastos fijos mientras no puedes facturar.",
    ],
    claves: [
      "Daños al local y contenido",
      "Pérdida de beneficios",
      "RC integrada",
      "Asistencia 24 h al negocio",
    ],
    criterios: criteriosEmpresa,
    consejos: [
      {
        titulo: "Asegura la parada, no solo el ladrillo",
        texto:
          "Reconstruir el local lleva meses. La póliza debe cubrir los gastos fijos y el margen durante ese periodo, con un periodo de indemnización realista.",
      },
      {
        titulo: "Revisa las existencias en temporada alta",
        texto:
          "Si tu stock se multiplica en campaña, pacta una cláusula de existencias variables o quedarás infrasegurado justo cuando más valor tienes en el almacén.",
      },
      {
        titulo: "El riesgo ciber ya no es accesorio",
        texto:
          "Para cualquier negocio que facture online o gestione datos de clientes, la extensión ciber cubre lo que el multirriesgo tradicional deja fuera.",
      },
    ],
    faqs: [
      {
        p: "¿Qué diferencia hay con un seguro de comercio?",
        r: "El seguro de comercio es una versión simplificada pensada para locales pequeños con capitales estandarizados. El multirriesgo empresarial se dimensiona a medida y admite industria, almacén y coberturas técnicas.",
      },
      {
        p: "¿Cubre los daños causados por mis empleados?",
        r: "La responsabilidad civil de explotación cubre los daños a terceros derivados de la actividad, incluidos los causados por empleados en el desempeño de su trabajo. Los daños al propio empleado corresponden a la RC patronal.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-multirriesgo-empresarial/",
    comparable: true,
  },
  {
    slug: "responsabilidad-civil",
    nombre: "Seguro de Responsabilidad Civil",
    nombreCorto: "Responsabilidad civil",
    familia: "empresariales",
    icono: "rc",
    resumen:
      "Cubre los daños que tu actividad cause a terceros, con defensa jurídica y fianzas incluidas.",
    paraTitulo: "de responsabilidad civil",
    intro: [
      "La responsabilidad civil responde cuando tu actividad provoca un daño a otra persona o a sus bienes: un cliente que se lesiona en tu local, un producto defectuoso, un trabajo mal ejecutado.",
      "Es la póliza que más varía entre compañías, porque lo decisivo no es el límite contratado sino qué modalidades incluye y con qué sublímites.",
    ],
    claves: [
      "RC de explotación",
      "RC patronal",
      "RC de productos",
      "Defensa jurídica y fianzas",
    ],
    criterios: criteriosRC,
    consejos: [
      {
        titulo: "El límite por víctima importa más que el total",
        texto:
          "Una póliza con un límite global alto pero un sublímite bajo por víctima puede dejarte corto en el único siniestro grave que tengas.",
      },
      {
        titulo: "Comprueba la delimitación temporal",
        texto:
          "La mayoría de pólizas funciona por reclamación presentada durante la vigencia. Si cambias de compañía, pacta la cobertura retroactiva o quedarán huérfanos los hechos anteriores.",
      },
    ],
    faqs: [
      {
        p: "¿Es obligatoria la responsabilidad civil?",
        r: "Para muchas actividades sí, por normativa sectorial o por ordenanza municipal: hostelería, centros deportivos, sanitarios, instaladores o empresas de seguridad, entre otras. En el resto es voluntaria pero muy recomendable.",
      },
      {
        p: "¿Qué es la RC patronal?",
        r: "Cubre las reclamaciones de tus propios trabajadores por accidentes laborales cuando se te atribuye responsabilidad. Es una de las coberturas más reclamadas y no siempre viene incluida de serie.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-de-responsabilidad-civil/",
    comparable: true,
  },
  {
    slug: "averia-de-maquinaria",
    nombre: "Seguro de Avería de Maquinaria y Equipos Electrónicos",
    nombreCorto: "Avería de maquinaria",
    familia: "empresariales",
    icono: "maquinaria",
    resumen:
      "Protege maquinaria industrial y equipos electrónicos frente a averías súbitas, error humano y daños eléctricos.",
    paraTitulo: "de avería de maquinaria",
    intro: [
      "Cubre el daño accidental e imprevisto a maquinaria y equipos electrónicos: avería interna, cortocircuito, error de manejo, sobretensión o caída.",
      "Es el complemento natural del multirriesgo, que normalmente excluye la avería propia de la máquina y solo cubre el daño externo.",
    ],
    claves: [
      "Avería súbita e imprevista",
      "Error humano",
      "Equipos electrónicos y datos",
      "Mano de obra y transporte",
    ],
    criterios: criteriosMaquinaria,
    consejos: [
      {
        titulo: "Asegura a valor de reposición a nuevo",
        texto:
          "Si la póliza indemniza a valor real, la depreciación de una máquina de diez años deja la indemnización en muy poco. El recargo por valor de nuevo suele compensar.",
      },
      {
        titulo: "No olvides el software y los datos",
        texto:
          "La reposición del hardware es la parte barata. Reconstruir la información y reinstalar los sistemas es lo que realmente cuesta.",
      },
    ],
    faqs: [
      {
        p: "¿No lo cubre ya mi multirriesgo?",
        r: "El multirriesgo cubre daños externos (incendio, agua, robo). La avería interna de la máquina por causa propia queda excluida salvo que se contrate esta cobertura específica.",
      },
      {
        p: "¿Cubre el mantenimiento y el desgaste?",
        r: "No. El desgaste por uso, la corrosión y el mantenimiento programado quedan siempre fuera: la póliza cubre lo súbito e imprevisto.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-de-averia-de-maquinarias-y-equipos-electronicos/",
    comparable: true,
  },
  {
    slug: "transporte-de-mercancias",
    nombre: "Seguro de Transporte de Mercancías",
    nombreCorto: "Transporte",
    familia: "empresariales",
    icono: "transporte",
    resumen:
      "Cubre tus mercancías durante el trayecto, por viaje o con abono anual, en ámbito nacional e internacional.",
    paraTitulo: "de transporte de mercancías",
    intro: [
      "Protege la mercancía mientras viaja, por carretera, mar o aire, frente a daños, robo, pérdida y las consecuencias de un accidente del medio de transporte.",
      "Conviene distinguirlo de la responsabilidad del transportista: esta indemniza por kilo con límites legales muy bajos, que casi nunca cubren el valor real de la carga.",
    ],
    claves: [
      "Por viaje o abono anual",
      "Nacional e internacional",
      "Todo riesgo de daños",
      "Robo y expoliación",
    ],
    criterios: criteriosTransporte,
    consejos: [
      {
        titulo: "No confíes en la responsabilidad del transportista",
        texto:
          "La indemnización legal por kilo es muy inferior al valor de casi cualquier mercancía. El seguro de daños a la mercancía es el que realmente cubre.",
      },
      {
        titulo: "Revisa las estancias intermedias",
        texto:
          "Muchos siniestros ocurren en almacén de tránsito, no en ruta. Comprueba cuántos días de estancia admite la póliza.",
      },
    ],
    faqs: [
      {
        p: "¿Póliza por viaje o abono anual?",
        r: "Si envías de forma esporádica, la póliza por viaje es más eficiente. Con envíos recurrentes, el abono anual declarativo sale más barato y evita el riesgo de olvidar declarar una expedición.",
      },
      {
        p: "¿Quién debe contratarlo, el comprador o el vendedor?",
        r: "Lo determina el incoterm pactado. En un EXW el riesgo pasa al comprador desde el origen; en un CIF el vendedor está obligado a contratar el seguro. Antes de cerrar la operación conviene tenerlo claro.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-de-transporte-de-mercancias/",
    comparable: true,
  },
  {
    slug: "colectivo-de-salud",
    nombre: "Seguro Colectivo de Salud",
    nombreCorto: "Colectivo salud",
    familia: "empresariales",
    icono: "colectivoSalud",
    resumen:
      "Salud privada para la plantilla, con condiciones mejores que la póliza individual y apta para retribución flexible.",
    paraTitulo: "colectivos de salud",
    intro: [
      "La póliza colectiva de salud da a tu plantilla acceso a sanidad privada en condiciones que una póliza individual no consigue: primas más bajas, carencias suprimidas y, en muchos casos, admisión de preexistencias.",
      "Para la empresa es además una de las herramientas de retención más eficientes que existen, con un tratamiento fiscal favorable dentro de la retribución flexible.",
    ],
    claves: [
      "Sin carencias",
      "Primas por grupo",
      "Retribución flexible",
      "Extensible a familiares",
    ],
    criterios: criteriosColectivoSalud,
    consejos: [
      {
        titulo: "Negocia la supresión de carencias desde el día uno",
        texto:
          "Es la ventaja diferencial de la póliza colectiva frente a la individual y no siempre se ofrece de oficio. Hay que pedirla.",
      },
      {
        titulo: "Piensa en el portal de gestión",
        texto:
          "Con plantillas con rotación, que RR. HH. pueda dar altas y bajas por sí mismo ahorra más tiempo del que parece.",
      },
    ],
    faqs: [
      {
        p: "¿Cuántos empleados hacen falta?",
        r: "Depende de la compañía: hay productos desde grupos muy pequeños, aunque las mejores condiciones aparecen a partir de cierto volumen de asegurados.",
      },
      {
        p: "¿Cómo tributa para el empleado?",
        r: "La prima satisfecha por la empresa está exenta de tributación en el IRPF del trabajador hasta un límite anual por persona asegurada, ampliable por cada familiar incluido. Es la base de la retribución flexible.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-colectivo-de-salud/",
    comparable: true,
  },
  {
    slug: "colectivo-de-accidentes",
    nombre: "Seguro Colectivo de Accidentes",
    nombreCorto: "Colectivo accidentes",
    familia: "empresariales",
    icono: "colectivoAccidentes",
    resumen:
      "Cumple el convenio colectivo y cubre a tu plantilla ante accidente, con altas y bajas automáticas.",
    paraTitulo: "colectivos de accidentes",
    intro: [
      "Muchos convenios colectivos obligan a la empresa a asegurar a sus trabajadores frente a fallecimiento e invalidez por accidente, con capitales concretos.",
      "Incumplirlo no es solo un riesgo laboral: la empresa responde directamente del capital no asegurado si ocurre el siniestro.",
    ],
    claves: [
      "Adaptado a convenio",
      "Altas y bajas automáticas",
      "Capitales a medida",
      "Ámbito 24 h opcional",
    ],
    criterios: criteriosColectivoAccidentes,
    consejos: [
      {
        titulo: "Revisa el convenio cada año",
        texto:
          "Los capitales obligatorios se actualizan en las revisiones del convenio. Una póliza desfasada deja a la empresa expuesta por la diferencia.",
      },
    ],
    faqs: [
      {
        p: "¿Qué pasa si no tengo la póliza que exige el convenio?",
        r: "Si ocurre un accidente cubierto por el convenio y no hay seguro, la empresa debe abonar el capital de su patrimonio, además de la posible sanción administrativa.",
      },
      {
        p: "¿Hay que declarar a cada trabajador?",
        r: "Lo habitual es asegurar al colectivo de forma anónima por número y masa salarial, con regularización periódica. Así las altas y bajas quedan cubiertas automáticamente.",
      },
    ],
    urlOriginal:
      "https://marchalconsultores.com/seguro-colectivo-de-accidentes/",
    comparable: true,
  },
  {
    slug: "colectivo-de-vida",
    nombre: "Seguro Colectivo de Vida",
    nombreCorto: "Colectivo vida",
    familia: "empresariales",
    icono: "colectivoVida",
    resumen:
      "Capital por fallecimiento e invalidez para la plantilla, con cuestionario de salud simplificado.",
    paraTitulo: "colectivos de vida",
    intro: [
      "La póliza colectiva de vida cubre a los empleados ante fallecimiento e invalidez, ya sea como beneficio social voluntario o como cumplimiento de un compromiso recogido en convenio.",
      "Su gran ventaja frente a la contratación individual es el cuestionario de salud simplificado o inexistente por debajo de ciertos capitales.",
    ],
    claves: [
      "Cuestionario simplificado",
      "Cumple convenio",
      "Capitales por categoría",
      "Exteriorización de compromisos",
    ],
    criterios: criteriosColectivoVida,
    consejos: [
      {
        titulo: "Define bien las categorías",
        texto:
          "Los capitales pueden fijarse por múltiplo de salario o por categoría profesional. El múltiplo se actualiza solo y evita revisiones cada año.",
      },
    ],
    faqs: [
      {
        p: "¿Los empleados tienen que pasar reconocimiento médico?",
        r: "Por debajo del llamado capital de libre aceptación, no. Por encima, la compañía puede pedir cuestionario o pruebas solo a quienes superen ese umbral.",
      },
      {
        p: "¿Es lo mismo que exteriorizar compromisos por pensiones?",
        r: "No exactamente, aunque están relacionados. La exteriorización obliga a instrumentar mediante seguro o plan de empleo los compromisos que la empresa haya asumido con su plantilla, y esta póliza es uno de los vehículos válidos.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-colectivo-de-vida/",
    comparable: true,
  },
  {
    slug: "viaje",
    nombre: "Seguro de Asistencia Internacional de Viaje",
    nombreCorto: "Viaje",
    familia: "otros",
    icono: "viaje",
    resumen:
      "Gastos médicos, repatriación, cancelación y equipaje para viajar con red de seguridad.",
    paraTitulo: "de viaje",
    intro: [
      "El seguro de viaje cubre lo que la tarjeta sanitaria europea no alcanza y lo que fuera de Europa puede costar una fortuna: asistencia médica, hospitalización y repatriación.",
      "Y cubre otra cosa igual de valiosa: la cancelación, que devuelve lo pagado cuando un imprevisto te impide viajar.",
    ],
    claves: [
      "Gastos médicos en el extranjero",
      "Repatriación sanitaria",
      "Cancelación de viaje",
      "Equipaje y demoras",
    ],
    criterios: criteriosViaje,
    consejos: [
      {
        titulo: "Para Estados Unidos, capital alto o nada",
        texto:
          "Una hospitalización allí supera con facilidad cualquier límite modesto. Es el destino donde el capital de gastos médicos decide de verdad.",
      },
      {
        titulo: "La cancelación se contrata al reservar",
        texto:
          "La mayoría de compañías exige contratarla en los días siguientes a la reserva del viaje. Después ya no se puede añadir.",
      },
    ],
    faqs: [
      {
        p: "¿No me cubre ya la tarjeta sanitaria europea?",
        r: "Cubre la asistencia pública en países de la UE en las mismas condiciones que un residente, lo que puede implicar copagos. No cubre repatriación, sanidad privada, cancelación ni equipaje.",
      },
      {
        p: "¿Qué motivos de cancelación se aceptan?",
        r: "Los tasados en la póliza: enfermedad, accidente, hospitalización de un familiar, despido, citación judicial y una lista cerrada más. Existen modalidades de cancelación por cualquier causa, con franquicia y prima mayor.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-de-viaje/",
    comparable: true,
  },
  {
    slug: "mascotas",
    nombre: "Seguro para Mascotas",
    nombreCorto: "Mascotas",
    familia: "otros",
    icono: "mascotas",
    resumen:
      "Responsabilidad civil obligatoria y gastos veterinarios. Compara coberturas y límites por compañía.",
    paraTitulo: "de mascotas",
    intro: [
      "Desde la Ley de Bienestar Animal, el seguro de responsabilidad civil es obligatorio para los perros en toda España. Cubre los daños que tu animal cause a terceros.",
      "A partir de ahí, lo que diferencia una póliza de otra son los gastos veterinarios: cuánto cubre al año, con qué franquicia y si incluye urgencias y pruebas.",
    ],
    claves: [
      "RC obligatoria para perros",
      "Gastos veterinarios",
      "Urgencias 24 h",
      "Incluye PPP",
    ],
    criterios: criteriosMascotas,
    consejos: [
      {
        titulo: "La RC es obligatoria, los gastos veterinarios no",
        texto:
          "Puedes contratar solo la responsabilidad civil para cumplir la ley, a un precio muy bajo. Los gastos veterinarios son la parte cara y la que hay que comparar de verdad.",
      },
      {
        titulo: "Da de alta al animal joven",
        texto:
          "Casi todas las compañías limitan la edad máxima de alta y excluyen preexistencias. Contratar pronto evita quedarse sin opciones después.",
      },
    ],
    faqs: [
      {
        p: "¿Es obligatorio el seguro de mascotas?",
        r: "La Ley de Bienestar Animal establece la obligación de un seguro de responsabilidad civil para todos los perros. Para los perros potencialmente peligrosos ya era obligatorio antes y con capitales mínimos superiores.",
      },
      {
        p: "¿Cubre las enfermedades previas?",
        r: "No. Cualquier patología diagnosticada antes del alta queda excluida, igual que en las pólizas de salud de personas.",
      },
      {
        p: "¿Cubre a gatos?",
        r: "La responsabilidad civil obligatoria afecta a perros, pero muchas compañías ofrecen póliza para gatos con gastos veterinarios y RC voluntaria.",
      },
    ],
    urlOriginal: "https://marchalconsultores.com/seguro-de-mascotas/",
    comparable: true,
  },
];

export const ramoPorSlug = (slug: string) => ramos.find((r) => r.slug === slug);

export const ramosPorFamilia = (familia: string) =>
  ramos.filter((r) => r.familia === familia);
