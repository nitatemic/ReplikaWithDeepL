const sendTestRequest = require("./sendTestRequest");

function ChooseEndpoint(APIKEY) {
	let request = sendTestRequest(APIKEY);
	/* Parsing the response from the server into a JavaScript object. */
	let response = JSON.parse(request.response);
	if (response.message === "Wrong endpoint. Use https://api-free.deepl.com") {
		/*Enregistre l'endpoint dans le storage de l'extension*/
		chrome.storage.sync.set({
			"endpoint": "https://api-free.deepl.com/v2"
		});
	}
}
module.exports = ChooseEndpoint;
