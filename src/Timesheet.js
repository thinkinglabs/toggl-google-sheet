
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

  this.iterator = function() {
    var nextIndex = 0;

    return {
      next: function() {
        while (nextIndex < _timesheet.length) {
          var timesheetDay = _timesheet[nextIndex++];
          if (timesheetDay) {
            return {value: timesheetDay, done: false};
          }
        }
        if (_timesheet.length <= nextIndex) {
          return {done: true};
        }
      }
    };
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

  this.iterator = function() {
    var nextIndex = 0;
    
    return {
      next: function() {
        if (nextIndex < Object.keys(_clients).length) {
          var client = Object.keys(_clients)[nextIndex++];
          var duration = _clients[client];
          return {value: {clientName: client, duration: duration}, done: false}
        } else {
          return {done: true};
        }
      }
    };
  };

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
