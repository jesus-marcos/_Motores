<?php
/**
 * Template Name: SERVICIOS
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
		<h2 class="titulo-pagina-servicios"><?php the_title(); ?></h2>
		<div id="descubre-slider">
			<img src="<?php the_field( "imagen_banner" ); ?>">
		</div>
		<section id="descubre-texto">
			<h3><?php the_field( "titulo_de_la_seccion_descubre" ); ?></h3>
			<p><?php the_field( "texto_descubre" ); ?></p>
		</section>
	</article>
	<!--<div id="descubre-botones">
		
		<?php wp_nav_menu( array('menu' => 'Descubre' )); ?>
<?php /*
		<a href="<?php bloginfo('url'); ?>/servicios" title="Servicios" class="descubre-botones" >Servicios</a>
		<a href="<?php bloginfo('url'); ?>/bodas-y-banquetes" title="Bodas y Banquetes" class="descubre-botones bodas">Bodas y Banquetes</a>
		<a href="<?php bloginfo('url'); ?>/empresas" title="Empresas" class="descubre-botones">Empresas</a> */ ?>
	</div>-->
	<div class="fix"></div>
	<section id="post">
		<div id="titulo-pagina">
			<h2><?php the_title(); ?></h2>
		</div>
		<?php get_template_part( 'habitaciones-page' ); ?>
			<?php endwhile; // end of the loop. ?>
			

	</section>
<div class="fix"></div>
		<!--<article id="boletin">
			<h2>Newsletter</h2>
				<img src="<?php bloginfo('template_url'); ?>/images/logo-hsc-newsletter.jpg">
				<div id="form-boletin">
					<form>
						<p>Suscr&iacute;bete a nuestro bolet&iacute;n</p>
						<input type="text" value="E-mail"/>
							<div class="sombra">
						<input type="submit" value="ENVIAR"/>
						</div>
					</form>
				</div>
		</article>Fin de Boletin-->
		<article id="blog">
		<!--<h2>Blog</h2>
				<?php query_posts( 'posts_per_page=3' ); ?>
				<?php while (have_posts()) : the_post(); ?>
				<article <?php post_class(); ?>>
					<a href="<?php the_permalink() ?>"><?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'homepage-thumb' ); } ?></a>
					<div class="titulo-excerpt"><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3></div>
					<p><?php echo ''.custom_excerpt(); ?>...</p>
					<div class="leer-mas" ><a href="<?php the_permalink(); ?>">LEER M&Aacute;S</a></div>
				</article>
				
		</article>-->
		<?php endwhile; ?>

<div class="fix"></div>

</section><!--Fin de Contenido Medio-->
</section>
	<?php get_footer(); ?>