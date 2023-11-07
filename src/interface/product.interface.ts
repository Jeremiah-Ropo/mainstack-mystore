export interface IProduct {
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  store_id: string;
}

export interface IProductInputDTO {
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
export interface IProductDocument extends IProduct, Document {}
