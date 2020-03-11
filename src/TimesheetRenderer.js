import { formatYYYYMM, millisToDuration } from './Dates.js';

function TimesheetRenderer(fetchTimesheet, googleSheetAdapter) {

  this.fetchTimesheet = fetchTimesheet;

  this.render = function(workspaceId, timesheetDate) {

    const timesheet = this.fetchTimesheet.execute(workspaceId, timesheetDate);

    const sheetName = formatYYYYMM(timesheetDate);

    const sheet = googleSheetAdapter.replaceOrAppendSheet(sheetName);
    
    sheet.renderTitles("Date", "Customer", "Duration")
    
    let row = 2

    const timesheetIterator = timesheet.iterator();

    for (let timesheetIteratorItem = timesheetIterator.next(); !timesheetIteratorItem.done; timesheetIteratorItem = timesheetIterator.next()) {
      
      let timesheetDay = timesheetIteratorItem.value;
      const day = timesheetDay.date();

      const clientsIterator = timesheetDay.iterator();

      for(let item = clientsIterator.next(); !item.done; item = clientsIterator.next()) {
        const duration = millisToDuration(item.value.duration);

        sheet.renderRow(row, day, item.value.clientName, duration);
        ++row;
      }
    }
    sheet.autoResizeColumns();

    sheet.renderDaysWorked(timesheet.daysWorked());
  };
}

export { TimesheetRenderer };
