import { createChevron, populateSelect } from '../../helpers';
import Table from '../common/Table';

class ApplicationsTable extends Table {
    constructor() {
        super();
        this._data = {
            // Table controls/structure
            heads: ['Name', 'Position', 'Company', 'Added'],
            arrows: ['name', 'position', 'company', 'added'],
            modifiers: ['checkbox', 'name', 'position', 'company', 'added'],
            type: 'applications',

            tableCheckboxes: true,
            tableControls: this._createTableControls(),

            rowsToDisplay: 4,
            height: '',

            // Search options
            page: 1,
            index: 0,
        };
    }

    // The Child Tables are responsible for Headers and other Table elements
    _generateMarkup() {
        // Calculate table height
        this._setTableHeight(this._data.rowsToDisplay, 'applications');

        const tableMarkup = super._generateMarkup(this._data);

        // Add the heading, controls, and content wrapper
        const markup = /*html*/`
            <div class="table__wrapper table__wrapper--applications">
                <div class="admin__heading">
                    <span>Applications</span>
                    ${createChevron('applications')}
                </div>
                <div class="table__content table__content--applications">
                    ${tableMarkup}
                    ${this._data.tableControls}
                </div>
            </div>
        `;
        return markup;
    }

    _createTableControls() {
        return `
            <div class="table__controls table__controls--applications">
                <div class="btn-wrapper btn-wrapper--table">
                    <div class="add-btn add-btn--table add-btn--applications btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="add-icon add-icon--table add-icon--applications" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <div class="edit-btn edit-btn--table edit-btn--applications btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="edit-icon edit-icon--table edit-icon--applications" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>

                    <div class="delete-btn delete-btn--table delete-btn--applications btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="delete-icon delete-icon--table delete-icon--applications" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </div>

                <div class="btn-wrapper btn-wrapper--table btn-wrapper--pagination">
                    <div class="back-btn back-btn--table back-btn--applications btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="back-icon back-icon--table back-icon--applications"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>

                    <select class="select--table"></select>

                    <div class="forward-btn forward-btn--table forward-btn--applications btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="forward-icon forward-icon--table forward-icon--applications"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>


            </div>
        `;
    }

    // <div class="custom-select custom-select--table custom-select--applications btn">
    //                     <div class="dropdown-btn dropdown-btn--table">1</div>
    //                 </div>

    getNumRows() {
        return this._data.rowsToDisplay;
    }

    setIndex(index) {
        this._data.index = index;
    } 
    getIndex() {
        return (this._data.page - 1) * this._data.rowsToDisplay;
    }

    setPage(page) {
        if(typeof page === 'string') {
            this._data.page += page === 'forwards'? 1:-1;
        }
        else {
            this._data.page = page;
        }
    }
    getPage() {
        return this._data.page;
    }

    getTableTargets(e) {
        // Record control
        const addBtn = e.target.closest('.add-btn--applications');
        const editBtn = e.target.closest('.edit-btn--applications');
        const deleteBtn = e.target.closest('.delete-btn--applications');
        const editRowBtns = e.target.closest('.td--edit');
        const checkbox = e.target.closest('.td--checkbox');

        // Search
        const searchBtn = e.target.closest('.search-btn--table');

        // Pagination
        const backBtn = e.target.closest('.back-btn--applications');
        const pageBtn = e.target.closest('.custom-select--applications');
        const forwardBtn = e.target.closest('.forward-btn--applications');
        
        // Thead
        const checkboxAll = e.target.closest('.checkbox--header');
        const thead = e.target.closest('th') && !checkboxAll && !searchBtn;

        // Row (Except the edit btn, checkbox, and the thead)
        const row = e.target.closest('tbody .tr--applications') && !editRowBtns && !checkbox;

        return { checkboxAll, thead, searchBtn, addBtn, editBtn, deleteBtn, backBtn, pageBtn, forwardBtn, editRowBtns, checkbox, row }
    }

    getCheckboxes() {
        return { checkboxAll: document.querySelector('.checkbox--header'), checkboxes: document.querySelectorAll('.checkbox--row')}
    }

    init() {
        this._parentElement = document.querySelector('.table__wrapper');
        this._preventLabelPropagation();

        const select = this._parentElement.querySelector('.select--table');
        populateSelect(select, this._data.selectData, '1', null, ['table'], false)
    }

    _preventLabelPropagation() {
        const labels = document.querySelectorAll('.checkbox-label');
        const labelAll = document.querySelector('.checkbox-label--all');
        labels.forEach(label => label.addEventListener('click', e => e.stopPropagation()));
        labelAll.addEventListener('click', e => e.stopPropagation());
    }

    addClickHandler(handler) {
        if(!this._parentElement) throw new Error('Error adding table handler');

        this._parentElement.addEventListener('click', handler);
    }

}

export default new ApplicationsTable();