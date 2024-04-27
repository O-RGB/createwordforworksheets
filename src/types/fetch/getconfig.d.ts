//Base API Input
interface IGetConfig {
  key: string;
}

interface IReslutConfig {
  configData: string;
}

// API Interfase

interface ISendMailNgrok {
  recipient: string;
  subject: string;
  filepaths: string[];
  removePassword?: string;
}

interface ISendMailResultNgrok {
  message: string;
  status: string;
}
