import * as adminAPI from '../api/adminAPI';
import { createDeepCopy } from '../helpers';

let state = {
    applications: [],
    total: 0,
    searchOptions: {
        limit: 100,
        index: 0,
        orderField: 'title',
        orderDirection: 'ASC',
        // searchTerm: ''
    },
    currentApplication: {},
    stats: {
        months: 4
    }
}

export const setPagination = (index, limit) => {
    state.searchOptions.index = index;
    state.searchOptions.limit = limit;
}
export const setOrderField = (field) => {
    if(!field) throw new Error('Cannot set orderField');

    switch(field) {
        case 'added': {
            toggleOrderDirection('createdAt');
            state.searchOptions.orderField = 'createdAt'; 
            break;
        }
        case 'position': { 
            toggleOrderDirection('title');
            state.searchOptions.orderField = 'title'; 
            break;
        }
        default: {
            toggleOrderDirection(field);
            state.searchOptions.orderField = field;
        }
    }
}
export const toggleOrderDirection = (field) => {
    // If it's already the order field, order direction DESC (arrow up)
    if(state.searchOptions.orderField === field) state.searchOptions.orderDirection = 'DESC';
    else state.searchOptions.orderDirection = 'ASC';
}

export const getTableData = () => {
    let rows = getApplications();
    let attributes = rows.map(({id, applicantId, jobId}) => {return { id, applicantId, jobId }});

    attributes = attributes.map(attribute => Object.entries(attribute));

    rows = formatRows(rows);

    return { rows, attributes }
}

const formatRows = (rows) => {
    // Format the application content
    return rows.map(row => {
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

         return [`${firstName} ${lastName}`, title, companyName, applicationDate]
    });
}

export const getApplications = () => {
    return createDeepCopy(state.applications);
}

export const setApplications = (applications) => {
    state.applications = applications;
};

const setApplicationTotal = (total) => {
    state.total = total;
};
export const getApplicationTotal = () => {
    return state.total;
};

export const fetchApplications = async() => {
    try {
        const response = await adminAPI.getApplications(state.searchOptions);
        const { rows, count } = response.data.applications;
        setApplications(rows);
        setApplicationTotal(count);

        return { rows, count };

    } catch(err) {
        console.log(err);
        throw new Error('Cannot Fetch Applications');
    }
};

export const fetchApplicationStats = async() => {
    try {
        const { data } = await adminAPI.getApplicationStats(state.searchOptions, state.stats);
        return data;
    } catch(err) {
        throw new Error('Cannot get Application Statistics');
    }
}
