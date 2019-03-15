
function Requests() {
  this.get = function(url, queryString, headers) {
    return UrlFetchApp.fetch(url + "?" + queryString, {
      method: "get",
      headers: headers
    });
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
