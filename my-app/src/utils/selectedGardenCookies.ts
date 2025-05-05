import Cookies from 'js-cookie';
import { Garden } from './types';

type selectedGarden = Garden;

// Configuration
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict' as const,
  expires: 1,
};

export const setSelectedGardenCookies = (garden: selectedGarden) => {
  Cookies.set('selected_garden', JSON.stringify(garden), COOKIE_OPTIONS);
};

export const getSelectedGardenCookies = () => {
  if (Cookies.get('selected_garden')) {
    JSON.parse(Cookies.get('selected_garden')!);
  }
};

export const clearSelectedGardenCookies = () => {
  Cookies.remove('selected_garden');
};
