// import '../../assets/icons/loader.svg';

export default class View {
    _data;

    /**
     * Render the data to the DOM
     * @param {Object | Object[]} data: The data to be rendered
     * @param {boolean} [render=true] render if true, return a markup string if false
     * @returns {undefined | string} A markup string is returned if render is false
     * @this {Object} View instance
    */
     render(data, render = true) {
        // Data passed to render spread with current instance data (Former overwrites)
        this._data = {...this._data, ...data};
        const markup = this._generateMarkup();

        if(this._parentElement && render) this._parentElement.insertAdjacentHTML('afterbegin', markup);
        else if(!render) return markup;
        else throw new Error(`Error rendering View`);
    }

    /**
     * Compare the new html document fragment to the existing html and update
     * NB: Not to be used if the structure or number of contained elements changes
     * @param {Object | Object[]} data: The data to be rendered
     * @this {Object} View instance
    */
    update(data) {
        this._data = {...this._data, ...data};
        const newMarkup = this._generateMarkup();

        // Convert markup string to a DOM element that isn't on the page
        const newDOM = document.createRange().createContextualFragment(newMarkup).firstElementChild;
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, index) => {
            const curEl = curElements[index];
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue && newEl.firstChild.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }
        });
    }

    clear() {
        this._parentElement.innerHTML = ''
    }


    // @TODO: Add renderError/renderMessage/renderLoader functions

    // /**
    //  * Return a 
    //  * @param {boolean} [absolute=true] Add a class for absolute positioning if true
    //  * @param {boolean} [render=false] render if true, return a markup string if false
    //  * @returns {undefined | string} A markup string is returned if render is false
    //  * @this {Object} View instance
    // */
    // createLoader(absolute=true, render=false) {
    //     const markup = `
    //         <div class="loader ${absolute? 'loader--absolute':''}">
    //             <svg class="loader-svg"><use xlink:href="svg/spritesheet.svg#loader"></svg>
    //         </div>
    //     `;

    //     if(render) this._parentElement.insertAdjacentHTML('afterbegin', markup);
    //     else return markup;
    // }
}