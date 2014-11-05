<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>


<script>

	function IsEmail(email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!regex.test(email)) {
		   return false;
		}else{
		   return true;
		}
	}

	function compruebaSuscripcion() {

		if ( IsEmail( $("#zcemail").val()) ) {
			return true;
		}
		else {
			$(" #error ").append('<p style="color: red;position: absolute;top: 94px;">El E-mail proporcionado es incorrecto.</p>');
			return false;
		} 		
	}

</script>

<article id="boletin">
	<h2>Newsletter</h2>
	<img src="<?php bloginfo('template_url'); ?>/images/logo-hsc-newsletter.jpg">

<!-- 18/09/2014 - Alberto Moreno - Inicio Modificación boletín -->
<!--
	<div id="form-boletin">
		<form method ='POST' target='_blank' style='width:100%; float: left;' id="zcampaignminiform" action="http://zc1.maillist-manage.com/ua/Optin?od=11287eca3eac74&opDgs=7200cd3a4fff9f7abae01301c45a66151185630859ca1fd0&lD=15911083c858bea&n=11699f750ba0be5" onsubmit="return compruebaSuscripcion();">
    		<div id="error" style="text-align:center;color:#d00;"></div>
			<p>Suscr&iacute;bete a nuestro bolet&iacute;n</p>
			<input type="text" id="zcemail" name='optinEmail' placeholder="E-mail" required >
			<div class="sombra">
				<input type="submit" id="zcembedminiform" value="ENVIAR"/>
			</div>
		</form>
	</div>

-->

<div id="form-boletin">
	<form method ='POST' target='_blank' style='float:left;width: 100%;' id="zcampaignminiform" action="//huertodelcura.us4.list-manage.com/subscribe/post?u=23b3a493cbe7b1736ed12f3c2&amp;id=2c79d7052e" onsubmit="return compruebaSuscripcion();">
		<div>
			<div id="error" style="text-align:center;color:#d00;"></div>
			<div style="font-size:12px; color:#555;">Email:</div>			
			<div style="font-size:18px; margin-top:3px;">
				<input type="text" id="zcemail" name='EMAIL' placeholder="E-mail" style="border-color:#ccc;" required>
				<input type="hidden" value="WEB HJM" name="SOURCE" id="mce-SOURCE">
			</div>
			<div style="position: absolute; left: -5000px;"><input type="text" name="b_23b3a493cbe7b1736ed12f3c2_2c79d7052e" tabindex="-1" value=""></div>
			<span id="zc_resp" style="color:#f2644d"></span>	
			<div class="sombra" style="font-size:18px;">
				<input type="submit" id="zcembedminiform" value="ENVIAR" >
			</div>
		</div>
	</form>
</div>

<!-- 18/09/2014 - Alberto Moreno - Fin Modificación boletín -->

</article><!--Fin de Boletin-->

