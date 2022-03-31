let promiseMap = new Map();
browser.composeAction.disable();
console.log("BACKGROUND LOADED")

browser.compose.onBeforeSend.addListener(tab => {
  console.log("TAB" + tab.id)

  var details = await browser.compose.getComposeDetails(tab.id);
  var messageText = details.plainTextBody
  console.log("Message : " + messageText)
  
  browser.composeAction.enable(tab.id);
  browser.composeAction.openPopup();

  // Do NOT lose this Promise. Most of the compose window UI will be locked
  // until it is resolved. That's a very good way to annoy users.
  return new Promise(resolve => {
    promiseMap.set(tab.id, resolve);
  });
});