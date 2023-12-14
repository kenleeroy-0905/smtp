import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

const Textarea = styled(BaseTextareaAutosize)(
  () => `
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 4px;
    color: '#000'';
    background: '#fff;
    border: 1px solid #00a3b1;

    &:hover {
      border-color:  #00a3b1;
    }

    &:focus {
      outline: 0;
      border-color:  #00a3b1;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

export default function CompanyProfileTextArea({
  label,
  dataName,
  handler,
  value,
  name,
}) {
  return (
    <Textarea
      placeholder={label}
      onChange={handler}
      name={name}
      id={dataName}
      value={value}
    />
  );
}
