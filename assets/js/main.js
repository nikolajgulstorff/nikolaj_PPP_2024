
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});



	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

		$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function() {
				// Deactivate section.
				$(this).addClass('inactive');
			},
			enter: function() {
				var $content = $(this).find('.content > .inner');
				// Activate section.
				$(this).removeClass('inactive');
	
				// Add glitch class and fade in.
				$content.addClass('test').css('opacity', 1).hide().fadeIn(100).delay(100).queue(function(next) {
					next();
				});
			}
		})
		.each(function() {
			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;
	
			// Assign image.
			$image.css('background-image', 'url(' + $img.attr('src') + ')');
	
			// Set background position.
			if (x = $img.data('position'))
				$image.css('background-position', x);
	
			// Hide <img>.
			$img.hide();
		});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					
					// Activate section.
						$(this).removeClass('inactive');

				}
			});

			const carouselContainer = document.querySelector('.carousel-container');
			const items = document.querySelectorAll('.carousel-item');
			const nextButton = document.querySelector('.next');
			const prevButton = document.querySelector('.prev');
			
			let currentIndex = 0;
			
			function updateCarousel() {
				const translateX = -currentIndex * 100; // Each item takes full width
				carouselContainer.style.transform = `translateX(${translateX}%)`;
			}
			
			nextButton.addEventListener('click', () => {
				currentIndex = (currentIndex + 1) % items.length; // Loop back to the first item
				updateCarousel();
			});
			
			prevButton.addEventListener('click', () => {
				currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop back to the last item
				updateCarousel();
			});
})(jQuery);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});