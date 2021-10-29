const btnCambiarOscuro = document.getElementById('btnCambiarOscuro');


//  Para agregar o quitar la clase dark al body 
//btnCambiarOscuro.addEventListener('click', function(){
  //  document.body.classList.toggle('dark');
//});

//validacion
function validacion() {
    var nom = document.reg.nombre.value;
    var email = document.reg.email.value;
    var asunto = document.reg.asunto.value;
    var texto = document.reg.mensaje.value;
    var at = false
    var cont = 0;

    if(nom == ""){
        document.reg.nombre.focus();
        Swal.fire({
            
            text: 'Escriba un nombre',
            target: '#custom-target',
            
            customClass: {
              container: 'position-absolute'
            },
            toast: true,
            position: 'bottom-right',
            icon: 'warning',
            confirmButtonColor: '#DE3E49'
            
          })
        return false;
    }

    while (!at && (cont < email.length)) {
        if (email.charAt(cont) == "@")
          at = true;
        cont++;
    }
    if(!at){
        document.reg.email.focus();
        Swal.fire({
            text: 'No se ingreso un email valido',
            target: '#custom-target',
            customClass: {
              container: 'position-absolute'
            },
            toast: true,
            position: 'bottom-right',
            icon: 'warning',
            confirmButtonColor: '#DE3E49'
          })
            return false;
    }


    if(asunto == ""){
        document.reg.asunto.focus();
        Swal.fire({
            
            text: 'Escriba un asunto',
            target: '#custom-target',
            
            customClass: {
              container: 'position-absolute'
            },
            toast: true,
            position: 'bottom-right',
            icon: 'warning',
            confirmButtonColor: '#DE3E49'
            
          })
        return false;
    }

    if(texto == ""){
        document.reg.mensaje.focus();
        Swal.fire({
            
            text: 'Escriba un texto',
            target: '#custom-target',
            
            customClass: {
              container: 'position-absolute'
            },
            toast: true,
            position: 'bottom-right',
            icon: 'warning',
            confirmButtonColor: '#DE3E49'
            
          })

    }
    else{
        return true
    }


    
}