import { handler } from "./productList";
import * as assert from "assert";
import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { ProductList } from "../../dtos/ProductList";
describe("product module", () => {
  describe("product list test", () => {
    it("should be return a product list when I pass a product to create", async () => {
      handler(
        {
          body: JSON.stringify({
            description: "Pão-" + Date.now(),
            price: Date.now(),
          }),
        },
        <Context>{},
        (error: any, result: ProductList[]) => {
          const [product] = result;
          assert.ok(product.description !== undefined);
          assert.ok(product.price !== undefined);
          assert.ok(product.insertionDate !== undefined);
        },
      );
    });
  });
});
