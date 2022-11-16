
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
        let tableData = ApplicationModel.getTableData(0, numRows);
        tableData.selectData = [
            {title: 'a', id: 1}, {title: 'b', id: 2}, {title: 'c', id:3},
            {title: 'a', id: 1}, {title: 'b', id: 2}, {title: 'c', id:3},
            {title: 'a', id: 1}, {title: 'b', id: 2}, {title: 'c', id:3}
        ]

        // Render the application dashboard
        AdminDashboard.render({ 
            page:'applications', 
            stats: { activeUsers: 2, thisWeek, appsPerMonth }, 
            applicationsData: tableData 
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
const addViewHandlers = () => {
    // Header.addNavigationHandler(handleNavigationEvent);
    AdminSidebar.addSidebarHandler(displayDashboard);
    
    ApplicationsTable.init();
    ApplicationsTable.addClickHandler(function(e) {
        const targets = ApplicationsTable.getTableTargets(e);
        if(targets['addBtn']) console.log('Add Btn');
        if(targets['editBtn']) {
            const checked = ApplicationsTable.getSelectedRows();

            if(checked.length < 1) {console.log('Nothing selected'); return}
            if(checked.length > 1){ console.log('Too many selected'); return}

            // Else display edit modal over summary
        }
        if(targets['deleteBtn']) {
            console.log('Delete Btn')
            // If no checkbox: edit the currently active row

            // If > 1 checkbox: Display alert, "Only 1 checkbox should be selected"

            // Else display edit modal over summary
        };
        if(targets['backBtn']) movePage('backwards');
        if(targets['pageBtn']) console.log('Page');
        if(targets['forwardBtn']) movePage('forwards');
        if(targets['editRowtargets']) console.log('Edit Btn');
        if(targets['row']) console.log('Row');
        if(targets['checkboxAll']) {
            const {checkboxAll, checkboxes} = ApplicationsTable.getCheckboxes();
            checkboxes.forEach(checkbox => {
                checkbox.checked = !checkboxAll.checked;
                checkbox.click();
            });
        }
        if(targets['thead']) console.log('Thead');
   
        if(targets['searchBtn']) console.log('search');
    });
}

const movePage = (direction) => {
    // Calculate the total pages
    const applicationTotal = ApplicationModel.getApplications().length;
    const numRows = ApplicationsTable.getNumRows();
    let curIndex = ApplicationsTable.getIndex();

    // Set the table view's page and index
    if(direction === 'forwards' && curIndex + numRows < applicationTotal) {
        ApplicationsTable.setIndex(curIndex += ApplicationsTable.getNumRows());
        ApplicationsTable.setPage('forwards');
    } else if(direction === 'backwards' && curIndex - numRows >= 0) {
        ApplicationsTable.setIndex(curIndex -= ApplicationsTable.getNumRows());
        ApplicationsTable.setPage('backwards');
    } else if(typeof direction === 'number' && direction > 0 && direction < applicationTotal) {
        console.log('Moving to page', direction);
    } else {
        return;
    }

    // Get the model data
    let tableData = ApplicationModel.getTableData(curIndex, curIndex + ApplicationsTable.getNumRows());

    // Update the View
    ApplicationsTable.updateTable(tableData, 'applications');
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
