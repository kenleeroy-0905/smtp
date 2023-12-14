import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTextFieldComponent from "../components/common/CustomTextField";
import CompanyProfileSelectComponent from "../components/common/CompanyProfileSelectComponent";
import SimpleBackdrop from "../components/common/Backdrop";
import { setIsGlobalLoading } from "../app/redux/features/slices/global/globalSlice";
import {
  useEditCompanyDetailsMutation,
  useGetCompanyDetailsQuery,
} from "../app/redux/features/slices/api/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeCompany = useSelector((state) => state.user.activeCompany);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { data, isLoading } = useGetCompanyDetailsQuery({
    token: userInfo.token,
    id: activeCompany?.id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.data?.name,
    website: data?.data?.website,
    address: data?.data?.address,
    city: data?.data?.city,
    country: data?.data?.country === "0" ? "" : data?.data?.country,
    zip_code: data?.data?.zip_code,
    role_company:
      data?.data?.role_company === "0" ? "" : data?.data?.role_company,
    count_employees:
      data?.data?.count_employees === "0" ? "" : data?.data?.count_employees,
    type_project:
      data?.data?.type_project === "0" ? "" : data?.data?.type_project,
    tell_us: data?.data?.tell_us,
    old_service: data?.data?.old_service === "0" ? "" : data?.data?.old_service,
    count_emails_per_month:
      data?.data?.count_emails_per_month === "0"
        ? ""
        : data?.data?.count_emails_per_month,
  });
  const [initialFormData, setInitialFormData] = useState(formData);

  const [editCompany] = useEditCompanyDetailsMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsGlobalLoading(true));
    setIsSubmitting(true);

    // Create an object to store the fields that have changed
    let changedFields = {};

    // Iterate over the keys in the formData object
    for (let key in formData) {
      // If the current value is different from the initial value
      if (formData[key] !== initialFormData[key]) {
        // Add this field to the changedFields object
        changedFields[key] = formData[key];
      }
    }

    try {
      const res = await editCompany({
        token: userInfo.token,
        company_id: activeCompany.id,
        ...changedFields,
      }).unwrap();
      if (res.status === "success") {
        console.log(res);
        dispatch(setIsGlobalLoading(false));
        setIsSubmitting(false);
        toast.success("Company details updated successfully");
        navigate("/dashboard");
      } else {
        dispatch(setIsGlobalLoading(false));
        setIsSubmitting(false);
        toast.error("Can't update company details. Please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isSubmitting && <SimpleBackdrop status={isSubmitting} />}

      <Grid container mt={4}>
        <Grid
          item
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            Finish setting up your account profile
          </Typography>
        </Grid>
        <Box
          bgcolor={"#fff"}
          borderRadius={1}
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"start"}
          gap={2}
          flexDirection={"column"}
          p={2.5}
          my={3}
          border={".5px solid #11a4b0"}
          boxShadow={"0px 0px 5px 0px rgba(0,0,0,0.1)"}
        >
          <Typography variant="h6" fontWeight={"600"}>
            Company Details
          </Typography>
          <Box bgcolor={"#ededed"} borderRadius={1} width={"100%"} p={1.5}>
            <Typography variant="body1" fontWeight={"400"}>
              Prior to gaining access to mission control, kindly complete the
              form below. Furnishing these details will expedite the
              verification of your business by our support team, safeguarding
              the sending reputation of all users involved.
            </Typography>
          </Box>
          {isLoading ? (
            <SimpleBackdrop status={isLoading} />
          ) : (
            <Box width={"100%"} p={1.5} border={".5px solid #ededed"}>
              <Grid container spacing={4}>
                <Grid item sm={12} xs={12} md={10} lg={10} xl={10}>
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.name}
                    label={"Company name"}
                    name="name"
                    required={true}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={10} lg={10} xl={10}>
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.website}
                    label={"Website"}
                    name="website"
                    required={true}
                  />
                  <Typography
                    variant="body1"
                    fontWeight={"400"}
                    sx={{ mt: "8px" }}
                  >
                    Is your website or app currently in the development phase?
                    Kindly provide any existing landing page or social media
                    accounts you may have.
                  </Typography>
                </Grid>
                <Grid item sm={12} xs={12} md={5} lg={5} xl={5}>
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.address}
                    label={"Address"}
                    name="address"
                    required={true}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={5} lg={5} xl={5}>
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.city}
                    label={"City"}
                    name="city"
                    required={true}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={5} lg={5} xl={5}>
                  <CompanyProfileSelectComponent
                    name={"country"}
                    dataToFetch={"tb_countries"}
                    dataName={"country"}
                    label={"Country"}
                    handler={changeHandler}
                    value={formData.country}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={5} lg={5} xl={5}>
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.zip_code}
                    label={"Zip Code"}
                    name="zip_code"
                    required={true}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={10} lg={10} xl={10}>
                  <CompanyProfileSelectComponent
                    name={"role_company"}
                    dataToFetch={"tb_role"}
                    dataName={"role_company"}
                    label={
                      "How would you define your position within your organization?"
                    }
                    handler={changeHandler}
                    value={formData.role_company}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={10} lg={10} xl={10}>
                  <CompanyProfileSelectComponent
                    name={"count_employees"}
                    dataToFetch={"tb_count_employee"}
                    dataName={"count_employees"}
                    label={"How many employees does your company have?"}
                    handler={changeHandler}
                    value={formData.count_employees}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={10} lg={10} xl={10}>
                  <CompanyProfileSelectComponent
                    name={"type_project"}
                    dataToFetch={"tb_type_project"}
                    dataName={"type_project"}
                    label={
                      "What kind of project are you creating an account for?"
                    }
                    handler={changeHandler}
                    value={formData.type_project}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight={"600"} sx={{ mb: 2 }}>
                Sendings
              </Typography>
              <Grid container spacing={4}>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  md={10}
                  lg={10}
                  xl={10}
                  sx={{ mb: 2 }}
                >
                  <CustomTextFieldComponent
                    handler={changeHandler}
                    value={formData.tell_us}
                    label={
                      "Tell us about your business model and how you use email"
                    }
                    name="tell_us"
                    required={true}
                    multiline={true}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={10} lg={10} xl={10}>
                  <CompanyProfileSelectComponent
                    name={"old_service"}
                    dataToFetch={"tb_past_service"}
                    dataName={"old_service"}
                    label={"Which old_service have you used in the past?"}
                    handler={changeHandler}
                    value={formData.old_service}
                  />
                </Grid>
                <Grid item sm={12} xs={12} md={10} lg={10} xl={10}>
                  <CompanyProfileSelectComponent
                    name={"count_emails_per_month"}
                    dataToFetch={"tb_count_emails"}
                    dataName={"count_emails_per_month"}
                    label={"How many emails do you plan to send each month?"}
                    handler={changeHandler}
                    value={formData.count_emails_per_month}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"start"}
                spacing={2}
              >
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: "#154b69",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#00a3b1",
                    },
                  }}
                  onClick={onSubmit}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "red",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                  }}
                  variant="contained"
                  onClick={() => {}}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default CompanyProfile;
