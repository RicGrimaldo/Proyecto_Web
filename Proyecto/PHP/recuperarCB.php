<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $mysqli = new mysqli("localhost", "root", "", "db_mangaweb");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$conexion = mysqli_connect("localhost", "root", "", "db_mangaweb");

    //  Método para recuperar los IDs de los mangas de carrito
    //  Nota: Falta modificar para que recupere nombre de sesión de usuario
    if($_POST['origen'] == 'carrito'){
        $sentenciaSQL = "SELECT ID_ComprasMangas, Usuario FROM usuarios WHERE Usuario='XDave'";
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
        $sentenciaSQL = "SELECT ID_Biblioteca, Usuario FROM usuarios WHERE Usuario='XDaveoRic'";
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