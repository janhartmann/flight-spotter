import { IFlightApi } from "./api/FlightApi";

export interface IContext {
  dataSources?: Partial<IDataServices>;
}

export interface IDataServices {
  flightApi: IFlightApi;
}
