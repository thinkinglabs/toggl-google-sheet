
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

  this.renderRow = function(row, ...values) {
    const numColumns = values.length;
    sheet.getRange(row, 1, 1, numColumns).setValues([values]);
    sheet.getRange(row, 1).setNumberFormat("dd/MM/yyyy")
  }

  this.renderDaysWorked = function(numberOfDaysWorked) {
    const title = sheet.getRange(2, 5);
    title.setValue("#MC");
    title.setFontWeight("bold");
    sheet.getRange(2,6).setValue(numberOfDaysWorked);
  }
}

export { GoogleSpreadsheetAdapter, GoogleSheetAdapter };
