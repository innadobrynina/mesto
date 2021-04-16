import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        const modalImg = this._popupElement.querySelector('.popup-image__content');
        const captionText = this._popupElement.querySelector('.popup-image__caption');
        modalImg.src = link;
        modalImg.alt = name;
        captionText.textContent = name;
        super.open();
    }
}