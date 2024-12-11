const TOKEN_KEY = "jwt";

export const setToken = (res) => localStorage.setItem(TOKEN_KEY, res.token);

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
