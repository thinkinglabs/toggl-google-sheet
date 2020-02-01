
var Request = function() {
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

var Base64 = function() {
  this.encode = function(text) {
    return Utilities.base64Encode(text);
  }
}

var Logging = function(module) {
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

export { Request, Base64, Logging };