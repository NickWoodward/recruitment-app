import View from '../View';

class Table extends View {
    
    _createThead(heads, modifiers, type) {
        return `<thead class="thead--${type}">${this._createRow(heads, modifiers, type, true)}</thead>`;  
    }
    
    _createTbody(rows, modifiers, type) {
        return (`
            <tbody class="tbody--${type}">
                ${rows.map(row => {
                    return this._createRow(row, modifiers, type)}).join('')
                }
            </tbody>
        `);
    }

    _createRow(row, modifiers, type, header = false) {
        let markup = '';
        let skipRow = this._data.tableControls? 1:0;
        if(this._data.tableControls){
            row.unshift(this._createTableCheckbox(type));
        }

        for(let x = 0; x < row.length; x++) {
            // If the child table has row controls, index 0 = checkbox, index 1 = index id
            // If the child table has displayIndex = false, skip the first/second column
            if(x === skipRow && !this._data.displayIndex) continue;
            markup += this._createCell(row[x], modifiers[x], type, header);
        }
        // Edit Column
        markup += this._createCell(header? '':'Edit', 'edit', type, header);

        return `<tr class="tr--${type}">${markup}</tr>`;
    }

    _createCell(data, modifier, type, header) {
        return (
            `${header? 
                `<th class="th--${modifier} th--${type}">`:
                `<td class="td--${modifier} td--${type}">`}
                    ${data}
            ${header? 
                '</th>':
                '</td>'
            }`
        ); 
    }

    _createTableCheckbox(type, header) {
        return `<input type="checkbox" class="" name="checkbox--${header? 'header':''}" />`;
    }

    _generateMarkup({type, modifiers, heads, rows}) {
        const headsCopy = [...heads];
        const rowsCopy = [...rows];
        const temp =`<table class="table--${type}">
                ${this._createThead(headsCopy, modifiers, type)}
                ${this._createTbody(rowsCopy, modifiers, type)}
            </table>
        `;
        return temp
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
