<?php
/**
 * Template Name: Gastronomia
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

<section id="">
	
	
	<div class="mid-width">
		<section id="">

			<div id="titulo-pagina">
				<h2><a href="http://www.dinamicserver.com/demo/hotelhuertodelcura/descubre" title="Descubre">Descubre</a> / <?php the_title(); ?></h2>
			</div>
			<?php while ( have_posts() ) : the_post(); ?>
			<article class="espacios">
				<div class="slide">
					<?php the_field('campo_slide_evento'); ?>
					<a href="<?php the_field('boton_descarga_1'); ?>" class="btn-download">
						<?php the_field('texto_boton_descarga_1'); ?>
					</a>
					<a href="<?php the_field('boton_descarga_2'); ?>" class="btn-download">
						<?php the_field('texto_boton_descarga_2'); ?>
					</a>
					<a href="<?php the_field('web_link'); ?>" class="btn-download">
						<?php the_field('web_link_txt'); ?>
					</a>
				</div>
				<div class="texto-espacios">
					<?php the_field('campo_texto_evento'); ?>
				</div><!-- .texto-espacios -->
			</article><!-- .espacios -->
			<article class="espacios">
			
				<div class="texto-full">
					<?php the_field('campo_texto_evento_full'); ?>
				</div><!-- .texto-espacios -->
				<h3>Preguntas Frecuentes</h3>
				<div id="container">
					 <div id="dropdown">
						
						<?php if(get_field('faq-eventos')): ?>
							
 								<?php while(has_sub_field('faq-eventos')): ?>
								<ul class="bloque">
									<li class="pregunta"><strong><?php the_sub_field('pregunta-eventos'); ?></strong></li>
									<li class="drop respuesta">
						    			<?php the_sub_field('respuesta-eventos'); ?> 
						    		</li>
								</ul>
								<?php endwhile; ?>
							
						<?php endif; ?>

					</div>
				</div>
			</article><!-- .espacios -->
			
					
			
			
			<?php endwhile; // end of the loop. ?>
		
	<?php get_footer(); ?>