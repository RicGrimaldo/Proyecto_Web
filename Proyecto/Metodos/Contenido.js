const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let biblioteca = [];
const carrito = [];
const contador = 0;

function Manga(titulo, autor, generos, rangoEdad, rutaArchivo, imagenURL, id, precio) {
    this.titulo = titulo;
    this.autor = autor;
    this.generos = generos;
    this.rangoEdad = rangoEdad;
    this.rutaArchivo = rutaArchivo;
    this.imagenURL = imagenURL;
    this.id = id;
    this.precio = precio;
}

document.addEventListener('DOMContentLoaded', function() {
    leerDatos();
    if(localStorage.getItem('biblioteca')) {
        biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
    }
});

const cargarDatos = function(){
    var botones = document.getElementsByClassName('btn-dark btn');
    for(var i = 0; i < botones.length; i++){
        var btn = botones[i];
        for(var j = 0; j < biblioteca.length; j++){
            if(biblioteca[j].id == btn.dataset.id){
                btn.style.backgroundColor =  "#419641";
                btn.innerText =  "Añadido a mi biblioteca";
                btn.disabled = false;
            }
        }
    }
};

cards.addEventListener('click', e =>{
    addbiblioteca(e);
});

const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCards(datos);
            llenarCarrito(datos);
            cargarDatos();
        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();
};

const llenarCarrito = function(datos){
    var precioEtiqueta = document.getElementById('precioTotal');
    var precioTotal = 0;
    for(item of datos){
        nuevoManga = new Manga(item.titulo, item.autor, 
                            item.generos, item.rangoEdad, 
                            item.rutaArchivo, item.imagenURL, 
                            item.id, item.precio);
        carrito.push(nuevoManga);
        precioTotal += eval(item.precio);
    }
    console.log(carrito);
    precioEtiqueta.innerHTML = "Total: $"+precioTotal.toFixed(2);
};

const pintarCards = function(datos){
    for(let item of datos){
        templateCard.querySelector('h5').textContent = item.titulo;
        templateCard.querySelector('p').textContent = "$"  + item.precio;
        templateCard.querySelector('img').setAttribute('src', item.imagenURL);
        templateCard.querySelector('.btn-dark').dataset.id = item.id;
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
    //Buscamos el manga que fue seleccionado
    let manga = carrito.find(manga => manga.titulo === objeto.querySelector('h5').textContent);
    // const nuevoManga = {
    //     id: objeto.querySelector('.btn-dark').dataset.id,
    //     titulo: objeto.querySelector('h5').textContent,
    //     autor: objeto.querySelector('p').textContent
    // }

    var exist = biblioteca.find(mangaExistente => mangaExistente.titulo == manga.titulo);

    //  Significa que el elemento ya existe
    if(exist == null) {
        var btn = objeto.querySelector('.btn');
        btn.style.backgroundColor =  "#419641";
        btn.innerText =  "Añadido a mi biblioteca";
        btn.disabled = false;

        //  Hacemos una copia del producto
        biblioteca.push({...manga});
        console.log(biblioteca);

        localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
    }

};
