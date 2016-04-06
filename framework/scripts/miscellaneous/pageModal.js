
var PageModal = function() {

	var that = this;

	var wrapper = $('.pageModal');

	this.emptyModal = function() {
		var modalContainer = $(wrapper).find('.container');
		$(modalContainer).empty();
	};
	
	this.loadIntoModal = function(content, automaticallyShow) {
		var modalContainer = $(wrapper).find('.container');
		$(content).appendTo(modalContainer);
		if(automaticallyShow === true) {
			showModal();
		}
	};
	
	this.showModal = function() {
		var modal = $(wrapper).addClass('show');
		var body = $('body');
		$(modal).width($(body).width()).height($(body).height());
	};
	
	this.hideModal = function() {
		var modal = $(wrapper).removeClass('show');
		var body = $('body');
		$(modal).width(0).height(0);
	};

	this.init = function() {
		$(wrapper).find('.exit').click(function(event) {
			that.hideModal();
			that.emptyModal();
		});
	}
};

var pageModal = new PageModal();
pageModal.init();



