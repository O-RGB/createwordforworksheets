interface IGetConfigNgrok {
  key: string;
}

interface IReslutConfigNgrok {
  configData: string;
}

// {
//     "recipient": "ok.oza5555@gmail.com",
//     "subject": "คณิตศาสตร์อนุบาล 1",
//     "filepaths": [
//       "config.json"
//     ]
//   }

interface ISendMailNgrok {
  recipient: string;
  subject: string;
  filepaths: string[];
}

interface ISendMailResultNgrok {
  message: string;
  status: string;
}
