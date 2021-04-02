import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(place, link) {
        const modalImg = this._popupElement.querySelector('.popup-image__content');
        const captionText = this._popupElement.querySelector('.popup-image__caption');
        modalImg.src = link;
        modalImg.alt = place;
        captionText.textContent = place;
        super.open();
    }
}