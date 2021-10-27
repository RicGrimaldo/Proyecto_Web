const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

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
almacenarMangas(datos);
             pintarCards(datos);
           
           //reducir los que se muestran
           
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
    console.log(mangas);
}
const pintarCards = function(datos){
    for(let item of datos){
        if(item.status =="new"){
        templateCard.querySelector('#imagen-card').setAttribute('src', item.imagenURL);

        templateCard.querySelector('#titulo-card').textContent = item.titulo;
        templateCard.querySelector('#precio-card').textContent = "$ "  + item.precio;
    
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);}
    }
    cards.appendChild(fragment);
};





///***********************BOTON PARA PROBAR EL MODO OSUCURO********************* */
const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');


//  Para agregar o quitar la clase dark al body 
btnCambiarOscuro.addEventListener('click', function(){
    document.body.classList.toggle('dark');
});


/*
const boton_Recom = document.getElementById('boton_estilo');


// Boton de recomendacion mete al local Storage MangaReferencia el titulo que se selecciono
boton_Recom.addEventListener('click', function(){
    
    const titulo = document.querySelector('#tt').textContent;
    const mang= new Manga(titulo);
    localStorage.setItem("MangaReferencia", JSON.stringify(mang));

});

const ref_slide= document.getElementById('referencia_slide');


// Boton de recomendacion mete al local Storage MangaReferencia el titulo que se selecciono
ref_slide.addEventListener('click', function(){
    
    const titulo = document.querySelector('#titulo1').textContent;
    const mang= new Manga(titulo);
    localStorage.setItem("MangaReferencia", JSON.stringify(mang));

});

const aref_slide= document.getElementById('referencia_slide2');


// Boton de recomendacion mete al local Storage MangaReferencia el titulo que se selecciono
aref_slide.addEventListener('click', function(){
    
    const titulo = document.querySelector('#titulo2').textContent;
    const mang= new Manga(titulo);
    localStorage.setItem("MangaReferencia", JSON.stringify(mang));

});


*/


//CLICK DE LOS QUE SE ENCUENTRAN EN EL FLEX
cards.addEventListener('click', e =>{
 
    cartaMangaClick(e);
});

const cartaMangaClick = e =>{
 
    if(e.target.classList.contains('card')){
        console.log(e.target.parentElement);
        mandarMangaSeleccionado(e.target.parentElement);
    }
    if(e.target.classList.contains('imagen-catalogo')){
        console.log(e.target.parentElement);
        mandarMangaSeleccionado(e.target.parentElement);
    }
   
    //Detener cualquier posible evento de cards
    e.stopPropagation();
}

const mandarMangaSeleccionado = objeto =>{
    let manga = mangas.find(manga => manga.imagenURL === objeto.querySelector('.imagen-catalogo').getAttribute('src'));
    
   
        localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
   
}


//Parte estatica SLIDES 
const slide1= document.getElementById('referencia_slide1');
slide1.addEventListener('click', function(){    
    const titulo = document.querySelector('#titulo1').textContent;   
    let manga = mangas.find(manga => manga.titulo === titulo);   
        localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));   
});
const slide2= document.getElementById('referencia_slide2');
slide2.addEventListener('click', function(){    
    const titulo = document.querySelector('#titulo2').textContent;   
    let manga = mangas.find(manga => manga.titulo === titulo);   
        localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));   
});
const slide3= document.getElementById('referencia_slide3');
slide3.addEventListener('click', function(){    
    const titulo = document.querySelector('#titulo3').textContent;   
    let manga = mangas.find(manga => manga.titulo === titulo);   
        localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));   
});
const slide4= document.getElementById('referencia_slide4');
slide4.addEventListener('click', function(){    
    const titulo = document.querySelector('#titulo4').textContent;   
    let manga = mangas.find(manga => manga.titulo === titulo);   
        localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));   
});







//Boton de la Recomendacion del Dia

const boton_a= document.getElementById('boton_estilo');
boton_a.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === 'Katekyo Hitman Reborn!');   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});

//cLICK DEL TOP MANGAS

const top1= document.getElementById('top1');
top1.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top1.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top2= document.getElementById('top2');
top2.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top2.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top3= document.getElementById('top3');
top3.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top3.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top4= document.getElementById('top4');
top4.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top4.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top5= document.getElementById('top5');
top5.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top5.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top6= document.getElementById('top6');
top6.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top6.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top7= document.getElementById('top7');
top7.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top7.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top8= document.getElementById('top8');
top8.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top8.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top9= document.getElementById('top9');
top9.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top9.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});
const top10= document.getElementById('top10');
top10.addEventListener('click', function(){    
    let manga = mangas.find(manga => manga.titulo === top10.textContent);   
    localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
});

