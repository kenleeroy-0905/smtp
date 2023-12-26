import { Grid } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React from "react";

export const data = [
  {
    id: "16-Dec-2023",
    color: "hsl(80, 70%, 50%)",
    data: [
      {
        x: "Open Rate",
        y: 1.0,
      },

      {
        x: "Click Rate",
        y: 1.0,
      },

      {
        x: "Bounce Rate",
        y: 0.0,
      },
    ],
  },
];

const CustomChart = () => {
  return (
    <Grid
      item
      md={12}
      sm={12}
      xs={12}
      height={"300px"}
      py={3}
      px={4}
      border={".5px solid #164c68"}
    >
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={true}
        lineWidth={1}
        enablePoints={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={true}
        pointLabelYOffset={-18}
        areaOpacity={0}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Grid>
  );
};

export default CustomChart;
