<?php
require("db.php");
require("sesionadmin.php");
?>
<?php include('includes/header.php'); ?>

<main class="container ">  
    <div >
      <!-- MESSAGES -->
      <?php if (isset($_SESSION['message'])) { ?>
      <div class="alert alert-<?= $_SESSION['message_type']?> alert-dismissible fade show" role="alert">
        <?= $_SESSION['message']?>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <?php unset($_SESSION['message']); } ?>    
    </div>
    <div  >
<br>

    <a href="modAdmin.php?cliente"  type="button"  name="btnClientes" class="btn btn-success btn-lg">Clientes</a>
    <a href="modAdmin.php?admin" type="submit" class="btn btn-dark btn-lg"  id="btnAdmin"name="btnAdmin"  >Administradores </a>
    <br><br>
    <div class="table-responsive">
    <table class="table table-hover" Style="margin:auto">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>FNacimiento</th>
            <th>Foto</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>

        

          <?php      
          $query = "SELECT * FROM  usuariosgeneral ";
          $usuario='general';
        if(isset($_GET['admin'])) {
            $query = "SELECT * FROM  usuariosadmin ";
            $usuario='admin';
        }
        if(isset($_GET['cliente'])) {
          $query = "SELECT * FROM  usuarioscliente ";
          $usuario='cliente';
        }
          
          
          $result_usuarios = mysqli_query($conn, $query);    

          while($row = mysqli_fetch_assoc($result_usuarios)) { ?>
          <?php if($row['Usuario']!=$_SESSION['username']){?>
          
          <tr>
            <td><?php echo $row['Usuario']; ?></td>
            <td><?php echo $row['Nombre']; ?></td>
            <td><?php echo $row['Correo']; ?></td>
            <td><?php echo $row['FNacimiento']; ?></td>
            <td><img src="../../<?php echo $row['Foto']; ?>" width="40px"></td>
            <td>
            
            
            <!--se cambio id por usuario-->
            <a href="delete.php?ID=<?php  echo $row['ID']?>" class="btn btn-danger active" role="button" aria-pressed="true"><i class="far fa-trash-alt"></i></a>
            </a>
            <?php if($row['type']=='CLIENTE') { ?>
            <a href="upgrade_user.php?ID=<?php  echo $row['ID']?>" class="btn btn-dark  active" role="button" aria-pressed="true"><i class="fas fa-unlock"></i></a>
            <?php }else{?>
            <button type="button" class="btn btn-dark" disabled><i class="fas fa-unlock"></i></button>
            <?php } ?>
            </a>
            
          </td>
          </tr>
          <?php } ?> 
          <?php } ?>
        </tbody>
      </table>
      </div>
    </div>
  
</main>

<?php include('includes/footer.php'); ?>
