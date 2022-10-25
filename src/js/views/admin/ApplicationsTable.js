import { createChevron } from '../../helpers';
import Table from '../common/Table';

class ApplicationsTable extends Table {
    constructor() {
        super()
        this._data = {
            displayIndex: false,
            tableControls: true
        }
    }

    // The Child Tables are responsible for Headers and other Table elements
    _generateMarkup() {
        const tableMarkup = super._generateMarkup(this._data);

        // Add the heading, controls, and content wrapper
        const markup = /*html*/`
            <div class="table__wrapper table__wrapper--applications">
                <div class="admin__heading">
                    <span>Applications</span>
                    ${createChevron('applications')}
                </div>
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

                        <div class="custom-select custom-select--table custom-select--applications btn">
                            <div class="dropdown-btn dropdown-btn--table">1</div>
                        </div>

                        <div class="forward-btn forward-btn--table forward-btn--applications btn">
                            <svg xmlns="http://www.w3.org/2000/svg" class="forward-icon forward-icon--table forward-icon--applications"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>

                    <div class="btn-wrapper btn-wrapper--table">
                     
                        <div class="search search--table search-btn--table btn">
                            <input type="text" class="search__input search__input--table" />
                            <div class="search__icon--table">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="table__content table__content--applications">
                    ${tableMarkup}
                </div>
            </div>
        `;
        return markup;
    }


    // setData(applications, searchTerm) {
    //     this._data = formatData(applications, searchTerm);
    // }

    // formatTableData(applications, searchTerm) {
    //     const headers = ['ID', 'Name'];
    // }
}

export default new ApplicationsTable();