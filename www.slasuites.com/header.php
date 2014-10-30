<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <?php if(''!=st_get_setting('site_favicon','')): ?>
    <link rel="shortcut icon" href="<?php echo esc_attr(st_get_setting('site_favicon')); ?>" />
    <?php endif; ?>
    <!-- Mobile Specific -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1" />
    <?php /*
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,900,700,500,300' rel='stylesheet' type='text/css'> 
    */ ?>


    <title><?php st_title(); ?></title>
    <!-- Browser Specical Files -->
    <!--[if lt IE 9]><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
    <!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->  
    <?php wp_head(); ?>

    <link href="/lztic/flick/jquery-ui-1.10.4.custom.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="http://js.miraiglobal.com/revalidate/bookingentranceLine.css" />

      <!-- desactivados estilos de datepicker en styles del padre -->
      <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

     <script>

    jQuery(document).ready(function( $ ) {
      $( "#start_date,#end_date" ).datepicker({
         showOn: "button",
         buttonImage: "/lztic/calendar.png",
         buttonImageOnly: true,
         dateFormat: "d-m-yy",
         navigationAsDateFormat: true,
         minDate: "+0d",
        <?php  if(qtrans_getLanguage()=="es"){ ?>
            firstDay:1,
            dayNamesMin : ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
             monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'] ,
         <?php } ?>
            
        changeMonth: true,
        changeYear: true,
        onSelect: function( selectedDate ) {

            

            var option = this.id == "start_date" ? "minDate" : "maxDate",

                instance = jQuery( this ).data( "datepicker" ),
                date = jQuery.datepicker.parseDate(instance.settings.dateFormat || jQuery.datepicker._defaults.dateFormat, selectedDate, instance.settings );

                if(this.id =="start_date"){ 
                    jQuery("#end_date").datepicker("option","minDate",jQuery("#start_date").val())

                    fecha = selectedDate.split("-")
                     diasig = new Date(fecha[2]+"/"+fecha[1]+"/"+fecha[0])
                     console.log(diasig)
                    diasig.setDate(diasig.getDate()+1)
                    console.log(diasig)
            //        jQuery("#end_date").datepicker("option","default",diasig)
                    jQuery("#end_date").datepicker("setDate",diasig) 
                   
                } else{
                //    jQuery("#start_date").datepicker("option","maxDate",jQuery("#end_date").val())
                }
                jQuery(this).datepicker("hide")

               }

        });


      });

      </script>


</head>

<body <?php body_class(); ?> >

   <div class="body-outer-wrapper">
    <div class="body-wrapper <?php echo st_boxed_class(); ?>">
        
        <header id="header" class="header-container-wrapper">

            <div class="top-bar-outer-wrapper">
                <div class="top-bar-wrapper container">
                    <div class="row">
                        <div class="top-bar-left left">
                             <a href="#" id="top-nav-mobile-a" class="top-nav-close">
                                <span></span>
                            </a>
                            <nav id="top-nav-mobile"></nav>
                            
                            <nav id="top-nav-id" class="top-nav slideMenu">
                                <ul>
                                <?php
                                    $defaults = array(
                                            'theme_location'  => 'Topbar_Navigation',
                                            'container'       => false,
                                            'menu_class'      => 'menu',
                                            'echo'            => true,
                                            'items_wrap'=>'%3$s',
                                         );
                                    wp_nav_menu( $defaults );
                                ?>
                                </ul>
                            </nav>
                        </div>
                        <div class="top-bar-right right">
                          <?php dynamic_sidebar('top_bar_right'); ?>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div><!-- END .top-bar-wrapper -->
            </div> <!-- END .top-bar-outer-wrapper -->
            <div class="header-outer-wrapper">
                <div class="header-wrapper container">
                    <div class="row">
                        <div class="twelve columns b0"> 
                         <div id="cajaTelefono" class="">
                                <span class="telefCabecera"><img src="/lztic/telefono.png" /><a href="tel:+34928514300">+34 928 51 43 00</a> </span>
                                <div class="correoCabecera"><a href="/<?php  echo qtrans_getLanguage(); ?>/contacto/">  info@slasuites.com</a></div>
                                 <div id="cajaIdiomas" >
                                 <div id="flag_move"  class="no_translate">
                                    <?php  echo qtrans_generateLanguageSelectCode('image'); ?>
                                </div>
                            </div>
                            </div>
                            <div class="">
                                <div class="logo-wrapper">
                                    <h1><a href="/<?php  echo qtrans_getLanguage(); ?>/">
                                    <?php if(st_get_setting("site_logo")!=''): ?>
                                    <img src="<?php echo esc_attr(st_get_setting("site_logo")); ?>" alt="<?php  bloginfo('name'); ?>"/></a>
                                    <?php else: ?>
                                     <span class="no-logo"><?php bloginfo('name'); ?></span>
                                    <?php  endif; ?>
                                    </h1>
                                </div>
                            </div>
                           
                          
                            <div class="header-right menuPrincipal">
                                <a href="#" id="primary-nav-mobile-a" class="primary-nav-close">
                                    <span></span>
                                    <?php _e('Main Navigation','smooththemes'); ?>
                                </a>
                                <nav id="primary-nav-mobile"></nav>
                            
                                 <?php st_head_reservation_btn(); ?>
                                <nav id="primary-nav-id" class="primary-nav slideMenu">
                                    <ul>
                                     <?php 
                                        $defaults = array(
                                        	'theme_location'  => 'Primary_Navigation',
                                        	'container'       => false,
                                            'container_class' => false,
                                            'items_wrap'=>'%3$s',
                                        	'echo'            => true
                                        );
                                       wp_nav_menu( $defaults );
                                        ?>
                                       </ul>
                                </nav>
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div><!-- END .header-wrapper -->
            </div><!-- END .header-outer-wrapper -->
        </header> <!-- END .header-container-wrapper -->
