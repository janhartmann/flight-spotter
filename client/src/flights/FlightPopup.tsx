import * as React from "react";
import mapboxgl from "mapbox-gl";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";

import { GetFlightPopup } from "../data/generated-types";
import MapPopup from "../map/MapPopup";

export interface IFlightPopupProps extends StyledComponentProps {
  id: string;
}

const FlightPopup: React.FC<IFlightPopupProps> = ({ classes, id }) => {
  return (
    <GetFlightPopup.Component
      variables={{
        input: {
          id
        }
      }}
      fetchPolicy="cache-only"
    >
      {({ data }) => {
        if (!data || !data.flight) {
          return null;
        }
        return (
          <MapPopup
            center={
              new mapboxgl.LngLat(
                data.flight.coordinates.longitude,
                data.flight.coordinates.latitude
              )
            }
            options={{
              className: classes.popup,
              closeButton: false,
              closeOnClick: false
            }}
          >
            {data.flight.callsign || "UNKNOWN"}
          </MapPopup>
        );
      }}
    </GetFlightPopup.Component>
  );
};

const styles: StyleCreator = () => ({
  popup: {
    fontWeight: "bold",
    fontSize: 11
  }
});

export default injectSheet(styles)(FlightPopup);
