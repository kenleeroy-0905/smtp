import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button } from "@mui/material";
import { customToolbar } from "../../assets/utils";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedDomain } from "../../app/redux/features/slices/domain/domainSlice";
import { useDomainListQuery } from "../../app/redux/features/slices/api/usersApiSlice";

const DomainsTable = ({ domain }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (domain) {
      const newRows = domain.map((row, index) => ({ id: index, ...row }));
      setRows(newRows);
    }
    console.log(rows);
  }, [domain]);

  const columns = [
    {
      field: "domain_name",
      headerName: "Domain Name",
      width: 500,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: ".5px solid #ecedf0",
              padding: "6px",
              borderRadius: "8px",
            }}
          >
            <img src={logo} alt="domain" style={{ width: 20, height: 20 }} />
          </div>
          <h3>{params?.value}</h3>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 400,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ textAlign: "center" }}>
          <span>
            {params?.row.status === "active" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <CheckCircleIcon style={{ color: "green" }} />
                <span style={{ fontSize: "1rem", fontWeight: "600" }}>
                  Verified
                </span>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <CancelIcon style={{ color: "red" }} />
                <span style={{ fontSize: "1rem", fontWeight: "600" }}>
                  Not Verified
                </span>
              </div>
            )}
          </span>
        </div>
      ),
    },
    // {
    //   field: "sent",
    //   headerName: "Sending",
    //   width: 350,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: () => (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         gap: 20,
    //       }}
    //     >
    //       <div style={{ textAlign: "center" }}>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
    //           0<br></br>
    //         </span>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>Sent</span>
    //       </div>
    //       <div style={{ textAlign: "center" }}>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
    //           0<br></br>
    //         </span>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
    //           Delivered
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   field: "received",
    //   headerName: "Receiving",
    //   width: 350,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: () => (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         gap: 20,
    //       }}
    //     >
    //       <div style={{ textAlign: "center" }}>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
    //           0<br></br>
    //         </span>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
    //           Received
    //         </span>
    //       </div>
    //       <div style={{ textAlign: "center" }}>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
    //           0<br></br>
    //         </span>
    //         <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
    //           Rejected
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      field: "manage",
      width: 400,
      headerName: "",
      align: "right",
      renderCell: (params) => (
        <div>
          {params?.row.status === "active" ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#154b69",
                "&:hover": {
                  backgroundColor: "#00a3b1",
                },
              }}
              onClick={() => {
                dispatch(setSelectedDomain(params?.row));
                navigate("/dashboard/manage-domain");
              }}
            >
              Manage
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#154b69",
                "&:hover": {
                  backgroundColor: "#00a3b1",
                },
              }}
              onClick={() => {
                dispatch(setSelectedDomain(params?.row));
                navigate("/dashboard/verify-domain");
              }}
            >
              Verify
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ my: 5, width: "100%", height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density="comfortable"
          slots={{
            toolbar: customToolbar,
          }}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "#00a3b1",
            "& .MuiDataGrid-cell:hover": {
              color: "#00a3b1",
            },
          }}
        />
      </Box>
    </>
  );
};

export default DomainsTable;
