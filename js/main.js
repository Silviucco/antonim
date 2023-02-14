/**
*
* -----------------------------------------------------------------------------
*
* Template :  Konstruk - Construction & Building HTML Template
  Author : devsdesign
  Author URI : http://www.devsdesign.com/
*
* -----------------------------------------------------------------------------
*
**/
(function ($) {
    "use strict";
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

    //window load
    $(window).on('load', function () {
        $("#loading").delay(1500).fadeOut(500);
        $("#loading-center").on('click', function () {
            $("#loading").fadeOut(500);
        })
    })

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
    // Rs Pic
    var rs_pie = $('.rs-pie-content');
    if (rs_pie.length) {
        $('.rs-pie').easyPieChart({
            size: 170,
            barColor: "#FF6D00",
            scaleLength: 0,
            lineWidth: 8,
            trackColor: "#0a2fa5",
            lineCap: "circle",
            animate: 2000,
        });
    }

    //canvas menu
    var navexpander = $('#nav-expander');
    if (navexpander.length) {
        $('#nav-expander, #nav-close, #nav-close2, .offwrap').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
        });
    }
    var tilt = $('.js-tilt');
    if (tilt.length) {
        const tilt = $('.js-tilt').tilt();
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

    var servicesSelect = $('.services_select');
    if (servicesSelect.length) {
        // Select Box Style
        var x, i, j, l, ll, selElmnt, a, b, c;
        /*look for any elements with the class "Services":*/
        x = document.getElementsByClassName("services_select");
        l = x.length;
        for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 1; j < ll; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function (e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
    }


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
                mobile_menu.find(".has-sub").prepend('<span class="submenu-button"><em></em></span>');
                mobile_menu.find(".hash").parent().addClass('hash-has-sub');
                mobile_menu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open-sub')) {
                        $(this).siblings('ul').removeClass('open-sub').hide('fadeIn');
                        $(this).siblings('ul').hide('fadeIn');
                    }
                    else {
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