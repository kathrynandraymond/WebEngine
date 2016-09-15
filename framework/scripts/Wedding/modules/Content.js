
var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.Content = function() {
	var that = this;
	var placeHolder = null;
	var autoSlider = null;
	var portraitWidth = -1;
	var focusedSlideClassName = 'focused';
	var isSlidingAlready = false;

	var slideAction = function(rightToLeft, callback) {
		var portrait = $(placeHolder).find('.portrait');
		var slides = $(portrait).find('.slider .slide');

		var currentSlideIndex = null;
		for(var i = 0, len = slides.length; i < len; i++) {
			if($(slides[i]).hasClass(focusedSlideClassName)) {
				currentSlideIndex = i;
				break;
			}
		}
		var copyOf = null;

		var newSlideIndex = rightToLeft ? currentSlideIndex + 1 : currentSlideIndex - 1;
		if(newSlideIndex >= slides.length) {
			newSlideIndex = 0;
		} else if(newSlideIndex < 0) {
			newSlideIndex = slides.length - 1;
		}

		(function(slideToShow, slideToHide) {
			if(!isSlidingAlready) {
				isSlidingAlready = true;
				var fullOpacity = 10.0;
				var noOpacity = 0.0;
	
				var transition = setInterval(function() {
	
					$(slideToShow).css('opacity', noOpacity / 10.0);
					$(slideToHide).css('opacity', fullOpacity / 10.0);
	
					if(noOpacity === 10 || fullOpacity === 0.0) {
						clearInterval(transition);
						$(slideToShow).addClass(focusedSlideClassName);
						$(slideToHide).removeClass(focusedSlideClassName);
	
						if(callback != null) {
							callback();
						}
						isSlidingAlready = false;
					}
	
					noOpacity++;
					fullOpacity--;
				}, 50);
			}
		})($(slides[newSlideIndex]), $(slides[currentSlideIndex]));
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

	var renderImportantMessages = function() {
		var importantMessages = $(placeHolder).find('.important-messages .message');
		var rightNow = new Date();
		var numMessages = 0;
		if(importantMessages.length > 0) {
			for(var i = 0, len = importantMessages.length; i < len; i++) {
				var before = -1, after = -1;
				var timestampBeforeStr = $(importantMessages[i]).attr('before');
				var timestampAfterStr = $(importantMessages[i]).attr('after');
				if($.trim(timestampBeforeStr).length > 0) {
					eval('before = ' + timestampBeforeStr);
				}
				if($.trim(timestampAfterStr).length > 0) {
					eval('after = ' + timestampAfterStr);
				}
				if( (before < 0 || (rightNow.getTime() <= before)) && (after < 0 || (rightNow.getTime() >= after)) ) {
					$(importantMessages[i]).show();
					$('<button/>').html('X').addClass('message-exit').appendTo($(importantMessages[i]));
					numMessages++;
				} else {
					$(importantMessages[i]).hide();
				}
			}
		}

		if (numMessages > 0) {
			$('button.message-exit').click(function(e) {
				$(e.target).parent().hide();
			});
		}
	};

	this.init = function(parentElement) {
		placeHolder = parentElement;
		var portrait = $(parentElement).find('.portrait');
		var portraitSliders = $(portrait).find('.slider .slide');
		portraitWidth = $(portrait).width();

		if(portraitSliders.length > 1) {
			$(portraitSliders[0]).addClass(focusedSlideClassName).animate({
				opacity: 1.0
			}, {
				duration: 500
			});

			activateAutoSlide();
			activateManualSlideNavigation();
		}

		renderImportantMessages();
	};
};

