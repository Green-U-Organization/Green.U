import Cookies from 'js-cookie';

type utils = {
  userXp: number;
};

// Configuration
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict' as const,
  expires: 1,
};

export const setUtilsCookies = (utils: utils) => {
  Cookies.set('utils', JSON.stringify(utils), COOKIE_OPTIONS);
};

export const getUtilsCookies = () => {
  if (Cookies.get('utils')) {
    JSON.parse(Cookies.get('utils')!);
  }
};

export const clearSelectedGardenCookies = () => {
  Cookies.remove('utils');
};
