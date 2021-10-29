const contenidoABuscar = document.getElementById('contenidoABuscar');
const btnBuscar = document.getElementById('btnBuscar');

btnBuscar.addEventListener('click', function(){
    if(localStorage.getItem('contenidoABuscar')){
        localStorage.removeItem('contenidoABuscar');
    }
    localStorage.setItem('contenidoABuscar',contenidoABuscar.value);
})

contenidoABuscar.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.keyCode === 13) {
        alert('enter')
        if(localStorage.getItem('contenidoABuscar')){
            localStorage.removeItem('contenidoABuscar');
        }
        localStorage.setItem('contenidoABuscar',contenidoABuscar.value);
    }
})