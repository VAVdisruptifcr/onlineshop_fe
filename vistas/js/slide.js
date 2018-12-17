/*============================================
VARIABLES
=============================================*/
var item = 0;
var itemPaginacion = $("#paginacion li");
var interrumpirInterval = false;
var imgProducto = $(".imgProducto");
var titulos1 = $("#slide h1");
var titulos2 = $("#slide h2");
var titulos3 = $("#slide h3");
var btnVerProducto = $("#slide button") ;
var stopInterval = false;
var toggleSlide = false;

$("#slide ul li").css({"width":100/itemPaginacion.length + "%"})
$("#slide ul").css({"width":itemPaginacion.length*100 + "%"})

// $("#slide ul li").css({"width":100/$("#slide ul li").length + "%"})
// $("#slide ul").css({"width":$("#slide ul li").length*100 + "%"})

/*============================================
ANIMACION INICIAL
=============================================*/

$(imgProducto[item]).animate({"top":-10 + "%", "opacity":0},100, "easeInCirc")
$(imgProducto[item]).animate({"top":30 + "px", "opacity":1},600, "easeInCirc")

$(titulos1[item]).animate({"top":-10 + "%", "opacity":0},100, "easeInCirc")
$(titulos1[item]).animate({"top":30 + "%", "opacity":1},600, "easeInCirc")

$(titulos2[item]).animate({"top":-10 + "%", "opacity":0},100)
$(titulos2[item]).animate({"top":30 + "%", "opacity":1},600)

$(titulos3[item]).animate({"top":-10 + "%", "opacity":0},100)
$(titulos3[item]).animate({"top":30 + "%", "opacity":1},600)

$(btnVerProducto[item]).animate({"top":-10 + "%", "opacity":0},100)
$(btnVerProducto[item]).animate({"top":30 + "%", "opacity":1},600)



/*=============================================
PAGINACION
=============================================*/

$("#paginacion li").click(function(){

	item = $(this).attr("item")-1;
	console.log("item", item);

	movimientoSlide(item);

})
/*=============================================
AVANZAR
=============================================*/
function avanzar(){

	if(item == $("#slide ul li").length -1){

		item = 0;
	}else{

		item++;
	}

	interrumpirInterval = true;

	movimientoSlide(item);
}
$("#slide #avanzar").click(function(){
	avanzar();
})
/*=============================================
RETROCEDER
=============================================*/
$("#slide #retroceder").click(function(){

	if(item == 0) {

		item = $("#slide ul li").length -1;

	}else{

		item--
		
	}

	movimientoSlide(item);
})

/*=============================================
MOVIMIENTO SLIDE
=============================================*/

function movimientoSlide(item){

	$("#slide ul").animate({"left":item*-100 + "%"}, 800)

	$("#paginacion li").css({"opacity":.5})

	$(itemPaginacion[item]).css({"opacity":1})	

	interrumpirInterval = true;

	$(imgProducto[item]).animate({"top":-10 + "%", "opacity":0},100, "easeInCirc")
	$(imgProducto[item]).animate({"top":30 + "px", "opacity":1},600, "easeInCirc")

	$(titulos1[item]).animate({"top":-10 + "%", "opacity":0},100, "easeInCirc")
	$(titulos1[item]).animate({"top":30 + "%", "opacity":1},600, "easeInCirc")
	
	$(titulos2[item]).animate({"top":-10 + "%", "opacity":0},100)
	$(titulos2[item]).animate({"top":30 + "%", "opacity":1},600)
	
	$(titulos3[item]).animate({"top":-10 + "%", "opacity":0},100)
	$(titulos3[item]).animate({"top":30 + "%", "opacity":1},600)

	$(btnVerProducto[item]).animate({"top":-10 + "%", "opacity":0},100)
	$(btnVerProducto[item]).animate({"top":30 + "%", "opacity":1},600)

}

/*=============================================
INTERVALO
=============================================*/

setInterval(function(){

	if(interrumpirInterval){

		interrumpirInterval = false;		

	}else{

		if(!stopInterval){

			avanzar();
			
		}

		
	}


},3000)

/*=============================================
APARICION DE FLECHAS
=============================================*/
$("#slide").mouseover(function(){
	
	$("#slide #avanzar").css({"opacity":1}, "easeInOutQuint")

	$("#slide #retroceder").css({"opacity":1}, "easeInOutQuint")

	stopInterval = true;

})

/*=============================================
DESAPARICION DE FLECHAS
=============================================*/
$("#slide").mouseout(function(){
	
	$("#slide #avanzar").css({"opacity":0}, "easeInOutQuint")

	$("#slide #retroceder").css({"opacity":0}, "easeInOutQuint")

	stopInterval = false;

})
/*=============================================
OCULTAR SLIDE
=============================================*/

$("#btnSlide").click(function(){

	if(!toggleSlide){

		toggleSlide = true;

		$("#slide").slideUp("fast");
		$("#btnSlide").html('<i class="fa fa-angle-down"></i>')
		
	}else{

		$("#slide").slideDown("fast");
		$("#btnSlide").html('<i class="fa fa-angle-up"></i>')
		toggleSlide = false;

	}
})