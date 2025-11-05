import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface Movie {
  id: number;
  title: string;
  posterURL?: string;
}
export const moviesApi = createApi({
  reducerPath: 'moviesApi',  // name for slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.sampleapis.com/movies/' }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], { page: number; limit: number }>({
      // Simulate pagination
      query: () => `drama`,
      transformResponse: (response: Movie[], _, { page, limit }) => {
        const start = (page - 1) * limit;
        return response.slice(start, start + limit);
      },
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
