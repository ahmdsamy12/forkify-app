import View from './View';
import previewView from './previewView';

class ResultView extends View {
  _parentEle = document.querySelector('.results');
  _errorMsg = 'no recipes found for your query, please try again';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(data => previewView.render(data, false)).join('');
  }
}

export default new ResultView();
