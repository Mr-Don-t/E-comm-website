import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView'
import addRecipeView  from './views/addRecipeView.js';

// import icons from '../img/icons.svg';
 
import 'core-js/stable';
import 'regenerator-runtime/runtime'


// import  'core-js/core/number';

// this is not real Javascript, this is simply coming from parcel.
// if(module.hot){
//   module.hot.accept()
// }


const controlRecipes=async function(){
  try{

    const id=window.location.hash.slice(1);
    // console.log(id)

    if(!id) return;
    recipeView.renderSpinner();

    // update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

     //Updating bookmarks view
   bookmarksView.update(model.state.bookmarks) 
   
  
    //loading recipe
   
    await model.loadRecipe(id);

    // 2)Rendering recipe
       recipeView.render(model.state.recipe);

      //  debugger
     


  }catch(err){
    console.log(err)
    // alert(err);
    // console.log(err);
    recipeView.renderError()
  }
  
};


const controlSearchResults=async function(){
  try{
       resultsView.renderSpinner();
      //  console.log(recipeView)

    //1)Get search query
    const query=searchView.getQuery();
    
    if(!query)return;
   //2)Load search results
    await model.loadSearchResults(query)
   //3)Render results
    // console.log(model.state.search.results)
    // resultsView.render(model.state.search.results)

    // console.log(model.getSearchResultsPage(4))
   resultsView.render(model.getSearchResultsPage())

   // 4) Render initial pagination button

    paginationView.render(model.state.search)

  }catch(err){
    console.log(err);
  }
}
// controlSearchResults()

const controlPagination=function(goToPage){
//1)render new results
  resultsView.render(model.getSearchResultsPage(goToPage))
  // console.log(goToPage)

  // 2) Render new pagination button

   paginationView.render(model.state.search)
  
}

const controlServings=function(newServings){
  //Update the recipe servings(in state)
  model.updateServings(newServings)

  //Update the recipe new
  // recipeView.render(model.state.recipe)  // here we are again loading the entire page and that would be very bad for server
  recipeView.update(model.state.recipe) // here we are updating only that part or text which has been updated , not loading the whole page again
}


const controlAddBookmark=function(){
  // model.addBookmark(model.state.recipe)

if(!model.state.recipe.bookmarked)model.addBookmark(model.state.recipe)
else model.deleteBookmark(model.state.recipe.id)

  console.log(model.state.recipe)
//update recipe view
  recipeView.update(model.state.recipe)
  // bookmarksView.update(model.state.bookmarks)

//render bookmarks
 bookmarksView.render(model.state.bookmarks)

}


const controlBookmark=function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe= async function(newRecipe){
  try{
    addRecipeView.renderSpinner()
  //Upload the new recipe data
 await model.uploadRecipe(newRecipe)
 console.log(model.state.recipe)

 //render recipe
 recipeView.render(model.state.recipe)


 //success message

 addRecipeView.renderMessage()

 //render bookmark view
 bookmarksView.render(model.state.bookmarks)

 //change id in url
 window.history.pushState(null,'',`#${model.state.recipe.id}`)
 

 /// close the window
 setTimeout(function(){
  addRecipeView.toggleWindow()
 },MODAL_CLOSE_SEC*1000)



}catch(err){
  console.error('*',err)
  addRecipeView.renderError(err.message)
}

  }



const init=function(){
  bookmarksView.addHandlerRender(controlBookmark)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
  
  
}

init()

// window.on('hashchange',
//   showRecipe()
// ).trigger('hashchange'); 
// location.reload()



// HashChangeEvent(showRecipe())
// onhashchange(showRecipe())

// window.addEventListener('hashchange',showRecipe())

// window.addEventListener('load',showRecipe())
// // showRecipe()






































// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
