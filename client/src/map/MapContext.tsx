import * as React from "react";
import * as mapboxgl from "mapbox-gl";

export const MapContext = React.createContext<mapboxgl.Map | null>(null);
