const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
//var1 = prompt("dime un anime")//

document.addEventListener('DOMContentLoaded', () => {
        fetchData()
    })

const fetchData = async () => {
  const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            pintarCards(data);
        }
    };
    xhttp.open("GET", "Mangas.json");
    xhttp.send();
}


const pintarCards = data => {
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.titulo
        templateCard.querySelector('p').textContent = '$' + producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.imagenURL)
        const clone = templateCard.cloneNode(true)
        //if(var1.toLowerCase()==producto.titulo.toLowerCase())//
        fragment.appendChild(clone)
      
    })
    items.appendChild(fragment)
  }

  const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');


//  Para agregar o quitar la clase dark al body 
btnCambiarOscuro.addEventListener('click', function(){
    document.body.classList.toggle('dark');
});
 
