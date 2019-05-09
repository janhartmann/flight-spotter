export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  DateTime: Date;
};

export type Altitude = {
  /** Barometric altitude in meters. Can be null. */
  barometric?: Maybe<Scalars["Float"]>;
  /** Geometric altitude in meters. Can be null. */
  geometric?: Maybe<Scalars["Float"]>;
};

export type Coordinates = {
  /** WGS-84 longitude Can be null. */
  longitude?: Maybe<Scalars["Float"]>;
  /** WGS-84 latitude Can be null. */
  latitude?: Maybe<Scalars["Float"]>;
};

export type Flight = {
  /** Unique ICAO 24-bit address of the transponder in hex string representation. */
  id: Scalars["String"];
  /** Callsign of the vehicle (8 chars). Can be null if no callsign has been received. */
  callsign?: Maybe<Scalars["String"]>;
  /** Country name inferred from the ICAO 24-bit address. */
  originCountry: Scalars["String"];
  /** Unix timestamp (seconds) for the last position update. Can be null if no
   * position report was received by OpenSky within the past 15s.
   */
  timePosition?: Maybe<Scalars["Int"]>;
  /** Unix timestamp (seconds) for the last update in general. This field is updated
   * for any new, valid message received from the transponder.
   */
  lastContact: Scalars["Int"];
  /** WGS-84 longitude and latitude in decimal degrees. Can be null. */
  coordinates?: Maybe<Coordinates>;
  /** Flight altitude. Can be null. */
  altitude?: Maybe<Altitude>;
  /** Boolean value which indicates if the position was retrieved from a surface position report. */
  grounded?: Maybe<Scalars["Boolean"]>;
  /** Velocity over ground in m/s. Can be null. */
  velocity?: Maybe<Scalars["Float"]>;
  /** Direction in decimal degrees clockwise from north (north=0°). Can be null. */
  direction?: Maybe<Scalars["Float"]>;
  /** Vertical rate in m/s. A positive value indicates that the flight is climbing,
   * a negative value indicates that it descends. Can be null.
   */
  verticalRate?: Maybe<Scalars["Float"]>;
  /** ID's of the receivers which contributed to this state vector. Is null if no filtering for sensor was used in the request. */
  sensors?: Maybe<Array<Scalars["Int"]>>;
  /** The transponder code aka Squawk. Can be null. */
  squawk?: Maybe<Scalars["String"]>;
  /** Whether flight status indicates special purpose indicator. */
  spi: Scalars["Boolean"];
  /** Origin of this state’s position */
  positionSource?: Maybe<PositionSource>;
  /** Retrieve the trajectory for the flight */
  trajectory?: Maybe<Trajectory>;
};

export type FlightTrajectoryArgs = {
  input: TrajectoryInput;
};

export type FlightInput = {
  /** Unique ICAO 24-bit address of the transponder in hex string representation. */
  id: Scalars["String"];
};

export type FlightsInput = {
  latitudeMin: Scalars["Float"];
  longitudeMin: Scalars["Float"];
  latitudeMax: Scalars["Float"];
  longitudeMax: Scalars["Float"];
};

export enum PositionSource {
  AdsB = "ADS_B",
  Asterix = "ASTERIX",
  Mlat = "MLAT"
}

export type Query = {
  /** Gets all flights */
  flights?: Maybe<Array<Flight>>;
  /** Gets a single flight */
  flight?: Maybe<Flight>;
};

export type QueryFlightsArgs = {
  input: FlightsInput;
};

export type QueryFlightArgs = {
  input: FlightInput;
};

export type Trajectory = {
  /** Time of the first waypoint in seconds since epoch (Unix time). */
  startTime: Scalars["Int"];
  /** Time of the last waypoint in seconds since epoch (Unix time). */
  endTime: Scalars["Int"];
  paths?: Maybe<Array<TrajectoryPath>>;
};

export type TrajectoryInput = {
  /** Unix time in seconds since epoch. It can be any time betwee start and end of a
   * known flight. If time = 0, get the live track if there is any flight ongoing
   */
  time: Scalars["Int"];
};

