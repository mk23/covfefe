$(document).ready(function() {
	window.location.hash = '';

	name = window.location.href.split('?').pop().split('#')[0].replace(/[^a-z]/ig, '');
	if (!name || window.location.href.indexOf('?') == -1) {
		name = 'default';
	}

	$('<link/>')
	.attr('rel', 'stylesheet')
	.attr('href', 'content/'+name+'.css')
	.appendTo('head');

    $.get('content/'+name+'.txt', function(data) {
        $.each(data.split(/\n\n/), function(k, v) {
			v = $.trim(v);

			if (k == 0) {
				$('title').text(v);
				v = $('<h1/>').text(v);
			}

			$('ul.slides-container').append(
				$('<li/>').append(
					$('<div/>')
					.addClass('container')
					.append(v)
				)
			);
        });

        $('#slides')
        .superslides({
            hashchange: true,
        })
        .hammer().bind('swipeleft', function() {
            $(this).data('superslides').animate('next');
        })
        .hammer().bind('swiperight', function() {
            $(this).data('superslides').animate('right');
        })
		.removeClass('hidden');
    });
});
