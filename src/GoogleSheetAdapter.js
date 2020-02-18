
var GoogleSpreadsheetAdapter = function() {

  const _activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  this.replaceOrAppendSheet = function(sheetName) {
    var sheet = _activeSpreadsheet.getSheetByName(sheetName);
    if (sheet) {
      _activeSpreadsheet.deleteSheet(sheet);
    }

    var sheet = _activeSpreadsheet.insertSheet(sheetName, _activeSpreadsheet.getSheets().length);
    return new GoogleSheetAdapter(sheet);
  }

};

var GoogleSheetAdapter = function(sheet) {
  this.sheet = sheet;

  this.renderTitles = function(...titles) {
    const numColumns = titles.length
    var titlesRange = sheet.getRange(1, 1, 1, numColumns);
    titlesRange.setValues([titles]);
    titlesRange.setFontWeights([["bold", "bold", "bold"]]);
  }
}

export { GoogleSpreadsheetAdapter, GoogleSheetAdapter };
