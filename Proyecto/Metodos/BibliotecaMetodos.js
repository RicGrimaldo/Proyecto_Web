const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let biblioteca = [];

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
        pintarCards();
    } else{
        alert('No se ha agregado ningún manga.');
    }
});

const pintarCards = function(){
    for(var i = 0; i < biblioteca.length; i++){
        templateCard.querySelector('h5').textContent = biblioteca[i].titulo;
        templateCard.querySelector('img').setAttribute('src', biblioteca[i].imagenURL);
        templateCard.querySelector('.btn-dark').dataset.id = biblioteca[i].id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    }
    cards.appendChild(fragment);
}