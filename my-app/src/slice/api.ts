// Externals
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: 'include',
    // prepareHeaders: async (headers) => {
    //   const accessToken = localStorage.getItem('token'); // A VOIR PIOUR LES CHOPER DES COOKIES

    //   if (accessToken) {
    //     headers.set('Authorization', `bearer ${accessToken}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export default api;
