const sendTestRequest = require("./sendTestRequest");
function testAPIKEY(API_KEY) {

	if (API_KEY === "") {
		return {
			"status": "error",
			"message": "Please enter your API key"
		};
	}

	let request = sendTestRequest(API_KEY);
	if (request === "Fetch error") {
		return {
			"status": "error",
			"message": "Fetch error"
		};
	}
	/* Parsing the response from the server into a JavaScript object. */
	let response = JSON.parse(request.body);

	switch (request.status) {
		case 200:
			return {
				"status": "success",
				"message": "Your API key is valid"
			}

		case 456:
			return {
				"status": "error",
				"message": "Your API key is valid but you have reached the limit of your account"
			}

		case 500:
			return {
				"status": "error",
				"message": "DeepL seems to be down. Please try again later"
			}

		default:
			console.error(response.message);
			return {
				"status": "error",
				"message": "Check the console for more information"
			}
	}
}

module.exports = testAPIKEY;
