<?php
/**
 * Template Name: Espacios
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

<section id="espacios">
	
	
	<div class="mid-width">
		<section id="contenedor">

			<div id="titulo-pagina">
				<h2><a href="http://www.hotelmilenio.com/eventos" title="Eventos">Eventos</a> / <?php the_title(); ?></h2>
			</div>
				<?php while ( have_posts() ) : the_post(); ?>

				<article class="text">
					<?php the_content(); ?>
				</article><!-- .text -->
			<?php endwhile; // end of the loop. ?>
<?php if(get_field('espacios')): ?>
 
	<ul>
 
	<?php while(has_sub_field('espacios')): ?>
 
		<li>
			<a href="<?php the_sub_field('link-espacio'); ?>" title="Ver Espacio">
				<img src="<?php the_sub_field('imagen-espacio'); ?>" width="275" height="275" />
				<h3><?php the_sub_field('nombre-espacio'); ?></h3>
			</a>
		</li>
 
	<?php endwhile; ?>
 
	</ul>
 
<?php endif; ?>
			


		
	<?php get_footer(); ?>