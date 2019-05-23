import * as turf from "@turf/turf";

export const getFlightPathPrediction = (
  currentPosition: number[],
  velocity: number,
  duration: number,
  direction: number,
  steps: number
) => {
  const destination = turf.destination(
    currentPosition,
    velocity * duration,
    direction,
    {
      units: "meters"
    }
  );

  const route: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [currentPosition, destination.geometry.coordinates]
    }
  };

  const distance = turf.distance(currentPosition, destination, {
    units: "meters"
  });

  const arc: Array<GeoJSON.Feature<GeoJSON.Point>> = [];
  for (let i = 0; i < distance; i += distance / steps) {
    arc.push(
      turf.along(route, i, {
        units: "meters"
      })
    );
  }

  return arc;
};
