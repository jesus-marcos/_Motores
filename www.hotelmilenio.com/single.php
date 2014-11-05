<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header(); ?>

<section id="slider">
	
	<section id="" class="mid-width">
			<article class="blog-izq">
			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'contenido', get_post_format() ); ?>


			<?php endwhile; // end of the loop. ?>
		</article>
		<div id="sidebar">
		<?php get_sidebar();?>
		</div>
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