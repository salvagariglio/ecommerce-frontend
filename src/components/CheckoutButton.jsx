'use client'
import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

export default function CheckoutButton({ products }) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (products.length === 0) return;
        setLoading(true);
        try {
            const { data } = await axios.post("/api/checkout", { products });
            if (data.url) window.location.href = data.url;
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const disabled = loading || products.length === 0;

    return (
        <button
            onClick={handleCheckout}
            disabled={disabled}
            className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center transition ${disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
        >
            {loading ? <Loader size={20} /> : "Pagar con Mercado Pago"}
        </button>
    );
}