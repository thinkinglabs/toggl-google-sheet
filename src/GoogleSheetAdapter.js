
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
  const _sheet = sheet;

  this.renderTitles = function(...titles) {
    const numColumns = titles.length
    var titlesRange = _sheet.getRange(1, 1, 1, numColumns);
    titlesRange.setValues([titles]);
    titlesRange.setFontWeights([["bold", "bold", "bold"]]);
  }

  this.renderRow = function(row, ...values) {
    const numColumns = values.length;
    _sheet.getRange(row, 1, 1, numColumns).setValues([values]);
    _sheet.getRange(row, 1).setNumberFormat("dd/MM/yyyy")
  }

  this.autoResizeColumns = function() {
    _sheet.autoResizeColumn(1);
    _sheet.autoResizeColumn(2);
    _sheet.autoResizeColumn(3);
  }

  this.renderDaysWorked = function(numberOfDaysWorked) {
    const title = _sheet.getRange(2, 5);
    title.setValue("#Days Worked");
    title.setFontWeight("bold");
    _sheet.getRange(2, 6).setValue(numberOfDaysWorked);
    _sheet.autoResizeColumn(5);
  }
}

export { GoogleSpreadsheetAdapter, GoogleSheetAdapter };
