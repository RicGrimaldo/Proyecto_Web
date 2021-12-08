<?php
include_once 'sesionNav.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>MangaWeb</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="Imagenes/LogoPestana.png">
    <title>Document</title>
   
    <link rel="stylesheet" href="EstilosCSS/Estilos_header_footer.css">
    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="EstilosCSS/PrincipalCSS.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">    
    <script src="http://code.jquery.com/jquery-1.6.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="js/jquery.flexslider.js"></script>
    <script type="text/javascript" charset="utf-8">
        $(window).load(function () {
            $('.flexslider').flexslider({
                touch: true,
                pauseOnAction: false,
                pauseOnHover: false,
            });
        });
    </script>

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
                <a class="nav-link dropdown-toggle mr-3 mr-lg-0 active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="reglog.php">
                    <img src="<?php echo $userIcon?>" width="35px" height="35px" class="d-inline-block align-text-top rounded-circle" id="imagenPerfil" alt="">
                    <?php echo $userkey ?>
                </a>
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
                    <a class="nav-link active" href="home.php">Inicio</a>
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



    <!--Contenedor-->
    <div class="contenedor1">
        <div class="lateral1">
            <div class="imagen1">
                <img src="Imagenes/publicidad.jpg" alt="">
            </div>

            <div class="imagen2">
                <img src="Imagenes/publicidad3.jpg" alt="">
            </div>

            <div class="imagen3">
                <img src="Imagenes/publicidad2.jpg" alt="">
            </div>



        </div>

        <div class="contenedor2">

            <div class="contenedor3">

                <div class="flexslider">
                    <h1>Descubre</h1>
                    <ul class="slides" id="cards-slide">

                        <li id="slide">
                            <a href="compra.php" id="referencia_slide1">
                                <img src="Imagenes/20th Century Boys.jpg" alt="" id="img-slide1">
                            </a>
                            <div class="flex-caption" id="titulo-slide1">
                                <h1 id="titulo1">20th Century Boys</h1>
                            </div>
                            <div class="flex-caption-descripcion">
                                <p id="sinopsis-slide"> En esta historia conoceremos a Kenji, el encargado de una
                                    peque&ntilde;a tienda de conveniencia, quien se encarga de criar a Kanna, la beb&eacute; que
                                    su hermana dej&oacute; antes de desaparecer. Un d&iacute;a, Kenji encuentra en la calle un
                                    misterioso s&iacute;mbolo que cree conocer de alg&uacute;n lado, y que se relaciona con la
                                    organizaci&oacute;n secreta de un tal "Amigo". Mientras tanto, una ola de sangrientos
                                    cr&iacute;menes ocurre en Tokio. ¡Ayuda a Kenji a resolver este misterio!</p>
                            </div>

                        </li>
                        <li id="slide">
                            <a href="compra.php" id="referencia_slide2">
                                <img src="Imagenes/Nichijou.jpg" alt="" id="img-slide2">
                            </a>
                            <div class="flex-caption" id="titulo-slide2">
                                <h1 id="titulo2">Nichijou</h1>
                            </div>
                            <div class="flex-caption-descripcion">
                                <p id="sinopsis-slide">La serie sigue las vidas de un grupo de estudiantes y su escuela.
                                    Aparecen varios elementos absurdos, como una chica rob&oacute;tica creada por una
                                    cient&iacute;fica de 8 a&ntilde;os, un chico que conduce una cabra para ir al instituto con su
                                    mayordomo, una chica que puede conseguir armas de fuego de la nada, un gato que
                                    habla y un viejo director que es un luchador experto. A pesar de esto, los
                                    estudiantes siguen llevando vidas normales.

                                </p>
                            </div>

                        </li>


                        <li id="slide">
                            <a href="compra.php" id="referencia_slide3">
                                <img src="Imagenes/Spy x Family.jpg" alt="" id="img-slide3">
                            </a>
                            <div class="flex-caption" id="titulo-slide3">
                                <h1 id="titulo3">Spy x Family</h1>
                            </div>
                            <div class="flex-caption-descripcion">
                                <p id="sinopsis-slide">El hab&iacute;l esp&iacute;a Tasogare se dedicaba diariamente a cumplir
                                    misiones especiales por un mundo mejor. Un d&iacute;a recibe un complicado desafio... Su
                                    deber es crear una familia falsa y comenzar una nueva vida para poder cumplir la
                                    misi&oacute;n, &iquest;¡pero...!&quest; ¡¡Un Esp&iacute;a × Acci&oacute;n × Comedia de una familia peculiarl!

                                </p>
                            </div>

                        </li>

                        <li id="slide">
                            <a href="compra.php" id="referencia_slide4">
                                <img src="Imagenes/One Punch Man.jpg" alt="" id="img-slide4">
                            </a>
                            <div class="flex-caption" id="titulo-slide">
                                <h1 id="titulo4">One Punch Man</h1>
                            </div>
                            <div class="flex-caption-descripcion">
                                <p id="sinopsis-slide">¡Sigue la vida de un h&eacute;roe promedio que gana todas sus peleas con
                                    un solo pu&ntilde;o! Esto le causa un mont&oacute;n de frustraci&oacute;n, ahora ya no siente la
                                    adrenalina y la emoci&oacute;n de una dura pelea. Tal vez ese riguroso entrenamiento para
                                    volverse fuerte no vali&oacute; la pena. Despu&eacute;s de todo, &iquest;qu&eacute; tiene de bueno tener un
                                    poder tan aplastante&quest;


                                </p>
                            </div>

                        </li>




                    </ul>
                </div>


            </div>
            <!--
            <template id="template-card-slide">
                <li id="slide">
                    <a href="" id="referencia_slide">
                        <img src="" alt="" id="img-slide">
                    </a>
                    <div class="flex-caption">
                        <p id="titulo-slide"></p>
                    </div>
                    <div class="flex-caption-descripcion">
                        <p id="sinopsis-slide"> </p>
                    </div>
                </li>
            </template>
