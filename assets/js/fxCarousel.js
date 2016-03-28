(function($) {
    var fcx_obj, slides, options, next, prev;
    var defaultOptions = {
        className: '.fx-carousel',
        slideName: '.item'
    };

    var next = function (el) {
        if (el.next().length > 0) {
            return el.next();
        } else {
            return slides.first();
        }
    };

    var prev = function (el) {
        if (el.prev().length > 0) {
            return el.prev();
        } else {
            return slides.last();
        }
    };

    var methods = {
        init: function (options) {
            options = $.extend({}, defaultOptions, options);
        	fcx_obj = $(options.className);
        	slides  = fcx_obj.find(options.slideName);

            return this;
        },
        slide: function (direction) {
            var el, new_item, i, j, ref;

            el = fcx_obj.find('.item--before').removeClass('item--before');

    		if (direction === "right") {
    			new_item = next(el);
    			fcx_obj.removeClass('fx-carousel--reversed');
    		} else {
    			new_item = prev(el);
                fcx_obj.addClass('fx-carousel--reversed');
    		}

    		new_item.addClass('item--before').css('order', 1);

            for (var i = 2, items = slides.length; i <= items; i++) {
                new_item = next(new_item).css('order', i);
            }

    		fcx_obj.removeClass('no-transform');

            setTimeout(function () {
                return fcx_obj.addClass('no-transform');
            }, 50);

            return this;
        }
    };

    $.fn.fxCarousel = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1 ));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.fxCarousel');
        }
    };
})(jQuery);