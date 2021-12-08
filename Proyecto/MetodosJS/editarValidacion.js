document.getElementById('guardarCambios').addEventListener('click',function() {
        if(validar_edit()==true){
        var nombre = document.getElementById('nombreEd').value;
        //var user = document.getElementById('userEd').value;
        var passwrd = document.getElementById('passwrdEd').value;

        var ruta = "Nombre="+nombre+"&Passwrd="+passwrd;

        $.ajax({
            url:'Editar.php',
            type:'POST',
            data: ruta
        }).done(function(response) {

            if(response=='INVALID'){
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
                setTimeout( function() { 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Datos actualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }, 1500 );
                setTimeout( function() { window.location.href='EditarPerfil.php'; }, 4500 );  
            }
            
        }).fail(function(){
            console.log("Error");

        }).always(function(){
            console.log("");
        });
    }
});


var validar_edit = function(){
   var pass_edit = document.editor.passwrdEd.value;
   var name_edit = document.editor.nombreEd.value;
   if( name_edit == ""){
     
     Swal.fire({
         text: 'No puede haber campos vacios',
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
      if(pass_edit == ""){
      
       Swal.fire({
           text: 'Verifica o cambia tu contraseña',
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
      