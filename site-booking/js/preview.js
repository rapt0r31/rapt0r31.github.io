(function(){
 		window.renderMapCard = function(objectMains) {
			var wizardElement = mapTemplate.cloneNode(true);

			wizardElement.querySelector('.popup__avatar').src = objectMains.author.avatar;
			wizardElement.querySelector('.popup__avatar').alt = objectMains.offer.title;
			wizardElement.querySelector('.popup__title').textContent = objectMains.offer.title;
			wizardElement.querySelector('.popup__address').textContent = objectMains.offer.address;
			wizardElement.querySelector('.popup__price').textContent = objectMains.offer.price + ' руб/ночь';
			wizardElement.querySelector('.popup__type').textContent = objectMains.offer.type;
			wizardElement.querySelector('.popup__text--capacity').textContent = objectMains.offer.rooms + ' комнаты для ' + objectMains.offer.guests + ' гостей';
			wizardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + objectMains.offer.checkin + ', выезд до ' + objectMains.offer.checkout;
			wizardElement.querySelector('.popup__description').textContent = objectMains.offer.description;

			//Блок представления услуг
			var popupFeatures = wizardElement.querySelector('.popup__features');

			//Удаляем все услуги
			while(popupFeatures.firstChild){
				popupFeatures.removeChild(popupFeatures.firstChild);
			}

			//Добавляем нужные услуги в разметку
			var isFeaturesElement = function(){
				var featuresElement = document.createElement('li');
				return featuresElement;
			}

			for(var q = 0; q < objectMains.offer.features.length; q++){
				var featuresElementItem = isFeaturesElement();
				featuresElementItem.className = 'feature feature--' + objectMains.offer.features[q];
				wizardElement.querySelector('.popup__features').appendChild(featuresElementItem);
			}
			return wizardElement;
		};
 	})();