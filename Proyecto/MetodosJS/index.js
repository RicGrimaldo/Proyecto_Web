const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const mangas = [];
var buscar = " "
var buscador = " "

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
  // fetchData()
 leerDatos()
 });

 function getCookie(name) {
  let cname = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  
  //let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      
      while(c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
      }
      
      if(c.indexOf(cname) == 0) {
          return c.substring(cname.length, c.length);
      }
  }
  return "";
}

function setCookie(name, value, expires) {
  if(expires) {
      const date = new Date();
      date.setTime(date.getTime() + (expires*24*60*60*1000));
      expires = "expires="+ date.toUTCString();
  }
  else {
      expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function removeCookies(name) {
  setCookie(name, "", -1)
}


  // const btn = document.getElementById("btn");
  // /*btn.addEventListener('click',function(){
  //   if(typeof buscar === 'undefined'||buscar===null){
  //     var buscar =  document.formulario.nom.value
  //     setCookie("buscar",buscar,10)
  //   }
  //   else{
  //     removeCookies(buscar)
  //     var buscar =  document.formulario.nom.value
  //     setCookie("buscar",buscar,10)
  //   }
  //   var buscador = getCookie("buscar");*/
  //   var buscar =  document.formulario.nom.value
  //   setCookie("buscar",buscar,10)
  //   buscador=getCookie(buscar)
  //   removeCookies(buscar)
  // })


var1 = prompt("dime un anime")

  const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCards(datos);
        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();
  }


const pintarCards = data => {
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.titulo
        templateCard.querySelector('p').textContent = '$' + producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.imagenURL)
        const clone = templateCard.cloneNode(true)
        var array = producto.titulo.toLowerCase().split(" ");
        console.log(array.indexOf(var1.toLowerCase()));
        if(producto.titulo.toLowerCase().indexOf(buscador.toLowerCase()) >= 0){
        //if(producto.titulo.toLowerCase().indexOf(var1.toLowerCase()) >= 0){
          fragment.appendChild(clone);
          nuevoManga = new Manga(producto.titulo, producto.autor, 
            producto.generos, producto.sinopsis,
            producto.rutaArchivo, producto.imagenURL, 
            producto.id, producto.precio);
            mangas.push(nuevoManga);
        }
      
    })
    items.appendChild(fragment)
}

const almacenarMangas = function(datos){
  for(item of datos){
      nuevoManga = new Manga(item.titulo, item.autor, 
                          item.generos, item.sinopsis,
                          item.rutaArchivo, item.imagenURL, 
                          item.id, item.precio);
      mangas.push(nuevoManga);
  }
}

  const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');


items.addEventListener('click', e =>{
  verMasClick(e);
});

const verMasClick = function(e){
  if(e.target.classList.contains('btn-dark')){
    mandarMangaSeleccionado(e.target.parentElement.parentElement);
  }
  //Detener cualquier posible evento de cards
  e.stopPropagation();
}

const mandarMangaSeleccionado = objeto => {
  let manga = mangas.find(manga => manga.titulo === objeto.querySelector('h5').textContent); 
  console.log(manga)
  if(localStorage.getItem('mangaSeleccionado')){
    localStorage.removeItem('mangaSeleccionado');
  } 
  localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
}

//  Para agregar o quitar la clase dark al body 
btnCambiarOscuro.addEventListener('click', function(){
    document.body.classList.toggle('dark');
    // console.log('click')
});

