import * as React from "react";
import { withTheme, WithTheme } from "react-jss";

import { MapContext } from "../map/MapContext";
import { ITheme } from "../styles/theme";

export interface IFlightTrajectoryLayerProps extends WithTheme<ITheme> {
  id: string;
  source: string;
}

const FlightTrajectoryLayer: React.FC<IFlightTrajectoryLayerProps> = ({
  theme,
  id,
  source
}) => {
  const map = React.useContext(MapContext);

  React.useEffect(() => {
    map.addLayer({
      id,
      source,
      type: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "red",
        "line-width": 3
      }
    });

    return () => {
      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
    };
  }, []);

  return null;
};

export default withTheme(FlightTrajectoryLayer);
