<?php 

require("db.php");
require("sesionadmin.php");


if(isset($_GET['ID'])) {
    $ID = $_GET['ID'];
   
  $admin=1;
    $query = "UPDATE usuarios set ID_tipo_usuario = '$admin' WHERE ID=$ID";
    mysqli_query($conn, $query);
    $_SESSION['message'] = 'Usuario Actualizado';
    $_SESSION['message_type'] = 'warning';



    header('Location: modAdmin.php');
  }
  



?>