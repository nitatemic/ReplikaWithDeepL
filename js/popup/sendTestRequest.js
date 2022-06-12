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


	/* Trying to fetch the endpoint and return the response. If it fails, it returns 'Fetch error'. */
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
