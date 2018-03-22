export class ProductList {
  description: string;
  price: number;
  insertionDate: Date;

  constructor(
    description: string,
    price: number,
    insertionDate: Date = new Date(),
  ) {
    this.description = description;
    this.price = price;
    this.insertionDate = insertionDate;
  }
}
