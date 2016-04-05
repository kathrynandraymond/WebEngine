
var objectInitializer = function(parentElement) {
	var wrappers = $(parentElement).find('[package]');
	for(var i = 0, len = wrappers.length; i < len; i++) {
		var packageName = $(wrappers[i]).attr('package');
		var packageClass = packageName + '.' + $(wrappers[i]).attr('class');
		var instance = null;
		eval('instance = new ' + packageClass + '();');
		if(instance != null) {
			(function(wrapper, instance, packageClass) {
				$.ajax({
					url: 'templates/' + packageClass.replace(/\./g,'/') + '.html'
				}).done(function(dom) {
					$(wrapper).html(dom);
					objectInitializer($(wrapper));
					instance.init(wrapper);
				});
			})(wrappers[i], instance, packageClass);
		}
	}
};

var emptyModal = function() {
	var modalContainer = $('.pageModal container');
	$(modalContainer).empty();
};

var loadIntoModal = function(content, automaticallyShow) {
	var modalContainer = $('.pageModal container');
	$(content).appendTo(modalContainer);
	if(automaticallyShow === true) {
		showModal();
	}
};

var showModal = function() {
	var modal = $('.pageModal').addClass('show');
};

var hideModal = function() {
	var modal = $('.pageModal').removeClass('show');
};

$(document).ready(function() {
	// Load modules and widgets
	objectInitializer($('body'));

	$('.pageModal').find('exit').bind('click', function(event) {
		hideModal();
		emptyModal();
	});
});

