import { parseISODateTime } from './Dates.js';

function TimeEntry(client, startDate, duration) {
  this.client = client;
  this.startDate = startDate;
  this.duration = duration;
}

var TogglRepository = function(apiToken, request, base64, logger) {
  this.apiToken = apiToken;
  this.request = request;
  this.base64 = base64;
  this.logger = logger;

  var that = this;

  this.detailedReport = function (workspaceId, since, until) {

    result = [];
  
    var report = fetchReport(workspaceId, since, until);
  
    that.logger.log("total count: " + report.total_count + " - per page: " + report.per_page);
    var numberOfPages = Math.ceil(report.total_count/ report.per_page);
    that.logger.log("number of pages: " + numberOfPages);
    
    var page = 1;
    
    do {
      for (var i = 0; i < report.data.length; i++) {
        var timeEntry = report.data[i];
  
        result.push(new TimeEntry(timeEntry.client, parseISODateTime(timeEntry.start), timeEntry.dur));
      }
  
      ++page;
      report = fetchReport(workspaceId, since, until, page);
    } while (page <= numberOfPages);
  
    return result;
  };

  function fetchReport(workspaceId, since, until, page) {
  
    var usernamePassword = that.apiToken + ":api_token";
    var digest = "Basic " + that.base64.encode(usernamePassword);
    
    
    var url = "https://www.toggl.com/reports/api/v2/details";
    var queryString = "workspace_id=" + workspaceId + "&user_agent=GoogleSheet" + "&since=" + since + "&until=" + until;
    if (page) {
      queryString = queryString + "&page=" + page;
    }
    that.logger.log("querystring: " + queryString);
    var result = that.request.get(url, queryString, { 'Authorization': digest });
    return result;
  }
}

export { TogglRepository };
