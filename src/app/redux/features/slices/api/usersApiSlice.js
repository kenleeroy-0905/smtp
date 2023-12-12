import { apiSlice } from "./apiSlice";

const userUrl = "/user";
const domainUrl = "/domain";
const smtpUrl = "/smtp";
const emailUrl = "/mail";

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
      providesTags: ["Domain"],
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
      providesTags: ["Domain"],
    }),
    createSmtpUser: builder.mutation({
      query: (data) => ({
        url: `${smtpUrl}/create_user.php`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Domain"],
    }),
    editSmtpUser: builder.mutation({
      query: (data) => ({
        url: `${smtpUrl}/edit_user.php`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Domain"],
    }),
    deleteSmtpUser: builder.mutation({
      query: (data) => ({
        url: `${smtpUrl}/delete_user.php`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Domain"],
    }),
    getEmailActivity: builder.query({
      query: (data) => ({
        url: `${emailUrl}/email_activity.php`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Email"],
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
  useEditSmtpUserMutation,
  useDeleteSmtpUserMutation,
  useGetEmailActivityQuery,
} = userApiSlice;
