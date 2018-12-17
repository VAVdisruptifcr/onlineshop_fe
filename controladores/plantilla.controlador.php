<?php

// require_once "../modelos/plantilla.modelo.php";

class ControladorPlantilla{

	public function plantilla(){

		include "vistas/plantilla.php";
	}

	/*=============================================
	Traer los estilos dinamicos a la pantalla
	=============================================*/

	public function ctrEstiloPlantilla(){

		$tabla = "plantilla";

		$respuesta = ModeloPlantilla::mdlEstiloPlantilla($tabla);

		return $respuesta;
	}
}