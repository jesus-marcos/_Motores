<?php
/**
 * Template Name: Habitaciones
 *
 * Description: Twenty Twelve loves the no-sidebar look as much as
 * you do. Use this page template to remove the sidebar from any page.
 *
 * Tip: to remove the sidebar from all posts and pages simply remove
 * any active widgets from the Main Sidebar area, and the sidebar will
 * disappear everywhere.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
get_header(); ?>

<section id="contenido-medio">
	
	<div id="titulo-pagina">
		<?php while ( have_posts() ) : the_post(); ?>
		<h2><?php the_title(); ?></h2>
	</div>
	<article id="menu-habitaciones">

		<ul class="habitaciones">
			<a href="<?php bloginfo('url'); ?>/?page_id=16" class="doble"><li><span>Habitacion Doble</span></li></a>
			<a href="<?php bloginfo('url'); ?>/?page_id=18" class="suite"><li><span>Suite</span></li></a>
		</ul>
	</article>
	<article id="habitaciones">

			<div id="imagen-habitacion">
			<?php the_field( "foto_habitacion" ); ?>
			</div>
			<div id="caracteristicas-habitacion">
				<?php get_template_part( 'habitaciones-page' ); ?>
			</div>
			<div class="fix"></div>
			<div id="descripcion-habitacion">
				<?php the_field( "descripcion_habitacion" ); ?>
			</div>
	</article>
	<?php endwhile; // end of the loop. ?>
	<article class="espacios faq">
		<h3>Preguntas Frecuentes</h3>
		<div id="container">
					 <div id="dropdown">
					 	<?php if(get_field('faq-rooms')): ?>
							
 								<?php while(has_sub_field('faq-rooms')): ?>
								<ul class="bloque">
									<li class="pregunta"><strong><?php the_sub_field('pregunta-rooms'); ?></strong></li>
									<li class="drop respuesta"><?php the_sub_field('respuesta-rooms'); ?></li>
								</ul>
								<?php endwhile; ?>
							
						<?php endif; ?>
						
						<!--<ul>
						    <li><strong>&iquest;Qu&eacute; tipos de Habitaci&oacute;n hay Disponibles?  </strong></li>
						    <li class="drop">
						    	El Hotel cuenta con tres tipos de Habitaci&oacute;n: <br/><br/>
								1. Confortables habitaciones dobles ideales para viajes de negocios.<br/><br/>
								2. Habitaciones superiores recomendadas para largas estancias o viajes en familia.<br/><br/>
								3. Junior Suite, amplias estancias con todo lujo de detalles ideales para sorprender a tu pareja en una noche rom&aacute;ntica. 
						    </li>
						</ul>
						
						<ul>
						    <li><strong>&iquest;Qu&eacute; reg&iacute;menes tengo disponibles? </strong></li>
						    <li class="drop">
						    	Las reservas de habitaci&oacute;n pueden realizarse en r&eacute;gimen de S&oacute;lo Alojamiento, Alojamiento y Desayuno de tipo Buffete, Media Pensi&oacute;n a elegir 
								almuerzo o cena, o Pensi&oacute;n Completa.<br/><br/>
								En algunas fechas la disponibilidad de pensi&oacute;n puede estar limitada. 
						    </a></li>
						 
						</ul>
						
						<ul>
						    <li><strong>&iquest;Cu&aacute;les son los Horarios de Entrada y Salida de la Habitaci&oacute;n? </strong></li>
						    <li class="drop">
						    	Seg&uacute;n la ley de alojamientos en la Comunidad Valenciana, el huesped podr&aacute; tener disponible su habitaci&oacute;n a partir de las 16:00 horas, y deber&aacute;
								 abandonar la misma antes de las 12:00 horas del d&iacute;a de salida.
								 <br/><br/>
								 En el Hotel Huerto del Cura, dependiendo de la disponibilidad, intentamos tener disponibles las habitaciones unas horas antes, y dentro de lo posible, prolongar la estancia 
								 hasta las 16:00 horas. 
								 <br/><br/>
								 Consultanos disponibilidad seg&uacute;n fecha. 
						    </li>
						 
						</ul>
						
						<ul>
						    <li><strong>&iquest;Debo dejar un n&uacute;mero de tarjeta de cr&eacute;dito? </strong></li>
						    <li class="drop">
						    	Si, se trata de una pr&aacute;ctica globalizada en todo el mundo.
								<br/><br/>
								El Hotel no realizar&aacute; cargo alguno sobre el n&uacute;mero de tarjeta por cuenta propia, se trata &uacute;nicamente de una garant&iacute;a ante posibles roturas 
								e incidencias. 
						    </li>
						 
						</ul>
						
						<ul>
						    <li><strong>&iquest;Qu&eacute; servicios tengo disponibles desde la habitaci&oacute;n?</strong></li>
						    <li class="drop">
						    	Desde la Habitaci&oacute;n podr&aacute;s solicitar servicio de habitaciones, servicios de restaurante y cafeter&iacute;a, tratamientos oais Zen Garden o contactar con otros departamentos 
								como el de Eventos ante cualquier inter&eacute;s.
								<br/><br/>
								As&iacute; mismo consulta en recepci&oacute;n nuestras excursiones y servicios asociados para disfrutar de Elche.  
						    </li>
						 
						</ul>
						
						<ul>
						    <li><strong>&iquest;Qu&eacute; formas de pago tengo? </strong></li>
						    <li class="drop">
						    	El Hotel Acepta pago en Efectivo, Transferencia Bancaria o Tarjeta de Cr&eacute;dito Visa, Dinners Club, Red 6000 y American Express.
								<br/><br/>
								No se aceptan talones o cheques. 
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>&iquest;Hay Wifi en las Habitaciones? </strong></li>
						    <li class="drop">
						    	Si, disponemos de servicio Wifi de cortes&iacute;a en todo el recinto.   
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>&iquest;Hay canales de televisi&oacute;n en varios idiomas?</strong></li>
						    <li class="drop">
						    	Si, disponemos de televisi&oacute;n Sat&eacute;lite con m&aacute;s de 40 canales, entre los que contamos con televisiones en idioma Ingl&eacute;s, Franc&eacute;s, Alem&aacute;n, Italiano y Ruso. 
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>&iquest;Se permiten animales? </strong></li>
						    <li class="drop">
						    	En el Hotel Huerto del Cura no est&aacute; permitido el acceso a animales.
								<br/><br/>
								Si desea viajar con su mascota, podemos ayudarle a encontrar una guarder&iacute;a de mascotas en la ciudad.   
						    </li>
						 
						</ul>-->
						
						
					</div>
				</div>
				</article>
<div class="fix"></div>
		
		<!--<article id="blog">
		<h2>Blog</h2>
				<?php query_posts( 'posts_per_page=3' ); ?>
				<?php while (have_posts()) : the_post(); ?>
				<article <?php post_class(); ?>>
					<a href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'homepage-thumb' ); } ?></a>
					<div class="titulo-excerpt"><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3></div>
					<p><?php echo ''.custom_excerpt(); ?>...</p>
					<div class="leer-mas" ><a href="<?php the_permalink(); ?>">LEER M&Aacute;S</a></div>
				</article>
				
		</article>
		<?php endwhile; ?>-->
<div class="fix"></div>

</section><!--Fin de Contenido-medio-->

	<?php get_footer(); ?>