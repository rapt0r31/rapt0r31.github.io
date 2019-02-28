(function(){
 		window.renderMapPin = function(objectMains) {
			var wizardMapPin = mapPinMain.cloneNode(true);

			 wizardMapPin.style.left = objectMains.location.x + 'px';
			 wizardMapPin.style.top = objectMains.location.y + 'px';
			 wizardMapPin.querySelector('img').src = objectMains.author.avatar;
			 wizardMapPin.querySelector('img').title = objectMains.offer.title;
			 wizardMapPin.classList.add('hidden');

			
			
			return wizardMapPin;
	}
 	})();