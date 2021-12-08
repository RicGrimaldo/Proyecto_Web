btnEliminarCuenta = document.getElementById('btnEliminarCuenta');

btnEliminarCuenta.addEventListener('click', function(){
    Swal.fire({
        title: '¿Estás seguro de querer eliminar tu cuenta?',
        text: "¡Esta acción no es reversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#419641',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Confirmar',
        iconColor: '#eaec41'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarCuenta();
        }
    })
})

const eliminarCuenta = function(accion){
    $.ajax({
        url : "delete.php",
        type: "POST",
        async: true,
        beforeSend: function(){

        },
        success: function(response){
            setTimeout( function() { 
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cuenta Eliminada',
                    showConfirmButton: false,
                    timer: 1500
                })
            }, 1500 );
            setTimeout( function() { window.location.href='index.php'; }, 2500 ); 
        },
        error: function(error){
            //  console.log(error);
        }
    })
}
