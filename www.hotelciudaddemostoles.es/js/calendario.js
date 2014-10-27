//=======================================
// Nombre: calendario.js
// Autor:  Solmelia
// Descripción: Tratamiento de calendario
//=======================================
var ie		= navigator.appName == "Microsoft Internet Explorer";
var ns6		= document.getElementById&&!document.all;
var ns4		= document.layers;
var ie9		= false;
var opera 	= navigator.userAgent.indexOf("Opera") > -1;
var opera5	= (navigator.appVersion.indexOf("MSIE 5")!=-1 && navigator.userAgent.indexOf("Opera 5")!=-1)?true:false;
var opera6	= (navigator.appVersion.indexOf("MSIE 5")!=-1 && navigator.userAgent.indexOf("Opera 6")!=-1)?true:false;
var mac		= (navigator.userAgent.indexOf("Mac")!=-1);
var win;

if (ie) {
	var ua = navigator.userAgent;
	var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if (re.exec(ua) != null)
	rv = parseFloat( RegExp.$1 );
	if (rv >= 9) ie9 = true;
}
// Variables globales con los campos de retorno de las fechas
var return_form;
var return_en_dia;
var return_en_mesanyo;
var return_sa_dia;
var return_sa_mesanyo;
var fechaIniAnterior;
var fechaFinAnterior;
var calendar = new CalendarPopup("calendarDiv");
calendar.monthAbbreviations   = yxMonths;
calendar.monthNames  = yxMonthsLarge;
calendar.dayHeaders  = dayHeaders;
calendar.setWeekStartDay(weekStartDay);
//Configura el calendario para que las fechas anteriores a la actual no sean seleccionables
var ayer = new Date();
ayer.setDate(ayer.getDate()-1);
calendar.addDisabledDates(null, (ayer.getMonth()+1) + "/" +  ayer.getDate()+ "/" + ayer.getFullYear());
calendar.offsetX = 0;
calendar.offsetY = 25;
var linkreserver_base = null;
/**
 * lista: Nombre del campo del combo
 * valor: Valor que se tiene que seleccionar
 */
function selectDato(lista,valor){
  for (var i=0;i<lista.length;i++){
    if (lista.options[i].value == valor){
      lista.options.selectedIndex = i;
      break;
    }
  }
}
// dia = 1,2,3,4,...31
// mes = 0,1,2,3, ...11
// anyo = 2005,2006 ...
// incDays, Incremento de dias 0,1,2,..
// incMonths, Incremento de meses 0,1,2,..
// incYears Incremento de años 0,1,2,..
function DateAdd(dia, mes, anyo, incDays, incMonths, incYears){
	var sAux = ""
	var startDate = new Date(anyo,mes,dia,0,0,0);
	sAux = DateAddFecha(startDate, incDays, incMonths, incYears);
	return sAux;
}
function DateAddFecha(startDate, incDays, incMonths, incYears){
	var sAux 	= "";
	var returnDate 	= new Date(startDate.getTime());
	var yearsToAdd 	= incYears;
	var month 	= returnDate.getMonth() + incMonths;
	if (month > 11){
		yearsToAdd 	= Math.floor((month+1)/12);
		month 		-= 12*yearsToAdd;
		yearsToAdd 	+= incYears;
	}
	returnDate.setMonth(month);
	returnDate.setFullYear(returnDate.getFullYear()	+ yearsToAdd);
	returnDate.setDate(returnDate.getDate()+incDays);
	if(returnDate.getDate()<10) sAux +="0"
	sAux +=returnDate.getDate()+"/"
	if((returnDate.getMonth() + 1)<10) sAux +="0"
	sAux +=(returnDate.getMonth() + 1)+"/"+ returnDate.getFullYear();
	return sAux;
}
// Trata la fecha hasta en función de la fecha de inicio
function adaptahasta(form, en_dia, en_mesano, sa_dia, sa_mesano){
	// Obtenemos los combos
	var comboDiaIni = document.getElementById(form).en_dia;
	var comboMesAnyoIni = document.getElementById(form).en_mesano;
	var comboDiaFin = document.getElementById(form).sa_dia;
	var comboMesAnyoFin = document.getElementById(form).sa_mesano;
	// Obtenemos los valores de los combos
	var dia=comboDiaFin.options[comboDiaFin.selectedIndex].value;
	var mesano=comboMesAnyoFin.options[comboMesAnyoFin.selectedIndex].value.split("-");
	var mes=mesano[0];
	var anyo=mesano[1];
	var diad=comboDiaIni.options[comboDiaIni.selectedIndex].value;
	var mesanod=comboMesAnyoIni.options[comboMesAnyoIni.selectedIndex].value.split("-");
	var mesd=mesanod[0];
	var anyod=mesanod[1];
	fhasta= new Date(anyo, mes-1, dia);
	fdesde=new Date(anyod, mesd-1, diad);
	var hoy=new Date();
	fdesde2=fdesde.getTime()+63*24*60*60*1000;
	if (fdesde.getTime() < fhasta.getTime() && hoy.getTime() <= fdesde.getTime()) {
		return true;
	} 
	if (fhasta.getTime()>0) {
		if(fdesde>=fhasta){
			loadDate(DateAdd(diad,mesd-1,anyod,1,0,0),comboDiaFin,comboMesAnyoFin);
		} else {
			if(fhasta.getTime()>=fdesde2){
				//Sobre pasa el rango de 62 dias de reserva
				if (fechaAnterior.getTime() != fhasta.getTime()){
					loadDate(DateAdd(fechaAnterior.getDate(),fechaAnterior.getMonth(),fechaAnterior.getFullYear(),0,0,0),comboDiaFin,comboMesAnyoFin);
				} else {
					loadDate(DateAdd(diad,mesd-1,anyod,1,0,0),comboDiaFin,comboMesAnyoFin);
				}
			}
		}
	} else {
		loadDate( DateAdd(diad,mesd-1,anyod,1,0,0),comboDiaFin,comboMesAnyoFin);
	}
	// Guardamos la fecha anterior
	dia=comboDiaFin.options[comboDiaFin.selectedIndex].value;
	mesano=comboMesAnyoFin.options[comboMesAnyoFin.selectedIndex].value.split("-");
	mes=mesano[0];
	anyo=mesano[1];
	fechaFinAnterior = new Date(anyo, mes-1, dia);
	fechaAnterior = new Date(anyo, mes-1, dia);
	dia=comboDiaIni.options[comboDiaIni.selectedIndex].value;
	mesano=comboMesAnyoIni.options[comboMesAnyoIni.selectedIndex].value.split("-");
	mes=mesano[0];
	anyo=mesano[1];
	fechaIniAnterior = new Date(anyo, mes-1, dia);
	return true;
}
/**
 * Carga la fecha en un combo de fecha.
 * El combo de mes y año estan unificados en uno solo
 * sFecha: Fecha que se carga formato dd/mm/yyyy
 * campoDia: Nombre del cambo dia del formulario
 * campoMesAnyo: Nombre del campo mes y año del formulario
 */
