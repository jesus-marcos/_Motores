<?php
/**
 * Template Name: Descubre
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
	
	
	<div class="mid-width">
		
			<div id="titulo-pagina">
			<?php while ( have_posts() ) : the_post(); ?>
			<h2 class="titulo-pagina-servicios"><?php the_title(); ?></h2>
			</div>
			<div id="descubre-slider">
				<?php the_field('img_slide_descubre'); ?>
				
			</div>
			<section id="descubre-texto">
				<?php the_field('descubre_txt'); ?>
			</section>
		</article>
		<div class="bloques">
			<div class="descubre-botones">
				<a href="<?php the_field('enlace_fines_semana'); ?>" class="descubre-head-btn" id="fines-semana-d">Escapadas</a>
				<?php the_field('section_fines_semana_txt'); ?>
				<a class="read-more" href="<?php the_field('enlace_fines_semana'); ?>">Leer más</a>
			</div>
			<div class="descubre-botones">
				<a href="<?php the_field('enlace_vacaciones'); ?>" class="descubre-head-btn" id="vacaciones-d">Vacaciones</a>
				<?php the_field('section_vacaciones_txt'); ?>
				<a class="read-more" href="<?php the_field('enlace_vacaciones'); ?>">Leer más</a>
			</div>
			<div class="descubre-botones">
				<a href="<?php the_field('enlace_eventos'); ?>" class="descubre-head-btn" id="eventos-d">Eventos</a>
				<?php the_field('section_eventos_txt'); ?>
				<a class="read-more" href="<?php the_field('enlace_eventos'); ?>">Leer más</a>
			</div>
		</div><!-- #bloques -->
		<div class="bloques">
			<div class="descubre-botones">
				<a href="<?php the_field('enlace_gastronomia'); ?>" class="descubre-head-btn" id="gastronomia-d">Gastronomía</a>
				<?php the_field('section_gastronomia_txt'); ?>
				<a class="read-more" href="<?php the_field('enlace_gastronomia'); ?>">Leer más</a>
			</div>
			<div class="descubre-botones">
				<a href="<?php the_field('enlace_salud'); ?>" class="descubre-head-btn" id="salud-d">Salud</a>
				<?php the_field('section_salud_txt'); ?>
				<a class="read-more" href="<?php the_field('enlace_salud'); ?>">Leer más</a>
			</div>
			<div class="descubre-botones">
				<a href="<?php the_field('enlace_servicios'); ?>" class="descubre-head-btn" id="servicios-d">Servicios</a>
				<?php the_field('section_servicios_txt'); ?>
				<a class="read-more" href="<?php the_field('enlace_servicios'); ?>">Leer más</a>
			</div>
		</div><!-- bloques -->
	</div>
	<div class="fix"></div>
	</section>
	<?php endwhile; // end of the loop. ?>
		
	<?php get_footer(); ?>