# Toggl Google Sheet [![Build Status](https://travis-ci.org/thinkinglabs/toggl-google-sheet.svg?branch=master)](https://travis-ci.org/thinkinglabs/toggl-google-sheet)

This Google Apps script imports time entries from Toggl.com into a Google Sheet using their [Detailed Report API](https://github.com/toggl/toggl_api_docs/blob/master/reports/detailed.md).

For a given month it aggregates the time entries per day and per customer.

## Installation

### Simple

Open [this Google Sheet](https://docs.google.com/spreadsheets/d/1rXMdRwkMCeC2kq0yEMb54Y8SU2DUk-TFOJ0gxgBugEk/edit?usp=sharing) and make a copy in your Google Drive account.

### From scratch

Create a new Google Sheet.

Create a new script in your newly created Google Sheet and paste the contents of all of the `src/*.gs` files in their respective script files.

Rename the first sheet as _Config_.

Add the following information in cell A1 of the _Config_ sheet:

| |A: Variable   |B: Value                 | C: Description     |
|-|--------------|-------------------------|--------------------|
|1|timesheetDate | 01/01/2015              | Timesheet Month    |
|2|workspaceId   | _workspaceId_           | Toggl Workspace Id |
|3|apiToken      | _your toggle api token_ | Toggl API Token    |

To figure out your *workspace_id*: go to Team in toggl.com. The number at the end of the URL is the workspace id.

To figure out your *api_token*: go to your Profile in toggl.com, your API token is at the bottom of the page.

## Usage

Re-open your Google Sheet. Now you will have a new menu called "*Toggl*" with a sub-menu "*Get Timesheet for Month*". 

Fill a date of the month you want to import in cell B1. If you want your timesheet for December 2014, fill the date 01/12/2014 and click *Toggl > Get Timesheet for Month*.

It also calculates the number of days worked during that month.

## Run tests

To run the tests:

```bash
npm install
npm test
```

Tests are implemented using [QUnit](https://qunitjs.com/). Apparently Google App Scripts only supports EcmaScript 5.
Qunit seems to be the only test framework that still supports ES5.

`test/fixture.html` loads all the code and test code. The tests are executed inside a headless PhantomJS browser.

## Acknowledgment

Credits go to [koen-github](https://github.com/koen-github) which provided an example on how to use the Toggl API with Google Sheet.
