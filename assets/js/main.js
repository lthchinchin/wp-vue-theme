(function ($) {
	$(document).ready(function () {
		/* owlcarousel */
		if ($(".owl-carousel").length) {
			$(".owl-carousel").each(function () {
				var owl = $(".owl-carousel");
				$(this).owlCarousel({
					margin: 0,
					autoplayTimeout: $(this).data("autotime"),
					smartSpeed: $(this).data("speed"),
					autoHeight: $(this).data("autoheight"),
					autoplay: $(this).data("autoplay"),
					items: $(this).data("carousel-items"),
					nav: $(this).data("nav"),
					dots: $(this).data("dots"),
					center: $(this).data("center"),
					loop: $(this).data("loop"),
					responsive: {
						0: {
							items: $(this).data("mobile"),
							margin: $(this).data("margintb"),
						},
						768: {
							items: $(this).data("tablet"),
							margin: $(this).data("margintb"),
						},
						992: {
							items: $(this).data("desktop-small"),
							margin: $(this).data("margintb"),
						},
						1680: {
							items: $(this).data("desktop"),
							margin: $(this).data("margintb"),
						},
					},
				});
			});
		}

		/* AOS Animate */
		AOS.init({ once: true });

		/* Show menu mobile */
		$("#mobile-menu-button").click(function () {
			$(this).toggleClass("active");
			$(".header-menu").toggleClass("active");
		});
	});
})(jQuery);
