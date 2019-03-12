
function TogglRepository(apiToken) {
  this.apiToken = apiToken;
}

TogglRepository.prototype.detailedReport = detailedReport;
TogglRepository.prototype.report = report;

function detailedReport(workspaceId, since, until) {

  result = [];

  var report = this.report(workspaceId, since, until);

  Logger.log("total count: " + report.total_count + " - per page: " + report.per_page);
  var numberOfPages = Math.ceil(report.total_count/ report.per_page);
  Logger.log("number of pages: " + numberOfPages);
  
  var page = 1;
  
  do {
    for (var i = 0; i < report.data.length; i++) {
      var timeEntry = report.data[i];

      result.push({
        client: timeEntry.client,
        start: parseISODateTime(timeEntry.start),
        duration: timeEntry.dur
      });
    }

    ++page;
    report = this.report(workspaceId, since, until, page);
  } while (page <= numberOfPages);

  return result;
}

function report(workspaceId, since, until, page) {
  
  var usernamePassword = this.apiToken + ":api_token";
  var digest = "Basic " + Utilities.base64Encode(usernamePassword);
  
  
  var url = "https://www.toggl.com/reports/api/v2/details";
  var queryString = "workspace_id=" + workspaceId + "&user_agent=GoogleSheet" + "&since=" + since + "&until=" + until;
  if (page) {
    queryString = queryString + "&page=" + page;
  }
  Logger.log("querystring: " + queryString);
  var response = UrlFetchApp.fetch(url + "?" + queryString, {
    method: "get",
    headers: {
      "Authorization": digest
    }
  });
  var responseBody = response.getContentText();
  var result = JSON.parse(responseBody);
  return result;
}

