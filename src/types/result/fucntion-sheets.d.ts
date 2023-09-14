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
  type: string;
  paper: string;
  items?: IPreparItemsSheets[];
}

interface IItemsToURL {
  type: string;
  list: string[];
  price: string[];
  facebook: string;
  address: string;
  shippingcost: string;
  paper: string[];
}
