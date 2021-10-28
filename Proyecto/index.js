const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()


function setCookie(name, value, expires) {
  if(expires) {
      const date = new Date();
      date.setTime(date.getTime() + (expires*24*60*60*1000));
      expires = "expires="+ date.toUTCString();
  }
  else {
      expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function removeCookies(name) {
  setCookie(name, "", -1)
}


  var btn = document.getElementById("btn");
  btn.onclick = function(e){
    if(typeof buscar === 'undefined'||buscar===null){
      var buscar =  document.formulario.nom.value
      setCookie("buscar",buscar,10)
    }
    else{
      removeCookies(buscar)
      var buscar =  document.formulario.nom.value
      setCookie("buscar",buscar,10)
    }
    var buscador = getCookie("buscar");
  }


//var1 = prompt("dime un anime")

/*boton = addEventListener("click",function(e){
  e.preventDefault
  var input = this.document.getElementById("form").value
  leerDatos()
})*/



document.addEventListener('DOMContentLoaded', function() {
   // fetchData()
  leerDatos()
  });



/*const fetchData = async () => {
  try {
    const  = await fetch('Mangas.json')
    const data = await res.json()
    // console.log(data)
    pintarCards(data)
  } catch (error) {
    console.log(error)
    }
  }*/

  const leerDatos = async() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            pintarCards(datos);

        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();


const pintarCards = data => {
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.titulo
        templateCard.querySelector('p').textContent = '$' + producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.imagenURL)
        const clone = templateCard.cloneNode(true)
        if(buscador.toLowerCase()==producto.titulo.toLowerCase())
        fragment.appendChild(clone)
      
    })
    items.appendChild(fragment)
  }

  const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');


//  Para agregar o quitar la clase dark al body 
btnCambiarOscuro.addEventListener('click', function(){
    document.body.classList.toggle('dark');
});
 
  }