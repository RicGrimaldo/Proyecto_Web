<?php 
    require 'conexion.php';
    session_start();


    if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
      
        $mysqli->set_charset('utf8');

        $pattern_nombre = '/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/';
        $pattern_email = '/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/i';
        $pattern_usuario = '/^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ_-]+$/';
        $pattern_password = '/^[0-9a-zA-Z_-]+$/';

        $nombre = $mysqli->real_escape_string($_POST['Nombre']);
        $email = $mysqli->real_escape_string($_POST['Email']);
        $user = $mysqli->real_escape_string($_POST['User']);
        $birth = $mysqli->real_escape_string($_POST['Birth']);
        $password = $mysqli->real_escape_string($_POST['Passwrd']);
        $tipo = 0;
        $foto ='Imagenes/Header_Footer/user-icon.png';
        $arreglo = array();
        $array_texto = json_encode($arreglo);

        if(preg_match($pattern_nombre,$nombre) && preg_match($pattern_email,$email) && preg_match($pattern_usuario,$user) && preg_match($pattern_password,$password)){

            $sqlUser = "SELECT COUNT(*) AS contarUser FROM usuarios WHERE Usuario = ? ";
            $sqlEmail = "SELECT COUNT(*) AS contarEmail FROM usuarios WHERE Correo = ? ";     
        
            if( ($consultaUser = $mysqli->prepare($sqlUser)) && ($consultaEmail = $mysqli->prepare($sqlEmail)) ){
                $consultaUser->bind_param('s',$user);
                $consultaUser->execute();         
                $resultadoUser = $consultaUser->get_result();

                $consultaEmail->bind_param('s',$email);
                $consultaEmail->execute();         
                $resultadoEmail = $consultaEmail->get_result();

                $datosUser = $resultadoUser->fetch_assoc();
                $datosEmail = $resultadoEmail->fetch_assoc();

                $pass = password_hash($password,PASSWORD_DEFAULT);

                if($datosUser['contarUser']>0 ){
                    echo 'USER';
                }else if($datosEmail['contarEmail']>0){
                    echo 'EMAIL';
                }else{
                    $sql ="INSERT INTO usuarios(Usuario, Nombre, Correo, Password, FNacimiento, Foto, ID_tipo_usuario, ID_Biblioteca, ID_ComprasMangas)
                    VALUES ('$user', '$nombre', '$email','$pass','$birth','$foto' ,'$tipo','$array_texto','$array_texto')";
                    $resultado = $mysqli->query($sql);
                    if($resultado>0){            
                        $_SESSION['username'] = $user;
                        $_SESSION['userEmail'] = $email;
                        $_SESSION['name'] = $nombre;
                        $_SESSION['photo'] = $foto;
                        $_SESSION['birth'] = $birth;
                        $_SESSION['userType'] = $tipo;
                        header("location: home.php");
                    } else{
                        echo'ERROR';
                    }
                }
            }
        }else{
            echo 'INVALID';
        }

        
/*
        $sqlUser = "SELECT COUNT(*) AS contarUser FROM usuarios WHERE Usuario = '$user' ";
        $sqlEmail = "SELECT COUNT(*) AS contarEmail FROM usuarios WHERE Correo = '$email' ";     
        $consultaUser = mysqli_query($mysqli,$sqlUser);
        $consultaEmail = mysqli_query($mysqli,$sqlEmail);
        $arrayUser = mysqli_fetch_array($consultaUser);
        $arrayEmail = mysqli_fetch_array($consultaEmail);
         $sql ="INSERT INTO usuarios(Usuario, Nombre, Correo, Password, FNacimiento, Foto, ID_tipo_usuario, ID_Biblioteca, ID_ComprasMangas)
                    VALUES ('$user', '$nombre', '$email','$pass','$birth','$foto' ,'$tipo','$array_texto','$array_texto')";
                    
                    $stmt = $mysqli->prepare($sql);
                    $stmt->bind_param("Usuario",$user, PDO::PARAM_STR);
                    $stmt->bind_param("Nombre",$nombre, PDO::PARAM_STR);
                    $stmt->bind_param("Correo",$email, PDO::PARAM_STR);
                    $stmt->bind_param("Password",$pass, PDO::PARAM_STR);
                    $stmt->bind_param("Fnacimiento",$birth, PDO::PARAM_STR);
                    $stmt->bind_param("Foto",$foto, PDO::PARAM_STR);
                    $stmt->bind_param("ID_tipo_usuario",$tipo, PDO::PARAM_STR);
                    $stmt->bind_param("ID_Biblioteca",$array_texto, PDO::PARAM_STR);
                    $stmt->bind_param("ID_ComprasMangas",$array_texto, PDO::PARAM_STR);

                    $stmt->execute();            
                        $_SESSION['username'] = $user;
                        $_SESSION['photo'] = $foto;
                        $_SESSION['birth'] = $birth;
                        $_SESSION['userType'] = $tipo;
                        header("location: home.php");
*/
        
        
    }
?>