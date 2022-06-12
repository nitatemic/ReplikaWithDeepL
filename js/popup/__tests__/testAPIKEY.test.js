require('dotenv/config');
const testAPIKEY = require('../testAPIKEY');
const API_KEY_TEST = process.env.API_KEY_TEST;

test(`Error Handling in testAPIKEY`, () => {
	/* Check the value of the API key */
	expect(testAPIKEY()).toEqual({"message": "Fetch error", "status": "error"});
});
