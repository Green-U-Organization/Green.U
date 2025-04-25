// Externals
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    prepareHeaders: async (headers) => {
      // const accessToken = // from cookie

      // if (accessToken) {
      //   headers.set('Authorization', `bearer ${accessToken}`);
      // }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
