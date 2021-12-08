<?php
include_once 'sesionNav.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UFT-8">
    <meta name="autor" content="mylo">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B&uacute;squeda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="EstilosCSS/busqueda-style.css" type="text/css" media="screen">
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <link rel="icon" type="image/png" href="Imagenes/LogoPestana.png">
    <link rel="stylesheet" href="EstilosCSS/Estilos_header_footer.css">
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossorigin="anonymous"
    />
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
                <a class="nav-link dropdown-toggle mr-3 mr-lg-0 active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="reglog.html">
                    <img src="<?php echo $userIcon?>" width="30px" class="d-inline-block align-top" alt="Avatar" style="border-radius:50px">
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
                        <a class="nav-link" href="contacto.php">Contacto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Carrito.php" id="carritoNav" ><img src="Imagenes/Header_Footer/carritob.png" class="d-inline-block align-top" alt="carrito" width="30px"></a>
                    </li>
                </ul>
            </div>
        </nav>

<div class="container">
    <h1 id="textoBusqueda">Se muestran resultados para... </h1>
    <hr>
    <div class="row" id="items"></div>

</div>

<template id="template-card">
    <div class="col-12 mb-2 col-md-4">
        <div class="card">
            <img src="" width="400" height="500" alt="" class="card-img-top">
        <div class="card-body">
            <h5>Titulo</h5>   
            <p>Precio</p>
            <a href="compra.php">
            <button class="btn btn-dark">Ver manga...</button>
            </a>
        </div>
        </div>
    </div>
</template>
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
    <script src="MetodosJS/metodosBusqueda.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="MetodosJS/dark-mode-Header-Footer.js"></script>
    <script src="MetodosJS/MetodosBuscar.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

</body>
</html>