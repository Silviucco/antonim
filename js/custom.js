$(function () {
    'use strict'; // Start of use strict

    $('.odometer').appear(function (e) {
        var odo = $(".odometer");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    /*--------------------------
     ScrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*--------------------------
     Gallery Popup JS
    ---------------------------- */

    $('.gallery-popup').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });

    /*--------------------------
      Countdown
    ---------------------------- */

    function countdown() {
        $('.countdown').each(function () {
            var $this = $(this),
                finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                $(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'));
            });
        });
    };

    /*--------------------------
       FAQ Accordion
    ---------------------------- */

    $('.accordion').find('.accordion-title').on('click', function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle('fast');
        $('.accordion-content').not($(this).next()).slideUp('fast');
        $('.accordion-title').not($(this)).removeClass('active');
    });

    /*--------------------------
     Partners
    ---------------------------- */
    $('.partners').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        smartSpeed: 900,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            600: {
                items: 2
            },
            700: {
                items: 3
            },
            1000: {
                items: 4
            },
            1300: {
                items: 5
            },
            1600: {
                items: 5
            }
        }
    });


    /*--------------------------
        Sticky
    ---------------------------- */
    jQuery(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('header').addClass("sticky");
        } else {
            $('header').removeClass("sticky");
        }

        // //Check to see if the window is top if not then display button
        // if ($(this).scrollTop() > 400) {
        //     $('.scrollToTop').addClass('show');
        //     alert("case3");
        // } else {
        //     $('.scrollToTop').removeClass('show');
        //     alert("case4");
        // }
    });

    /*--------------------------
        Slider
    ---------------------------- */

    function mainSlider() {
        var BasicSlider = $('.slider-active');
        BasicSlider.on('init', function (e, slick) {
            var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 10000,
            dots: true,
            fade: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="icon dripicons-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon dripicons-chevron-right"></i></button>',
            responsive: [
                { breakpoint: 1200, settings: { dots: false, arrows: false } }
            ]
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();


    /*------------------------------------------------------------------
        Year
    ------------------------------------------------------------------*/
    $(function () {
        var theYear = new Date().getFullYear();
        $('#year').html(theYear);
    });

    // $(function () {
    //     $(".dropdown").hover(function () {
    //         $(".dropdown-toggle", this).trigger("click");
    //     });
    // });

});

/*------------------------------------------------------------------
 Loader
------------------------------------------------------------------*/
jQuery(window).on("load scroll", function () {
    'use strict'; // Start of use strict
    // Loader
    $('#dvLoading').fadeOut('slow', function () {
        $(this).remove();
    });
});
/*------------------------------------------------------------------
FAQ
------------------------------------------------------------------*/
$('.panel-heading a').on('click', function () {
    $('.panel-heading').removeClass('active');
    $(this).parents('.panel-heading').addClass('active');
});
