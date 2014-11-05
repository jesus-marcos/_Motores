<?php
/**
 * Template Name: Espacio individual
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
				<h2><a href="http://www.hotelmilenio.com/espacios" title="Descubre">Espacios</a> / <?php the_title(); ?></h2>
			</div>
			<!--<img src="<?php the_field('img-espacio'); ?>" width="900" height="275" />-->
			<?php while ( have_posts() ) : the_post(); ?>
				<article class="text">
					<?php the_content(); ?>
				</article><!-- .text -->
			<?php endwhile; // end of the loop. ?>	
			<?php if(get_field('galeria')): ?>
			<section id="galeria">
				<ul>
					<?php $i = 0;
						while(has_sub_field('galeria')): ?>
					  		<li <?php echo ( (get_sub_field('¿destacada?') == 0 )? 'class="destacada"' : ''); ?>>
					  			<a class="fancybox-thumb" rel="fancybox-thumb" href="<?php the_sub_field('imagen_galeria'); ?>" title="<?php the_sub_field('title_imagen_galeria'); ?>">
					  				<img src="<?php the_sub_field('imagen_galeria'); ?>" alt="<?php the_sub_field('alt_imagen_galeria'); ?>" width="100" height="100" />
					  			</a>
					  		</li>
				 	<?php $i++;
				 		endwhile; ?>
				</ul>
			</section>
			<?php endif; ?>
			<img src="<?php the_field('plano-espacio'); ?>" width="900" height="500" />
			<h3>Distribuciones del espacio:</h3>
			
			<?php if( get_field('distibucion-espacio') ): ?>
 				<ul id="distribucion">
				<?php while( has_sub_field('distibucion-espacio') ): ?>
			 		<li>
						<img src="<?php the_sub_field('icono-distribucion'); ?>" alt="<?php the_sub_field('nombre-distribucion'); ?>" width="" height=""/>
						<h3><?php the_sub_field('nombre-distribucion'); ?></h3>
						<p><?php the_sub_field('descripcion-distribucion'); ?></p>
					</li>		 
				<?php endwhile; ?>
			 	</ul>
			<?php endif; ?>
		</section>
	<?php get_footer(); ?>
