"use client";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartCard from './CartCard';
import CheckoutButton from './CheckoutButton';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartSection() {
    const products = useSelector(state => state.cart.products || []);
    const [loading, setLoading] = useState(false);

    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const tax = subtotal * 0.05;
    const shipping = products.length > 0 ? 5.99 : 0;
    const total = subtotal + tax + shipping;

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4">
                {/* Sección de productos */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
                    {products.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {products.map(item => (
                                <CartCard key={item._id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <FiShoppingCart size={80} className="text-gray-400 mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                            <Link href="/shop" className="px-8 py-2 text-white bg-amber-400 rounded hover:bg-amber-500 transition">
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>

                {/* Resumen de orden */}
                {products.length > 0 && (
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                            <div className="flex justify-between text-lg mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg mb-2">
                                <span className="text-gray-600">Tax (5%)</span>
                                <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg mb-2">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-semibold text-gray-800">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-semibold text-gray-800 mb-4">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <CheckoutButton products={products} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
