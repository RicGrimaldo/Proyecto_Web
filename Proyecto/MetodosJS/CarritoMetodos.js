const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const btnPagar = document.getElementById('precioTotal');
const btnVaciarCarrito = document.getElementById('btnVaciar');
const btnQuitarSeleccion = document.getElementById('btnQuitarSeleccion');
var precioTotal = 0;
var seleccion = false;
const mangas = [];
let biblioteca = [];
let carrito = [];

//  Objeto de tipo manga
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

//  Método cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    leerDatos();
    //  Sólo se cargará la página si hay mangas almacenados en el carrito
    recuperarIDSQL('carrito');
    // if(localStorage.getItem('carrito')) {
    //     carrito = JSON.parse(localStorage.getItem('carrito'));
    //     pintarCards();
    // } else{
    //     Swal.fire({
    //         icon: 'warning',
    //         title: '¡No tienes nada agregado al carrito!',
    //         showConfirmButton: false,
    //         footer: '<a href="Categorias_Main.html" class="btn">Ir a categorías</a>'
    //     })
    // }
    if(localStorage.getItem('biblioteca')) {
        biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
        quitarMangasComprados();
    }
});

const recuperarIDSQL = function(origen){
    $.ajax({
        url : "PHP/recuperar.php",
        type: "POST",
        async: true,
        data:{
            origen: origen
        },
        beforeSend: function(){

        },
        success: function(response){
            llenarCarrito(JSON.parse(response));
        },
        error: function(error){
            console.log(error);
        }
    })
}

const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
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
    console.log(mangas);
};

//  Se pintan los templates (cartas) a partir de los mangas leídos del JSON
const pintarCards = function(){
    for(var i = 0; i < carrito.length; i++){
        templateCard.querySelector('h5').textContent = carrito[i].titulo;
        templateCard.querySelector('p').textContent = "$"  + carrito[i].precio;
        templateCard.querySelector('img').setAttribute('src', carrito[i].imagenURL);
        templateCard.querySelector('.btn-dark').dataset.id = carrito[i].id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    }
    cards.appendChild(fragment);
};

//  Se llena el array de carrito con objetos de tipo manga
const llenarCarrito = function(mangasComprados){
    for(var i = 0; i < mangasComprados.length; i++){
        console.log("Busquemos el manga comprado " + mangasComprados[i]);
        var existe = mangas.find(item => item.id === mangasComprados[i]);
        console.log(mangas.includes(mangasComprados[i]));
        console.log(existe);
        if(existe){
            carrito.push(existe);
        }
    }
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito',JSON.stringify(carrito));
    pintarCards();
}

//  Se llena el array de carrito con objetos de tipo manga
// const llenarCarrito = function(mangasComprados){
//     for(var j = 0; j < mangas.length; j++){
//         for(var i = 0; i < mangasComprados.length; i++){
//             console.log("Comparemos "+mangas[j].id+" con "+mangasComprados[i]+" del objeto "+mangas[j]);
//             console.log("Busquemos el manga comprado " + mangasComprados[i]);
//             if(mangas[j].id === mangasComprados[i]){
//                 carrito.push(existe);
//             }
//         }
//     }
//     localStorage.removeItem('carrito');
//     localStorage.setItem('carrito',JSON.stringify(carrito));
//     pintarCards();
// }


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
            title: '¡No tienes ningún manga seleccionado!'
        })
    }
});

//  Este método será modificado, pues una vez se compren los mangas, ya no deberían aparecer en la página del carrito
const vaciarComprados = function(){
    if(precioTotal > 0){
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
            quitarMangasComprados();
                //  El array de biblioteca se almacena en localStorage para ser recuperado por la página de Biblioteca
            localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Compra realizada!',
                    text: '¡Gracias por tu compra!',
                    icon: 'success',
                    confirmButtonColor: '#419641',
                    confirmButtonText: 'Entendido',
                    footer: '<a href="Biblioteca.html" class="btn">Ir a mi biblioteca</a>'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.location.reload();
                    }
                })
            }
        })
    }else{
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
};

//  Para quitar los mangas comprados del array del carrito
const quitarMangasComprados = function(){
    for(var i = 0; i < biblioteca.length; i++){
        for(var j = 0; j < carrito.length; j++){
            if(JSON.stringify(biblioteca[i]) == JSON.stringify(carrito[j])){
                removeItemFromArr(carrito[j]);
            }
        }
        if(carrito.length > 0){
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }else{  // Si ya no hay mangas, se quita el carrito del localStorage
            localStorage.removeItem('carrito');
        }
    }
}

var removeItemFromArr = ( manga ) => {
    var i = carrito.indexOf( manga );
    i !== -1 && carrito.splice( i, 1 );
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
            carrito = [];
            localStorage.removeItem('carrito');
            document.location.reload();
        }
    })
});
