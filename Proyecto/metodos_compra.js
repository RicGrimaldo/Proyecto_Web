

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
    
});

const obtenerDatos = function(){
    
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

const pintarCard =function(datos){
  
   document.querySelector("#show").setAttribute("src",datos.imagenURL);

}

const insertDatos = function(datos){
    
    document.getElementById("tit").innerHTML = datos.titulo.toString();
    document.getElementById("costo").innerHTML += datos.precio.toString();
    document.getElementById("autor").innerHTML += datos.autor.toString();
    document.getElementById("sinopsis").innerHTML += datos.sinopsis.toString();

    for(i=0; i<datos.generos.length;i++){
        document.getElementById("generos").innerHTML += datos.generos[i].toString() ;
        if(datos.generos.length > i+1){
            document.getElementById("generos").innerHTML += ",  ";
        }
    }
}

