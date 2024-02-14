export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  color: string;
  image: string;
  description: string;
  price: number | string;
  quantity: undefined | number;
  productId?: undefined | number;
}
export interface Cart {
  id: number | any;
  userId: number;
  productId: number | undefined;
  name: string;
  category: string;
  color: string;
  image: string;
  description: string;
  price: number | string;
  quantity: undefined | number;
}
export interface summaryDetails {
  Subtotal: number;
  Shipping: number;
  Total: number;
}
export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: number;
  id: number | undefined;
}
