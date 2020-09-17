class CovidApi {

    constructor() { }

    async getInfo() {
        const basicResponse = await fetch('https://api.covid19india.org/data.json');
        const basicData = await basicResponse.json();

        const fullResponse = await fetch('https://api.covid19india.org/v4/data.json');
        const fullData = await fullResponse.json();

        return {
            dailyData: basicData.cases_time_series,
            stateWiseData: basicData.statewise,
            testData: basicData.tested,
            stateDetails: fullData
        };
    }
}