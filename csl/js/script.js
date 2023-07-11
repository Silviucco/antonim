var THEMEMASCOT = {};
(function ($) {
    "use strict";

    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($(".preloader").length) {
            $(".preloader").delay(400).fadeOut(2400);
        }
    }

    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($(".main-header").length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $(".header-style-one");
            var scrollLink = $(".scroll-to-top");
            var sticky_header = $(".main-header .sticky-header");
            if (windowpos > 100) {
                sticky_header.addClass("fixed-header animated slideInDown");
                scrollLink.fadeIn(300);
            } else {
                sticky_header.removeClass("fixed-header animated slideInDown");
                scrollLink.fadeOut(300);
            }
            if (windowpos > 1) {
                siteHeader.addClass("fixed-header");
            } else {
                siteHeader.removeClass("fixed-header");
            }
        }
    }
    headerStyle();

    function Scris() {
        var _CONTENT = ["Web Development", "Web Design", "Graphic Design", "Branding"];

        // Current sentence being processed
        var _PART = 0;

        // Character number of the current sentence being processed
        var _PART_INDEX = 0;

        // Holds the handle returned from setInterval
        var _INTERVAL_VAL;

        // Element that holds the text
        var _ELEMENT = document.querySelector("#typewriting");

        // Implements typing effect
        function Type() {
            var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
            _ELEMENT.innerHTML = '<span class="underlined">' + text + "</span>";
            _PART_INDEX++;

            // If full sentence has been displayed then start to delete the sentence after some time
            if (text === _CONTENT[_PART]) {
                clearInterval(_INTERVAL_VAL);
                setTimeout(function () {
                    _INTERVAL_VAL = setInterval(Delete, 150);
                }, 4112200);
            }
        }

        // Implements deleting effect
        function Delete() {
            var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
            _ELEMENT.innerHTML = '<span class="underlined">' + text + "</span>";
            _PART_INDEX--;

            // If sentence has been deleted then start to display the next sentence
            if (text === "") {
                clearInterval(_INTERVAL_VAL);

                // If last sentence then display the first one, else move to the next
                if (_PART == _CONTENT.length - 1) _PART = 0;
                else _PART++;
                _PART_INDEX = 0;

                // Start to display the next sentence after some time
                setTimeout(function () {
                    _INTERVAL_VAL = setInterval(Type, 100);
                }, 200);
            }
        }

        // Start the typing effect on load
        _INTERVAL_VAL = setInterval(Type, 150);
    }

    //Mobile Nav Hide Show
    if ($(".mobile-menu").length) {
        var mobileMenuContent = $(".navigation").html();

        $(".mobile-menu .navigation").append(mobileMenuContent);
        $(".sticky-header .navigation").append(mobileMenuContent);
        $(".mobile-menu .close-btn").on("click", function () {
            $("body").removeClass("mobile-menu-visible");
        });

        //Dropdown Button
        $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
            $(this).prev("ul").slideToggle(500);
            $(this).toggleClass("active");
        });

        //Menu Toggle Btn
        $(".mobile-nav-toggler").on("click", function () {
            $("body").addClass("mobile-menu-visible");
        });

        //Menu Toggle Btn
        $(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").on("click", function () {
            $("body").removeClass("mobile-menu-visible");
        });
    }

    //Services-carousel
    if ($(".services-carousel").length) {
        $(".services-carousel").owlCarousel({
            rtl: THEMEMASCOT.isRTL.check(),
            loop: false,
            margin: 30,
            nav: false,
            smartSpeed: 500,
            autoHeight: true,
            autoplay: true,
            autoplayTimeout: 10000,
            navText: ['<span class="fa fa-long-arrow-alt-left"></span>', '<span class="fa fa-long-arrow-alt-right"></span>'],
            responsive: {
                0: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                1024: {
                    items: 3,
                },
            },
        });
    }

    //Tabs Box
    if ($(".tabs-box").length) {
        $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
            e.preventDefault();
            var target = $($(this).attr("data-tab"));

            if ($(target).is(":visible")) {
                return false;
            } else {
                target.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn");
                $(this).addClass("active-btn");
                target.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0);
                target.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab animated fadeIn");
                $(target).fadeIn(300);
                $(target).addClass("active-tab animated fadeIn");
            }
        });
    }

    // Scroll to a Specific Div
    if ($(".scroll-to-target").length) {
        $(".scroll-to-target").on("click", function () {
            var target = $(this).attr("data-target");
            // animate
            $("html, body").animate(
                {
                    scrollTop: $(target).offset().top,
                },
                300
            );
        });
    }

    // Elements Animation
    if ($(".wow").length) {
        var wow = new WOW({
            boxClass: "wow", // animated element css class (default is wow)
            animateClass: "animated", // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    /* ==========================================================================
	   When document is Scrollig, do
	   ========================================================================== */

    $(window).on("scroll", function () {
        headerStyle();
    });

    /* ==========================================================================
	   When document is loading, do
	   ========================================================================== */

    $(window).on("load", function () {
        handlePreloader();
        Scris();
    });
})(window.jQuery);
