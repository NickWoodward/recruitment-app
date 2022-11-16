import {gsap} from 'gsap';
import View from '../View';
import { createSearchBtn, createChevron } from '../../helpers';

class Table extends View {

    /**
     * Creates the thead
     * @param {Object[]} heads. An array of the th data to display in the header
     * @param {string} modifier. Modifies the html elements with the specific data name. Eg td--age
     * @param {string} type. Modifies the html elements with the table type
     * @returns {string} A markup string of the thead
     * @this {Object} Table. The child instance of the table
    */
    _createThead(heads, modifiers, type) {
        return `<thead class="thead--${type}">${this._createRow([...heads], modifiers, type, true, 0, [])}</thead>`;  
    }
    
    /**
     * Creates the tbody
     * @param {Object[]} row. An array of the cell data to display in the row
     * @param {string} modifier. Modifies the html elements with the specific data name. Eg td--age
     * @param {string} type. Modifies the html elements with the table type
     * @param {string} header. Marks the row as being in the thead
     * @param {string} attributes. The data-attributes added to the row
     * @returns {string} A markup string of the tbody
     * @this {Object} Table. The child instance of the table
    */
    _createTbody(rows, modifiers, type, attributes) {
        return (`
            <tbody class="tbody--${type}">
                ${rows.map((row, index) => {
                    // Adding a checkbox col to the row, create a shallow copy of the row
                    return this._createRow([...row], modifiers, type, false, index + 1, attributes[index])}).join('')
                }
            </tbody>
        `);
    }

    /**
     * Creates a table row
     * @param {Object[]} row. An array of the cell data (or headers) to display in the row
     * @param {string} modifier. Modifies the html elements with the specific data name. Eg td--age
     * @param {string} type. Modifies the html elements with the table type
     * @param {string} header. Marks the row as being in the thead
     * @param {number} index. The index of the row
     * @param {string} attributes. The data-attributes added to the row
     * @returns {string} A markup string of the row
     * @this {Object} Table. The child instance of the table
    */
    _createRow(row, modifiers, type, header = false, index, attributes) {
        let dataAttr = '';
        if(attributes) {
            attributes.forEach(([key, value]) => dataAttr += `data-${key}="${value}" `);
        }
        let markup = '';

        if(this._data.tableCheckboxes){
            row.unshift(this._createTableCheckbox(type, header, index));
        }
        for(let x = 0; x < row.length; x++) {
            markup += this._createCell(row[x], modifiers[x], type, header);
        }

        // Edit Column
        markup += header? 
            this._createCell(createSearchBtn('table'), 'search', type, header):
            this._createCell('Edit', 'edit', type, header);

        return `<tr class="tr--${type}" ${header? '': `${dataAttr}`}>${markup}</tr>`;
    }

    /**
     * Creates a table cell
     * @param {number} data. The data for the cell
     * @param {string} modifier. Modifies the html elements with the specific data name. Eg td--age
     * @param {string} type. Modifies the html elements with the table type
     * @param {string} header. Marks the cell as a th rather than a td
     * @returns {string} A markup string of the cell
     * @this {Object} Table. The child instance of the table
    */
    _createCell(data, modifier, type, header) {
        return (
            `${header? `<th class="th--${modifier} th--${type}">`: `<td class="td--${modifier} td--${type}">`}
                <div class="${header? `th__data th__data--${modifier}`:`td__data td__data--${modifier}`}">
                    ${data}
                    ${this._data.arrows.includes(modifier) && header ? `<div class="table__arrow table__arrow--${modifier}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M413.1 327.3l-1.8-2.1-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6-7.7 0-14.6 3.4-19.2 8.6L101 324.9l-2.3 2.6C97 330 96 333 96 336.2c0 8.7 7.4 15.8 16.6 15.8h286.8c9.2 0 16.6-7.1 16.6-15.8 0-3.3-1.1-6.4-2.9-8.9z"/>
                    </svg>
                    </div>`:''}
                </div>
            ${header? '</th>':'</td>'}`
        ); 
    }

