import View from '../View';
import { createSearchBtn, createChevron } from '../../helpers';

class Table extends View {

    _createThead(heads, modifiers, type) {
        console.log(modifiers);
        return `<thead class="thead--${type}">${this._createRow(heads, modifiers, type, true)}</thead>`;  
    }
    
    _createTbody(rows, modifiers, type) {
        return (`
            <tbody class="tbody--${type}">
                ${rows.map((row, index) => {
                    if(index >= this._data.rowsToDisplay) return;
                    return this._createRow(row, modifiers, type)}).join('')
                }
            </tbody>
        `);
    }

    _createRow(row, modifiers, type, header = false) {
        let markup = '';
        let skipRow = this._data.tableCheckboxes? 1:0;
        if(this._data.tableCheckboxes){
            row.unshift(this._createTableCheckbox(type, header));
        }

        for(let x = 0; x < row.length; x++) {
            // If the child table has row controls, index 0 = checkbox, index 1 = index id
            // If the child table has displayIndex = false, skip the first/second column
            if(x === skipRow && !this._data.displayIndex) continue;
            markup += this._createCell(row[x], modifiers[x], type, header);
        }

        // Edit Column
        markup += header? 
            this._createCell(createSearchBtn('table'), 'search', type, header):
            this._createCell('Edit', 'edit', type, header);

        return `<tr class="tr--${type}">${markup}</tr>`;
    }

    _createCell(data, modifier, type, header) {
        return (
            `${header? `<th class="th--${modifier} th--${type}">`: `<td class="td--${modifier} td--${type}">`}
                <div class="${header? 'th':'td'}__data">
                    ${data}
                    ${this._data.arrows.includes(modifier) && header ? `<div class="table__arrow table__arrow--${modifier}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M413.1 327.3l-1.8-2.1-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6-7.7 0-14.6 3.4-19.2 8.6L101 324.9l-2.3 2.6C97 330 96 333 96 336.2c0 8.7 7.4 15.8 16.6 15.8h286.8c9.2 0 16.6-7.1 16.6-15.8 0-3.3-1.1-6.4-2.9-8.9z"/>
                    </svg>
                    </div>`:''}
                </div>
            ${header? '</th>':'</td>'}`
        ); 
    }

    _createTableCheckbox(type, header) {
        return `<input type="checkbox" class="" name="checkbox${header? '--header':''}" />`;
    }

    _setTableHeight(numRows, modifier) {
        const style = getComputedStyle(document.body);
        const rowHeight = style.getPropertyValue(`--row-height--${modifier}`);
        const theadHeight = style.getPropertyValue(`--thead-height--${modifier}`);
        const controlsHeight = style.getPropertyValue(`--table-controls-height--${modifier}`)
        
        const tableHeight = `${parseFloat(rowHeight) * numRows + parseFloat(theadHeight) + this._data.tableControls? controlsHeight:0}rem`;
        const root = document.querySelector(':root');
        root.style.setProperty(`--table-height--${modifier}`, tableHeight);
    }

    _generateMarkup({type, modifiers, heads, rows}) {
        const headsCopy = [...heads];
        const rowsCopy = [...rows];

console.log(this._data);
        
        return `<table class="table--${type}">
                ${this._createThead(headsCopy, modifiers, type)}
                ${this._createTbody(rowsCopy, modifiers, type)}
            </table>
        `;
        
        // const markup = `
        //     <table class="table table--${title}">
        //         <thead class="thead thead--${title}">
        //             <tr>
        //                 ${theads.map((thead) => {
        //                     if(thead === 'id' && !displayIndex) return;
        //                     return `<th class="th--${thead.toLowerCase()}">${thead}</th>`;
        //                 }).join('')} 
        //             </tr>
        //         </thead>
        //         ${rows.length > 0? 
        //             `<tbody class="tbody--${title}">
        //                 ${
        //                     rows.map(row => {
        //                         return `<tr class="row row--${title}">${row.map(col => {
        //                             return `${col}`
        //                         }).join('')}</tr>`
        //                     }).join('')
    
        //                 }
        //             </tbody>`: ''
        //         }
        //     </table>
        // `;
    };

}

export default Table;
