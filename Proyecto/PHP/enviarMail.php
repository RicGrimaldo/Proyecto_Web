<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer;
$mail->isSMTP(true);
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = '';                               //  Poner correo de gmail desde donde se enviará el correo
    $mail->Password = '';                               //  Poner la contraseña de ese correo
    $mail->setFrom('');                                 //  Poner correo de gmail desde donde se enviará el correo
    $mail->addAddress('mangawebcontacto@gmail.com', 'Manga Web');   //  Tu correo se enviará a nuestro correo de nuestra página

    $nombreF = htmlentities($_REQUEST["nombre"], ENT_QUOTES);
    $correoF = htmlentities($_REQUEST["email"], ENT_QUOTES);
    $mensajeF = htmlentities($_REQUEST["mensaje"], ENT_QUOTES);
    $asuntoF = htmlentities($_REQUEST["asunto"], ENT_QUOTES);

    //Evitar cross scripting - eliminar etiquetas HTML
    $nombreF = strip_tags($nombreF);
    $correoF = strip_tags($correoF);
    $mensajeF = strip_tags($mensajeF);
    $asuntoF = strip_tags($asuntoF);

    $nombreF = utf8_encode($nombreF);
    $correoF = utf8_encode($correoF);
    $mensajeF = utf8_encode($mensajeF);
    $asuntoF = utf8_encode($asuntoF);


    if ($mail->addReplyTo($_POST['email'], $_POST['nombre'])) {
        $mail->Subject = 'Correo de dudas de '.$nombreF. ' - '.$asuntoF;
        $mail->isHTML(true);
        $mail->Body = "
        <!doctype html>
        <html lang='es'>
        <head>
        <title>EMAIL</title>
        </head>
            <body style='background:linear-gradient(#88a7d0af,#CAECF1); border-top: 4px solid #3b638f;'>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <div style='width: 80%; margin:0 auto; color: #34495e; text-align: center;font-family: sans-serif'>
                    <figure>
  <blockquote>
    <p style='font-size: 20px;'>".$mensajeF."</p>
  </blockquote>
  <figcaption style='font-size: 15px;'>
  &mdash;Enviado desde: <cite title=\"".$correoF."\">".$correoF."</cite>
  </figcaption>
</figure>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
            </body>
        </html>
        "; 
        if (!$mail->send()) {
            $estadoEcriptado = hash_hmac('sha512','warning', 'msjCifrado');
            header("location: ../contacto.php?msj=$estadoEncriptado'");
        } else {
            $estadoEcriptado = hash_hmac('sha512','success', 'msjCifrado');
            header("location: ../contacto.php?msj=$estadoEcriptado");
        }
    }

?>