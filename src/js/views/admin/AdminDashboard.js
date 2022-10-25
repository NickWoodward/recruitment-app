import View from '../View';
import Stats from './Stats';
import ApplicationsTable from './ApplicationsTable';
import ApplicationProfile from './ApplicationProfile';


class AdminDashboard extends View {
    _parentElement = document.querySelector('.dashboard');

    _generateMarkup() {
        // Initialise nested components
        // const statsMarkup = Stats.render(this._data.stats, false);
        console.log(this._data);
        const statsMarkup = Stats.render({
            numOfMonths: this._numOfMonths,
            activeUsers: this._data.activeUsers, 
            thisWeek: this._data.thisWeek,
            monthlyApplications: 39
        }, false);

        const applicationsTableMarkup = ApplicationsTable.render(this._data.applicationsData, false);
        const applicationProfileMarkup = ApplicationProfile.render({}, false);

        return /*html*/`
            <div class="dashboard__content dashboard__content--${this._data.page}">
                ${statsMarkup}
                ${applicationsTableMarkup}
                ${applicationProfileMarkup}
            </div>
        `;
    }

}



export default new AdminDashboard();