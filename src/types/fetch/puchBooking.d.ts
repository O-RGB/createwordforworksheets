interface IPushBooking {
  type: string;
  list: string;
  price: string;
  facebook: string;
  address: string;
  shippingcost: string;
  paper: string;
  actor: string;
}

interface IPushBookingResult {
  message: string;
  status: boolean;
  data?: ProductModelDataList;
}

interface ProductModelDataList {
  list: ProductModelData[];
}

interface ProductModelData {
  type: string;
  list: string;
  count: number;
  price: number;
  paper: string;
  sum: number;
  del: string;
  all: string;
  face: string;
  address: string;
  urlprint: string;
  kerry: string;
  date: string;
  status: string;
  actor: string;
  createUrl: string;
  encodeRowId: string;
}
