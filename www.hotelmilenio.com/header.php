<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<script type="text/javascript" src="<?php bloginfo('stylesheet_directory'); ?>/js/preg-freq.js"></script>
	<script src="<?php bloginfo('stylesheet_directory'); ?>/js/idiomas.js" type="text/javascript"></script>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<meta name="description" content="Hotel Jardin Milenio 4 estrellas en Elche, Disfruta de un Oasis de relajacion. " />
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico">
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/retina.js"></script>

<link rel='stylesheet' href='http://js.miraiglobal.com/revalidate/bookingentranceSquare.css' type='text/css'/>
<link rel="stylesheet" type="text/css" href="http://js.miraiglobal.com/revalidate/mirai_bookingProcess.css" />



<?php // Loads HTML5 JavaScript file to add support for HTML5 elements in older IE versions. ?>
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js" type="text/javascript"></script>
<![endif]-->

<!-- MIRAI ASYNC ANALYTICS BEGIN --> 
        <script type="text/javascript"> 
             var _gaq = _gaq || []; 
             _gaq.push(['_setAccount', 'UA-23611101-1']); 
             _gaq.push(['_setDomainName', 'none']); 
             _gaq.push(['_setAllowLinker', true]); 
             (function() { 
             var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; 
             ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
             var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); 
             })(); 
        </script> 
    <!-- MIRAI ASYNC ANALYTICS END --> 
    <!--[if lt IE 9]>
    <script src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js' type='text/javascript'></script>
    <![endif]-->
    <!--[if gte IE 9]><!-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script src="<?php bloginfo('stylesheet_directory'); ?>/js/functions.js" type="text/javascript"></script>
    <script src="<?php bloginfo('stylesheet_directory'); ?>/js/preg-faqs.js" type="text/javascript"></script>
    <!--<![endif]-->
    

<?php wp_head(); ?>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.slides.min.js"></script>	
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.fancybox.pack.js"></script>	


<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/css/jquery.fancybox.css" type="text/css" media="screen" />
</head>

<body <?php body_class(); ?>>
<div id="fixed-header" class="header">
    <header id="header">
         <a href="<?php echo home_url(); ?>/" class="shrink-logo"><img src="<?php bloginfo('template_directory'); ?>/images/logo-little.png" width="25" height="25" alt="Hotel Jardín Milenio"></a>
        <select id="idiomas" onchange="cambiarIdioma(this.options[this.selectedIndex].value);">
			<option value="1"selected="selected" >ES</option>
			<option value="2" >FR</option>
			<option value="3">EN</option>
			<option value="4">RU</option>
        </select>
		 <nav id="menu-principal" class="main-navigation" role="navigation">
            <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
        </nav><!-- #menu-principal -->
    </header><!-- .header -->
</div><!-- .fixed-header -->
<section id="contenedor" class="contenedor-all">
<div id="page" class="hfeed site">
	<header id="main-header" class="mid-width">
		<div id="logo">
            <a href="<?php echo home_url(); ?>/" class="logo-main"><img src="<?php bloginfo('template_directory'); ?>/images/logo.png" alt="Hotel Jardín Milenio"></a>
        </div>
		<select id="idiomas" onchange="cambiarIdioma(this.options[this.selectedIndex].value);">
			<option value="1"selected="selected" >ES</option>
			<option value="2" >FR</option>
			<option value="3">EN</option>
			<option value="4">RU</option>
        </select>
		<aside class="widget widget_qtranslate" id="qtranslate-3">
					<ul id="qtranslate-3-chooser" class="qtrans_language_chooser">
						<li class="lang-es active"><a class="qtrans_flag qtrans_flag_es" title="Espa&ntilde;ol" hreflang="es" href="http://www.hotelmilenio.com/"><span style="display:none">Espa&ntilde;ol</span></a></li>
						<li class="lang-en"><a class="qtrans_flag qtrans_flag_en" title="English" hreflang="en" href="http://www.hotelmilenio.co.uk/"><span style="display:none">English</span></a></li>
						<li class="lang-fr"><a class="qtrans_flag qtrans_flag_fr" title="Fran&ccedil;ais" hreflang="fr" href="http://www.hotelmilenio.fr/"><span style="display:none">Fran�ais</span></a></li>
						<li class="lang-nl"><a class="qtrans_flag qtrans_flag_nl" title="Russian" hreflang="nl" href="http://www.hotelmilenio.ru/"><span style="display:none">Ruso</span></a></li>
					</ul><div class="qtrans_widget_end"></div></aside>
					<span id="tlf">Informaci&oacute;n y reservas: +34 966 612 033</span>
		<nav id="menu-principal" class="main-navigation" role="navigation">
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
		</nav><!-- #menu-principal -->
		<div id="reservas">
		
		<div id="mirai_bookentrance"></div> 
    <script type="text/javascript"> 
            if (typeof(mirai_be_params) == "undefined" || !mirai_be_params) { 
              mirai_be_params={}; 
            } 
            mirai_be_params.idhotel=100124261; 
            mirai_be_params.lang="es"; 
            mirai_be_params.hsri="02040"; 
            mirai_be_params.doctype="xhtml"; 
            mirai_be_params.datepicker_months_number=2;
			mirai_be_params.bookinghost = 'http://www.hotelmilenio.com';
    </script> 
    <script type="text/javascript" src="http://js.miraiglobal.com/be_dependencies.js"></script> 
    <script type="text/javascript"> 
            mjQuery = $.noConflict(true); 
            bookingEntrance.loadBookingEntrance(); 
    </script> 
		
	</div><!--Fin de reservas-->
	</header><!-- #header-->
<div class="fix"></div>
