const axios = require('axios');

const api_instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 1000
});

exports.AxiosMethods = class AxiosMethods {

    constructor(endpoint, validation) {
        this.endpoint = api_instance.defaults.baseURL + endpoint
        this.validation = validation
    }

    async get() {
        try {
            let request_url = this.endpoint
            let response = await api_instance.get(request_url)
            await this.check_validation(response)
            return response
        } catch (error) {
            console.error(`An exception raised during executing GET request! Error message: ${error}`);
        }
    }

    async check_validation(response) {
        // The Axios library has built-in tools to validate the response, at the moment a manual solution is used
        let negative_statuses = ["4", "5"];
        let actual_status;
        negative_statuses.includes(response.status.toString()[0]) ? actual_status = 'error' : actual_status = 'good'
        if (this.validation === 'positive') {
            if (actual_status === 'error') {
                throw `Positive validation failed! Actual status: "${response.status}"`
            } else {
                console.log(`Positive validation is successful! Actual status: "${response.status}"`)
            }
        } else if (this.validation === 'negative') {
            if (actual_status === 'good') {
                throw `Negative validation failed! Actual status: "${response.status}"`
            } else {
                console.log(`Negative validation is successful! Actual status: "${response.status}"`)
            }
        } else {
            throw `"${this.validation}" is unexpected type of validation!`
        }
    }

}
