import { TimesheetRenderer } from './TimesheetRenderer.js';
import { FetchTimesheet } from './FetchTimesheet.js';
import { TogglRepository } from './TogglRepository.js';
import { ReadConfiguration } from './ReadConfiguration.js';
import { Logging, Base64, Request } from './Utilities.js';

var getTimesheetForMonth = function() {
  var readConfiguration = new ReadConfiguration(SpreadsheetApp.getActive(), new Logging('ConfigurationLoader'));
  var config = readConfiguration.read();

  var timesheetDate = config.timesheetDate;
  Logger.log("timesheet date: " + timesheetDate);

  var renderer = new TimesheetRenderer(
    new FetchTimesheet(
      new Logging('FetchTimesheet'), 
      new TogglRepository(config.apiToken, new Request(), new Base64(), new Logging('TogglRepository'))
    )
  );
  renderer.render(config.workspaceId, timesheetDate);
}

export { getTimesheetForMonth };
