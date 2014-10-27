function open_legal(filename,language) {
	window.open("../"+language+"/"+filename, "legal", "width=600,height=600,scrollbars=yes");
}

function recommend_submit() {
	var form = document.recommend;
	form.action="mailto:"+form.email.value;
	form.body.value=form.comment.value+"\r\n\r\n"+form.body.value;
	form.submit();
}

// Quicktime Detection  v1.0
// documentation: http://www.dithered.com/javascript/quicktime_detect/index.html
// license: http://creativecommons.org/licenses/by/1.0/
// code by Chris Nott (chris[at]dithered[dot]com)


var quicktimeVersion = 0;
function getQuicktimeVersion() {
	var agent = navigator.userAgent.toLowerCase(); 
	
	// NS3+, Opera3+, IE5+ Mac (support plugin array):  check for Quicktime plugin in plugin array
	if (navigator.plugins != null && navigator.plugins.length > 0) {
      for (i=0; i < navigator.plugins.length; i++ ) {
         var plugin =navigator.plugins[i];
         if (plugin.name.indexOf("QuickTime") > -1) {
            quicktimeVersion = parseFloat(plugin.name.substring(18));
         }
      }
	}
   
	// IE4+ Win32:  attempt to create an ActiveX object using VBScript
	else if (agent.indexOf("msie") != -1 && parseInt(navigator.appVersion) >= 4 && agent.indexOf("win")!=-1 && agent.indexOf("16bit")==-1) {
/*	  document.write('<scr' + 'ipt language="VBScript"\> \n');
		document.write('on error resume next \n');
		document.write('dim obQuicktime \n');
		document.write('set obQuicktime = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1") \n');
		document.write('if IsObject(obQuicktime) then \n');
		document.write('   if obQuicktime.IsQuickTimeAvailable(0) then \n');
		document.write('      quicktimeVersion = CInt(Hex(obQuicktime.QuickTimeVersion) / 1000000) \n');
		document.write('   end if \n');
		document.write('end if \n');
		document.write('</scr' + 'ipt\> \n');*/
  }

	// Can't detect in all other cases
	else {
		quicktimeVersion = quicktimeVersion_DONTKNOW;
	}

	return quicktimeVersion;
}

quicktimeVersion_DONTKNOW = -1;


/*
Copyright (c) Copyright (c) 2007, Carl S. Yestrau All rights reserved.
Code licensed under the BSD License: http://www.featureblend.com/license.txt
Version: 1.0.3
*/
var FlashDetect = new function(){
	var self = this;
	self.installed = false;
	self.raw = "";
	self.major = -1;
	self.minor = -1;
	self.revision = -1;
	self.revisionStr = "";
	var activeXDetectRules = [
		{
			"name":"ShockwaveFlash.ShockwaveFlash.7",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash.6",
			"version":function(obj){
				var version = "6,0,21";
				try{
					obj.AllowScriptAccess = "always";
					version = getActiveXVersion(obj);
				}catch(err){}
				return version;
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		}
	];
	var getActiveXVersion = function(activeXObj){
		var version = -1;
		try{
			version = activeXObj.GetVariable("$version");
		}catch(err){}
		return version;
	};
	var getActiveXObject = function(name){
		var obj = -1;
		try{
			obj = new ActiveXObject(name);
		}catch(err){}
		return obj;
	};
	var parseActiveXVersion = function(str){
		var versionArray = str.split(",");//replace with regex
		return {
			"raw":str,
			"major":parseInt(versionArray[0].split(" ")[1], 10),
			"minor":parseInt(versionArray[1], 10),
			"revision":parseInt(versionArray[2], 10),
			"revisionStr":versionArray[2]
		};
	};
	var parseStandardVersion = function(str){
		var descParts = str.split(/ +/);
		var majorMinor = descParts[2].split(/\./);
		var revisionStr = descParts[3];
		return {
			"raw":str,
			"major":parseInt(majorMinor[0], 10),
			"minor":parseInt(majorMinor[1], 10), 
			"revisionStr":revisionStr,
			"revision":parseRevisionStrToInt(revisionStr)
		};
	};
	var parseRevisionStrToInt = function(str){
		return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
	};
	self.majorAtLeast = function(version){
		return self.major >= version;
	};
	self.FlashDetect = function(){
		if(navigator.plugins && navigator.plugins.length>0){
			var type = 'application/x-shockwave-flash';
			var mimeTypes = navigator.mimeTypes;
			if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
				var version = mimeTypes[type].enabledPlugin.description;
				var versionObj = parseStandardVersion(version);
				self.raw = versionObj.raw;
				self.major = versionObj.major;
				self.minor = versionObj.minor; 
				self.revisionStr = versionObj.revisionStr;
				self.revision = versionObj.revision;
				self.installed = true;
			}
		}else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
			var version = -1;
			for(var i=0; i<activeXDetectRules.length && version==-1; i++){
				var obj = getActiveXObject(activeXDetectRules[i].name);
				if(typeof obj == "object"){
					self.installed = true;
					version = activeXDetectRules[i].version(obj);
					if(version!=-1){
						var versionObj = parseActiveXVersion(version);
						self.raw = versionObj.raw;
						self.major = versionObj.major;
						self.minor = versionObj.minor; 
						self.revision = versionObj.revision;
						self.revisionStr = versionObj.revisionStr;
					}
				}
			}
		}
	}();
};
FlashDetect.release = "1.0.3";

// Detection functions


// function hide_one_div () {
// 	var div = document.getElementById('flashdiv');
// 	if (div == null) return;
// 	if(!FlashDetect.installed) div = document.getElementById('flashdiv');
// 	else div = document.getElementById('imagediv');
// 
// 	div.style.display = "none";
// }

function hidden_quicktime_gallery () {
	if (typeof document.getElementById('quicktimeactive') == "undefined") return;

	try {
		var divquick = document.getElementById('quicktimedownload');
		var divgallery = document.getElementById('gallerycontent');
		var quicktimeVersion = getQuicktimeVersion();

		if (quicktimeVersion == 0) divquick.style.display = "block";
		else divquick.style.display = "none";
		divquick.style.display = "none";
	} catch(e) {}

// 	div.style.display = "none";
}

// funcion que presenta un alert aceptar/cancelar para confirmar el cambio de idioma en una seccion con componentes de Idiso
function alertCambioIdiomaBE(msg, idIdiomas, idIframeIdiso){
	try {
		// si existe el iframe de idiso (booking|cancelacion|suscripcion...), tenemos un mensaje y una id que identifique el bloque de idioma distinto de vacio
		if (idIframeIdiso != '' && $('#'+idIframeIdiso).attr('src') && msg != '' && idIdiomas != '') {
			$('#'+idIdiomas+' a').click(function(event){
				if (!confirm(msg)) event.preventDefault();
			});
		}
	} catch(e){}
}
