import * as React from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { WithTheme, withTheme } from "react-jss";

import { GetFlightInformation } from "../data/generated-types";
import { ITheme } from "../styles/theme";

export interface IFlightAltitudeChartProps extends WithTheme<ITheme> {
  flight: GetFlightInformation.Flight;
}

const FlightAltitudeChart: React.FC<IFlightAltitudeChartProps> = ({
  flight,
  theme
}) => {
  const chart = React.useMemo(() => {
    if (!flight || !flight.trajectory) {
      return null;
    }
    return {
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
          categories: flight.trajectory.paths.map(d =>
            moment.unix(d.time).toISOString()
          ),
          labels: {
            style: {
              colors: theme.colors.text
            }
          }
        },
        yaxis: {
          title: {
            text: "Altitude",
            style: {
              color: theme.colors.text
            }
          },
          labels: {
            style: {
              color: theme.colors.text
            }
          }
        },
        tooltip: {
          theme: "dark",
          x: {
            format: "HH:mm:ss"
          }
        },
        grid: {
          borderColor: theme.colors.gray[2]
        }
      },
      series: [
        {
          name: "Altitude",
          data: flight.trajectory.paths.map(d => d.altitude.barometric)
        }
      ]
    };
  }, [flight]);

  if (!chart) {
    return null;
  }

  return (
    <Chart
      options={chart.options}
      series={chart.series}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default withTheme(FlightAltitudeChart);
