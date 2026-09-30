/**
 * Qué cubre y qué no suele cubrir cada ramo.
 *
 * Es información orientativa de mercado, no el condicionado de ninguna
 * compañía concreta: lo que entra y lo que no depende siempre de la póliza
 * firmada. Sirve para que quien llega buscando «qué cubre un seguro de hogar»
 * encuentre una respuesta útil antes de meterse en la comparativa.
 *
 * Las exclusiones son tan importantes como las coberturas —más, si lo que
 * quieres es que nadie se lleve un disgusto en el primer siniestro—, así que
 * van juntas y con el mismo peso visual.
 */

export type Coberturas = { cubre: string[]; noCubre: string[] };

export const coberturas: Record<string, Coberturas> = {
  salud: {
    cubre: [
      "Consultas de medicina general, pediatría y especialidades",
      "Pruebas diagnósticas, desde análisis a resonancias",
      "Hospitalización y cirugía, con habitación individual",
      "Urgencias 24 horas y videoconsulta",
      "Parto y seguimiento del embarazo, pasada la carencia",
    ],
    noCubre: [
      "Enfermedades preexistentes no declaradas al contratar",
      "Tratamientos estéticos sin finalidad reparadora",
      "Accidentes laborales, que van por la mutua",
      "Tratamientos en el extranjero sin autorización previa",
    ],
  },
  vida: {
    cubre: [
      "Fallecimiento por enfermedad o accidente",
      "Invalidez absoluta y permanente, si se contrata",
      "Enfermedades graves, en las modalidades que la incluyen",
      "Doble capital si el fallecimiento es por accidente",
    ],
    noCubre: [
      "Suicidio durante el primer año de póliza",
      "Enfermedades conocidas y no declaradas en el cuestionario",
      "Actividades de riesgo no comunicadas a la compañía",
      "Fallecimiento en acto delictivo o en zona de guerra",
    ],
  },
  decesos: {
    cubre: [
      "Servicio funerario completo: tanatorio, féretro y ceremonia",
      "Traslado nacional y, según póliza, repatriación internacional",
      "Gestión de certificados, testamentaría y últimas voluntades",
      "Asistencia en viaje para el asegurado",
    ],
    noCubre: [
      "Fallecimiento por enfermedad dentro del periodo de carencia",
      "El exceso sobre el capital contratado, si el servicio cuesta más",
      "Gastos de sepultura o nicho, salvo que se contraten aparte",
    ],
  },
  "accidentes-personales": {
    cubre: [
      "Capital por fallecimiento a causa de un accidente",
      "Invalidez permanente, total o parcial según baremo",
      "Asistencia sanitaria derivada del accidente",
      "Subsidio diario por hospitalización, si se contrata",
    ],
    noCubre: [
      "Enfermedad común: para eso está el seguro de vida",
      "Deportes de riesgo no declarados",
      "Accidentes bajo los efectos del alcohol o de drogas",
      "Lesiones autoinfligidas",
    ],
  },
  ahorro: {
    cubre: [
      "Acumulación de capital con fiscalidad propia",
      "Aportaciones periódicas y extraordinarias flexibles",
      "Rescate según las condiciones del producto",
      "Renta vitalicia o capital al vencimiento",
    ],
    noCubre: [
      "Rentabilidad garantizada, salvo en los productos que la ofrecen",
      "Liquidez inmediata en los planes de pensiones",
      "Protección frente a la inflación",
    ],
  },
  hogar: {
    cubre: [
      "Daños por agua, incendio, humo y explosión",
      "Robo dentro y fuera de la vivienda",
      "Responsabilidad civil frente a vecinos y terceros",
      "Rotura de cristales, encimeras y sanitarios",
      "Asistencia urgente 24 h: fontanería, electricidad y cerrajería",
    ],
    noCubre: [
      "Daños por falta de mantenimiento o humedades por condensación",
      "Averías por desgaste de electrodomésticos",
      "Objetos de valor no declarados en la póliza",
      "Vivienda deshabitada más tiempo del pactado",
    ],
  },
  "comunidad-de-propietarios": {
    cubre: [
      "Continente del edificio y elementos comunes",
      "Responsabilidad civil de la comunidad y de sus cargos",
      "Localización y reparación de averías de agua",
      "Defensa jurídica y reclamación de cuotas impagadas",
    ],
    noCubre: [
      "El interior privativo de cada vivienda",
      "Daños derivados de obras sin licencia",
      "Deterioro por falta de mantenimiento del edificio",
    ],
  },
  automovil: {
    cubre: [
      "Responsabilidad civil obligatoria y voluntaria",
      "Asistencia en carretera, según póliza desde el kilómetro 0",
      "Robo, incendio y rotura de lunas en terceros ampliado",
      "Daños propios del vehículo en la modalidad de todo riesgo",
      "Defensa jurídica y reclamación de daños",
    ],
    noCubre: [
      "Desgaste de neumáticos, frenos y piezas por uso",
      "Accidentes con tasa de alcohol superior a la permitida",
      "Conductores no declarados cuando la póliza los limita",
      "Accesorios no de serie que no se hayan declarado",
    ],
  },
  "multirriesgo-empresarial": {
    cubre: [
      "Continente y contenido del local o la nave",
      "Existencias, maquinaria y equipos informáticos",
      "Pérdida de beneficios por paralización de la actividad",
      "Responsabilidad civil de explotación y patronal",
      "Robo, daños por agua e incendio",
    ],
    noCubre: [
      "Actividades no declaradas en la póliza",
      "Mercancía en tránsito, que va en el seguro de transporte",
      "Daños por incumplimiento de la normativa de seguridad",
    ],
  },
  "responsabilidad-civil": {
    cubre: [
      "Daños a terceros derivados de la actividad",
      "Responsabilidad patronal frente a los propios empleados",
      "Responsabilidad por productos y trabajos terminados",
      "Defensa jurídica y fianzas judiciales",
    ],
    noCubre: [
      "Daños a bienes propios o bajo custodia, salvo cobertura expresa",
      "Sanciones y multas administrativas",
      "Responsabilidad contractual asumida por acuerdo",
      "Actos dolosos",
    ],
  },
  "averia-de-maquinaria": {
    cubre: [
      "Avería súbita e imprevista de la maquinaria",
      "Errores de manejo, impericia y negligencia del operario",
      "Cortocircuitos, sobretensiones y fallos eléctricos",
      "Equipos electrónicos y de proceso de datos",
    ],
    noCubre: [
      "Desgaste natural y mantenimiento ordinario",
      "Piezas de recambio y consumibles",
      "Averías cubiertas por la garantía del fabricante",
    ],
  },
  "transporte-de-mercancias": {
    cubre: [
      "Daños y pérdida de la mercancía durante el transporte",
      "Carga y descarga, según lo pactado",
      "Robo y desaparición del envío",
      "Avería gruesa y gastos de salvamento",
    ],
    noCubre: [
      "Embalaje insuficiente o inadecuado",
      "Vicio propio de la mercancía y mermas naturales",
      "Retrasos en la entrega y el lucro cesante que causen",
    ],
  },
  "colectivo-de-salud": {
    cubre: [
      "Asistencia sanitaria para toda la plantilla",
      "Habitualmente sin carencias ni cuestionario de salud",
      "Posibilidad de extender la cobertura a familiares",
      "Retribución flexible para el trabajador",
    ],
    noCubre: [
      "Tratamientos estéticos y de fertilidad, salvo pacto",
      "Accidentes laborales, que cubre la mutua",
    ],
  },
  "colectivo-de-accidentes": {
    cubre: [
      "Fallecimiento e invalidez por accidente de la plantilla",
      "Cobertura de convenio cuando el sector la exige",
      "Ámbito 24 horas, dentro y fuera del trabajo",
    ],
    noCubre: [
      "Enfermedad común",
      "Trabajadores no incluidos en la relación asegurada",
    ],
  },
  "colectivo-de-vida": {
    cubre: [
      "Capital por fallecimiento para los empleados",
      "Invalidez absoluta y permanente",
      "Cumplimiento de las obligaciones del convenio colectivo",
    ],
    noCubre: [
      "Suicidio en el primer año",
      "Altas no comunicadas a la aseguradora",
    ],
  },
  viaje: {
    cubre: [
      "Asistencia médica y hospitalaria en el extranjero",
      "Repatriación sanitaria y del acompañante",
      "Pérdida, robo o retraso de equipaje",
      "Cancelación del viaje por causas cubiertas",
    ],
    noCubre: [
      "Enfermedades preexistentes y embarazo avanzado",
      "Deportes de riesgo sin cobertura específica",
      "Cancelar el viaje por haber cambiado de idea",
    ],
  },
  mascotas: {
    cubre: [
      "Responsabilidad civil por daños que cause el animal",
      "Asistencia veterinaria por accidente o enfermedad",
      "Gastos por extravío y sacrificio necesario",
      "Defensa jurídica ante reclamaciones",
    ],
    noCubre: [
      "Enfermedades previas a la contratación",
      "Vacunas, desparasitación y revisiones rutinarias",
      "Camadas, cría y tratamientos estéticos",
      "Razas excluidas en las condiciones particulares",
    ],
  },
};

export const coberturasDe = (slug: string) => coberturas[slug];
