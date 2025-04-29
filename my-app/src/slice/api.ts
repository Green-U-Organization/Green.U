// Externals
import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthCookies } from '../utils/authCookies';

type LoginUserRequest = {
  email: string;
  password: string;
};

type LoginUserResponse = {
  isEmpty: boolean;
  message: string;
  content: {
    id: number;
    username: string;
  };
  token: string;
};

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    mode: 'cors',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const { accessToken } = getAuthCookies();

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      transformResponse: (response: LoginUserResponse) => {
        // Stockez le token dans le state et localStorage en fallback
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
    }),
  }),
});

export default api;
