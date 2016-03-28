$(document).ready(function() {
    var myCarousel = $(".fx-carousel").fxCarousel();

    $('.arrownav__arrow').on('click', function(e) {
    	if ($(this).hasClass("fx-carousel__navigate--right")) {
            myCarousel.fxCarousel('slide', 'right');
    	} else {
            myCarousel.fxCarousel('slide', 'left');
    	}
    });
});