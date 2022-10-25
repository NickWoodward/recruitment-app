import * as adminAPI from '../api/adminAPI';

const state = {
    companies: [],
    totalCompanies: 0,
    searchOptions: { 
        limit: 10, 
        index: 0, 
        orderField: 'id', 
        orderDirection: 'ASC', 
        searchTerm: '' 
    },
    currentCompany: {}

}

// Get companies array
export const getCompanies = () => {
    return state.companies;
};

// Get current company
export const getCompany = (id) => {
    return state.companies[id];
};

export const setCompanies = (companies) => {
    state.companies = companies;
};

// Set current company 
export const setCurrentCompany = (company) => {

};


export const fetchCompanies = async() => {
    try {
        const response = await adminAPI.getCompanies(state.searchOptions);
        // setCompanies
        setCompanies(response.companies);
        console.log(response)

        return response.companies

    } catch(err) {
        console.log(err)
    }

};






// TS MODELS:


// export type Company = {
//     id: number,
//     companyDate: string,
//     companyName: string,
//     addresses: Array<Address>,
//     contacts: Array<Contact>,
//     jobs: Array<Job>
// }
// type Address = {
//     id: number,
//     firstLine: string,
//     secondLine: string | undefined,
//     city: string,
//     county: string,
//     postcode: string
// }
// type Contact = {
//     contactId: number,
//     personId: number,
//     position: string,
//     firstName: string,
//     lastName: string,
//     email: string,
//     phone: string
// }
// type Job = {
//     jobId: number,
//     jobDate: string,
//     title: string,
//     featured: boolean,
//     jobType: string,
//     location: string,
//     position: string,
//     pqe: number,
//     wage: string

// }
// enum OrderField {
//     Id = 'id',
//     Name = 'name',
//     CreatedAt = 'createdAt',
// }
// enum OrderDirection {
//     ASC = 'ASC',
//     DESC = 'DESC'
// }

// type SearchOptions = {
//     limit: number, 
//     index: number, 
//     orderField: OrderField, 
//     orderDirection: OrderDirection, 
//     searchTerm: string
// }

// interface CompanyState {
//     companies: Array<Company>,
//     totalCompanies: number,
//     searchOptions: SearchOptions,
//     companyNames?: Array<string>,
//     currentCompany?: Company,
    
// }

// const state: CompanyState = {
//     companies: [],
//     totalCompanies: 0,
//     searchOptions: { 
//         limit: 10, 
//         index: 0, 
//         orderField: OrderField.Id, 
//         orderDirection: OrderDirection.ASC, 
//         searchTerm: '' 
//     },
//     // currentCompany

// }

// export type CompaniesResponse = { companies: Array<Company>, companyTotal: number };
