export interface OrderItem {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    quantity: number;
  }
  
  export interface Order {
    id: number;
    orderDate: string;
    totalAmount: number;
    orderItems: OrderItem[];
  }