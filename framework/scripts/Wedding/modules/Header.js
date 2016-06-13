var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.Header = function() {
	var that = this;
	this.wrapper = null;

	this.init = function(parentElement) {
		that.wrapper = parentElement;
		setTimeout(findContent, 200);
	};

	this.addSections = function(container) {
		var list = $(that.wrapper).find('ul.dynamic');
		var title = $(container).find('h2');
		var anchor = 'anchor-' + Math.random();
		$(container).attr('anchor', anchor);
		var item = $('<li/>');
		$(item).attr('ref',anchor).html($(title).html()).appendTo(list);
	};

	var findContent = function() {
		var contentsContents = $('div[package="Wedding.modules"].Content').find(
				'div[package="Wedding.modules"]');
		if(contentsContents.length > 0) {
			for(var i = 0, len = contentsContents.length; i < len; i++) {
				that.addSections(contentsContents[i]);
			}
		}

		$(that.wrapper).find('div.sections ul').click(clickSections);
	}

	var clickSections = function(event) {
		var scrollTo = function(target) {
			$('html,body').animate({
				 scrollTop: $(target).offset().top - $('.Header').height() - 20
			});
		};

		var itemVal = $.trim($(event.target).html());
		switch(itemVal) {
			case 'Home':
				scrollTo($('.website'));
				break;
			default:
				var reference = $(event.target).parents('li').attr('ref');
		
				if(reference != null) {
					var target = $('div[package="Wedding.modules"].Content').find('div[anchor="' + reference + '"]');
			
					if(target != null) {
						scrollTo(target);
					}
				}
		}
	};
};

