'use strict'

//añadir curso
//leer datos del curso
//mostrar datos en el carrito
//eliminar curso carrito
//vaciar carrito
//añadir curso local storage
//obtener curso local storage
//mantener curso en local storage
//eliminar curso de local Storage
//vaciar local storage

//variables

const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito');
const carrito = document.querySelector('#carrito');
const vaciarCursosCarrito = document.querySelector('#vaciar-carrito');

//add event listeners

function addEventListeners(){
listaCursos.addEventListener('click', añadirCurso);
carrito.addEventListener('click', eliminarCurso);
vaciarCursosCarrito.addEventListener('click', vaciarCarrito);
document.addEventListener('DOMContentLoaded', mantenerCursosLocalStorage );
}
addEventListeners();

//funciones

function añadirCurso(event){
  event.preventDefault();
  if(event.target.classList.contains('agregar-carrito')){
  
    const curso = event.target.parentElement.parentElement;
    console.log(event.target.parentElement.parentElement);
    leerDatosCurso(curso);

  }
}

function leerDatosCurso(curso){
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    title: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }
  mostrarDatosCarrito(infoCurso)
}

function mostrarDatosCarrito(curso){
  const tabla = document.createElement('tr');
  tabla.innerHTML = 
  `
  <td><img src="${curso.imagen}"></td>
  <td>${curso.title}</td>
  <td>${curso.precio}</td>
  <td><a href='#' class='eliminar-curso' id='${curso.id}'>X</a></td>
  `
  listaCarrito.appendChild(tabla);

  añadirCursosLocalStorage(curso);
}

function eliminarCurso(event){
event.preventDefault();
let curso, cursoId;
if(event.target.classList.contains('eliminar-curso')){
  event.target.parentElement.parentElement.remove();
  curso = event.target.parentElement.parentElement;
  cursoId = curso.querySelector('a').getAttribute('id');
  
  
  }
  eliminarCursoLocalStorage(cursoId);
}

function vaciarCarrito(event){
  event.preventDefault();
  listaCarrito.innerHTML='';
  vaciarLocalStorage();
}

function añadirCursosLocalStorage(curso){
  let cursos;
  cursos = obtenerCursosLocalStorage();
  cursos.push(curso);
  localStorage.setItem('cursos', JSON.stringify(cursos));

}

function obtenerCursosLocalStorage(){
  let cursos;
  if(localStorage.getItem('cursos') === null){
    cursos = []
  }
  else{
    cursos = JSON.parse(localStorage.getItem('cursos'));
  }

  return cursos;
}

function mantenerCursosLocalStorage(){
  let cursos;
  cursos = obtenerCursosLocalStorage();
  cursos.forEach(function(curso){
    const tabla = document.createElement('tr');
    tabla.innerHTML = 
    `
    <td><img src=${curso.imagen}></td>
    <td>${curso.title}</td>
    <td>${curso.precio}</td>
    <td><a href='#' class='eliminar-curso' id='${curso.id}'>X</a></td>
    `
    listaCarrito.appendChild(tabla);
  })
}

function eliminarCursoLocalStorage(curso){
  let cursosLS  = obtenerCursosLocalStorage();
  cursosLS.forEach(function(cursoLS, index){
    if(cursoLS.id === curso){
      cursosLS.splice(index, 1)
  
    }
  })
  localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function vaciarLocalStorage(){
  localStorage.clear();
}