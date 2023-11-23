import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button } from "@mui/material";
import { customToolbar } from "../../assets/utils";
import logo from "../../assets/images/logo.png";

const DomainsTable = () => {
  const rows = [
    {
      id: 1,
      domain: "example.com",
      verified: true,
      sent: 50,
      delivered: 40,
      rejected: 5,
      received: 35,
    },
  ];

  const columns = [
    {
      field: "domain",
      headerName: "Domain Name",
      width: 250,
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
          <h3>{params.value}</h3>
        </div>
      ),
    },
    {
      field: "verified",
      headerName: "Status",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ textAlign: "center" }}>
          <span>
            {params.row.verified ? (
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
    {
      field: "sent",
      headerName: "Sending",
      width: 350,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {params.row.sent}
              <br></br>
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>Sent</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {params.row.delivered}
              <br></br>
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              Delivered
            </span>
          </div>
        </div>
      ),
    },
    {
      field: "received",
      headerName: "Receiving",
      width: 350,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {params.row.received}
              <br></br>
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              Received
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {params.row.rejected}
              <br></br>
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              Rejected
            </span>
          </div>
        </div>
      ),
    },
    {
      field: "manage",
      width: 200,
      headerName: "",
      align: "right",
      renderCell: () => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#154b69",
            "&:hover": {
              backgroundColor: "#00a3b1",
            },
          }}
        >
          Manage
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ my: 5, width: "100%", height: 350 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
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
