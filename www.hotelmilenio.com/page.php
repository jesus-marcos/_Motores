<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
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
				<?php the_content(); ?>
			</article>
			<?php endwhile; // end of the loop. ?>
	</section>
	<?php get_footer(); ?>