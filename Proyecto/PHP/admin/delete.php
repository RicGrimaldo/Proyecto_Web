<?php

require("db.php");
require("sesionadmin.php");

if(isset($_GET['ID'])) {
  $ID = $_GET['ID'];
  //Mensaje de confirmacion de eliminacion por ver!!!!!!!!
  $query = "DELETE FROM usuarios WHERE ID = $ID";
  $result = mysqli_query($conn, $query);
  if(!$result) {
    die("Query Failed.");
  }

  $_SESSION['message'] = 'Usuario Eliminado Correctamente';
  $_SESSION['message_type'] = 'danger';
  header('Location: modAdmin.php');
}

?>
