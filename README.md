# Real Time Flight Spotter

This is an example (and hopefully a source of inspiration), on how to create a real time flight spotter using React, TypeScript, GraphQL, MapBox and The OpenSky Network API for live flight data.

![Screenshot](https://github.com/janhartmann/flight-spotter/blob/master/docs/screenshot.png)

## Highlights

* The client is built using React (with hooks) and TypeScript.
* Strong typings between the client GraphQL queries and the server schema with type generation.
* JSS for component styling and theming.
* The map is built using the MapBox GL library, wrapped in custom React components and custom theme.
* The server is built using Apollo GraphQL Server and in TypeScript.
* The flight data is fetched from The OpenSky Network, removing the need for a data store.

## Prerequisite

* You will need a MapBox access token in order to display the map. For development and own-use it is perfectly fine to use their free option.
* (optional, but recommended) In order to have more recent flight data (~5 seconds), create a free account on https://opensky-network.org/. If you do not have an account the flight data will be aroudn ~10 seconds old.

Create an `.env` file in the root of the repository containing:

```
MAPBOX_ACCESS_TOKEN=yourtoken
OPENSKY_API_USERNAME=yourusername
OPENSKY_API_PASSWORD=yourpassword
```

## Development

Start by cloning the repository.

The repository is a mono-repository, meaning it consists of both a client and server. It is possible to install both the server and the clients dependencies by running the following from the root of the repository:

```
yarn install
```

To start the development server and client, run from the root of the repository:

```
yarn start
```

This will start up the Apollo GraphQL Server (together with a playground) on http://localhost:5000 as well as the client on http://localhost:3000.

## GraphQL Schema

Based on The OpenSky Network REST endpoints, we can create the following schema for querying our data:

![Schema](https://github.com/janhartmann/flight-spotter/blob/master/docs/schema.png)

## Limitations

The flight data is coming from The OpenSky Network and itself has a few limitations, please see https://opensky-network.org/apidoc/rest.html#limitations for more information.

There can be aircrafts which has just grounded but appears to be bypassing an airport, this can happend when we are predicting its flight path, but the aircraft landed on its path towards the airport.

Some flights can have missing data, like route information or trajectories.

## FAQ

**Predicting flight position using stale data**

One of the "limitations" of The OpenSky Network API is that the flight data can be delayed for approximately 5-10 seconds, depending if the request is sent using an registered account.

We are, however, able to predict where the aircraft is going by using its current position, velocity (m/s) and direction it is heading using the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula)

Thankfully, there exists a great geospatial analysis library [Turf.js](https://turfjs.org/) to help us with this calculation.

**Trajectory line to the arrival airport**

When working with a sphere, like the Earth, and you want to create a line from a-b (or in our case the current position of the aircraft and its destination), it is not just a straight line. We need to take the earths curvature into account. This is done by drawing a line using the [Great-circle distance](https://en.wikipedia.org/wiki/Great-circle_distance). This is why you see a arch on the e.g. transatlantic flights.

Again, we have [Turf.js](https://turfjs.org/) to help us with this calculation.

**GraphQL schema and resolver code-generation**

TODO

## License

MIT
