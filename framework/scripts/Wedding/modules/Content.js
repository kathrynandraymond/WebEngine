
var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.Content = function() {
	var that = this;

	this.init = function(parentElement) {
		var portrait = $(parentElement).find('.portrait');
		var portraitSliders = $(portrait).find('.slider .slide');

		if(portraitSliders.length > 1) {
			var width = $(portrait).width();
			$(portrait).find('.slider').width(portraitSliders.length * width);

			var slideAction = setInterval(function(e) {
				$(portrait).find('.slider').animate({
					marginLeft: (-1 * width) + 'px'
				}, {
					duration: 500,
					complete: function() {
						var first = $(portrait).find('.slider .slide')[0];
						var copyOf = $(first).clone();
						$(first).remove();
						$(portrait).find('.slider').css('margin-left', 0);
						$(copyOf).appendTo($(portrait).find('.slider'));
					}
				});
			}, 8000);
		}
	};
};

