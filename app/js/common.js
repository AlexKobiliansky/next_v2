$(document).ready(function(){

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $(".mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    var element = document.querySelector( '.main-mnu' );

    var droppy = new Droppy( element, {
        parentSelector: 'li',
        dropdownSelector: 'li > ul',
        triggerSelector: 'a'
    } );

    $('.droppy__parent').on("mouseenter", function(){
        $(this).children('.droppy__drop ').addClass('droppy__drop--active')
    });

    $('.droppy__parent').on("mouseleave", function(){
        $(this).children('.droppy__drop ').removeClass('droppy__drop--active')
    });

    $('.droppy__parent a').click(function(){
        var link = $(this).attr('href');
        window.location.href = link;
    })

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    var uPhone = $('.user-phone');
    uPhone.mask("8 999 999 99 99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(2,2);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    if ($(window).width()>768) {
        $('.intro-slide-link')
            .circleProgress({
                size: 52,
                thickness: 2,
                value: 0.25,
                emptyFill: "#888",
                fill: "#6bb0a4",
                animation: {
                    duration: 100
                }
            })
            .on('mouseenter', function () {
                var $this = $(this);
                $this.circleProgress({
                    value: 1,
                    animationStartValue: 0.25,
                    animation: {
                        duration: 300
                    }
                });
            })
            .on('mouseleave', function () {
                var $this = $(this);
                $this.circleProgress({
                    value: 0.25,
                    animationStartValue: 1,
                    animation: {
                        duration: 300
                    }
                });
            });
    } else {
        $('.intro-slide-link')
            .circleProgress({
                size: 40,
                thickness: 2,
                value: 0.25,
                emptyFill: "#888",
                fill: "#6bb0a4",
                animation: {
                    duration: 100
                }
            })
    }



    $('.intro-slider').owlCarousel({
        loop:false,
        nav: false,
        items: 1,
        margin: 15,
        dots: true,
        animateOut: 'fadeOut',
        // animateIn: 'fadeIn',
        mouseDrag: false,
        touchDrag: false,
        autoplay: true,
    });

    $('.gallery-slider').owlCarousel({
        loop:true,
        nav: true,
        margin: 15,
        items: 1,
        autoHeight: true,
        dots: false,
        autoplay: true,
        navText: ["", ""],
    });


    function heightses() {
        if ($(window).width()>480) {
            $('.adv-item-title').height('auto').equalHeights();
            $('.gal-slide-title').height('auto').equalHeights();
            $('.gal-slide-desc').height('auto').equalHeights();
        }

        if ($(window).width()>768) {
            $('.price-item-title').height('auto').equalHeights();
            $('.price-item-desc').height('auto').equalHeights();
            $('.price-item-include').height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    $('.gal-slide').photoswipe({
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });

    /** START MAPS */
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [26, 42],
                });

            map.geoObjects.add(myPlacemark);

            var position = map.getGlobalPixelCenter();

            if (mapId.hasClass('has-block')) {

                if ($(window).width() >= 992) {
                    map.setGlobalPixelCenter([ position[0] - 250, position[1]]);
                }

                if ($(window).width() >= 1200) {
                    map.setGlobalPixelCenter([ position[0] - 300, position[1]]);
                }

                if ($(window).width() >= 1400) {
                    map.setGlobalPixelCenter([ position[0] - 350, position[1]]);
                }

            }



        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
    /** END MAPS */
});
