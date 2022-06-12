/* Lorsque l'extension Chrome est installé, ouvre la documentation de l'extension */
chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.create({
		url: "https://github.com/nitatemic/ReplikaWithDeepL/wiki/You-just-installed-the-extension-and-now%3F"
	});
}
