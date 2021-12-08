<?php
        require 'conexion.php';
        session_start();
        
    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
       
        $mysqli->set_charset('utf8');
        
        $user = $mysqli->real_escape_string($_POST['User']);
        $password = $mysqli->real_escape_string($_POST['Passwrd']);

        $sql ="SELECT * FROM usuarios WHERE Usuario = ? LIMIT 1";

        if($consulta = $mysqli->prepare($sql)){
            $consulta->bind_param('s',$user);
            $consulta->execute();         
            $resultado = $consulta->get_result();
            $datos = $resultado->fetch_assoc();
             
            if(($resultado->num_rows == 1)&&(password_verify($password,$datos['Password']))){   
                $_SESSION['username'] = $datos['Usuario'];
                $_SESSION['userEmail'] = $datos['Correo'];
                $_SESSION['name'] = $datos['Nombre'];
                $_SESSION['photo'] = $datos['Foto'];
                $_SESSION['birth'] = $datos['FNacimiento'];
                $_SESSION['userType'] = $datos['ID_tipo_usuario'];
                header("location: home.php");
            }else{
                echo "NO";
            }
        } 
        //$consulta->close();
    }
    //$mysqli->close();
    
?>