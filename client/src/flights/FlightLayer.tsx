import * as React from "react";
import { withTheme, WithTheme } from "react-jss";

import { MapContext } from "../map/MapContext";
import { ITheme } from "../styles/theme";

export interface IFightLayerProps extends WithTheme<ITheme> {
  source: string;
  onClick?: (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[];
    } & mapboxgl.EventData
  ) => void;
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

const FlightLayer: React.FC<IFightLayerProps> = ({
  theme,
  source,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const layerId = "flight-symbols";
  const map = React.useContext(MapContext);

  React.useEffect(() => {
    map.addLayer({
      id: layerId,
      source,
      type: "symbol",
      layout: {
        "icon-image": "airport-15",
        "icon-allow-overlap": true,
        "icon-rotate": ["get", "direction"]
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

    if (onClick) {
      map.on("click", layerId, e => {
        onClick(e);
      });
    }

    return () => {
      map.removeLayer(layerId);
    };
  }, []);

  return null;
};

export default withTheme(FlightLayer);
