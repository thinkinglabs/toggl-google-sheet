import { TimesheetRenderer } from './TimesheetRenderer.js';
import { Timesheet, TimesheetDayEntry } from './Timesheet.js';
import { FetchTimesheet } from './FetchTimesheet.js';
import { GoogleSpreadsheetAdapter, GoogleSheetAdapter } from './GoogleSheetAdapter.js';

jest.mock('./FetchTimesheet.js');
jest.mock('./GoogleSheetAdapter.js');

const workspaceId = '1234';
const timesheetDate = new Date(2020, 2, 11, 17, 41, 3, 111);

const mockExecute = jest.fn();
const mockRenderTitles = jest.fn();
const mockRenderRow = jest.fn();
const mockRenderDaysWorked = jest.fn();
const mockAutoResizeColumns = jest.fn();

beforeAll(() => {
  FetchTimesheet.mockImplementation(() => {
    return { execute: mockExecute }
  });

  GoogleSheetAdapter.mockImplementation(() => {
    return {
      renderTitles: mockRenderTitles,
      renderRow: mockRenderRow,
      autoResizeColumns: mockAutoResizeColumns,
      renderDaysWorked: mockRenderDaysWorked
    }
  });

  GoogleSpreadsheetAdapter.mockImplementation(() => {
    return {
      replaceOrAppendSheet: () => {
        return new GoogleSheetAdapter();
      }
    };
  });
});

beforeEach(() => {
  mockExecute.mockClear();
  mockRenderTitles.mockClear();
  mockRenderRow.mockClear();
  mockAutoResizeColumns.mockClear();
  mockRenderDaysWorked.mockClear();
});

describe("TimesheetRenderer", () => {

  test("render empty timesheet", () => {
    mockExecute.mockReturnValue(new Timesheet());
    
    const renderer = new TimesheetRenderer(new FetchTimesheet(), new GoogleSpreadsheetAdapter());    
    renderer.render(workspaceId, timesheetDate);

    expect(mockRenderTitles).toHaveBeenCalledTimes(1);
    expect(mockRenderTitles).toHaveBeenCalledWith("Date", "Customer", "Duration");
    expect(mockRenderRow).toHaveBeenCalledTimes(0);
    expect(mockAutoResizeColumns).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledWith(0);
  });

  test("render timesheet having one row", () => {
    const two_hours = 2*1000*60*60;
    const timesheet = new Timesheet([
        new TimesheetDayEntry(new Date(2020,2,13), {aClientA:two_hours})
      ]);
    mockExecute.mockReturnValue(timesheet);
    
    const renderer = new TimesheetRenderer(new FetchTimesheet(), new GoogleSpreadsheetAdapter());    
    renderer.render(workspaceId, timesheetDate);

    expect(mockRenderTitles).toHaveBeenCalledTimes(1);
    expect(mockRenderTitles).toHaveBeenCalledWith("Date", "Customer", "Duration");
    expect(mockRenderRow).toHaveBeenCalledTimes(1);
    expect(mockRenderRow).toHaveBeenCalledWith(2, new Date(2020,2,13), "aClientA", "02:00:00");
    expect(mockAutoResizeColumns).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledWith(1);
  });

  test("render timesheet having two rows", () => {
    const one_hour = 1*1000*60*60;
    const timesheet = new Timesheet([
        new TimesheetDayEntry(new Date(2020,2,13), {aClientA:one_hour, aClientB:one_hour})
      ]);
    mockExecute.mockReturnValue(timesheet);
    
    const renderer = new TimesheetRenderer(new FetchTimesheet(), new GoogleSpreadsheetAdapter());    
    renderer.render(workspaceId, timesheetDate);

    expect(mockRenderTitles).toHaveBeenCalledTimes(1);
    expect(mockRenderTitles).toHaveBeenCalledWith("Date", "Customer", "Duration");
    expect(mockRenderRow).toHaveBeenCalledTimes(2);
    expect(mockRenderRow).toHaveBeenCalledWith(2, new Date(2020,2,13), "aClientA", "01:00:00");
    expect(mockRenderRow).toHaveBeenCalledWith(3, new Date(2020,2,13), "aClientB", "01:00:00");
    expect(mockAutoResizeColumns).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledWith(1);
  });

  test("render timesheet having four rows", () => {
    const half_an_hour = 1/2*1000*60*60;
    const one_hour = 1*1000*60*60;
    const two_hours = 2*1000*60*60;
    const three_hours = 3*1000*60*60;
    const four_hours = 4*1000*60*60;
    const timesheet = new Timesheet([
        new TimesheetDayEntry(new Date(2020,2,13), {aClientA:one_hour, aClientB:half_an_hour}),
        new TimesheetDayEntry(new Date(2020,2,14), {aClientA:two_hours, aClientC:three_hours}),
        new TimesheetDayEntry(new Date(2020,2,15), {aClientD:four_hours})
      ]);
    mockExecute.mockReturnValue(timesheet);
    
    const renderer = new TimesheetRenderer(new FetchTimesheet(), new GoogleSpreadsheetAdapter());    
    renderer.render(workspaceId, timesheetDate);

    expect(mockRenderTitles).toHaveBeenCalledTimes(1);
    expect(mockRenderTitles).toHaveBeenCalledWith("Date", "Customer", "Duration");
    expect(mockRenderRow).toHaveBeenCalledTimes(5);
    expect(mockRenderRow).toHaveBeenCalledWith(2, new Date(2020,2,13), "aClientA", "01:00:00");
    expect(mockRenderRow).toHaveBeenCalledWith(3, new Date(2020,2,13), "aClientB", "00:30:00");
    expect(mockRenderRow).toHaveBeenCalledWith(4, new Date(2020,2,14), "aClientA", "02:00:00");
    expect(mockRenderRow).toHaveBeenCalledWith(5, new Date(2020,2,14), "aClientC", "03:00:00");
    expect(mockRenderRow).toHaveBeenCalledWith(6, new Date(2020,2,15), "aClientD", "04:00:00");
    expect(mockAutoResizeColumns).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledTimes(1);
    expect(mockRenderDaysWorked).toHaveBeenCalledWith(2);
  });
});
