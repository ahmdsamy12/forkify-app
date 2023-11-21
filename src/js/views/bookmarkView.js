import View from './View';
import previewView from './previewView';

class BookmarkView extends View {
  _parentEle = document.querySelector('.bookmarks__list');
  _errorMsg = 'no bookmarks yet . find a nice recipe and bookmark it ';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(data => previewView.render(data, false)).join('');
  }
}

export default new BookmarkView();
