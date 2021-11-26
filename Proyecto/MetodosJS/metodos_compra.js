const btnCompra = document.getElementById('btnCompra');
const btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
let manga;
let carrito = [];
let biblioteca = [];

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
    //  Para obtener el mangaSeleccionado
    if(localStorage.getItem('mangaSeleccionado')) {
        let mangaSeleccionado = JSON.parse(localStorage.getItem('mangaSeleccionado'));
        manga = mangaSeleccionado;
        if(localStorage.getItem('carrito')) {
            //  En caso de que el manga ya haya sido agregado en el carrito
            //  Se actualizará el botón
            carrito = JSON.parse(localStorage.getItem('carrito'));
            buscarEnCarrito(mangaSeleccionado);
        }
        pintarCard(mangaSeleccionado);
        insertDatos(mangaSeleccionado);
        //  En caso de que haya elementos en la biblioteca, se verificará si el manga actual está almacenado allí
        if(localStorage.getItem('biblioteca')){
            biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
            cargarAgregadoBiblioteca();
        }
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

//  Método para buscar el manga y verificar si existe en el carrito
const buscarEnCarrito = function(mangaSeleccionado){
    var existe = carrito.find(item => item.titulo === mangaSeleccionado.titulo);
    //  De ser así, el botón de "Añadir al carrito" cambiará
    if(existe){
        btnAgregarCarrito.style.backgroundColor =  "#419641";
        btnAgregarCarrito.innerText =  "Añadido al carrito";
        btnAgregarCarrito.disabled = false;
        btnAgregarCarrito.cursor = 'default';
    }
}

//  Método para pintar la imagen del manga en la página
const pintarCard = function(mangaSeleccionado){
    document.querySelector("#show").setAttribute("src",mangaSeleccionado.imagenURL);
}

//  Método para llenar los datos del manga y que se muestren en la página
const insertDatos = function(mangaSeleccionado){
    
    document.getElementById("tit").innerHTML = mangaSeleccionado.titulo.toString();
    document.getElementById("costo").innerHTML += mangaSeleccionado.precio.toString();
    document.getElementById("autor").innerHTML += mangaSeleccionado.autor.toString();
    document.getElementById("sinopsis").innerHTML += mangaSeleccionado.sinopsis;

    for(i=0; i<mangaSeleccionado.generos.length;i++){
        document.getElementById("generos").innerHTML += mangaSeleccionado.generos[i];
        if(mangaSeleccionado.generos.length > i+1){
            document.getElementById("generos").innerHTML += ",  ";
        }
    }
}

const cargarAgregadoBiblioteca = function(){
    var existe = biblioteca.find(item => item.titulo === manga.titulo);
    if(existe){
        var padre1 = btnCompra.parentNode;
        var nuevoBoton = document.createElement("button");
        nuevoBoton.setAttribute('id','btnDescargar');
        nuevoBoton.setAttribute('class','btn btn-primary btn-lg');
        nuevoBoton.innerText = 'Descargar';
        padre1.appendChild(nuevoBoton);
        nuevoBoton.addEventListener('click', function(){
            descargarPDF();
        })
        padre1.removeChild(btnCompra);
        //  Se remueve el botón de añadir al carrito
        var padre = btnAgregarCarrito.parentNode;
        padre.removeChild(btnAgregarCarrito);
    }
}

//  Cuando se desee agregar el manga al carrito
btnAgregarCarrito.addEventListener('click', function() {
    var existe = carrito.find(item => item.titulo === manga.titulo);
    if(!existe){
        btnAgregarCarrito.style.backgroundColor =  "#419641";
        btnAgregarCarrito.innerText =  "Añadido al carrito";
        btnAgregarCarrito.disabled = false;
        btnAgregarCarrito.style.cursor = 'default';
        //  En caso de que ya exista el carrito, se le agrega el nuevo manga
        if(localStorage.getItem('carrito')) {
            guardarDatosSQL("carrito");
            carrito = JSON.parse(localStorage.getItem('carrito'));
            carrito.push(manga);
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }
        else{
            //  Caso contrario, se guarda en el localStorage
            carrito.push(manga);
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }
    }
});

// const guardarDatosSQL = function(destino){
//     var datos = [];
//     datos["destino"] = destino;
//     datos["id"] = manga.id;
//     datosJSON = JSON.stringify(datos);
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 //El resultado se muestra en consola
//                 console.log(this.responseText);
//                 alert(this.responseText);
//             }
//         };
//     xhttp.open('POST', 'PHP/guardar.php', true);
//     xhttp.send(datosJSON); 
// }

const guardarDatosSQL = function(destino){
    $.ajax({
        url : "PHP/guardar.php",
        type: "POST",
        async: true,
        data:{
            destino: destino,
            id_manga: manga.id
        },
        beforeSend: function(){

        },
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
}

//  Al momento de realizar la compra
btnCompra.addEventListener('click', function(){
    var existe = biblioteca.find(item => item.titulo === manga.titulo);
    if(!existe){
        Swal.fire({
            text: '¿Deseas realizar tu compra?',
            title: "Total a pagar: $"+eval(manga.precio).toFixed(2),
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#419641',
            cancelButtonColor: '#d33',
            cancelButtonText: "Cancelar",
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            //  Cambia el estilo del botón
            // btnCompra.style.borderRadius = '50px';
            // btnCompra.style.color = 'white';
            // btnCompra.innerText =  "Descargar";
            // btnCompra.className = 'btn-success' + ' btn ' + ' btn-lg';
            // btnCompra.id = "btnDescargar";
            if (result.isConfirmed) {
                removerMangaCarrito();
                var padre1 = btnCompra.parentNode;
                var nuevoBoton = document.createElement("button");
                nuevoBoton.setAttribute('id','btnDescargar');
                nuevoBoton.setAttribute('class','btn btn-primary btn-lg');
                nuevoBoton.innerText = 'Descargar';
                padre1.appendChild(nuevoBoton);
                nuevoBoton.addEventListener('click', function(){
                    descargarPDF();
                })
                padre1.removeChild(btnCompra);
                //  Se remueve el botón de añadir al carrito
                padre = btnAgregarCarrito.parentNode;
                padre.removeChild(btnAgregarCarrito);
                Swal.fire({
                    title: '¡Compra realizada!',
                    text: '¡Gracias por tu compra!',
                    icon: 'success',
                    confirmButtonColor: '#419641',
                    confirmButtonText: 'Entendido',
                    footer: '<a href="Biblioteca.html" class="btn btn-primary">Ir a mi biblioteca</a>'
                })
            }
            if(localStorage.getItem('biblioteca')){
                biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
                biblioteca.push(manga);
                localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
            }else{  //  Caso que no hayan ni descargados ni mangas en la biblioteca
                biblioteca.push(manga);
                localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
            }
        })
    }
});

//  Método para remover al manga del carrito, pues ya ha sido comprado
const removerMangaCarrito = function(){
    for(var i = 0; i < carrito.length; i++){
        if(JSON.stringify(carrito[i]) == JSON.stringify(manga)){
            var j = carrito.indexOf( manga );
            j !== -1 && carrito.splice( j, 1 );
            break;
        }
    }
    if(carrito.length > 0){
        localStorage.setItem('carrito',JSON.stringify(carrito));
    }else{  //  Significa que el carrito está vacío, por lo que se remueve del localStorage
        localStorage.removeItem('carrito');
    }
}

//  Método para descargar el pdf del manga
const descargarPDF = function(){
    var btnDescargar = document.getElementById('btnDescargar');
    btnDescargar.style.borderRadius = '50px';
    btnDescargar.style.color = 'white';
    btnDescargar.innerText =  "Descargado";
    btnDescargar.className = 'btn-success' + ' btn ' + ' btn-lg';
    btnDescargar.id = "btnDescargado";
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

    setTimeout(function(){
        var btnDescargado = document.getElementById('btnDescargado');
        btnDescargado.setAttribute('id','btnDescargar');
        btnDescargado.setAttribute('class','btn btn-primary btn-lg');
        btnDescargado.innerText = 'Descargar';
    }, 3000);
}