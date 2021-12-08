<?php
include_once 'sesionNav.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Contacto</title>
        <meta name="author" content="Mylo"/>
        <link rel="icon" type="image/png" href="Imagenes/LogoPestana.png">
        <link rel="stylesheet" href="EstilosCSS/Estilos_header_footer.css">  
    <link rel="stylesheet" href="EstilosCSS/contacto-style.css" type="text/css" media="screen">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">    
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
                        <input class="form-control mr-sm-2" type="search" placeholder="Busca tus mangas favoritos" aria-label="Search" id="contenidoABuscar" required>
                        <a href="busqueda.php" class="btn btn-primary my-2 my-sm-0" type="submit" id="btnBuscar">Buscar</a>
                    </form>
                </ul>
                <ul class="navbar-nav flex-row mr-lg-0">
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle mr-3 mr-lg-0 active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="reglog.php">
                        <img src="<?php echo $userIcon?>" width="35px" height="35px" class="d-inline-block align-text-top rounded-circle" id="imagenPerfil" alt="">
                        <?php echo $userkey ?>
                    </a>
                    <div class="dropdown-menu dropdown-menu-left" aria-labelledby="navbarDropdown" style="background-color: #6a9eda;">
                    <?php echo $sesionButtons;?>
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
                    <?php echo $adultButton ?>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="contacto.php">Contacto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Carrito.php" id="carritoNav" ><img src="Imagenes/Header_Footer/carritob.png" class="d-inline-block align-top" alt="carrito" width="30px"></a>
                    </li>
                </ul>
            </div>
        </nav>

    <div class="contact_form">
        <div class="formulario">      
            <h1>Formulario de contacto</h1>
            <h3>Escr&iacute;benos y en breve nos pondremos en contacto contigo</h3>
            <form name="reg"class="formulario_contacto" method="POST" action="PHP/enviarMail.php" accept-charset="utf-8">       
                <p>
                    <label for="nombre" class="colocar_nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" placeholder="Escribe tu nombre" required>
                </p>
                <p>
                    <label for="email" class="colocar_email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Escribe tu Email" required>
                </p>   
                <p>
                    <label for="asunto" class="colocar_asunto">Asunto</label>
                    <input type="text" name="asunto" id="asunto" placeholder="Escribe un asunto" required>
                </p>    
                <p>
                    <label for="mensaje" class="colocar_mensaje">Mensaje</label>                     
                    <textarea name="mensaje" class="texto_mensaje" id="mensaje" required="obligatorio" placeholder="Deja aqu&iacute; tu comentario..."></textarea> 
                </p>                    
                <button type="submit" onclick="validacion()" class="buttonFormulario">Enviar</button>   
            </form>
        </div>  
    </div>    

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

    </body>
    <script src="MetodosJS/contacto-js.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <?php
    echo '<script>';
    $estadoMensaje = (isset($_REQUEST["msj"])) ? $_REQUEST["msj"] : "";

    echo 'var mensaje = \'\'; ';
    echo 'var estado = \'\';';

    if(hash_hmac('sha512','success', 'msjCifrado') === $estadoMensaje){
        echo "var mensaje = '¡Mensaje enviado! ¡Gracias por contactarnos!';";
        echo "var estado = 'success';";
    }
    else if (hash_hmac('sha512','warning', 'msjCifrado') === $estadoMensaje){
        echo "var mensaje = 'Lo siento, parece que hubo un error al enviar el mensaje.'";
        echo "var estado = 'warning';";
    }
        if(isset($estadoMensaje)){
            echo 'if(mensaje!= \'\' && estado!= \'\'){';
            echo 'Swal.fire({
                position: \'top-end\',
                icon: estado,
                title: mensaje,
                showConfirmButton: false,
                timer: 2500
            })}';
        }
        echo '</script>';
    ?>
    <script src="MetodosJS/dark-mode-Header-Footer.js"></script>
    <script src="MetodosJS/MetodosBuscar.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

</html>