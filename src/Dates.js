
Date.prototype.equals = function(other) {
  if (!other) return false;
  if (!(other instanceof Date)) return false;
  if (this === other) return true;
  if (
      this.getFullYear() === other.getFullYear()
      && this.getMonth() === other.getMonth()
      && this.getDate() === other.getDate()
      && this.getHours() === other.getHours()
      && this.getSeconds() === other.getSeconds()
      && this.getMilliseconds() === other.getMilliseconds()
      && this.getTimezoneOffset() === other.getTimezoneOffset()
    ) return true;
  return false;
}

var firstDayOfMonth = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

var daysInMonth = function(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

var lastDayOfMonth = function(date) {
  var days = daysInMonth(date.getFullYear(), date.getMonth());
  return new Date(date.getFullYear(), date.getMonth(), days);
}

var millisToDuration = function(millis) {
    var t = new Date(1970, 0, 1);
    t.setMilliseconds(millis);
    return t.toTimeString().substr(0, 8);
}

var millisToDecimalHours = function(millis) {
  return millis / 1000 / 60 / 60;
}

var formatISODate = function(date) {
  return (padStart(date.getFullYear(), 4) + '-' + padStart(date.getMonth()+1, 2) + '-' + padStart(date.getDate(), 2));
}

var formatYYYYMM = function(date) {
  return (padStart(date.getFullYear(), 4) + padStart(date.getMonth()+1, 2));
}

var parseISODateTime = function(isoDateTime) {
  try{
    var result = new Date();
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = isoDateTime.match(new RegExp(regexp));

    // var offset = 0;
    var result = new Date(d[1], 0, 1);

    if (d[3]) { result.setMonth(d[3] - 1); }
    if (d[5]) { result.setDate(d[5]); }
    if (d[7]) { result.setHours(d[7]); }
    if (d[8]) { result.setMinutes(d[8]); }
    if (d[10]) { result.setSeconds(d[10]); }
    // if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    // if (d[14]) {
    //   offset = (Number(d[16]) * 60) + Number(d[17]);
    //   offset *= ((d[15] == '-') ? 1 : -1);
    // }

    // offset -= date.getTimezoneOffset();

    // time = (Number(date) + (offset * 60 * 1000));
    // aDate.setTime(Number(time));
    return result;
  } catch(e){
    return;
  }
}

function padStart(str, targetLength, padchar) {
  var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
  var pad = new Array(1 + targetLength).join(pad_char);
  return (pad + str).slice(-pad.length);
}

export { firstDayOfMonth, lastDayOfMonth, daysInMonth, millisToDuration, millisToDecimalHours, parseISODateTime, formatISODate, formatYYYYMM };
