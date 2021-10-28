const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');
let biblioteca = [];
let descargados = [];

function Manga(titulo, autor, generos, rutaArchivo, imagenURL, id) {
    this.titulo = titulo;
    this.autor = autor;
    this.generos = generos;
    this.rutaArchivo = rutaArchivo;
    this.imagenURL = imagenURL;
    this.id = id;
}

//  Falta recorrer todo de nuevo y registrar elementos que ya hayan sido descargados
//  Para inhabilitar el botón, aunque también se puede preguntar "desea descargar de nuevo?" o similar
document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('biblioteca')) {
        biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
        pintarCards();
    } else{
        Swal.fire({
            icon: 'warning',
            title: '¡No tienes nada agregado a la biblioteca!',
            showConfirmButton: false,
            footer: '<a href="Carrito.html" class="button">Ir a mi carrito</a>'
        })
    }

    if(localStorage.getItem('Descargados')){
        descargados = JSON.parse(localStorage.getItem('Descargados'));
        cargarDescargados();
    }
});

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

//  Carga los mangas que ya hayan sido descargados y cambia su botón por 'descargado'
const cargarDescargados = function(){
    var botones = document.getElementsByClassName('button');
    for(var i = 0; i < botones.length; i++){
        var btn = botones[i];
        let manga = descargados.find(manga => manga.id === btn.dataset.id);
        if(manga != null){
            btn.innerHTML =  `<span class="icon-check"></span>Descargado`;
            btn.className = "buttonDescargado";
            i--;
        }

    }
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

    //  Almacenamos el manga descargado al array de Descargados
    descargados.push(manga);

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
            link.setAttribute('download', manga.titulo+'.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })

        //  Se guarda el array de descargados en localStorage
    localStorage.setItem('Descargados',JSON.stringify(descargados));

};

//  Para agregar la clase que cambia al modo oscuro
// btnCambiarOscuro.addEventListener('click', function(){
//     document.body.classList.toggle('dark');
// });