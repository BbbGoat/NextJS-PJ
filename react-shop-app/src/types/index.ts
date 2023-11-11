export interface IProduct {
    id: string;
    brand: string;
    category: string;
    desc: string;
    imageURL: string;
    name: string;
    price: number;
}

export interface IShippingAddress {
    city: string;
    line: string;
    name: string;
    postalCode: string;
}

export type TCartItem = IProduct & {cartQuantity: number;}

export interface IOrder {
    id: string;
    orderAmount: number;
    orderDate: string;
    orderStatus: string;
    orderTime: string;
    userEmail: string;
    userID: string;
    cartItems: TCartItem[];
    shippingAddress: IShippingAddress; 
}