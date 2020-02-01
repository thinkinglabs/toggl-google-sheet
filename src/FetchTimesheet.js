import { Timesheet } from './Timesheet.js';
import { firstDayOfMonth, lastDayOfMonth, formatISODate } from './Dates.js';

function FetchTimesheet(logger, togglRepository) {
  var that = this;

  this.logger = logger;
  this.togglRepository = togglRepository;

  this.execute = function(workspaceId, timesheetDate) {

    var since = formatISODate(firstDayOfMonth(timesheetDate));
    this.logger.log("since: " + since);

    var until = formatISODate(lastDayOfMonth(timesheetDate));
    this.logger.log("until: " + until);

    var timesheet = new Timesheet();
  
    var report = this.togglRepository.detailedReport(workspaceId, since, until);
  
    for (var i = 0; i < report.length; i++) {
      var timeEntry = report[i];

      var startDate = timeEntry.startDate;
      var client = timeEntry.client;
      var duration = timeEntry.duration;

      that.logger.log("add ["+startDate.getDate()+"]: " + client + " " + duration);
      timesheet.add(startDate, client, duration);
    }
    
    return timesheet;
  };
}

export { FetchTimesheet };
