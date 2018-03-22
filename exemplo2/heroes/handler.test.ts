import { hello } from "./handler";

import { promisify } from "util";
import { Context } from "aws-lambda";
import * as Assert from "assert";
describe("heroes", () => {
  it("listar heroes", () => {
    hello({}, {} as Context, (err: Error, result: any) => {
      Assert.equal(result.statusCode, 200);
      Assert.ok(JSON.parse(result.body).data.length > 0);
    });
  });
});
