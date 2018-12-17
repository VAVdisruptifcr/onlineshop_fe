/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
VISUALIZAR LA CESTA DEL CARRITO DE COMPRAS
==================================================== */

if(localStorage.getItem("cantidadCesta") != null){

	$(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
	$(".sumaCesta").html(localStorage.getItem("sumaCesta"));

}else{

	$(".cantidadCesta").html("0");
	$(".sumaCesta").html("0");	

}

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
VISUALIZAR LOS PRODUCTOS EN LA PÁGINA CARRITO DE COMPRAS
==================================================== */

if(localStorage.getItem("listaProductos") != null){

	var listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));

	listaCarrito.forEach(funcionForEach);

	function funcionForEach(item, index){

	$(".cuerpoCarrito").append(

		'<div clas="row itemCarrito">'+

			'<div class="col-sm-1 col-xs-12">'+
				
				'<br>'+

				'<center>'+
					
					'<button class="btn btn-default backColor quitarItemCarrito" idProducto="'+item.idProducto+'" peso="'+item.peso+'">'+
						
						'<i class="fa fa-times"></i>'+

					'</button>'+

				'</center>'+	

			'</div>'+

			'<div class="col-sm-1 col-xs-12">'+
				
				'<figure>'+
					
					'<img src="'+item.imagen+'" class="img-thumbnail">'+

				'</figure>'+

			'</div>'+

			'<div class="col-sm-4 col-xs-12">'+

				'<br>'+

				'<p class="tituloCarritoCompra text-left">'+item.titulo+'</p>'+

			'</div>'+

			'<div class="col-md-2 col-sm-1 col-xs-12">'+

				'<br>'+

				'<p class="precioCarritoCompra text-center">USD $ <span>'+item.precio+'</span></p>'+

			'</div>'+

			'<div class="col-md-2 col-sm-3 col-xs-8">'+

				'<br>'+	

				'<div class="col-xs-8">'+

					'<center>'+
					
						'<input type="number" class="form-control cantidadItem" min="1" value="'+item.cantidad+'" tipo="'+item.tipo+'" precio="'+item.precio+'" idProducto="'+item.idProducto+'">'+	

					'</center>'+

				'</div>'+

			'</div>'+

			'<div class="col-md-2 col-sm-1 col-xs-4 text-center">'+
				
				'<br>'+

				'<p class="subTotal'+item.idProducto+' subtotales">'+
					
					'<strong>USD $<span>'+item.precio+'</span></strong>'+

				'</p>'+

			'</div>'+
			
		'</div>'+

		'<div class="clearfix"></div>'+

		'<hr>');

	/* ================================================
	EVITAR MANIPULAR LA CANTIDAD EN PRODUCTOS VIRTUALES
	================================================ */ 

	$(".cantidadItem[tipo='virtual']").attr("readonly", "true");

	}

}else{

	$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras</div>');
	$(".sumaCarrito").hide();
	$(".cabeceraCheckout").hide();

}

/* ================================
/* ================================
/* ================================
/* ================================
/* ================================
AGREGAR AL CARRITO
================================ */

