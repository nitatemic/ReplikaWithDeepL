require('dotenv/config');
const getAPIKEY = require('../getAPIKEY');
const API_KEY_TEST = process.env.API_KEY_TEST;

test(`Return the API key`, () => {
	/* Set the API key in the input field */
	document.body.innerHTML =
		`<div>
			<input id="API_KEY" type="text" value="${API_KEY_TEST}">
		</div>`;

	/* Check the value of the API key */
	expect(getAPIKEY()).toBe(API_KEY_TEST);
	});
