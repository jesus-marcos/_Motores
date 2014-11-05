<?php
/**
 * Template Name: Resturante
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
			<?php while ( have_posts() ) : the_post(); ?>
			<div id="titulo-pagina">
				<h2><?php the_title(); ?></h2>
			</div>
			<article>
				<div id="slide-restaurante">
					<?php the_field('slide'); ?>
				</div>
				
				<div id="botones-restaurante">
					<?php if(get_field('botones-restaurante')): ?>
					<ul id="btn-catering">		
 						<?php while(has_sub_field('botones-restaurante')): ?>
							<li class="btn-download-catering">
								<a href="<?php the_sub_field('boton-resturante'); ?>" title="descargar">
									<?php the_sub_field('txt-boton-restaurante'); ?>
								</a>
							</li>
						<?php endwhile; ?>
					</ul>	
				<?php endif; ?>
				</div>
				<div style="clear:both;"></div>
				<a href="mailto:restaurante@hotelmilenio.com" title="Reservar" class="botonegro">Reservar</a>
				<div style="clear:both;"></div>
				<?php the_content(); ?>
			</article>
			<?php endwhile; // end of the loop. ?>
	</section>
	<?php get_footer(); ?>
	
	
	
	