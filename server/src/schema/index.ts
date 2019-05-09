import { importSchema } from "graphql-import";
import * as path from "path";

export default importSchema(path.join(__dirname, "./schema.graphql"));
