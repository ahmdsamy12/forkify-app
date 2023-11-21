import icons from 'url:../../img/icons (1).svg';

export default class View {
  _data;
  _message = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _errorMsg;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const maekup = this._generateMarkup();

    if (!render) return maekup;

    this._clearParenetEle();
    this._parentEle.insertAdjacentHTML('afterbegin', maekup);
  }

  updata(data) {
    this._data = data;
    const newMaekup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMaekup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEle.querySelectorAll('*'));

    console.log(newElements, curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clearParenetEle() {
    this._parentEle.innerHTML = '';
  }

  renderSpiner = function () {
    const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}.svg#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clearParenetEle();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMsg) {
    const maekup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clearParenetEle();
    this._parentEle.insertAdjacentHTML('afterbegin', maekup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}.svg#icon-smile"></use>
      </svg>
    </div>
    <p>
      ${message}
    </p>
  </div>
`;
    this._clearParenetEle();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }

  addhandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
}
