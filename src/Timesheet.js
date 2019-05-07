
function Timesheet(timesheet) {
  
  var _timesheet = timesheet ? timesheet : [];

  this.add = function(date, client, duration) {
    if (!hasDayOfMonth(date.getDate())) {
      create(date.getDate());
    }
    var timesheetDay = get(date.getDate());
    timesheetDay.add(client, duration);
  }

  this.timesheet = function() {
    return _timesheet;
  };

  function hasDayOfMonth(dayOfMonth) {
    return _timesheet[dayOfMonth] ? true : false;
  };

  function create(dayOfMonth) {
    _timesheet[dayOfMonth] = new TimesheetDayEntry();
  };

  function get(dayOfMonth) {
    return _timesheet[dayOfMonth];
  }

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
