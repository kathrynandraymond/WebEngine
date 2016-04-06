var Wedding = Wedding || {};
Wedding.modules = Wedding.modules || {};

Wedding.modules.TheWeddingParty = function() {
	var that = this;

	var people = data.people;

	var findPersonByName = function(name) {
		for(var i = 0, len = people.length; i < len; i++) {
			if(people[i].name == name) {
				return people[i];
			}
		}
		return null;
	};

	this.init = function(parentElement) {
		var gallery = $(parentElement).find('.gallery');
		var template = $(parentElement).find('.cannotSeeThis .person[enlarged="false"]');
		for(var i = 0, len = people.length; i < len; i++) {
			var personInst = addPersonToTemplate(people[i], template);
			if(Math.floor(Math.random() * 2) == 0) {
				$(personInst).appendTo(gallery);
			} else {
				$(personInst).prependTo(gallery);
			}
		}

		$(gallery).click(function(event) {
			var focusedPerson = $(event.target).parents('div.person');
			if(focusedPerson != null && focusedPerson.length > 0) {
				var person = findPersonByName($(focusedPerson).find('.name').html());
				pageModal.emptyModal();
				var enlargedPerson = addPersonToTemplate(person, $('.cannotSeeThis .person[enlarged="true"]'));
				pageModal.loadIntoModal($(enlargedPerson), false);
				pageModal.showModal();

				var pictureFrame = $(enlargedPerson).find('.photo');
				var pics = $(pictureFrame).find('img');
				if(pics != null && pics.length > 0) {
					var img = $(pics[Math.floor(Math.random() * pics.length)]);
					$(img).addClass('show');
					$(pictureFrame).css('background-image','none');

					(function(shownImg, pictureFrame) {
						setTimeout(function() {
							var imgWidth = $(shownImg).width();
							var imgHeight = $(shownImg).height();

							if(imgWidth > parseInt($(pictureFrame).css('max-width')) ||
									imgHeight > parseInt($(pictureFrame).css('max-height'))) {
								// Need to shrink down the image
								var desiredDimension = -1;
								if(imgWidth > imgHeight) {
									desiredDimension = parseInt($(pictureFrame).css('max-width'));
									imgHeight *= (desiredDimension / imgWidth);
									imgWidth = desiredDimension;
								} else {
									desiredDimension = parseInt($(pictureFrame).css('max-height'));
									imgWidth *= (desiredDimension / imgHeight);
									imgHeight = desiredDimension;
								}
							}
							$(shownImg).removeClass('show');
							$(pictureFrame).width(imgWidth).height(imgHeight).css('background-image','url("' + $(shownImg).attr('src') + '")')
						}, 500);
		
					})(img, pictureFrame);
				}
			}
		});
	};

	var addPersonToTemplate = function(person, template) {
		var personInst = $(template).clone();
		$(personInst).find('.name').html(person.name);
		$(personInst).find('.role').html(person.type);
		$(personInst).find('.about').html(person.about);
		var photoFrame = $(personInst).find('.photo');
		if(person.hasOwnProperty('thumbnails') && person.thumbnails.length > 0) {
			var thumbnail = 'img/people/thumbnails/' + person.thumbnails[person.thumbnails.length == 1 ?
					0 : Math.floor(Math.random() * person.thumbnails.length)];
			$(photoFrame).css('background-image','url("' + thumbnail + '")')
		}
		if(person.hasOwnProperty('imgs') && person.imgs.length > 0) {
			for(var j = 0, numPics = person.imgs.length; j < numPics; j++) {
				var img = $('<img/>').attr('src','img/people/' + person.imgs[j]).appendTo(
						$(photoFrame));
			}
		}

		return personInst;
	}
};

