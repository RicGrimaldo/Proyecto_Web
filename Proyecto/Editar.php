<?php
    require 'conexion.php';
    session_start();
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
      
        $mysqli->set_charset('utf8');

        $pattern_nombre = '/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/';
        $pattern_password = '/^[0-9a-zA-Z_-]+$/';

        $nombre = $mysqli->real_escape_string($_POST['Nombre']);
        $password = $mysqli->real_escape_string($_POST['Passwrd']);
        $pass = password_hash($password,PASSWORD_DEFAULT);

        $userkey = $_SESSION['username'];

        if(preg_match($pattern_nombre,$nombre) && preg_match($pattern_password,$password)){

            $sql ="UPDATE usuarios SET Nombre = '$nombre', Password = '$pass' WHERE Usuario = '$userkey'";
            $resultado = mysqli_query($mysqli,$sql);
         

            if($resultado>0){   
                       
                $_SESSION['name'] = $nombre;
                header("location: index.php");   
               
            } else{
                echo'ERROR';
            }
                
        
        }else{
            echo 'INVALID';
        }
    }
?>