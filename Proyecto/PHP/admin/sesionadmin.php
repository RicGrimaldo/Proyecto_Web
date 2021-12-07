<?php
    require ("../../conexion.php");
    $userkey = $_SESSION['username']; 

    $adminsql = "SELECT * FROM usuariosgeneral WHERE Usuario='$userkey' LIMIT 1";
       $resultadmin = $mysqli->query($adminsql);
       $infoadmin = $resultadmin->fetch_assoc();
       $usertype = $infoadmin['type'];
      
       

    if(!isset($_SESSION['username'])){
        header("location: ../../home.php");
    }if($usertype=='CLIENTE'){
        header("location: ../../home.php");
        $userkey = $_SESSION['username'];
        
        $sql = "SELECT Foto FROM usuarios WHERE Usuario = '$userkey' LIMIT 1";
        $result = $mysqli->query($sql);
       
        $info = $result->fetch_assoc();
        $userIcon = $info['Foto'];
    }else{
        
       
    }
    
?>