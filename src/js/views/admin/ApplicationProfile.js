import View from '../View';
import { 
    createChevron, 
    createProfileItem, 
    createEmailIcon, 
    createPhoneIcon, 
    createContactIcon,
    createPositionIcon, 
    createCvDownloadIcon,
    createCvUploadIcon,
} from '../../helpers';

class ApplicationProfile extends View {

    _generateMarkup() {

        const markup = /*html*/`

            <div class="application">
                <div class="admin__heading">
                    Profile
                    ${createChevron('applications')}
                </div>
                <div class="user">
                    <div class="user__avatar">
                        <div class="user__image">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="user__upload">
                            <div class="user__upload-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <div class="user__upload-text">
                                <span>Click to upload a file,</span> or drag and drop
                            </div>
                        </div>
                    </div>
                    <div class="user__details">
                        ${createProfileItem({ value: 'Nick Woodward', modifier: 'user', page: 'applications', field: 'name' })}
                        ${createProfileItem({ value: 'Legal Counsel', modifier: 'user', page: 'applications', field: 'prev-job' })}

                        ${createProfileItem({ icon: createEmailIcon(), label: 'Email', value: 'nick.woodward@hotmail.co.uk', modifier: 'user', page: 'applications', field: 'email' })}
                        ${createProfileItem({ icon: createPhoneIcon(), label: 'Phone', value: '07353 829340', modifier: 'user', page: 'applications', field: 'email' })}
                        ${createProfileItem({ icon: createCvDownloadIcon(false, 1.2), label: 'Cv', value: 'nickwoodward.doc', modifier: 'user', page: 'applications', field: 'cv' })}

                        <div class="cv__upload cv__upload--applications">
                            <div class="cv__upload-text">
                                <span>Click to upload a CV,</span> or drag and drop
                            </div>
                            <div class="cv__upload-icon">
                                ${createCvUploadIcon(true)}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="position">
                    <div class="position__avatar">
                        <div class="position__image">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                            </svg>
                        </div>
                        <div class="position__upload">
                            <div class="position__upload-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <div class="position__upload-text">
                                <span>Click to upload a file,</span> or drag and drop
                            </div>
                        </div>
                    </div>
                    <div class="position__details">
                        ${createProfileItem({ value: 'Legal Counsel', modifier: 'position', page: 'applications', field: 'name' })}
                        ${createProfileItem({ value: 'London Fields', modifier: 'position', page: 'applications', field: 'prev-job' })}

                        ${createProfileItem({ icon: createContactIcon(), label: 'Contact', value: 'Sally Jenkins', modifier: 'position', page: 'applications', field: 'contact' })}
                        ${createProfileItem({ icon: createPositionIcon(), label: 'Position', value: 'Head of HR', modifier: 'position', page: 'applications', field: 'contact-position' })}
                        ${createProfileItem({ icon: createPhoneIcon(), label: 'Phone', value: '07353 829340', modifier: 'position', page: 'applications', field: 'contact-phone' })}
                        ${createProfileItem({ icon: createEmailIcon(), label: 'Email', value: 'nick.woodward@hotmail.co.uk', modifier: 'position', page: 'applications', field: 'contact-email' })}

                    </div>
                </div>
            </div>
        `;

        return markup;
    }
}

export default new ApplicationProfile();