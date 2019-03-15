QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test('parseISODateTime', function( assert ) {
  var actual = parseISODateTime('2019-03-15T10:20:03');
  var expected = new Date(2019, 2, 15, 10, 20, 3);
  assert.deepEqual(actual, expected, 'Passed!');
});

QUnit.test("ToggleRepository.detailedReport pagination", function( assert ) {
  var apiToken = 12345;

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