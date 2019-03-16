
function FetchTimesheet(logger, togglRepository) {
  this.logger = logger;
  this.togglRepository = togglRepository;

  this.execute = function(workspaceId, since, until) {

    var timesheet = [];
  
    var report = this.togglRepository.detailedReport(workspaceId, since, until);
  
    for (var i = 0; i < report.length; i++) {
      var timeEntry = report[i];
      var client = timeEntry.client;
      var startDate = timeEntry.startDate;
      var duration = timeEntry.duration;
  
      if (!timesheet[startDate.getDate()]) {
        this.logger.log("add " + startDate.getDate() + " to timesheet");
        timesheet[startDate.getDate()] = {};
      }
      var timesheetDay = timesheet[startDate.getDate()];
      if (!timesheetDay[client]) {
        this.logger.log("add " + client + " to timesheet day " + startDate.getDate());
        timesheetDay[client] = duration;
      } else {
        timesheetDay[client] = timesheetDay[client] + duration;
      }
  
      this.logger.log(client + " ["+startDate.getDate()+"]: " + timesheetDay[client]);
    }
  
    return timesheet;
  };

}
