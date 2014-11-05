/*
 * Javascript que implementa la funcionalidad
 *
 */


jQuery( document ).ready(function( $ ) {

	$(" #error ").innerHTML = "";

	$(" #zcemail ").focus( function(event) {

		$(this).siblings(" #error ").children(" p ").remove();

	});


	$(".fancybox-thumb").fancybox({
	    prevEffect  : 'none',
	    nextEffect  : 'none',
	    helpers : {
	      title : {
	        type: 'outside'
	      },
	      thumbs  : {
	        width : 50,
	        height  : 50
	      }
	    }
	  });


	$(".answer").hide();

	$( ".question" ).click(function() {

		$(this).siblings('.answer').toggle();

		event.preventDefault();

	});

});


