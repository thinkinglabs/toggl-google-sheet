
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

  var _clients = clients ? clients : {};

  this.add = function(client, duration) {
    if (hasClient(client)) {
      addDurationTo(client, duration);
    } else {
      setDurationFor(client, duration);
    }
  }

  this.clients = function(client) {
    return _clients;
  }

  function addDurationTo(client, duration) {
    _clients[client] = _clients[client] + duration;
  }

  function setDurationFor(client, duration) {
    _clients[client] = duration;
  }

  function hasClient(client) {
    return _clients[client];
  }
}
