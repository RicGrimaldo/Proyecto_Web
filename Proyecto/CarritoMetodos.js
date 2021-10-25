const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const btnPagar = document.getElementById('precioTotal');
const btnVaciarCarrito = document.getElementById('btnVaciar');
const btnQuitarSeleccion = document.getElementById('btnQuitarSeleccion');
// const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');
var precioTotal = 0;
var seleccion = false;
let biblioteca = [];
const carrito = [];

//  Objeto de tipo manga
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

//  Método cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    leerDatos();
    if(localStorage.getItem('biblioteca')) {
        biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
    }
});

//  Se leen los datos del JSON
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

//  Se pintan los templates (cartas) a partir de los mangas leídos del JSON
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

//  Se llena el array de carrito con objetos de tipo manga
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

//  En caso de que los mangas ya hayan sido comprados, aparecerá el botón como agregado
//  NOTA: Esto se reemplazará por que ya no aparezcan, pues se supone que una vez comprados ya no deben aparecer
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
                btnPagar.innerHTML = "Pagar: $"+precioTotal.toFixed(2);
            }
        }
    }
};

//  Evento cuando se haga click al botón de pagar
btnPagar.addEventListener('click', function(){
    //  Primero se verifica si en efecto hay mangas agregados a la biblioteca (es decir, comprados)
    if(biblioteca.length){
        vaciarComprados();
    }
    else{   //  Caso en el que no se haya agregado nada a la biblioteca
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

//  Este método será modificado, pues una vez se compren los mangas, ya no deberían aparecer en la página del carrito
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
            //  El array de biblioteca se almacena en localStorage para ser recuperado por la página de Biblioteca
            localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
        }
    })
};

//  Método en el que el usuario decide quitar la selección de mangas a comprar
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
            //  Como ningún manga fue comprado, no se almacena en biblioteca
            //  Por lo tanto, el carrito cargará todo por defecto
            if (result.isConfirmed) {
                window.location.reload();
            }
        })
    }
    else{
        //  En caso que el usuario quiera quitar la selección, pero no haya seleccionado ningún manga
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

//  Cuando se haga referencia a una carta
cards.addEventListener('click', e =>{
    addbiblioteca(e);
});

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

        //  Actualizamos el precio acumulado a pagar
        precioTotal += eval(manga.precio);
        btnPagar.innerHTML = "Pagar: $"+precioTotal.toFixed(2);

        //  Hacemos una copia del producto
        biblioteca.push({...manga});
        console.log(biblioteca);
    }

};

// Este método tendrá verdadera funcionalidad una vez se actualice
//  Pues el array de carrito en realidad tomará los mangas almacenados 
//  en el localStorage a partir del array de clave 'carrito' (a implementar)
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

const btnSwitch = document.querySelector("#switchb");

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');


    if(document.body.classList.contains('dark')){
        document.cookie = "dark=true";
    }else{
        document.cookie = "dark=false"
    }
});

if(document.cookie.includes("dark=true")){
    document.body.classList.add('dark');
    btnSwitch.classList.toggle('active');
}else{
    document.body.classList.remove('dark');
}