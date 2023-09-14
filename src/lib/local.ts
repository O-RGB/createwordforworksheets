export const crendentialKeys: { [key: string]: string } = {
  username: "username",
  googlesheets: "googlesheets",
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
