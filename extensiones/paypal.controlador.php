<?php 

require_once "../modelos/rutas.php";
require_once "../modelos/carrito.modelo.php";

use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

class Paypal{

	static public function mdlPagoPaypal($datos){

		require __DIR__ . '/bootstrap.php';

		$tituloArray = explode(",", $datos["tituloArray"]);
		$cantidadArray = explode(",", $datos["cantidadArray"]);
		$valorItemArray = explode(",", $datos["valorItemArray"]);
		$idProductos = str_replace(",","-", $datos["idProductoArray"]);

		#seleccionamos el método de pago PAYPAL
		$payer = new Payer();
		$payer->setPaymentMethod("paypal");

		$item = array();
		$variosItem = array();

		for($i = 0; $i < count($tituloArray); $i ++){

			$item[$i] = new Item();
			$item[$i]->setName($tituloArray[$i])
				  ->setCurrency($datos["divisa"])
				  ->setQuantity($cantidadArray[$i])
				  ->setPrice($valorItemArray[$i]/$cantidadArray[$i]);

				  array_push($variosItem, $item[$i]);

		}

		# Agrupamos los items en una lista de ITEMS
		$itemList = new ItemList();
		$itemList->setItems($variosItem);


		# Agrupamos los detalles del pago como impuestos, envío y subtotal
		$details = new Details();
		$details->setShipping($datos["envio"])
				->setTax($datos["impuesto"])
				->setSubtotal($datos["subtotal"]);

		# definimos el pago total con sus detalles
		$amount = new Amount();
		$amount->setCurrency($datos["divisa"])
			   ->setTotal($datos["total"])
			   ->setDetails($details);

		# Agregamos las características de la transacción
		$transaction = new Transaction();
		$transaction->setAmount($amount)
					->setItemList($itemList)
					->setDescription("Payment description")
					->setInvoiceNumber(uniqid());

		# Agregamos las URL´s después de realizar el pago, o cuando el pago es cancelado
		# Importante agregar la URL principal en la API developers de Paypal
		$url = Ruta::ctrRuta();

		$redirectUrls = new RedirectUrls();
		$redirectUrls->setReturnUrl("$url/index.php?ruta=finalizar-compra&paypal=true&productos=".$idProductos)
					 ->setCancelUrl("$url/carrito-de-compras");


		# Agregamos todas las características del pago
		$payment = new Payment();
		$payment->setIntent("sale")
				->setPayer($payer)
				->setRedirectUrls($redirectUrls)
				->setTransactions(array($transaction));		
		
			var_dump($payment);

			 
		#Tratamos de ejecutar un proceso Y SI FALLA ejecutar una rutina de error
		try {
			// Traemos las credenciales $apiContext gracias al requerimiento de bootstrap.php
			$payment->create($apiContext);

		}catch(PayPal\Exception\PayPalConnectionException $ex){
			echo $ex->getCode(); 
			echo $ex->getData();
			die($ex);
			return "$url/error";

		}

	}

}