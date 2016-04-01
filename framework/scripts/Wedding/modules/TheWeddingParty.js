var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.TheWeddingParty = function() {
	var that = this;

	var names = ['Christy Ng', 'Eli Martin Lara', 'Rebecca Reh', 'Elbert Chan', 'Eva Lee', 'Chung Yeoh'];

	this.init = function(parentElement) {
		var gallery = $(parentElement).find('.gallery');
		var people = [];

		for(var i = 0, len = names.length;  i < len; i++) {
			people[i] = {
				name: names[i]
			};
			(function(person) {
				var nameArr = person.name.split(' ');
				var jsonFile = '';
				for(var i = 0, len = nameArr.length; i < len; i++) {
					if(i == 0) {
						jsonFile = nameArr[i].toLowerCase();
					} else {
						jsonFile += nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1).toLowerCase();
					}
				}
				person.jsonFile = Wedding.constants.Main.DATA.PEOPLE.SRC + jsonFile + '.json';
				$.ajax({
					url: person.jsonFile,
					method: 'GET'
				}).done(function(model) {
					person.model = model;
					addPersonToGallery(person);
				});
			})(people[i]);
		}
	};

	var addPersonToGallery = function(person) {
		var element = $('.cannotSeeThis .person').clone();
		$(element).appendTo('.gallery');
		$(element).find('.name').html(person.name);
		$(element).find('.about').html(person.model.about);
		$(element).find('.role').html(person.model.type);
		if(person.model.imgs.length > 0) {
			$(element).find('.photo.thumbnail').css('background-image','url(\'img/people/' +
					person.model.imgs[0]+ '\')');
		}
	};
};

