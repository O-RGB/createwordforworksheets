import { getLocal, setLocal } from "./local";

export const setUsernameOrURL = (output: IUserInput) => {
  if (output.username) {
    setLocal("username", output.username);
  }

  if (output.googlesheets) {
    setLocal("googlesheets", output.googlesheets);
  }
};

export const getUsernameAndURL = () => {
  let username = getLocal("username");
  let sheets = getLocal("googlesheets");
  return {
    username,
    sheets,
  };
};

export const CheckUsernameAndURLIsRuning = async () => {
  let username = getLocal("username");
  let sheets = getLocal("googlesheets");

  if (!sheets || !username) {
    return {
      local: {
        username: username,
        sheets: sheets,
      },
      result: false,
    };
  } else {
    return {
      local: {
        username: username,
        sheets: sheets,
      },
      result: true,
    };
  }
};
