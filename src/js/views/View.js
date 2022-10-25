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
        // console.log(this._data, 'IN VIEW', this);
        const markup = this._generateMarkup();

        // console.log(this._data);
        if(this._parentElement && render) this._parentElement.insertAdjacentHTML('afterbegin', markup);
        else if(!render) return markup;
        else throw new Error(`Error rendering View`);
    }


    // setData(data) {
    //     this._data = data;
    // }

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