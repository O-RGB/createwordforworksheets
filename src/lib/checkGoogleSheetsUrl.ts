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

export const setFbToken = (output: IFacebookTokenInput) => {
  setLocal("facebookToken", output.facebookToken);
};

export const getFbToken = () => {
  let fbToken = getLocal("facebookToken");
  return {
    fbToken,
  };
};

export const getVersion = () => {
  let version = getLocal("app_script_version");
  return {
    version,
  };
};
export const setVersion = (version: string) => {
  setLocal("app_script_version", version);
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
