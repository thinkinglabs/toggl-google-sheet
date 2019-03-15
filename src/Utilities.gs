
function Resource(url) {
  this.url = url;

  this.get = function(queryString, headers) {
    return UrlFetchApp.fetch(this.url + "?" + queryString, {
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
