import * as React from "react";
import * as mapboxgl from "mapbox-gl";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";

import { MapContext } from "./MapContext";
import Spinner from "../shared/Spinner";

export interface IGeoJsonDataSourceProps extends StyledComponentProps {
  id: string;
  data: GeoJSON.FeatureCollection<GeoJSON.Point>;
  loading?: boolean;
}

const GeoJsonDataSource: React.FC<IGeoJsonDataSourceProps> = ({
  classes,
  id,
  data,
  loading
}) => {
  const map = React.useContext(MapContext);

  React.useEffect(() => {
    map.addSource(id, {
      type: "geojson",
      data
    });
  }, []);

  React.useEffect(() => {
    const source = map.getSource(id) as mapboxgl.GeoJSONSource;
    if (source && map.isSourceLoaded(id)) {
      source.setData(data);
    }
  }, [data]);

  return loading ? (
    <div className={classes.spinner}>
      <Spinner size="small" />
    </div>
  ) : null;
};

const styles: StyleCreator = () => ({
  spinner: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    left: 10,
    background: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
    borderRadius: 4
  }
});

export default injectSheet(styles)(GeoJsonDataSource);
