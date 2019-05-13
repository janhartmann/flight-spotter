import { Resolvers } from "./generated-types";
import { queryResolver } from "./query";
import { flightResolver } from "./flight";
import { trajectoryResolver } from "./trajectory";
import { airportResolver } from "./airport";
import { routeResolver } from "./route";

// tslint:disable-next-line:no-object-literal-type-assertion
export default {
  Query: queryResolver,
  Flight: flightResolver,
  Trajectory: trajectoryResolver,
  Route: routeResolver,
  Airport: airportResolver
} as Resolvers;
