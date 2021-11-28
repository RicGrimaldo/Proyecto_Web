<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $servidor = "localhost";
    $usuario = "root";
    $contrasena = "";
    $basedatos = "db_mangaweb_v2";

    $conexion = mysqli_connect($servidor, $usuario, $contrasena, $basedatos);
        if (!$conexion) {
            die("Fallo: " . mysqli_connect_error());
        }

    if($_POST['origen'] == 'carrito'){
        $sentenciaSQL = "SELECT ID_ComprasMangas, Usuario FROM usuarios WHERE Usuario='GrimaldoRic'";
        $resultado = mysqli_query($conexion, $sentenciaSQL);

        if ($resultado->num_rows > 0) {
            $datos = $resultado->fetch_assoc();
            echo $datos["ID_ComprasMangas"];
        } else {
            echo "0 resultados";
        }

    }
}
else echo 'Hubo un error extraño...';


?>