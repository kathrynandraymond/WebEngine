var initializedObjects = {};

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
			initializedObjects[packageClass] = instance;
		}
	}
};

$(document).ready(function() {
	// Load modules and widgets
	objectInitializer($('body'));
});

var scrollToTarget = function(target) {
	$('html,body').animate({
		 scrollTop: $(target).offset().top - $('.Header').height() - 20
	});
};

