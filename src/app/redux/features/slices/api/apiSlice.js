import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Dns", "Domain", "Smtp", "Email", "Select", "Company"],
  endpoints: (builder) => ({}),
});
