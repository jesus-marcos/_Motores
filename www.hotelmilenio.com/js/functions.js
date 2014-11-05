// Para reducir el header cuando hacemos scroll        
var cbpAnimatedHeader = (function() {
 
    var docElem = document.documentElement,
        header = document.querySelector( '.header' ),
        didScroll = false,
        changeHeaderOn = 120;
 
    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 80 );
            }
        }, false );
    }
 
    function scrollPage() {

        var sy = scrollY(),
        header = document.getElementById("fixed-header"), 
        reservas = document.getElementById("reservas");
        if ( sy >= changeHeaderOn ) {
            //jQuery.add( header, 'header-shrink' );
            //header.attr('class','header header-shrink');
            header.className = 'fixed-header header';
            reservas.className = 'reservas-op';
        }
        else {
            //jQuery.remove( header, 'header-shrink' );
            //header.attr('class','header');
            header.className = 'header';
            reservas.className = '';
        }
        didScroll = false;
    }
 
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
 
    init();
 
})();