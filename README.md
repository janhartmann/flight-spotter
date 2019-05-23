
# ✈️ Real Time Flight Spotter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This is an "full-stack" example (and hopefully a source of inspiration), on how to create a real time flight spotter using React, TypeScript, GraphQL, MapBox and The OpenSky Network API for live flight data tracking.

![Screenshot](https://github.com/janhartmann/flight-spotter/blob/master/docs/screenshot.png)

## Live Demo

**The interactive map with flights**

https://flight-spotter.janhartmann.dk

**The server with an active GraphQL Playground**

https://flight-spotter-api.janhartmann.dk

## Highlights

* The client is built using React (with hooks) and TypeScript.
* Strong typings between the client GraphQL queries and the server schema with type generation.
* JSS for component styling and theming.
* The map is built using the MapBox GL library, wrapped in custom React components and custom theme.
* The server is built using Apollo GraphQL Server and in TypeScript.
* The flight data is fetched from The OpenSky Network, removing the need for a data store.

## Prerequisite

* You will need a MapBox access token in order to display the map. For development and own-use it is perfectly fine to use their free option.
* (optional, but recommended) In order to have more recent flight data (~5 seconds), create a free account on [their website](https://opensky-network.org/). If you do not have an account the flight data will be around ~10 seconds old.

## Development

Start by cloning the repository.

The repository is a mono-repository, meaning it consists of both a client and server. It is possible to install both the server and the clients dependencies by running the following from the root of the repository:

```
yarn install
```

Now, create an `.env` file in the `./server` directory containing:

```
OPENSKY_API_USERNAME=<your-username>
OPENSKY_API_PASSWORD=<your-password>
```

Then create another `.env` file in the `./client` directory containing:

```
MAPBOX_ACCESS_TOKEN=<your-token>
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

The flight data is coming from The OpenSky Network and itself has a few limitations, please see [their page](https://opensky-network.org/apidoc/rest.html#limitations) for more information.

There can be aircraft's which has just grounded but appears to be bypassing an airport, this can happend when we are predicting its flight path, but the aircraft landed on its path towards the airport.

Some flights can have missing data, like route information, trajectories and altitude data being wrong.

Sometimes The OpenSky Network API can be down for a very short period of time, if it is getting a lot of requests at the same time.

## FAQ

**Predicting flight position using stale data**

One of the "limitations" of The OpenSky Network API is that the flight data can be delayed for approximately 5-10 seconds, depending if the request is sent using an registered account.

We are, however, able to predict where the aircraft is going by using its current position, velocity (m/s) and direction it is heading using the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula).

Thankfully, there exists a great geospatial analysis library [Turf.js](https://turfjs.org/) to help us with this calculation.

Once we have the predicted next destination, we can create a line to the point from the current known position of the aircraft, split it into segments and animate it over a duration until we get the new position from the server.

**Trajectory line to the arrival airport**

When working with a sphere, like the Earth, and you want to create a line from a-b (or in our case the current position of the aircraft and its destination), it is not just a straight line. We need to take the earths curvature into account. This is done by drawing a line using the [Great-circle distance](https://en.wikipedia.org/wiki/Great-circle_distance). This is why you see a arch on the e.g. transatlantic flights.

Again, we have [Turf.js](https://turfjs.org/) to help us with this calculation.

**GraphQL schema and resolver code-generation**

When querying the server for data, we use the [GraphQL Code Generator](https://graphql-code-generator.com) to generate TypeScript typings from the server schema. Both for our resolver types, but also our client query types.

This is done to avoid writing the same things which are already described by the GraphQL schema. When we change the schema or a client query and reboot the server, new types are automatically generated and can be referenced in the code.

## Contributions

Have an idea, a bug fix, comments or questions? Open an issue and let's have a talk!

## License

MIT
