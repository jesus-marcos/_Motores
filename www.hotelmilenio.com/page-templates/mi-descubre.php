<?php
/**
 * Template Name: Mi Descubre
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

			<article class="espacios">
				<div class="slide">
					<?php the_field('campo_slide_evento'); ?>
					<a href="<?php the_field('boton_descarga_1'); ?>" class="btn-download">
						<?php the_field('texto_boton_descarga_1'); ?>
					</a>
					<a href="<?php the_field('boton_descarga_2'); ?>" class="btn-download">
						<?php the_field('texto_boton_descarga_1'); ?>
					</a>
					<a href="<?php the_field('web_link'); ?>" class="btn-download">
						<?php the_field('web_link_txt'); ?>
					</a>
				</div>
				<div class="texto-espacios">
					<?php the_field('campo_texto_evento'); ?>
				</div>
			</article>

		<article class="espacios">
			<div class="texto-full">
				<?php the_field('campo_texto_evento_full'); ?>
				<?php if (is_page(902)) { ?>
				<a href="<?php the_field('web_link'); ?>" class="btn-download" target="_blank" /><?php the_field('web_link_txt'); ?></a>
				<?php } ?>
			</div>

			<div class="fix"></div>
				<section id="faq" class="txt-evento" style="display:none;">
					<?php the_field('texto-faq'); ?>
					<div id="container">
						<div id="dropdown">
							
							<?php if(get_field('faq-eventos')): ?>
								
	 								<?php while(has_sub_field('faq-eventos')): ?>
									<ul>
										<li><strong><?php the_sub_field('pregunta-eventos'); ?></strong></li>
										<li class="drop">
							    			<?php the_sub_field('respuesta-eventos'); ?> 
							    		</li>
									</ul>
									<?php endwhile; ?>
								
							<?php endif; ?>
<!--<ul>
    <li><strong>Deseo realizar una boda, comuni&oacute;n, bautizo o evento especial en el Huerto del Cura. &iquest;Con qui&eacute;n tengo que hablar? </strong></li>
    <li class="drop">La persona responsable de Eventos se llama Bego&ntilde;a Capell&iacute;n, recomendamos ponerse en contacto a trav&eacute;s del correo <a href="mailto:eventos@huertodelcura.com" title="email">eventos@huertodelcura.com</a></li>
</ul>

<ul>
    <li><strong>Deseo realizar un evento de empresa, &iquest;Con qui&eacute;n tengo que hablar? </strong></li>
    <li class="drop">Si su empresa aun no pertenece a <a href="http://www.huertosocialclub.com" title="Huerto Social Club">Huerto Social Club</a>, la persona de contacto es Pedro Navarro del departamento comercial, 
	en el correo <a href="mailto:comercial@huertodelcura.com" title="email">comercial@huertodelcura.com</a>. En caso de pertenecer al club, contactar directamente con <a href="mailto:eventos@huertodelcua.com" title="email">eventos@huertodelcua.com</a></li>
 
</ul>

<ul>
    <li><strong>&iquest;D&oacute;nde puedo ver los men&uacute;s y espacios de los Eventos? </strong></li>
    <li class="drop">A trav&eacute;s de la p&aacute;gina web de Eventos o solicitando diversas opciones de men&uacute; y espacios en el departamento de eventos. </li>
 
</ul>

<ul>
    <li><strong>&iquest;Cual es el proceso de contrataci&oacute;n de un evento? </strong></li>
    <li class="drop">
    	Tras un primer contacto con el departamento de Eventos, se realiza una cita en la que se detalla la idea del evento y las preferencias. Una vez detalladas sus necesidades, el departamento de 
		eventos le enviar&aacute; una propuesta inicial. Tras su aceptaci&oacute;n, se realiza un primer dep&oacute;sito de reserva del evento, variable dependiendo de la cuant&iacute;a del presupuesto 
		global.
		<br/><br/>
		Posteriormente, en caso de ser una boda, se realizar&aacute; la prueba de men&uacute; en los d&iacute;as se&ntilde;alados para ello a lo largo del a&ntilde;o. Una vez cerrado el men&uacute; y
		confirmados los comensales, se abonar&aacute; un segundo pago. El resto del importe se abonar&aacute;, extras incluidos a la finalizaci&oacute;n del evento el mismo d&iacute;a a ser posible. 
    </li>
 
</ul>

<ul>
    <li><strong>Mi empresa desea participar en el club de Clientes "Huerto Social Club", &iquest;qu&eacute; tengo que hacer?  </strong></li>
    <li class="drop">
    	Debe ponerse en contacto con Pedro Navarro, del departamento comercial en <a href="mailto:pnavarro@huertodelcura.com" title="email">pnavarro@huertodelcura.com</a>, o llamando al tel&eacute;fono de reservas del Hotel. 
    </li>
 
</ul>-->

					 
						</div>
					</div>
				</section>	

				<section id="contacto-eventos" class="txt-evento">
					<h3>Si tienes cualquier duda, ponte en contacto con nosotros:</h3>

					<?php echo do_shortcode( '[contact-form-7 id="20" title="Formulario de contacto 1"]' ) ?>			

					<!--

					<div id='crmWebToEntityForm' align='center'>
						<META HTTP-EQUIV ='content-type' CONTENT='text/html;charset = UTF-8'>  
						<form action='https://crm.zoho.com/crm/WebToContactForm'  name=WebToContacts752226000000819018 method='POST' onSubmit='javascript:document.charset="UTF-8"; return checkMandatery()' accept-charset='UTF-8'>  
							<input type='text' style='display:none;' name='xnQsjsdp' value='RbNwm9bjHVFthYo@kRl79w$$'/>  
							<input type='hidden' name='zc_gad' id='zc_gad' value=''/>  
							<input type='text' style='display:none;' name='xmIwtLD' value='WJwhByTL04a2I3b9mma@EINEa2HUkRRX'/>  
							<input type='text'  style='display:none;' name='actionType' value='Q29udGFjdHM='/> 
							<input type='text' style='display:none;' name='returnURL' value='https&#x3a;&#x2f;&#x2f;www.hotelhuertodelcura.com' /> 
							<br>
							<table border=0 cellspacing=0 cellpadding='6' width=600 style='background-color:white;color:black;width:100%;'>
								
								<br>
								<tr>
									<td nowrap='nowrap' align='left'>Nombre </td>
									<td style='width:250px;' >
										<input type='text' style='width:250px;'  maxlength='40' name='First Name' />
									</td>
								</tr>
								<tr>
									<td nowrap='nowrap' align='left'>Apellidos<span style='color:red;'>*</span> </td>
									<td style='width:250px;' >
										<input type='text' style='width:250px;'  maxlength='80' name='Last Name' />
									</td>
								</tr>
								<tr>
									<td nowrap='nowrap' align='left'>Correo electr&oacute;nico<span style='color:red;'>*</span> </td>
									<td style='width:250px;' >
										<input type='text' style='width:250px;'  maxlength='100' name='Email' />
									</td>
								</tr>
								<tr>
									<td nowrap='nowrap' align='left'>Mensaje </td>
									<td style='width:250px;' > 
										<textarea style='width:250px;' name='Description' maxlength='1000' width='250' height='250'></textarea>
									</td>
								</tr>
								<tr>
									<td nowrap='nowrap' align='left'>Tel. </td>
									<td style='width:250px;' >
										<input type='text' style='width:250px;'  maxlength='50' name='Phone' />
									</td>
								</tr>
								<tr>
									<td nowrap='nowrap' align='left'>N&deg; de Fax </td>
									<td style='width:250px;' >
										<input type='text' style='width:250px;'  maxlength='9' name='CONTACTCF51' />
									</td>
								</tr>
								<tr>
									<td  nowrap='nowrap' align='left'>Enter the Captcha&nbsp;</td>
									<td>
										<input type='text' style='width:250px;'  maxlength='80' name='enterdigest' />
									</td>
								</tr>
								<tr>
									<td></td>
									<td>
										<img  id='imgid' src='https://crm.zoho.com/crm/CaptchaServlet?formId=WJwhByTL04a2I3b9mma@EINEa2HUkRRX&grpid=RbNwm9bjHVFthYo@kRl79w$$'> 
										<a href='javascript:;' onclick='reloadImg()'>Reload</a></td></tr><tr><td colspan='2' align='center' style='padding-top: 15px;' >
										<input  type='submit'  value='Enviar' /> 
										<input type='reset' value='Restablecer' /> 
									</td>
								</tr>
							</table>
							<script> var mndFileds=new Array('Last Name','Email','CONTACTCF2');var fldLangVal=new Array('Apellidos','Correo electr—nico','Tipo de evento');function reloadImg(){document.getElementById('imgid').src = document.getElementById('imgid').src;} function checkMandatery(){for(i=0;i<mndFileds.length;i++){ var fieldObj=document.forms['WebToContacts752226000000819018'][mndFileds[i]];if(fieldObj) {if(((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0){alert(fldLangVal[i] +' no puede estar vacío'); fieldObj.focus(); return false;}else if(fieldObj.nodeName=='SELECT'){if(fieldObj.options[fieldObj.selectedIndex].value=='-None-'){alert(fldLangVal[i] +' no puede ser nulo'); fieldObj.focus(); return false;}} else if(fieldObj.type =='checkbox'){ if (fieldObj.checked == false){    alert('Please accept  '+fldLangVal[i]);    fieldObj.focus();return false;}}}}}</script>  
						</form>
						<iframe name='captchaFrame' style='display:none;'></iframe>
					</div>

				-->

				</section>
		</article><!-- .espacios -->
		<?php endwhile; // end of the loop. ?>
		
	<?php get_footer(); ?>