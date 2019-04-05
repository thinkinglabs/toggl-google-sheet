
function Timesheet(timesheet) {
  var that = this;

  var _timesheet = timesheet ? timesheet : [];

  this.hasDayOfMonth = function(dayOfMonth) {
    return _timesheet[dayOfMonth] ? true : false;
  };

  this.create = function(dayOfMonth) {
    _timesheet[dayOfMonth] = new TimesheetDayEntry();
  };

  this.get = function(dayOfMonth) {
    return _timesheet[dayOfMonth];
  }

  this.timesheet = function() {
    return _timesheet;
  };
}

function TimesheetDayEntry(clients) {
  var that = this;

  if (clients) {
    Object.keys(clients).forEach(function(key) {
      var value = clients[key];
      that[key] = value;
    });
  }

  this.add = function(client, duration) {
    if (hasClient(client)) {
      that[client] = that[client] + duration;
    } else {
      that[client] = duration;
    }
  }

  function hasClient(client) {
    return that[client];
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

    var timesheet = new Timesheet();
  
    var report = this.togglRepository.detailedReport(workspaceId, since, until);
  
    for (var i = 0; i < report.length; i++) {
      var timeEntry = report[i];
      addTimeEntryToTimesheet(timesheet, timeEntry);  
    }
  
    return timesheet.timesheet();
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
    if (!timesheet.hasDayOfMonth(startDate.getDate())) {
      that.logger.log("add " + startDate.getDate() + " to timesheet");
      timesheet.create(startDate.getDate());
    }
    var timesheetDay = timesheet.get(startDate.getDate());
    return timesheetDay;
  }
}
