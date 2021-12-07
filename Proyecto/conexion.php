<?php
$mysqli = new mysqli("localhost", "root", "", "db_mangaweb");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$conexion = mysqli_connect("localhost", "root", "", "db_mangaweb");
?>