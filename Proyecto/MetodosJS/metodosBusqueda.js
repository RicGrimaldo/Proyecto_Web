const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
const textoBusqueda = document.getElementById('textoBusqueda');
const mangas = [];
var buscar = " ";
var buscador = " ";
var encontrado = false;

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
  var1 = localStorage.getItem('contenidoABuscar');
  if(var1 == null){
    Swal.fire({
      icon: 'warning',
      title: '¡No se encontró ningún manga a buscar!',
      text: 'Intenta de nuevo.',
      showConfirmButton: false,
      footer: '<a href="index.html" class="btn btn-primary">Ir a Inicio</a>'
  })
  }
  leerDatos()
});

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
        if(producto.titulo.toLowerCase().indexOf(var1.toLowerCase()) >= 0){
          fragment.appendChild(clone);
          nuevoManga = new Manga(producto.titulo, producto.autor, 
            producto.generos, producto.sinopsis,
            producto.rutaArchivo, producto.imagenURL, 
            producto.id, producto.precio);
            mangas.push(nuevoManga);
            encontrado = true;
        }
      
    })
    items.appendChild(fragment)
    textoBusqueda.innerText = 'Se muestran resultados para \"'+var1+"\""
    if(!encontrado){
      Swal.fire({
        icon: 'warning',
        title: 'No se encontró nada relacionado con \"'+var1+'\"',
        text: 'Intenta de nuevo.',
        showConfirmButton: false,
        footer: '<a href="index.html" class="btn btn-primary">Ir a Inicio</a>'
    })
    }
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
  if(localStorage.getItem('mangaSeleccionado')){
    localStorage.removeItem('mangaSeleccionado');
  } 
  localStorage.setItem('mangaSeleccionado',JSON.stringify(manga));
}


