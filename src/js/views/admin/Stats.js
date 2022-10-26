import View from '../View';
import { createChevron } from '../../helpers';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


class Stats extends View {
    _numOfMonths = 12;

    _generateMarkup() {
        return /*html*/`
            <div class="stats">
                <div class="stats__heading admin__heading">
                    Stats
                    ${createChevron('applications')}
                </div>
                <div class="stats__item stats__item--active-users">
                    <div class="stats__detail">
                        <div class="stats__title">Active Users</div>
                        <div class="stats__content">
                            <div class="stats__text">${this._data.activeUsers}</div>
                            <div class="stats__percentage success">+10%</div>
                        </div>
                    </div>
                    <div class="stats__icon stats__icon--users">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M349.2 334.8c11.3 3.9-11.2-3.9 0 0z"/><path d="M349.2 334.8c-13.5-4.7-28.1-5-41.6-9.7-4.1-1.4-12.2-3.1-13.9-7.8-1.6-4.6-1.6-10-1.9-14.8-.2-3.8-.3-7.6-.3-11.4 0-2.5 6.4-7.8 7.8-10.1 5.4-9 5.9-21.1 6.9-31.3 8.7 2.4 9.8-13.7 11.3-18.6 1.1-3.4 7.8-26.8-2.6-23.6 2.5-4.4 3.5-9.8 4.2-14.7 2-12.8 2.8-26.8-1.1-39.3-8.1-26-33-40.6-59.3-41.4-26.7-.9-53.5 11.9-63.5 37.8-4.8 12.6-4.4 26.3-2.8 39.5.7 6 1.7 12.7 4.7 18.1-9.7-2.9-4.5 17.7-3.4 21.3 1.6 5.1 3 23.4 12.1 20.9.8 8.1 1.7 16.4 3.9 24.3 1.5 5.3 4.6 9.8 8.2 13.9 1.8 2 2.7 2.2 2.6 4.8-.1 7.8.1 16.2-1.9 23.8-2 7.6-18.7 10.8-25.4 12.2-18 3.7-34.6 5.4-49.6 16.6-17.5 12.9-26.6 33-26.6 54.7h278c0-29.5-17.8-55.5-45.8-65.2z"/><path d="M143.3 322.5l1.6-.8c-.3.1-.6.3-.8.4-.3.1-.5.2-.8.4z"/><path d="M143.3 322.5c-3.4 1.7-7.5 3.8.8-.4l.8-.4c6.8-3.2 14.1-4 21.4-4.7 2.8-.3 4.1-2.2 2-4.9-4-5.1-17.8-6.1-23.6-8.4-3.6-1.4-4.6-2.7-4.9-6.7-.1-1.8-1.1-9.8.3-11.1 1-1 7.3-.6 8.7-.8 5.7-.7 11.5-1.9 16.9-4 2.3-.9 4.5-2 6.5-3.4 2.4-1.8-1.8-6.2-2.9-8.6-3.4-7.5-4.9-15.7-5.4-23.9-1-16.1 1.5-32.3-1.5-48.3-4.5-24.5-23.4-36.8-47.5-36.8-14.9 0-29.6 5.1-37.9 18.1-9.2 14.3-8.7 32.1-8.2 48.4.3 9.3.7 18.7-.6 28-.6 4-1.5 7.9-2.9 11.7-1.1 2.9-6.7 10.1-4.5 11.6 8.3 5.9 22.3 7.9 32.3 7.1.3 4.9 1.2 11.2-.6 15.8-2.8 7.2-23.7 9.1-30 11.2C45 317.8 32 332 32 352h79.5c1.3 0 6.3-9.3 7.7-10.8 6.8-7.5 15.1-14 24.1-18.7zm306-10.6c-8.1-2.6-23.7-3.4-29.5-10.4-2.9-3.5-1.3-12.4-1-16.6 4.4.4 9.2-.3 13.7-.9 4.1-.6 8.1-1.4 12-2.8 1.8-.7 3.6-1.4 5.3-2.4 3.9-2.3 2.1-2.7.1-6.1-10.9-18.3-6-41.5-6.5-61.6-.4-16.7-4.8-35-20-44.4-13.7-8.5-34-8.8-48.7-2.8-42.4 17-17.4 73.2-31.9 105.4-2.5 5.4-6.1 7.3.2 10.5 3.5 1.8 7.3 3 11.1 3.9 5.8 1.4 11.8 2.2 17.8 2.4 1 0 .3 12.6 0 13.9-1.1 4.9-11.8 6.3-15.8 7.4-4.1 1.1-10.9 1.4-12.9 5.7-3 6.4 9.9 4.8 13.1 5.4 10.3 1.9 19.4 7.6 27.4 14.1 6 4.9 14.1 11.5 16.3 19.5h80.2c-.2-20.1-13.3-34.4-30.9-40.2z"/></svg>
                    </div>
                   
                </div>
                <div class="stats__item stats__item--24hrs">
                    <div class="stats__detail">
                        <div class="stats__title">Daily Applications</div>
                        <div class="stats__content">
                            <div class="stats__text">${this._data.thisWeek}</div>
                            <div class="stats__percentage error">-6%</div>
                        </div>
                    </div>
                    <div class="stats__icon stats__icon--daily">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 40c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zM80 264c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm27.6 86.9c-3.8 2.2-8.7.9-10.9-2.9-2.2-3.8-.9-8.7 2.9-10.9 3.8-2.2 8.7-.9 10.9 2.9 2.2 3.8.9 8.7-2.9 10.9zm2.9-178.9c-2.2 3.8-7.1 5.1-10.9 2.9-3.8-2.2-5.1-7.1-2.9-10.9s7.1-5.1 10.9-2.9c3.8 2.2 5.1 7.1 2.9 10.9zM164 96.7c3.8-2.2 8.7-.9 10.9 2.9 2.2 3.8.9 8.7-2.9 10.9-3.8 2.2-8.7.9-10.9-2.9-2.2-3.8-.9-8.7 2.9-10.9zm10.9 315.7c-2.2 3.8-7.1 5.1-10.9 2.9-3.8-2.2-5.1-7.1-2.9-10.9 2.2-3.8 7.1-5.1 10.9-2.9s5.1 7.1 2.9 10.9zM256 440c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm8-170.1V392c0 4.4-3.6 8-8 8s-8-3.6-8-8V269.8c-2.4-1.4-4.4-3.3-5.9-5.8-3-5.2-2.7-11.5.2-16.3l-37.6-62.9c-2.3-3.8-1-8.7 2.7-11 3.8-2.3 8.7-1 11 2.7l38 63.4c5.4.1 10.6 3 13.4 8 4.5 7.8 1.9 17.5-5.8 22zm84 145.4c-3.8 2.2-8.7.9-10.9-2.9-2.2-3.8-.9-8.7 2.9-10.9 3.8-2.2 8.7-.9 10.9 2.9 2.2 3.8.9 8.7-2.9 10.9zm2.9-307.7c-2.2 3.8-7.1 5.1-10.9 2.9-3.8-2.2-5.1-7.1-2.9-10.9 2.2-3.8 7.1-5.1 10.9-2.9 3.8 2.2 5.1 7.1 2.9 10.9zM415.3 348c-2.2 3.8-7.1 5.1-10.9 2.9-3.8-2.2-5.1-7.1-2.9-10.9 2.2-3.8 7.1-5.1 10.9-2.9 3.8 2.2 5.2 7.1 2.9 10.9zm-2.9-173.1c-3.8 2.2-8.7.9-10.9-2.9-2.2-3.8-.9-8.7 2.9-10.9 3.8-2.2 8.7-.9 10.9 2.9 2.3 3.8.9 8.7-2.9 10.9zM432 264c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" class="st0"/></svg>                    
                    </div>

                </div>
                <div class="stats__item stats__item--month stats__item--selected">
                    <div class="stats__detail">
                        <div class="stats__title">Monthly Applications</div>
                        <div class="stats__content">
                            <div class="stats__text">${this._data.monthlyApplications}</div>
                            <div class="stats__percentage success">+15%</div>
                        </div>
                    </div>
                    <div class="stats__icon stats__icon--monthly">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 192h384v256H64zm384-96h-96v48h-16V96H176v48h-16V96H64v80h384zM160 64h16v32h-16zm176 0h16v32h-16z"/></svg>                    
                    </div>
                </div>

                <div class="stats__graph">
                    <canvas class='graph__canvas' height= "150"></canvas>
                </div>
            </div>
        `;
    }

    renderChart(selector) {

        const labels = this._reorderMonths(undefined, this._numOfMonths);
        const mockData = labels.map(() => Math.ceil(Math.random() * 20));
        
        const ctx = document.querySelector(selector).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            options: {
                responsive:true,
                maintainAspectRatio: false,
            },
            data: {
                labels,
                datasets: [{
                    label: 'Monthly Applications',
                    backgroundColor: '#B22222',
                    borderColor: '#B22222',
                    data: mockData
                }]
            }
        });

    } 

    _reorderMonths(month = new Date().getMonth() +1, range = 4) {
        if(range > 12 || range < 1 || month > 12 || month < 1) throw new Error('Error: Invalid Month or Range');
        const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        let start = month - range;
        let newMonths;
        // If there aren't enough months to go back, take from end of array
        if(start < 0) {
            newMonths = [...months.slice(start), ...months.slice(0, month)];
        } else {
            newMonths = months.slice(start, month);
        }
        return(newMonths);
    }
}

export default new Stats();