
function ReadConfiguration(spreadSheet, logger) {
  this.spreadSheet = spreadSheet;
  this.logger = logger

  var SHT_CONFIG = 'Config';

  // based on the blog post "Insider Tips for using Apps Script and Spreadsheets"
  // from the Google Apps Developer Blog
  // http://googleappsdeveloper.blogspot.be/2012/05/insider-tips-for-using-apps-script-and.html
  this.read = function() {

    this.logger.log("Reading configuration ...");

    var configsheet = this.spreadSheet.getSheetByName(SHT_CONFIG);
    var result = {};

    var cfgdata = configsheet.getDataRange().getValues();
    for (i = 1; i < cfgdata.length; i++) {
      var key = cfgdata[i][0];
      var value = cfgdata[i][1];

      this.logger.log("key: " + key + " - value: " + value);

      result[key] = value;
    }

    return result
  };
}
