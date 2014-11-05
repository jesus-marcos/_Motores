<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header(); ?>

	<section id="slider">
	
	<div id="reservas" class="mid-width"></div><!--Fin de reservas-->	

	<section id="contenedor" class="mid-width">
		<div id="titulo-pagina">
		<h2>Blog</h2>	
			<div class="featured_post">
			<?php $my_query = new WP_Query('category_name=destacados&showposts=1');
			while ($my_query->have_posts()) : $my_query->the_post();
			$do_not_duplicate = $post->ID; ?>
				<article <?php post_class(); ?>>
					<div id="img-blog">
					<a href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'blog-thumb' ); } ?></a>	
					</div>
					<div id="texto-blog">
					<div class="titulo-featured"><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3></div>
					<p class="fecha"><time datetime="<?php echo date(DATE_W3C); ?>" pubdate class="updated"><?php the_time('j F Y') ?></time>
					</p>
					<p><?php echo ''.featured_excerpt(); ?></p>
					</div>
					<div class="leer-mas-featured" ><a href="<?php the_permalink(); ?>">LEER M&Aacute;S</a></div>
				</article>
			<?php endwhile; ?>
			</div><!--Fin Featured POST-->

		<article id="blog">
				<?php
				$limit = get_option('posts_per_page');
				query_posts('showposts=' . $limit . '&paged=' . $paged .'&cat=-2'); ?>
				<?php if (have_posts()) : ?><?php while (have_posts()) : the_post(); ?>
				<article <?php post_class(); ?>>
					<a href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'homepage-thumb' ); } ?></a>
					<div class="titulo-excerpt"><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3></div>
					<p><?php echo ''.custom_excerpt(); ?>...</p>
					<div class="leer-mas" ><a href="<?php the_permalink(); ?>">LEER M&Aacute;S</a></div>
				</article>
				<?php endwhile; endif; ?>
		</article>
		<?php twentytwelve_content_nav( 'nav-below' ); ?>


<div class="fix"></div>
		<article id="boletin">
			<h2>Newsletter</h2>
				<img src="<?php bloginfo('template_url'); ?>/images/logo-hsc-newsletter.jpg" width="198" height="67">
				<div id="form-boletin">
					<form>
						<p>Suscr&iacute;bete a nuestro bolet&iacute;n</p>
						<input type="text" value="E-mail"/>
						<div class="sombra">
						<input type="submit" value="ENVIAR"/>
						</div>
					</form>
				</div>
		</article><!--Fin de Boletin-->
<div class="fix"></div>
</section><!--Fin de Contenedor-->
<?php get_footer(); ?>