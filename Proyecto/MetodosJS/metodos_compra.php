<?php
 include_once '../sesionNav.php';
?>
const btnCompra = document.getElementById('btnCompra');
const btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
let manga;
let carrito = [];
let biblioteca = [];
const mangas = [];

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
    //  Para obtener el mangaSeleccionado
    if(localStorage.getItem('mangaSeleccionado')) {
        let mangaSeleccionado = JSON.parse(localStorage.getItem('mangaSeleccionado'));
        manga = mangaSeleccionado;
        if(manga.generos[0]=="18+"||manga.generos[0]=="+18"){
            <?php echo "var esMayor = '$esMayor';";?>
            if(esMayor === "No"){
                <?php 
                    if($userkey == "Invitado"){
                        echo "var texto = '¡Debes iniciar sesión!';";
                    }else
                    echo "var texto = '¡Debes ser mayor de edad para comprar este manga!';";?>
                btnCompra.setAttribute('class', 'btn btn-primary btn-lg disabled');
                btnAgregarCarrito.setAttribute('class', 'btn btn-secondary btn-lg disabled');
                Swal.fire({
            
                text: texto,
                toast: true,
                position: 'top-right',
                icon: 'warning',
                confirmButtonColor: '#DE3E49'
                
                })
            }
        }
        recuperarIDSQL('carrito');
        pintarCard(mangaSeleccionado);
        insertDatos(mangaSeleccionado);
        recuperarIDSQL('biblioteca');
    } else{
        Swal.fire({
            icon: 'warning',
            title: '¡No seleccionaste ningún manga!',
            text: 'Ve en busca de nuevos mangas para añadir a tu biblioteca y comprar.',
            showConfirmButton: false,
            footer: '<a href="Categorias_Main.php" class="btn btn-primary btn-lg">Ir a categorías</a>'
        })
    }
    
});

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
            guardarDatosSQL("carrito", "guardar");
            carrito = JSON.parse(localStorage.getItem('carrito'));
            carrito.push(manga);
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }
        else{
            //  Caso contrario, se guarda en el localStorage
            guardarDatosSQL("carrito", "guardar");
            carrito.push(manga);
            localStorage.setItem('carrito',JSON.stringify(carrito));
        }
    }
});

//  Método para guardar los id de los mangas ya sea de mangas comprados (carrito) o biblioteca
const guardarDatosSQL = function(destino, accion){
    $.ajax({
        url : "PHP/guardarCB.php",
        type: "POST",
        async: true,
        data:{
            destino: destino,
            accion: accion,
            id_manga: manga.id
        },
        beforeSend: function(){

        },
        success: function(response){
            //  console.log(JSON.stringify(response) + " por medio de "+destino);
            recuperarIDSQL(destino);
        },
        error: function(error){
            //   console.log(error);
        }
    })
}

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
};

const llenarCarrito = function(mangasComprados){
    for(var i=0; i<mangasComprados.length; i++){
        var existe = mangas.find(item => item.id === mangasComprados[i]);
        if(existe){
            carrito.push(existe);
        }
    }
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito',JSON.stringify(carrito));
    buscarEnCarrito(manga);
}

const llenarBiblioteca = function(mangasDeBiblioteca){
    for(var i=0; i<mangasDeBiblioteca.length; i++){
        var existe = mangas.find(item => item.id === mangasDeBiblioteca[i]);
        if(existe){
            biblioteca.push(existe);
        }
    }
    localStorage.removeItem('biblioteca');
    localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
    cargarAgregadoBiblioteca();
}

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
                    footer: '<a href="Biblioteca.php" class="btn btn-primary">Ir a mi biblioteca</a>'
                })
            }
            if(localStorage.getItem('biblioteca')){
                guardarDatosSQL("biblioteca", "guardar");
                biblioteca = JSON.parse(localStorage.getItem('biblioteca'));
                biblioteca.push(manga);
                localStorage.setItem('biblioteca',JSON.stringify(biblioteca));
            }else{  //  Caso que no haya mangas en la biblioteca
                guardarDatosSQL("biblioteca", "guardar");
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
        guardarDatosSQL("carrito", "remover");
        localStorage.setItem('carrito',JSON.stringify(carrito));
    }else{  //  Significa que el carrito está vacío, por lo que se remueve del localStorage
        guardarDatosSQL("carrito", "remover");
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
        var btnDescargado = document.getElementById('btnDescargado');
        btnDescargado.setAttribute('id','btnDescargar');
        btnDescargado.setAttribute('class','btn btn-primary btn-lg');
        btnDescargado.innerText = 'Descargar';
    }, 3000);
}

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