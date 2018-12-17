/*==============================  
CAPTURA DE RUTA
==============================*/ 
var rutaActual = location.href;

$(".btnIngreso, .facebook, .google, .salir").click(function(){

	localStorage.setItem("rutaActual", rutaActual);
	
}) 

/*=============================================
FORMATEAR LOS INPUT
=============================================*/
$("input").focus(function(){

	$(".alert").remove();
})

/*=============================================
VALIDAR EMAIL REPETIDO
=============================================*/

var validarEmailRepetido = false;

$("#regEmail").change(function(){

	var email = $("#regEmail").val();

	var datos = new FormData();
	datos.append("validarEmail", email);

	$.ajax({

		url:rutaOculta+"ajax/usuarios.ajax.php",
		type: "POST", //revisar este type porque lo cabié antes era method
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		success:function(respuesta){
			
			if(respuesta == "false"){

				$(".alert").remove();

				validarEmailRepetido = false;

			}else{

				var modo = JSON.parse(respuesta).modo;
				
				if(modo == "directo"){

					modo = "esta página";
				}

				$("#regEmail").parent().before('<div class="alert alert-warning"><strong>ERROR:</strong> El correo electrónico ya existe en la base de datos, fue registrado a través de '+modo+', por favor ingrese uno distinto</div>')

				validarEmailRepetido = true;

			}

		}

	})

})

 /*===============================
VALIDAR EL REGISTRO DE USUARIOS
=================================*/ 
function registroUsuario(){

	/*=================================== 
	VALIDACIÓN NOMBRE
	=================================== */ 

	var nombre = $("#regUsuario").val();

	if(nombre != ""){

		var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

		if(!expresion.test(nombre)){

			$("#regUsuario").parent().before('<div class="alert alert-warning"> <strong>ERROR: </strong> Este campo no acepta números ni, carácteres especiales</div>')
		return false;

		}

	}else{

		$("#regUsuario").parent().before('<div class="alert alert-warning"> <strong>ATENCIÓN: </strong> Este campo es obligatorio</div>')
		return false;

	}

	/* ===================================
	VALIDAR EMAIL INPUT
	=================================== */ 

	var email = $("#regEmail").val();

	if(email != ""){

		var expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

		if(!expresion.test(email)){

			$("#regEmail").parent().before('<div class="alert alert-danger"> <strong>ERROR: </strong> Debes escribir correctamente el correo electrónico</div>')

		return false;

		}

		if(validarEmailRepetido){

			$("#regEmail").parent().before('<div class="alert alert-danger"> <strong>Alerta: </strong> El correo electrónico ya existe. Revisa y vuelve a intentarlo. Te esperamos!</div>')

			return false;
		}

	}else{

		$("#regEmail").parent().before('<div class="alert alert-warning"> <strong>ATENCIÓN: </strong> Este campo es obligatorio</div>')
		
		return false;

	}

	/* ===================================
	VALIDACIÓN CONTRASEÑA
	=================================== */ 
	
	var password = $("#regPassword").val();

	if(password != ""){

		var expresion = /^[a-zA-Z0-9]*$/;

		if(!expresion.test(password)){

			$("#regPassword").parent().before('<div class="alert alert-warning"> <strong>Atención: </strong> Incluye solamente letras y números en tu password</div>') 

		return false;

		}

	}else{

		$("#regPassword").parent().before('<div class="alert alert-warning"> <strong>ATENCIÓN: </strong> Este campo es obligatorio</div>')

		return false;

	}



	/*=================================== 
	VALIDAR POLÍTICAS DE PRIVACIDAD
	=================================== */ 

	var politicas = $("#regPoliticas:checked").val();
	if(politicas != "on"){

		$("#regPoliticas").parent().before('<div class="alert alert-warning"> <strong>ATENCIÓN: </strong> debe aceptar los terminos y políticas del sitio para continuar</div>')
		return false;
	}

	return true;
}

/*==============================  
CAMBIAR FOTO
==============================*/
$("#btnCambiarFoto").click(function(){

	$("#imgPerfil").toggle();
	$("#subirImagen").toggle();
})

