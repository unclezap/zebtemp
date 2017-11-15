const $list = $('#list-group');
const $detail = $('#beer-detail');

$(function() {
  api.get(`${baseUrl}/beers`).then(beers => {
    const listMarkup = beers
      .map(beerData => new Beer(beerData).renderListItem())
      .join('');
    $list.append(listMarkup);
  });

  $list.on('click', '.list-group-item', e => {
    const id = e.target.dataset.id;
    const beer = Beer.find(id);
    $detail.empty();
    $detail.append(beer.renderDetail());
  });

  $(document).on('click', '#edit-beer', e => {
    const id = e.target.dataset.id;
    const description = $('textarea').val();
    api
      .patch(`${baseUrl}/beers/${e.target.dataset.id}`, {
        description
      })
      .then(({ id, description }) => {
        Beer.find(id).description = description;
      });
  });
});

const baseUrl = 'http://localhost:3000';
const api = {
  get(url) {
    return fetch(url).then(res => res.json());
  },
  post(url, body) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(res => res.json());
  },
  patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(res => res.json());
  }
};

class Beer {
  constructor({ id, name, image_url, description, tagline }) {
    this.id = id;
    this.name = name;
    this.imageUrl = image_url;
    this.description = description;
    this.tagline = tagline;
    this.constructor.all.push(this);
  }

  static find(id) {
    return this.all.find(beer => beer.id == id);
  }

  renderListItem() {
    return `
      <li data-id="${this.id}" class="list-group-item">
        ${this.name}
      </li>
      `;
  }

  renderDetail() {
    return `
      <h1>${this.name}</h1>
      <img src="${this.imageUrl}">
      <h3>${this.tagline}</h3>
      <textarea>${this.description}</textarea>
      <button data-id="${this.id}" id="edit-beer" class="btn btn-info">
        Save
      </button>
    `;
  }
}

Beer.all = [];
