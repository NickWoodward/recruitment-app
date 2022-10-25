
// VIEWS
import Header from '../views/layout/Header';
import Hero from '../views/index/Hero';

// MODELS
import * as companyModel from '../models/companyModel';

// CSS
import '../../sass/index.scss';

const testGreeting = 'hello';

const initHeader = () => {
    Header.render({admin: true})
}

const handleNavigationEvent = (greeting) => {
    console.log(greeting);
}

const initEventHandlers = () => {
    Header.addNavigationHandler(() => handleNavigationEvent(testGreeting));
    companyModel.fetchCompanies();
}

initEventHandlers();