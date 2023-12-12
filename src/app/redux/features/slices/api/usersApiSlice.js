import { apiSlice } from "./apiSlice";

const userUrl = "/user";
const domainUrl = "/domain";
const smtpUrl = "/smtp";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${userUrl}/login.php`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: `${userUrl}/signup.php`,
        method: "POST",
        body: credentials,
      }),
    }),
    resendEmailVerification: builder.mutation({
      query: (token) => ({
        url: `${userUrl}/resend-verification.php`,
        method: "POST",
        body: token,
      }),
    }),
    addDomain: builder.mutation({
      query: (data) => ({
        url: `${domainUrl}/create_domain.php`,
        method: "POST",
        body: data,
      }),
    }),
    getDnsRecords: builder.query({
      query: (data) => ({
        url: `${domainUrl}/domain.php`,
        method: "POST",
        body: data,
      }),
    }),
    verifyDomain: builder.mutation({
      query: (data) => ({
        url: `${domainUrl}/verify_domain.php`,
        method: "POST",
        body: data,
      }),
    }),
    domainList: builder.query({
      query: (data) => ({
        url: `${domainUrl}/domain_list.php`,
        method: "POST",
        body: data,
      }),
    }),
    createSmtpUser: builder.mutation({
      query: (data) => ({
        url: `${smtpUrl}/create_user.php`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResendEmailVerificationMutation,
  useAddDomainMutation,
  useGetDnsRecordsQuery,
  useVerifyDomainMutation,
  useDomainListQuery,
  useCreateSmtpUserMutation,
} = userApiSlice;
