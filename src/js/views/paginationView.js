import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    _parentElement=document.querySelector('.pagination')

    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn=e.target.closest('.btn--inline')//We can easily get the closest parent element by selector using closest().However, closest() will check the current element as well, so if the current element is also a div, it will return the current element.
           //closest is useful when whole button should work even if click on number appearing or any text
        //   console.log(btn);
        
    if(!btn)return;
    const goToPage=btn.dataset.goto; //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    console.log(goToPage);

       handler(goToPage);


              })
  }

    _generateMarkup(){
        const curPage=+this._data.page;

        const numPages=Math.ceil(this._data.results.length/this._data.resultsPerPage);
        console.log(numPages)

        // Page 1, and there are other pages

        if(curPage===1 && numPages>1){ return `
                <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage+1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
      `}

        // Page 2, and ther are NO other pages
        //Last page


        if(curPage===numPages && numPages>1){
            return `
                <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage-1}</span>
                </button>
                `
        }

        // other page
        if(curPage<numPages){
            return ` 
            
        <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
        </button>
   
        <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
            <span>Page${curPage+1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    
        `
        }

        //page 1 , and there are no other pages
        return '';

    }
}

export default new PaginationView();