import { Resolvers } from "./generated-types";
import { queryResolver } from "./query";
import { flightResolver } from "./flight";
import { flightTrajectoryResolver } from "./flight-trajectory";

// tslint:disable-next-line:no-object-literal-type-assertion
export default {
  Query: queryResolver,
  Flight: flightResolver,
  Trajectory: flightTrajectoryResolver
} as Resolvers;
