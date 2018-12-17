<!-- ===============================
VERIFICAR
=============================== -->
<?php 

	$usuarioVerificado = false;
	
	$item = "EmailEncriptado";
	$valor = $rutas[1];
	
	$respuesta = ControladorUsuarios::ctrMostrarUsuario($item,$valor);

	if($valor == $respuesta["EmailEncriptado"]){

		$id = $respuesta["id"];
		$item2 = "verificacion";
		$valor2 = 0;

		$respuesta2 = ControladorUsuarios::ctrActualizarUsuario($id, $item2, $valor2);

		if($respuesta2 == "ok"){

			$usuarioVerificado = true;

		}

	}


?>

<div class="container">
	
	<div class="row">
		
		<div class="col-xs-12 text-certer verificar">
			
			
			<?php 

				if($usuarioVerificado){

					echo '<h3>Gracias!</h3>
						<h2> <small>Verificación exitosa, bienvenido ya puedes recorrer nuestra tienda estamos para servirte! </small> </h2>
						<br>

						<a href="#modalIngreso"> <button class="btn btn-default backColor btn-lg">INGRESAR</button> </a>';

				}else{

					echo '<center><h3>ERROR DE AUTENTICACIÓN!!!</h3>

						<h2> <small>No se ha logrado verificar correctamente su registro de usuario! </small> </h2>
						<br>

						<a href="#modalRegistro" data-toggle="modal"> <button class="btn btn-default backColor btn-lg">REGISTRO</button> </a>';

				}

			?>

		</div>

	</div>

</div>
