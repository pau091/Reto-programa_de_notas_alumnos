// DATOS
const MAX = 10;
let nombres = [];
let notas = [];

// VALIDAR
function validar(nombre, c1, c2, c3) {
  if (!nombre) return "Ingresa nombre";
  if ([c1, c2, c3].some(n => isNaN(n) || n < 0 || n > 100)) {
    return "Notas entre 0 y 100";
  }
  return null;
}

// AGREGAR
function agregar() {
  if (nombres.length >= MAX) return alert("Máximo 10 alumnos");

  const nombre = document.getElementById("nombre").value;
  const c1 = Number(document.getElementById("c1").value);
  const c2 = Number(document.getElementById("c2").value);
  const c3 = Number(document.getElementById("c3").value);

  const error = validar(nombre, c1, c2, c3);
  if (error) return alert(error);

  nombres.push(nombre);
  notas.push([c1, c2, c3]);

  limpiar();
}

// LIMPIAR
function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("c1").value = "";
  document.getElementById("c2").value = "";
  document.getElementById("c3").value = "";
}

// PROMEDIOS
const promedioAlumno = i =>
  notas[i].reduce((a,b)=>a+b)/3;

const promedioCertamen = col =>
  notas.reduce((a,f)=>a+f[col],0)/notas.length;

const promedioGeneral = () =>
  nombres.reduce((a,_,i)=>a+promedioAlumno(i),0)/nombres.length;

function mostrar() {

  let html = "<h3>Resultados</h3>";

  let aprobadosLista = [];
  let reprobadosLista = [];

  // clasificar alumnos
  nombres.forEach((n,i)=>{
    const prom = promedioAlumno(i);

    if (prom >= 55) {
      aprobadosLista.push(`${n} (${prom.toFixed(2)})`);
    } else {
      reprobadosLista.push(`${n} (${prom.toFixed(2)})`);
    }
  });

  // MOSTRAR QUIÉNES APROBARON Y REPROBARON (AL INICIO)
  html += `<h4> Aprobados</h4>`;
  html += aprobadosLista.length ? `<p>${aprobadosLista.join(", ")}</p>` : `<p>Ninguno</p>`;

  html += `<h4> Reprobados</h4>`;
  html += reprobadosLista.length ? `<p>${reprobadosLista.join(", ")}</p>` : `<p>Ninguno</p>`;

  html += `<hr>`;

  // alumnos
  nombres.forEach((n,i)=>{
    const prom = promedioAlumno(i).toFixed(2);
    html += `<p>${n} | ${notas[i]} | Prom: ${prom}</p>`;
  });

  // promedios curso
  html += `<hr>`;
  html += `<p>C1: ${promedioCertamen(0).toFixed(2)}</p>`;
  html += `<p>C2: ${promedioCertamen(1).toFixed(2)}</p>`;
  html += `<p>C3: ${promedioCertamen(2).toFixed(2)}</p>`;
  html += `<p>General: ${promedioGeneral().toFixed(2)}</p>`;

  // cantidad
  const aprobados = aprobadosLista.length;
  const reprobados = reprobadosLista.length;

  html += `<p>Aprobados: ${aprobados}</p>`;
  html += `<p>Reprobados: ${reprobados}</p>`;

  // ordenados
  const ordenados = nombres
    .map((n,i)=>({n, prom: promedioAlumno(i)}))
    .sort((a,b)=>b.prom-a.prom);

  html += `<h4>Ordenados</h4>`;
  ordenados.forEach(a=>{
    html += `<p>${a.n} - ${a.prom.toFixed(2)}</p>`;
  });

  document.getElementById("resultados").innerHTML = html;
}