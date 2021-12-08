<?php
require("../sesion.php");
if ($_SERVER["REQUEST_METHOD"] == "POST"){

    //  Método para recuperar los IDs de los mangas de carrito
    //  Nota: Falta modificar para que recupere nombre de sesión de usuario
    if($_POST['origen'] == 'carrito'){
        $sentenciaSQL = "CALL GetCarrito('$userkey')";
        $resultado = mysqli_query($conexion, $sentenciaSQL);

        if ($resultado->num_rows > 0) {
            $datos = $resultado->fetch_assoc();
            echo $datos["ID_ComprasMangas"];
        } else {
            echo "0 resultados";
        }

    }

    //  Método para recuperar los IDs de los mangas de biblioteca
    //  Nota: Falta modificar para que recupere nombre de sesión de usuario
    if($_POST['origen'] == 'biblioteca'){
        $sentenciaSQL = "CALL GetBiblioteca('$userkey')";
        $resultado = mysqli_query($conexion, $sentenciaSQL);
        if ($resultado->num_rows > 0) {
            $datos = $resultado->fetch_assoc();
            echo $datos["ID_Biblioteca"];
        } else {
            echo "0 resultados";
        }

    }
}
?>