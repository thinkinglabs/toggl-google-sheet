
function TimesheetDayEntry() {
  this.add = function(client, duration) {
    this[client] = duration;
  }
}

function FetchTimesheet(logger, togglRepository) {
  this.logger = logger;
  this.togglRepository = togglRepository;

  var that = this;

  this.execute = function(workspaceId, timesheetDate) {

    var since = formatISODate(firstDayOfMonth(timesheetDate));
    this.logger.log("since: " + since);

    var until = formatISODate(lastDayOfMonth(timesheetDate));
    this.logger.log("until: " + until);

    var timesheet = [];
  
    var report = this.togglRepository.detailedReport(workspaceId, since, until);
  
    for (var i = 0; i < report.length; i++) {
      var timeEntry = report[i];
      addTimeEntryToTimesheet(timesheet, timeEntry);  
    }
  
    return timesheet;
  };

  function addTimeEntryToTimesheet(timesheet, timeEntry) {
    var client = timeEntry.client;
    var startDate = timeEntry.startDate;
    var duration = timeEntry.duration;

    var timesheetDay = getOrCreateTimesheetDayEntry(timesheet, startDate);
    addDurationToClient(timesheetDay, client, duration);

    that.logger.log(client + " ["+startDate.getDate()+"]: " + timesheetDay[client]);
  }

  function getOrCreateTimesheetDayEntry(timesheet, startDate) {
    if (!timesheet[startDate.getDate()]) {
      that.logger.log("add " + startDate.getDate() + " to timesheet");
      timesheet[startDate.getDate()] = new TimesheetDayEntry();
    }
    var timesheetDay = timesheet[startDate.getDate()];
    return timesheetDay;
  }

  function addDurationToClient(timesheetDay, client, duration) {
    if (!timesheetDay[client]) {
      that.logger.log("add " + client + " to timesheet day");
      timesheetDay.add(client, duration);
    } else {
      timesheetDay.add(client, timesheetDay[client] + duration);
    }
  }

}
