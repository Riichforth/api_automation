import {AxiosMethods} from "./api_page";


export class Employee {

    name: string;
    salary: number;
    age: number;

    constructor(name = 'Default', salary = 100, age = 20) {
        this.name = name;
        this.salary = salary;
        this.age = age
    }

    async create_an_employee_record() {
        try {
            const axiosInstance = new AxiosMethods('positive')
            let body = {'name': this.name, "salary": this.salary, "age": this.age}
            let response = await axiosInstance.post('create', body)
            await axiosInstance.check_validation(response)
            return response
        } catch (error) {
            console.error(`An exception raised during executing POST request! Error message: ${error}`);
        }
    }

    async get_data_from_response(response, key) {
        // TODO: Should implement behaviour when response not in "data" object
        return response.data.data[key]
    }

    async search_employee_record_by_id(id) {
        try {
            const axiosInstance = new AxiosMethods('positive')
            let endpoint = 'employee/' + id
            let response = await axiosInstance.get(endpoint)
            await axiosInstance.check_validation(response)
            return response
        } catch (error) {
            console.error(`An exception raised during executing GET request! Error message: ${error}`);
        }
    }

    async delete_employee_record_by_id(id) {
        try {
            const axiosInstance = new AxiosMethods('positive')
            let endpoint = 'delete/' + id
            let response = await axiosInstance.delete(endpoint)
            await axiosInstance.check_validation(response)
            return response
        } catch (error) {
            console.error(`An exception raised during executing GET request! Error message: ${error}`);
        }
    }

}
