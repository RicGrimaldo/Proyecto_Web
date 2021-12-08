
var validar = function () {

  var nom = document.reg.nombre.value;

  var email = document.reg.email.value;

  var user = document.reg.user.value;

  var birth = document.reg.birth.value;

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

    if(birth == ""){
        document.reg.nombre.focus();
        Swal.fire({
            
            text: 'Escriba su fecha de nacimiento',
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

document.getElementById('loguear').addEventListener('click', function(){
    if(validacion_log()==true){
        
        var user = document.getElementById('userLog').value;
        var passwrd = document.getElementById('passwrdLog').value;

        var ruta = "User="+user+"&Passwrd="+passwrd;
        
        $.ajax({
            url:'loguea.php',
            type:'POST',
            data: ruta
        }).done(function(response) {
            if(response=="NO"){
                //  console.log("In");
                Swal.fire({
                    
                    text: 'Usuario o Contraseña son incorrectos',
                    target: '#custom-target',
                    
                    customClass: {
                        container: 'position-absolute'
                    },
                    toast: true,
                    position: 'bottom-right',
                    icon: 'warning',
                    confirmButtonColor: '#DE3E49'
                    
                })
               document.getElementById('userLog').value = "";
               document.getElementById('passwrdLog').value ="";
            }else{
                location.reload();
            }
            
        }).fail(function(){
            //  console.log("Error");

        }).always(function(){
           
        });
    }
})

document.getElementById('registrar').addEventListener('click',function() {
    if(validar()==true){
        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var user = document.getElementById('user').value;
        var birth = document.getElementById('birth').value;
        var passwrd = document.getElementById('passwrd').value;

        var ruta = "Nombre="+nombre+"&Email="+email+"&User="+user+"&Birth="+birth+"&Passwrd="+passwrd;

        $.ajax({
            url:'registra.php',
            type:'POST',
            data: ruta
        }).done(function(response) {
            if(response=='EMAIL'){
                Swal.fire({
            
                    text: 'Email ya registrado',
                    target: '#custom-target',
                    
                    customClass: {
                        container: 'position-absolute'
                    },
                    toast: true,
                    position: 'bottom-right',
                    icon: 'warning',
                    confirmButtonColor: '#DE3E49'
                    
                })
                document.getElementById('email').value = "";
                
            }else if(response=='USER'){
                Swal.fire({
            
                    text: 'El nombre de usuario ya existe',
                    target: '#custom-target',
                    
                    customClass: {
                        container: 'position-absolute'
                    },
                    toast: true,
                    position: 'bottom-right',
                    icon: 'warning',
                    confirmButtonColor: '#DE3E49'
                    
                })
                document.getElementById('user').value = "";
                
            }else if(response=='INVALID'){
                Swal.fire({
            
                    text: 'INGRESAR CARACTERES VALIDOS',
                    target: '#custom-target',
                    
                    customClass: {
                        container: 'position-absolute'
                    },
                    toast: true,
                    position: 'bottom-right',
                    icon: 'warning',
                    confirmButtonColor: '#DE3E49'
                    
                })
            }else{
                location.reload();
            }
            

        }).fail(function(){
            //  console.log("Error");

        }).always(function(){
            //  console.log("");
        });
    }
})
   

var validacion_log = function(){
  var user_login = document.loginn.userLog.value;
  var pass_login = document.loginn.passwrdLog.value;
  if(user_login == ""){
    document.loginn.userLog.focus();
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
     if(pass_login == ""){
      document.loginn.passwrdLog.focus();
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
 return true;
}