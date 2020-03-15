# Toggl Google Sheet [![Build Status](https://travis-ci.org/thinkinglabs/toggl-google-sheet.svg?branch=master)](https://travis-ci.org/thinkinglabs/toggl-google-sheet)

This Google Apps script imports time entries from Toggl.com into a Google Sheet
using their [Detailed Report API](https://github.com/toggl/toggl_api_docs/blob/master/reports/detailed.md).

For a given month it aggregates the time entries per day and per customer.

## Installation

### Simple

Open [this Google Sheet](https://docs.google.com/spreadsheets/d/1rXMdRwkMCeC2kq0yEMb54Y8SU2DUk-TFOJ0gxgBugEk/edit?usp=sharing)
and make a copy in your Google Drive account.

### From scratch

Create a new Google Sheet.

Create a new script in your newly created Google Sheet and paste the contents of
all of the `src/*.gs` files in their respective script files.

Rename the first sheet as _Config_.

Add the following information in cell A1 of the _Config_ sheet:

| |A: Variable   |B: Value                 | C: Description     |
|-|--------------|-------------------------|--------------------|
|1|timesheetDate | 01/01/2015              | Timesheet Month    |
|2|workspaceId   | _workspaceId_           | Toggl Workspace Id |
|3|apiToken      | _your toggle api token_ | Toggl API Token    |

To figure out your *workspace_id*: go to Team in toggl.com. The number at the
end of the URL is the workspace id.

To figure out your *api_token*: go to your Profile in toggl.com, your API token
is at the bottom of the page.

## Usage

Re-open your Google Sheet. Now you will have a new menu called "*Toggl*" with a
sub-menu "*Get Timesheet for Month*".

Fill a date of the month you want to import in cell B1. If you want your
timesheet for December 2014, fill the date 01/12/2014 and click *Toggl > Get
Timesheet for Month*.

It also calculates the number of days worked during that month.

## Implementation

Google App Scripts only supports EcmaScript 5 because it is powered by Mozilla's
Rhina Javascript Interpreter.

_toggl-google-sheet_ is written in ES6 (aka EcmaScript2015). But the codebase
still implements classes the old way using functions. That is because of
historical reasons. The codebase started in full ES5 mode as a pure hack.
Gradually, it got refactored by introducing classes, the hexagonal
architecture and DDD concepts.

Webpack and Babel are used to transpile ES6 to ES5.

- `./src/Code.js` : contains the global functions required by Google Apps Script
  written in ES5.
- `./src/App.js` : entry point for Webpack bundle. Here we can use ES6 modules
  written in ES6. The bundle is exposed as a global variable `app` to `Code.js`.

Since early 2020, Google App Scripts is now supported by the V8 Runtime that
powers Chrome and Node.js. But ES6 modules are not yet supported.

Because ES6 modules are not supported, there is still value in transpiling. And,
the right now the Google Sheets still use the Rhino powered Google App Scripts.

## Run tests

To run the tests:

```bash
npm install
npm test
```

Tests are implemented using [Jest](https://jestjs.io/en/).

## Build

To transpile the ES6 to ES5 for Google Apps Script:

```bash
npm run build
```

## Acknowledgment

[koen-github](https://github.com/koen-github) for providing an example on how to
use the Toggl API with Google Sheet.

[GSmart.in](https://github.com/gsmart-in) for providing an [example of using ES6
and webpack/babel for Google Apps Script](https://github.com/gsmart-in/AppsCurryStep2).
See also [Creating a complete web app on Google Apps Script using Google Sheet
as database](https://dev.to/prasanthmj/creating-a-complete-web-app-on-google-apps-script-using-google-sheet-as-database-26o8).
