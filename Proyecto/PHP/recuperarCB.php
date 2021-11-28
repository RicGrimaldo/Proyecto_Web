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

    //  Método para recuperar los IDs de los mangas de carrito
    //  Nota: Falta modificar para que recupere nombre de sesión de usuario
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

    //  Método para recuperar los IDs de los mangas de biblioteca
    //  Nota: Falta modificar para que recupere nombre de sesión de usuario
    if($_POST['origen'] == 'biblioteca'){
        $sentenciaSQL = "SELECT ID_Biblioteca, Usuario FROM usuarios WHERE Usuario='GrimaldoRic'";
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