function loadDate(sFecha, campoDia, campoMesAnyo){
	loadDateSeparator(sFecha, campoDia, campoMesAnyo, "/");
}
/**
 * Carga la fecha en un combo de fecha.
 * El combo de mes y año estan unificados en uno solo delimitado por un separador
 *
 * sFecha: Fecha que se carga formato dd/mm/yyyy
 * campoDia: Nombre del cambo dia del formulario
 * campoMesAnyo: Nombre del campo mes y año del formulario
 * separador: separador de mes y año
 */
function loadDateSeparator(sFecha, campoDia, campoMesAnyo, separador){
	var sDate = sFecha.split(separador);
	selectDato(campoDia,sDate[0]);
	selectDato(campoMesAnyo,""+sDate[1]+"-"+sDate[2]);
}
//*****************************************
// FUNCIONES DE VISUALIZACIÓN DE CALENDARIO 
//*****************************************
// Asigna valor a combos de fecha
function setFecha(any, mes, dia, comboDia, comboMesAnyo) {
  if (dia < 10){
    comboDia.value = "0" + dia;
  }else {
    comboDia.value = dia;
  }
  comboMesAnyo.value = valueMonth[mes-1] + "-" + any;
}
// Inicializa el calendario
function initCalendario(form, en_dia, en_mesanyo, sa_dia, sa_mesanyo) {
	return_form = form;
	return_en_dia = en_dia;
	return_en_mesanyo = en_mesanyo;
	return_sa_dia = sa_dia;
	return_sa_mesanyo = sa_mesanyo;
}
// Muestra el calendario
function mostrarCalendario(funcion, anchor, sComboDia, sComboMesAnyo) {
  var comboDia = eval("document.getElementById('" + return_form + "')." + sComboDia);
  var comboMesAnyo = eval("document.getElementById('" + return_form + "')." + sComboMesAnyo);
  // Obtenemos los valores de los combos
  var dia=comboDia.options[comboDia.selectedIndex].value;
  var mesano=comboMesAnyo.options[comboMesAnyo.selectedIndex].value;
  var fechaShow = "";
  if ((dia!="") && (mesano!=""))  {
    var mesanoSplit = mesano.split("-");
    var mes=mesanoSplit[0];
    var anyo=mesanoSplit[1];
    fechaShow = anyo + "-" + mes + "-" + dia;
  }
  calendar.setReturnFunction(funcion);
  calendar.showCalendar(anchor, fechaShow);
}
function abrirmenu() {
	return true;
}
function paquete_init () {
	var startDate = new Date();
	loadDate(DateAddFecha(startDate, 0, 0, 0), document.getElementById('form_buscador').en_dia, document.getElementById('form_buscador').en_mesano);
	validaFechas();
	saveChange();
}
function inicializarCalendario() {
	generaFechaOptions('en_mesano');
	generaFechaOptions('sa_mesano');
	initCalendario("form_buscador", "en_dia", "en_mesano", "sa_dia", "sa_mesano");
	if (ie) setTimeout("paquete_init();",300);
	else paquete_init();
}
// Funcion responsable de cargar la fecha de entrada del calendario
function cargarFechaEn(any, mes, dia) {
	var comboDia = eval("document.getElementById('form_buscador').en_dia");
	var comboMesAnyo = eval("document.getElementById('form_buscador').en_mesano");
	setFecha(any, mes, dia, comboDia, comboMesAnyo);
	validaFechas();
	saveChange();
}
// Funcion responsable de cargar la fecha de salida del calendario
function cargarFechaSa(any, mes, dia) {
	var comboDia = eval("document.getElementById('form_buscador').sa_dia");
	var comboMesAnyo = eval("document.getElementById('form_buscador').sa_mesano");
	setFecha(any, mes, dia, comboDia, comboMesAnyo);
	validaFechas();
	saveChange();
}
function generaFechaOptions(name) {
	var obj = document.getElementById('form_buscador')[name];
	var hoy = new Date();
	var year = hoy.getFullYear();
	
	if (ns6 || ns4 || opera || ie9)
		year=1900+hoy.getYear();
	
	var desdemes=hoy.getMonth();
	for (var i = year;i < year+2; i++) {
		for(var j=desdemes;j<yxMonths.length;j++) {
			var option = document.createElement('OPTION');
			option.text = yxMonths[j] +' '+i;
			option.innerHTML = yxMonths[j] +' '+i;
			option.value = valueMonth[j]+'-'+i;
			obj.appendChild(option,null);
		}
		desdemes=0;
	}
	return true;
}
// Funciones para validar fechas clave
function correctDateIni(form, en_dia, en_mesano){
	var comboDia = document.getElementById(form).en_dia;
	var comboMes = document.getElementById(form).en_mesano;
	var day = comboDia.options[comboDia.selectedIndex].value;
	var fecha_comp = comboMes.options[comboMes.selectedIndex].value.split("-");
	var month = fecha_comp[0]-1;
	var year =fecha_comp[1];
	if ((day!="")&&(month!="")&&(year!="")&&(month!="-1")){
		//Comprobamos el número de opciones nulas que hay al principio del combo de días
		var optionDiaNulo=0;
		for (var i=0;i<comboDia.length;i++){
			if (comboDia.options[i].value==""){
				optionDiaNulo++;
			}
		}
		//Comprobamos el número de opciones nulas que hay al principio del combo de meses
		var optionMesNulo=0;
		for (var j=0;j<comboMes.length;j++){
			if (comboMes.options[j].value==""){
				optionMesNulo++;
			}
		}
		//Construyo una fecha con esos componentes
		var a_date = new Date(year,month,day);
		//Obtengo el día y el mes de la fecha validada
		day = a_date.getDate();
		month = a_date.getMonth()+1;
		year = a_date.getFullYear();
		var mesanyo=month+'-'+year;
		//Corrijo las combos, sumandole el número de opciones vacías que tiene cada combo
		document.getElementById(form).en_dia.selectedIndex =  + (day-1+optionDiaNulo);
		for (var j=0;j<comboMes.length;j++){
			var temp=comboMes.options[j].value.split('-')
			if((month==temp[0])&&(year==temp[1])){
				document.getElementById(form).en_mesano.selectedIndex =  + j;
				return;
			}
		}
	}
}
// Funciones para validar fechas clave
function correctDateFin(form, sa_dia, sa_mesano) {
	var comboDia = document.getElementById(form).sa_dia;
	var comboMes = document.getElementById(form).sa_mesano;
	var day = comboDia.options[comboDia.selectedIndex].value;
	var fecha_comp = comboMes.options[comboMes.selectedIndex].value.split("-");
	var month = fecha_comp[0]-1;
	var year =fecha_comp[1];
	if ((day!="")&&(month!="")&&(year!="")&&(month!="-1")){
		//Comprobamos el número de opciones nulas que hay al principio del combo de días
		var optionDiaNulo=0;
		for (var i=0;i<comboDia.length;i++){
			if (comboDia.options[i].value==""){
				optionDiaNulo++;
			}
		}
		//Comprobamos el número de opciones nulas que hay al principio del combo de meses
		var optionMesNulo=0;
		for (var j=0;j<comboMes.length;j++){
			if (comboMes.options[j].value==""){
				optionMesNulo++;
			}
		}
		//Construyo una fecha con esos componentes
		var a_date = new Date(year,month,day);
		//Obtengo el día y el mes de la fecha validada
		day = a_date.getDate();
		month = a_date.getMonth()+1;
		year = a_date.getFullYear();
		var mesanyo=month+'-'+year;
		//Corrijo las combos, sumandole el número de opciones vacías que tiene cada combo
		document.getElementById(form).sa_dia.selectedIndex =  + (day-1+optionDiaNulo);
		for (var j=0;j<comboMes.length;j++){
			var temp=comboMes.options[j].value.split('-')
			if((month==temp[0])&&(year==temp[1])){
				document.getElementById(form).sa_mesano.selectedIndex =  + j;
				return;
			}
		}
	}
}
// Trata la fecha hasta en función de la fecha de inicio
function validaFechas() {
	if (document.getElementById('form_buscador').fechaLlegada && document.getElementById('form_buscador').fechaSalida) {
		//string estará en formato dd/mm/yyyy
		var regExp = /^\d{1,2}-\d{1,2}-\d{2,4}$/;
		if (!regExp.test(document.getElementById('form_buscador').fechaLlegada.value) || !regExp.test(document.getElementById('form_buscador').fechaSalida.value)) return false;
		else return true;
	} else {
		return adaptahasta(return_form, return_en_dia, return_en_mesanyo, return_sa_dia, return_sa_mesanyo);
	}
}
function changeFormat(mesanyo) {
	var regex = new RegExp('^([0-9]{1,2})-([0-9]{4})$');
	var result = regex.exec(mesanyo);
	var newdate = Array(result[1],result[2]);
	return newdate;
}
function saveChange() {
	try {
		HOTELMANAGER.booking.buildLink({form:'form_buscador',link:'link_reservas'});
	}catch(e) {
		var oFORM = document.getElementById('form_buscador');
		var vDiaIni = oFORM.en_dia.value;
		var varray = changeFormat(oFORM.en_mesano.value);
		var vMesIni = varray[0];
		var vAnyoIni = varray[1];
		var vDiaFin = oFORM.sa_dia.value;
		var varray = changeFormat(oFORM.sa_mesano.value);
		var vMesFin = varray[0];
		var vAnyoFin = varray[1];
		var vNoPax = 0;
		var vNoHab = Number( oFORM.no_hab.value);
		if (oFORM.no_pax) vNoPax = Number(oFORM.no_pax.value);
		if (oFORM.no_pax_nin) {
			if (Number(oFORM.no_pax_nin.value) > 0)
				vNoPax += Number(oFORM.no_pax_nin.value);
		}
		var linkReservas = document.getElementById("link_reservas");
		if (linkreserver_base == null) {
			linkreserver_base = linkReservas.href;
		}
		var url = linkreserver_base;
		var urlOptions = "";
		urlOptions += "?codigoHotel=" + oFORM.codigoHotel.value;
		if (oFORM.zona) urlOptions += "&zona=" + oFORM.zona.value;
		urlOptions += "&lang=" + oFORM.idioma.value;
		urlOptions += "&idPartner="+ oFORM.idPartner.value;
		urlOptions += "&idPrm=" + oFORM.idPrm.value;
		urlOptions += "&idONg=" + oFORM.idONg.value;
		urlOptions += "&idNom=" + oFORM.idNom.value;
		urlOptions += "&irListaHoteles="+ oFORM.irListaHoteles.value;
		urlOptions += "&dia=" + vDiaIni;
		urlOptions += "&mes=" + vMesIni;
		urlOptions += "&anio=" + vAnyoIni;
		urlOptions += "&diaHasta=" + vDiaFin;
		urlOptions += "&mesHasta=" + vMesFin;
		urlOptions += "&anioHasta=" + vAnyoFin;
		urlOptions += "&personas=" + vNoPax;
		urlOptions += "&habitaciones=" + vNoHab;
		if (oFORM.campaignCode) urlOptions += "&campaignCode=" + oFORM.campaignCode.value;
		if (oFORM.zona) {
			if (oFORM.zona.value < 1 && oFORM.codigoHotel.value < 1) linkReservas.href = "javascript:alert('"+HOTELMANAGER.lang.get(HOTELMANAGER.booking.oErr.noselect)+"');";
			else linkReservas.href = url + urlOptions;
		}else linkReservas.href = url + urlOptions;
	}
}