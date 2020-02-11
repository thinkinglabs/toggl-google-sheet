

var GoogleSpreadsheetAdapter = function() {

  const _activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  this.replaceOrAppendSheet = function(sheetName) {
    var sheet = _activeSpreadsheet.getSheetByName(sheetName);
    if (sheet) {
      _activeSpreadsheet.deleteSheet(sheet);
    }

    var sheet = _activeSpreadsheet.insertSheet(sheetName, _activeSpreadsheet.getSheets().length);
    return sheet;
  }

};

export { GoogleSpreadsheetAdapter };
