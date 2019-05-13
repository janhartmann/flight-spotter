import { IOpenSkyNetworkApi } from "./api/OpenSkyNetworkApi";

export interface IContext {
  dataSources?: Partial<IDataServices>;
}

export interface IDataServices {
  flightApi: IOpenSkyNetworkApi;
}
