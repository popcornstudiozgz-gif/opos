/**
 * Tema-14: El municipio y régimen especial de Zaragoza — territorio y
 * población (Padrón), competencias y servicios mínimos obligatorios,
 * régimen de municipios de gran población, Ley de capitalidad de Zaragoza.
 *
 * Uso: node --env-file=.env.local scripts/seed-flashcards-tema-14.mjs
 */
const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const HEADERS = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };

async function insertBatch(filas) {
  const res = await fetch(`${URL_BASE}/rest/v1/flashcards`, { method: "POST", headers: { ...HEADERS, Prefer: "return=minimal" }, body: JSON.stringify(filas) });
  if (!res.ok) { console.error(`❌ ${res.status} ${await res.text()}`); process.exit(1); }
}

const TEMA = "tema-14";
const c = (seccion, anverso, reverso) => ({ tema_slug: TEMA, seccion, anverso, reverso });

const CARDS = [
  // El municipio: territorio y población (arts. 11-18 LBRL)
  c("municipio-territorio-poblacion", "¿Qué es el Municipio según el art. 11.1 LBRL?", "La entidad local básica de la organización territorial del Estado, con personalidad jurídica y plena capacidad para sus fines"),
  c("municipio-territorio-poblacion", "¿Cuáles son los elementos del Municipio (art. 11.2)?", "El territorio, la población y la organización"),
  c("municipio-territorio-poblacion", "¿Qué es el término municipal (art. 12.1)?", "El territorio en que el ayuntamiento ejerce sus competencias; cada municipio pertenece a una sola provincia"),
  c("municipio-territorio-poblacion", "¿Con qué población mínima puede crearse un nuevo municipio (art. 13.2)?", "Al menos 4.000 habitantes, sobre núcleos territorialmente diferenciados y siendo financieramente sostenible"),
  c("municipio-territorio-poblacion", "¿Qué obligación tiene toda persona que vive en España (art. 15)?", "Inscribirse en el Padrón del municipio en que resida habitualmente"),
  c("municipio-territorio-poblacion", "¿Qué constituye el conjunto de personas inscritas en el Padrón (art. 15)?", "La población del municipio; los inscritos son los vecinos, condición que se adquiere con la inscripción"),
  c("municipio-territorio-poblacion", "¿Qué es el Padrón municipal (art. 16.1)?", "El registro administrativo donde constan los vecinos de un municipio; sus datos prueban la residencia y el domicilio habitual"),
  c("municipio-territorio-poblacion", "¿Con qué periodicidad deben renovar su inscripción los extranjeros sin residencia de larga duración no comunitarios (art. 16.1)?", "Cada dos años, bajo pena de caducidad de la inscripción"),
  c("municipio-territorio-poblacion", "¿A quién corresponde la formación, mantenimiento, revisión y custodia del Padrón (art. 17.1)?", "Al Ayuntamiento"),
  c("municipio-territorio-poblacion", "¿Qué es el Consejo de Empadronamiento (art. 17.4)?", "El órgano colegiado de colaboración entre la AGE y los Entes Locales en materia padronal, presidido por el Presidente del INE"),
  c("municipio-territorio-poblacion", "Cita 4 derechos de los vecinos según el art. 18.1", "Ser elector y elegible; participar en la gestión municipal; utilizar los servicios públicos municipales; ser informado y dirigir solicitudes; exigir la prestación de servicios obligatorios; ejercer la iniciativa popular"),

  // Competencias y servicios mínimos obligatorios (art. 26 LBRL)
  c("servicios-minimos", "¿Qué servicios deben prestar todos los Municipios, sin excepción (art. 26.1.a)?", "Alumbrado público, cementerio, recogida de residuos, limpieza viaria, abastecimiento domiciliario de agua potable, alcantarillado, acceso a núcleos de población y pavimentación de vías públicas"),
  c("servicios-minimos", "¿Qué servicios adicionales deben prestar los municipios de más de 5.000 habitantes (art. 26.1.b)?", "Parque público, biblioteca pública y tratamiento de residuos"),
  c("servicios-minimos", "¿Qué servicios adicionales deben prestar los municipios de más de 20.000 habitantes (art. 26.1.c)?", "Protección civil, evaluación e información de situaciones de necesidad social, prevención y extinción de incendios e instalaciones deportivas de uso público"),
  c("servicios-minimos", "¿Qué servicios adicionales deben prestar los municipios de más de 50.000 habitantes (art. 26.1.d)?", "Transporte colectivo urbano de viajeros y medio ambiente urbano"),
  c("servicios-minimos", "¿Quién coordina ciertos servicios mínimos en municipios de menos de 20.000 habitantes (art. 26.2)?", "La Diputación provincial o entidad equivalente (recogida de residuos, abastecimiento de agua, limpieza viaria, acceso a núcleos, pavimentación y alumbrado)"),

  // Régimen de municipios de gran población (arts. 121 y ss. LBRL)
  c("municipios-gran-poblacion", "¿A qué municipios se aplica el régimen de gran población según el art. 121.1?", "Los de más de 250.000 habitantes; capitales de provincia de más de 175.000; capitales de provincia/autonómicas o sede de instituciones autonómicas; y los de más de 75.000 con circunstancias especiales (estos 2 últimos requieren decisión de la Asamblea Legislativa)"),
  c("municipios-gran-poblacion", "¿Qué plazo tiene la nueva corporación para adaptar su organización al alcanzar la población requerida (art. 121.2)?", "6 meses desde su constitución"),
  c("municipios-gran-poblacion", "¿Qué ocurre si la población de un municipio de gran población se reduce después (art. 121.3)?", "Continúa rigiéndose por el régimen especial aunque su cifra oficial de población baje del límite"),

  // Ley de Capitalidad de Zaragoza: disposiciones generales (arts. 1-6)
  c("capitalidad-zaragoza-general", "¿Qué régimen especial tiene Zaragoza según el art. 1 de su Ley de Capitalidad?", "El establecido en la Ley 10/2017, por su condición de capital de la Comunidad Autónoma de Aragón"),
  c("capitalidad-zaragoza-general", "¿Qué capacidad tiene el municipio de Zaragoza según el art. 2?", "Personalidad jurídica propia, plena capacidad de obrar y potestades suficientes para ordenar y gestionar los asuntos de interés público de sus ciudadanos"),
  c("capitalidad-zaragoza-general", "¿A quién corresponde alterar el término municipal de Zaragoza (art. 3)?", "Al Gobierno de Aragón, conforme al procedimiento de la legislación de régimen local"),
  c("capitalidad-zaragoza-general", "¿Qué legitimación procesal especial tiene Zaragoza (art. 4)?", "Plantear conflictos en defensa de la autonomía local contra leyes estatales/autonómicas lesivas, e impugnarlas ante el Tribunal Constitucional"),
  c("capitalidad-zaragoza-general", "¿Qué títulos honoríficos ostenta la ciudad de Zaragoza (art. 6)?", "Muy Noble, Muy Leal, Muy Heroica, Siempre Heroica, Muy Benéfica e Inmortal, y \"Sitio Emblemático de la Cultura de Paz\" (UNESCO); habitualmente se usa el título de Inmortal"),
];

console.log(`📝 Insertando ${CARDS.length} flashcards de tema-14...`);
await insertBatch(CARDS);

const SECCIONES_AUX_ADMIN = ["municipio-territorio-poblacion", "servicios-minimos", "municipios-gran-poblacion", "capitalidad-zaragoza-general"];
const patchTO = await fetch(`${URL_BASE}/rest/v1/tema_oposicion?tema_slug=eq.tema-14&oposicion_slug=eq.auxiliar-administrativo`, {
  method: "PATCH", headers: { ...HEADERS, Prefer: "return=representation" }, body: JSON.stringify({ secciones_incluidas: SECCIONES_AUX_ADMIN }),
});
if (!patchTO.ok) { console.error(`❌ ${patchTO.status} ${await patchTO.text()}`); process.exit(1); }
console.log("✅ tema_oposicion (auxiliar-administrativo, tema-14) limitado a:", SECCIONES_AUX_ADMIN);
console.log("✅ Tema-14 completado.");
