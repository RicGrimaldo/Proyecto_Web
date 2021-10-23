const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const precioBoton = document.getElementById('precioTotal');
const btnVaciarCarrito = document.getElementById('btnVaciar');
const btnQuitarSeleccion = document.getElementById('btnQuitarSeleccion');
const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');
var precioTotal = 0;
var seleccion = false;
let biblioteca = [];
const carrito = [];

function Manga(titulo, autor, generos, rangoEdad, rutaArchivo, imagenURL, id, precio) {
    this.titulo = titulo;
    this.autor = autor;
    this.generos = generos;
    this.rangoEdad = rangoEdad;
    this.rutaArchivo = rutaArchivo;
    this.imagenURL = imagenURL;
    this.id = id;
    this.precio = precio;
    this.descargado = false;
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
                btn.innerText =  "Agregado";
                btn.disabled = false;
                precioTotal += eval(biblioteca[j].precio);
                precioBoton.innerHTML = "Pagar: $"+precioTotal.toFixed(2);
            }
        }
    }
};

precioBoton.addEventListener('click', function(){
    if(biblioteca.length){
        vaciarComprados();
    }
    else{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        })
        Toast.fire({
            icon: 'warning',
            title: '¡No tienes nada agregado a la biblioteca!'
        })
    }
});

const vaciarComprados = function(){
    Swal.fire({
        text: '¿Deseas realizar tu compra?',
        title: "Total a pagar: $"+precioTotal.toFixed(2),
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#419641',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Compra realizada!',
                text: '¡Gracias por tu compra!',
                icon: 'success',
                confirmButtonColor: '#419641',
                confirmButtonText: 'Entendido',
                footer: '<a href="Biblioteca.html" class="btn">Ir a mi biblioteca</a>'
            })
            localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
        }
    })
};

btnQuitarSeleccion.addEventListener('click', function(){
    quitarSeleccionados();
});

const quitarSeleccionados = function(){
    if(seleccion){
        Swal.fire({
            title: '¿Estás seguro de quitar los mangas seleccionados?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#419641',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        })
    }
    else{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        })
        Toast.fire({
            icon: 'warning',
            title: '¡No tienes ningún manga seleccionado!'
        })
    }
}

cards.addEventListener('click', e =>{
    addbiblioteca(e);
});

btnVaciarCarrito.addEventListener('click', function(){
    Swal.fire({
        title: '¿Estás seguro de querer vaciar el carrito?',
        text: "¡Perderás todo lo que guardaste!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#419641',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Confirmar',
        iconColor: '#eaec41'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Carrito vaciado!',
                text: 'Puedes ir en busca de nuevos mangas para agregar a tu carrito.',
                icon: 'success',
                confirmButtonColor: '#419641',
                confirmButtonText: 'Entendido'
            })
            carrito = [];
        }
    })
})

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
    for(item of datos){
        nuevoManga = new Manga(item.titulo, item.autor, 
                            item.generos, item.rangoEdad, 
                            item.rutaArchivo, item.imagenURL, 
                            item.id, item.precio);
        carrito.push(nuevoManga);
    }
    console.log(carrito);
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
    
    seleccion = true;
    
    //  Buscamos el manga que fue seleccionado
    let manga = carrito.find(manga => manga.titulo === objeto.querySelector('h5').textContent);

    var exist = biblioteca.find(mangaExistente => mangaExistente.titulo == manga.titulo);

    //  Significa que el elemento aún no existe
    if(exist == null) {
        var btn = objeto.querySelector('.btn');
        btn.style.backgroundColor =  "#419641";
        btn.innerText =  "Agregado";
        btn.disabled = false;

        precioTotal += eval(manga.precio);
        precioBoton.innerHTML = "Pagar: $"+precioTotal.toFixed(2);

        //  Hacemos una copia del producto
        biblioteca.push({...manga});
        console.log(biblioteca);
    }

};

btnCambiarOscuro.addEventListener('click', function(){
    document.body.classList.toggle('dark');
});