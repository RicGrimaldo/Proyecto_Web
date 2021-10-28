const btnRegistro = document.getElementById('btnRegistro');
const btnLog = document.getElementById('btnLog');


btnRegistro.addEventListener('click', function(){
  validacion();
})

function validacion() {

    var nom = document.reg.nombre.value;

    var email = document.reg.email.value;

    var user = document.reg.user.value;

    var OrigPass = document.reg.passwrd.value;
    var ConfPass = document.reg.conpasswrd.value;

    var OrigPassletras = document.reg.passwrd.value.length;

    var at = false;
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

    if(user == ""){
        document.reg.user.focus();
        Swal.fire({
            text: 'No se ingreso un usuario',
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

    if (OrigPass == ConfPass ) {
        if(OrigPassletras < 8){
            document.reg.passwrd.focus();
            Swal.fire({
                text: 'La contraseña es menor a 8 caracteres',
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
        }else{
          return true;
        }
        
        
    }else{
        document.reg.conpasswrd.focus();
        Swal.fire({
            text: 'Las contraseñas no son iguales',
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

}

btnLog.addEventListener('click', function(){
  validacion_log()
})

function validacion_log(){
    var email_login = document.loginn.email.value;
    var pass_login = document.loginn.passwrd.value;
    var at = false;
    var cont = 0;

    while (!at && (cont < email_login.length)) {
        if (email_login.charAt(cont) == "@")
          at = true;
        cont++;
    }

    if(!at){
        document.loginn.email.focus();
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

    if(pass_login == ""){
        document.loginn.passwrd.focus();
        Swal.fire({
            text: 'No se ingreso una contraseña',
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
}

//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

    //FUNCIONES

function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();


    function iniciarSesion(){
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }
}