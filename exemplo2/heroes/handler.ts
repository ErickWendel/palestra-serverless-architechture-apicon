import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { MongoClient } from "mongodb";

export const hello: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback,
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const connect = await MongoClient.connect(
    "mongodb://erickwendel:erickwendel@ds115799.mlab.com:15799/apicon",
  );
  const collection = connect.db("apicon").collection("heroes");
  await collection.insert({ name: "Hulk" + Date.now() });
  const result = await collection.find().toArray();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      data: result,
      input: event,
    }),
  };
  cb(null, response);
};
