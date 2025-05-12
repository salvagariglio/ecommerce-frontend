import dynamic from 'next/dynamic';
import React from 'react';

const Delivery = dynamic(() => import('@/components/Delivery'), { ssr: false });

export default function DeliveryPage() {
    return (
        <div className="min-h-screen">
            <Delivery />
        </div>
    );
}
