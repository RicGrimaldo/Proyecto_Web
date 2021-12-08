<?php
require("../sesion.php");
	if ($_SERVER["REQUEST_METHOD"] == "POST"){

	//	Métodos de carrito
    if($_POST['destino'] == 'carrito'){

		//	Para guardar un id
		if($_POST['accion'] == 'guardar'){
			$id = $_POST['id_manga'];
			header("content-type: application/json");
			$sentenciaSQL = "SELECT ID_ComprasMangas, Usuario FROM usuarios WHERE Usuario='$userkey'";
			$resultado = mysqli_query($conexion, $sentenciaSQL);
			if ($resultado->num_rows > 0) {
				$datos = $resultado->fetch_assoc();
				$nuevoArreglo = json_decode($datos["ID_ComprasMangas"]);
				$nuevoArreglo[] = $id;
				$array_texto = json_encode($nuevoArreglo);
				$sql = "UPDATE usuarios SET ID_ComprasMangas='$array_texto' WHERE Usuario='$userkey'";
				$resultado = mysqli_query($conexion, $sql);
				echo $array_texto;
			}
		}

		//	Para remover un id en específico
		if($_POST['accion'] == 'remover'){
			$id = $_POST['id_manga'];
			header("content-type: application/json");
			$sentenciaSQL = "SELECT ID_ComprasMangas, Usuario FROM usuarios WHERE Usuario='$userkey'";
			$resultado = mysqli_query($conexion, $sentenciaSQL);
			if ($resultado->num_rows > 0) {
				$datos = $resultado->fetch_assoc();
				$nuevoArreglo = json_decode($datos["ID_ComprasMangas"]);
				if(($clave = array_search($id, $nuevoArreglo)) != false){
					unset($nuevoArreglo[$clave]);
					$array_texto = json_encode($nuevoArreglo);
					$sql = "UPDATE usuarios SET ID_ComprasMangas='$array_texto' WHERE Usuario='$userkey'";
					$resultado = mysqli_query($conexion, $sql);
					echo $array_texto;
				}
			}
		}

		//	Para remover una lista de IDS
		if($_POST['accion'] == 'removerLista'){
			$ids = json_decode($_POST['arregloIDS']);
			header("content-type: application/json");
			foreach($ids as $idManga){
				$sentenciaSQL = "SELECT ID_ComprasMangas, Usuario FROM usuarios WHERE Usuario='$userkey'";
				$resultado = mysqli_query($conexion, $sentenciaSQL);
				if ($resultado->num_rows > 0) {
					$datos = $resultado->fetch_assoc();
					$nuevoArreglo = json_decode($datos["ID_ComprasMangas"]);
					if((in_array($idManga, $nuevoArreglo)) != false){
						$clave = array_search($idManga, $nuevoArreglo);
						unset($nuevoArreglo[$clave]);
						$nuevoArreglo = array_values($nuevoArreglo);
						$array_texto = json_encode($nuevoArreglo);
						$sql = "UPDATE usuarios SET ID_ComprasMangas='$array_texto' WHERE Usuario='$userkey'";
						$resultado = mysqli_query($conexion, $sql);
						echo $array_texto;
					}
				}
			}
		}

		if($_POST['accion'] == 'vaciarCarrito'){
			header("content-type: application/json");
			$sql = "UPDATE usuarios SET ID_ComprasMangas='[]' WHERE Usuario='$userkey'";
			$resultado = mysqli_query($conexion, $sql);
			echo '[]';
		}

    }
    
	//	Métodos de biblioteca
	if($_POST['destino'] == 'biblioteca'){

		//	Para guardar un id 
		if($_POST['accion'] == 'guardar'){
			$id = $_POST['id_manga'];
			header("content-type: application/json");
			$sentenciaSQL = "SELECT ID_Biblioteca, Usuario FROM usuarios WHERE Usuario='$userkey'";
			$resultado = mysqli_query($conexion, $sentenciaSQL);
			if ($resultado->num_rows > 0) {
				$datos = $resultado->fetch_assoc();
				$nuevoArreglo = json_decode($datos["ID_Biblioteca"]);
				$nuevoArreglo[] = $id;
				$array_texto = json_encode($nuevoArreglo);
				$sql = "UPDATE usuarios SET ID_Biblioteca='$array_texto' WHERE Usuario='$userkey'";
				$resultado = mysqli_query($conexion, $sql);
				echo $array_texto;
			}
		}

		//	Para guardar una lista de ids
		if($_POST['accion'] == 'guardarLista'){
		$ids = json_decode($_POST['arregloIDS']);
		$sentenciaSQL = "SELECT ID_Biblioteca, Usuario FROM usuarios WHERE Usuario='$userkey'";
		$resultado = mysqli_query($conexion, $sentenciaSQL);
			if ($resultado->num_rows > 0) {
				$datos = $resultado->fetch_assoc();
				$nuevoArreglo = json_decode($datos["ID_Biblioteca"]);
				$nuevoArreglo = array_merge($nuevoArreglo, $ids);
				$nuevoArreglo = array_values($nuevoArreglo);
				$array_texto = json_encode($nuevoArreglo);
				$sql = "UPDATE usuarios SET ID_Biblioteca='$array_texto' WHERE Usuario='$userkey'";
				$resultado = mysqli_query($conexion, $sql);
				echo $array_texto;
			}

		}

    }
}

?>