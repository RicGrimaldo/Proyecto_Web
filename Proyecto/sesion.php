<?php
    session_start();
    require 'conexion.php';
    if(!isset($_SESSION['username'])){
        header("location: index.php");
    }else{


       $userkey = $_SESSION['username']; 
       $userIcon = $_SESSION['photo'];
       $userPermissions = $_SESSION['userType'];
       $username = $_SESSION['name'];
       $userEmail = $_SESSION['userEmail'];
       $userBirth = $_SESSION['birth'];

       $userDate = date_create($_SESSION['birth']);
      
       $currenDate = date_create(date("Y-m-d"));
       $interval = date_diff($currenDate,$userDate);

       $tiempo=array();

       foreach($interval as $valor){
           $tiempo[]=$valor;
       }

       if($tiempo[0]>17){
            $adultButton = '<a class="nav-link" href="Adult_Main.php">+18</a>';

       }else{
            $adultButton=  '<a id="adultID" class="nav-link disabled"  href="#">+18</a>';
       }
       
        if($userPermissions==1){
            $sesionButtons = '<a class="dropdown-item" href="EditarPerfil.php">Editar perfil</a>
            <a class="dropdown-item" href="Biblioteca.php">Mi biblioteca</a>
            <div class="dropdown-divider"></div>
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