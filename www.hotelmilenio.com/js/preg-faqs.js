/*
 * 
 *
 *
 *
 */

 jQuery( document ).ready(function( $ ) {

 	$(" #error ").innerHTML = "";

	$(" #zcemail ").focus( function(event) {

		$(this).siblings(" #error ").children(" p ").remove();

	});

	$(".respuesta").hide();

	$( ".pregunta" ).click(function() {

		$(this).siblings('.respuesta').toggle();
		
		event.preventDefault();

	});

});
