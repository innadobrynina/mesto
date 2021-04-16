export default class Card {
    constructor(
        card,
        currentUser,
        template,
        handleCardClick, { handleToggleLike }, { handleDeleteCard }
    ) {
        this._card = card;
        this._name = card.name;
        this._link = card.link;
        this._currentUser = currentUser;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._toggleLike = handleToggleLike;
        this._itsMyCard = card.owner._id === currentUser._id;

        this._deleteCard = handleDeleteCard;


    }

    // получим карточку
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


    // создадим карточку
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.card__title').textContent = this._name;

        this._cardLikeCounter = this._element.querySelector('.card__likes-counter');
        this._setLikesCount(this._card.likes.length);
        this._checkMyLike(this._card.likes);

        this._modalImg.src = this._link;
        this._modalImg.alt = this._name;

        return this._element;
    }

    // проставляем лайки
    _handleToggleLike() {
        if (!this._likeBtn.classList.contains('card__like_active')) {
            this._toggleLike("PUT", this._card._id)
                .then((card) => {
                    this._setLikesCount(card.likes.length);
                    this._checkMyLike(card.likes);
                })
                .catch((err) => {
                    console.log("Ошибка при клике на лайк", err);
                });
        } else {
            this._toggleLike("DELETE", this._card._id)
                .then((card) => {
                    this._setLikesCount(card.likes.length);
                    this._checkMyLike(card.likes);
                })
                .catch((err) => {
                    console.log("Ошибка при снятии лайка", err);
                });
        }
    }


    // удаляем карточку
    _handleDeleteCard() {
        this._deleteCard(this._card._id, this._element);
    }


    // вызываем слушателей
    _setEventListeners() {
        //активируем лайк
        this._likeBtn = this._element.querySelector('.card__like');
        this._likeBtn.addEventListener('click', () =>
            this._handleToggleLike());

        //удаляем карточку
        this._removeBtn = this._element.querySelector('.card__remove');
        if (this._itsMyCard) {
            this._removeBtn.addEventListener('click', () => this._handleDeleteCard());
        } else {
            this._removeBtn.remove();
        }

        //открываем попап с изображением
        this._modalImg = this._element.querySelector('.card__image');
        this._modalImg.addEventListener('click', this._handleCardClick);
    }

    _setLikesCount(count) {
        this._cardLikeCounter.textContent = count;
    }

    _checkMyLike(likes) {
        const myLike = (el) => el._id === this._currentUser._id;
        if (likes.some(myLike)) {
            this._likeBtn.classList.add('card__like_active');
        } else {
            this._likeBtn.classList.remove('card__like_active');
        }
    }
}