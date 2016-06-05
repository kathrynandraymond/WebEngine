
var PageModal = function() {

	var that = this;

	var wrapper = $('.pageModal.overlay');

	this.emptyModal = function() {
		var modalContainer = $('.pageModal.containing-box').find('.container');
		$(modalContainer).empty();
	};
	
	this.loadIntoModal = function(content, automaticallyShow) {
		var modalContainer = $('.pageModal.containing-box').find('.container');
		$(content).appendTo(modalContainer);
		if(automaticallyShow === true) {
			that.showModal();
		}
	};
	
	this.showModal = function() {
		$('.pageModal').addClass('show');
	};
	
	this.hideModal = function() {
		$('.pageModal').removeClass('show');
	};

	this.init = function() {
		$('.pageModal.containing-box .exit, .overlay').click(function(event) {
			that.hideModal();
			that.emptyModal();
		});
	}
};

var pageModal = new PageModal();
pageModal.init();



