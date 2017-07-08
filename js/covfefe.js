$(document).ready(function() {
    $.get('covfefe.txt', function(data) {
        $.each(data.split(/\n\n/), function(k, v) {
            $('.carousel-indicators').append(
                $('<li/>')
                .attr('data-target', '#carousel-covfefe')
                .attr('data-slide-to', k + 1)
            );
            $('.carousel-inner').append(
                $('<div/>')
                .addClass('item')
                .append(
                    $('<div/>')
                    .addClass('container')
                    .append(
                        $('<div/>')
                        .addClass('carousel-caption')
                        .append(
                            $('<p/>')
                            .text($.trim(v))
                        )
                    )
                )
            );
        });
    });

    $(window)
        .resize(function() {
            $('.item').height($(window).height());
        })
        .keyup(function(e) {
            if (e.which == 37) { // left
                $('.carousel').carousel('prev');
            } else if (e.which == 39) { // right
                $('.carousel').carousel('next');
            }
        })
        .trigger('resize');

    $('.carousel')
    .carousel({
        interval: 2000
    })
    .on('slid.bs.carousel', function() {
        if ($('li.active').is(':last-child')) {
            $('.carousel')
                .carousel('pause')
                .fireworks({
                    opacity: 0.1
                });
        } else {
            $('canvas').remove();
        }
    });
});
