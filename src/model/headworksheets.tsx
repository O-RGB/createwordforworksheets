import { WorksheetsModel } from "./worksheets";

export class HeadWorkSheets {
  private formName?: string;
  private headerTitle?: string;
  private worksheets?: WorksheetsModel[];

  constructor(headWorkSheetsInput: HeadWorkSheetsInput<WorksheetsModel>) {
    this.formName = headWorkSheetsInput.formName;
    this.headerTitle = headWorkSheetsInput.headerTitle;
    this.worksheets = headWorkSheetsInput.worksheets;
  }

  public getHeadWorksheets(): HeadWorkSheetsInput<WorksheetsModel> {
    return {
      formName: this.formName,
      headerTitle: this.headerTitle,
      worksheets: this.worksheets,
    };
  }
}
