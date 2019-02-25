'use strict';

var MIN_LOCATION_X = 50;
var MAX_LOCATION_X = 1150;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_PRICE = 1000;
var MAX_PRICE = 10000;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var randomPrice = function(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
};
var randomRooms = function(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
};
var randomGuests = function(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
};


var randomLocationX = function(min, max){
	return String(Math.floor(Math.random() * (max - min)) + min);
};
var randomLocationY = function(min, max){
	return String(Math.floor(Math.random() * (max - min)) + min);
};

//Функция перебора объекта typeItems
var typeItemsBust = function(j){
	var typeItemsArray = [];
	for(var key in typeItems){
		typeItemsArray.push(typeItems[key]);
	}
	for(var i = 0; i<typeItemsArray.length; i++){
		return typeItemsArray[j];
	}
}

var map = document.querySelector('.map');
var mapTemplate = document.querySelector('template')
	.content
	.querySelector('.map__card');
var mapPins = document.querySelector('.map__pins');
var mapPinFirst = mapPins.querySelector('.map__pin:first-of-type');
var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var noticeForm = document.querySelector('.notice__form');
var formElementDisabled = document.querySelectorAll('.form__element');

	for (var i = 0; i < formElementDisabled.length; i++) {
 		formElementDisabled[i].disabled = "disabled";
 	}

var inputAddress = document.querySelector('#address');
var buttonSubmit = document.querySelector('.form__submit');
var succesSubmit = document.querySelector('.succesSubmit');

var fragmentPin = document.createDocumentFragment();
var fragment = document.createDocumentFragment();


var successHendler = function(objectMain){
	for(var i = 0; i < objectMain.length; i++){
		wrapperBox(renderMapPin(objectMain[i]), renderMapCard(objectMain[i]));
	}
}

window.load(successHendler);


function wrapperBox(mapPinAll, mapCardAll) {
	var fragmentPin = document.createDocumentFragment();
	var fragment = document.createDocumentFragment();

	fragmentPin.appendChild(mapPinAll);
	fragment.appendChild(mapCardAll);

	mapPins.appendChild(fragmentPin);
	map.insertBefore(fragment, mapFiltersContainer);
	
	mapCardAll.classList.add('hidden');

//Разблокировка экрана
	function getCoords(elem) {  
	  var box = elem.getBoundingClientRect();
	  return {
	    top: box.top  + pageYOffset,
	    left: box.left + pageXOffset
	  };
	}

	var dragger = false;
	var onMouseDown = function(evt){
		evt.preventDefault();
		

		var coords = getCoords(mapPinFirst);
	  var shiftX = evt.pageX - coords.left;
	  var shiftY = evt.pageY - coords.top;

	  		

		var onMouseMove = function(moveEvt){
			moveEvt.preventDefault();
			dragger = true;

			var newLeftRight = moveEvt.pageX - shiftX;
			var newTopBottom = moveEvt.pageY - shiftY;

			if (newLeftRight < 400){
				newLeftRight = 400;
			}

			if (newLeftRight > 1440){
				newLeftRight = 1440;
			}
			if(newTopBottom < 50){
				newTopBottom = 50;
				//console.log(newTopBottom);
			}
			if (newTopBottom > 570){
				newTopBottom = 570;
			}
			 mapPinFirst.style.left = newLeftRight - 318 + 'px';
			 mapPinFirst.style.top = newTopBottom + 32 + 'px';
		};

		var onMouseUp = function(upEvt){
			upEvt.preventDefault();
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);

			if(dragger){
				map.classList.remove('map--faded');
				mapPinFirst.removeEventListener('mousedown', onMouseDown);
				mapPinAll.classList.remove('hidden');

				noticeForm.classList.remove('notice__form--disabled');

				for (var i = 0; i < formElementDisabled.length; i++) {
				 	formElementDisabled[i].removeAttribute("disabled", "disabled");
				}
			}
		}
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	mapPinFirst.addEventListener('mousedown', onMouseDown);


//Открытие карточки
	mapPinAll.addEventListener('click', function(evt){
		evt.preventDefault();

		var popup = document.querySelectorAll('.popup');
		for(var s = 0; s < popup.length; s++){
			popup[s].classList.add('hidden');
			
		}
		mapCardAll.classList.remove('hidden');
		
		//Подставляем адрес в input
		var popupAddress = mapCardAll.querySelector('.popup__address');
		inputAddress.value = popupAddress.textContent;
		
	});


//Закрытие карточки
	var popupClose = mapCardAll.querySelector('.popup__close');
	popupClose.addEventListener('click', function(evt){
		evt.preventDefault();
		mapCardAll.classList.add('hidden');
	});

//Обработка нажатий на клавиатуру
(function(){
		document.addEventListener('keydown', function(evt){
			if(evt.keyCode == ESC_KEYCODE){
				mapCardAll.classList.add('hidden');
			}
		});
		mapPinAll.addEventListener('keydown', function(evt){
			if(evt.keyCode == ENTER_KEYCODE){
				mapCardAll.classList.remove('hidden');
			}
		});
})();
}

//Отправка данных на сервер
noticeForm.addEventListener('submit', function(evt) {

	window.upload(new FormData(noticeForm), function(response) {
		succesSubmit.classList.remove('succesSubmit--hidden');

		noticeForm.reset();
		setTimeout(succesSubmitHidden, 10000);
	});
	evt.preventDefault();
});

function succesSubmitHidden() {
	succesSubmit.classList.add('succesSubmit--hidden');
}



