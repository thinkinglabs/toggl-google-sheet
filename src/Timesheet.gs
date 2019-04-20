
function Timesheet(timesheet) {
  var that = this;

  var _timesheet = timesheet ? timesheet : [];

  this.create = function(dayOfMonth) {
    _timesheet[dayOfMonth] = new TimesheetDayEntry();
  };

  this.get = function(dayOfMonth) {
    return _timesheet[dayOfMonth];
  }

  this.add = function(date, client, duration) {
    if (!hasDayOfMonth(date.getDate())) {
      that.create(date.getDate());
    }
    var timesheetDay = that.get(date.getDate());
    timesheetDay.add(client, duration);
  }

  this.timesheet = function() {
    return _timesheet;
  };

  function hasDayOfMonth(dayOfMonth) {
    return _timesheet[dayOfMonth] ? true : false;
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
