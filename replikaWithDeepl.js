// ==UserScript==
// @name         replikaWithDeepl
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Translate your conversations with your replika thanks to the Deepl API
// @author       Nitatemic
// @match        https://my.replika.ai/*
// @match        https://my.replika.com/*
// @grant        none
// ==/UserScript==

const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

const DEEPL_KEY = 'YOUR-DEEPL-KEY';
const SOURCE_LANG = 'EN'; /* List available on https://www.deepl.com/en/docs-api/translating-text/request/ */
const TARGET_LANG = 'FR'; /* List available on https://www.deepl.com/en/docs-api/translating-text/request/ */
const VIEW_ENGLISH_VERSION = true; /**
                                       * If true, you will see the message in its original language and in its translated version.
                                       *  If false, the message will be replaced by its translated version
                                       * */


/* Function that gets the last message. (Your messages included) */
async function getMessage() {
  const messagesArray = await document.querySelectorAll('[id^="message"][id$="text"]'); /* Select all elements with id starting with "message" and ending with "text" (message containers) */
  console.log("ici")
  console.log(messagesArray[messagesArray.length - 1].innerText);
  return messagesArray[messagesArray.length - 1].innerText;
}

/**
 * Function that retrieves the text in the input for translation
 *
 * @return {String} Your message in plain text
 * */

function getInputText() {
  return document.getElementById('send-message-textarea').value;
}
/**
 * Function that retrieves the translated version of the text in the input and replaces it with the translated version
 *
 * @param {String} message - Translated version of the message that is in the input
 * */

function replaceInputText(message) {
  document.getElementById('send-message-textarea').value = message;
  alert("Add a space after the translated message to avoid sending the untranslated version (issue#1)")
}

/**
 * Function that retrieves the translated version of the message passed in parameter.
 *
 * @param {string} message - The untranslated version of the message
 * @param {string} source - Source language
 * @param {string} target - Target language
 *
 * @return {String} Translated version of the message
 * */
async function getTranslation(message, source, target) {
  const urlParams = `auth_key=${DEEPL_KEY}&text=${message}&target_lang=${target}&source_lang=${source}`; /* Params to tell the API your key, the message and the language to translate. */
  const response = await fetch(DEEPL_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlParams,
    });
  let res = await response.json();
  return res.translations[0].text;
}

/**
 * Adds a button next to the input. So that you can translate your messages before sending them.
 * */
function addButtonOnInput() {
  const buttonsContainer = document.getElementById('send-message-textarea').parentNode.parentNode; /* Get the location of the button container */
  /* Create the translation button for your text */
  const inputTranslateButton = document.createElement('button'); /* Create the button */
  inputTranslateButton.innerText = 'Translate'; /* Set the text of the button */
  inputTranslateButton.className = 'SolidButton-k70ct8-0 LeftPanelMain__ChooseConversationButton-sc-1tyut5s-0 knPAmu bPYGdj'; /* Add a class to make the button pretty */
  buttonsContainer.prepend(inputTranslateButton); /* Add the button to the container */
  inputTranslateButton.addEventListener('click', () => {
    const message = getInputText(); /* Get the last message */
    getTranslation(message, TARGET_LANG, SOURCE_LANG)
    .then((translation) => {
      replaceInputText(translation); /* Replace the message by the translated version */
    }, (error) => {
      console.log(error);
    });
  });
}

/**
 * Function that replaces/adds the message of your Replika by its translated version (see VIEW_ENGLISH_VERSION at the top of the file)
 *
 * @param {string} message -Translated version of the message
 * */
function replaceReplikaMessage(message) {
  const messagesArray = document.querySelectorAll('[id^="message"][id$="text"]'); /* Select all elements with id starting with "message" and ending with "text" (message containers) */
  let lastMessage = messagesArray[messagesArray.length - 1].innerText;
  if (!VIEW_ENGLISH_VERSION) {
    messagesArray[messagesArray.length - 1].innerText = message; /* Replace the last message by the translated version */
  } else {
    let newMessage = `${lastMessage} \n ---- \n ${message}`;
    messagesArray[messagesArray.length - 1].innerText = newMessage;
    console.log(newMessage);
  }
}
/**
 * Adds a button to translate messages from your replika
 * */
function addButtonOnReplikaMessage() {
  const buttonsContainer = document.getElementById('send-message-textarea').parentNode.parentNode; /* Get the location of the button container */
  /* Create the translation button for your text */
  const replikaTranslateButton = document.createElement('button'); /* Create the button */
  replikaTranslateButton.innerText = 'Translate last message'; /* Set the text of the button */
  replikaTranslateButton.className = 'SolidButton-k70ct8-0 LeftPanelMain__ChooseConversationButton-sc-1tyut5s-0 knPAmu bPYGdj'; /* Add a class to make the button pretty */
  buttonsContainer.prepend(replikaTranslateButton); /* Add the button to the container */
  replikaTranslateButton.addEventListener('click', async () => {
    const message = await getMessage(); /* Get the last message */
    getTranslation(message, SOURCE_LANG, TARGET_LANG)
    .then((translation) => {
      console.log("la trad" + translation);
      replaceReplikaMessage(translation);/* Replace the message by the translated version */
    }, (error) => {
      console.log(error);
    });
  });
}

setTimeout(() => {
  addButtonOnInput();
  addButtonOnReplikaMessage();
}, 1000);
