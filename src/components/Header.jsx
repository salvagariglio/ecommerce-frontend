"use client";
import { useState, useEffect } from 'react';


export default function Header() {
    const messages = [
        'Free shipping on orders over $159,999',
        '3 and 6 interest-free installments '
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="hidden sm:flex items-center justify-center py-4 bg-gray-800">
                <div className="flex items-center space-x-4">
                    <h2 className="text-white font-semibold">{messages[0]}</h2>
                    <span className="text-white">|</span>
                    <h2 className="text-white font-semibold">{messages[1]}</h2>
                </div>
            </div>

            <div className="sm:hidden relative py-4 bg-gray-800 overflow-hidden">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out transform ${currentIndex === idx ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            }`}
                    >
                        <h2 className="text-white">{msg}</h2>
                    </div>
                ))}
            </div>
        </>
    );
}
