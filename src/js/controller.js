import * as model from './model';
import recipeView from './views/recpieView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import pagenationView from './views/pagenationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controllerRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();

    resultView.updata(model.getSearchResultsPage());

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    bookmarkView.updata(model.state.bookmark);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllerSearch = async function () {
  try {
    resultView.renderSpiner();

    const query = searchView.getQuery();
    await model.loadSearchResults(query);

    if (!query) return;

    // resultView.render(model.state.search.results);
    // console.log(model.getSearchResultsPage(1));
    resultView.render(model.getSearchResultsPage());

    pagenationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goTo) {
  resultView.render(model.getSearchResultsPage(goTo));

  pagenationView.render(model.state.search);
};

const controlServings = function (newServ) {
  model.updateServings(newServ);
  // recipeView.render(model.state.recipe);
  recipeView.updata(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.updata(model.state.recipe);

  bookmarkView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecepi) {
  try {
    addRecipeView.renderSpiner();

    await model.uploadRecipe(newRecepi);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookmark);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addhandlerRender(controllerRecipe);
  recipeView.addHandlerUpdateSrvings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controllerSearch);
  pagenationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
