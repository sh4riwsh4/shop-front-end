export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public author: string | null,
    public content: string,
    public date: string,
    public rating: number,
  ) {}
}
