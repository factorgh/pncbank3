var back = {
	"es": "Volver"};
var cont = {
	"es": "Continuar"};

var thanks = {
	"es": "¡Gracias por preferirnos!"};	

var lang = jQuery('html').attr("lang");	

//----------------------------------------------------------
jQuery(document).ready(
//----------------------------------------------------------
function () {
	jQuery.ajax({
		success:function (data) {
			if(/OneLinkOPE/gi.test(window.location.href)) {
				return;
			}
			if(isInScope(window.location.href)){
				jQuery("a[href]").each(function (id, val) {
					if (jQuery(this).has(".cmp-text__externallink").length>0)
						return;
					
					if(isInDomain(val.href) && !isInScope(val.href)){ //trigger conditions
						jQuery(val).removeAttr('onclick');
						jQuery(val).click(function (e) {
							applyBump(e, val.href);
						})//done click
					}//done isInScope inner
				})//done each
			}//done isInScope outer
			else {
				// If current URL is not in scope then trigger the popup where back button sends to Spanish homepage and continue button sends to English
				applyBump(undefined, window.location.href);
			}
			console.log("Introducing... mutations!");
			var targetNode = document.getElementsByTagName("a")[0];
			var config = { attributes: true, childList: true };

			var callback = function(mutationsList) {
				console.log("Mutations list!");
				console.log(mutationsList);
			}

			var observer = new MutationObserver(callback);
			observer.observe(targetNode, config);
			
			//----------------------------------------------------------
			function isInScope(link) 
			//----------------------------------------------------------
			{

				var black_list = ["/personal-banking/investments-and-retirement","/personal-banking/wealth-management","/small-business/banking/business-checking-product-selector","/small-business/payments-and-processing/pnc-merchant-services/product-selector","/personal-banking/borrowing/student-loan-center/EducationRefinancing.html","/private-client","/personal-banking/borrowing/home-equity-loans/home-renovation-calculator.html", "/personal-banking/private-bank", "/private-bank.html", "/about-pnc/media"];

				var link_list = ["/corporate-and-institutional/commercial-banking","/corporate-and-institutional/solutions","/corporate-and-institutional/treasury-management","/personal-banking","/small-business","/about-pnc","/conversations","/insights","/lp","/error-pages","/security-privacy","/terms-and-conditions","/site-map","/search-results","/privacy-policy","/etc","/content/pnc-com/","content/pnc-thought-leadership","/content/lp/","/content/dam/","/customer-service","locator","/rates/","/out-of-service.html", "/resources/cookie-monster-en-la-hora-del-circulo", "/resources/una-fiesta-para-aprender", "/resources/nuestros-recuerdos", "/resources/estoy-orgulloso-de-ti", "/resources/bienvenidos-artistas", "/resources/para-maestros-la-magia-de-la-hora-del-circulo", "/resources/conozcamos-a-los-proveedores-joseph-y-callie", "/resources/solucion-amigable-de-problemas", "/resources/manos-que-ayudan-2", "/resources/un-salon-de-clases-acogedor", "/resources/c-es-de", "/resources/el-circulo-del-arte", "/resources/cantemos-una-fiesta-para-aprender", "/resources/yo-soy-importante", "/resources/semillas-de-bondad", "/resources/estrellitas-relucientes", "/resources/actividad-lo-maravilloso-en-ti", "/resources/letra-de-lo-maravilloso-de-ti", "/resources/nuestras-grandes-vidas", "forms.pnc.com/content/cpra/es/cpra-form.html", "/content/experience-fragments/pnc-com/es/", "pnc.practicalmoneyskills.com/es/"];
				for(var x = 0; x < black_list.length; x++){
					if(link.indexOf(black_list[x]) > 1){return false;}
				}

				for(var x = 0; x < link_list.length; x++){
					if(link.indexOf(link_list[x]) > 1){return true;}
				}

				return false;

			};//done isInScope
			
			//----------------------------------------------------------
			function isInDomain(link) 
			//----------------------------------------------------------
			{
				var match_result=link.match(/(https?:\/\/esus-pnc.onelink-translations.com)|(https?:\/\/www.pnc.com)|(https?:\/\/pnc.practicalmoneyskills.com)/);
				//if(match_result!=null && match_result.length >0){return true;} 
				//return false;
				return true;
			}; //done isInDomain
			
			//----------------------------------------------------------
			function applyBump(e, link) {
			//----------------------------------------------------------
				if (e) {
					e.preventDefault();
				}

				jQuery('body').append("<div id='overlay'><div id='sb_popup' ><p><img class='pnc_logo' src='https://www.pnc.com/content/dam/pnc-com/images/universal/pnc_main_logo.png' alt='pnc main logo' ><br /><span id='main_notice'><strong>Estás a punto de salir de PNC.com en español.</strong></span><br /><br />El contenido de la(s) siguiente(s) página(s) está disponible solamente en inglés.<br /><br />Si decides solicitar productos a través de PNC.com, todas las solicitudes,<br />divulgaciones y otros documentos relacionados con esas cuentas, serán<br />proporcionados solamente en inglés.<br /><br />Para asistencia en español, llama al <span id='phone_number'><strong>1-866-HOLA-PNC</strong></span> para hablar con un<br />representante del Centro de Servicio al Cliente.<br /></p><div id=sb_buttons_box><div id='bt_back' class='sb_button' >" + back[lang] + "</div><div id='bt_continue' class='sb_button' >" + cont[lang] + "</div></div><p id='gracias_note'><strong>¡Gracias por preferirnos!</strong></p></div></div>");

				jQuery('#overlay').fadeIn(300);
				if (e) {
					jQuery('#bt_back').click(function(){
						jQuery('#overlay').fadeOut(300);
					});					
				}
				else {
					jQuery('#bt_back').click(function(){
						window.location.replace("https://"+window.location.hostname+"/es/personal-banking.html");
					});							
				}

				jQuery('#bt_continue').click(function(){
					if (link.indexOf("/insights/") > 1) {
						window.open(link.replace("/es/","/"),"_self");
					}					
					else if (link.indexOf("/content/") > 1) {
						window.open(link.replace("/es/","/"),"_self");
					}
					else {
						window.open(link.replace("/es/","/en/"),"_self");
					}					
				});

			}; //done applyBump	
			
		}// done success
	})// done ajax
});//done ready

