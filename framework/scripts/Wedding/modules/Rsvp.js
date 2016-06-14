var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.Rsvp = function() {
	var that = this;

    var parentElement = null;

    this.init = function(parentElement) {
    	that.parentElement = parentElement;

    	$('.rsvp').click(function(event) {
    		var ele = $(event.target);
   			var link = $(ele).attr('link');

   			if(link != null && link.length > 0) {
    			window.open(link);
    		}
    	});
	};

};


