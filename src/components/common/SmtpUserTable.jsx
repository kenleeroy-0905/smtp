import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { customToolbar, formatDate } from "../../assets/utils";
import { Box, IconButton } from "@mui/material";
import { CaretDown, Envelope, SealCheck } from "@phosphor-icons/react";
import ManageSmtpUser from "./ManageSmtpUser";
import SmtpUserMenu from "./SmtpUserMenu";

const SmtpUserTable = ({ users, domainId }) => {
  const [rows, setRows] = useState([]);
  const [smtpData, setSmtpData] = useState(null);
  const [smtpId, setSmtpId] = useState(null);
  const [manageSmtpUser, setManageSmtpUser] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (users) {
      setRows(users);
    }
    console.log(rows);
  }, [users]);

  const handleCloseManageSmtpUser = () => {
    setManageSmtpUser(false);
  };

  const manageSmtpDetails = (id) => {
    const data = rows.filter((row) => row.id === id);
    setSmtpData(data[0]);
    setManageSmtpUser(true);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
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
            <Envelope size={32} color="#164c68" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              gap: 1,
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <h4 style={{ margin: "0" }}>{params?.value}</h4>
            <p style={{ margin: "0" }}>{params?.row?.username}</p>
          </div>
        </div>
      ),
    },
    {
      field: "created_at",
      headerName: "Created On",
      width: 300,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "start",
              gap: 1,
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <h4 style={{ margin: "0" }}>{formatDate(params?.value)}</h4>
          </div>
        </div>
      ),
    },
    {
      field: "",
      headerName: "Last Used",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "start",
              gap: 1,
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <h4 style={{ margin: "0" }}>-</h4>
          </div>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <SealCheck size={20} color="green" />
            <h4 style={{ margin: "0" }}>Active</h4>
          </div>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "#00a3b1",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              manageSmtpDetails(params?.row?.id);
            }}
          >
            Manage
          </button>
          <button
            style={{
              backgroundColor: "#00a3b1",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setSmtpId(params?.row?.id);
            }}
          >
            <CaretDown size={10} />
          </button>
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
      <ManageSmtpUser
        open={manageSmtpUser}
        closeSmtp={handleCloseManageSmtpUser}
        {...smtpData}
        domainID={domainId}
      />
      <SmtpUserMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        smtpID={smtpId}
        domainID={domainId}
      />
    </>
  );
};

export default SmtpUserTable;
