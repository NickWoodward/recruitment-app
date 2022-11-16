import * as adminAPI from '../api/adminAPI';
import { createDeepCopy } from '../helpers';

let state = {
    applications: [],
    total: 0,
    searchOptions: {
        limit: 100,
        // orderField: 'id',
        // orderDirection: 'ASC',
        // searchTerm: ''
    },
    currentApplication: {},
    stats: {
        months: 4
    }
}

export const getTableData = (start, end) => {
    let rows = getApplications(start, end);
    let attributes = rows.map(({id, applicantId, jobId}) => {return { id, applicantId, jobId }});

    attributes = attributes.map(attribute => Object.entries(attribute))

    // Format the application content
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

         return [`${firstName} ${lastName}`, title, companyName, applicationDate]
    });

    return { rows, attributes }
}

export const getApplications = (start, end) => {
    let applications = createDeepCopy(state.applications);

    return applications.slice(start, end);
};

export const setApplications = (applications) => {
    state.applications = applications;
};

const setApplicationTotal = (total) => {
    state.total = total;
}

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
        // return Promise.resolve({ activeUsers: 5, dailyApplications: 12, monthlyApplications: 57 });
    } catch(err) {
        throw new Error('Cannot get Application Statistics');
    }
}
