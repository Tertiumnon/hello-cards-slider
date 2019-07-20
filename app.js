const app = {
  cardsContainer: document.getElementById('cards-list'),
  carouselCardsContainer: document.querySelector('#carousel .carousel-inner'),
  carouselCardsCount: {
    992: 5,

  },
  maxTextLength: 60,
  cards: [
    {
      id: 1,
      image: 'images/cat.jpg',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      userName: 'userName',
      rating: '5.0',
      voted: '260',
      favorite: false,
      priceFrom: 500,
      isInCarousel: true
    },
  ]
};

onCardClick = (id) => {
  alert(`card id is ${id}`)
};

onFavoriteClick = (id) => {
  alert(`favorite card ${id}`)
};

/**
 * Шаблонизируем карточку
 * @param {Object} params
 * @param {String} params.image
 * @param {String} params.text
 * @param {String} params.userName
 * @param {Number} params.rating
 * @param {Number} params.voted
 * @param {Boolean} params.favorite
 * @param {Number} params.priceFrom
 * @returns {HTMLElement}
 */
const cardTemplate = (params) => {
  const {
    id, image, text, userName, rating, voted, favorite, priceFrom
  } = params;
  let el = document.createElement('div');
  el.classList.add('card');
  el.classList.add(`cardID-${id}`);
  el.innerHTML = `
    <img src="${image}" class="card-img-top" alt="${text}">
    <div class="card-body">
      <p class="card-text">${text.length > app.maxTextLength ? `${text.substring(0, app.maxTextLength)}...` : ''}</p>
    </div>
    <div class="card-additional">
      <span class="card-userName"><span class="user-circle"></span> ${userName}</span>
      <span class="card-ratingContainer"><span class="card-rating"><i class="fas fa-star"></i> ${rating}</span> <span class="card-voted">(${voted})</span></span>
    </div>
    <div class="card-footer">
      <span class="card-favorite"><i class="fas fa-heart ${favorite ? 'active': ''}"></i></span>
      <span class="card-price">от ${priceFrom} &#x20bd;</span>
    </div>`;
  el.addEventListener('click', () => {
    onCardClick(id);
  });
  el.querySelector('.card-favorite').addEventListener('click', (e) => {
    e.stopPropagation();
    onFavoriteClick(id);
  });

  return el;
};


/**
 * Показываем карточки
 * @returns {void}
 */
const showCards = () => {
  [...app.cardsContainer.children].forEach(element => {
    element.remove();
  });
  for (let i = 0; i < app.cardsCount; i++) {
    const card = app.cards[i];
    app.cardsContainer.appendChild(cardTemplate(card));
  }
};

const createCarouselItem = () => {
  const el = document.createElement('div');
  el.classList.add('carousel-item');
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('row');
  cardsContainer.classList.add('card-columns-carousel');
  el.appendChild(cardsContainer);
  return el;
};

const setCardsCount = () => {
  if (app.wWidth >= 992 && app.wWidth < 1200) {
    app.cardsCount = 8;
    app.carouselCardsCount = 4;
  } else if (app.wWidth >= 768 && app.wWidth < 992) {
    app.cardsCount = 6;
    app.carouselCardsCount = 3;
  } else if (app.wWidth >= 576 && app.wWidth < 768) {
    app.cardsCount = 4;
    app.carouselCardsCount = 2;
  } else if (app.wWidth >= 435 && app.wWidth < 576) {
    app.cardsCount = 2;
    app.carouselCardsCount = 2;
  } else if (app.wWidth < 435) {
    app.cardsCount = 2;
    app.carouselCardsCount = 1;
  } else {
    app.cardsCount = 10;
    app.carouselCardsCount = 5;
  }
};

/**
 * Показываем карточки в карусели
 * @returns {void}
 */
const showСarouselCards = () => {
  [...app.carouselCardsContainer.children].forEach(element => {
    element.remove();
  });
  for (let i = 0, c = 0, cI = 0; i < 20; i++) {
    const card = app.cards[i];
    if (card.isInCarousel) {
      if (c == 0) app.carouselCardsContainer.appendChild(createCarouselItem());
      if (c !==0 && (c % app.carouselCardsCount) == 0) {
        app.carouselCardsContainer.appendChild(createCarouselItem());
        cI++;
      }
      app.carouselCardsContainer.children[cI].children[0].appendChild(cardTemplate(card));
      c++;
    }
  }
  if (app.carouselCardsContainer.children.length > 0) {
    app.carouselCardsContainer.children[0].classList.add('active');
  }
};

// Размножаем кроликов в неволе
let rabbits = 1;
while (rabbits < 20) {
  const newCard = {...app.cards[0]};
  rabbits++;
  newCard.id = rabbits;
  app.cards.push(newCard);
}

const main = () => {
  app.wWidth = window.innerWidth;
  setCardsCount();
  showCards();
  showСarouselCards();
};

main();

window.onresize = function(event) {
  main();
};
