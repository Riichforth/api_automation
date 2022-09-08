// @ts-check
import {expect, test} from '@playwright/test';
import {Employee} from "../pages/employee_page.js";

test.describe('Interaction with user records', () => {

    test('Creating a new employee', async ({page}) => {

        // Sending POST request to create a new employee
        const new_employee = new Employee()
        let response = await new_employee.create_an_employee_record()

        await expect(response.status).toEqual(200);
        await expect(response.data.message).toEqual('Successfully! Record has been added.');

    });

    test('Deleting a record of created employee', async ({page}) => {

        // Creating a new employee
        const new_employee = new Employee('Jack', 2000, 26)
        let creation_response = await new_employee.create_an_employee_record()
        await expect(creation_response.status).toEqual(200);
        await expect(creation_response.data.message).toEqual('Successfully! Record has been added.');

        // Getting ID of created employee record
        let employee_id = await new_employee.get_data_from_response(creation_response, 'id')

        // Searching record about employee by ID
        let search_response = await new_employee.search_employee_record_by_id(employee_id)
        await expect(search_response.status).toEqual(200);
        await expect(search_response.data.message).toEqual('Successfully! Record has been fetched.');

        // Deleting record about created employee
        let deleting_response = await new_employee.delete_employee_record_by_id(employee_id)
        await expect(deleting_response.status).toEqual(200);
        await expect(deleting_response.data.message).toEqual('Successfully! Record has been deleted');

    });

});