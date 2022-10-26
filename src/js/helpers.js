
/**
 * Function to use in a Promise.race() call with an axios request. 
 * Usage: await Promise.race([requestFunction, timeout(0.5)])
 * @param {number} sec: The number of seconds before the promise is rejected
 * @param {boolean} [render=true] render if true, return a markup string if false
 * @returns {Promise} A promise that is rejected after `sec` seconds
*/
export const timeout = (sec) => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request took too long (${sec} seconds)`))
        }, sec * 1000)
    });
};

export const createDeepCopy = (obj) => {
    const CloneSymbol = Symbol('clone');
    Date.prototype[CloneSymbol] = d => new Date(d.getTime());

    const m = Object.entries(obj).map(([k, v]) => {
        if (v === null) return [k, v];
        if (typeof v === 'object') {           
            const fn = v.constructor
            .prototype[CloneSymbol];
            return [k, fn ? fn(v) : createDeepCopy(v)]
        } else return [k, v];
    });

    return (
        Array.isArray(obj) ? m.reduce((a, [i, v]) => {
            a[i] = v;
            return a;
        }, []) : Object.fromEntries(m)
    );
};


export const createChevron = (modifier, strokeWidth = '1.5rem') => {
    return `
        <div class="chevron-btn chevron-btn--${modifier}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
      
        </div>
    `;
};

export const createProfileItem = ( { icon, label, value = 'Unknown', modifier, page, field } ) => {
    return (
        `<div class="profile__item profile__item--${modifier} profile__item--${page} ${field? `profile__item--${field}`:''}">
            ${icon? `<div class="profile__icon profile__icon--${field}">${icon}</div>`:''}
            ${label? `<div class="profile__label profile__label--${modifier} ${field? `profile__label--${field}`:''}">${label}:</div>`:'' }
            <div class="profile__field ${field? `profile__field--${field}`:''}">${value}</div>
        </div>`
    );
};

export const createEmailIcon = (solid, strokeWidth = 1.5) => {
    return (
        `${solid? 
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>`:
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${strokeWidth} stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>` 
        }`  
    );
}

export const createPhoneIcon = (solid, strokeWidth = 1.5) => {
    return (
        `${solid?
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
            </svg>
          `:
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${strokeWidth} stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>`
        }`
    );
}

export const createCvDownloadIcon = (solid, strokeWidth = 1.5) => {
    return (
        `${solid?
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
            </svg>`
            :
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${strokeWidth} stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>`
        }`
    );
}

export const createCvUploadIcon = (solid, strokeWidth = 1.5) => {
    return (
        `${solid?
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z" clip-rule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
            </svg>`
            :
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${strokeWidth} stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>`
        }`
    );
}

export const createContactIcon = (solid, strokeWidth = 1.5) => {
    return (
        `${solid?
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>`
            :
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${strokeWidth} stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>`
        }`
    );
};

export const createPositionIcon = (solid, strokeWidth = 1.5) => {
    return (
        `${solid?
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${strokeWidth} stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>`:
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${strokeWidth} stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>`
        }`
    );
};

export const createDocxIcon = () => {
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48" style=" fill:#000000;">
            <linearGradient id="Q7XamDf1hnh~bz~vAO7C6a_pGHcje298xSl_gr1" x1="28" x2="28" y1="14.966" y2="6.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#42a3f2"></stop><stop offset="1" stop-color="#42a4eb"></stop></linearGradient>
            <path fill="url(#Q7XamDf1hnh~bz~vAO7C6a_pGHcje298xSl_gr1)" d="M42,6H14c-1.105,0-2,0.895-2,2v7.003h32V8C44,6.895,43.105,6,42,6z"></path><linearGradient id="Q7XamDf1hnh~bz~vAO7C6b_pGHcje298xSl_gr2" x1="28" x2="28" y1="42" y2="33.054" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#11408a"></stop><stop offset="1" stop-color="#103f8f"></stop></linearGradient>
            <path fill="url(#Q7XamDf1hnh~bz~vAO7C6b_pGHcje298xSl_gr2)" d="M12,33.054V40c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2v-6.946H12z"></path><linearGradient id="Q7XamDf1hnh~bz~vAO7C6c_pGHcje298xSl_gr3" x1="28" x2="28" y1="-15.46" y2="-15.521" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3079d6"></stop><stop offset="1" stop-color="#297cd2"></stop></linearGradient>
            <path fill="url(#Q7XamDf1hnh~bz~vAO7C6c_pGHcje298xSl_gr3)" d="M12,15.003h32v9.002H12V15.003z"></path><linearGradient id="Q7XamDf1hnh~bz~vAO7C6d_pGHcje298xSl_gr4" x1="12" x2="44" y1="28.53" y2="28.53" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1d59b3"></stop><stop offset="1" stop-color="#195bbc"></stop></linearGradient>
            <path fill="url(#Q7XamDf1hnh~bz~vAO7C6d_pGHcje298xSl_gr4)" d="M12,24.005h32v9.05H12V24.005z"></path>
            <path d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z" opacity=".05"></path>
            <path d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z" opacity=".07"></path><path d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z" opacity=".09"></path><linearGradient id="Q7XamDf1hnh~bz~vAO7C6e_pGHcje298xSl_gr5" x1="4.744" x2="23.494" y1="14.744" y2="33.493" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#256ac2"></stop><stop offset="1" stop-color="#1247ad"></stop></linearGradient>
            <path fill="url(#Q7XamDf1hnh~bz~vAO7C6e_pGHcje298xSl_gr5)" d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"></path>
            <path fill="#fff" d="M18.403,19l-1.546,7.264L15.144,19h-2.187l-1.767,7.489L9.597,19H7.641l2.344,10h2.352l1.713-7.689 L15.764,29h2.251l2.344-10H18.403z"></path>
        </svg>
    `);
}

export const createSearchBtn = (type) => {
    return `
        <div class="btn-wrapper btn-wrapper--${type}">            
            <div class="search search--${type} search-btn--${type} btn">
                <input type="text" class="search__input search__input--${type}" />
                <div class="search__icon--${type}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </div>
            </div>
        </div>
    `;
};