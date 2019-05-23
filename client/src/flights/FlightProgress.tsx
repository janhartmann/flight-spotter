import * as React from "react";
import * as turf from "@turf/turf";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import classNames from "classnames";

import { GetFlightInformation } from "../data/generated-types";
import FlightIcon from "../shared/FlightIcon";
import { ITheme } from "../styles/theme";

export interface IFlightProgressProps extends StyledComponentProps {
  flight: GetFlightInformation.Flight;
  className?: string;
}

const FlightProgress: React.FC<IFlightProgressProps> = ({
  classes,
  flight,
  className
}) => {
  const progress = React.useMemo(() => {
    if (!flight.route || !flight.route.departure || !flight.route.arrival) {
      return null;
    }
    const total = turf.distance(
      [
        flight.route.departure.coordinates.longitude,
        flight.route.departure.coordinates.latitude
      ],
      [
        flight.route.arrival.coordinates.longitude,
        flight.route.arrival.coordinates.latitude
      ],
      {
        units: "kilometers"
      }
    );

    const travelled = turf.distance(
      [
        flight.route.departure.coordinates.longitude,
        flight.route.departure.coordinates.latitude
      ],
      [flight.coordinates.longitude, flight.coordinates.latitude],
      {
        units: "kilometers"
      }
    );

    return (travelled / total) * 100;
  }, [flight]);

  if (!progress) {
    return null;
  }

  return (
    <div
      className={classNames({
        [classes.root]: true,
        [className]: className
      })}
    >
      <div className={classes.airport}>{flight.route.departure.iata}</div>
      <div className={classes.timeline}>
        <div className={classes.progress} style={{ width: progress + "%" }}>
          <div className={classes.now} style={{ left: progress + "%" }}>
            <FlightIcon direction={90} size={40} />
          </div>
        </div>
      </div>
      <div className={classes.airport}>{flight.route.arrival.iata}</div>
    </div>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  airport: {
    fontSize: 23,
    fontWeight: "bold"
  },
  timeline: {
    flex: 1,
    height: 6,
    borderRadius: theme.layout.borderRadius,
    background: theme.colors.dark[5],
    position: "relative",
    marginLeft: theme.layout.gutter,
    marginRight: theme.layout.gutter
  },
  progress: {
    background: theme.colors.success[5],
    height: 6,
    borderRadius: theme.layout.borderRadius
  },
  now: {
    position: "absolute",
    top: -17,
    marginLeft: -20 // half the size of the icon to center position
  }
});

export default injectSheet(styles)(FlightProgress);
