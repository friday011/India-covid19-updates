class UI {

    constructor() { }

    showHeaderMainData(state, population) {
        this.showCounterAndComma(document.querySelector('#total-confirmed-cases'), state[0].confirmed);
        this.showCounterAndComma(document.querySelector('#total-active-cases'), state[0].active);
        this.showCounterAndComma(document.querySelector('#total-recovered-cases'), state[0].recovered);
        this.showCounterAndComma(document.querySelector('#total-death-cases'), state[0].deaths);

        document.querySelector('#population').textContent = `${population / 10000000} Crores`;
        document.querySelector('#summary-last-updated').innerHTML = `Last Updated on ${state[0].lastupdatedtime} IST`;
    }

    showStateBrief(stateData, stateDetails) {

        let confirmed = [],
            tests = [],
            deaths = [],
            statecodes = [];
        let first = -Infinity,
            second = -Infinity,
            third = -Infinity;

        stateData.forEach(item => {
            if (!(item.statecode === 'TT' || item.statecode === 'UN' || item.statecode === 'LD')) {
                confirmed.push(Number(item.confirmed));
                deaths.push(Number(item.deaths));
                let sc = item.statecode;
                let sn = item.state;
                statecodes.push([sc, sn]);
            }
        });

        let stateDetailArr = Object.entries(stateDetails);

        stateDetailArr.forEach(item => {
            if (!(item[0] === 'LD' || item[0] === 'TT' || item[0] === 'UN')) {
                tests.push(Number(item[1].total.tested));
            }
        });

        confirmed.forEach(item => {
            if (item > first) {
                third = second;
                second = first;
                first = item;
            } else if (item > second) {
                third = second;
                second = item;
            } else if (item > third) {
                third = item;
            }
        });

        stateData.forEach(item => {
            if (!(item.statecode === 'TT' || item.statecode === 'UN' || item.statecode === 'LD')) {
                if (first === Number(item.confirmed)) {
                    document.querySelectorAll('#state-name-worst').forEach(element => { element.textContent = item.state; });
                    document.querySelectorAll('#state-case-worst').forEach(element => { element.textContent = this.showCommas(item.confirmed); });
                    document.querySelector('#state-active-worst').textContent = this.showCommas(item.active);
                    document.querySelector('#state-recovered-worst').textContent = this.showCommas(item.recovered);
                    document.querySelector('#state-death-worst').textContent = this.showCommas(item.deaths);
                }
                if (second === Number(item.confirmed)) {
                    document.querySelector('#state-name-worse').textContent = item.state;
                    document.querySelector('#state-case-worse').textContent = this.showCommas(item.active);
                    document.querySelector('#state-active-worse').textContent = this.showCommas(item.active);
                    document.querySelector('#state-recovered-worse').textContent = this.showCommas(item.recovered);
                    document.querySelector('#state-death-worse').textContent = this.showCommas(item.deaths);
                }
                if (third === Number(item.confirmed)) {
                    document.querySelector('#state-name-bad').textContent = item.state;
                    document.querySelector('#state-case-bad').textContent = this.showCommas(item.active);
                    document.querySelector('#state-active-bad').textContent = this.showCommas(item.active);
                    document.querySelector('#state-recovered-bad').textContent = this.showCommas(item.recovered);
                    document.querySelector('#state-death-bad').textContent = this.showCommas(item.deaths);
                }
                if (Math.max(...deaths) === Number(item.deaths)) {
                    document.querySelector('#state-death-worst-name').textContent = item.state;
                    document.querySelector('#state-death-worst-deaths').textContent = item.deaths;
                }
            }
        });

        stateDetailArr.forEach(item => {
            if (Number(item[1].total.tested) === Math.max(...tests)) {
                statecodes.forEach(code => {
                    if (code[0] === item[0]) {
                        document.querySelector('#state-test-best-name').textContent = code[1];
                        document.querySelector('#state-test-best-tests').textContent = item[1].total.tested;
                    }
                });
            }
        });
    }

    showStateCards(states, stateDetails) {
        document.querySelector('.tip-box').style.display = 'flex';
        let stateArray = Object.entries(stateDetails);

        states.forEach(item => {
            if (!(item.statecode === 'UN' || item.statecode === 'TT')) {

                stateArray.forEach(value => {
                    if (item.statecode === value[0]) {
                        document.querySelector('.state-data').innerHTML += `
                            <div class="state-row card">
                                <div class="state-name-item py-05">
                                    <p class="medium-small"><a target="_" href="./states.html">${item.state}</a></p>
                                </div>
                                <div class="state-confirmed-item py-05">
                                    <p>Confirmed : <span class="medium confirmed-color">${this.showCommas(item.confirmed)}</span></p>
                                </div>
                                <div class="state-active-item py-05">
                                    <p>Active : <span class="medium-small active-color">${this.showCommas(item.active)}</span></p>
                                </div>
                                <div class="state-recovered-item py-05">
                                    <p>Recovered : <span class="medium-small recovered-color">${this.showCommas(item.recovered)}</span></p>
                                </div>
                                <div class="state-death-item py-05">
                                    <p>Deaths : <span class="medium-small death-color">${this.showCommas(item.deaths)}</span></p>
                                </div>
                                <div class="state-tested-item py-05">
                                    <p>Tested : <span class="medium-small">${this.showCommas(value[1].total.tested)}</span></p>
                                </div>
                            </div>
                        `;
                    }
                });

                if (item.statecode === 'LD') {
                    document.querySelector('.state-data').innerHTML += `
                            <div class="state-row card">
                                <div class="state-name-item py-05">
                                    <p class="medium-small">${item.state}</p>
                                </div>
                                <div class="state-confirmed-item py-05">
                                    <p>Confirmed : <span class="medium confirmed-color">${this.showCommas(item.confirmed)}</span></p>
                                </div>
                                <div class="state-active-item py-05">
                                    <p>Active : <span class="medium-small active-color">${this.showCommas(item.active)}</span></p>
                                </div>
                                <div class="state-recovered-item py-05">
                                    <p>Recovered : <span class="medium-small recovered-color">${this.showCommas(item.recovered)}</span></p>
                                </div>
                                <div class="state-death-item py-05">
                                    <p>Deaths : <span class="medium-small death-color">${this.showCommas(item.deaths)}</span></p>
                                </div>
                                <div class="state-tested-item py-05">
                                    <p>Tested : <span class="medium-small">0</span></p>
                                </div>
                            </div>
                        `;
                }
            }
        });
    }

    showDailyData(dailyData, testData) {

        document.querySelector('#daily-date').textContent = `${testData.testedasof}`;
        document.querySelector('#daily-confirmed-data').textContent = `${this.showCommas(dailyData.dailyconfirmed)}`;
        document.querySelector('#daily-recovered-data').textContent = `${this.showCommas(dailyData.dailyrecovered)}`;
        document.querySelector('#daily-death-data').textContent = `${this.showCommas(dailyData.dailydeceased)}`;
        document.querySelector('#daily-samples-data').textContent = `${this.showCommas(testData.samplereportedtoday)}`;
        document.querySelector('#daily-rtpcr-data').textContent = `${this.showCommas(testData.dailyrtpcrtests)}`;
        document.querySelector('#test-per-million').textContent = `${this.showCommas(testData.testspermillion)}`;
        document.querySelector('#positivity-rate').textContent = `${testData.testpositivityrate}`;

        document.querySelector('#test-last-updated').innerHTML = `As of ${testData.updatetimestamp} : <a target="_" href="${testData.source}">Source</a>`;
        document.querySelector('#total-tests').textContent = `${this.showCommas(testData.totalsamplestested)}`;
        document.querySelector('#total-rtpcr-tests').textContent = `${this.showCommas(testData.totalrtpcrtests)}`;
    }

    showStateDetails(summary, details) {

        document.querySelector('#state-name').textContent = summary.state;
        this.showCounterAndComma(document.querySelector('#state-confirmed'), summary.confirmed);
        this.showCounterAndComma(document.querySelector('#state-active'), summary.active);
        this.showCounterAndComma(document.querySelector('#state-recovered'), summary.recovered);
        this.showCounterAndComma(document.querySelector('#state-deaths'), summary.deaths);
        document.querySelector('#state-migrated').textContent = this.showCommas(summary.migratedother);
        document.querySelector('#state-tested').textContent = this.showCommas(details.total.tested);
        document.querySelector('#state-population').textContent = this.showCommas(details.meta.population);
        document.querySelector('#summary-last-updated').innerHTML = `Last Updated on ${summary.lastupdatedtime}`;

        let cpm = (Number(summary.confirmed) / Number(details.meta.population)) * 1000000;
        let ar = (Number(summary.active) / Number(summary.confirmed)) * 100;
        let rr = (Number(summary.recovered) / Number(summary.confirmed)) * 100;
        let cfr = (Number(summary.deaths) / Number(summary.confirmed)) * 100;
        let tpm = (Number(details.total.tested) / Number(details.meta.population)) * 1000000;

        document.querySelector('#confirmed-per-million').textContent = `${cpm.toFixed(1)}`;
        document.querySelector('#active-ratio').textContent = `${ar.toFixed(1)} %`;
        document.querySelector('#recovery-ratio').textContent = `${rr.toFixed(1)} %`;
        document.querySelector('#fatality-ratio').textContent = `${cfr.toFixed(1)} %`;
        document.querySelector('#tests-per-million').textContent = `${Math.floor(tpm)}`;

        const stateIcon = document.createElement('img');
        stateIcon.setAttribute('src', `./img/states/${summary.state}.png`);
        stateIcon.setAttribute('alt', '');
        document.querySelector('.rest').appendChild(stateIcon);

        if (summary.statenotes === '') {
            document.querySelector('#state-notes').style.display = 'none';
        } else {
            let notesArr = summary.statenotes.split('\n');
            notesArr.forEach(note => {
                let notePara = document.createElement('p');
                notePara.className = "py-025";
                notePara.textContent = note;
                notePara.style.textAlign = 'center';
                document.querySelector('.notes').appendChild(notePara);
            });
        }
    }

    showDistrictSummary(districts, stateName) {

        let first = -Infinity,
            second = -Infinity,
            third = -Infinity;
        let confirmed = [];

        districts.forEach(district => {
            confirmed.push(Number(district[1].total.confirmed));
        });

        confirmed.forEach(item => {
            if (item > first) {
                third = second;
                second = first;
                first = item;
            } else if (item > second) {
                third = second;
                second = item;
            } else if (item > third) {
                third = item;
            }
        });

        document.querySelector('#name-State').textContent = stateName;

        districts.forEach(district => {
            if (Number(district[1].total.confirmed) === first) {
                document.querySelector('#district-name-worst').textContent = district[0];
                document.querySelector('#district-case-worst').textContent = this.showCommas(district[1].total.confirmed);
                document.querySelector('#district-recovered-worst').textContent = this.showCommas(district[1].total.recovered);
                document.querySelector('#district-death-worst').textContent = this.showCommas(district[1].total.deceased);
            }
            if (Number(district[1].total.confirmed) === second) {
                document.querySelector('#district-name-worse').textContent = district[0];
                document.querySelector('#district-case-worse').textContent = this.showCommas(district[1].total.confirmed);
                document.querySelector('#district-recovered-worse').textContent = this.showCommas(district[1].total.recovered);
                document.querySelector('#district-death-worse').textContent = this.showCommas(district[1].total.deceased);
            }
            if (Number(district[1].total.confirmed) === third) {
                document.querySelector('#district-name-bad').textContent = district[0];
                document.querySelector('#district-case-bad').textContent = this.showCommas(district[1].total.confirmed);
                document.querySelector('#district-recovered-bad').textContent = this.showCommas(district[1].total.recovered);
                document.querySelector('#district-death-bad').textContent = this.showCommas(district[1].total.deceased);
            }
        });
    }

    showDistrictCards(matches) {

        matches.forEach(item => {
            document.querySelector('.state-data').innerHTML += `
                <div class="state-row card">
                    <div class="district-name-item py-05">
                        <p class="medium-small">${item[0]}</p>
                    </div>
                    <div class="district-population-item py-05">
                        <p>Population : <span class="medium-small">${this.showCommas(item[1].meta.population)}</span></p>
                    </div>
                    <div class="district-confirmed-item py-05">
                        <p>Confirmed : <span class="medium-small confirmed-color">${this.showCommas(item[1].total.confirmed)}</span></p>
                    </div>
                    <div class="district-recovered-item py-05">
                        <p>Recovered : <span class="medium-small recovered-color">${this.showCommas(item[1].total.recovered)}</span></p>
                    </div>
                    <div class="district-death-item py-05">
                        <p>Deaths : <span class="medium-small death-color">${this.showCommas(item[1].total.deceased)}</span></p>
                    </div>
                    <div class="district-tested-item py-05">
                        <p>Tested : <span class="medium-small">${item[1].total.tested === undefined ? '--' : this.showCommas(item[1].total.tested)}</span></p>
                    </div>
                </div>
            `;
        });
    }

    showCounterAndComma(element, number) {

        const num = +number;
        const speed = 100;

        const updateCount = () => {
            const count = +element.innerText;
            const inc = num / speed;

            if (count < num) {
                element.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                element.innerText = this.showCommas(+number);
            }
        };
        updateCount();
    }

    showCommas(number) {
        let str;

        if (number < 1000) {
            return number;
        } else if (number < 100000 && number >= 1000) {
            let unit1 = number % 1000;
            let unit2 = parseInt(number / 1000);

            if (unit1 <= 9) {
                str = `${unit2},00${unit1}`;
            } else if (unit1 <= 99) {
                str = `${unit2},0${unit1}`;
            } else {
                str = `${unit2},${unit1}`;
            }
            return str;

        } else if (number < 10000000 && number >= 100000) {
            let unit1 = number % 100;
            number = parseInt(number / 100);
            let unit2 = number % 10;
            number = parseInt(number / 10);
            let unit3 = number % 100;
            number = parseInt(number / 100);
            let unit4 = number;

            let part1, part2, part3;
            if (unit1 <= 9) {
                part1 = `0${unit1}`;
            } else {
                part1 = `${unit1}`;
            }

            if (unit2 === 0) {
                part2 = `0`;
            } else {
                part2 = `${unit2}`;
            }

            if (unit3 <= 9) {
                part3 = `0${unit3}`;
            } else {
                part3 = `${unit3}`;
            }
            str = `${unit4},${part3},${part2}${part1}`;
            return str;
        } else if (number >= 10000000) {
            let unit1 = number % 100;
            number = parseInt(number / 100);
            let unit2 = number % 10;
            number = parseInt(number / 10);
            let unit3 = number % 100;
            number = parseInt(number / 100);
            let unit4 = number % 100;
            number = parseInt(number / 100);
            let unit5 = number;

            let part1, part2, part3, part4;
            if (unit1 <= 9) {
                part1 = `0${unit1}`;
            } else {
                part1 = `${unit1}`;
            }

            if (unit2 === 0) {
                part2 = `0`;
            } else {
                part2 = `${unit2}`;
            }

            if (unit3 <= 9) {
                part3 = `0${unit3}`;
            } else {
                part3 = `${unit3}`;
            }

            if (unit4 <= 9) {
                part4 = `0${unit4}`;
            } else {
                part4 = `${unit4}`;
            }

            str = `${unit5},${part4},${part3},${part2}${part1}`;
            return str;
        }
    }

}