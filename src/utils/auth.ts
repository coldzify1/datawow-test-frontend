import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = '__accessToken';

export const setToken = (token: string, expires = 1) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires });
};
export const logout = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
};
export const isAuthenticated = () => {
  return !!Cookies.get(AUTH_TOKEN_KEY);
};
export const getToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY) || null;
};