<?php 

    require 'conexion.php';
    include_once 'sesion.php';

    $sql ="DELETE FROM usuarios WHERE Usuario = '$userkey'";
    $mysqli->query($sql);
    session_start();
    session_unset();
    session_destroy();
    header("location: index.php");
 
?>