$(".agregarCarrito").click(function(){

	var idProducto = $(this).attr("idProducto");
	console.log("idProducto", idProducto);
	var imagen = $(this).attr("imagen");
	var titulo = $(this).attr("titulo");
	var precio = $(this).attr("precio");
	var tipo = $(this).attr("tipo");
	var peso = $(this).attr("peso");

	var agregarAlCarrito = false;

	/* ======================================
	CAPTURAR DETALLES DEL PRODUCTO FÍSICO
	====================================== */ 

	if(tipo == "virtual"){

		agregarAlCarrito = true;

	}else{

		var seleccionarDetalle = $(".seleccionarDetalle");

		for(var i=0; i< seleccionarDetalle.length; i++){

			if($(seleccionarDetalle[i]).val() == ""){

				swal({
					title: "Debes seleccionar la talla y el color",
					text: "Para darte un buen servicio, debemos saber exactamente lo que deseas",
					type: "warning",
					showCancelButton: false,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "¡Seleccionar!",
					closeOnConfirm: false
				})

			}else{

				titulo = titulo + "-" + $(seleccionarDetalle[i]).val();

				agregarAlCarrito = true;

			}

		}

	}

	/* ==========================================================
	ALMACENAR EN LOCALSTORAGE LOS PRODUCTOS AGREGADOS AL CARRITO
	========================================================== */ 

	if(agregarAlCarrito){

		/* ======================================
		RECUPERAR ALMACENAMIENTO DE LOCALSTORAGE
		====================================== */
		if(localStorage.getItem("listaProductos") == null){

			listaCarrito = [];

		}else{

			var listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

			for(var i = 0; i < listaProductos.length; i++){

				if(listaProductos[i]["idProducto"] == idProducto && listaProductos[i]["tipo"] == "virtual"){

						swal({
						title: "Este producto ya está en la cesta",
						text: "",
						type: "warning",
						showCancelButton: false,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "¡Volver!",
						closeOnConfirm: false
					})

					return;

				}

			}

			listaCarrito.concat(localStorage.getItem("listaProductos"));

		}


		listaCarrito.push({"idProducto":idProducto,
							"imagen":imagen,
							"titulo":titulo,
							"precio":precio,
							"tipo":tipo,
							"peso":peso,
							"cantidad":"1"});

		localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

		/* ==============================================
		ACTUALIZAR CESTA
		============================================== */

		var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
		var sumaCesta = Number($(".sumaCesta").html()) + Number(precio);

		$(".cantidadCesta").html(cantidadCesta);
		$(".sumaCesta").html(sumaCesta);

		localStorage.setItem("cantidadCesta", cantidadCesta);
		localStorage.setItem("sumaCesta", sumaCesta);



			/* =============================================
			ALERTA EXITOSA DE PRODUCTO AGREGADO AL CARRITO
			============================================= */

			swal({
				title: "",
				text: "¡Se ha agregado exitosamente un nuevo producto al carrito de compras!",
				type: "success",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				cancelButtonText: "¡Continuar comprando!",
				confirmButtonText: "¡Ir al carrito!",
				closeOnConfirm: false
				},
				function(isConfirm){
					if (isConfirm) {
						window.location = rutaOculta+"carrito-de-compras";
					}
			});

		}

})

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
QUITAR PRODUCTOS DEL CARRITO
==================================================== */

$(".quitarItemCarrito").click(function(){

	$(this).parent().parent().parent().remove();

	var idProducto = $(".cuerpoCarrito button");
	var imagen = $(".cuerpoCarrito img");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
	var precio = $(".cuerpoCarrito .precioCarritoCompra span");
	var cantidad = $(".cuerpoCarrito .cantidadItem");

	/* ================================================================
	SI AÚN QUEDAN PRODUCTOS VOLVERLOS A AGREGAR AL CARRITO localStorage
	================================================================ */

	listaCarrito = [];

	if(idProducto.length != 0){

		for(var i=0; i < idProducto.length; i++){

			var idProductoArray = $(idProducto[i]).attr("idProducto");
			var imagenArray = $(imagen[i]).attr("src");
			var tituloArray = $(titulo[i]).html();
			var precioArray = $(precio[i]).html();
			var pesoArray = $(idProducto[i]).attr("peso");
			var tipoArray = $(cantidad[i]).attr("tipo");
			var cantidadArray = $(cantidad[i]).val();

			listaCarrito.push({"idProducto":idProductoArray,
							"imagen":imagenArray,
							"titulo":tituloArray,
							"precio":precioArray,
							"tipo":tipoArray,
							"peso":pesoArray,
							"cantidad":cantidadArray});
		
		}

		localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

		sumaSubtotales();
		cestaCarrito(listaCarrito.length);

	}else{

	/* ===================================
	SI NO QUEDARON PRODUCTOS EN LA CESTA
	===================================== */

	localStorage.removeItem("listaProductos");

	localStorage.setItem("cantidadCesta", "0");
	localStorage.setItem("sumaCesta", "0");

	$(".cantidadCesta").html("0");
	$(".sumaCesta").html("0");	

	$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito de compras</div>');
	$(".sumaCarrito").hide();
	$(".cabeceraCheckout").hide();


	}

})

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
GENERAR SUBTOTAL LUEGO DE CAMBIAR CANTIDAD
==================================================== */

