const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let biblioteca = {};

document.addEventListener('DOMContentLoaded', function() {
    leerDatos();
    if(localStorage.getItem('biblioteca')) {
        biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
    }
})

const cargarDatos = function(){
    var botones = document.getElementsByClassName('btn-dark');
    for(var i = 0; i < botones.length; i++){
        var btn = botones[i];
        if(biblioteca[i+1] != null){
            btn.style.backgroundColor =  "#419641";
            btn.innerText =  "Añadido";
            btn.disabled = false;
        }
    }
}

cards.addEventListener('click', e =>{
    addbiblioteca(e);
});

const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCards(datos);
            cargarDatos();
        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();
};

const pintarCards = function(datos){
    for(let manga of datos){
        templateCard.querySelector('h5').textContent = manga.titulo;
        templateCard.querySelector('p').textContent = "Autor: "  + manga.autor;
        templateCard.querySelector('img').setAttribute('src', manga.imagenURL);
        templateCard.querySelector('.btn-dark').dataset.id = manga.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    }
    cards.appendChild(fragment);
};

//  Cuando se le haga click al botón, mandamos todo el elemento padre a setbiblioteca
const addbiblioteca = e =>{
    if(e.target.classList.contains('btn-dark')){
        setbiblioteca(e.target.parentElement);
    }
    //Detener cualquier posible evento de cards
    e.stopPropagation();
};

//  Para capturar los elementos
const setbiblioteca = objeto => {
    const manga = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        titulo: objeto.querySelector('h5').textContent,
        autor: objeto.querySelector('p').textContent
    }

    var btn = objeto.querySelector('.btn');
    btn.style.backgroundColor =  "#419641";
    btn.innerText =  "Añadido";
    btn.disabled = false;

    //  Hacemos una copia del producto
    biblioteca[manga.id] = {...manga};
    console.log(biblioteca);

    localStorage.setItem('biblioteca',JSON.stringify(biblioteca));

};
