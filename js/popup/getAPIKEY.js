/**
 * The function `getAPIKEY()` is called when the user clicks the "Submit" button. The function then
 * takes the value of the text box and assigns it to the variable `API_KEY`
 */

function getAPIKEY() {
	return document.getElementById("API_KEY").value;
}

module.exports = getAPIKEY;
