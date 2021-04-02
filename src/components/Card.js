export default class Card {
    constructor(data, handleCardClick, template) {
        this._place = data.place;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._template = template;
    }
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._template)
            .content
            .querySelector('.card')
            .cloneNode(true);

        // вернём DOM-элемент карточки
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._place;
        this._modalImg.src = this._link;
        this._modalImg.alt = this._place;

        return this._element;
    }

    // метод, делающий активным кнопку лайка
    _handleLikeClick() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }


    // метод, удаляющий карточку
    _handleDelete() {
        this._element.querySelector('.card__remove').closest(".card").remove();
    }


    // вызываем слушателей
    _setEventListeners() {
        //активируем лайк
        this._likeBtn = this._element.querySelector('.card__like');
        this._likeBtn.addEventListener('click', () =>
            this._handleLikeClick());

        //удаляем карточку
        this._removeBtn = this._element.querySelector('.card__remove');
        this._removeBtn.addEventListener('click', () =>
            this._handleDelete());

        //открываем попап с изображением
        this._modalImg = this._element.querySelector('.card__image');
        this._modalImg.addEventListener('click', this._handleCardClick);
    }
}