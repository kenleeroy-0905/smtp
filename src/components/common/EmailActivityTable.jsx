import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { customToolbar } from "../../assets/utils";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetEmailActivityQuery } from "../../app/redux/features/slices/api/usersApiSlice";
import { CheckCircle, Question } from "@phosphor-icons/react";
import { ChartLineUp } from "@phosphor-icons/react";

const EmailActivityTable = ({ domain }) => {
  const [rows, setRows] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { data, isSuccess } = useGetEmailActivityQuery(
    {
      id: domain,
      token: userInfo.token,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (data && data.message !== "No Data Found") {
      const newRows = data?.data?.map((row, index) => ({ id: index, ...row }));
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
      {isSuccess && data?.message === "No Data Found" ? (
        <Box
          width={"100%"}
          border={".5px solid #00a3b1"}
          borderRadius={2}
          p={6}
          boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
          mt={2}
        >
          <Stack justifyContent={"center"} alignItems={"center"} spacing={4}>
            <Box
              p={1}
              backgroundColor={"#00a3b1"}
              width={{ md: "5%", xs: "50%" }}
              borderRadius={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"70px"}
            >
              <ChartLineUp size={32} color="#fff" />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              You don't have any sent emails for this Domain
            </Typography>
            <Typography variant="body1">
              Today is a great day to send your first email!!
            </Typography>
          </Stack>
        </Box>
      ) : (
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
      )}
    </>
  );
};

export default EmailActivityTable;
