import { apiSlice } from "./apiSlice";

const userUrl = "/user";
const domainUrl = "/domain";
const smtpUrl = "/smtp";
const emailUrl = "/mail";
const selectUrl = "/select";
const companyUrl = "/company";
const packageUrl = "/package";

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
      invalidatesTags: ["Domain"],
    }),
    getDnsRecords: builder.query({
      query: (data) => ({
        url: `${domainUrl}/domain.php`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Domain"],
    }),
    domainList: builder.query({
      query: (data) => ({
        url: `${domainUrl}/domain_list.php`,
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
      invalidatesTags: ["Domain"],
    }),
    deleteDomain: builder.mutation({
      query: (data) => ({
        url: `${domainUrl}/delete_domain.php`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Domain"],
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
    getTableList: builder.query({
      query: (data) => ({
        url: `${selectUrl}/list.php`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Select"],
    }),
    getCompanyDetails: builder.query({
      query: (data) => ({
        url: `${companyUrl}/get_company.php`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Company"],
    }),
    editCompanyDetails: builder.mutation({
      query: (data) => ({
        url: `${companyUrl}/edit_company.php`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Company"],
    }),
    getPackageList: builder.query({
      query: (data) => ({
        url: `${packageUrl}/list.php`,
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
  useDeleteDomainMutation,
  useCreateSmtpUserMutation,
  useEditSmtpUserMutation,
  useDeleteSmtpUserMutation,
  useGetEmailActivityQuery,
  useGetTableListQuery,
  useGetCompanyDetailsQuery,
  useEditCompanyDetailsMutation,
  useGetPackageListQuery,
} = userApiSlice;