$("#datosImagen").change(function(){

	var imagen = this.files[0];

	/*==================================
	VALIDAMOS EL FORMATO DE LA IMAGEN
	===================================*/ 
	
	if(imagen["type"] != "image/jpeg" && imagen["type"] != "image/png"){

		$("#datosImagen").val("");

		swal({
			title: "Error al subir la imagen!",
			text: "La imagen debe estar en formato JPEG o PNG",
			type: "error",
			confirmButtonText: "¡Cerrar!",
			closeOnConfirm: false
		},

		function(isConfirm){
			if(isConfirm){
				window.location = rutaOculta+"perfil";
			}	

		});

	}else if(Number(imagen["size"]) > 2000000){

		$("#datosImagen").val("");

		swal({
			title: "Error al subir la imagen",
			text: "La imagen no debe pesar más de 2MB",
			type: "error",
			confirmButtonText: "¡Cerrar!",
			closeOnConfirm: false
		},
		function(isConfirm){
			if(isConfirm){
				window.location = rutaOculta+"perfil";
			}		
		});

	}else{

		var datosImagen = new FileReader;
		datosImagen.readAsDataURL(imagen);

		$(datosImagen).on("load", function(event){

			var rutaImagen = event.target.result;
			$(".previsualizar").attr("src", rutaImagen);
		})

	}

})

/* =================================
COMENTARIOS ID
================================= */ 
$(".calificarProducto").click(function(){

	var idComentario = $(this).attr("idComentario");

	$("#idComentario").val(idComentario);

})

/* =================================
COMENTARIOS CAMBIO DE ESTRELLAS
================================= */ 

$("input[name='puntaje']").change(function(){

	var puntaje = $(this).val();
	
	switch(puntaje){

		case "0.5":
		$("#estrellas").html('<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;

		case "1.0":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;

		case "1.5":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;  

		case "2.0":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;  

		case "2.5":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;

		case "3.0":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;  

		case "3.5":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;

		case "4.0":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-o text-success" aria-hidden="true"></i>');
		break;

		case "4.5":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star-half-o text-success" aria-hidden="true"></i>');
		break;

		case "5.0":
		$("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i> '+
							'<i class="fa fa-star text-success" aria-hidden="true"></i>');
		break;

	}

})

/* =================================
VALIDAR COMENTARIO
================================= */ 

function validarComentario(){

	var comentario = $("#comentario").val();

	if(comentario != ""){

		var expresion = /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;

		if(!expresion.test(comentario)){

			$("#comentario").parent().before('<div class="alert alert-danger"> <strong>Error!</strong> No se permiten carácteres especiales, revisa tu texto. </div>');

			return false;
		}

	}else{

		$("#comentario").parent().before('<div class="alert alert-warning"> <strong>Error!</strong> Campo obligatorio. </div>');

		return false;
	}

	return true;

}

/*=============================================
LISTA DE DESEOS
=============================================*/

$(".deseos").click(function(){

	var idProducto = $(this).attr("idProducto");
	console.log("idProducto", idProducto);
	var idUsuario = localStorage.getItem("usuario");
	console.log("idUsuario", idUsuario);

	if(idUsuario == null){

		swal({
			title: "Debes ingresar al sistema!",
			text: "Para agregar algún producto a tu lista de deseos debes registrarte primero",
			type: "warning",
			confirmButtonText: "¡Cerrar!",
			closeOnConfirm: false
		},

		function(isConfirm){
			if(isConfirm){
				window.location = rutaOculta;
			}	

		});


	}else{

		$(this).addClass("btn-danger");

		var datos = new FormData();
		datos.append("idUsuario", idUsuario);
		datos.append("idProducto", idProducto);

		$.ajax({
			url:rutaOculta+"ajax/usuarios.ajax.php",
			method: "POST",
			data: datos,
			cache: false,
			contentType: false,
			processData: false,
			success:function(respuesta){
				
			}

		})

	}

})

/* ======================================
ELIMINIAR PRODUCTO DE LA LISTA DE DESEO
====================================== */ 

$(".quitarDeseo").click(function(){

	var idDeseo = $(this).attr("idDeseo");

	$(this).parent().parent().parent().remove();

	var datos = new FormData();
	datos.append("idDeseo", idDeseo);

	$.ajax({
			url:rutaOculta+"ajax/usuarios.ajax.php",
			method: "POST",
			data: datos,
			cache: false,
			contentType: false,
			processData: false,
			success:function(respuesta){
				console.log("respuesta", respuesta);

			}

		})

})

/* ======================================
ELIMINIAR USUARIO
====================================== */ 

$("#eliminarUsuario").click(function(){

	var id = $("#idUsuario").val();

	if($("#modoUsuario").val() == "directo"){

		if($("#fotoUsuario").val() != ""){

			var foto = $("#fotoUsuario").val();
		}
	}

	swal({
			title: "Estas seguro de eliminar tu cuenta?",
			text: "Al eliminarla borraras todos los registros de actividad dentro de esta aplicación",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "¡Sí, borrar cuenta!",
			closeOnConfirm: false
		},
		function(isConfirm){
			if(isConfirm){
				window.location = "index.php?ruta=perfil&id="+id+"&foto="+foto;
			}		
		});

})