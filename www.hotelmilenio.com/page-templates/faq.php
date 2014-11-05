<?php
/**
 * Template Name: Preguntas Frecuentes
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
		<section id="contenido-medio">

			<div id="titulo-pagina">
				<h2><?php the_title(); ?></h2>
			</div>
		
			<article class="espacios">
			
				
				<div id="container">
					 <div id="dropdown">
						<?php if(get_field('faq')): ?>
							
 								<?php while(has_sub_field('faq')): ?>
								<ul class="bloque">
									<li class="pregunta"><strong><?php the_sub_field('pregunta'); ?></strong></li>
									<li class="drop respuesta">
							    		<?php the_sub_field('respuesta'); ?> 
							    	</li>
								</ul>
								<?php endwhile; ?>
							
						<?php endif; ?>
						<!--<ul>
						    <li><strong>Facilidades y Servicios del Hotel:  </strong></li>
						    <li class="drop">
						    	El Hotel Huerto del Cura, cuenta con 81 habitaciones de tipo Bungalow de tres tipolog&iacute;as: Habitaci&oacute;n Doble, Habitaci&oacute;n Superior y Junior Suite.
								<br/><br/>
								Cuenta con Restaurante y Cafeter&iacute;a, servicio de terraza Chill Out en Verano, Desayuno Buffete y servicio de Habitaciones. 
								<br/><br/>
								Dispone de Piscina Tropical, columpios para ni&ntilde;os, salas de reuniones y free wifi en todo el establecimiento.
								<br/><br/>
								Dispone del espacio Oasis Zen Garden, en el que se pueden realizar tratamientos y masajes tanto en el templo zen como en el Jard&iacute;n Zen. 
						    </li>
						</ul>
						
						<ul>
						    <li><strong>Horarios de apertura:</strong></li>
						    <li class="drop">
						    	El Hotel dispone de conserjer&iacute;a 24 horas.
								<br/><br/>
								El desayuno es de 07:00 a 10:30 y el Restaurante y cafeter&iacute;a, abren de 10:00 a 16:00 y de 21:00 a 24:00 horas.  
						    </a></li>
						 
						</ul>
						
						<ul>
						    <li><strong>C&oacute;mo Llegar: </strong></li>
						    <li class="drop">
						    	Desde Alicante ciudad, nacional 332 direcci&oacute;n Murcia o Autov&iacute;a A-7 Direcci&oacute;n Murcia.
								<br/><br/>
								Servicio de autob&uacute;s desde la estaci&oacute;n de Autobuses de Alicante o Tren de cercan&iacute;as Renfe.
								<br/><br/>
								El Hotel se encuentra en el centro de la ciudad, cerca del palacio de Congresos. Desde el Aeropuerto Alicante-Elche, a trav&eacute;s de autob&uacute;s p&uacute;blico con frecuencia cada hora o en taxi. 
						    </li>
						 
						</ul>
						
						<ul>
						    <li><strong>A qui&eacute;n dirigirme ( correos y personas):</strong></li>
						    <li class="drop">
						    	Informaci&oacute;n y Reservas en el Hotel: Laura Llineares <a href="mailto:reservas@Huertodelcura.com" title="mail">reservas@Huertodelcura.com</a>
								<br/><br/>
								Informaci&oacute;n y Reservas del Restaurante: Leopoldo: <a href="mailto:restaurante@huertodelcura.com" title="mail">restaurante@huertodelcura.com</a>
								<br/><br/>
								Informaci&oacute;n y Reservas de Eventos: Bego&ntilde;a Capell&iacute;n: <a href="mailto:eventos@huertodelcura.com" title="mail">eventos@huertodelcura.com </a>
								<br/><br/>
								Acuerdos Comerciales y Empresas: Pedro Navarro  <a href="mailto:comercial@Huertodelcura.com" title="mail">comercial@Huertodelcura.com </a>
						    </li>
						 
						</ul>
						
						<ul>
						    <li><strong>Parking:</strong></li>
						    <li class="drop">
						    	El hotel dispone de Parking-Garaje de pago, teniendo un coste de 12 euros por Noche. Consultar tarifas para m&aacute;s de dos noches. 
						    </li>
						 
						</ul>
						
						<ul>
						    <li><strong>Normas Generales del Hotel:</strong></li>
						    <li class="drop">
						    	El Hotel se reserva el derecho de admisi&oacute;n.
								<br/><br/>
								No est&aacute; permitido realizar acciones o ruidos molestos para los dem&aacute;s huespedes, ni transitar en ropa de ba&ntilde;o por las instalaciones interiores del Hotel. 
								<br/><br/>
								A la llegada al Hotel , se solicitar&aacute; como garant&iacute;a una tarjeta de cr&eacute;dito ante posibles roturas o da&ntilde;os ocasionados.
								<br/><br/>
								No est&aacute; permitido el alojamiento con mascotas ni consumir alimentos y bebidas del exterior por criterio de garant&iacute;a sanitaria. 
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>Club de Clientes "Huerto Social Club": </strong></li>
						    <li class="drop">
						    	El Hotel, cuenta con un club de amigos y clientes denominado <a href="http://www.huertosocialclub.com" title="Huerto Social Club">"Huerto Social Club"</a>.
								<br/>
								Para pertenecer al club y disfrutar de las ventajas del programa, existen dos  v&iacute;as: 
								<br/><br/>
								El Cliente podr&aacute; solicitar el alta en el club a trav&eacute;s del formulario impreso que encontrar&aacute; en recepci&oacute;n o en su habitaci&oacute;n, rellenar todos los campos 
								y depositar en recepci&oacute;n. 
								<br/><br/>
								Los beneficios de pertenencia al club no son acumulables con otras promociones activas.  
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>Oasis Zen Garden: </strong></li>
						    <li class="drop">
						    	Oasis Zen Garden es el nuevo espacio dise&ntilde;ado para la relajaci&oacute;n y en bienestar de los clientes del Hotel. 
								<br/><br/>
								Cuenta un espacio "Jard&iacute;n Zen", en el que podr&aacute;s relajarte, disfrutar de la sauna o reservar un tratamiento relajante en la pagoda, as&iacute; como un espacio
								 "Templo Zen" dotado con tres salas de masajes y tratamientos.
								 <br/><br/>
								Los servicios son previa reserva con m&iacute;nima antelaci&oacute;n de 12 horas. M&aacute;s informaci&oacute;n: <a href="http://www.oasiszengarden.com " title="Oasis Zen Garden">www.oasiszengarden.com </a>
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>Playas:</strong></li>
						    <li class="drop">
						    	El t&eacute;rmino municipal de Elche cuenta con diversas opciones de playa a una distancia aproximada de 10-15 kil&oacute;metros, como la Playa de Arenales del Sol,
								la Playa de El Altet o la playa de El Carabassi, todas ellas de gran belleza natural.
								<br/><br/>
								Se puede acceder en vehiculo propio, en Taxi o durante el periodo de Verano en autob&uacute;s Publico .  
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>Campos de Golf:</strong></li>
						    <li class="drop">
						    	A un radio de 20 kil&oacute;metros del Hotel, est&aacute;n disponibles diversos campos de golf, tales como Alenda Golf, La Finca, El plant&iacute;o o la Font del Llop.
								<br/><br/>Consulta nuestras promociones de golf en recepci&oacute;n. 
						    </li>
						 
						</ul>
						<ul>
						    <li><strong>Comercio cercano: </strong></li>
						    <li class="drop">
						    	Hotel Huerto del Cura se encuentra en el centro de la ciudad, por lo que el cliente tiene disponible una amplia variedad de tiendas y comercios de todo tipo. 
						    </li>
						 
						</ul>-->
						
					</div>
				</div>
			</article><!-- .espacios -->

</section>		
	<?php get_footer(); ?>