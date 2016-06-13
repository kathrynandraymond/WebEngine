var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.Rsvp = function() {
	var that = this;

    var parentElement = null;

    this.init = function(parentElement) {
    	that.parentElement = parentElement;
	};
};


