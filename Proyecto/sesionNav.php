<?php
    session_start();
    require 'conexion.php';
    if(!isset($_SESSION['username'])){
        $userkey = "Invitado";
        $sesionButtons ='<a class="dropdown-item" href="index.php">Iniciar Sesion</a>';
        $userIcon='Imagenes/Header_Footer/user-icon.png';
        $buyButtons=' <button type="button" class="btn btn-primary btn-lg" id="btnLogCompra"> <a href="index.php" style="text-decoration:none; color:white" >Continuar</a></button>';
       
        // header("location: index.php");
    }else{


        $userkey = $_SESSION['username']; 

       $sql = "SELECT Foto FROM usuarios WHERE Usuario = '$userkey' LIMIT 1";
       $result = $mysqli->query($sql);
       
       $info = $result->fetch_assoc();
       $userIcon = $info['Foto'];
       
      
       $adminsql = "SELECT * FROM usuariosgeneral WHERE Usuario='$userkey' LIMIT 1";
       $resultadmin = $mysqli->query($adminsql);
       $infoadmin = $resultadmin->fetch_assoc();
       $usertype = $infoadmin['type'];
      
       if($usertype=='ADMIN'){
            $sesionButtons = '<a class="dropdown-item" href="EditarPerfil.php">Editar perfil</a>
            <a class="dropdown-item" href="Biblioteca.php">Mi biblioteca</a>
            <a class="dropdown-item" href="PHP/admin/modAdmin.php">Administrador</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="CerrarSesion.php">Cerrar sesi&oacute;n</a>' ;
    

       }else{

            $sesionButtons = '<a class="dropdown-item" href="EditarPerfil.php">Editar perfil</a>
            <a class="dropdown-item" href="Biblioteca.php">Mi biblioteca</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="CerrarSesion.php">Cerrar sesi&oacute;n</a>' ;
    
       }

       $buyButtons = '<button type="button" class="btn btn-secondary btn-lg" id="btnAgregarCarrito">A&ntilde;adir a mi carrito</button>
       <button type="button" class="btn btn-primary btn-lg" id="btnCompra">Comprar ahora</button>';
       
    }
    
?>