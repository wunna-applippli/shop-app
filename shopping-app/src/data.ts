// src/data.ts
export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export const products: IProduct[] = [
  { id: 1, name: "りんご", price: 100 },
  { id: 2, name: "バナナ", price: 50 },
  { id: 3, name: "みかん", price: 80 },
  // 他の商品も同様に追加
];