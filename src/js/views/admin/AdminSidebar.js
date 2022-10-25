import View from '../View';

class AdminSidebar extends View {
    _parentElement = document.querySelector('.sidebar__menu');


    /**
     * Returns a string representation of the select sidebar item
     * @param {event} e: The pointer event from clicking the menu
     * @returns {string} The item selected
     * @this {Object} The AdminSidebar
    */
    getSelectedOption(e) {
        const applications = e.target.closest(`.sidebar__item--applications`);
        const jobs = e.target.closest(`.sidebar__item--jobs`);
        const companies = e.target.closest(`.sidebar__item--companies`);
        const users = e.target.closest(`.sidebar__item--users`);

        // Get the active item
        const currentItem = applications || jobs || companies || users;

        if(!currentItem) return;

        let itemString;
        switch(currentItem) {
            case applications:  { itemString = 'applications'; break }
            case jobs:          { itemString = 'jobs'; break }
            case companies:     { itemString = 'companies'; break }
            case users:         { itemString = 'users'; break }
        }
        return itemString;
    }

    // EVENT LISTENERS
    addSidebarHandler(handler) {
        this._parentElement.addEventListener('click', (e) => handler(e));
    }
}

export default new AdminSidebar();