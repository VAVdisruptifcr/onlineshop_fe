/*=============================================
PLANTILLA
=============================================*/

var rutaOculta = $("#rutaOculta").val();


//Herramienta TOOLTIP
$('[data-toggle="tooltip"]').tooltip(); 


$.ajax({

	url:rutaOculta+"ajax/plantilla.ajax.php",
	success:function(respuesta){

		var colorFondo = JSON.parse(respuesta).colorFondo;
		var colorTexto = JSON.parse(respuesta).colorTexto;
		var barraSuperior = JSON.parse(respuesta).barraSuperior;
		var textoSuperior = JSON.parse(respuesta).textoSuperior;
		
		$(".backColor, .backColor a").css({"background": colorFondo,
											"color": colorTexto})

		$(".barraSuperior, .barraSuperior a").css({"background": barraSuperior, 
			                                       "color": textoSuperior})

	}

})

/*=============================================
CUADRICULA O LISTA
=============================================*/

var btnList = $(".btnList");
var btnGrid = $(".btnGrid");

for(var i = 0; i <= btnList.length; i++){

	
	$("#btnGrid"+i).click(function(){

		var indice = $(this).attr("id").substr(-1);

		$(".list"+indice).hide();
		$(".grid"+indice).show();

		$("#btnGrid"+indice).addClass("backColor");
		$("#btnList"+indice).removeClass("backColor");
	})


	$("#btnList"+i).click(function(){

		var indice = $(this).attr("id").substr(-1);

		$(".list"+indice).show();
		$(".grid"+indice).hide();

		$("#btnList"+indice).addClass("backColor");
		$("#btnGrid"+indice).removeClass("backColor");
	})

	
}

/*=============================================
EFECTOS CON EL SCROLL EN Jquery
=============================================*/

$(window).scroll(function(){

	var scrollY = window.pageYOffset;

	if(window.matchMedia("(min-width:768px)").matches){

		if($(".banner").html() != null){

			if(scrollY < ($(".banner").offset().top)-150){

				// console.log("es menor");
				$(".banner img").css({"margin-top":-scrollY/3+"px"})

			}else{

				scrollY = 0;
			}
			
		}
		

	}

})

$.scrollUp({

	scrollText:"",
	scrollSpeed:2000,
	easingType:"easeOutQuint"
});

/*=============================================
MIGAS DE PAN
=============================================*/
var pagActiva = $(".pagActiva").html();

if (pagActiva != null) {

	var regPagActiva = pagActiva.replace(/-/g, " ");

	$(".pagActiva").html(regPagActiva);
}

/*=============================================
ENLACES PAGINACIÓN
=============================================*/
var url = window.location.href;

var indicador = url.split("/");

var pagActual = indicador[5];

if(isNaN(pagActual)){

	$("#item1").addClass("active");
	
}else{

	$("#item"+pagActual).addClass("active");
	
}






