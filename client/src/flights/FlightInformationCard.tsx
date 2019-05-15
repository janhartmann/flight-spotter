import * as React from "react";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import moment from "moment";

import Card from "../shared/card/Card";
import { GetFlightInformation } from "../data/generated-types";
import Spinner from "../shared/Spinner";
import CardHeader from "../shared/card/CardHeader";
import FlightAltitudeChart from "./FlightAltitudeChart";
import { ITheme } from "../styles/theme";
import FlightIcon from "../shared/FlightIcon";
import FlightProgress from "./FlightProgress";

export interface IFlightInformationCardProps extends StyledComponentProps {
  flight: GetFlightInformation.Flight;
  loading?: boolean;
}

const FlightInformationCard: React.FC<IFlightInformationCardProps> = ({
  classes,
  flight,
  loading
}) => {
  return (
    <Card>
      {loading && <Spinner />}
      {!loading && (
        <div className={classes.root}>
          <CardHeader
            title={
              <React.Fragment>
                <FlightIcon direction={flight.direction} size={20} />{" "}
                {flight.callsign}
              </React.Fragment>
            }
          />
          {flight.route && (
            <div className={classes.progress}>
              <FlightProgress flight={flight} />
            </div>
          )}
          <dl className={classes.status}>
            <dt>Last Contact</dt>
            <dd>{moment.unix(flight.lastContact).fromNow()}</dd>
            <dt>Origin Country</dt>
            <dd>{flight.originCountry}</dd>
            <dt>Speed</dt>
            <dd>
              {flight.velocity} m/s ({(flight.velocity * 3.6).toFixed(2)} km/h)
            </dd>
            <dt>Barometric Altitude</dt>
            <dd>{flight.altitude.barometric} m</dd>
            <dt>Geometric Altitude</dt>
            <dd>{flight.altitude.geometric} m</dd>
            <dt>Direction</dt>
            <dd>{flight.direction}°</dd>
            <dt>Vertical Rate</dt>
            <dd>{flight.verticalRate} m/s</dd>
            <dt>Squawk</dt>
            <dd>{flight.squawk}</dd>
            <dt>ICAO24</dt>
            <dd>{flight.id}</dd>
          </dl>
          {flight.trajectory && (
            <div className={classes.altitude}>
              <CardHeader title="Altitude" />
              <FlightAltitudeChart flight={flight} />
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    width: 300
  },
  progress: {
    marginTop: theme.layout.gutter
  },
  status: {
    display: "inline-flex",
    flexWrap: "wrap",
    margin: 0,
    marginTop: theme.layout.gutter,
    "& dt": {
      flex: "0 0 50%",
      marginTop: 4
    },
    "& dd": {
      flex: "0 0 50%",
      marginLeft: "auto",
      textAlign: "right",
      marginTop: 4,
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  },
  altitude: {
    height: 170,
    marginTop: theme.layout.gutter
  }
});

export default injectSheet(styles)(FlightInformationCard);
