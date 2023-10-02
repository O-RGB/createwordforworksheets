interface IFileGoogleDrive {
  subject: string;
  email: string;
  path: string;
  fileNames: string[];
  reault: IFileGoogleDriveReslutFile[];
}

interface IFileGoogleDriveReslutFile {
  content: string;
  filename: string;
  mimeType: string;
}

interface IFileGoogleDriveInput {
  path: string;
  email: string;
  fileNames: string[];
  subject: string;
}

interface ISenttEmailCompo {
  url: string;
  objWorkinput: IFileGoogleDriveInput;
  workUI: WorksheetsModelInput;
}