$(".cantidadItem").change(function(){

	var cantidad = $(this).val();
	var precio = $(this).attr("precio");
	var idProducto = $(this).attr("idProducto");

	$(".subTotal"+idProducto).html('<strong>USD $<span>'+(cantidad*precio)+'</span></strong>');

	/* =======================================
	ACTUALIZAR LA CANTIDAD EN LOCALSTORAGE
	=======================================  */ 

	var idProducto = $(".cuerpoCarrito button");
	var imagen = $(".cuerpoCarrito img");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
	var precio = $(".cuerpoCarrito .precioCarritoCompra span");
	var cantidad = $(".cuerpoCarrito .cantidadItem");

	listaCarrito = [];

	for(var i=0; i < idProducto.length; i++){

		var idProductoArray = $(idProducto[i]).attr("idProducto");
		var imagenArray = $(imagen[i]).attr("src");
		var tituloArray = $(titulo[i]).html();
		var precioArray = $(precio[i]).html();
		var pesoArray = $(idProducto[i]).attr("peso");
		var tipoArray = $(cantidad[i]).attr("tipo");
		var cantidadArray = $(cantidad[i]).val();

		listaCarrito.push({"idProducto":idProductoArray,
						"imagen":imagenArray,
						"titulo":tituloArray,
						"precio":precioArray,
						"tipo":tipoArray,
						"peso":pesoArray,
						"cantidad":cantidadArray});

	}

	localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

	sumaSubtotales();
	cestaCarrito(listaCarrito.length);

})

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
ACTUALIZANDO SUBTOTAL
==================================================== */

var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");
var cantidadItem = $(".cuerpoCarrito .cantidadItem");

for (var i = 0; i < precioCarritoCompra.length; i++) {

	var precioCarritoCompraArray = $(precioCarritoCompra[i]).html();
	var cantidadItemArray = $(cantidadItem[i]).val();
	var idProductoArray = $(cantidadItem[i]).attr("idProducto");

	$(".subTotal"+idProductoArray).html('<strong>USD $<span>'+(precioCarritoCompraArray*cantidadItemArray)+'</span></strong>');

	sumaSubtotales();
	cestaCarrito(precioCarritoCompra.length);

}

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
SUMA DE TODOS LOS SUBTOTALES
==================================================== */

function sumaSubtotales(){

	var subtotales = $(".subtotales span");
	var arraySumaSubtotales = [];
	
	for(var i = 0; i < subtotales.length; i++){

		var subtotalesArray = $(subtotales[i]).html();
		arraySumaSubtotales.push(Number(subtotalesArray));

	}

	function sumaArraySubtotales(total, numero){

		return total + numero;

	}

	var sumaTotal = arraySumaSubtotales.reduce(sumaArraySubtotales);
	
	$(".sumaSubTotal").html('<strong>USD $<span>'+sumaTotal+'</span></strong>')

	$(".sumaCesta").html(sumaTotal);

	localStorage.setItem("sumaCesta", sumaTotal);

}

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
ACTUALIZAR CESTA AL CAMBIAR CANTIDAD
==================================================== */

