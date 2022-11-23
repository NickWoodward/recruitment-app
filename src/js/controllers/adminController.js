
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

    // Get the number of rows the application table is set to display
    const numRows = ApplicationsTable.getNumRows();
    ApplicationModel.setPagination(0, numRows);

    try {
        // Get initial application data
        const results = await Promise.all([
            ApplicationModel.fetchApplications(),
            ApplicationModel.fetchApplicationStats()
        ]);
        // Stats
        const { thisWeek, lastWeek, appsPerMonth } = results[1];


        let tableData = ApplicationModel.getTableData();
        const totalPages = Math.ceil(ApplicationModel.getApplicationTotal()/ApplicationsTable.getNumRows());
        tableData.selectData = [];
        // for(let x = 1; x <= totalPages; x++) {
        //     tableData.selectData.push({ title: `${x}`, id: x });
        // }
        tableData.selectData = [
            {title: '1', id: 1}, {title: '2', id: 2}, {title: '3', id:3},
            {title: '4', id: 4}, {title: '5', id: 5}, {title: '6', id:6},
            {title: '7', id: 7}, {title: '8', id: 8}, {title: '9', id:9}
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
    ApplicationsTable.addClickHandler(async function(e) {
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
        if(targets['pageBtn']) movePage(parseInt(targets['pageBtn'].dataset.value));
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
        if(targets['thead']) {
            // Get all the table's possible heads
            const headStrings = ApplicationsTable.getTableHeads();

            // Pick the head that matches the target's classlist
            const headString = headStrings.filter(str => {
                return Array.from(targets['thead'].classList)[0].includes(str);
            })[0];

            // Change the model's orderField
            ApplicationModel.setOrderField(headString);
            // // Change the model's orderDirection
            // ApplicationModel.toggleOrderDirection();
            
            // Change the table's arrow direction
            ApplicationsTable.setArrowDirection(targets['thead']);

            // Update the table
            await ApplicationModel.fetchApplications();
            const tableData = ApplicationModel.getTableData();
        
            // Update the View
            ApplicationsTable.updateTable(tableData, 'applications');
        }
   
        if(targets['searchBtn']) console.log('search');
    });
}


/**
 * Sets the Table page and index, the pagination in the model, and updates the table data
 * @param {string || number} direction: The string 'forward'||'backward' to move +/-1, a number to move to that specific page
 * @returns {undefined}
*/
const movePage = async(value) => {
    const applicationTotal = ApplicationModel.getApplicationTotal();
    const numRows = ApplicationsTable.getNumRows();
    let curIndex = ApplicationsTable.getIndex();

    const validForwards = value === 'forwards' && curIndex + numRows < applicationTotal;
    const validBackwards = value === 'backwards' && curIndex - numRows >= 0;
    const inRange = typeof value === 'number' && value >= 0 || value < applicationTotal;

    if(!validForwards && !validBackwards && !inRange) return;
    
    const customSelect = document.querySelector('.custom-select--application');

    // Set the table view's page and index
    if(validForwards) {
        ApplicationsTable.setIndex(curIndex += numRows);
        ApplicationsTable.setPage('forwards');
    } 
    if(validBackwards) {
        ApplicationsTable.setIndex(curIndex -= numRows);
        ApplicationsTable.setPage('backwards');
    } 
    if(inRange) {
        curIndex = (value -1) * numRows;
        ApplicationsTable.setIndex(curIndex);
        ApplicationsTable.setPage(value);
    } 

    // Dispatch custom event for the select element
    const navigationEvent = new CustomEvent('applicationsTableChange', { detail: { page: ApplicationsTable.getPage() } });
    customSelect.dispatchEvent(navigationEvent, {bubbles: true});

    ApplicationModel.setPagination(curIndex, numRows);
    await ApplicationModel.fetchApplications();
    const tableData = ApplicationModel.getTableData();

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
