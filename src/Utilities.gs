
function Requests() {
  this.get = function(url, queryString, headers) {
    return UrlFetchApp.fetch(url + "?" + queryString, {
      method: "get",
      headers: headers
    });
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
