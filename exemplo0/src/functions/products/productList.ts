import { config } from "dotenv";
import { join } from "path";
if (process.env.NODE_ENV === "production")
  config({ path: join(__dirname, "../_environment/.env.production") });
else config({ path: join(__dirname, "../_environment/.env.development") });

import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { ProductList } from "../../dtos/ProductList";
import { parseEventPayload } from "../_helpers/ParseEventPayload";
import { Db } from "../_helpers/Db";

console.log(`Using ${process.env.NODE_ENV} environment`);

export const handler: Handler = async function handler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) {
  try {
    // config to cache of mongoDB
    context.callbackWaitsForEmptyEventLoop = false;

    console.log("START", event);
    const { name, age } = event as any;
    const data = new ProductList(name, age);
    const connection = await Db.connect();
    const db = connection.collection("products");
    // await db.remove({});
    const create = await db.insert(data);
    const result = await db.find().toArray();

    return callback(null, result);
  } catch (err) {
    console.log("error", err);
    return callback(err, null);
  }
};
