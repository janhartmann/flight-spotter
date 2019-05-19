# Real Time Flight Spotter

This is an example (and hopefully a source of inspiration), on how to create a real time flight spotter using React, TypeScript, GraphQL, MapBox and The OpenSky Network API for live flight data.

![Screenshot](https://github.com/janhartmann/flight-spotter/blob/master/docs/screenshot.png)

## Highlights

* The client is built using React (with hooks) and TypeScript.
* Strong typings between the client GraphQL queries and the server schema.
* Using JSS for component styling and theming.
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

This will start up the Apollo GraphQL Server (together with a playground) on `http://localhost:5000` as well as the client on `http://localhost:3000`.

## Schema

![Schema](https://github.com/janhartmann/flight-spotter/blob/master/docs/schema.png)

## Limitations

The flight data is coming from The OpenSky Network and ititself has some limitations, please see https://opensky-network.org/apidoc/rest.html#limitations for a list.

There can be aircrafts which has just grounded but appears to be bypassing an airport, this can happend when we are predicting its flight path, but the aircraft landed on its path towards the airport.

## FAQ

*  TODO: Predicting flight position using stale data
*  TODO: Generate great circle trajectory
*  TODO: Code Generation

## Inspiration


## License

MIT
