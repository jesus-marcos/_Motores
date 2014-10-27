/*
 * General lib of HotelManager
 */
var HOTELMANAGER = {};
(function() {
	HOTELMANAGER.config = {};
	HOTELMANAGER.version = 2;
	HOTELMANAGER.cookie = {
		params: {
			path: '/',
			expires: Number(7) //Days
		},
		init: function() {
			var utils = HOTELMANAGER.utils;
			if (typeof($) != 'function') return false; // jQuery needed.
			if (utils.getUrlP('idPartner')) return false; // Continue if not a booking screen
			var idPrm = utils.getUrlP('idPrm');
			var idONg = utils.getUrlP('idONg');
			if (!idPrm && !idONg) return false;
			if (idPrm) $.cookie('idPrm', idPrm, HOTELMANAGER.cookie.params);
			if (idONg) $.cookie('idONg', idONg, HOTELMANAGER.cookie.params);
			return true;
		},
		set: function(_search) {
			if (typeof($) != 'function') return _search; // jQuery needed.
			var idPrm = $.cookie('idPrm');
			var idONg = $.cookie('idONg');
			if (!idPrm && !idONg) return _search;
			$.query = $.query.load(_search);
			if (idPrm) $.query.SET('idPrm', idPrm);
			if (idONg) $.query.SET('idONg', idONg);
			return decodeURIComponent($.query.toString());
			//return $.query.toString();
		}
	};
	HOTELMANAGER.lang = {
		actual: 'es',
		setLanguage: function(langItem) {
			HOTELMANAGER.lang.actual = langItem;
		},
		getLanguage: function() {
			return HOTELMANAGER.lang.actual;
		},
		get: function(text) {
			if (!HOTELMANAGER.config.DICCTIONARY[ text ]) return text;
			return HOTELMANAGER.config.DICCTIONARY[ text ][ HOTELMANAGER.lang.actual ];
		}
	};
	HOTELMANAGER.dist = {
		aplicarDistribucionPaxes: function(hotels){
			try {
				var idhotel = HOTELMANAGER.config.code2id[hotels[0]];
				if (HOTELMANAGER.config.hotels.list[idhotel].dist != null){
					if (hotels.length == 1) {
						HOTELMANAGER.utils.distribucionPaxHotel(HOTELMANAGER.config.hotels.list[idhotel].dist.adults_number, 
								HOTELMANAGER.config.hotels.list[idhotel].dist.childs_number, 
								HOTELMANAGER.config.hotels.list[idhotel].dist.childs_age, 
								0);
					} else if (hotels.length > 1) {
						var maxAdults_number = 0;
						var maxChilds_number = 0;
						var maxChilds_age = 0;
						var idhotel = 0;
						for (var i = 0;i < hotels.length;i++){
							idhotel = HOTELMANAGER.config.code2id[hotels[i]];
							if (HOTELMANAGER.config.hotels.list[idhotel].dist.adults_number > maxAdults_number) maxAdults_number = HOTELMANAGER.config.hotels.list[idhotel].dist.adults_number;
							if (HOTELMANAGER.config.hotels.list[idhotel].dist.childs_number > maxChilds_number) maxChilds_number = HOTELMANAGER.config.hotels.list[idhotel].dist.childs_number;
							if (HOTELMANAGER.config.hotels.list[idhotel].dist.childs_age > maxChilds_age) maxChilds_age = HOTELMANAGER.config.hotels.list[idhotel].dist.childs_age;
						}
						HOTELMANAGER.utils.distribucionPaxHotel(maxAdults_number,maxChilds_number,maxChilds_age,0);
					} else {
						HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
					}
				}
			} catch(e){
				HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
			}
		},
		aplicarDistribucionPaxesPorDefecto: function(){
			HOTELMANAGER.utils.distribucionPaxHotel(4,2,11,0);
		}
	};
	HOTELMANAGER.utils = {
		ready: false,
		Onload: function(oFunction) {
			if (HOTELMANAGER.version == 1) {
				YAHOO.util.Event.onDOMReady(oFunction, this, true);
				return true;
			}
			if (HOTELMANAGER.version == 2 || HOTELMANAGER.version == 3){
				if (this.ready == true) {
					YAHOO.util.Event.onDOMReady(oFunction, this, true);
				}else {
					$.ajax({
						url: '../config/config.js',
						async: false,
						dataType: 'json',
						processData: false,
						success: function(data) {
							HOTELMANAGER.config = data.HM;
							HOTELMANAGER.cookie.init();
							HOTELMANAGER.utils.ready = true;
							YAHOO.util.Event.onDOMReady(oFunction, this, true);
						}
					});
				}
			}
			YAHOO.util.Event.onDOMReady(function() { 
				try {
					HOTELMANAGER.booking.ajax.updateHotelCode();
					if ($('input[name=codigoHotel]').val() != '' && $('input[name=codigoHotel]').val() != '0') {
						HOTELMANAGER.dist.aplicarDistribucionPaxes([$('input[name=codigoHotel]').val()]);
					} else {
						var comboHoteles = HOTELMANAGER.booking.oEl.hoteles;
						var aComboHoteles = new Array();
						var idx = 0;
						for (var i = 0; i < comboHoteles.length; i++){
							if (comboHoteles[i].value != 0) {
								aComboHoteles[idx] = (comboHoteles[i].value);
								idx = idx + 1;
							}
						}
						if (aComboHoteles){
							HOTELMANAGER.dist.aplicarDistribucionPaxes(aComboHoteles); 
						} else {
							HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
						}
					}
				} catch(e){
					HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
				}
			}, this, true);
		},
		getObject: function(oInc) {
			var oEl;
			if (typeof(oInc) == 'string') {
				oEl = document.getElementById(oInc);
				if (oEl) return oEl;
				oEl = window[ oInc ];
				if (oEl) return oEl;
			}
			if (typeof(oInc) == 'object') {
				oEl = oInc;
				if (oEl) return oEl;
			}
			return false;
		},
		isEmail: function(str) {
			var regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
			var result = regex.exec(str);
			if (!result) return false;
			return true;
		},
		getDir: function(idPartner) {
			try {
				if (idPartner == '') idPartner = HOTELMANAGER.utils.getUrlP("idPartner");
				var str = 'https://www.idiso.com/csl/hm/'+idPartner+'/';
				return str.replace("hm//","hm/");
			} catch(e){
				return 'https://www.idiso.com/csl/hm/';
			}
		},
		getUrlP: function (name) {
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var regexS = "[\\?&]"+name+"=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.search);
			if (results) return results[1];
			else return "";
		},
		includeScript: function(filename) {
			var script = document.createElement('script');
			script.setAttribute("type","text/javascript")
			script.src = '../js/'+filename;
			document.getElementsByTagName("head")[0].appendChild(script);
		},
		buildVideoObjects: function(href) {
			var videohtml = '';
			var opts = { frameWidth: 560, frameHeight: 312 };
			if (href.match(/\.youtube\.com/)) {
				href.match(/v=([^&]+)&*/);
				var youtubecode = RegExp.$1;
				videohtml += '<object width="'+opts.frameWidth+'" height="'+opts.frameHeight+'">';
				videohtml += '<param name="movie" value="http://www.youtube.com/v/'+youtubecode+'"></param>';
				videohtml += '<param name="wmode" value="transparent"></param>';
				videohtml += '<embed src="http://www.youtube.com/v/'+youtubecode+'" type="application/x-shockwave-flash" wmode="transparent" width="'+opts.frameWidth+'" height="'+opts.frameHeight+'"></embed>';
				videohtml += '</object>';
			} else if (href.match(/\.vimeo\.com\/([0-9]+)/)) {
				var vimeocode = RegExp.$1;
				videohtml += '<object width="'+opts.frameWidth+'" height="'+opts.frameHeight+'">';
				videohtml += '<param name="allowfullscreen" value="true" />';
				videohtml += '<param name="allowscriptaccess" value="always" />';
				videohtml += '<param name="wmode" value="transparent"></param>';
				videohtml += '<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id='+vimeocode+'&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1" />';
				videohtml += '<embed src="http://vimeo.com/moogaloop.swf?clip_id='+vimeocode+'&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" width="'+opts.frameWidth+'" height="'+opts.frameHeight+'"></embed>';
				videohtml += '</object>';
			} else {
				videohtml = 'this video is not compatible';
			}
			return videohtml;
		},
		trackFrame: function(iframe, url) {
			var iframe = HOTELMANAGER.utils.getObject(iframe);
			//url += '&anticache='+HOTELMANAGER.utils.rand(9999999);
			try {
				iframe.src = pageTracker._getLinkerUrl(url);
			} catch(ex) {
				iframe.src = url;
			}
		},
		rand: function rand (n) {
			return (Math.floor (Math.random () * n + 1));
		},
		// cambia la distribucion de paxes
		distribucionPaxHotel: function(adults_number, childs_number, childs_age, child_age){
			if (adults_number == 0) { 
				HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
			} else {
				HOTELMANAGER.booking.habitaciones.default_adults_number = Number(adults_number);
				HOTELMANAGER.booking.habitaciones.default_childs_number = Number(childs_number);
				HOTELMANAGER.booking.habitaciones.default_childs_age = Number(childs_age);
				HOTELMANAGER.booking.habitaciones.default_child_age = Number(child_age);
				HOTELMANAGER.booking.habitaciones.reset();
				HOTELMANAGER.booking.habitaciones.fillRooms();
			}
		}
	};
	HOTELMANAGER.GoogleMaps = {
		MultiMark: function(map, lmarks, marker) {
			this.map = map;
			this.lmarks = lmarks;
			this.marker = marker;
			if (!this.infoWindow) {
				this.infoWindow = new google.maps.InfoWindow;
			}
			var latlngbounds = new google.maps.LatLngBounds();
			for (var i in this.lmarks) {
				if (this.lmarks[i].lat && this.lmarks[i].lng) {
					this.lmarks[i].latlng = new google.maps.LatLng(this.lmarks[i].lat, this.lmarks[i].lng);
					this.lmarks[i].marker = new google.maps.Marker({ position: this.lmarks[i].latlng, map: this.map, icon: this.marker });
					this.lmarks[i].html = '<a class="hotelname" href="'+this.lmarks[i].link+'">'+this.lmarks[i].name+' »</a><p class="address">'+this.lmarks[i].address+'</p>';
					HOTELMANAGER.GoogleMaps.bindInfoWindow(this.lmarks[i].marker, this.map, this.infoWindow, this.lmarks[i].html);
					latlngbounds.extend(this.lmarks[i].latlng);
				}
			}
			map.setCenter(latlngbounds.getCenter());
			map.fitBounds(latlngbounds);
		},
		bindInfoWindow: function (marker, map, infoWindow, html) {
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent(html);
				infoWindow.open(map, marker);
			});
		}
	};
	HOTELMANAGER.newsletter = {
		msgError: 'Error en el formato de mail',
		oEl: {},
		init: function (params) {
			this.oEl.form = HOTELMANAGER.utils.getObject(params.form);
			if (!this.oEl.form) return false;
			this.oEl.input = HOTELMANAGER.utils.getObject(params.input);
			if (!this.oEl.input) return false;
			this.oEl.submit = HOTELMANAGER.utils.getObject(params.submit);
			if (!this.oEl.input) return false;
			if (params.msgerror) this.msgError = params.msgerror;
			try {
				$(this.oEl.form).submit(function() {
					return HOTELMANAGER.newsletter.submit();
				});
				$(this.oEl.submit).click(function() {
					if ($(this)[0].tagName != 'BUTTON' && $(this)[0].tagName != 'SUBMIT')$(HOTELMANAGER.newsletter.oEl.form).submit();
				});
			} catch (e) {
				YAHOO.util.Event.addListener(HOTELMANAGER.newsletter.oEl.submit, "click", function(){
					HOTELMANAGER.newsletter.submit();
				});
			}
		},
		submit: function(params) {
			var oForm = HOTELMANAGER.newsletter.oEl.form;
			var oInput = HOTELMANAGER.newsletter.oEl.input;
			var oLink = HOTELMANAGER.newsletter.oEl.submit;
			if (!HOTELMANAGER.utils.isEmail(oInput.value)) {
				alert(this.msgError);
				return false;
			}
			var strlocation = oForm.action+'?email='+oInput.value;
			strlocation += '&lang='+oForm.lang.value;
			strlocation += '&idPartner='+oForm.idPartner.value;
			strlocation += '&idPrm='+oForm.idPrm.value;
			strlocation += '&idONg='+oForm.idONg.value;
			if (oForm.promoId) strlocation += "&promoId=" + oForm.promoId.value;
			oLink.href = strlocation;
		},
		iframe: function(params) {
			var search;
			if (!window.location.search) {
				search = '?'+params.search;
			}else {
				search = String(window.location.search);
			}
			HOTELMANAGER.utils.trackFrame(params.iframe, params.url + search);
		}
	};
	HOTELMANAGER.booking = {
		callback: {
			save: null
		},
		oErr: {
			noselect: 'Necesita seleccionar un hotel'
		},
		oEl: {
			form: null,
			destinos: null,
			hoteles: null,
			link: null
		},
		init: function(params) {
			var utils = HOTELMANAGER.utils;
			var oEl = HOTELMANAGER.booking.oEl;
			var oErr = HOTELMANAGER.booking.oErr;
			oEl.form = utils.getObject('form_buscador');
			oEl.destinos = utils.getObject('destinos');
			oEl.hoteles	= utils.getObject('hoteles');
			oEl.paxroomsdiv	= utils.getObject('paxrooms');
			oEl.paxroomsnum	= utils.getObject('paxnumrooms');
			oEl.link = utils.getObject('link_reservas');
			HOTELMANAGER.booking.callback.save = params.save;
			if (params.errors) {
				if (params.errors.noselect)	oErr.noselect = params.errors.noselect;
			}
			if (params.form) oEl.form = utils.getObject(params.form);
			if (params.destinos) oEl.destinos = utils.getObject(params.destinos);
			if (params.hoteles) oEl.hoteles = utils.getObject(params.hoteles);
			if (params.paxroomsdiv) oEl.paxroomsdiv = utils.getObject(params.paxroomsdiv);
			if (params.paxroomsnum) oEl.paxroomsnum = utils.getObject(params.paxroomsnum);
			if (params.link) oEl.link = utils.getObject(params.link);
			if (HOTELMANAGER.version == 1) {
				YAHOO.util.Event.addListener(HOTELMANAGER.booking.oEl.link, "click", function(){
					HOTELMANAGER.booking.buildLink();
				});
				if (oEl.destinos) {
					YAHOO.util.Event.addListener(HOTELMANAGER.booking.oEl.destinos, "change", function(){
						HOTELMANAGER.booking.ajax.onChangeDestinos(true);
						try { 
							var comboHoteles = HOTELMANAGER.booking.oEl.hoteles;
							var aComboHoteles = new Array();
							var idx = 0;
							for (var i = 0; i < comboHoteles.length; i++){
								if (comboHoteles[i].value != 0) {
									aComboHoteles[idx] = (comboHoteles[i].value);
									idx = idx + 1;
								}
							}
							if (aComboHoteles){
								HOTELMANAGER.dist.aplicarDistribucionPaxes(aComboHoteles); 
							} else {
								HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
							}
						} catch(e){
							HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
						}
					});
				}
				if (oEl.hoteles) {
					YAHOO.util.Event.addListener(HOTELMANAGER.booking.oEl.hoteles, "change", function() {
						HOTELMANAGER.booking.ajax.onChangeHotel();
					});
				}
				HOTELMANAGER.booking.ajax.startRequest();
				YAHOO.util.Event.addListener(HOTELMANAGER.booking.oEl.paxroomsnum, "change", function(){
					HOTELMANAGER.booking.habitaciones.fillRooms();
				});
			}else {
				$(HOTELMANAGER.booking.oEl.link).click(function() {
					HOTELMANAGER.booking.buildLink();
				});
				if (oEl.destinos) {
					this._Destinations.buildOptions();
					YAHOO.util.Event.addListener(HOTELMANAGER.booking.oEl.destinos, "change", function(){
						HOTELMANAGER.booking.ajax.onChangeDestinos(true);
						try { 
							var comboHoteles = HOTELMANAGER.booking.oEl.hoteles;
							var aComboHoteles = new Array();
							var idx = 0;
							for (var i = 0; i < comboHoteles.length; i++){
								if (comboHoteles[i].value != 0) {
									aComboHoteles[idx] = (comboHoteles[i].value);
									idx = idx + 1;
								}
							}
							if (aComboHoteles){
								HOTELMANAGER.dist.aplicarDistribucionPaxes(aComboHoteles); 
							} else {
								HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
							}
						} catch(e){
							HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
						}
					});
				}
				if (oEl.hoteles) {
					this._Hotels.buildOptions();
					YAHOO.util.Event.addListener(HOTELMANAGER.booking.oEl.hoteles, "change", function() {
						HOTELMANAGER.booking.ajax.onChangeHotel();
					});
				}
				$(HOTELMANAGER.booking.oEl.paxroomsnum).change(function() {
					HOTELMANAGER.booking.habitaciones.fillRooms();
				});
			}
			HOTELMANAGER.booking.habitaciones.fillRooms();
			setTimeout('HOTELMANAGER.booking._restoreBookingFromGet()',500);
			return true;
		},
		_Destinations: {
			Ready: false,
			onChange: true,
			select: function(i) {
				if (!$.isArray(i)) {
					$("select[title=hmb_destinations_select]").val(0);
					return false;
				}
				HOTELMANAGER.booking._Destinations.onChange = false;
				for(var f in i) {
					var d = HOTELMANAGER.config.destinations.list[ 'd'+i[f] ];
					$("select[title=hmb_destinations_select]").val(d.code);
				}
			},
			getDestinations: function(parent) {
				var arrDestinations = new Array();
				html = "";
				for (var i in HOTELMANAGER.config.destinations.list) {
					var d = HOTELMANAGER.config.destinations.list[i];
					if (d.id_parentsection == parent) {
						var name;
						try {
							name = d.lang[ HOTELMANAGER.lang.getLanguage() ].name;
						} catch(e) {
							name = d.destination;
						}
						var lines = '';
						var i = 0;
						for(i=0; i<d.level; i++) {
							lines += '&nbsp;&nbsp;';
						}
						html += '<option class="level'+d.level+'" title="'+d.id+'" value="'+d.code+'">'+lines+name+'</option>'+"\n";
						html += this.getDestinations(d.id);
					}
				}
				return html;
			},
			buildOptions: function() {
				var oEl = HOTELMANAGER.booking.oEl;
				var oFORM = HOTELMANAGER.booking.oEl.form;
				var html = '';
				html += '<option value="0">'+HOTELMANAGER.lang.get('todos los destinos')+'</option>'+"\n";
				html += this.getDestinations(0);
				$(oEl.destinos).html(html);
				if (!HOTELMANAGER.booking._Destinations.Ready) {
					$(oEl.destinos).change(function() {
						if (!HOTELMANAGER.booking._Destinations.Ready && oFORM.zona.value > 0) {
							// $("select[title=hmb_destinations_select]").val(oFORM.zona.value);
							// $("select[title=hmb_destinations_select] option[value="+oFORM.zona.value+"]").attr('selected','selected');
						}else {
							oFORM.zona.value = $(this).val();
						}
						$("select[id=destinos] option:selected").each(function () {
							if (HOTELMANAGER.booking._Hotels.Ready) {
								try {
									var d = HOTELMANAGER.config.destinations.list[ 'd'+$(this).attr('title') ];
									HOTELMANAGER.booking._Hotels.buildOptions(d.hotels);
								} catch(e) {
									HOTELMANAGER.booking._Hotels.buildOptions(false);
								}
							}
						});
					}).trigger('change');
					HOTELMANAGER.booking._Destinations.Ready = true;
				}else {
					$("select[title=hmb_destinations_select] option:selected").each(function () {
						oFORM.zona.value = $(this).attr('value');
					});
				}
				if (HOTELMANAGER.utils.getUrlP('tipoTarifa')){
					try { oFORM.tipoTarifa.value = HOTELMANAGER.utils.getUrlP('tipoTarifa'); }catch(e){}
				}
			}
		},
		_Hotels: {
			Ready: false,
			onChange: true,
			buildOption: function(i, filter) {
				var found = true;
				var one = false;
				if ($.isArray(filter)) {
					found = false;
					for (var f in filter) {
						if (filter[f] == i) {
							found = true;
							break;
						}
					}
					if (filter.length <= 1) one = true;
				}
				if (found == false) return '';
				var oFORM = HOTELMANAGER.booking.oEl.form;
				var h = HOTELMANAGER.config.hotels.list[i];
				if (!h) return false;
				if (!HOTELMANAGER.booking._Hotels.Ready && oFORM.codigoHotel.value > 0) {
					if (h.hotelcode == oFORM.codigoHotel.value) {
						one = true;
					}
				}
				return  '<option title="'+h.id+'" value="'+h.hotelcode+'"'+(one ? ' selected="selected" ' : '')+'>'+h.hotelname+'</option>'+"\n";
			},
			buildOptions: function(filter) {
				var oEl = HOTELMANAGER.booking.oEl;
				var oFORM = HOTELMANAGER.booking.oEl.form;
				if ($.isArray(filter)) {
					HOTELMANAGER.booking._Hotels.onChange = false;
				}
				else {
					filter = false;
				}
				var html = '';
				html += '<option value="0"'+(!filter ? ' selected="selected" ' : '')+'>'+HOTELMANAGER.lang.get('todos los hoteles')+'</option>'+"\n";
				// ordenar alfabeticamente
				var hotelesOrdenados = [];
				$.each(HOTELMANAGER.config.hotels.list, function(key, value) { 
				  hotelesOrdenados.push(value)
				});
				hotelesOrdenados.sort(function SortByName(x,y) {
			      return ((x.hotelname == y.hotelname) ? 0 : ((x.hotelname > y.hotelname) ? 1 : -1));
			    });
				for (var i in hotelesOrdenados)html += HOTELMANAGER.booking._Hotels.buildOption(hotelesOrdenados[i][0], filter);
				$(oEl.hoteles).html(html);
				if (!HOTELMANAGER.booking._Hotels.Ready) {
					$(oEl.hoteles).attr('title','hmb_hotels_select');
					$(oEl.hoteles).change(function() {
						oFORM.codigoHotel.value = $(this).val();
						$("select[title=hmb_hotels_select] option:selected").each(function () {
							var h = HOTELMANAGER.config.hotels.list[ $(this).attr('title') ];
							try {
								HOTELMANAGER.booking._Destinations.select(h.destinations);
							} catch(e) {
								HOTELMANAGER.booking._Destinations.select(0);
							}
						});
					}).trigger('change');
					HOTELMANAGER.booking._Hotels.Ready = true;
				}else {
					$("select[title=hmb_hotels_select] option:selected").each(function () {
						oFORM.codigoHotel.value = $(this).attr('value');
					});
				}
				if (HOTELMANAGER.utils.getUrlP('tipoTarifa')){
					try { oFORM.tipoTarifa.value = HOTELMANAGER.utils.getUrlP('tipoTarifa'); }catch(e){}
				}
			}
		},
		_restoreBookingFromGet: function() {
			var utils = HOTELMANAGER.utils;
			var oEl = HOTELMANAGER.booking.oEl;
			var oFORM = HOTELMANAGER.booking.oEl.form;
			if (utils.getUrlP('zona') && utils.getUrlP('codigoHotel') == '0') {
				try {
					$(oEl.destinos).val(utils.getUrlP('zona'));
					$(oEl.destinos).change();
				} catch(e) {}
			}else if (utils.getUrlP('codigoHotel')) {
				try {
					$(oEl.hoteles).val(utils.getUrlP('codigoHotel'));
					$(oEl.hoteles).change();
				} catch(e) {}
			}
			if (oFORM.fechaLlegada && oFORM.fechaSalida){
				if (utils.getUrlP('dia') && utils.getUrlP('mes') && utils.getUrlP('anio')) oFORM.fechaLlegada.value = utils.getUrlP('dia')+'-'+utils.getUrlP('mes')+'-'+utils.getUrlP('anio');
				if (utils.getUrlP('diaHasta') && utils.getUrlP('mesHasta') && utils.getUrlP('anioHasta')) oFORM.fechaSalida.value = utils.getUrlP('diaHasta')+'-'+utils.getUrlP('mesHasta')+'-'+utils.getUrlP('anioHasta');
			} else {
				if (utils.getUrlP('dia')) oFORM.en_dia.value = utils.getUrlP('dia');
				if (utils.getUrlP('diaHasta')) oFORM.sa_dia.value = utils.getUrlP('diaHasta');
				if (utils.getUrlP('mes') && utils.getUrlP('anio')) oFORM.en_mesano.value = utils.getUrlP('mes')+'-'+utils.getUrlP('anio');
				if (utils.getUrlP('mesHasta') && utils.getUrlP('anioHasta')) oFORM.sa_mesano.value = utils.getUrlP('mesHasta')+'-'+utils.getUrlP('anioHasta');
			}
			var rooms = Number(utils.getUrlP('habitaciones'));
			if (rooms > 0) {
				oFORM.no_hab.value = rooms;
				HOTELMANAGER.booking.habitaciones.fillRooms();
				for(var i=1; i<=rooms; i++) {
					utils.getObject('adultsRoom'+i).value = utils.getUrlP('adultsRoom'+i);
					var childrenRoom = Number(utils.getUrlP('childrenRoom'+i));
					utils.getObject('childrenRoom'+i).value = childrenRoom;
					HOTELMANAGER.booking.habitaciones.fillChildsAgeDiv('divChilds'+i, 'childrenRoom'+i, (i-1));
					for(var x=1; x <= childrenRoom; x++) { 
						utils.getObject('child'+x+'Room'+i).value = Number(utils.getUrlP('child'+x+'Room'+i));
					}
				}
			}
			// si viene codigo de agencio/empresa
			if (utils.getUrlP('orgType')) {
				if (utils.getUrlP('codigoAgencia')) { // si viene un codigo de agencia
					oFORM.orgType.value = utils.getUrlP('orgType');
					oFORM.codigoAgencia.value = utils.getUrlP('codigoAgencia');
				} else if (utils.getUrlP('codigoEmpresa')){ // si viene un codigo de empresa
					oFORM.orgType.value = utils.getUrlP('orgType');
					oFORM.codigoEmpresa.value = utils.getUrlP('codigoEmpresa');
				} else { // si vienen ambos en blanco
					oFORM.codigoAgencia.value = '';
					oFORM.codigoEmpresa.value = '';
					oFORM.orgType.value = '';
				}
			}
			
			if (utils.getUrlP('tipoTarifa')){
				try { oFORM.tipoTarifa.value = HOTELMANAGER.utils.getUrlP('tipoTarifa'); }catch(e){}
			}
			return true;
		},
		destinos: function(params) {
			return HOTELMANAGER.booking.init(params);
		},
		setParams: function(params) {
			var utils = HOTELMANAGER.utils;
			var oEl = HOTELMANAGER.booking.oEl;
			if (!oEl.form) {
				oEl.form = utils.getObject('form_buscador');
			}
			for (var name in params) {
				var value = params[name];
				if (oEl.form[name]) {
					oEl.form[name].value = value;
				}
			}
		},
		getUrlFromGet: function(params) {
			if (!params) { params = {}; }
			var utils = HOTELMANAGER.utils;
			var bNew = '';
			if (params.version == 2) bNew = 'New';
			var base = "http://www.idiso.com/csl/reservations"+bNew+"/jsp/C_Search_Availability.jsp";
			if (params.version == 3) 
				base = "http://www.idiso.com/csl/reservationsNew/jsp/C_Search_Availability.jsp";			
			var _codigoHotel = utils.getUrlP('codigoHotel');
			if (Number(_codigoHotel) > 0) {
				base = 'http://www.idiso.com/csl/reservationsNew/jsp/C_Rates.jsp';
			}
			if (utils.getUrlP('tipoTarifa') &&  utils.getUrlP('directa')!="Y") {
				try {
					var oEl = HOTELMANAGER.booking.oEl;
					if (oEl){
						if (params.form) oEl.form = utils.getObject(params.form);
						if (oEl.form) oEl.form.style.display = "none";
					}
				} catch(ex) {}				
				base = "http://www.idiso.com/csl/reservationsNew/jsp/C_Search_Dates.jsp";
			}
			var _search = String(window.location.search);
			if (_search == '') _search = '?lang='+HOTELMANAGER.lang.actual;
			try {
			    if (params.customCSS){
                    if (params.isdesign && params.isdesign.toString().toUpperCase() == 'TRUE') {
                        var urldesign = "http://"+document.domain;
                        if ((document.URL).split("/")[6]) urldesign = "https://"+(document.URL).split("/")[2]+'/'+(document.URL).split("/")[3]+'/'+(document.URL).split("/")[4]+'/'+(document.URL).split("/")[5]+'/'+(document.URL).split("/")[6];
                        _search += '&rutaImagenes='+urldesign+'/img_book/';
                        _search += '&rutaEstilos='+urldesign+'/css_book/';
                    } else {
                        if (!utils.getUrlP('rutaImagenes')) {
                            _search += '&rutaImagenes='+HOTELMANAGER.utils.getDir(utils.getUrlP("idPartner"))+'img_book/';
                        }
                        if (!utils.getUrlP('rutaEstilos')) {
                            _search += '&rutaEstilos='+HOTELMANAGER.utils.getDir(utils.getUrlP("idPartner"))+'css_book/';
                        }
                    }
				}
			}catch(e) {}
			_search += '&cancelLink=false';
			try {
				if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1 || navigator.userAgent.toLowerCase().indexOf("ipad") > -1) 
					window.parent.location=base + HOTELMANAGER.cookie.set(_search);			
				else 
					HOTELMANAGER.utils.trackFrame('iframeBEIdiso', base + HOTELMANAGER.cookie.set(_search));
				return true;
			}catch(e) {
				HOTELMANAGER.utils.trackFrame('iframeBEIdiso', base + HOTELMANAGER.cookie.set(_search));
				return true;
			}
			
		}
	};
	HOTELMANAGER.booking.ajax = {
		onChangeDestinos: function (actualizarHoteles) {
			var config = HOTELMANAGER.config;
			var destino = HOTELMANAGER.booking.oEl.destinos.options[ HOTELMANAGER.booking.oEl.destinos.selectedIndex ];
			var oFORM = HOTELMANAGER.booking.oEl.form;
			var hsel = HOTELMANAGER.booking.oEl.hoteles;
			var indice = parseInt(destino.value);
			hsel.length = 0;
			hel = document.createElement('option');
			hel.text = HOTELMANAGER.lang.get("todos los hoteles");
			hel.value = "0";
			try {
				hsel.add(hel, null); // standards compliant; doesn't work in IE
			} catch(ex) {
				hsel.add(hel); // IE only
			}
			var cacheDESTS = {};
			if (HOTELMANAGER.config.DESTS.length > 0) {
				for(var i = 0; i < HOTELMANAGER.config.DESTS.length; i++) {
					var dst = HOTELMANAGER.config.DESTS[i];
					if (indice == 0) {
						try {
							for (var j = 0; j < HOTELMANAGER.config.HOTELS[dst.ID].length; j++) {
								hel = document.createElement('option');
								hel.text = HOTELMANAGER.config.HOTELS[dst.ID][j].NAME;
								hel.value = HOTELMANAGER.config.HOTELS[dst.ID][j].CODE;
								if (oFORM.codigoHotel && oFORM.codigoHotel.value == config.HOTELS[dst.ID][j].CODE) hel.selected = true;
								try {
									hsel.add(hel, null); // standards compliant; doesn't work in IE
								} catch(ex) {
									hsel.add(hel); // IE only
								}
							}
						}catch(e) {}
					}
					try {
						if (HOTELMANAGER.booking.oEl.destinos.value == 0) oFORM.zona.value = 0;
					} catch(e) {}
					if (dst.ID == HOTELMANAGER.booking.oEl.destinos.value) {
						try {
							oFORM.zona.value = dst.CODE;
							break;
						} catch(e) {}
					}
				}
			}
			if (indice == 0 || config.HOTELS[indice] == null) return;
			if (config.HOTELS[indice] != null && config.HOTELS[indice].length > 0) {
				hsel.length = 0;
				hel = document.createElement('option');
				hel.text = "Todos";
				hel.value = "0";
				try {
					hsel.add(hel, null); // standards compliant; doesn't work in IE
				} catch(ex) {
					hsel.add(hel); // IE only
				}
				for (var j = 0; j < config.HOTELS[indice].length; j++) {
					hel = document.createElement('option');
					hel.text = config.HOTELS[indice][j].NAME;
					hel.value = config.HOTELS[indice][j].CODE;
					if (oFORM.codigoHotel && oFORM.codigoHotel.value == config.HOTELS[indice][j].CODE) hel.selected = true;
					try {
						hsel.add(hel, null); // standards compliant; doesn't work in IE
					} catch(ex) {
						hsel.add(hel); // IE only
					}
				}
				if (HOTELMANAGER.config.HOTELS[indice].length == 1) {
					hel.selected = true;
				}
			}
			if (actualizarHoteles) {
				this.onChangeHotel(hsel.options[hsel.selectedIndex]);
			}
			HOTELMANAGER.booking.buildLink();
		},
		onChangeHotel: function (hotelOpt) {
			if (!hotelOpt) {
				hotelOpt = HOTELMANAGER.booking.oEl.hoteles.options[HOTELMANAGER.booking.oEl.hoteles.selectedIndex];
			}
			HOTELMANAGER.booking.oEl.form.codigoHotel.value = hotelOpt.value;
			// aplicamos la configuracion de pax-por-habitacion del hotel
			if (hotelOpt.value!=0) {
				HOTELMANAGER.dist.aplicarDistribucionPaxes(new Array(hotelOpt.value));
			} else {
				var comboHoteles = HOTELMANAGER.booking.oEl.hoteles;
				if (comboHoteles){
					var aComboHoteles = new Array();
					var idx = 0;
					for (var i = 0; i < comboHoteles.length; i++){
						if (comboHoteles[i].value != 0) {
							aComboHoteles[idx] = (comboHoteles[i].value);
							idx = idx + 1;
						}
					}
					HOTELMANAGER.dist.aplicarDistribucionPaxes(aComboHoteles);
				} else {
					HOTELMANAGER.dist.aplicarDistribucionPaxesPorDefecto();
				}
			}
			// seleccionamos el destino correspondiente al hotel elegido. ¡¡mucho cuidado con no enbuclarnos con el onchange de los destinos!!
			try {
				if (hotelOpt.value != 0){
					$("#destinos option:selected").removeAttr("selected");
					var destinosHotel = HOTELMANAGER.config.hotels.list[HOTELMANAGER.config.code2id[hotelOpt.value]].destinations;
					$($('#destinos [value="'+destinosHotel[0]+'"]')[0]).attr("selected","selected");
					HOTELMANAGER.booking.ajax.onChangeDestinos(false);
				}
			}catch(e){}
			HOTELMANAGER.booking.callback.save;
			HOTELMANAGER.booking.buildLink();
		},
		updateHotelCode: function () {
			var codigoHotel_reg = new RegExp('codigoHotel=([0-9]+)');
			var codigoHotel = codigoHotel_reg.exec(String(window.location.search));
			if (codigoHotel != null) HOTELMANAGER.booking.oEl.form.codigoHotel.value = codigoHotel[1];
		},
		updateZoneCode: function () {
			var zona_reg = new RegExp('zona=([0-9]+)');
			var zona = zona_reg.exec(String(window.location.search));
			if (zona != null) HOTELMANAGER.booking.oEl.form.zona.value = zona[1];
		},
		handleSuccess: function(oRequest , oParsedResponse) {
			HOTELMANAGER.config = oParsedResponse.results[0];
			HOTELMANAGER.booking.habitaciones.reset();
			HOTELMANAGER.booking.habitaciones.fillRooms();
			var config = HOTELMANAGER.config;
			var sel = HOTELMANAGER.booking.oEl.destinos;
			var hsel = HOTELMANAGER.booking.oEl.hoteles;
			HOTELMANAGER.booking.ajax.updateHotelCode();
			HOTELMANAGER.booking.ajax.updateZoneCode();
			if (oParsedResponse.results[0].DESTS && oParsedResponse.results[0].DESTS.length > 0) {
				var el, hel;
				for (var i = 0; i < oParsedResponse.results[0].DESTS.length; i++) {
					el = document.createElement('option');
					el.text = oParsedResponse.results[0].DESTS[i].NAME;
					el.value = oParsedResponse.results[0].DESTS[i].ID;
					if (HOTELMANAGER.booking.oEl.form.zona)
						if (HOTELMANAGER.booking.oEl.form.zona.value == oParsedResponse.results[0].DESTS[i].CODE) el.selected = true;
					if (sel) {
						try {
							sel.add(el, null); // standards compliant; doesn't work in IE
						} catch(ex) {
							sel.add(el); // IE only
						}
					}
					if (oParsedResponse.results[0].HOTELS[el.value] && oParsedResponse.results[0].HOTELS[el.value].length > 0) {
						for (var j = 0; j < oParsedResponse.results[0].HOTELS[el.value].length; j++) {
							hel = document.createElement('option');
							hel.text = oParsedResponse.results[0].HOTELS[el.value][j].NAME;
							hel.value = oParsedResponse.results[0].HOTELS[el.value][j].CODE;
							if (HOTELMANAGER.booking.oEl.form.codigoHotel.value == oParsedResponse.results[0].HOTELS[el.value][j].CODE) hel.selected = true;
							if (hsel) {
								try {
									hsel.add(hel, null); // standards compliant; doesn't work in IE
								} catch(ex) {
									hsel.add(hel); // IE only
								}
							}
						}
					}
				}
			}
			if (HOTELMANAGER.booking.oEl.destinos) {
				HOTELMANAGER.booking.ajax.onChangeDestinos(true);
			}
		},
		handleFailure:function(oRequest , oParsedResponse) { 
			// Failure handler
		},
		startRequest:function() {
			var invData = new YAHOO.util.DataSource("");
			invData.responseType = YAHOO.util.DataSource.TYPE_JSON;
	 		invData.maxCacheEntries = 0;
			invData.responseSchema = {
				resultsList : "HM"
			};
			invData.sendRequest("../config/config.js", HOTELMANAGER.booking.ajax.callback);
		}
	};
	HOTELMANAGER.booking.ajax.callback = {
		success: HOTELMANAGER.booking.ajax.handleSuccess,
		failure: HOTELMANAGER.booking.ajax.handleFailure,
		scope: HOTELMANAGER.booking.ajax,
		timeout: 5000,
		cache:false
	};
	HOTELMANAGER.booking.habitaciones = {
		aclass: 'clase_prueba',
		default_rooms_number: 1,
		default_adults_number: 4,
		default_adult_number: 2,
		default_childs_number: 2,
		deafult_child_number: 0,
		default_childs_age: 11,
		default_child_age: 1,
		default_child_age_min: 0,
		adult_dic: 'Adultos',
		nin_dic: 'Ni&ntilde;os',
		ninage_dic: 'Edad ni&ntilde;os',
		room_dic: 'Habitaci&oacute;n',
		get_rooms_number: function () {
			if (!HOTELMANAGER.booking.oEl.paxroomsnum) return this.default_rooms_number;
			else return HOTELMANAGER.booking.oEl.paxroomsnum.options[HOTELMANAGER.booking.oEl.paxroomsnum.selectedIndex].value;
		},
		get_adults_number: function () {
			return this.default_adults_number;
		},
		get_adult_number: function () {
			return this.default_adult_number;
		},
		get_childs_number: function () {
			return this.default_childs_number;
		},
		get_child_number: function () {
			return this.default_child_number;
		},
		get_childs_age: function () {
			return this.default_childs_age;
		},
		get_child_age: function () {
			return this.default_child_age;
		},
		get_child_age_min: function () {
			return this.default_child_age_min;
		},
		reset: function () {
			HOTELMANAGER.booking.oEl.paxroomsdiv.innerHTML = '';
		},
		fillRooms: function () {
			if (!HOTELMANAGER.booking.oEl.paxroomsdiv) return;
			if (HOTELMANAGER.config && HOTELMANAGER.config.DICCTIONARY) {
				this.adult_dic = (HOTELMANAGER.config.DICCTIONARY.adultos ? HOTELMANAGER.config.DICCTIONARY.adultos[HOTELMANAGER.lang.getLanguage()] : this.adult_dic);
				this.nin_dic = (HOTELMANAGER.config.DICCTIONARY.niños ? HOTELMANAGER.config.DICCTIONARY.niños[HOTELMANAGER.lang.getLanguage()] : this.nin_dic);
				this.ninage_dic = (HOTELMANAGER.config.DICCTIONARY.edad_niño ? HOTELMANAGER.config.DICCTIONARY.edad_niño[HOTELMANAGER.lang.getLanguage()] : this.ninage_dic);
				this.room_dic = (HOTELMANAGER.config.DICCTIONARY.habitación ? HOTELMANAGER.config.DICCTIONARY.habitación[HOTELMANAGER.lang.getLanguage()] : this.room_dic);
			}
			var sel1, sel2, el, fielset, legend, label1, label2, label3, divChilds, remove;
			for (var i = 0; i < this.get_rooms_number(); i++) {
				if (HOTELMANAGER.utils.getObject ('fieldRoom'+(i+1))) continue;
				sel1 = document.createElement('select');
				sel2 = document.createElement('select');
				for (var j = 0; j <= this.get_adults_number(); j++) {
					el = document.createElement('option');
					el.text = j;
					el.value = j;
					try {
						sel1.add(el, null); // standards compliant; doesn't work in IE
					} catch(ex) {
						sel1.add(el); // IE only
					}
				}
				j = 0;			
				for (j = 0; j <= this.get_childs_number(); j++) {
					el = document.createElement('option');
					el.text = j;
					el.value = j;
					try {
						sel2.add(el, null); // standards compliant; doesn't work in IE
					} catch(ex) {
						sel2.add(el); // IE only
					}
				}
				divChilds = document.createElement('div');
				fieldset = document.createElement('fieldset');
				fieldset.id = 'fieldRoom'+(i+1);
				fieldset.className = 'fieldRoom';
				legend = document.createElement('legend');
				titulo1 = document.createElement('label');
				titulo2 = document.createElement('label');
				titulo1.className = 'labelRoom';
				titulo2.className = 'labelRoom';
				titulo1.innerHTML = this.adult_dic + ': ';
				titulo2.innerHTML = this.nin_dic + ': ';
				legend.innerHTML = this.room_dic + ' ' + (i+1);
				fieldset.appendChild(legend);
				fieldset.appendChild(titulo1);
				sel1.selectedIndex = this.get_adult_number();
				sel1.id = 'adultsRoom'+(i+1);
				sel1.className = 'adultsRoom';
				fieldset.appendChild(sel1);				
				sel2.selectedIndex = this.get_child_number();
				sel2.id = 'childrenRoom'+(i+1);
				sel2.className = 'childrenRoom';
				if (this.get_childs_number()!=0){ 
					fieldset.appendChild(titulo2);
					fieldset.appendChild(sel2);
					divChilds.id = 'divChilds'+(i+1);
					divChilds.className = 'divChilds';
					fieldset.appendChild(divChilds);
				}
				HOTELMANAGER.booking.oEl.paxroomsdiv.appendChild(fieldset);
				eval ("YAHOO.util.Event.addListener('childrenRoom"+(i+1)+"', \"change\", function(){ HOTELMANAGER.booking.habitaciones.fillChildsAgeDiv('divChilds"+(i+1)+"', 'childrenRoom"+(i+1)+"', "+i+"); });");
			}
			remove = HOTELMANAGER.utils.getObject ('fieldRoom'+(i+1))
			while (remove) {
				remove.parentNode.removeChild(remove);
				i++;
				remove = HOTELMANAGER.utils.getObject ('fieldRoom'+(i+1))
			}		
		},
		fillChildsAgeDiv: function (divName, childSelectName, num) {
			var label, sel;
			div = HOTELMANAGER.utils.getObject(divName);
			childSelect = HOTELMANAGER.utils.getObject(childSelectName);
			div.innerHTML = '';
			for (var i = 0; i < childSelect.selectedIndex; i++) {
				sel = document.createElement('select');
				label = document.createElement('label');
				label.innerHTML = this.ninage_dic + ' ' + (i+1);
				for (var j = this.get_child_age_min()-1; j < this.get_childs_age(); j++) {
					el = document.createElement('option');
					el.text = j+1;
					el.value = j+1;
					try {
						sel.add(el, null); // standards compliant; doesn't work in IE
					} catch(ex) {
						sel.add(el); // IE only
					}
				}
				div.appendChild(label);
				sel.id = 'child'+(i+1)+'Room'+(num+1);
				sel.className = 'childRoom';
				sel.selectedIndex = this.get_child_age();
				div.appendChild(sel);
			}
		}
	};
	HOTELMANAGER.booking.dateValidate = function(params){
		return validaFechas();
	};
	HOTELMANAGER.booking.buildLink = function(params){
		var utils = HOTELMANAGER.utils;
		var oEl = HOTELMANAGER.booking.oEl;
		var oErr = HOTELMANAGER.booking.oErr;
		var oFORM = oEl.form;
		var linkReservas = oEl.link;
		if (!HOTELMANAGER.booking.dateValidate()) {
			linkReservas.href = "#";
			return;
		}
		if (params && params.msgError) msgError = params.msgError;
		try {
			if (oFORM.fechaLlegada && oFORM.fechaSalida) {
				var vDiaIni = (oFORM.fechaLlegada.value).split("-")[0];
				var vMesIni = (oFORM.fechaLlegada.value).split("-")[1];
				var vAnyoIni = (oFORM.fechaLlegada.value).split("-")[2];
				var vDiaFin = (oFORM.fechaSalida.value).split("-")[0];
				var vMesFin = (oFORM.fechaSalida.value).split("-")[1];
				var vAnyoFin = (oFORM.fechaSalida.value).split("-")[2];
			} else {
				var vDiaIni = oFORM.en_dia.value;
				var varray = changeFormat(oFORM.en_mesano.value);
				var vMesIni = varray[0];
				var vAnyoIni = varray[1];
				var vDiaFin = oFORM.sa_dia.value;
				var varray = changeFormat(oFORM.sa_mesano.value);
				var vMesFin = varray[0];
				var vAnyoFin = varray[1];
			}
		}catch(e){}
		var vNoPax = 0;
		var vNoNin = 0;
		var vAgeNin = 4;
		var vNoHab = Number(oFORM.no_hab.value);
		if (oFORM.no_pax) vNoPax = Number(oFORM.no_pax.value);
	    // Añadir input "use_no_pax_nin" para usar la distribución por cesta de la compra con 1 sola habitación
		if (oFORM.use_no_pax_nin) {
			if (oFORM.no_pax_nin) {
				if (Number(oFORM.no_pax_nin.value) > 0)
				vNoNin = Number(oFORM.no_pax_nin.value);
			}
			if (oFORM.age_nin) {
		        if (Number(oFORM.age_nin.value) >= 0) vAgeNin = Number(oFORM.age_nin.value);
			}
		} else {
			if (oFORM.no_pax_nin) {
				if (Number(oFORM.no_pax_nin.value) > 0) vNoPax += Number(oFORM.no_pax_nin.value);
			}
		}
		var url = oFORM.base.value+'.html';
		var urlOptions = "";
		urlOptions += "?codigoHotel=" + oFORM.codigoHotel.value;
		if (oFORM.zona && oEl.destinos) urlOptions += "&zona=" + oFORM.zona.value;
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
		urlOptions += "&habitaciones=" + vNoHab;
		if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1 || navigator.userAgent.toLowerCase().indexOf("ipad") > -1) 
			 urlOptions += "&otrasFechas=true";
		else{
				if (oFORM.otrasFechas)  {
					urlOptions += "&otrasFechas=" + oFORM.otrasFechas.value;
					if (oFORM.otrasFechasDesplegado)
						urlOptions += "&otrasFechasDesplegado=" + oFORM.otrasFechasDesplegado.value;
					else
						urlOptions += "&otrasFechasDesplegado=N";
					if (oFORM.mostrarBuscadorLateral)
						urlOptions += "&mostrarBuscadorLateral=" + oFORM.mostrarBuscadorLateral.value;
					else
						urlOptions += "&mostrarBuscadorLateral=N";
				} else {
					urlOptions += "&otrasFechas=false";
				}
			}
		// COMENTARIO
		if (oFORM.customCSS){
            if (oFORM.isdesign && oFORM.isdesign.value.toUpperCase() == 'TRUE') {
                var urldesign = "http://"+document.domain;
                if ((document.URL).split("/")[6]) urldesign = "https://"+(document.URL).split("/")[2]+'/'+(document.URL).split("/")[3]+'/'+(document.URL).split("/")[4]+'/'+(document.URL).split("/")[5]+'/'+(document.URL).split("/")[6];
                urlOptions += '&rutaImagenes='+urldesign+'/img_book/';
                urlOptions += '&rutaEstilos='+urldesign+'/css_book/';
            } else{
                urlOptions += '&rutaImagenes='+HOTELMANAGER.utils.getDir(oFORM.idPartner.value)+'img_book/';
                urlOptions += '&rutaEstilos='+HOTELMANAGER.utils.getDir(oFORM.idPartner.value)+'css_book/';
            }
		}
		//DISTRIBUCIÓN
		if (!HOTELMANAGER.booking.oEl.paxroomsdiv) {
			if (oFORM.use_no_pax_nin) {
				urlOptions += "&adultsRoom1=" + vNoPax;
				urlOptions += "&childrenRoom1=" + vNoNin;
				if (vNoNin == 1) urlOptions += "&child1Room1=" + vAgeNin;
			} else urlOptions += "&personas=" + vNoPax;
		} else {
			var adultsRoom, childrenRoom, childRoom;
			for (var i = 1; i <= HOTELMANAGER.booking.habitaciones.get_rooms_number(); i++) {
				adultsRoom = HOTELMANAGER.utils.getObject('adultsRoom'+i);
				childrenRoom = HOTELMANAGER.utils.getObject('childrenRoom'+i);
				if (!adultsRoom) continue;
				urlOptions += "&adultsRoom"+i+"=" + adultsRoom.options[adultsRoom.selectedIndex].value;
				if (!childrenRoom) continue;
				urlOptions += "&childrenRoom"+i+"=" + childrenRoom.options[childrenRoom.selectedIndex].value;
				for (var ij = 1; ij <= childrenRoom.options[childrenRoom.selectedIndex].value; ij++) {
					childRoom = HOTELMANAGER.utils.getObject('child'+ij+'Room'+i);
					if (!childRoom) break;
					urlOptions += "&child"+ij+"Room"+i+"=" + childRoom.options[childRoom.selectedIndex].value;
				}	
			}
		}
		if (oFORM.tipoTarifa) urlOptions += "&tipoTarifa=" + oFORM.tipoTarifa.value;
		if (oFORM.campaigncode) urlOptions += "&campaignCode=" + oFORM.campaigncode.value;
		if (oFORM.promoId) urlOptions += "&promoId=" + oFORM.promoId.value;
		try {
			//codigo agencia/empresa
	        if (oFORM.orgType && (oFORM.codigoAgencia || oFORM.codigoEmpresa)) {
	            if (oFORM.orgType.value != '') {
	                if (oFORM.codigoAgencia && oFORM.orgType.value == 'A') { // si viene un codigo de agencia
						if (oFORM.codigoAgencia.value != '') {
							urlOptions += "&orgType=A&codigoAgencia=" + oFORM.codigoAgencia.value;
						}
	                } else if (oFORM.codigoEmpresa && oFORM.orgType.value == 'C'){ // si viene un codigo de empresa
						if (oFORM.codigoEmpresa.value!=''){
							urlOptions += "&orgType=C&codigoEmpresa=" + oFORM.codigoEmpresa.value;
						}
	                }
	            }
	        }
	        // si no viene el parametro de agencia o empresa ni el tipo
	        if (!oFORM.orgType && (oFORM.codigoAgencia || oFORM.codigoEmpresa)) {
	            // si viene un codigo de agencia pero no de empresa
	            if (oFORM.codigoAgencia && !oFORM.codigoEmpresa){
	                if (oFORM.codigoAgencia.value != '') {
	                    urlOptions += "&orgType=A&codigoAgencia=" + oFORM.codigoAgencia.value;
	                }
	            }
	            // si viene un codigo de empresa pero no de agencia
	            if (!oFORM.codigoAgencia && oFORM.codigoEmpresa){
	                if (oFORM.codigoEmpresa.value != ''){
	                    urlOptions += "&orgType=C&codigoEmpresa=" + oFORM.codigoEmpresa.value;
	                }
	            }
	        }
		 }catch(e){}
		 if (oFORM.zona && oEl.destinos) {
			if (oFORM.zona.value < 1 && oFORM.codigoHotel.value < 1) linkReservas.href = "javascript:alert('"+HOTELMANAGER.lang.get(oErr.noselect)+"');";
			else linkReservas.href = url + urlOptions;
		 } else linkReservas.href = url + urlOptions;
	};
	
	HOTELMANAGER.booking.buildLinkOfertas = function(params){
		var utils = HOTELMANAGER.utils;
		if (params){
			var oEl = utils.getObject('searchFormOfertas'+params);
			var linkReservas = utils.getObject('link_reservas_ofertas'+params);
		}else{		
			var oEl = utils.getObject('searchFormOfertas');
			var linkReservas = utils.getObject('link_reservas_ofertas');
		}		
		
		var oErr = HOTELMANAGER.booking.oErr;
		var oFORM = oEl;
		
		if (!HOTELMANAGER.booking.dateValidate()) {
			linkReservas.href = "#";
			return;
		}
		if (params && params.msgError) msgError = params.msgError;
		try {
			if (oFORM.fechaLlegada && oFORM.fechaSalida) {
				var vDiaIni = (oFORM.fechaLlegada.value).split("-")[0];
				var vMesIni = (oFORM.fechaLlegada.value).split("-")[1];
				var vAnyoIni = (oFORM.fechaLlegada.value).split("-")[2];
				var vDiaFin = (oFORM.fechaSalida.value).split("-")[0];
				var vMesFin = (oFORM.fechaSalida.value).split("-")[1];
				var vAnyoFin = (oFORM.fechaSalida.value).split("-")[2];
			} else {
				var vDiaIni = oFORM.en_dia.value;
				var varray = changeFormat(oFORM.en_mesano.value);
				var vMesIni = varray[0];
				var vAnyoIni = varray[1];
				var vDiaFin = oFORM.sa_dia.value;
				var varray = changeFormat(oFORM.sa_mesano.value);
				var vMesFin = varray[0];
				var vAnyoFin = varray[1];
			}
		}catch(e){}
		var vNoPax = 0;
		var vNoNin = 0;
		var vAgeNin = 4;
		var vNoHab = Number(oFORM.no_hab.value);
		if (oFORM.no_pax) vNoPax = Number(oFORM.no_pax.value);
	    // Añadir input "use_no_pax_nin" para usar la distribución por cesta de la compra con 1 sola habitación
		if (oFORM.use_no_pax_nin) {
			if (oFORM.no_pax_nin) {
				if (Number(oFORM.no_pax_nin.value) > 0)
				vNoNin = Number(oFORM.no_pax_nin.value);
			}
			if (oFORM.age_nin) {
		        if (Number(oFORM.age_nin.value) >= 0) vAgeNin = Number(oFORM.age_nin.value);
			}
		} else {
			if (oFORM.no_pax_nin) {
				if (Number(oFORM.no_pax_nin.value) > 0) vNoPax += Number(oFORM.no_pax_nin.value);
			}
		}
		var url = oFORM.base.value+'.html';
		var urlOptions = "";
		urlOptions += "?codigoHotel=" + oFORM.codigoHotel.value;
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
		urlOptions += "&habitaciones=" + vNoHab;
		urlOptions += "&directa=Y";
		if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1 || navigator.userAgent.toLowerCase().indexOf("ipad") > -1) 
			 urlOptions += "&otrasFechas=true";
		else{
			if (oFORM.otrasFechas)  {
				urlOptions += "&otrasFechas=" + oFORM.otrasFechas.value;
				if (oFORM.otrasFechasDesplegado)
					urlOptions += "&otrasFechasDesplegado=" + oFORM.otrasFechasDesplegado.value;
				else
					urlOptions += "&otrasFechasDesplegado=N";
				if (oFORM.mostrarBuscadorLateral)
					urlOptions += "&mostrarBuscadorLateral=" + oFORM.mostrarBuscadorLateral.value;
				else
					urlOptions += "&mostrarBuscadorLateral=N";
			} else {
				urlOptions += "&otrasFechas=false";
			}
		}
		// COMENTARIO
		if (oFORM.customCSS){
            if (oFORM.isdesign && oFORM.isdesign.value.toUpperCase() == 'TRUE') {
                var urldesign = "http://"+document.domain;
                if ((document.URL).split("/")[6]) urldesign = "https://"+(document.URL).split("/")[2]+'/'+(document.URL).split("/")[3]+'/'+(document.URL).split("/")[4]+'/'+(document.URL).split("/")[5]+'/'+(document.URL).split("/")[6];
                urlOptions += '&rutaImagenes='+urldesign+'/img_book/';
                urlOptions += '&rutaEstilos='+urldesign+'/css_book/';
            } else{
                urlOptions += '&rutaImagenes='+HOTELMANAGER.utils.getDir(oFORM.idPartner.value)+'img_book/';
                urlOptions += '&rutaEstilos='+HOTELMANAGER.utils.getDir(oFORM.idPartner.value)+'css_book/';
            }
		}
		//DISTRIBUCIÓN
		if (!HOTELMANAGER.booking.oEl.paxroomsdiv) {
			if (oFORM.use_no_pax_nin) {
				urlOptions += "&adultsRoom1=" + vNoPax;
				urlOptions += "&childrenRoom1=" + vNoNin;
				if (vNoNin == 1) urlOptions += "&child1Room1=" + vAgeNin;
			} else urlOptions += "&personas=" + vNoPax;
		} else {
			var adultsRoom, childrenRoom, childRoom;
			for (var i = 1; i <= HOTELMANAGER.booking.habitaciones.get_rooms_number(); i++) {
				adultsRoom = HOTELMANAGER.utils.getObject('adultsRoom'+i);
				childrenRoom = HOTELMANAGER.utils.getObject('childrenRoom'+i);
				if (!adultsRoom) continue;
				urlOptions += "&adultsRoom"+i+"=" + adultsRoom.options[adultsRoom.selectedIndex].value;
				if (!childrenRoom) continue;
				urlOptions += "&childrenRoom"+i+"=" + childrenRoom.options[childrenRoom.selectedIndex].value;
				for (var ij = 1; ij <= childrenRoom.options[childrenRoom.selectedIndex].value; ij++) {
					childRoom = HOTELMANAGER.utils.getObject('child'+ij+'Room'+i);
					if (!childRoom) break;
					urlOptions += "&child"+ij+"Room"+i+"=" + childRoom.options[childRoom.selectedIndex].value;
				}	
			}
		}
		if (oFORM.tipoTarifa) urlOptions += "&tipoTarifa=" + oFORM.tipoTarifa.value;
		if (oFORM.campaigncode) urlOptions += "&campaignCode=" + oFORM.campaigncode.value;
		if (oFORM.promoId) urlOptions += "&promoId=" + oFORM.promoId.value;
		try {
			//codigo agencia/empresa
	        if (oFORM.orgType && (oFORM.codigoAgencia || oFORM.codigoEmpresa)) {
	            if (oFORM.orgType.value != '') {
	                if (oFORM.codigoAgencia && oFORM.orgType.value == 'A') { // si viene un codigo de agencia
						if (oFORM.codigoAgencia.value != '') {
							urlOptions += "&orgType=A&codigoAgencia=" + oFORM.codigoAgencia.value;
						}
	                } else if (oFORM.codigoEmpresa && oFORM.orgType.value == 'C'){ // si viene un codigo de empresa
						if (oFORM.codigoEmpresa.value!=''){
							urlOptions += "&orgType=C&codigoEmpresa=" + oFORM.codigoEmpresa.value;
						}
	                }
	            }
	        }
	        // si no viene el parametro de agencia o empresa ni el tipo
	        if (!oFORM.orgType && (oFORM.codigoAgencia || oFORM.codigoEmpresa)) {
	            // si viene un codigo de agencia pero no de empresa
	            if (oFORM.codigoAgencia && !oFORM.codigoEmpresa){
	                if (oFORM.codigoAgencia.value != '') {
	                    urlOptions += "&orgType=A&codigoAgencia=" + oFORM.codigoAgencia.value;
	                }
	            }
	            // si viene un codigo de empresa pero no de agencia
	            if (!oFORM.codigoAgencia && oFORM.codigoEmpresa){
	                if (oFORM.codigoEmpresa.value != ''){
	                    urlOptions += "&orgType=C&codigoEmpresa=" + oFORM.codigoEmpresa.value;
	                }
	            }
	        }
		 }catch(e){}
		 if (oFORM.zona && oEl.destinos) {
			if (oFORM.zona.value < 1 && oFORM.codigoHotel.value < 1) linkReservas.href = "javascript:alert('"+HOTELMANAGER.lang.get(oErr.noselect)+"');";
			else linkReservas.href = url + urlOptions;
		 } else linkReservas.href = url + urlOptions;
	};
	HOTELMANAGER.utils.Onload(function() { 
		HOTELMANAGER.cookie.init();
		return true;
	});
})();