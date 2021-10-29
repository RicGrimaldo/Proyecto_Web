const card_comedia = document.getElementById('cat_comedia');
const card_drama = document.getElementById('cat_drama');
const card_accion = document.getElementById('cat_accion');
const card_fantasia = document.getElementById('cat_fantasia');
const card_recuentos = document.getElementById('cat_recuentos');
const card_romance = document.getElementById('cat_romance');
const card_horror = document.getElementById('cat_horror');
const card_tragedia = document.getElementById('cat_tragedia');
const card_misterio = document.getElementById('cat_misterio');
const card_sobrenatural = document.getElementById('cat_sobrenatural');
const card_aventura = document.getElementById('cat_aventura');

const templateCard = document.getElementById('template-card').content;

const fragment_comedia = document.createDocumentFragment();
const fragment_drama = document.createDocumentFragment();
const fragment_accion = document.createDocumentFragment();
const fragment_fantasia = document.createDocumentFragment();
const fragment_recuentos = document.createDocumentFragment();
const fragment_romance = document.createDocumentFragment();
const fragment_horror = document.createDocumentFragment();
const fragment_tragedia = document.createDocumentFragment();
const fragment_misterio = document.createDocumentFragment();
const fragment_sobrenatural = document.createDocumentFragment();
const fragment_aventura = document.createDocumentFragment();

const mangas = [];

function Manga(titulo, autor, generos, sinopsis, rutaArchivo, imagenURL, id, precio) {
    this.titulo = titulo;
    this.autor = autor;
    this.generos = generos;
    this.sinopsis = sinopsis;
    this.rutaArchivo = rutaArchivo;
    this.imagenURL = imagenURL;
    this.id = id;
    this.precio = precio;
}
document.addEventListener('DOMContentLoaded', function() {
    leerDatos();
});

const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCards(datos);
            almacenarMangas(datos);
        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();
};

const almacenarMangas = function(datos){
    for(item of datos){
        nuevoManga = new Manga(item.titulo, item.autor, 
                            item.generos, item.sinopsis,
                            item.rutaArchivo, item.imagenURL, 
                            item.id, item.precio);
        mangas.push(nuevoManga);
    }
}

const pintarCards = function(datos){

    
    for(let item of datos){

        templateCard.querySelector('img').setAttribute('src', item.imagenURL);

        if(item.generos[0]!="18+"&&item.generos[0]!="+18"){

            for(i=0; i<item.generos.length;i++){

                if(item.generos[i].toString().toLowerCase()=="comedia"){
                    const clone = templateCard.cloneNode(true);
                    fragment_comedia.appendChild(clone);
                }      
                if(item.generos[i].toString().toLowerCase()=="drama"){
                    const clone2 = templateCard.cloneNode(true);
                    fragment_drama.appendChild(clone2);
                }
                if(item.generos[i].toString().toLowerCase()=="accion"){
                    const clone3 = templateCard.cloneNode(true);
                    fragment_accion.appendChild(clone3);
                }
                if(item.generos[i].toString().toLowerCase()=="fantasía"){
                   const clone4 = templateCard.cloneNode(true);
                   fragment_fantasia.appendChild(clone4);
    
                }
                if(item.generos[i].toString().toLowerCase()=="recuentos de vida"){
                   const clone5 = templateCard.cloneNode(true);
                   fragment_recuentos.appendChild(clone5);
                }
                if(item.generos[i].toString().toLowerCase()=="romance"){
                    const clone6 = templateCard.cloneNode(true);
                    fragment_romance.appendChild(clone6);
                }
                if(item.generos[i].toString().toLowerCase()=="horror"||item.generos[i].toString().toLowerCase()=="terror"){
                    const clone7 = templateCard.cloneNode(true);
                    fragment_horror.appendChild(clone7);             
                }
                if(item.generos[i].toString().toLowerCase()=="tragedia"){
                    const clone8 = templateCard.cloneNode(true);
                    fragment_tragedia.appendChild(clone8);
                }
                if(item.generos[i].toString().toLowerCase()=="misterio"){
                    const clone9 = templateCard.cloneNode(true);
                    fragment_misterio.appendChild(clone9);
                }
                if(item.generos[i].toString().toLowerCase()=="sobrenatural"){
                    const clone10 = templateCard.cloneNode(true);
                    fragment_sobrenatural.appendChild(clone10);
                }
                if(item.generos[i].toString().toLowerCase()=="aventura"){
                    const clone11 = templateCard.cloneNode(true);
                    fragment_aventura.appendChild(clone11);
                }
            }

        }

 
    }
    
    card_comedia.appendChild(fragment_comedia);
    card_drama.appendChild(fragment_drama);
    card_accion.appendChild(fragment_accion);
    card_fantasia.appendChild(fragment_fantasia);
    card_recuentos.appendChild(fragment_recuentos);
    card_romance.appendChild(fragment_romance);
    card_horror.appendChild(fragment_horror);
    card_tragedia.appendChild(fragment_tragedia);
    card_misterio.appendChild(fragment_misterio);
    card_sobrenatural.appendChild(fragment_sobrenatural);
    card_aventura.appendChild(fragment_aventura);
    
};

card_comedia.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_drama.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_accion.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_fantasia.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_recuentos.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_romance.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_horror.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_tragedia.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_misterio.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_sobrenatural.addEventListener('click', e =>{
    cartaMangaClick(e);
});

card_aventura.addEventListener('click', e =>{
    cartaMangaClick(e);
});

const cartaMangaClick = e =>{
    if(e.target.classList.contains('card-img')){
        mandarMangaSeleccionado(e.target.parentElement);
    }
    //Detener cualquier posible evento de cards
    e.stopPropagation();
}

const mandarMangaSeleccionado = objeto =>{
    let manga = mangas.find(manga => manga.imagenURL === objeto.querySelector('img').getAttribute('src'));
    
    if(manga){
        localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
    }
}

