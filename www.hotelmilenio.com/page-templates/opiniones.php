<?php
/**
 * Template Name: Opiniones
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
			<h2><?php the_title(); ?></h2>
		</div>
		<?php while ( have_posts() ) : the_post(); ?>
		<?php 
 			// check for rows (parent repeater)
			if( get_field('opiniones') ): ?>
				<section class="grupo-opiniones">
				<?php 

				// loop through rows (parent repeater)
				while( has_sub_field('opiniones') ): ?>
					<h3><?php the_sub_field('year_group'); ?></h3>
						<?php 

						// check for rows (sub repeater)
						if( get_sub_field('opinion_group') ): ?>
							<?php 

							// loop through rows (sub repeater)
							while( has_sub_field('opinion_group') ): 

								// display each item as a list - with a class of completed ( if completed )
								?>
								<article class="opinion">
									<blockquote>
									<?php the_sub_field('opinion'); ?>
									</blockquote>
								</article>
							<?php endwhile; ?>
						<?php endif; //if( get_sub_field('items') ): ?>
					
				<?php endwhile; // while( has_sub_field('to-do_lists') ): ?>
				
				</section><!-- #grupo-opiniones -->

			<?php endif; // if( get_field('to-do_lists') ): ?>

		<?php endwhile; // end of the loop. ?>
		
	<?php get_footer(); ?>