import { Product } from './products';

describe('Product', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Product()).toBeTruthy();
  });
});
