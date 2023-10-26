interface IGetConfigNgrok {
  key: string;
}

interface IReslutConfigNgrok {
  configData: string;
}

interface ISendMailNgrok {
  recipient: string;
  subject: string;
  filepaths: string[];
}

interface ISendMailResultNgrok {
  message: string;
  status: string;
}
