interface IFileGoogleDrive {
  subject: string;
  email: string;
  path: string;
  rootToFile: string[];
  fileNames: string[];
  reault: IFileGoogleDriveReslutFile;
}

interface IFileGoogleDriveReslutFile {
  LabelType: string;
}

interface IFileGoogleDriveInput {
  path: string;
  email: string;
  fileNames: string[];
  subject: string;
  rootToFile: string[];
}

interface ISenttEmailCompo {
  url: string;
  objWorkinput: IFileGoogleDriveInput;
  workUI: WorksheetsModelInput;
}
