
// Views
import Header from '../views/layout/Header';
import AdminSidebar from "../views/admin/AdminSidebar";
import AdminDashboard from '../views/admin/AdminDashboard';
import ApplicationsTable from '../views/admin/ApplicationsTable';
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
        // Stats
        const { thisWeek, lastWeek, appsPerMonth } = results[1];

        // Get the number of rows the application table is set to display
        const numRows = ApplicationsTable.getNumRows();

        // Rows are retrieved from the model separately to the fetch call
        let rows = ApplicationModel.getApplications(numRows);


        // This should be in the model
        rows = rows.map(row => {
            const { 
                id,
                applicant: { 
                    person: {
                        firstName,
                        lastName
                    }
                 },
                 job: {
                    title,
                    company: {
                        name: companyName
                    }
                 },
                 applicationDate
             } = row;

             return [id, `${firstName} ${lastName}`, title, companyName, applicationDate]
        });
        const testData = {
            heads: ['Id', 'Name', 'Position', 'Company', 'Added'],
            rows: rows,
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
