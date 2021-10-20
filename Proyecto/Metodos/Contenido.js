const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', function() {
    leerDatos();
})

items.addEventListener('click', e =>{
    addCarrito(e);
})

const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCards(datos);
            let impresion = document.getElementById('container');
            let cadena = "";
        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();
    // try{
    //     const res = await fetch('Mangas.json');
    //     const datos = await res.json();
    //     pintarCards(datos);
    // }catch(error){
    //     console.log(error);
    // }
}

const pintarCards = function(datos){
    for(let manga of datos){
        templateCard.querySelector('h5').textContent = manga.titulo;
        templateCard.querySelector('p').textContent = manga.autor;
        templateCard.querySelector('img').setAttribute('src', manga.imagenURL);
        templateCard.querySelector('.btn-dark').dataset.id = manga.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    }
    items.appendChild(fragment);
}

const addCarrito = e =>{
    if(e.target.classList.contains('btn-dark')){
        console.log(e.target.parentElement);
    }
    e.stopPropagation();
}

