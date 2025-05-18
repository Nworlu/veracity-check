
export const _getToken = async () => {
  return await localStorage.getItem("$token_key");
};
export const _destoryToken = async () => {
  return await localStorage.removeItem("$token_key");
};

export const _setToken = async (value:string) => {
  return await localStorage.setItem("$token_key", value);
};

export const _getEmail = async () => {
  return await localStorage.getItem("$email_key");
};

export const _setEmail = async (value:string) => {
  return await localStorage.setItem("$email_key", value);
};

export const _getStorage = async (key:string) => {
  return await localStorage.getItem(key);
};

export const _setStorage = async (key:string, value:string) => {
  return await localStorage.setItem(key, value);
};
export const _removeStorage = async (key:string) => {
  return await localStorage.removeItem(key);
};