<div class="fix"></div>
</section><!--Fin de Contenido Medio-->
</div>
</section>
			<footer >
		<section class="mid-width" id="enlaces-pie">
			<div id="phone">
				<p class="tit-pie">Tel&eacute;fono</p>
				<p class="small"><a title="Llamar" href="tel:+34966610011">+34966610011</a></p>
			</div>
			<div id="correo">
				<p class="tit-pie">E-Mail</p>
				<p class="small"><a title="Mandar Email" href="mailto:comercial@huertodelcura.com">comercial@huertodelcura.com</a></p>
			</div>
			<div id="opiniones">
				<p class="tit-pie"><a title="RSS" href="<?php echo home_url(); ?>/opiniones/">Opiniones</a></p>
			</div>
			<div id="preguntas">
				<p class="tit-pie"><a title="Preguntas Frecuentes" href="<?php echo home_url(); ?>/preguntas-frecuentes">Preguntas<br>Frecuentes</a></p>
				
			</div>
			<div id="whatsapp">
				<p class="tit-pie">Whatsapp</p>
				<p class="small"><a title="Mandar Mensaje" href="tel:+34651123452">+34637467775</a></p>
			</div>
		</section>
		<div class="fix"></div>
		<section id="enlaces-seo" class="mid-width">
			<div id="separador-pie"></div>
		<article>
			<div>
				<ul>
					<li><strong>Disfruta de nuestros espacios:</strong></li>
					<li><a href="http://www.huertodelcura.com/" title="Grupo Huerto Del Cura">Grupo Huerto Del Cura</a></li>
					<li><a href="http://www.hotelhuertodelcura.com/" title="Hotel Huerto Del Cura">Hotel Huerto Del Cura</a></li>
					<li>Hotel Jard&iacute;n Milenio</li>
					<li><a href="http://jardin.huertodelcura.com/" title="Jardin Art&iacute;stico Nacional">Jardin Art&iacute;stico Nacional</a></li>
				</ul>
			</div>
			<div>
				<ul>	
				    <li><span>&nbsp;</span></li>			
					<li><a href="http://www.hotelhuertodelcura.com/restaurante-els-capellans/" title="Restaurante Els Capellans">Restaurante Els Capellans</a></li>
					<li><a href="http://www.hotelmilenio.com/restaurante-la-taula/" title="Restaurante La Taula">Restaurante La Taula</a></li>
					<li><a href="http://www.huertodelcura.com/catering/" title="Catering Huerto Del Cura">Catering Huerto Del Cura</a></li>
					<li><a href="http://www.oasiszengarden.com/" title="Oasis Zen Garden">Oasis Zen Garden</a></li>
				</ul>
			</div>
			<div>
				<ul>
					<li><strong>Hotel Milenio:</strong></li>	
					<li><a href="<?php echo home_url(); ?>/servicio/" title="Descubre">Descubre</a></li>
					<li><a href="<?php echo home_url(); ?>/habitacion-doble-superior/" title="Habitaciones">Habitaciones</a></li>
					<li><a href="<?php echo home_url(); ?>/promociones/" title="Opiniones">Promociones</a></li>
						
				</ul>
			</div>
			<div>
				<ul>
				    <li><span>&nbsp;</span></li>						
					
					<li><a href="http://www.huertodelcura.com/blog/" title="Blog">Blog</a></li>
					<li><a href="<?php echo home_url(); ?>/contacto/" title="Contacto">Contacto</a></li>
				</ul>
			</div>
		</article>
			
		</section><!--Fin de enlaces seo-->
		<div class="fix"></div>
		<section id="logo-pie" class="mid-width">
			<div id="separador-pie"></div>
			<img src="<?php echo get_template_directory_uri(); ?>/images/logo_Q_Calidad_fondo_claro.png" width="436" height="291" id="qualidad"/>
			<a href="http://www.huertodelcura.com"><img src="<?php bloginfo('template_url'); ?>/images/sello.jpg"></a>
		</section><!--Fin de logo pie-->
		<div class="fix"></div>
		<section id="pie-naranja" >
			<article id="aviso-legal" class="mid-width">
				<ul>
					<li><a href="<?php echo home_url(); ?>/politica-de-privacidad/" title="Pol&iacute;tica de Privacidad">Pol&iacute;tica de Privacidad</a></li>
					<li><a href="<?php echo home_url(); ?>/aviso-legal/" title="Aviso Legal">Aviso Legal</a></li>
				</ul>
				<a href="http://www.dinamicbrain.com" target="blank_"><img src="<?php bloginfo('template_url'); ?>/images/iso.png" width="25" height="28"></a>
			</article>
		</section>
	</footer>

<?php wp_footer(); ?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-42586236-1', 'huertosocialclub.com');
  ga('send', 'pageview');

</script>
<script type="text/javascript">

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23611101-1']);
_gaq.push(['_setDomainName', 'www.hotelmilenio.com']);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript';
  ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 
  'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

</script>
</body>
</html>