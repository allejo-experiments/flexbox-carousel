(function($) {
    var fxc_obj, slides, options, next, prev, cssSlide, cssActive, cssBefore, activeName, beforeName, autoplay;
    var defaultOptions = {
        slideName: 'item',
        slideActive: 'active',
        slideBefore: 'before',
        slideTime: 10,
        autoplay:  true
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

    var slide = function (new_item, direction) {
        fxc_obj.find(cssActive).removeClass(activeName);

        if (direction === "right") {
            fxc_obj.removeClass('fx-carousel--reversed');
        } else {
            fxc_obj.addClass('fx-carousel--reversed');
        }

        new_item.addClass(beforeName).css('order', 1);

        for (var i = 2, items = slides.length; i <= items; i++) {
            new_item = next(new_item).css('order', i);

            if (i == 2) {
                new_item.addClass(activeName);
            }
        }

        fxc_obj.removeClass('no-transform');

        setTimeout(function () {
            return fxc_obj.addClass('no-transform');
        }, 50);
    };

    var startAutoplay = function (delay) {
        autoplay = setTimeout(function() {
            methods.slide('right');
            startAutoplay(delay);
        }, delay * 1000);
    }

    var methods = {
        init: function (options) {
            fxc_obj = $(this);
            options = $.extend({}, defaultOptions, options);

            cssSlide   = '.' + options.slideName;
            activeName = options.slideName + '--' + options.slideActive;
            beforeName = options.slideName + '--' + options.slideBefore;
            cssActive  = '.' + activeName;
            cssBefore  = '.' + beforeName;

            slides = fxc_obj.find(cssSlide);
            slides.first().addClass(activeName);
            slides.last().addClass(beforeName);

            if (options.autoplay) { startAutoplay(options.slideTime); }

            return this;
        },
        slide: function (direction) {
            var el = fxc_obj.find(cssBefore).removeClass(beforeName);
            var new_item = (direction === "right") ? next(el) : prev(el);

            slide(new_item, direction);

            return this;
        },
        slideTo: function (slideNumber) {
            var el = fxc_obj.find(cssActive);

            if (slideNumber === el.index()) { return; }

            fxc_obj.find(cssBefore).removeClass(beforeName);

            var direction = (slideNumber > el.index()) ? "right" : "left";
            var targetSlide = prev($(slides[slideNumber]));

            slide(targetSlide, direction);

            return this;
        },
        pause: function () {
            window.clearTimeout(autoplay);

            return this;
        },
        play: function () {
            startAutoplay(options.slideTime);

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