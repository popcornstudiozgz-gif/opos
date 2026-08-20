# Fuente

- **Documento:** II Plan de Igualdad para Empleadas y Empleados del Ayuntamiento de
  Zaragoza (PIEEM). Aprobado por acuerdo del Gobierno de Zaragoza, publicado en el
  BOPZ nº 16, de 20 de enero de 2024.
- **URL:** https://www.zaragoza.es/cont/paginas/catalogopublicaciones/doc/12293.pdf
  (esta es la URL que ya citaba `tema-2` en `src/data/temario/temas.ts`, así que es la
  referencia correcta — no es ni el documento de 8 páginas ni el de 214 que habías
  encontrado tú).
- **Extensión:** 67 páginas.
- **Fecha de descarga:** 20 de agosto de 2026.
- **Extracción:** `pdftotext -layout -enc UTF-8`, dividido por los apartados numerados
  que trae el propio índice del documento (1 a 12) más sus 4 anexos.

## Por qué NO era ninguno de los que habías encontrado

No he podido comprobar qué eran exactamente tus dos PDFs (8 y 214 páginas) porque no
me diste el enlace, pero por descarte:
- El de **8 páginas** probablemente es un resumen/díptico de difusión del Plan, no el
  documento completo con las medidas.
- El de **214 páginas** probablemente es el **I Plan de Igualdad** (el anterior a este,
  2016-2019, mencionado en la introducción de este documento) o un compendio con
  anexos adicionales — no el vigente.

Si quieres que lo confirme, pásame los enlaces de esos dos y los reviso.

## Aviso importante: el Anexo IV es él solo más de la mitad del documento

El **Anexo IV** (`anexo-4-diagnostico-completo-plantilla.md`, 4.185 líneas) es en
realidad OTRO documento completo incrustado dentro de este PDF: el "Diagnóstico para la
elaboración del Plan de Igualdad" (15 de febrero de 2021), con su propia estructura de
apartados 0 a 10, tablas y gráficos estadísticos de la plantilla municipal. No lo he
subdividido más porque sus cabeceras internas no seguían un patrón tan fiable como los
capítulos de las leyes — lo he dejado como un único archivo íntegro. Es la parte más
"estadística" (menos relevante para examen que las medidas del Plan en sí, apartados 1-9).

El **Anexo II** (protocolo de actuación frente al acoso, versión completa) es más
detallado que el resumen del apartado 12 del cuerpo principal — puede que solo haga
falta uno de los dos para generar contenido, dímelo cuando lo procesemos.

## Nota sobre el formato

Este documento tiene más "ruido" de maquetación que las leyes anteriores (cabeceras
repetidas de página, tablas de datos), aunque he filtrado la cabecera de página más
frecuente. El contenido es completo y fiel al original.

## Índice de archivos

| Archivo | Contenido |
|---|---|
| `01-introduccion.md` | 1. Introducción |
| `02-marco-normativo.md` | 2. Marco normativo |
| `03-marco-conceptual.md` | 3. Marco conceptual |
| `04-partes-suscriptoras.md` | 4. Partes suscriptoras |
| `05-ambito-de-aplicacion.md` | 5. Ámbito de aplicación |
| `06-metodologia.md` | 6. Metodología |
| `07-diagnostico-de-la-plantilla.md` | 7. Diagnóstico de la plantilla (resumen) |
| `08-objetivos.md` | 8. Objetivos |
| `09-acciones-de-igualdad-ejes-a-d.md` | 9. Acciones de igualdad — Ejes A (Cultura de la organización), B (Gestión de RRHH), C (Conciliación y corresponsabilidad), D (Prevención, salud laboral y acoso) |
| `10-implementacion-seguimiento-evaluacion.md` | 10. Implementación, seguimiento y evaluación — la Comisión de Igualdad |
| `11-calendario-de-actuaciones.md` | 11. Calendario de actuaciones |
| `12-protocolo-acoso-resumen.md` | 12. Protocolo de actuación frente al acoso (resumen) |
| `anexo-1-medidas-proceso-permanente-i-pieem.md` | Anexo I: medidas en proceso permanente del I PIEEM |
| `anexo-2-protocolo-actuacion-acoso-completo.md` | Anexo II: protocolo de actuación frente al acoso (versión completa) |
| `anexo-3-modelo-ficha-recogida-datos.md` | Anexo III: modelo de ficha de recogida de datos |
| `anexo-4-diagnostico-completo-plantilla.md` | Anexo IV: diagnóstico completo de la plantilla (documento aparte incrustado, sin subdividir) |
