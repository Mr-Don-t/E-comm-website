// # is for the truly private thats means only accessible in the class in which it is defined
//underscore convection for only protected, it can be used by many through View.js


class SearchView{
    _parentElement=document.querySelector('.search');

    getQuery(){
       const query= this._parentElement.querySelector('.search__field').value;
      
        this._clearInput();
        return query;
    }

    _clearInput(){
        this._parentElement.querySelector('.search__field').value=''
    }

    addHandlerSearch(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            handler();
        })
    }
    


}


export default new SearchView();