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
    recuperarIDSQL('carrito');
    recuperarIDSQL('biblioteca');
});

//  Método para recuperar los datos de la base de datos
//  El origen puede ser tanto el carrito como de la biblioteca
const recuperarIDSQL = function(origen){
    $.ajax({
        url : "PHP/recuperarCB.php",
        type: "POST",
        async: true,
        data:{
            origen: origen
        },
        beforeSend: function(){

        },
        success: function(response){
            if(origen == 'carrito')
                llenarCarrito(JSON.parse(response));
            else if(origen == 'biblioteca'){
                llenarBiblioteca(JSON.parse(response));
            }
        },
        error: function(error){
            //  console.log(error);
        }
    })
}

//  Para leer con ajax el JSON que contiene la información de todos los mangas
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

//  Para almacenar objetos de tipo manga
const almacenarMangas = function(datos){
    for(item of datos){
        nuevoManga = new Manga(item.titulo, item.autor, 
                            item.generos, item.sinopsis,
                            item.rutaArchivo, item.imagenURL, 
                            item.id, item.precio);
        mangas.push(nuevoManga);
    }
};

//  Se llena el array de carrito con objetos de tipo manga
const llenarCarrito = function(mangasComprados){
    for(var i = 0; i < mangasComprados.length; i++){
        var existe = mangas.find(item => item.id === mangasComprados[i]);
        if(existe){
            carrito.push(existe);
        }
    }
    if(mangasComprados.length == 0){
        Swal.fire({
                icon: 'warning',
                title: '¡No tienes nada agregado al carrito!',
                showConfirmButton: false,
                footer: '<a href="Categorias_Main.php" class="btn">Ir a categorías</a>'
            })
            setTimeout( function() { window.location.href = "Categorias_Main.php"; }, 4500 );
    }
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito',JSON.stringify(carrito));
    pintarCards();
}

//  Se pintan los templates (cartas) a partir de los mangas almacenados en el carrito
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

//  Para llenar el array de biblioteca a partir de la base de datos
const llenarBiblioteca = function(mangasDeBiblioteca){
    for(var i=0; i<mangasDeBiblioteca.length; i++){
        var existe = mangas.find(item => item.id === mangasDeBiblioteca[i]);
        if(existe){
            biblioteca.push(existe);
        }
    }
    localStorage.removeItem('biblioteca');
    localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
}

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

//  Cuando se decida comprar mangas
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
            if (result.isConfirmed) {
                quitarMangasComprados();
                //  El array de biblioteca se almacena en localStorage para ser recuperado por la página de Biblioteca
                localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
                Swal.fire({
                    title: '¡Compra realizada!',
                    text: '¡Gracias por tu compra!',
                    icon: 'success',
                    confirmButtonColor: '#419641',
                    confirmButtonText: 'Entendido',
                    footer: '<a href="Biblioteca.php" class="btn">Ir a mi biblioteca</a>'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.location.reload();
                    }
                })
                setTimeout( function() { document.location.reload(); }, 2500 );
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
    var ids = [];
    for(var i = 0; i < biblioteca.length; i++){
        for(var j = 0; j < carrito.length; j++){
            if(JSON.stringify(biblioteca[i]) == JSON.stringify(carrito[j])){
                ids.push(carrito[j].id);
                removeItemFromArr(carrito[j]);
            }
        }
        if(carrito.length > 0){
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }else{  // Si ya no hay mangas, se quita el carrito del localStorage
            localStorage.removeItem('carrito');
        }
    }
    //  Se quitan los ids de los mangas comprados del atributo de carrito
    guardarDatosSQL("carrito", "removerLista", JSON.stringify(ids));
    //  Así mismo, se guardan en biblioteca
    guardarDatosSQL("biblioteca", "guardarLista", JSON.stringify(ids));
}

var removeItemFromArr = ( manga ) => {
    var i = carrito.indexOf( manga );
    i !== -1 && carrito.splice( i, 1 );
};

//  Método para guardar los id de los mangas ya sea de mangas comprados (carrito) o biblioteca
const guardarDatosSQL = function(destino, accion, ids){
    $.ajax({
        url : "PHP/guardarCB.php",
        type: "POST",
        async: true,
        data:{
            destino: destino,
            accion: accion,
            arregloIDS: ids
        },
        beforeSend: function(){

        },
        success: function(response){
            //  console.log("Accion de "+accion+" con " +JSON.stringify(response) + " por medio de "+destino);
        },
        error: function(error){
            //  console.log(error);
        }
    })
}

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
            guardarDatosSQL("carrito","vaciarCarrito");
            carrito = [];
            localStorage.removeItem('carrito');
            document.location.reload();
        }
    })
});
