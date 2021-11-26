<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST"){
	$servidor = "localhost";
	$usuario = "root";
	$contrasena = "";
	$basedatos = "db_mangaweb_v2";

	$conexion = mysqli_connect($servidor, $usuario, $contrasena, $basedatos);
		if (!$conexion) {
			die("Fallo: " . mysqli_connect_error());
		}
        else echo 'Conexion exitosa';

	// $arreglo = array();
	// $array_texto = json_encode($arreglo);

	// $sentenciaSQL = "INSERT INTO usuario (Usuario, ArregloPrueba) VALUES ('Grimaldo', '$array_texto')";

	// echo mysqli_query($conexion, $sentenciaSQL);

    if($_POST['destino'] == 'carrito'){

        $id = $_POST['id_manga'];
        header("content-type: application/json");
        $sentenciaSQL = "SELECT ID_ComprasMangas, Usuario FROM usuarios WHERE Usuario='GrimaldoRic'";
        $resultado = mysqli_query($conexion, $sentenciaSQL);
        if ($resultado->num_rows > 0) {
            $datos = $resultado->fetch_assoc();
            $nuevoArreglo = json_decode($datos["ID_ComprasMangas"]);
            $nuevoArreglo[] = $id;
            $array_texto = json_encode($nuevoArreglo);
            $sql = "UPDATE usuarios SET ID_ComprasMangas='$array_texto' WHERE Usuario='GrimaldoRic'";
            echo mysqli_query($conexion, $sql);
        }

        // echo json_encode($data);
    }
    else echo 'Un error';

	// $sentenciaSQL = "SELECT ArregloPrueba, Usuario FROM usuario WHERE Usuario='GrimaldoRic'";

	// $resultado = mysqli_query($conexion, $sentenciaSQL);
	// if ($resultado->num_rows > 0) {
	// 	$datos = $resultado->fetch_assoc();
	// 	$nuevoArreglo = json_decode($datos["ArregloPrueba"]);
	// 	// $resul = "";
	// 	// $i = 1;
	// 	// for ($i = 1; $i <= 10; $i++) {
	// 	// 	if(isset($nuevoArreglo[$i])){
	// 	// 		if($i == $nuevoArreglo[$i])
	// 	// 			$resul .= $valor . " , ";
	// 	// 		else $resul .= " * ";
	// 	// 	}
	// 	// }
	// 	// echo $resul;
	// 	$nuevoArreglo[] = "10";
	// 	$array_texto = json_encode($nuevoArreglo);
	// 	$sql = "UPDATE usuario SET ArregloPrueba='$array_texto' WHERE Usuario='Grimaldo'";
	// 	echo mysqli_query($conexion, $sql);
	// } else {
	// 	echo "0 resultados";
	// }
}
else echo 'Hubo un error extraño...';


?>