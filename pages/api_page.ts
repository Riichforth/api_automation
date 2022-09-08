import axios, {AxiosInstance} from 'axios';
import axiosRetry from 'axios-retry';

export class AxiosMethods {

    validation: string;
    apiClient: AxiosInstance;

    constructor(validation) {
        this.apiClient = axios.create({
            baseURL: 'https://dummy.restapiexample.com/api/v1/',
            timeout: 1000
        })
        this.validation = validation
    }

    async get(endpoint, params = null) {
        // TODO: Should implement "params" flow
        let request_url = this.apiClient.defaults.baseURL + endpoint
        try {
            axiosRetry(this.apiClient, {retries: 3});
            let response = await this.apiClient.get(request_url)
            await this.check_validation(response)
            return response
        } catch (error) {
            console.error(`An exception raised during executing GET request! Error message: ${error}`);
        }
    }

    async post(endpoint, body) {
        let request_url = this.apiClient.defaults.baseURL + endpoint
        try {
            axiosRetry(this.apiClient, {retries: 3});
            let response = await this.apiClient.post(request_url, body)
            await this.check_validation(response)
            return response
        } catch (error) {
            console.error(`An exception raised during executing GET request! Error message: ${error}`);
        }
    }

    async delete(endpoint) {
        let request_url = this.apiClient.defaults.baseURL + endpoint
        try {
            axiosRetry(this.apiClient, {retries: 3});
            let response = await this.apiClient.delete(request_url)
            await this.check_validation(response)
            return response
        } catch (error) {
            console.error(`An exception raised during executing GET request! Error message: ${error}`);
        }
    }

    async check_validation(response) {
        // TODO: update with Axios built-in validation methods
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
