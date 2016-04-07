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
		var list = $(that.wrapper).find('ul.sections');
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

		$(that.wrapper).find('ul.sections').click(clickSections);
	}

	var clickSections = function(event) {
		var reference = $(event.target).attr(ref);

		if(reference != null) {
			var target = $('div[package="Wedding.modules"].Content').find('div[anchor="' + reference + '"]');
	
			if(target != null) {
				$('html,body').animate({
					 scrollTop: $(target).offset().top
				});
			}
		}
	};
};

