import { TrajectoryResolvers, TrajectoryPath } from "./generated-types";
import { IOpenSkyApiTrajectoryPathResponse } from "../api/OpenSkyNetworkApi";

export const trajectoryResolver: TrajectoryResolvers = {
  startTime: parent => {
    return parent.startTime;
  },
  endTime: parent => {
    return parent.endTime;
  },
  paths: parent => {
    return parent.path.map(path => {
      const obj = (path as unknown) as IOpenSkyApiTrajectoryPathResponse;
      // tslint:disable-next-line: no-object-literal-type-assertion
      return {
        time: obj[0],
        coordinates: {
          longitude: obj[2],
          latitude: obj[1]
        },
        altitude: {
          barometric: obj[3]
        },
        direction: obj[4],
        grounded: obj[5]
      } as TrajectoryPath;
    });
  }
};