function cestaCarrito(cantidadProductos){

		if(cantidadProductos != 0){
			
			var cantidadItem = $(".cuerpoCarrito .cantidadItem");

			var arraySumaCantidades = [];
		
		for(var i = 0; i < cantidadItem.length; i++){

			var cantidadItemArray = $(cantidadItem[i]).val();
			arraySumaCantidades.push(Number(cantidadItemArray));

		}

		function sumaArrayCantidades(total, numero){

			return total + numero;


		}

		var sumaTotalCantidades = arraySumaCantidades.reduce(sumaArrayCantidades);
		
		$(".cantidadCesta").html(sumaTotalCantidades);
		localStorage.setItem("cantidadCesta", sumaTotalCantidades);

	}

}

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
CHECKOUT
==================================================== */
$("#btnCheckout").click(function(){

	$(".listaProductos table.tablaProductos tbody").html("");

	var idUsuario = $(this).attr("idUsuario");
	var peso = $(".cuerpoCarrito button");
	var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
	var cantidad = $(".cuerpoCarrito .cantidadItem");
	var subtotal = $(".cuerpoCarrito .subtotales span");

	var tipoArray = [];
	var cantidadPeso = [];

	/* =======================================
	SUMA SUBTOTAL
	======================================= */	

	var sumaSubTotal = $(".sumaSubTotal span");

	$(".valorSubtotal").html($(sumaSubTotal).html());
	$(".valorSubtotal").attr("valor", $(sumaSubTotal).html());

	/* =======================================
	TASAS DE IMPUESTO
	======================================= */		

	var impuesoTotal = ($(".valorSubtotal").html() * $("#tasaImpuesto").val())/100 ;
	
	$(".valorTotalImpuesto").html(impuesoTotal.toFixed(2));
	$(".valorTotalImpuesto").attr("valor", impuesoTotal.toFixed(2));

	sumaTotalCompra();

	/* =======================================
	VARIABLES ARRAY
	======================================= */	

	for(var i = 0; i < titulo.length; i++){

		var pesoArray = $(peso[i]).attr("peso");
		var tituloArray = $(titulo[i]).html();
		var cantidadArray = $(cantidad[i]).val();
		var subtotalArray = $(subtotal[i]).html();


		/* =======================================
		EVALUAR PESO DE ACUERDO A LA CANTIDAD
		======================================= */		
		
		cantidadPeso[i] = pesoArray * cantidadArray;
		
		function sumaArrayPeso(total, numero){

			return total + numero;


		}

		var sumaTotalPeso = cantidadPeso.reduce(sumaArrayPeso);

		/* =======================================
		MOSTRAR PRODUCTOS DEFINITIVOS A COMPRAR
		======================================== */ 

		$(".listaProductos table.tablaProductos tbody").append('<tr>'+
																'<td class="valorTitulo">'+tituloArray+'</td>'+
																'<td class="valorCantidad">'+cantidadArray+'</td>'+
																'<td>$<span class="valorItem" valor="'+subtotalArray+'">'+subtotalArray+'</span></td>'+
																'</tr>');

		/* ================================
		SELECCIÓN PAÍS DE ENVÍO
		================================  */ 

		
		tipoArray.push($(cantidad[i]).attr("tipo"));
		
		function checkTipo(tipo){

			return tipo == "fisico";

		}

	}		

	/* ====================================
	CUANDO EXISTEN PRODUCTOS FÍSICOS
	====================================  */ 

	if(tipoArray.find(checkTipo) == "fisico"){

		$(".seleccionePais").html('<select class="form-control" id="seleccionarPais" required>'+
								  '<option value="">Seleccione el país</option></select>');

		$(".formEnvio").show();

		$(".btnPagar").attr("tipo", "fisico");

		$.ajax({

			url:rutaOculta+"vistas/js/plugins/countries.json",
			type: "GET",
			cache: false,
			contentType: false,
			processData: false,
			dataType: "json",
			success: function(respuesta){
				
				respuesta.forEach(seleccionarPais);

				function seleccionarPais(item, index){

					var pais = item.name;
					var codPais = item.code;

					$("#seleccionarPais").append('<option value="'+codPais+'">'+pais+'</option>')

				}

			}

		})

	/* ================================
	EVALUAR TASAS DE ENVIO
	================================  */ 

	$("#seleccionarPais").change(function(){

		$(".alert").remove();

		$("#cambiarDivisa").val("USD");

		$(".cambioDivisa").html("USD");

		$(".valorSubtotal").html((1 * Number($(".valorSubtotal").attr("valor"))).toFixed(2));
		$(".valorTotalEnvio").html((1 * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2));
		$(".valorTotalImpuesto").html((1 * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2));
		$(".valorTotalCompra").html((1 * Number($(".valorTotalCompra").attr("valor"))).toFixed(2));

		var valorItem = $(".valorItem");

		for(var i = 0; i < valorItem.length; i++){

			$(valorItem[i]).html((1 * Number($(valorItem[i]).attr("valor"))).toFixed(2));

		}

		var pais = $(this).val();
		var tasaPais = $("#tasaPais").val();

		if(pais == tasaPais){

			var resultadoPeso = sumaTotalPeso * $("#envioNacional").val();
			console.log("resultadoPeso", resultadoPeso);

			if(resultadoPeso < $("#tasaMinimaNal").val()){

				$(".valorTotalEnvio").html($("#tasaMinimaNal").val());
				$(".valorTotalEnvio").attr("valor", $("#tasaMinimaNal").val());

			}else{

				$(".valorTotalEnvio").html(resultadoPeso);

			}

		}else{

			var resultadoPeso = sumaTotalPeso * $("#envioInternacional").val();
			console.log("resultadoPeso", resultadoPeso);

			if(resultadoPeso < $("#tasaMinimaInt").val()){

				$(".valorTotalEnvio").html($("#tasaMinimaInt").val());
				$(".valorTotalEnvio").attr("valor", $("#tasaMinimaInt").val());

			}else{

				$(".valorTotalEnvio").html(resultadoPeso);
				$(".valorTotalEnvio").attr("valor", resultadoPeso);

			}

		}

		sumaTotalCompra();

	})

	}else{

		$(".btnPagar").attr("tipo", "virtual");

	}	

})

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
SUMA TOTAL DE LA COMPRA
==================================================== */

function sumaTotalCompra(){

	var sumaTotalTasas = Number($(".valorSubtotal").html())+
						 Number($(".valorTotalEnvio").html())+
						 Number($(".valorTotalImpuesto").html());

	$(".valorTotalCompra").html(sumaTotalTasas.toFixed(2));
	$(".valorTotalCompra").attr("valor", sumaTotalTasas.toFixed(2));

}

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
MÉTODO DE PAGO PARA CAMBIO DE DIVISA
==================================================== */

