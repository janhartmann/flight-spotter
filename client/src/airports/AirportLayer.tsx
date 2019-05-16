import * as React from "react";
import { withTheme, WithTheme } from "react-jss";

import { MapContext } from "../map/MapContext";
import { ITheme } from "../styles/theme";

export interface IAirportLayerProps extends WithTheme<ITheme> {
  source: string;
  onMouseEnter?: (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => void;
  onMouseLeave?: (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => void;
}

const AirportLayer: React.FC<IAirportLayerProps> = ({
  theme,
  source,
  onMouseEnter,
  onMouseLeave
}) => {
  const layerId = "airport-symbols";
  const map = React.useContext(MapContext);

  React.useEffect(() => {
    map.addLayer({
      id: layerId,
      source,
      type: "circle",
      paint: {
        "circle-radius": {
          base: 1.75,
          stops: [[2, 2], [5, 4]]
        },
        "circle-color": theme.colors.danger[5],
        "circle-stroke-width": 1,
        "circle-stroke-color": theme.colors.lightGray[5]
      }
    });

    if (onMouseEnter) {
      map.on("mouseenter", layerId, e => {
        map.getCanvas().style.cursor = "pointer";
        onMouseEnter(e);
      });
    }

    if (onMouseLeave) {
      map.on("mouseleave", layerId, e => {
        map.getCanvas().style.cursor = "";
        onMouseLeave(e);
      });
    }

    return () => {
      map.removeLayer(layerId);
    };
  }, []);

  return null;
};

export default withTheme(AirportLayer);
