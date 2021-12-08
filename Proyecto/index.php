<?php
    session_start();
    if(isset($_SESSION['username'])){
        header("location: home.php");
    }
?>
<!DOCTYPE html>
<html>

<head>
    <title>Iniciar sesi&oacute;n</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="Imagenes/LogoPestana.png">
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="EstilosCSS/registro-estilos.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">    
    <link rel="stylesheet" href="EstilosCSS/Estilos_header_footer.css">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light py-md-2" id="cabeceraPrincipal">
        <a class="navbar-brand" href="home.php">
            <img src="Imagenes/Header_Footer/logo.png" width="100px" class="d-inline-block align-top" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">               
            <ul class="navbar-nav mr-auto justify-content-center">
                <form class="form-inline"> 
                <input class="form-control mr-sm-2" type="search" placeholder="Busca tus mangas favoritos" aria-label="Search" id="contenidoABuscar" required autocomplete="off">
                    <a href="busqueda.php" class="btn btn-primary my-2 my-sm-0" type="submit" id="btnBuscar">Buscar</a>
                </form>
            </ul>
            <ul class="navbar-nav flex-row mr-lg-0">
                <li class="nav-item dropdown">
                    
                <div class="dropdown-menu dropdown-menu-left" aria-labelledby="navbarDropdown" style="background-color: #6a9eda;">
                <?php echo $sesionButtons; ?>
                </div>
                </li>
            </ul>
            </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-light" id="opcionesMenus">
        <button class="darkModeSwitch" id="switchb">
            <span><i class="fa fa-sun-o"></i></span>   
            <span><i class="fa fa-moon-o"></i></span>
        </button>
        
            <div class="collapse navbar-collapse justify-content-center order-2" id="navbarSupportedContent">
                
                <ul class="navbar-nav justify-content-center nav-pills nav-fill">
                    <!-- <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li> -->
                    <li class="nav-item">
                    <a class="nav-link" href="home.php">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Categorias_Main.php">Categor&iacuteas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="home.php#NuevosLanzamientos">&Uacuteltimos</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="Adult_Main.php">+18</a> 
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contacto.php">Contacto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Carrito.php" id="carritoNav" ><img src="Imagenes/Header_Footer/carritob.png" class="d-inline-block align-top" alt="carrito" width="30px"></a>
                    </li>
                </ul>
            </div>
        </nav>

<main>

<div class="contenedor__todo">
        <div class="caja__trasera">
            <div class="caja__trasera-login">
                <h3>&iquest;Ya tienes una cuenta de MangaWeb&quest;</h3>
                <p>Inicia sesi&oacute;n para entrar a MangaWeb</p>
                <button id="btn__iniciar-sesion">Iniciar Sesi&oacute;n</button>
            </div>
            <div class="caja__trasera-register">
                <h3>&iquest;A&uacute;n no tienes una cuenta de MangaWeb&quest;</h3>
                <p>Reg&iacute;strate para que puedas iniciar sesi&oacute;n</p>
                <button id="btn__registrarse">Registrarse</button>
            </div>
        </div>

        <!--Formulario de Login y registro-->
        <div class="contenedor__login-register">
            <form name="loginn"  class="formulario__login" autocomplete="off">
                <h2>Iniciar Sesi&oacute;n</h2>
                <input type="text" id = "userLog" name="userLog" class="ph-user" placeholder="      Usuario"  autofocus required>
                <input type="password" id="passwrdLog" name="passwrdLog" class="ph-pass" placeholder="      Contrase&ntilde;a"  required>
                <button id="loguear" name="loguear" type="button">Entrar</button>
            </form>

            <form id="registerID" name="reg" class="formulario__register"  autocomplete="off">
                <h2>Reg&iacute;strarse</h2>
                <input type="text" id= "nombre" name="nombre" class="ph-user" placeholder="      Nombre completo" required>
                <input type="text" id="email" name="email" class="ph-email" placeholder="      Correo Electronico" required>
                <input type="text" id="user" name="user" class="ph-user" placeholder="      Usuario" required>
                <input type="date" id="birth" name="birth" min="1900-01-01" max="2020-01-01" class="" placeholder="      Fecha de nacimiento" required>
                <input type="password" id="passwrd" name="passwrd" class="ph-pass" placeholder="      Contrase&ntilde;a" required >
                <input type="password"  name="conpasswrd" class="ph-pass" placeholder="     Confirmar Contrase&ntilde;a" required>

                <button id="registrar" name="registrar" type="button">Registrarse</button>
            </form>
            
        </div>
    </div>

</main>

<footer class="footer">
        <div id="menu">
            <h4><a>Menu</a></h4> <br>
            <a href="home.php">Inicio</a> <br>
            <a href="Categorias_Main.php">Categor&iacute;as</a> <br>
            <a href="home.php#NuevosLanzamientos">Ultimas</a> <br>
            <a href="Adult_Main.php">+18</a> <br>
        </div>
        <div id="cliente">
            <h4>Atenci&oacute;n al Cliente</h4> <br>
            &iquest;Tienes dudas&quest; <br>
            D&eacute;janos ayudarte, <br>
            <a href="contacto.php">haz clic aqu&iacute;.</a>
        
        </div>
        <div id="nosotros">
            <h4><a>Acerca de Nosotros</a></h4> <br>
            Somos la editorial oficial <br>
            <i>Manga Web</i> para <br>
            mangas alrededor del <br>
            mundo.
        
        </div>
        <div id="redes">
            <h4>Redes Sociales</h4> <br>
            <a href="#">Facebook</a> <br>
            <a href="#">Twitter</a> <br>
            <a href="#">Instagram</a> <br>
            <a href="#"><img src="Imagenes/Header_Footer/facebook_icon.png" alt="facebook_icon"></a>
            <a href="#"><img src="Imagenes/Header_Footer/twitter_icon.png" alt="twitter_icon"></a>
            <a href="#"><img src="Imagenes/Header_Footer/instagram-icon.png" alt="instagram-icon"></a>
        </div>
        
        
    </footer>

    <script src="MetodosJS/dark-mode-Header-Footer.js"></script>
    <script src="MetodosJS/Metodoslogin-registro.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/jquery.min.js" ></script>
    <script src="MetodosJS/validacion.registro.js"></script>

</body>
    </html>