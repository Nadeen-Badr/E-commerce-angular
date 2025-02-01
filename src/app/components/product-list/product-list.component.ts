import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports:[CommonModule,FormsModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  orderDetails: Order | null = null; // To store the placed order details
  orderHistory: Order[] = []; // To store the order history

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  // Fetch all products
  loadProducts(): void {
    this.cartService.getAllProducts().subscribe((data: any[]) => {
      this.products = data.map((product: any) => ({ ...product, quantity: 1 }));
    });
  }

  // Add a product to the cart
  addToCart(productId: number, quantity: number): void {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.loadCart(); // Refresh the cart after adding
    });
  }

  // Fetch the cart
  loadCart(): void {
    this.cartService.viewCart().subscribe((data) => {
      this.cart = data;
    });
  }

  // Remove a product from the cart
  removeFromCart(cartItemId: number): void {
    this.cartService.removeFromCart(cartItemId).subscribe(() => {
      this.loadCart(); // Refresh the cart after removal
    });
  }

  // Place an order
  placeOrder(): void {
    this.cartService.placeOrder().subscribe((order: Order) => {
      this.orderDetails = order; // Store the order details
      this.loadCart(); // Refresh the cart after placing the order
    });
  }

  // Fetch order history
  loadOrderHistory(): void {
    this.cartService.getOrderHistory().subscribe((history: Order[]) => {
      this.orderHistory = history;
    });
  }
}