import { RESTDataSource } from "apollo-datasource-rest";

import { IContext } from "../context";

/**
 * See: https://opensky-network.org/apidoc/rest.html#response
 */
export interface IOpenSkyApiResponse {
  time: number;
  states: any[][];
}

export interface IOpenSkyApiStateResponse {
  [0]: string; // icao24
  [1]: string; // callsign
  [2]: string; // origin country
  [3]: number; // time position
  [4]: number; // last contact
  [5]: number; // longitude
  [6]: number; // latitude
  [7]: number; // baro altitude
  [8]: boolean; // on ground
  [9]: number; // velocity
  [10]: number; // true track
  [11]: number; // vertical rate
  [12]: number[]; // sensors
  [13]: number; // geo altitude
  [14]: string; // squawk
  [15]: boolean; // spi
  [16]: number; // position source
}

export interface IOpenSkyApiTrajectoryResponse {
  icao24: string;
  callsign: string;
  startTime: number;
  endTime: number;
  path: any[][];
}

export interface IOpenSkyApiTrajectoryPathResponse {
  [0]: number; // time
  [1]: number; // latitude
  [2]: number; // longitude
  [3]: number; // baro altitude
  [4]: number; // true track
  [5]: boolean; // on ground
}

export interface IFlightApi {
  getFlights(bounds: number[][]): Promise<IOpenSkyApiStateResponse[]>;
  getFlight(icao24: string): Promise<IOpenSkyApiStateResponse>;
  getTrajectory(
    icao24: string,
    time: number
  ): Promise<IOpenSkyApiTrajectoryResponse>;
}

export default class FlightApi extends RESTDataSource<IContext>
  implements IFlightApi {
  get baseURL() {
    return "https://opensky-network.org/api/";
  }

  public async getFlights(
    bounds: number[][]
  ): Promise<IOpenSkyApiStateResponse[]> {
    const result = await this.get<IOpenSkyApiResponse>(
      `states/all?lamin=${bounds[0][0]}&lomin=${bounds[0][1]}&lamax=${
        bounds[1][0]
      }&lomax=${bounds[1][1]}`
    );

    if (!result || !result.states) {
      return [];
    }

    return result.states.map(
      state => (state as unknown) as IOpenSkyApiStateResponse
    );
  }

  public async getFlight(icao24: string): Promise<IOpenSkyApiStateResponse> {
    const result = await this.get<IOpenSkyApiResponse>(
      `states/all?icao24=${icao24}`
    );

    if (!result || !result.states) {
      return null;
    }

    return (result.states[0] as unknown) as IOpenSkyApiStateResponse;
  }

  public async getTrajectory(
    icao24: string,
    time: number
  ): Promise<IOpenSkyApiTrajectoryResponse> {
    try {
      return await this.get<IOpenSkyApiTrajectoryResponse>(
        `tracks/all?icao24=${icao24}&time=${time}`
      );
    } catch {
      return null;
    }
  }
}
