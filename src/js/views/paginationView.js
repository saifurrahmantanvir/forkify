import icons from 'url:../../img/icons.svg';

import View from './view.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        })
    }

    _generateMarkup() {
        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const currentPage = this._data.page;

        // Page 1, and there are other pages
        if (currentPage === 1 && numOfPages > 1) {
            return `
                <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Last page
        if (currentPage === numOfPages && numOfPages > 1) {
            return `
                <button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `;
        }

        // Other page
        if (currentPage < numOfPages) {
            return `
                <button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Page 1, and there are NO other pages
        if (numOfPages === 1) {
            return '';
        }

    }

}

export default new PaginationView();
