const btnCompra = document.getElementById('btnCompra');
const btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
let manga;
let carrito = [];

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
    // leerDatos();
    if(localStorage.getItem('mangaSeleccionado')) {
        let mangaSeleccionado = JSON.parse(localStorage.getItem('mangaSeleccionado'));
        manga = mangaSeleccionado;
        if(localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
            buscarEnCarrito(mangaSeleccionado);
        }
        pintarCard(mangaSeleccionado);
        insertDatos(mangaSeleccionado);
    } else{
        Swal.fire({
            icon: 'warning',
            title: '¡No seleccionaste ningún manga!',
            text: 'Ve en busca de nuevos mangas para añadir a tu biblioteca y comprar.',
            showConfirmButton: false,
            footer: '<a href="Categorias_Main.html" class="btn btn-primary btn-lg">Ir a categorías</a>'
        })
    }
    
});

const buscarEnCarrito = function(mangaSeleccionado){
    var existe = carrito.find(item => item.titulo === mangaSeleccionado.titulo);
    if(existe){
        btnAgregarCarrito.style.backgroundColor =  "#419641";
        btnAgregarCarrito.innerText =  "Añadido al carrito";
        btnAgregarCarrito.disabled = false;
        btnAgregarCarrito.style.cursor = 'default';
    }
}

const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCard(datos);
            insertDatos(datos);
        }
    };
    xhttp.open("GET", "compra_manga.json");
    xhttp.send();
};

const pintarCard =function(mangaSeleccionado){
    document.querySelector("#show").setAttribute("src",mangaSeleccionado.imagenURL);
}

const insertDatos = function(mangaSeleccionado){
    
    document.getElementById("tit").innerHTML = mangaSeleccionado.titulo.toString();
    document.getElementById("costo").innerHTML += mangaSeleccionado.precio.toString();
    document.getElementById("autor").innerHTML += mangaSeleccionado.autor.toString();
    document.getElementById("sinopsis").innerHTML += mangaSeleccionado.sinopsis;
    console.log(mangaSeleccionado);

    for(i=0; i<mangaSeleccionado.generos.length;i++){
        document.getElementById("generos").innerHTML += mangaSeleccionado.generos[i];
        if(mangaSeleccionado.generos.length > i+1){
            document.getElementById("generos").innerHTML += ",  ";
        }
    }
}

btnAgregarCarrito.addEventListener('click', function(){
    var existe = carrito.find(item => item.titulo === manga.titulo);
    if(!existe){
        btnAgregarCarrito.style.backgroundColor =  "#419641";
        btnAgregarCarrito.innerText =  "Añadido al carrito";
        btnAgregarCarrito.disabled = false;
        btnAgregarCarrito.style.cursor = 'default';
        if(localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
            carrito.push(manga);
            console.log(carrito);
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }
        else{
            carrito.push(manga);
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }
    }
});

btnCompra.addEventListener('click', function(){

});