import * as React from "react";
import mapboxgl from "mapbox-gl";

import { MapContext } from "./MapContext";

export interface IGeoJsonDataSourceProps {
  id: string;
  data: GeoJSON.FeatureCollection | GeoJSON.Feature;
}

const GeoJsonDataSource: React.FC<IGeoJsonDataSourceProps> = ({
  id,
  data,
  children
}) => {
  const map = React.useContext(MapContext);

  React.useLayoutEffect(() => {
    map.addSource(id, {
      type: "geojson",
      data
    });

    return () => {
      /**
       * We need to make sure we remove all layers
       * depending on the source before removing it.
       */
      for (const layer of map.getStyle().layers) {
        if (layer.source === id) {
          map.removeLayer(layer.id);
        }
      }
      map.removeSource(id);
    };
  }, []);

  React.useLayoutEffect(() => {
    const source = map.getSource(id) as mapboxgl.GeoJSONSource;
    if (source && map.isSourceLoaded(id)) {
      source.setData(data);
    }
  }, [data]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default GeoJsonDataSource;
