import { getLocal, setLocal } from "./local";

export const setPasswordDecodePDF = (password: string) => {
  setLocal("pdfPassword", password);
};

export const getPasswordDecodePDF = () => {
  return getLocal("pdfPassword");
};