    /**
     * Creates a checkbox for a table row or the table header
     * @param {number} type. Modifies the html elements with the table type
     * @param {string} header. Marks the checkbox as being part of the table header
     * @param {number} index. The row of the checkbox
     * @returns {string} A markup string of the checkbox
     * @this {Object} Table. The child instance of the table
    */
    _createTableCheckbox(type, header, index) {
        return `<label class="checkbox-label${header? '--all':''}" for="checkbox--${index}"></label><input type="checkbox" class="checkbox checkbox--${type} checkbox${header? '--header':`--row`}" id="checkbox--${index}" />`;
    }

    /**
     * Uses the custom css heights of the row/thead/control elements, and this._data.rowsToDisplay
     * to calculate and set the total height of the table element
     * @param {number} numRows. this._data.rowsToDisplay
     * @param {string} modifier. Uses the modifier to select the correct html elements
     * @returns {number} The new table height
     * @this {Object} Table. The child instance that called the function
    */
    _setTableHeight(numRows, modifier) {
        const style = getComputedStyle(document.body);
        const rowHeight = style.getPropertyValue(`--row-height--${modifier}`);
        const theadHeight = style.getPropertyValue(`--thead-height--${modifier}`);
        const controlsHeight = this._data.tableControls? style.getPropertyValue(`--table-controls-height--${modifier}`) : 0
        
        const tableHeight = `${parseFloat(rowHeight) * numRows + parseFloat(theadHeight) + parseFloat(controlsHeight)}rem`;
        console.log('rowHeight', parseFloat(rowHeight), 'numRows', numRows, 'theadHeight', parseFloat(theadHeight), 'controlsHeight', parseFloat(controlsHeight) );
        console.log(parseFloat(rowHeight) * numRows + parseFloat(theadHeight) + parseFloat(controlsHeight));
        const root = document.querySelector(':root');
        root.style.setProperty(`--table-height--${modifier}`, tableHeight);

        return tableHeight;
    }

    /**
     * Generate an html string to be rendered
     * @param {Object} params
     * @param {string} params.type Modifies the html elements with the table type
     * @param {string} params.modifier Modifies the html elements with the specific data name. Eg td--age
     * @returns {string} A markup string of the table
     * @this {Object} ApplicationTable instance
    */
    _generateMarkup({type, modifiers, heads, rows, attributes}) {
        return `<table class="table--${type}">
                ${this._createThead(heads, modifiers, type)}
                ${this._createTbody(rows, modifiers, type, attributes)}
            </table>
        `;
    };

    updateTable(data) {
        this._data = {...this._data, ...data};
        const {rows, modifiers, type, attributes, rowsToDisplay} = this._data;
        const tl = gsap.timeline();


        // // Calculate table height
        // const tableHeight = this._setTableHeight(rows.length, type);
        // const tableContent = this._parentElement.querySelector(`.table__content--${type}`);

        const thead = this._parentElement.querySelector(`.thead--${type}`);
        const curTbody = this._parentElement.querySelector(`.tbody--${type}`);
        const newTbody = this._createTbody(rows, modifiers, type, attributes);

        tl.add(gsap.to(`tbody .tr--${type}`, 
            { 
                opacity:0, 
                y:3,
                duration: .2,
                // stagger: -.1,
                onComplete: () => {
                    curTbody.parentElement.removeChild(curTbody);
                } 
            })
        );

        // // If the table is going to shrink, wait till the rows have animated out
        // if(rows.length < rowsToDisplay) {
        //     tl.add(gsap.to(tableContent), { height: tableHeight });
        // }

        tl.add(() => {
            thead.insertAdjacentHTML('afterend', newTbody);
            gsap.fromTo(`tbody .tr--${type}`, 
                { opacity: 0, x:-20 },
                { 
                    opacity: 1,
                    x: 0,
                    stagger: .1 
                }
            );
        });
    }

    // updateRows(data) {
    //     this._data = {...this._data, ...data};
    //     const {heads, rows, modifiers, type, attributes} = this._data;

    //     // Create the new HtmlString
    //     const newTable = `<table class="table--${type}">
    //             ${this._createThead(heads, modifiers, type)}
    //             ${this._createTbody(rows, modifiers, type, attributes)}
    //         </table>
    //     `;

