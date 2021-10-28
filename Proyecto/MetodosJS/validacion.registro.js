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