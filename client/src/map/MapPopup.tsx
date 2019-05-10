import * as React from "react";
import injectSheet, { StyleCreator, StyledComponentProps } from "react-jss";
import * as ReactDOM from "react-dom";
import * as mapboxgl from "mapbox-gl";
import classNames from "classnames";

import { MapContext } from "./MapContext";
import { ITheme } from "../styles/theme";

export interface IMapPopupProps extends StyledComponentProps {
  center: mapboxgl.LngLat;
  options?: mapboxgl.PopupOptions;
}

const MapPopup: React.FC<IMapPopupProps> = ({
  classes,
  children,
  options,
  center
}) => {
  const map = React.useContext(MapContext);
  const container = React.useRef<HTMLDivElement>(document.createElement("div"));
  const popup = React.useRef<mapboxgl.Popup>();

  React.useEffect(() => {
    popup.current = new mapboxgl.Popup({
      ...options,
      className: classNames({
        [classes.popup]: true,
        [options.className]: options.className
      })
    });
    popup.current.setDOMContent(container.current);
    popup.current.addTo(map);

    return () => {
      popup.current.remove();
      container.current.remove();
    };
  }, []);

  React.useEffect(() => {
    popup.current.setLngLat(center);
  }, [center.lng, center.lat]);

  return ReactDOM.createPortal(children, container.current);
};

const styles: StyleCreator = (theme: ITheme) => ({
  popup: {
    color: theme.colors.dark[1],
    "& > .mapboxgl-popup-content": {
      padding: "3px 6px"
    }
  }
});

export default injectSheet(styles)(MapPopup);
