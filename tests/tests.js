QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test('parseISODateTime', function( assert ) {
  var actual = parseISODateTime('2019-03-15T10:20:03');
  var expected = new Date(2019, 2, 15, 10, 20, 3);
  assert.deepEqual(actual, expected, 'Passed!');
});

function MockRequests(result) {
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

QUnit.test("ToggleRepository.detailedReport pagination", function( assert ) {
  var apiToken = 12345;

  var togglRepository = new TogglRepository(apiToken, new MockRequests({
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
    new TimeEntry('aClient', new Date(2019, 2, 15, 10, 20, 03, 0), 123400),
    new TimeEntry('aClient', new Date(2019, 2, 15, 10, 20, 03, 0), 123400),
    new TimeEntry('aClient', new Date(2019, 2, 15, 10, 20, 03, 0), 123400)
  ];
  
  assert.deepEqual(actual, expected, 'Passed!');

});

function MockToggleRepository(result) {
  this.detailedReport = function(workspaceId, since, until) {
    return result;
  }
}

QUnit.test("FetchTimesheet.execute one client on one day", function( assert ) {

  var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
    new TimeEntry('aClient', new Date(2019, 2, 1, 10, 2), 5)
  ]));

  var actual = fetchTimesheet.execute('aWorkspaceId', '2019-03-01', '2019-03-15');
  var expected = [];
  expected[1] = {'aClient': 5};

  assert.deepEqual(actual, expected, 'Passed!')
});

QUnit.test("FetchTimesheet.execute one client on one day multiple entries", function( assert ) {

  var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
    new TimeEntry('aClient', new Date(2019, 2, 1, 9, 5), 5),
    new TimeEntry('aClient', new Date(2019, 2, 1, 10, 2), 10),
    new TimeEntry('aClient', new Date(2019, 2, 1, 11, 21), 14)
  ]));

  var actual = fetchTimesheet.execute('aWorkspaceId', '2019-03-01', '2019-03-15');
  var expected = [];
  expected[1] = {'aClient': 29};

  assert.deepEqual(actual, expected, 'Passed!')
});

QUnit.test("FetchTimesheet.execute two clients on one day", function( assert ) {

  var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
    new TimeEntry('clientA', new Date(2019, 2, 1, 10, 2), 5),
    new TimeEntry('clientB', new Date(2019, 2, 1, 9, 5), 6)
  ]));

  var actual = fetchTimesheet.execute('aWorkspaceId', '2019-03-01', '2019-03-15');
  var expected = [];
  expected[1] = {'clientA': 5, 'clientB': 6};

  assert.deepEqual(actual, expected, 'Passed!')
});

QUnit.test("FetchTimesheet.execute one client on two days", function( assert ) {

  var fetchTimesheet = new FetchTimesheet(new MockLogger(), new MockToggleRepository([
    new TimeEntry('aClient', new Date(2019, 2, 1, 10, 2), 5),
    new TimeEntry('aClient', new Date(2019, 2, 3, 9, 5), 6)
  ]));

  var actual = fetchTimesheet.execute('aWorkspaceId', '2019-03-01', '2019-03-15');
  var expected = [];
  expected[1] = {'aClient': 5 };
  expected[3] = {'aClient': 6 };

  assert.deepEqual(actual, expected, 'Passed!')
});