-->

            <div class="catalogo_productos" id="NuevosLanzamientos">
                <div class="title_catalogo">
                    <h1>Nuevos Lanzamientos</h1>
                </div>
                <div class="row" id="cards"></div>
                <!--Contiene la tarjetas de los status new-->
            </div>


            <template id="template-card">
                <a href="compra.php">
                    <div class="card" id="referencia">
                        <div class="imagen">
                            <img src="" id="imagen-card" class="imagen-catalogo">
                        </div>
                        <div class="card-body">
                            <div class="name" id="titulo-card">
                            </div>
                            <div class="precio" id="precio-card"></div>

                        </div>
                    </div>
                </a>
            </template>

        

            <div class="contenedor4">
                <div class="titulo">
                    <h1 id="tituloRecomendacion">Recomendaci&oacute;n del D&iacute;a</h1>
                </div>
                <div class="imagen">

                    <img src="Imagenes/Katekyo Hitman Reborn.jpg" alt="">

                </div>
                <div class="texto">
                    <div class="titulo" id="titulo_recom">
                        <h1 id="tt">Katekyo Hitman Reborn!</h1>
                    </div>

                    <div class="parrafo">
                        <p>Todos los compa&ntilde;eros de Tsuna lo consideran un perdedor: es malo en los estudios, en los
                            deportes
                            y con las mujeres… Lo que nadie sab&iacute;a es que &eacute;l es el heredero leg&iacute;timo del liderazgo de los
                            Vongola, una familia mafiosa. Reborn llega para entrenar a Tsuna para que pueda cumplir con
                            su
                            destino. Aunque Reborn parece un beb&eacute;, es un sicario de primer nivel que no dudar&aacute; en poner
                            en
                            peligro la vida de Tsuna para educarlo.</p>
                    </div>

                    <div class="button-div">
                        <a class="type3" id="boton_estilo" href="compra.php">  Ver Ahora </a>
                    </div>
                </div>


            </div>

        </div>


        <div class="lateral2">

            <div class="trending" style="width: 100%;">
                <div class="LoMasVisto">
                    <h2>Lo M&aacute;s Visto</h2>
                </div>
                <div class="contenido">
                    <ul class="list">

                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top1">One Piece</h4>
                            </a>
                        </li>

                        <li>
                            <a href="compra.php" id="topp" class="topp">
                                <h4 id="top2">Overlord</h4>
                            </a>
                        </li>

                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top3">Yojo Senki</h4>
                            </a>
                        </li>
                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top4">Kaiju NO 8</h4>
                            </a>
                        </li>
                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top5">High Score Girl</h4>
                            </a>
                        </li>
                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top6">Hatsukoi Zombie</h4>
                            </a>
                        </li>
                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top7">Dragon Ball</h4>
                            </a>
                        </li>

                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top8">Fire Force</h4>
                            </a>
                        </li>
                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top9">Houseki no kuni</h4>
                            </a>
                        </li>
                        <li>
                            <a href="compra.php" id="top">
                                <h4 id="top10">Another</h4>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

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



    <script src="MetodosJS/Principal_Scripts.js"></script>
    <script src="MetodosJS/MetodosBuscar.js"></script>
    <script src="MetodosJS/dark-mode-Header-Footer.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

</body>
</html>