<?php
require("db.php");
require("sesionadmin.php");
$usuario='';
$nombre = '';
$correo= '';
$fNacimiento='';
$foto='';

if  (isset($_GET['ID'])) {
    $id = $_GET['ID'];
    $query = "SELECT * FROM usuarios WHERE ID=$id";
    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_array($result);
        $usuario = $row['Usuario'];
        $nombre = $row['Nombre'];
        $correo = $row['Correo'];
        $fNacimiento = $row['FNacimiento'];
        $foto = $row['Foto'];
        $foto = "../../".$foto;
    }
}

if (isset($_POST['update'])) {
    $id = $_GET['ID'];
    $Usuario= $_POST['usuario'];
    $Nombre= $_POST['nombre'];
    $Correo = $_POST['correo'];
    $FNacimiento = $_POST['fNacimiento'];
    $query = "UPDATE usuarios set Usuario = '$Usuario',Nombre = '$Nombre', Correo = '$Correo',FNacimiento='$FNacimiento' WHERE ID=$id";
    mysqli_query($conn, $query);
    $_SESSION['message'] = 'Usuario Actualizado';
    $_SESSION['message_type'] = 'warning';
    header('Location: modAdmin.php');
}

?>
<?php include('includes/header.php'); ?>
    <div class="container p-4">
        <div class="row">
            <div class="col-md-4 mx-auto">
                <div class="card card-body">
                    <form action="edit.php?ID=<?php echo $_GET['ID']; ?>" method='POST'>
                    <div class="form-group">
                            <input name="usuario" type="text" class="form-control" value="<?php echo $usuario; ?>" placeholder="Update Usuario">
                        </div>
                        <div class="form-group">
                            <input name="nombre" type="text" class="form-control" value="<?php echo $nombre; ?>" placeholder="Update Title">
                        </div>
                        <div class="form-group">
                            <input name="correo" type="text" class="form-control" value="<?php echo $correo; ?>" placeholder="Update Correo">
                        </div>                       
                        <div class="form-group">
                            <input name="fNacimiento" type="date" class="form-control" value="<?php echo $fNacimiento; ?>" placeholder="Update FNacimiento"> 
                        </div>
                        <div class="form-group" style="text-align: center;">
                            <img src="<?php echo $foto?>" width="100px" alt="Avatar" style="border-radius:50%;" >
                        </div>
                        <button class="btn btn-success btn-lg" name="update">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
<?php include('includes/footer.php'); ?>