interface IMapDataToSheets {
  id: string;
  mode: string;
}

interface IInitMainData {
  id: string;
  name: string;
  price: WorkSheetsDetailPrice;
  priceOfStr?: string;
  paper: string;
  imagePerview?: string;
}

interface IPreparItemsSheets {
  name: string;
  price: string;
  paper: stirng;
}

interface IPreparDataFormSheets {
  address: string;
  shippingcost: string;
  paper: string;
  facebook: string;
  facebook_url: string;
  type: string;
  paper: string;
  items?: IPreparItemsSheets[];
}

interface IItemsToURL {
  type: string;
  list: string[];
  price: string[];
  facebook: string;
  selectId?: string;
  chatType?: number;
  address: string;
  shippingcost: string;
  paper: string[];
}
