<?php $contador = 0;?>
const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');
let biblioteca = [];
const mangas = [];

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

document.addEventListener('DOMContentLoaded', function() {
    leerDatos();
    recuperarIDSQL('biblioteca');
});

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
            llenarBiblioteca(JSON.parse(response));
        },
        error: function(error){
            console.log(error);
        }
    })
}

//  Para llenar el array de biblioteca a partir de la base de datos
const llenarBiblioteca = function(mangasDeBiblioteca){
    for(var i=0; i<mangasDeBiblioteca.length; i++){
        var existe = mangas.find(item => item.id === mangasDeBiblioteca[i]);
        if(existe){
            biblioteca.push(existe);
        }
    }
    if(mangasDeBiblioteca.length == 0){
        Swal.fire({
                icon: 'warning',
                title: '¡No tienes nada agregado a la biblioteca!',
                showConfirmButton: false,
                footer: '<a href="Carrito.php" class="button">Ir a mi carrito</a>'
            })
            setTimeout( function() { window.location.href = "Categorias_Main.php"; }, 4500 );
    }
    localStorage.removeItem('biblioteca');
    localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
    pintarCards();
}

//  Para pintar las cartas a partir de los mangas almacenados en la biblioteca
const pintarCards = function(){
    for(var i = 0; i < biblioteca.length; i++){
        templateCard.querySelector('h5').textContent = biblioteca[i].titulo;
        templateCard.querySelector('img').setAttribute('src', biblioteca[i].imagenURL);
        templateCard.querySelector('.button').dataset.id = biblioteca[i].id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    }
    cards.appendChild(fragment);
}

//  Cuando se haga referencia a una carta
cards.addEventListener('click', e =>{
    descargarClick(e);
});

//  Cuando se le haga click al botón, mandamos todo el elemento padre a setbiblioteca
const descargarClick = e =>{
    if(e.target.classList.contains('button')){
        descargarPDF(e.target.parentElement);
    }
    //Detener cualquier posible evento de cards
    e.stopPropagation();
};

//  Para capturar los elementos
const descargarPDF = objeto => {
    //  Buscamos el manga que fue seleccionado
    let manga = biblioteca.find(manga => manga.titulo === objeto.querySelector('h5').textContent);

    //  También hacemos referencia al botón de descarga
    var btn = objeto.querySelector('.button');

    //  Tanto el contenido como la clase cambiará de 'Descargar' a 'Descargado'
    btn.innerHTML =  `<span class="icon-check"></span>Descargado`;
    btn.className = "buttonDescargado";

    //  Para un alert mostrando el éxito de la descarga del pdf del manga seleccionado
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: '¡'+manga.titulo+' se ha descargado con éxito!'
    })

    <?php echo 'var titulo = manga.titulo.replace(/ /g, "") + generarHashTexto(manga.titulo) + \''.md5(time() . rand() .date("YmdHis"))."'";?>
 
    //  Para descargar el manga y no vuelva a poder ser descargado
    axios({
        url: manga.rutaArchivo,
        method: 'GET',
        responseType: 'blob'
    })
        .then((response) => {
            const url = window.URL
                    .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', titulo+'.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })

    setTimeout(function(){
        var btn = objeto.querySelector('.buttonDescargado');
        btn.innerHTML =  `<span class="icon-download"></span>Descargar`;
        btn.className = "button";
    }, 3000);

};

function generarHashTexto(texto) {
    var tiempoTranscurrido = Date.now();
    var hoy = new Date(tiempoTranscurrido);
    texto = texto + hoy.toDateString();
    if (typeof texto != 'string') {
        throw TypeError('El argumento debe ser una cadena de caracteres.');
    }

    if (!texto.length) {
        return null;
    }

    let caracteres = texto.split('');

    return caracteres.reduce((h, c) => (h = c.charCodeAt(0) + (h << 6) + (h << 16) - h), 0);
}