var metodoPago = "paypal";
divisas(metodoPago);

$("input[name='pago']").change(function(){

	var metodoPago = $(this).val();

	divisas(metodoPago);

})

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
FUNCIÓN PARA CAMBIO DE DIVISA
==================================================== */
function divisas(metodoPago){

	$("#cambiarDivisa").html("");

	if(metodoPago == "paypal"){

		$("#cambiarDivisa").append('<option value="USD">USD</option>'+
								  '<option value="EUR">EUR</option>'+
								  '<option value="GBP">GBP</option>'+
								  '<option value="MXN">MXN</option>'+
								  '<option value="JPY">JPY</option>'+
								  '<option value="CAD">CAD</option>'+
								  '<option value="BRL">BRL</option>');	

	}else{

		$("#cambiarDivisa").append('<option value="USD">USD</option>'+
								  '<option value="PEN">PEN</option>'+
								  '<option value="COP">COP</option>'+
								  '<option value="MXN">MXN</option>'+
								  '<option value="CLP">CLP</option>'+
								  '<option value="ARS">ARS</option>'+
								  '<option value="BRL">BRL</option>');	

	}

}

/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
CAMBIO DE DIVISA
==================================================== */

var divisaBase = "USD";

$("#cambiarDivisa").change(function(){

	$(".alert").remove();

	if($("#seleccionarPais").val() == ""){

		$("#cambiarDivisa").after('<div class="alert alert-warning">No haz seleccionado el país de destino para el producto</div>');

		return;

	}

	var divisa = $(this).val();

	$.ajax({

		url: "https://free.currencyconverterapi.com/api/v3/convert?q="+divisaBase+"_"+divisa+"&compact=y",
		type: "GET",
		cache: false,
		contentType: false,
		processData: false,
		dataType: "jsonp",
		success: function(respuesta){
			
			var divisaString = JSON.stringify(respuesta);
			var conversion = divisaString.substr(18,4);

			if(divisa == "USD"){

				conversion = 1;

			}
			
			$(".cambioDivisa").html(divisa);

			$(".valorSubtotal").html((Number(conversion) * Number($(".valorSubtotal").attr("valor"))).toFixed(2));
			$(".valorTotalEnvio").html((Number(conversion) * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2));
			$(".valorTotalImpuesto").html((Number(conversion) * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2));
			$(".valorTotalCompra").html((Number(conversion) * Number($(".valorTotalCompra").attr("valor"))).toFixed(2));

			var valorItem = $(".valorItem");

			for(var i = 0; i < valorItem.length; i++){

				$(valorItem[i]).html(Number((conversion) * Number($(valorItem[i]).attr("valor"))).toFixed(2));

			}

		}


	})

})


/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
/* ====================================================
BOTÓN PAGAR
==================================================== */

$(".btnPagar").click(function(){

	var tipo = $(this).attr("tipo");

	if(tipo == "fisico" && $("#seleccionarPais").val() == ""){

		$(".btnPagar").after('<div class="alert alert-warning">No haz seleccionado el país de destino para el producto</div>');

		return;

	}

	var divisa = $("#cambiarDivisa").val();	
	var total = $(".valorTotalCompra").html();	
	var impuesto = $(".valorTotalImpuesto").html();	
	var envio = $(".valorTotalEnvio").html();	
	var subtotal = $(".valorSubtotal").html();	
	var titulo = $(".valorTitulo");	
	var cantidad = $(".valorCantidad");	
	var valorItem = $(".valorItem");	
	var idProducto = $('.cuerpoCarrito button');

	var tituloArray = [];
	var cantidadArray = [];
	var valorItemArray = [];
	var idProductoArray = [];

	for(var i = 0; i < titulo.length; i++){

		tituloArray[i] = $(titulo[i]).html();
		cantidadArray[i] = $(cantidad[i]).html();
		valorItemArray[i] = $(valorItem[i]).html();
		idProductoArray[i] = $(idProducto[i]).attr("idProducto");

	}

	var datos = new FormData();

	datos.append("divisa", divisa);
	datos.append("total", total);
	datos.append("impuesto", impuesto);
	datos.append("envio", envio);
	datos.append("subtotal", subtotal);
	datos.append("tituloArray", tituloArray);
	datos.append("cantidadArray", cantidadArray);
	datos.append("valorItemArray", valorItemArray);
	datos.append("idProductoArray", idProductoArray);

	$.ajax({
		url:rutaOculta+"ajax/carrito.ajax.php",
		method:"POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		success:function(respuesta){

			console.log("respuesta", respuesta);

		}


	})

})