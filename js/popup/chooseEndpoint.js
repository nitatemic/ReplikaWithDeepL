const sendTestRequest = require("./sendTestRequest");

/**
 * It sends a test request to the server, parses the response, and if the response is "Wrong endpoint.
 * Use https://api-free.deepl.com", it saves the endpoint in the extension's storage
 * @param APIKEY - The API key you got from DeepL.
 */
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