export type TrajectoryPath = {
  time: Scalars["Int"];
  coordinates: Coordinates;
  altitude?: Maybe<Altitude>;
  direction: Scalars["Float"];
  grounded?: Maybe<Scalars["Boolean"]>;
};
export type GetFlightsQueryVariables = {
  input: FlightsInput;
};

export type GetFlightsQuery = { __typename?: "Query" } & {
  flights: Maybe<
    Array<
      { __typename?: "Flight" } & Pick<
        Flight,
        "id" | "callsign" | "grounded" | "direction"
      > & {
          coordinates: Maybe<
            { __typename?: "Coordinates" } & Pick<
              Coordinates,
              "longitude" | "latitude"
            >
          >;
        }
    >
  >;
};

export type GetFlightPopupQueryVariables = {
  input: FlightInput;
};

export type GetFlightPopupQuery = { __typename?: "Query" } & {
  flight: Maybe<
    { __typename?: "Flight" } & Pick<Flight, "id" | "callsign"> & {
        coordinates: Maybe<
          { __typename?: "Coordinates" } & Pick<
            Coordinates,
            "longitude" | "latitude"
          >
        >;
      }
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const GetFlightsDocument = gql`
  query GetFlights($input: FlightsInput!) {
    flights(input: $input) {
      id
      callsign
      coordinates {
        longitude
        latitude
      }
      grounded
      direction
    }
  }
`;

export const GetFlightsComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<GetFlightsQuery, GetFlightsQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables: GetFlightsQueryVariables }
) => (
  <ReactApollo.Query<GetFlightsQuery, GetFlightsQueryVariables>
    query={GetFlightsDocument}
    {...props}
  />
);

export type GetFlightsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetFlightsQuery, GetFlightsQueryVariables>
> &
  TChildProps;
export function withGetFlights<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetFlightsQuery,
    GetFlightsQueryVariables,
    GetFlightsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetFlightsQuery,
    GetFlightsQueryVariables,
    GetFlightsProps<TChildProps>
  >(GetFlightsDocument, {
    alias: "withGetFlights",
    ...operationOptions
  });
}
export const GetFlightPopupDocument = gql`
  query GetFlightPopup($input: FlightInput!) {
    flight(input: $input) {
      id
      callsign
      coordinates {
        longitude
        latitude
      }
    }
  }
`;

export const GetFlightPopupComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<GetFlightPopupQuery, GetFlightPopupQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables: GetFlightPopupQueryVariables }
) => (
  <ReactApollo.Query<GetFlightPopupQuery, GetFlightPopupQueryVariables>
    query={GetFlightPopupDocument}
    {...props}
  />
);

export type GetFlightPopupProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetFlightPopupQuery, GetFlightPopupQueryVariables>
> &
  TChildProps;
export function withGetFlightPopup<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetFlightPopupQuery,
    GetFlightPopupQueryVariables,
    GetFlightPopupProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetFlightPopupQuery,
    GetFlightPopupQueryVariables,
    GetFlightPopupProps<TChildProps>
  >(GetFlightPopupDocument, {
    alias: "withGetFlightPopup",
    ...operationOptions
  });
}
export namespace GetFlights {
  export type Variables = GetFlightsQueryVariables;
  export type Query = GetFlightsQuery;
  export type Flights = GetFlightsQuery["flights"][0];
  export type Coordinates = GetFlightsQuery["flights"][0]["coordinates"];
  export type Props = GetFlightsProps;
  export const Document = GetFlightsDocument;
  export const HOC = withGetFlights;
  export const Component = GetFlightsComponent;
}

export namespace GetFlightPopup {
  export type Variables = GetFlightPopupQueryVariables;
  export type Query = GetFlightPopupQuery;
  export type Flight = GetFlightPopupQuery["flight"];
  export type Coordinates = GetFlightPopupQuery["flight"]["coordinates"];
  export type Props = GetFlightPopupProps;
  export const Document = GetFlightPopupDocument;
  export const HOC = withGetFlightPopup;
  export const Component = GetFlightPopupComponent;
}

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
};

export default result;
