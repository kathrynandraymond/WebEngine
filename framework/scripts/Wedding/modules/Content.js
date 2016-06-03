
var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.Content = function() {
	var that = this;
	var placeHolder = null;
	var autoSlider = null;
	var portraitWidth = -1;

	var slideAction = function(rightToLeft, callback) {
		var portrait = $(placeHolder).find('.portrait');
		var sliderTray = $(portrait).find('.slider');
		var slides = $(sliderTray).find('.slide');

		var currentSlide = $(slides)[0];
		var copyOf = null;

		if(rightToLeft) {
			$(sliderTray).animate({
				marginLeft: (-1 * portraitWidth) + 'px'
			}, {
				duration: 500,
				complete: function() {
					copyOf = $(currentSlide).clone();
					$(currentSlide).remove();
					$(sliderTray).css('margin-left', 0);
					$(copyOf).appendTo(sliderTray);

					if(callback != null) {
						callback();
					}
				}
			});
		} else {
			var last = $(slides)[slides.length - 1];
			copyOf = $(last).clone();
			$(copyOf).prependTo(sliderTray);
			$(sliderTray).css('margin-left', (-1 * portraitWidth) + 'px');
			$(last).remove();

			$(sliderTray).animate({
				marginLeft: '0px'
			}, {
				duration: 500,
				complete: function() {
					$(last).remove();
					if(callback != null) {
						callback();
					}
				}
			});
		}
	};

	var activateAutoSlide = function() {
		if(autoSlider == null) {
			autoSlider = setInterval(function(e) {
				slideAction(true, null);
			}, 8000);	
		}
	};

	var activateManualSlideNavigation = function() {
		$('.slidernav').click(function(e) {
			if(autoSlider != null) {
				clearInterval(autoSlider);
				autoSlider = null;
			}

			slideAction($(e.target).hasClass('right'), activateAutoSlide);
		});
	};

	this.init = function(parentElement) {
		placeHolder = parentElement;
		var portrait = $(parentElement).find('.portrait');
		var portraitSliders = $(portrait).find('.slider .slide');
		portraitWidth = $(portrait).width();

		if(portraitSliders.length > 1) {
			$(portrait).find('.slider').width(portraitSliders.length * portraitWidth);

			activateAutoSlide();
			activateManualSlideNavigation();
		}
	};
};