<div class="formreservasfluido">
        <div class="page-content single-portfolio-wrapper  row clearfix">
    <?php 
  $idiAct = qtrans_getLanguage();
      $textos= array();
   $textos["es"] = array("titulo"=>"Reserva Online ","llegada"=>"Llegada","salida"=>"Salida", "adultos"=>"Adultos", "ninos"=>"Niños","preciominimo"=>"Precio mínimo garantizado.","enviar"=>"Ver disponibilidad","codprom"=>"Cod. Promo ");

   $textos["en"] = array("titulo"=>"Online Booking","llegada"=>"Arrival","salida"=>"Departure", "adultos"=>"Adults", "ninos"=>"Children","preciominimo"=>"Guaranteed minimum Price","enviar"=>"Check availability","codprom" => "Promo Code");
   
   $textos["de"] = array("titulo"=>"Online Reservierung","llegada"=>"Ankunft","salida"=>"Abreise", "adultos"=>"Erwachsene", "ninos"=>"Kinder ","preciominimo"=>"Garantierter Mindestpreis","enviar"=>"Verfügbarkeit prüfen","codprom" => "Promo-Code");
   $textos["fr"] = array("titulo"=>"Resérver","llegada"=>"Date d'arrivée","salida"=>"Sortie", "adultos"=>"Adultos", "ninos"=>"Enfant","preciominimo"=>"Prix Minimum online Garanti ","enviar"=>"Envoyer","codprom" => "Code Promotion");

    ?>     
	
	
	<?php if (!is_user_logged_in()) { ?>
            <div id="cajaFormreserva">
              <h2> <?php echo $textos[$idiAct]["titulo"]; ?></h2>
			  
              <form id="FormReservas" name="FormReservas" action="https://www.thebookingbutton.co.uk/properties/aequoradirect" method="get" target="_self">

                <input type="hidden" name="currency" value="EUR" />
                <input type="hidden" name="locale" value="<?php echo $idiAct; ?>" />
                <div class="start_date_wrap">
                    <label for="start_date" class="start_date_label"><?php echo $textos[$idiAct]["llegada"]; ?></label>
                    <input type="text" id="start_date" name="start_date" value="" />
                </div>
                <div class="end_date_wrap">
                    <label for="start_date" class="end_date_label"><?php echo $textos[$idiAct]["salida"]; ?></label>
                    <input type="text" id="end_date" name="end_date" value="" />
                </div>
         <!--        <div class="widget_select_wrap">
                    <label for="number_adults" class="widget_select_label"><?php echo $textos[$idiAct]["adultos"]; ?></label>
                    <select name="number_adults">
                        <option value="1">1</option>
                        <option selected="selected" value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div class="widget_select_wrap">
                    <label for="number_children" class="widget_select_label"><?php echo $textos[$idiAct]["ninos"]; ?></label>
                    <select name="number_children">
                        <option selected="selected" value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div> -->
                <div class="end_date_wrap">
                <label for = "promotion_code" ><?php echo $textos[$idiAct]["codprom"]; ?> </label>
                <input type="text" name="promotion_code" id="promotion_code" value="" />
            </div >
            <div class="botonRes"><input type="submit" value="<?php echo $textos[$idiAct]["enviar"]; ?>" id="ver_dispo" /></div>
            <div class="preciominimo"><a href="/<?php echo $idiAct; ?>/formulario-garantia-mejor-precio-online/"><img src="/lztic/euro.png" /><?php echo $textos[$idiAct]["preciominimo"]; ?></a></div>
            </form>
			
			<?php } else { ?>

				<div id="motor">
				<h2> <?php echo $textos[$idiAct]["titulo"]; ?></h2>
					<div id="mirai_bookentrance"></div>
						<!-- start bookengine 2010 -->
						<script type="text/javascript">
							if (typeof(mirai_be_params) == "undefined" || !mirai_be_params) {
							  mirai_be_params={};
							}
							mirai_be_params.idhotel=100375690;
							mirai_be_params.lang="<?php echo $idiAct; ?>";
							mirai_be_params.hsri="02040";
							mirai_be_params.doctype="xhtml";
							mirai_be_params.datepicker_months_number=3;
						</script>
						<script type="text/javascript" src="http://js.miraiglobal.com/be_dependencies.js"></script>
						<script type="text/javascript">
							mjQuery = $.noConflict(true);
							bookingEntrance.loadBookingEntrance();
							jQuery('#mirai_be5').html('Promo:');
						</script>
						<!-- end bookengine 2010 -->
						<div class="preciominimo"><a href="/<?php echo $idiAct; ?>/formulario-garantia-mejor-precio-online/"><img src="/lztic/euro.png" /><?php echo $textos[$idiAct]["preciominimo"]; ?></a></div>
				</div>
				
				
			<?php } ?>

            </div>
       
    </div>
</div>