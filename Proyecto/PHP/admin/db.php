<?php
session_start();

$conn = mysqli_connect(
  'localhost',
  'root',
  '',
  'db_mangaweb'
) or die(mysqli_error($mysqli));

?>
