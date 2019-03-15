
function Requests() {
  this.get = function(url, queryString, headers) {
    var response = UrlFetchApp.fetch(url + "?" + queryString, {
      method: "get",
      headers: headers
    });

    var responseBody = response.getContentText();
    var result = JSON.parse(responseBody);
    return result;
  }
}

function Base64() {
  this.encode = function(text) {
    return Utilities.base64Encode(text);
  }
}

function Logging(module) {
  this.module = module;

  this.log = function(text) {
    var logline = '';
    if (this.module) {
      logline = logline.concat('[', module, '] ')
    }
    logline = logline.concat(text);
    Logger.log(logline);
  };
}
