
function TimesheetDayEntry(clients) {
  var that = this;

  if (clients) {
    Object.keys(clients).forEach(function(key) {
      var value = clients[key];
      that[key] = value;
    });
  }

  this.add = function(client, duration) {
    if (that[client]) {
      that[client] = that[client] + duration;
    } else {
      that[client] = duration;
    }
  }
}

function FetchTimesheet(logger, togglRepository) {
  var that = this;

  this.logger = logger;
  this.togglRepository = togglRepository;

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
    timesheetDay.add(client, duration);

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
}
