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
        templateCard.querySelector('.button').dataset.id = biblioteca[i].id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    }
    cards.appendChild(fragment);
}

cards.addEventListener('click', e =>{
    descargarClick(e);
});

//  Cuando se le haga click al botón, mandamos todo el elemento padre a setbiblioteca
const descargarClick = e =>{
    if(e.target.classList.contains('button')){
        descargarPDF(e.target.parentElement);
    }
    //Detener cualquier posible evento de cards
    e.stopPropagation();
};

//  Para capturar los elementos
const descargarPDF = objeto => {
    //Buscamos el manga que fue seleccionado
    let manga = biblioteca.find(manga => manga.titulo === objeto.querySelector('h5').textContent);

    var btn = objeto.querySelector('.button');
    
    btn.innerHTML =  `<span class="icon-check"></span>Descargado`;
    btn.className = "buttonDescargado";
    
    btn.setAttribute("href",manga.rutaArchivo);
    btn.setAttribute("download",manga.titulo);

};