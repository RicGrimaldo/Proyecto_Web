const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let biblioteca = {};

function Manga(titulo, autor, generos, rangoEdad, rutaArchivo, imagenURL, id) {
    this.titulo = titulo;
    this.autor = autor;
    this.generos = generos;
    this.rangoEdad = rangoEdad;
    this.rutaArchivo = rutaArchivo;
    this.imagenURL = imagenURL;
    this.id = id;
}

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('biblioteca')) {
        biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
        cargarDatos();
    } else{
        alert('No se ha agregado ningún manga.');
    }
});

const cargarDatos = function(){
    for(var i = 1; biblioteca[i] != null; i++){
        console.log(biblioteca[i]);
    }
}