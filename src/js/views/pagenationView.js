import View from './View';
import icons from 'url:../../img/icons (1).svg';

class PagenationView extends View {
  _parentEle = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEle.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const btnGo = +btn.dataset.goto;
      console.log(btnGo);
      handler(btnGo);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numsPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1 and there are other pages
    if (curPage === 1 && numsPage > 1) {
      return ` <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //last page
    if (curPage === numsPage && numsPage > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }

    //other page
    if (curPage < numsPage) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    return '';
  }
}

export default new PagenationView();
