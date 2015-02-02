# Toggl Google Sheet

This Google Apps script imports time entries from Toggl.com into a Google Sheet using their [Detailed Report API](https://github.com/toggl/toggl_api_docs/blob/master/reports/detailed.md).

For a given month it aggregates the time entries per day and per customer.

## Installation
Create a new Google Sheet.

Create a new script in your newly created Google Sheet and paste the contents of the files `Code.gs`, `Dates.gs` and `Toggl.gs` in their respective script files.

Edit `Toggl.gs` to fill in your *workspace_id* and *api_token*.

To figure out your *workspace_id*: go to Team in toggl.com. The number at the end of the URL is the workspace id.

To figure out your *api_token*: go to your Profile in toggl.com, your API token is at the bottom of the page.

## Usage
After a reopen of your Google Sheet you will have a new menu open called "*Toggl*" with a sub-menu "*Get Timesheet for Month*". 

Fill a date of the month you want to import in cell B1. So if you want your timesheet for December 2014, fill the date 01/12/2014 and click *Toggl > Get Timesheet for Month*.

In addition it also calculates the number of meal vouchers you are entitled to receive for that month (which is a Belgian invention to lower personal income taxes).


