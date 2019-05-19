import * as React from "react";
import { withTheme, WithTheme } from "react-jss";

import { MapContext } from "../map/MapContext";
import { ITheme } from "../styles/theme";

export interface IFlightTrajectoryLayerProps extends WithTheme<ITheme> {
  source: string;
}

const FlightTrajectoryLayer: React.FC<IFlightTrajectoryLayerProps> = ({
  theme,
  source
}) => {
  const map = React.useContext(MapContext);

  React.useEffect(() => {
    /*map.addLayer({
      id: "trajectory",
      source,
      type: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#48AFF0",
        "line-width": 3
      },
      filter: ["==", "type", "trajectory"]
    });*/

    map.addLayer({
      id: "arrival",
      source,
      type: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": theme.colors.warning[5],
        "line-width": {
          base: 3,
          stops: [[10, 3]]
        },
        "line-dasharray": [1, 2]
      },
      filter: ["==", "type", "arrival"]
    });

    return () => {
      ["trajectory", "arrival"].forEach(layer => {
        if (map.getLayer(layer)) {
          map.removeLayer(layer);
        }
      });
    };
  }, []);

  return null;
};

export default withTheme(FlightTrajectoryLayer);
