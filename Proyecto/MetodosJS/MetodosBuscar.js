const contenidoABuscar = document.getElementById('contenidoABuscar');

btnBuscar.addEventListener('click', function(){
    if(localStorage.getItem('contenidoABuscar')){
        localStorage.removeItem('contenidoABuscar');
    }
    localStorage.setItem('contenidoABuscar',contenidoABuscar.value);
})