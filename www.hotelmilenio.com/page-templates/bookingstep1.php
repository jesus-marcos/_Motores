<?php
/**
 * Template Name: Booking Step 1
 */

get_header(); ?>
	<div class="mid-width">
	<section id="contenido-medio">
		<section id="intro" class="mid-width">
			<article id="intro-moments">
				<h2>RESERVAS</h2>
			</article>
			<article class="booking-step">
			<?php while ( have_posts() ) : the_post(); ?>
				
				<script id="be_script" type="text/javascript" src="http://js.miraiglobal.com/be_dependencies.js"></script> 
			    <script type="text/javascript"> 
			        mjQuery = $.noConflict(); 
			        mjQuery(document).ready(function(){ 
			            initializeParametersFromUrl(); 
			            bookingEntrance.loadBookingEntrance(); 
			            initializeRoomsSelectionEvents(); 
			        }); 
					mirai_be_params.bookinghost = 'http://www.dinamicserver.com/demo/hotelmilenio/';
					
			    </script>
		
				<div id="mirai_roomSelectionContainer"></div>
				
				<?php the_content(); ?>
			<?php endwhile; // end of the loop. ?>
			</article>
	
		
		<div class="fix"></div>
	</section><!--Fin de Intro-->

	
<?php get_footer(); ?>



