import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { customToolbar, formatDate } from "../../assets/utils";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetEmailActivityQuery } from "../../app/redux/features/slices/api/usersApiSlice";
import { CheckCircle, Envelope, Question } from "@phosphor-icons/react";

const EmailActivityTable = ({ domain }) => {
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
      field: "status",
      headerName: "Event",
      width: 400,
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
              gap: 2,
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            {params?.row?.status === "sent" ? (
              <>
                <Box
                  px={2}
                  borderRadius={8}
                  bgcolor={"#164c68"}
                  color={"white"}
                  width={"100%"}
                  textAlign={"center"}
                >
                  <Typography variant="body2" color={"#fff"}>
                    {" "}
                    Sent
                  </Typography>
                </Box>
                <CheckCircle size={32} color="#164c68" />
              </>
            ) : (
              <>
                <Box
                  p={0.5}
                  borderRadius={8}
                  bgcolor={"#f55d5d"}
                  color={"white"}
                  width={"100%"}
                  textAlign={"center"}
                >
                  <Typography variant="body2" color={"#fff"}>
                    {" "}
                    Not Delivered
                  </Typography>
                </Box>
                <Tooltip
                  title={params?.row?.status_message}
                  placement="top-start"
                >
                  <Question size={32} color="#11a4b0" />
                </Tooltip>
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      field: "recepient",
      headerName: "Recepient",
      width: 350,
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
          <Typography variant="body2" color={"#164c68"} fontWeight={"500"}>
            {params?.row?.receive_by}
          </Typography>
        </div>
      ),
    },
    {
      field: "sender",
      headerName: "Sender",
      width: 350,
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
          <Typography variant="body2" color={"#164c68"} fontWeight={"500"}>
            {params?.row?.sent_by}
          </Typography>
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 350,
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
          <Typography variant="body2" color={"#164c68"} fontWeight={"500"}>
            {params?.row?.send_date}
          </Typography>
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

export default EmailActivityTable;
