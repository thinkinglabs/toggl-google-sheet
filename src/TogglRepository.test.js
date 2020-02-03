import { TogglRepository, TimeEntry } from './TogglRepository.js';

function MockRequest(result) {
  this.get = function(url, queryString, headers) {
    return result;
  };
}

function MockLogger() {
  this.log = function() {};
}

function MockBase64() {
  this.encode = function(text) { return text; };
}

test("when total count exceeds per page detailed report paginates", () => {
  var apiToken = 12345;

  var togglRepository = new TogglRepository(apiToken, new MockRequest({
    total_count: 3,
    per_page: 1,
    data: [
      {
        client: 'aClient',
        start: '2019-03-15T10:20:03',
        dur: 123400
      }
    ]
  }), new MockBase64(), new MockLogger());

  var actual = togglRepository.detailedReport('aWorkspaceId', '20190301', '20190315');
  var expected = [ 
    new TimeEntry('aClient', new Date(2019, 2, 15, 10, 20, 3, 0), 123400),
    new TimeEntry('aClient', new Date(2019, 2, 15, 10, 20, 3, 0), 123400),
    new TimeEntry('aClient', new Date(2019, 2, 15, 10, 20, 3, 0), 123400)
  ];
  
  expect(actual).toStrictEqual(expected);

});
