(function ($) {
    "use strict";

    $(window).on('load', function () {
        $("#loading").delay(1500).fadeOut(500);
        $("#loading-center").on('click', function () {
            $("#loading").fadeOut(500);
        })
    })

    // sticky menu
    var header = $('.menu-sticky');
    var win = $(window);

    win.on('scroll', function () {
        var scroll = win.scrollTop();
        if (scroll < 1) {
            header.removeClass("sticky");
        } else {
            header.addClass("sticky");
        }

        $("section").each(function () {
            var elementTop = $(this).offset().top - $('#rs-header').outerHeight();
            if (scroll >= elementTop) {
                $(this).addClass('loaded');
            }
        });
    });

    // onepage nav
    var navclose = $('#onepage-menu');
    if (navclose.length) {
        $(".nav-menu li a").on("click", function () {
            if ($(".showhide").is(":visible")) {
                $(".showhide").trigger("click");
            }
        });

        if ($.fn.onePageNav) {
            $(".nav-menu").onePageNav({
                currentClass: "current-menu-item"
            });
        }
    }
    var searchParent = $('.search-parent');
    if (searchParent.length) {
        $(".search-parent").on("click", function () {
            $(this).toggleClass("open_add_class", 1000);
        });
    }

    // Slider Custom jQuery
    var nivo_slider = $('#nivoSlider');
    if (nivo_slider.length) {
        $('#nivoSlider').nivoSlider({
            effect: 'random',
            slices: 15,
            boxCols: 8,
            boxRows: 4,
            animSpeed: 600,
            pauseTime: 5000000000,
            startSlide: 0,
            directionNav: true,
            controlNavThumbs: false,
            pauseOnHover: true,
            manualAdvance: false
        });
    }

    // Slider
    var slidercarousel3 = $('.slider-carousel3');
    if (slidercarousel3.length) {
        $(".slider-carousel3").owlCarousel({
            margin: 0,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            loop: true,
            dots: true,
            mouseDrag: true,
            items: 1,
            autoplay: true,
            animateOut: 'fadeOut',
            autoplayTimeout: 10000,
            autoplayHoverPause: false,
            responsiveClass: true
        });
    }

    // collapse hidden
    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
        navMain.collapse('hide');
    });


    //Testimonials Slider
    if ($('.testi-slide-1').length) {
        $('.testi-slide-1').slick({
            autoplay: true,
            infinite: true,
            centerMode: false,
            arrows: true,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

    //Team Slider
    var sliderfor = $('.slider-for');
    if (sliderfor.length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
    }
    var slidernav = $('.slider-nav');
    if (slidernav.length) {
        $('.slider-nav').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            vertical: true,
            asNavFor: '.slider-for',
            dots: false,
            focusOnSelect: true,
            verticalSwiping: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        vertical: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        vertical: false,
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 380,
                    settings: {
                        vertical: false,
                        slidesToShow: 2,
                    }
                }
            ]
        });
    }

    //canvas menu
    var navexpander = $('#nav-expander');
    if (navexpander.length) {
        $('#nav-expander, #nav-close, .offwrap').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
        });
    }

    // Offcanvas btn
    $('.menu-wrap-off a').each(function () {
        var href = $(this).attr("href");
        if (href == "#") {
            $(this).addClass('hash');
        } else {
            $(this).removeClass('hash');
        }
    });

    /******** Mobile Menu Start ********/

    $('.mobile-navbar-menu a').each(function () {
        var href = $(this).attr("href");
        if (href = "#") {
            $(this).addClass('hash');
        } else {
            $(this).removeClass('hash');
        }
    });

    $.fn.menumaker = function (options) {
        var mobile_menu = $(this), settings = $.extend({
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function () {
            mobile_menu.find('li ul').parent().addClass('has-sub');
            var multiTg = function () {
                mobile_menu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                mobile_menu.find(".hash").parent().addClass('hash-has-sub');
                mobile_menu.find('.submenu-button').on('click', function () {

                    if ($(this).siblings('ul').hasClass('open-sub')) {
                        $(this).siblings('ul').removeClass('open-sub').hide('fadeIn');
                        $(this).siblings('ul').hide('fadeIn');
                        $(this).toggleClass('submenu-opened');
                    }
                    else {
                        // open submenu
                        $(this).siblings('ul').addClass('open-sub').hide('fadeIn');
                        $(this).siblings('ul').slideToggle().show('fadeIn');
                    }
                });
            };



            if (settings.format === 'multitoggle') multiTg();
            else mobile_menu.addClass('dropdown');
            if (settings.sticky === true) mobile_menu.css('position', 'fixed');
            var resizeFix = function () {
                if ($(window).width() > 991) {
                    mobile_menu.find('ul').show('fadeIn');
                    mobile_menu.find('ul.sub-menu').hide('fadeIn');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };

    $(document).ready(function () {
        $("#mobile-navbar-menu").menumaker({
            format: "multitoggle"
        });
    });

})(jQuery);