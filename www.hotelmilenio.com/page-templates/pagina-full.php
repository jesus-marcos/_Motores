<?php
/**
 * Template Name: Pagina FULL WIDTH
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
			<?php get_template_part( 'habitaciones-page' ); ?>
			<?php endwhile; // end of the loop. ?>
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
				<?php endwhile; ?>
		</article>-->

<div class="fix"></div>

</section><!--Fin de Contenido-medio-->

	<?php get_footer(); ?>