import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useGetTableListQuery } from "../../app/redux/features/slices/api/usersApiSlice";

const CompanyProfileSelectComponent = ({
  dataToFetch,
  type,
  label,
  dataName,
  handler,
  value,
  name,
}) => {
  const { data, isSuccess, isLoading } = useGetTableListQuery({
    select: dataToFetch,
  });

  return (
    <>
      <FormControl fullWidth required>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          name={name}
          labelId={dataName}
          id={dataName}
          value={value}
          label={label}
          onChange={handler}
        >
          {isLoading && <MenuItem>Loading...</MenuItem>}
          {isSuccess && name === "country"
            ? data?.data
                .map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
                .sort((a, b) => {
                  return a.props.children.localeCompare(b.props.children);
                })
            : data?.data.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CompanyProfileSelectComponent;
