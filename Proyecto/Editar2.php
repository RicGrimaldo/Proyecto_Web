<?php 
    require 'conexion.php';
    include_once 'sesion.php';

    $filename = $_POST['filename'];

    $target_directory = "FotosPerfil/";
    $target_file = $target_directory.basename($_FILES["file"]["name"]);   
    $filetype = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $newfilename = $target_directory.$filename.".".$filetype;
    $allowedfileExtensions = array('jpg', 'jpeg', 'png');
    if (in_array($filetype, $allowedfileExtensions)) {
        if(move_uploaded_file($_FILES["file"]["tmp_name"],$newfilename)){
        
            $foto = $newfilename;    
    
            $sql ="UPDATE usuarios SET Foto = '$foto' WHERE Usuario = '$userkey'";
            
            $resultado = mysqli_query($mysqli,$sql);
        
            if($resultado>0){   
                    
                $_SESSION['photo'] = $foto;
                
            } else{
                echo 'Error';
            }
        
        } 
    }
    else echo json_encode('ErrorTipoFoto');

    
 
?>