
// Views
import Header from '../views/layout/Header';
import AdminSidebar from "../views/admin/AdminSidebar";
import AdminDashboard from '../views/admin/AdminDashboard';
import Stats from '../views/admin/Stats';

// Models
import * as ApplicationModel from '../models/applicationModel';

import '../../sass/admin.scss';



const init = async () => {
    Header.render({admin: true, page: 'admin'});

    try {

        // Get initial application data
        const results = await Promise.all([
            ApplicationModel.fetchApplications(),
            ApplicationModel.fetchApplicationStats()
        ]);
        const { rows } = results[0];
        // const { activeUsers, dailyApplications, monthlyApplications } = results[1];
        const { thisWeek, lastWeek, appsPerMonth } = results[1];

        console.log(thisWeek, lastWeek, appsPerMonth);

        const testRows2 = [
            [1, 'Jack Sparrow', 'Junior Legal Counsel', 'Dell', '22/03/21'],
            [2, 'Kelly Slater', 'Legal Counsel', 'Anker', '02/10/22'],
            [3, 'Emily Burrows', 'Legal Assistant', 'Anker', '11/05/22'],
            [4, 'Jeff Holmes', 'Legal Assistant', 'London Fields', '11/05/22']

        ]
        const testData = {
            heads: ['Id', 'Name', 'Position', 'Company', 'Added'],
            rows: testRows2,
            type: 'applications',
            modifiers: ['checkbox', 'id', 'name', 'position', 'company', 'added']
        }

        // Render the application dashboard
        AdminDashboard.render({ 
            page:'applications', 
            stats: { activeUsers: 2, thisWeek, appsPerMonth }, 
            applicationsData: testData 
        });

        // Insert the graphs into the rendered Dashboard
        Stats.renderChart('.graph__canvas');
    
        addViewHandlers();
    } catch(err) {
        console.log(err);
    }

}
init();

/**
 * Initialise the components' event listeners (pub/subscriber pattern)
 */
function addViewHandlers() {
    // Header.addNavigationHandler(handleNavigationEvent);
    AdminSidebar.addSidebarHandler(displayDashboard);
}

/**
 * Initialises and displays the chosen dashboard
 * @param {string} sectionName: The admin section to be displayed
 * @param {number} indexId: The id of any record to be highlighted in the main table
 * @returns {undefined}
 * @this {Object} The AdminSidebar
*/



/**
 * Initialises and displays the chosen dashboard
 * @param {string} sectionName: The admin section to be displayed
 * @param {number} indexId: The id of any record to be highlighted in the main table
 * @returns {undefined}
 * @this {Object} The AdminSidebar
*/
function displayDashboard(e, sectionName, indexId) {

    const optionSelected = AdminSidebar.getSelectedOption(e);

    // This renders the initial template for a given admin page that content animates in and out of
    // AdminDashboard.createTemplate();

    //// These could probably be the functions of the AdminModel?
    // PaginationHelper.getTotalPages()
    // PaginationHelper.getCurrentPage();
    // PaginationHelper.initPagination();

    // AdminDashboard.initDashboard(index, limit, jobs); //// This is basically displayAdmin


    // // If a sidebar item hasn't been clicked, return
    // if(!document.querySelector()) return;


    // const applications = e.target.closest('.sidebar__item--applications');
    // const jobs = e.target.closest('.sidebar__item--jobs');
    // const companies = e.target.closest('.sidebar__item--companies');
    // const users = e.target.closest('.sidebar__item--users');
    // const settings = e.target.closest('.sidebar__item--settings');

    // // Get the active item
    // const currentItem = [applications, jobs, companies, users, settings].filter(item => {
    //     return item !== null;
    // })[0];


    // const itemName = currentItem.classList[1].substring(currentItem.classList[1].indexOf('--') + 2);
    // this.displayAdminContent(itemName);
    // adminView.changeActiveMenuItem(e.target.closest(elementStrings.adminMenuItem)); 

    
}
