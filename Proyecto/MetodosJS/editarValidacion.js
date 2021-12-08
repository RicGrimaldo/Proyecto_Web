document.getElementById('guardarCambios').addEventListener('click',function() {
        if(validar_edit()==true){
        var nombre = document.getElementById('nombreEd').value;
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
        });
    }
});

document.getElementById('guardarFoto').addEventListener('click',function() {
    var filename = (parseInt(Math.random()*(999999999999 - 100000000) + 100000000)).toString();       
    var file_data = $('#toUpload').prop('files')[0];    
    var form_data = new FormData();
    form_data.append("file",file_data);
    form_data.append("filename",filename);

    $.ajax({
        url: "Editar2.php",                      
                type: "POST",
                dataType: 'script',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
            success:function(dat2){
                if(dat2 === "\"ErrorTipoFoto\""){
                    Swal.fire({
            
                        text: 'DEBES INGRESAR UNA EXTENSION VALIDA (jpg, jpeg, png)',
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
        
                
            }
        });

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
      