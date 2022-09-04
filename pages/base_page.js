exports.BasePage = class BasePage {

    static async get_info_data(response, key) {
        try {
            let response_data = response.data.info[key]
            console.log(`Response data by key "${key}" is: "${response_data}"`);
            return response_data
        } catch (error) {
            console.error(`An exception raised during executing GET request! Error message: ${error}`);
        }
    }

}
