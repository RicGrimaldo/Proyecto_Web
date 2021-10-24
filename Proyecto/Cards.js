const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

const cards_slide = document.getElementById('cards-slide');
const templateCard_slide = document.getElementById('template-card-slide').content;
const fragment2 = document.createDocumentFragment();

function Manga(titulo, autor, generos,sinopsis, rangoEdad, rutaArchivo, imagenURL, id, precio,status) {
    this.titulo = titulo;
    this.autor = autor;
    this.generos = generos;
    this.rangoEdad = rangoEdad;
    this.rutaArchivo = rutaArchivo;
    this.imagenURL = imagenURL;
    this.sinopsis =sinopsis;
    this.id = id;
    this.precio = precio;
    this.status =status;
    this.descargado = false;
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
             pintarCardsSlide(datos);
           //reducir los que se muestran
           
        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();
};

function aleatorio(cantidad) {
  
var cantidadNumeros = cantidad;
var myArray = []
while(myArray.length < cantidadNumeros ){
  var numeroAleatorio = Math.ceil(Math.random()*cantidadNumeros);
  var existe = false;
  for(var i=0;i<myArray.length;i++){
	if(myArray [i] == numeroAleatorio){
        existe = true;
        break;
    }
  }
  if(!existe){
    myArray[myArray.length] = numeroAleatorio;
  }

}
return myArray;
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





const pintarCardsSlide = function(datos){
 let numero = new Array();
 var x=0;
 numero = aleatorio(6);
 for (var i = 0; i <2 ; i++) {
  
   for(let item of datos){
  
    if(numero[i]==item.id){
     templateCard_slide.querySelector('#img-slide').setAttribute('src', item.imagenURL);

       templateCard_slide.querySelector('#titulo-slide').textContent = item.titulo;
       templateCard_slide.querySelector('#sinopsis-slide').textContent =  item.sinopsis;
      
     
   
       const clone = templateCard_slide.cloneNode(true);
       fragment2.appendChild(clone);

    
   }
       
   }


 }  
   
    cards_slide.appendChild(fragment2);
};


const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');


//  Para agregar o quitar la clase dark al body 
btnCambiarOscuro.addEventListener('click', function(){
    document.body.classList.toggle('dark');
});