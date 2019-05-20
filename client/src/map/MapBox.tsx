import * as React from "react";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import mapboxgl from "mapbox-gl";

import { MapContext } from "./MapContext";
import { debounce } from "./debounce";

export interface IMapBoxProps extends StyledComponentProps {
  accessToken: string;
  style: string;
  center?: mapboxgl.LngLat;
  zoom: number;
  withZoom?: boolean;
  withCompass?: boolean;
  withFullscreen?: boolean;
  withGeolocateControl?: boolean;
  onReady?: (map: mapboxgl.Map) => void;
  onChange?: (e: IViewState) => void;
  onClick?: (e: mapboxgl.MapMouseEvent) => void;
}

export interface IViewState {
  zoom: number;
  center: mapboxgl.LngLat;
  bounds: mapboxgl.LngLatBounds;
}

const MapBox: React.FC<IMapBoxProps> = ({
  classes,
  accessToken,
  children,
  style,
  center,
  zoom,
  onReady,
  onChange,
  onClick,
  withZoom,
  withCompass,
  withFullscreen,
  withGeolocateControl
}) => {
  const [ready, setReady] = React.useState(false);
  const mapInstance = React.useRef<mapboxgl.Map>();
  const mapElement = React.useRef();

  React.useEffect(() => {
    (mapboxgl as any).accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapElement.current,
      trackResize: true,
      style,
      center,
      zoom
    });

    map.on("load", () => {
      mapInstance.current = map;
      setReady(true);
    });

    return () => {
      mapInstance.current.remove();
    };
  }, []);

  const addControls = () => {
    if (withZoom || withCompass) {
      mapInstance.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: withCompass,
          showZoom: withZoom
        }),
        "top-right"
      );
    }

    if (withFullscreen) {
      mapInstance.current.addControl(
        new mapboxgl.FullscreenControl(),
        "top-right"
      );
    }

    if (withGeolocateControl) {
      mapInstance.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }),
        "top-right"
      );
    }
  };

  React.useEffect(() => {
    if (ready) {
      addControls();
      addEvents();
      if (onReady) {
        onReady(mapInstance.current);
      }
      handleChange();
    }
  }, [ready]);

  const addEvents = () => {
    if (onChange) {
      mapInstance.current.on("moveend", handleChange);
    }

    if (onClick) {
      mapInstance.current.on("click", onClick);
    }
  };

  const handleChange = () => {
    if (onChange) {
      const debouncedOnChange = debounce(onChange, 500);
      debouncedOnChange({
        zoom: mapInstance.current.getZoom(),
        center: mapInstance.current.getCenter(),
        bounds: mapInstance.current.getBounds()
      });
    }
  };

  return (
    <MapContext.Provider value={mapInstance.current}>
      <div ref={mapElement} className={classes.root}>
        {ready && children}
      </div>
    </MapContext.Provider>
  );
};

const styles: StyleCreator = () => ({
  root: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "relative"
  }
});

export default injectSheet(styles)(MapBox);
