import {
  RESTDataSource,
  RequestOptions,
  Request
} from "apollo-datasource-rest";

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

export interface IOpenSkyApiRouteResponse {
  callsign: string;
  route: [string, string];
  updateTime: number;
  operatorIata: string;
  flightNumber: number;
}

export interface IOpenSkyApiAirportResponse {
  icao: string;
  iata: string;
  name: string;
  city: string;
  type: string;
  position: {
    longitude: number;
    latitude: number;
    altitude: number;
    reasonable: boolean;
  };
}

export interface IOpenSkyNetworkApi {
  getFlights(bounds: number[][]): Promise<IOpenSkyApiStateResponse[]>;
  getFlight(icao24: string): Promise<IOpenSkyApiStateResponse>;
  getTrajectory(icao24: string): Promise<IOpenSkyApiTrajectoryResponse>;
  getRoute(callsign: string): Promise<IOpenSkyApiRouteResponse>;
  getAirports(
    bounds: number[][],
    size?: string
  ): Promise<IOpenSkyApiAirportResponse[]>;
  getAirport(icao: string): Promise<IOpenSkyApiAirportResponse>;
}

export default class OpenSkyNetworkApi extends RESTDataSource<IContext>
  implements IOpenSkyNetworkApi {
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
    icao24: string
  ): Promise<IOpenSkyApiTrajectoryResponse> {
    return this.get<IOpenSkyApiTrajectoryResponse>(`tracks/?icao24=${icao24}`);
  }

  public async getRoute(callsign: string): Promise<IOpenSkyApiRouteResponse> {
    return this.get<IOpenSkyApiRouteResponse>(`routes/?callsign=${callsign}`);
  }

  public async getAirports(
    bounds: number[][],
    size?: string
  ): Promise<IOpenSkyApiAirportResponse[]> {
    let url = `airports/region?lamin=${bounds[0][0]}&lomin=${
      bounds[0][1]
    }&lamax=${bounds[1][0]}&lomax=${bounds[1][1]}`;
    if (size) {
      url += `&type=${size}`;
    }
    return this.get<IOpenSkyApiAirportResponse[]>(url);
  }

  public async getAirport(icao: string): Promise<IOpenSkyApiAirportResponse> {
    return this.get<IOpenSkyApiAirportResponse>(`airports/?icao=${icao}`);
  }

  protected willSendRequest(request: RequestOptions) {
    const { OPENSKY_API_USERNAME, OPENSKY_API_PASSWORD } = process.env;
    if (OPENSKY_API_USERNAME && OPENSKY_API_PASSWORD) {
      request.headers.set(
        "Authorization",
        `Basic ${Buffer.from(
          OPENSKY_API_USERNAME + ":" + OPENSKY_API_PASSWORD
        ).toString("base64")}`
      );
    }
  }

  protected didEncounterError(error: Error, request: Request) {
    // tslint:disable-next-line: no-console
    console.error(
      JSON.stringify(
        {
          url: request.url,
          method: request.method,
          body: request.bodyUsed,
          headers: request.headers,
          error: {
            ...error
          }
        },
        null,
        2
      )
    );
  }
}
