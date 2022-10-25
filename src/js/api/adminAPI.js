import JRS from './jrs';
import axios from 'axios';

import timeout  from '../helpers';

// Add Promise.race with the timeout function

export let cancelTokenSource;

    /**
     * Make an axios request to the JRS API
     * @param {Object} SearchOptions: The search options to be used in the request
     * @param {number} Any specific record to return first
     * @returns {Object} Returns an object containing an array of companies and the total # of companies
    */
export const getCompanies = ({limit, index, orderField, orderDirection, searchTerm}, indexId) => {
    return JRS.get('/admin/companies', {
        params: {
            limit,
            index,
            orderDirection,
            orderField,
            indexId, 
            searchTerm
        },
        cancelToken: new axios.CancelToken(c => cancelTokenSource = c)

    });
};

    /**
     * Make an axios request to the JRS API
     * @param {Object} SearchOptions: The search options to be used in the request
     * @param {number} Any specific record to return first
     * @returns {Object} Returns an object containing an array of applications and the total # of applications
    */
    export const getApplications = ({limit, index, orderField, orderDirection, searchTerm}, indexId) => {
        return JRS.get('/admin/applications', {
            params: {
                limit,
                index,
                orderDirection,
                orderField,
                indexId, 
                searchTerm
            },
            cancelToken: new axios.CancelToken(c => cancelTokenSource = c)
    
        });
    };

    export const getApplicationStats = ({ limit }, { months }) => {
        return JRS.get('/admin/applicationstats', {
            params: {
                limit,
                months
            }
        });
    };
    
