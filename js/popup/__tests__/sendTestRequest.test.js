require('dotenv/config');
const sendTestRequest = require('../sendTestRequest');
const API_KEY_TEST = process.env.API_KEY_TEST;

test(`Error Handling in sendTestRequest`, () => {
	/* Check the value of the API key */
	expect(sendTestRequest()).toEqual( "Fetch error");
});
