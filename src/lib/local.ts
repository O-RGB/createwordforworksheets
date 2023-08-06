const crendentialKeys: { [key: string]: string } = {
  delivery_fee: "delivery_fee",
  book_price: "book_price",
};

export const setLocal = (key: string, value: any) => {
  const setToken = localStorage.setItem(key, value);
  return true;
};

export const getLocal = (key: string) => {
  return localStorage.getItem(key) || null;
};

export const destryoAllCredential = () => {
  localStorage.clear();
  return true;
};
