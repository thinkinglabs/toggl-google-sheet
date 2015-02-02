
function fetchReport(since, until, page) {
  
  var workspaceId = ######; //replace by your workspace id  
  var apiToken = "an api token"; //insert here your api token
  
  var usernamePassword = apiToken + ":api_token"; 
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
  var result = Utilities.jsonParse(responseBody);
  return result;
}


