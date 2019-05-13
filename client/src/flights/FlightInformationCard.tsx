import * as React from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { WithTheme, withTheme } from "react-jss";

import Card from "../shared/card/Card";
import { GetFlightInformation } from "../data/generated-types";
import Spinner from "../shared/Spinner";
import CardHeader from "../shared/card/CardHeader";
import { ITheme } from "../styles/theme";

export interface IFlightInformationCardProps extends WithTheme<ITheme> {
  flight: GetFlightInformation.Flight;
  loading?: boolean;
}

const FlightInformationCard: React.FC<IFlightInformationCardProps> = ({
  flight,
  loading,
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
  }, [flight, loading]);

  return (
    <Card>
      {loading && <Spinner />}
      {!loading && (
        <React.Fragment>
          <CardHeader title={flight.callsign} />
          {chart && (
            <div style={{ height: 150 }}>
              <Chart
                options={chart.options}
                series={chart.series}
                type="area"
                width="100%"
                height="100%"
              />
            </div>
          )}
        </React.Fragment>
      )}
    </Card>
  );
};

export default withTheme(FlightInformationCard);
