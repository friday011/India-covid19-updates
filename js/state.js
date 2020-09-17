const apiInfo = new CovidApi;
const ui = new UI;
let x = localStorage.getItem('stateName');

const searchBox = document.querySelector('#district-search');
document.querySelector('.state-error').style.display = 'none';

let stateSummaryArr = [],
    stateDetailArr = [],
    stateCodeLegend = [];

let districts;

apiInfo.getInfo().then(data => {
    stateSummaryArr = data.stateWiseData;
    stateDetailArr = Object.entries(data.stateDetails);

    let summary, details;
    stateSummaryArr.forEach(item => {
        if (item.state === x) {
            summary = item;
        }
    });

    stateDetailArr.forEach(item => {
        if (item[0] === summary.statecode) {
            details = item[1];
        }
    });

    districts = Object.entries(details.districts);

    ui.showStateDetails(summary, details);

    if (districts[0][0] === 'Unknown') {
        document.querySelector('#district-info-area').style.display = 'none';
    } else {
        ui.showDistrictSummary(districts, x);
    }
});

const searchDistricts = districtName => {

    document.querySelector('.state-data').innerHTML = '';

    if (districtName === '') {
        document.querySelector('.state-error').style.display = 'none';
        document.querySelector('.state-summary').style.display = 'block';
    } else {
        let matches = districts.filter(district => {
            const regex = new RegExp(`^${districtName}`, 'gi');
            return district[0].match(regex);
        });

        if (matches.length === 0) {
            document.querySelector('.state-error').style.display = 'flex';
            document.querySelector('.state-summary').style.display = 'none';
        } else {
            document.querySelector('.state-error').style.display = 'none';
            document.querySelector('.state-summary').style.display = 'none';
            ui.showDistrictCards(matches);
        }
    }
};

searchBox.addEventListener('input', () => searchDistricts(searchBox.value));