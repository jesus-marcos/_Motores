<?php
/**
 * Template Name: home con pie
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
		
	<section id="slider">
			
		<div class="hot-potatoe">
			<h2><a href="<?php the_field('enlace_promocion_destacada'); ?>"><?php the_field('promocion_destacada'); ?></a></h2>
		</div>
		<?php echo do_shortcode( '[responsive_slider]' ); ?>
		<!--<a href="http://www.hotelmilenio.com/promociones/" id="sanvalentin">
				<img class="promo-destacada" src="<?php bloginfo('template_directory'); ?>/images/banner/HJM-GIF.gif" title="" width="1000" height="125"/> 
		</a>-->
	</section><!--Fin de Contenedor-->
	<a href="tel:+34651123452" title="+ 34 651 123 452" id="preguntanos">Pregúntanos</a>
	<div id="secciones-home">
		<article id="ocio">
			<a href="<?php the_field('link_seccion_eventos'); ?>">
				<img src="<?php the_field( "foto_eventos_home" ); ?>">
				<div class="acceder-btn">
					<h3><?php the_field( "titulo_eventos_home" ); ?></h3>
				</div><!-- acceder-btn -->
			</a>
			<p><?php the_field( "descripcion_eventos_home" ); ?></p>
		</article><!--Fin de ocio-->
		<article id="businesss">
			<a href="<?php the_field('link_seccion_business'); ?>">
				<img src="<?php the_field( "foto_business" ); ?>">
				<div class="acceder-btn">
					<h3><?php the_field( "titulo_business" ); ?></h3>
				</div><!-- acceder-btn -->
			</a>
			<p><?php the_field( "descripcion_business" ); ?></p>
		</article><!--Fin de Business-->
		<article id="gastronomia">
			<a href="<?php the_field('link_seccion_gastronomia'); ?>">
				<img src="<?php the_field( "foto_gastronomia" ); ?>">
				<div class="acceder-btn">
					<h3><?php the_field( "titulo_gastronomia" ); ?></h3>
				</div><!-- acceder-btn -->
			</a>
			<p><?php the_field( "descripcion_gastronomia" ); ?></p>
		</article><!--Fin de gastronomía-->
	</div>
	<div class="fix"></div>
	<div id="elche">
		<h2><?php the_field( "titulo_elche" ); ?></h2>
		<div id="mapa-home">
			<iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.es/maps?f=q&amp;source=s_q&amp;hl=es&amp;geocode=&amp;q=Elche&amp;aq=0&amp;oq=elche&amp;sll=38.357841,-0.472524&amp;sspn=0.101495,0.264187&amp;ie=UTF8&amp;hq=&amp;hnear=Elche,+Alicante,+Comunidad+Valenciana&amp;t=m&amp;ll=38.265883,-0.68347&amp;spn=0.032347,0.054932&amp;z=14&amp;iwloc=A&amp;output=embed"></iframe>
		</div>
		<article id="descripcion-mapa">
			<p><?php the_field( "texto_elche" ); ?></p>
				<div id="boton-mapa">
					<a href="<?php the_field( "enlace_boton_elche" ); ?>"><span><?php the_field( "texto_boton_elche" ); ?></span></a>
				</div>
		</article>
	</div>
	<div class="fix"></div>
		<article id="galeria">
			<h2>Galeria</h2>
			 <?php echo pseo_generate_html(); ?>
		</article>
		
		

<div class="fix"></div>




	<?php get_footer(); ?>