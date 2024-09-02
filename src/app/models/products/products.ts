export class Product {
  constructor(
    public id: number,
    public name: string,
    public ownerUsername: string,
    public price: number,
    public description: string,
    public stock: number,
    public imageUrls: string[],
    public storeName: string,
    public categoryId: number
  ) {}
}
