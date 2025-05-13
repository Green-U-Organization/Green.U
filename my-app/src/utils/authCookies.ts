import Cookies from 'js-cookie';

// Types
type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

type UserData = {
  username: string;
  id: number;
  xp: number;
};

// Configuration
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict' as const,
  expires: 1,
};

// Méthodes d'accès
export const setAuthCookies = (tokens: AuthTokens, user: UserData) => {
  Cookies.set('access_token', tokens.accessToken, COOKIE_OPTIONS);
  if (tokens.refreshToken) {
    Cookies.set('refresh_token', tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: 7, // 7 jours pour le refresh token
    });
  }
  Cookies.set('user_data', JSON.stringify(user), COOKIE_OPTIONS);
};

export const getAuthCookies = () => ({
  accessToken: Cookies.get('access_token'),
  refreshToken: Cookies.get('refresh_token'),
  user: Cookies.get('user_data') ? JSON.parse(Cookies.get('user_data')!) : null,
  id: Cookies.get('user_data') ? Cookies.get('user_data')! : null,
  xp: Cookies.get('user_data') ? Cookies.get('user_data')! : null,
});

export const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user_data');
};
