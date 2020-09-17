// Initialize objects
const apiInfo = new CovidApi;
const ui = new UI;

// Declare UI Variables
const searchBox = document.querySelector('#states-search');
const dateSelect = document.querySelector('#date-select');
document.querySelector('.state-error').style.display = 'none';
document.querySelector('.tip-box').style.display = 'none';

let stateNameArr = [],
    stateDetailArr = [],
    testDataArr = [],
    dailyDataArr = [],
    names = [];

let clickedState;

let monthLegend = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
};

// Fetch Data from covid_api.js
apiInfo.getInfo().then(data => {

    ui.showHeaderMainData(data.stateWiseData, data.stateDetails.TT.meta.population);
    ui.showDailyData(data.dailyData[data.dailyData.length - 1], data.testData[data.testData.length - 1]);
    ui.showStateBrief(data.stateWiseData, data.stateDetails);

    data.stateWiseData.forEach(item => {
        stateNameArr.push(item);
        names.push(item.state);
    });

    dailyDataArr = data.dailyData;
    stateDetailArr = data.stateDetails;
    testDataArr = data.testData;

});

// Event Listeners
searchBox.addEventListener('input', () => searchStates(searchBox.value));
dateSelect.addEventListener('input', () => searchDays(dateSelect.value));

// Search State Functionality
const searchStates = stateName => {
    document.querySelector('.state-data').innerHTML = '';

    if (stateName === '') {
        document.querySelector('.state-error').style.display = 'none';
        document.querySelector('.state-summary').style.display = 'block';
        document.querySelector('.tip-box').style.display = 'none';
    } else {
        let matches = stateNameArr.filter(state => {
            const regex = new RegExp(`^${stateName}`, 'gi');
            return state.state.match(regex);
        });

        if (matches.length === 0) {
            document.querySelector('.state-error').style.display = 'flex';
            document.querySelector('.state-summary').style.display = 'none';
            document.querySelector('.tip-box').style.display = 'none';
        } else {
            document.querySelector('.state-error').style.display = 'none';
            document.querySelector('.state-summary').style.display = 'none';
            ui.showStateCards(matches, stateDetailArr);
        }
    }
};

// Search Day Functionality
const searchDays = dateValue => {

    let computedTestDate = '';
    let computedDailyDate = '';
    let found = false;

    let dailyData, testData;

    let dateArr = dateValue.split('-');
    computedTestDate = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;

    let month = '';
    Object.entries(monthLegend).forEach(item => {
        if (item[0] === dateArr[1]) {
            month = item[1];
        }
    });
    computedDailyDate = `${dateArr[2]} ${month} `;

    dailyDataArr.forEach(item => {
        if (item.date === computedDailyDate) {
            dailyData = item;
            found = true;
        }
    });
    testDataArr.forEach(item => {
        if (item.testedasof === computedTestDate) {
            testData = item;
            found = true;
        }
    });

    if (!found) {
        const err = document.createElement('p');
        err.className = 'daily-error-prompt confirmed-color';
        err.innerHTML = `Please enter a date between <span id="fresh-date">${testDataArr[testDataArr.length - 1].testedasof}</span> and <span id="start-date">${testDataArr[0].testedasof}</span>`;

        document.querySelector('.error').appendChild(err);

        setTimeout(() => {
            document.querySelector('.daily-error-prompt').remove();
            ui.showDailyData(dailyDataArr[dailyDataArr.length - 1], testDataArr[testDataArr.length - 1]);
        }, 3000);

        dateSelect.value = '';
    } else {
        ui.showDailyData(dailyData, testData);
    }
};

// Event listener on State-Name links
document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        names.forEach(name => {
            if (name === e.target.textContent) {
                clickedState = e.target.textContent;
                localStorage.setItem("stateName", clickedState);
            }
        });
    }
});