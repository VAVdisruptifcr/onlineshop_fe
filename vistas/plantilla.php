<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	
	<meta name="title" content="Tienda Virtual">

	<meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione at unde libero ex veritatis culpa ipsa in animi">	

	<meta name="keyword" content="tienda online, tienda virtual, disruptifShop">	

	<title>Disruptif Tienda Virtual</title>
	
	<?php 

		session_start();

		$server = Ruta::ctrRutaServidor();

		$icono = ControladorPlantilla::ctrEstiloPlantilla();

		echo '<link rel="icon" href="'.$server.$icono["icono"].'">';

	/*=============================================
		Mantener Ruta Fija del Proyecto
	=============================================*/
	$url = Ruta::ctrRuta();

	?>

	

	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Condensed" rel="stylesheet">
	<!-- font-family: 'Ubuntu Condensed', sans-serif; -->

	<!-- ================================
	Estilos BtSp y FontAwesome
	================================== -->
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/plugins/bootstrap.min.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/plugins/font-awesome.min.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/plugins/flexslider.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/plugins/sweetalert.css">

	<!-- ================================
	ESTILOS PERSONALIZADOS
	================================== -->	
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/plantilla.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/cabezote.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/slide.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/productos.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/infoproducto.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/perfil.css">
	<link rel="stylesheet" href="<?php echo $url; ?>vistas/css/carrito-de-compras.css">
	
	<!-- ================================
	Plugins JS
	================================== -->	
	<script src="<?php echo $url; ?>vistas/js/plugins/jquery.min.js"></script>
	<script src="<?php echo $url; ?>vistas/js/plugins/bootstrap.min.js"></script>
	<script src="<?php echo $url; ?>vistas/js/plugins/jquery.easing.js"></script>
	<script src="<?php echo $url; ?>vistas/js/plugins/jquery.scrollUp.js"></script>
	<script src="<?php echo $url; ?>vistas/js/plugins/jquery.flexslider.js"></script>
	<script src="<?php echo $url; ?>vistas/js/plugins/sweetalert.min.js"></script>
</head>
<body>

<?php
/*=========================
=        CABEZOTE         =
=========================*/
include "modulos/cabezote.php";

	/*=============================================
	CONTENIDO DINAMICO
	=============================================*/

$rutas = array();
$ruta = null;
$infoProducto = null;

if(isset($_GET["ruta"])){

	$rutas = explode("/",$_GET["ruta"]);

	$item = "ruta";
	$valor = $rutas[0];

	/*=============================================
	URL´S AMIGABLES DE CATEGORIA
	=============================================*/

	$rutaCategorias = ControladorProductos::ctrMostrarCategorias($item, $valor);

	if($valor == $rutaCategorias["ruta"]){

		$ruta = $valor;
		
	};
	/*=============================================
	URL´S AMIGABLES SUB-CATEGORIA
	=============================================*/
	$rutaSubCategorias = ControladorProductos::ctrMostrarSubCategorias($item, $valor);

	foreach ($rutaSubCategorias as $key => $value) {
		
		if($rutas[0] == $value["ruta"]){

			$ruta = $rutas[0];
		};
	}

	/*=============================================
	URL´S AMIGABLES PRODUCTOS
	=============================================*/
	$rutaProductos = ControladorProductos::ctrMostrarInfoProducto($item,$valor);

	$rutaCategorias = ControladorProductos::ctrMostrarCategorias($item, $valor);

	if($rutas[0] == $rutaProductos["ruta"]){

		$infoProducto = $rutas[0];

	};


	/*=============================================
	LISTA BLANCA DE url's amigables
	=============================================*/
	if($ruta != null || $rutas[0] == "articulos-gratis" || $rutas[0] =="lo-mas-vendido" || $rutas[0] =="lo-mas-visto"){

		include "modulos/productos.php";

	}else if($infoProducto != null){

		include "modulos/infoproducto.php";

	}else if($rutas[0] == "buscador" || $rutas[0] == "verificar" || $rutas[0] == "salir" || $rutas[0] == "perfil" || $rutas[0] == "carrito-de-compras"){

		include "modulos/".$rutas[0].".php";

	}else{

		include "modulos/error404.php";
	}

	}else{

		include "modulos/slide.php";

		include "modulos/destacados.php";

	}

?>
	<input type="hidden" value="<?php echo $url; ?>" id="rutaOculta">
	<!-- ================================
	JavaScript PERSONALZADO
	================================== -->
<script src="<?php echo $url; ?>vistas/js/cabezote.js"></script>
<script src="<?php echo $url; ?>vistas/js/plantilla.js"></script>
<script src="<?php echo $url; ?>vistas/js/slide.js"></script>
<script src="<?php echo $url; ?>vistas/js/buscador.js"></script>
<script src="<?php echo $url; ?>vistas/js/infoproducto.js"></script>
<script src="<?php echo $url; ?>vistas/js/usuarios.js"></script>
<script src="<?php echo $url; ?>vistas/js/registroFacebook.js"></script>
<script src="<?php echo $url; ?>vistas/js/carrito-de-compras.js"></script>


<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '207699053217265',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.10'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>


</body>
</html>