$(document).ready(function(){

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
});
