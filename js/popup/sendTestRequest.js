function sendTestRequest(APIKEY) {
	/* Get endpoint from storage */
	let endpoint;
	try {
		chrome.storage.sync.get("endpoint", function(result) {
			endpoint = result.endpoint;
		});
	}
	catch (e) {
		endpoint = "https://api.deepl.com/v2";
	}

	/* Faire une requête à DeepL pour vérifier que l'API_KEY est correcte */
	try {
		fetch(`${endpoint}usage?auth_key=${APIKEY}`)
		.then(response => {
			return response
		});
	}
	catch (e) {
		return 'Fetch error';
	}

}

module.exports = sendTestRequest;
