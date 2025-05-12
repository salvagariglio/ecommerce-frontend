"use client";
import dynamic from 'next/dynamic';
import React from 'react';

const CartSection = dynamic(() => import('@/components/CartSection'), { ssr: false });

export default function CartPage() {
    return (
        <div className="min-h-screen">
            <CartSection />
        </div>
    );
}
