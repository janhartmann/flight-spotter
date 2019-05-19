// tslint:disable-next-line: no-var-requires
require("dotenv").config({
  path: "../.env"
});

import { startServer } from "./server";

(async () => {
  const { url } = await startServer();
  // tslint:disable-next-line:no-console
  console.log(`🚀  Flight Spotter API ready at ${url}`);
})();
