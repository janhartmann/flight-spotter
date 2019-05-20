import "./env";
import { startServer } from "./server";

(async () => {
  const { url } = await startServer();
  // tslint:disable-next-line:no-console
  console.log(`✈️  Flight Spotter API ready at ${url}`);
})();
