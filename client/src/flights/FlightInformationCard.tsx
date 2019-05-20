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
    <Card className={classes.card}>
      {loading && <Spinner className={classes.spinner} />}
      {!loading && flight && (
        <div className={classes.root}>
          <CardHeader
            title={
              <React.Fragment>
                <FlightIcon
                  direction={flight.direction}
                  size={20}
                  className={classes.flightIcon}
                />
                {flight.callsign || "UNKNOWN"}
              </React.Fragment>
            }
          />
          {flight.route && (
            <FlightProgress flight={flight} className={classes.progress} />
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
            <dt>Geometric Altitude</dt>
            <dd>
              {parseFloat((flight.altitude.geometric / 0.3048).toFixed(2))} ft (
              {flight.altitude.geometric} m)
            </dd>
            <dt>Barometric Altitude</dt>
            <dd>
              {parseFloat((flight.altitude.barometric / 0.3048).toFixed(2))} ft
              ({flight.altitude.barometric} m)
            </dd>
            <dt>Direction</dt>
            <dd>{flight.direction}°</dd>
            <dt>Vertical Rate</dt>
            <dd>{flight.verticalRate} m/s</dd>
            <dt>Squawk</dt>
            <dd>{flight.squawk}</dd>
            <dt>ICAO24</dt>
            <dd>{flight.id}</dd>
            <dt>Position Source</dt>
            <dd>{flight.positionSource}</dd>
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
  card: {
    opacity: 0.95
  },
  root: {
    width: "100%",
    [theme.layout.breakpoints.medium]: {
      width: 300
    }
  },
  spinner: {
    color: theme.colors.white
  },
  flightIcon: {
    marginRight: theme.layout.gutter / 2
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
      color: theme.colors.lightGray[1],
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