    //     // Convert the string to a fragment
    //     const newHTML = document.createRange().createContextualFragment(newTable);
    //     const curHTML = this._parentElement.querySelector(`.table--${type}`);

    //     // Check that the new table's html differs
    //     if(newHTML.isEqualNode(curHTML)) return;
    
    //     const curRows = Array.from(curHTML.querySelectorAll(`tbody .tr--${type}`));
    //     const newRows = Array.from(newHTML.querySelectorAll(`tbody .tr--${type}`));
    //     // console.log(curRows, newRows);

    //     console.log(curRows);

    //     // Potential flows:
    //     // - The arrays are the same length: Check if there's a text node, assign the new value
    //     // - Current array > New Array: Loop through the New array assigning values, hide the rest
    //     // - New Array > Current Array: Loop through the Current array assigning values, hide the rest

    //     // +ive: curRows > newRows
    //     // -ive: newRows > curRows
    //     const difference = curRows.length - newRows.length;
        
    //     if(difference > 0) {
    //         console.log(`${difference} more Current rows than New rows`);
    //     } else if(difference < 0) {
    //         console.log(`${difference} more New rows than Current rows`);
    //     } else {
    //         console.log('Same number of rows');
    //         curRows.forEach((curEl, index) => {
    //             const newEl = newRows[index];
    //             if(newEl.isEqualNode(curEl)) return;
    //             this.updateRow(curEl, newEl);
    //         });
    //     }
    // }

    // updateRow(el, newEl) {

    // }

    // Select the current table html, 
    // create a fragment with the innerHtml changed, insert back into the DOM

//     updateTable(data, modifier) {
//         const tl = gsap.timeline();

//         // Current elements onscreen
//         const curTable = document.querySelector('.table--applications');
//         const curTableRows = Array.from(curTable.querySelectorAll('tbody tr'));
//         const curTableParent = curTable.parentElement;

//         // Fragment to recreate the table 'offline'
//         const fragmentContainer = document.createDocumentFragment();
//         const table = document.createElement('table');

//         table.innerHTML = curTable.innerHTML;
//         const tableRows = Array.from(table.querySelectorAll('tbody tr'));


//         tl.add(gsap.to(curTableRows, { opacity: 0 }));
//         console.log(curTableRows, curTableParent)
//         // this._createTbody(rows, modifiers, type, attributes) 


//         // curTableRows.forEach((row, i) => {
//         //     console.log(curTableRows[i].isEqualNode(tableRows[i]));
//         //     // If different
//         //     if(!curTableRows[i].isEqualNode(tableRows[i])) {
//         //         // Delete the row


//         //     }
//         // });

// // table.forEach(el => console.log(el));

//         // fragmentContainer.appendChild(table);

//         // // Remove the existing table
//         // curTable.parentElement.removeChild(curTable);
//         // curTableParent.prepend(fragment);



//         // const element  = document.getElementById('ul'); // assuming ul exists
//         // const browsers = ['Firefox', 'Chrome', 'Opera',
//         //     'Safari', 'Internet Explorer'];

//         // browsers.forEach((browser) => {
//         //     const li = document.createElement('li');
//         //     li.textContent = browser;
//         //     fragment.appendChild(li);
//         // });

//         // element.appendChild(fragment);

//     }

    /**
     * Get the rows with a selected checkbox
     * @returns {string} A markup string of the table
     * @this {Object} ApplicationTable instance
    */
    getSelectedRows() {
        const checked = this._parentElement.querySelectorAll('input[type=checkbox]:checked');
        return Array.from(checked);
    }



    // replaceTextNodes(node, newText) {
    //     node.childNodes.forEach(function(el) {
    //       if (el.nodeType === 3) {  // If this is a text node, replace the text
    //         if (el.nodeValue.trim() !== "") { // Ignore this node it it an empty text node
    //           el.nodeValue = newText;
    //         }
    //       } else { // Else recurse on this node
    //         replaceTextNodes(el);
    //       }
    //     });
    // }
}

export default Table;
