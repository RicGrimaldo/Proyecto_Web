const card_comedia = document.getElementById('cat_comedia');
const card_gore = document.getElementById('cat_gore')
const card_drama = document.getElementById('cat_drama');
const card_romance = document.getElementById('cat_romance');
const card_horror = document.getElementById('cat_horror');
const card_ecchi = document.getElementById('cat_ecchi');
const card_tragedia = document.getElementById('cat_tragedia');

const templateCard = document.getElementById('template-card').content;

const fragment_comedia = document.createDocumentFragment();
const fragment_gore = document.createDocumentFragment();
const fragment_drama = document.createDocumentFragment();
const fragment_romance = document.createDocumentFragment();
const fragment_horror = document.createDocumentFragment();
const fragment_ecchi = document.createDocumentFragment();
const fragment_tragedia = document.createDocumentFragment();





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

const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCards(datos);
        }
    };
    xhttp.open("GET", "NewMangas_Data.json");
    xhttp.send();
};

const pintarCards = function(datos){

    
    for(let item of datos){

        templateCard.querySelector('img').setAttribute('src', item.imagenURL);

        if(item.generos[0]=="18+"){

            for(i=0; i<item.generos.length;i++){

                if(item.generos[i].toString().toLowerCase()=="comedia"){
                    const clone = templateCard.cloneNode(true);
                    fragment_comedia.appendChild(clone);
                }      
                if(item.generos[i].toString().toLowerCase()=="drama"){
                    const clone2 = templateCard.cloneNode(true);
                    fragment_drama.appendChild(clone2);
                }
                if(item.generos[i].toString().toLowerCase()=="gore"){
                    const clone3 = templateCard.cloneNode(true);
                    fragment_gore.appendChild(clone3);
                }
                if(item.generos[i].toString().toLowerCase()=="ecchi"){
                   const clone4 = templateCard.cloneNode(true);
                   fragment_ecchi.appendChild(clone4);
                }
                if(item.generos[i].toString().toLowerCase()=="romance"){
                    const clone6 = templateCard.cloneNode(true);
                    fragment_romance.appendChild(clone6);
                }
                if(item.generos[i].toString().toLowerCase()=="horror"){
                    const clone7 = templateCard.cloneNode(true);
                    fragment_horror.appendChild(clone7);             
                }
                if(item.generos[i].toString().toLowerCase()=="tragedia"){
                    const clone8 = templateCard.cloneNode(true);
                    fragment_tragedia.appendChild(clone8);
                }

            }

        }else{
            
        }

 
    }
    
    card_comedia.appendChild(fragment_comedia);
    card_drama.appendChild(fragment_drama);
    card_gore.appendChild(fragment_gore);
    card_ecchi.appendChild(fragment_ecchi);
    card_romance.appendChild(fragment_romance);
    card_horror.appendChild(fragment_horror);
    card_tragedia.appendChild(fragment_tragedia);

    
};