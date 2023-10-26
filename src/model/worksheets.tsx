export class WorksheetsModel {
  private workSheetsMainId?: string;
  private workSheetsId?: string;
  private workSheetsType?: string;
  private name?: string;
  private imageUrl?: string;
  private price?: WorkSheetsDetailPrice;
  private conditionStr?: string;
  private relationship?: string[];
  private discount?: number;
  private paper?: string;
  private root?: string;
  private filename?: string[];
  private fileUrlDownload?: string[];

  constructor(worksheetsModelInput: WorksheetsModelInput) {
    this.workSheetsMainId = worksheetsModelInput.workSheetsMainId;
    this.workSheetsId = worksheetsModelInput.workSheetsId;
    this.workSheetsType = worksheetsModelInput.workSheetsType;
    this.name = worksheetsModelInput.name;
    this.imageUrl = worksheetsModelInput.imageUrl;
    this.price = worksheetsModelInput.price;
    this.conditionStr = worksheetsModelInput.conditionStr;
    this.relationship = worksheetsModelInput.relationship;
    this.discount = worksheetsModelInput.discount;
    this.paper = String(worksheetsModelInput.paper);
    this.root = worksheetsModelInput.root;
    this.filename = worksheetsModelInput.filename;
    this.fileUrlDownload = worksheetsModelInput.fileUrlDownload;
  }

  public getWorksheets(): WorksheetsModelInput | undefined {
    if (
      this.workSheetsId &&
      this.workSheetsType &&
      this.name &&
      this.price &&
      this.paper &&
      this.workSheetsMainId
    ) {
      return {
        workSheetsMainId: this.workSheetsMainId,
        workSheetsId: this.workSheetsId,
        workSheetsType: this.workSheetsType,
        name: this.name,
        imageUrl: this.imageUrl,
        price: this.price,
        conditionStr: this.conditionStr,
        relationship: this.relationship,
        discount: this.discount,
        paper: this.paper,
        root: this.root,
        filename: this.filename,
        fileUrlDownload: this.fileUrlDownload,
      };
    } else {
      console.error("WorksheetsModelInput is null");
    }
  }
}
