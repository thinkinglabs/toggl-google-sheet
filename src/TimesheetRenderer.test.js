import { TimesheetRenderer } from './TimesheetRenderer.js';
import { Timesheet } from './Timesheet.js';
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

describe("TimesheetRenderer", () => {

  test("render", () => {
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

});
