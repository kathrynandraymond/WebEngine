var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.TheWeddingParty = function() {
	var that = this;

	var people = data.people;

	this.init = function(parentElement) {
		var gallery = $(parentElement).find('.gallery');
		var template = $(parentElement).find('.cannotSeeThis .person');
		for(var i = 0, len = people.length; i < len; i++) {
			(function(person) {
				var personInst = $(template).clone();
				if(Math.floor(Math.random() * people.length) % 2 == 0) {
					$(personInst).appendTo(gallery);
				} else {
					$(personInst).prependTo(gallery);
				}
				$(personInst).find('.name').html(person.name);
				$(personInst).find('.role').html(person.type);
				$(personInst).find('.about').html(person.about);
				if(person.hasOwnProperty('thumbnails') && person.thumbnails.length > 0) {
					$(personInst).find('.photo.thumbnail').removeClass('not-available');
					var thumbnail = 'img/people/thumbnails/' + person.thumbnails[person.thumbnails.length == 1 ?
							0 : Math.floor(Math.random() * person.thumbnails.length)];
					var img = $('<img/>');
					$(img).appendTo($(personInst).find('.photo.thumbnail'));
					$(img).attr('src',thumbnail);
				} else {
					$(personInst).find('.photo.thumbnail').addClass('not-available');
				}
			})(people[i]);
		}

		$(gallery).click(function(event) {
			var focusedPerson = $(event.target).parent('div.person');

			if(focusedPerson != null && focusedPerson.length > 0) {
				var name = $(focusedPerson).find('.name').html();

				emptyModal();

				var enlargedPerson = $(focusedPerson).clone();
				loadIntoModal($(enlargedPerson).clone());

				$(enlargedPerson).attr('enlarged','true');
				var portrait = $('<img/>');
				$(portrait).appendTo($(enlargedPerson).find('.photo.enlarged'));
				for(var j = 0, len_j = people.length; j < len_j; j++) {
					if(people[j].hasOwnProperty('name') && people[j].name == name) {
						if(people[j].hasOwnProperty('imgs') && people[j].imgs.length > 0) {
							var pic = people[j].imgs[people[j].imgs.length == 1 ? 0 :
								Math.floor(Math.random() * people[j].imgs.length)];
							$(portrait).attr('src','img/people/' + pic);
						}
					}
				}
			}
		});
	};
};

