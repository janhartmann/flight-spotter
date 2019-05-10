import * as React from "react";
import Chart from "react-apexcharts";

import Card from "../shared/card/Card";

export interface IFlightInformationCardProps {
  className?: string;
}

const FlightInformationCard: React.FunctionComponent<
  IFlightInformationCardProps
> = ({ className }) => {
  const state = {
    options: {
      chart: {
        toolbar: {
          show: false,
          autoSelected: "selection"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00",
          "2018-09-19T01:30:00",
          "2018-09-19T02:30:00",
          "2018-09-19T03:30:00",
          "2018-09-19T04:30:00",
          "2018-09-19T05:30:00",
          "2018-09-19T06:30:00"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    },
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100]
      }
    ]
  };
  return (
    <Card title="Flight SAS1933" className={className}>
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        width="100%"
        height="100%"
      />
    </Card>
  );
};

export default FlightInformationCard;
