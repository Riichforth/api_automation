// @ts-check
const {test, expect} = require('@playwright/test');
const {AxiosMethods} = require("../pages/api_page.js");
const {BasePage} = require("../pages/base_page.js");

test('Check positive validation', async ({page}) => {


    const axios = new AxiosMethods('character', 'positive')

    let response = await axios.get()

    await expect(response.status).toEqual(200);

});

test('Check negative validation', async ({page}) => {


    const axios = new AxiosMethods('incorrect_endpoint', 'negative')

    let response = await axios.get()

    // The Axios library automatically generates an exception in case of a 404 code status,
    // so at this point we can check that response value is "Undefined"
    await expect(response).toBeUndefined();

});


test('Check count of characters', async ({page}) => {


    const axios = new AxiosMethods('character', 'positive')

    let characters = await axios.get()

    let actual_characters_count = await BasePage.get_info_data(characters, 'count')

    let expected_characters_count = 826

    await expect(actual_characters_count).toEqual(expected_characters_count);

});
