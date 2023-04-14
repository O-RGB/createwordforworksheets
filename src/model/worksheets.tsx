export class WorksheetsModel {
  private workSheetsId?: string;
  private workSheetsType?: WorkSheetsType;
  private name?: string;
  private imageUrl?: string;
  private price?: WorkSheetsDetailPrice;
  private conditionStr?: string;
  private relationship?: string[];

  constructor(worksheetsModelInput: WorksheetsModelInput) {
    this.workSheetsId = worksheetsModelInput.workSheetsId;
    this.workSheetsType = worksheetsModelInput.workSheetsType;
    this.name = worksheetsModelInput.name;
    this.imageUrl = worksheetsModelInput.imageUrl;
    this.price = worksheetsModelInput.price;
    this.conditionStr = worksheetsModelInput.conditionStr;
    this.relationship = worksheetsModelInput.relationship;
  }

  public getWorksheets(): WorksheetsModelInput | undefined {
    if (
      this.workSheetsId &&
      this.workSheetsType &&
      this.name &&
      this.imageUrl &&
      this.price &&
      this.conditionStr &&
      this.relationship
    ) {
      return {
        workSheetsId: this.workSheetsId,
        workSheetsType: this.workSheetsType,
        name: this.name,
        imageUrl: this.imageUrl,
        price: this.price,
        conditionStr: this.conditionStr,
        relationship: this.relationship,
      };
    } else {
      console.error("WorksheetsModelInput is null");
    }
  }
}
