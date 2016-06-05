var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.TravelInfo = function() {
	var that = this;

    var parentElement = null;

    this.init = function(parentElement) {
    	that.parentElement = parentElement;

    	$('a.more-details').click(function(e) {
    		var classNames = $(e.target).attr('class').split(' ');
    		var i = 0, len = -1;

    		var targetClassName = null;
    		for(i = 0, len = classNames.length; i < len; i++) {
    			if(classNames[i] != 'more-details') {
    				targetClassName = classNames[i];
    				break;
    			}
    		}

    		var candidatesToShow = $('.show-only-in-modal');
    		for(i = 0, len = candidatesToShow.length; i < len; i++) {
    			if($(candidatesToShow[i]).hasClass(targetClassName)) {
    				pageModal.loadIntoModal($(candidatesToShow[i]).clone(), true);
    				break;
    			}
    		}
    		return false;
    	});

    	hideTooMuch();
	};

	var hideTooMuch = function() {
		var topics = $(that.parentElement).find('.topic');
		var anyTooLong = false;
		for(var i = 0, len = topics.length; i < len; i++) {
			var infoBlock = $(topics[i]).find('.info');
			var innerBlock = $(infoBlock).find('.inner');
			if($(infoBlock).height() < $(innerBlock).height()) {
				anyTooLong = true;
				$(topics[i]).addClass('overflown');
			}
		}

		if(anyTooLong) {
			$('.seeMore,.hideOverflow').click(function(e) {
				var topic = $(e.target).parents('.topic');
				if($(e.target).hasClass('seeMore')) {
					$(topic).addClass('exempted').removeClass('overflown');
				} else if($(e.target).hasClass('hideOverflow')) {
					$(topic).removeClass('exempted').addClass('overflown');
				}
				return false;
			});
		}
    }
};


