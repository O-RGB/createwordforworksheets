import { WorksheetsModel } from "./worksheets";

export class HeadWorkSheets {
  private formName?: string;
  private headerTitle?: string;
  private worksheets?: WorksheetsModel[];
  private relationship?: string[][];

  constructor(headWorkSheetsInput: HeadWorkSheetsInput<WorksheetsModel>) {
    this.formName = headWorkSheetsInput.formName;
    this.headerTitle = headWorkSheetsInput.headerTitle;
    this.worksheets = headWorkSheetsInput.worksheets;
    this.relationship = headWorkSheetsInput.relationship;
  }

  public getHeadWorksheets(): HeadWorkSheetsInput<WorksheetsModel> {
    return {
      formName: this.formName,
      headerTitle: this.headerTitle,
      worksheets: this.worksheets,
      relationship: this.relationship,
    };
  }
}
