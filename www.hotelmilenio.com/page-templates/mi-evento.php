<?php
/**
 * Template Name: Mi Evento
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
				<a href="<?php the_field('link-espacios'); ?>" class="btn-download">
						<?php the_field('txt-boton'); ?>
					</a>
			</div>
			<div class="texto-espacios">
				<?php the_field('campo_texto_evento'); ?>
			</div><!-- .texto-espacios -->
		</article><!-- .espacios -->
		<article class="espacios">
			<div class="texto-full">
				<?php the_field('campo_texto_evento_full'); ?>
				<?php if (is_page(902)) { ?>
				<a href="<?php the_field('web_link'); ?>" class="btn-download" target="_blank" /><?php the_field('web_link_txt'); ?></a>
				<?php } ?>
			</div><!-- .texto-espacios -->
			<div class="fix"></div>
				<section id="faq" class="txt-evento" style="display:none;">
					<?php the_field('texto-faq'); ?>
					<div id="container">
					<div id="dropdown">
						
						<?php if(get_field('faq-eventos')): ?>
							
 								<?php while(has_sub_field('faq-eventos')): ?>
								<ul class="bloque">
									<li class="pregunta"><strong><?php the_sub_field('pregunta-eventos'); ?></strong></li>
									<li class="drop respuesta">
						    			<?php the_sub_field('respuesta-eventos'); ?> 
						    		</li>
								</ul>
								<?php endwhile; ?>
							
						<?php endif; ?>
 
					</div>
					</div>
				</section>	
				<section id="contacto-eventos" class="txt-evento">
					<h3>Si tienes cualquier duda, ponte en contacto con nosotros:</h3>
					<!--<?php the_field('formulario-eventos'); ?>-->
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
								<!--<tr>
									<td colspan='2' align='left' style='color:black;font-family:Arial;font-size:14px;'>
										<strong>Eventos</strong>
									</td>
								</tr> -->
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
									<td nowrap='nowrap' align='left'>Tipo de evento<span style='color:red;'>*</span> </td>
									<td style='width:250px;'  >
										<select style='width:250px;' name='CONTACTCF2'>
											<option value='-None-'>-Elige tu tipo de Evento-</option>  
											<option value='Bodas'>Bodas</option>  
											<option value='Comuniones'>Comuniones</option>  
											<option value='Bautizos'>Bautizos</option>  
											<option value='Business'>Business</option>  
											<option value='Ocasiones Especiales'>Ocasiones Especiales</option>  
										</select>
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
							<script> var mndFileds=new Array('Last Name','Email','CONTACTCF2');var fldLangVal=new Array('Apellidos','Correo electr—nico','Tipo de evento');function reloadImg(){document.getElementById('imgid').src = document.getElementById('imgid').src;} function checkMandatery(){for(i=0;i<mndFileds.length;i++){ var fieldObj=document.forms['WebToContacts752226000000819018'][mndFileds[i]];if(fieldObj) {if(((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0){alert(fldLangVal[i] +' no puede estar vac’o'); fieldObj.focus(); return false;}else if(fieldObj.nodeName=='SELECT'){if(fieldObj.options[fieldObj.selectedIndex].value=='-None-'){alert(fldLangVal[i] +' no puede ser nulo'); fieldObj.focus(); return false;}} else if(fieldObj.type =='checkbox'){ if (fieldObj.checked == false){    alert('Please accept  '+fldLangVal[i]);    fieldObj.focus();return false;}}}}}</script>  
						</form>
						<iframe name='captchaFrame' style='display:none;'></iframe>
					</div>
				</section>	
		</article><!-- .espacios -->
		<?php endwhile; // end of the loop. ?>
		
	<?php get_footer(); ?>