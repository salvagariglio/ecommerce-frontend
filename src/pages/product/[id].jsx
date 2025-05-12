import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { MdOutlineStar, MdStar } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import { productsData } from '@/services/api';

export default function ProductPage({ product }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            _id: product.id ?? product._id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity,
            description: product.description,
            category: product.category,
        }));
        toast.success(`${product.title} agregado al carrito`);
    };

    let rawRating = 0;
    if (product.rating != null) {
        if (typeof product.rating === 'number') rawRating = product.rating;
        else if (typeof product.rating === 'string') rawRating = parseFloat(product.rating) || 0;
        else if (product.rating.rate != null) rawRating = product.rating.rate;
    }
    const rating = Math.min(Math.max(Math.round(rawRating), 0), 5);
    const stars = Array.from({ length: 5 }, (_, i) =>
        i < rating
            ? <MdStar key={i} className="text-yellow-500 text-lg" />
            : <MdOutlineStar key={i} className="text-gray-400 text-lg" />
    );
    const reviewCount = product.rating?.count;

    return (
        <div className="min-h-screen px-4 py-10">
            <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-2/5 flex justify-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="object-contain"
                    />
                </div>

                <div className="w-full lg:w-3/5 flex flex-col justify-center gap-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold">{product.title}</h1>
                    <div className="flex items-center gap-4">
                        {product.oldPrice && <p className="line-through text-gray-500">${product.oldPrice}</p>}
                        <p className="text-xl font-medium text-gray-900">${product.price}</p>
                    </div>

                    {reviewCount != null && (
                        <div className="flex items-center gap-2 text-base">
                            <div className="flex">{stars}</div>
                            <p className="text-sm text-gray-500">({reviewCount} reseña{reviewCount !== 1 ? 's' : ''})</p>
                        </div>
                    )}

                    <p className="text-base text-gray-600">{product.description}</p>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex items-center justify-between border p-3 rounded w-full sm:w-52 text-sm text-gray-600">
                            <span>Cantidad</span>
                            <div className="flex items-center gap-3 font-semibold">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="border px-2 py-1 hover:bg-gray-700 hover:text-white duration-300"
                                >-</button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="border px-2 py-1 hover:bg-gray-700 hover:text-white duration-300"
                                >+</button>
                            </div>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-6 py-3 w-full sm:w-auto hover:bg-gray-800 transition"
                        >Agregar al carrito</button>
                    </div>

                    <p className="text-sm text-gray-500">
                        <span className="font-medium capitalize">Categoría:</span> {product.category}
                    </p>
                </div>
            </div>

            <ToastContainer position="top-left" autoClose={2000} theme="dark" />
        </div>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const allProducts = await productsData();
        const product = allProducts.find(p => (
            (p.id != null && p.id.toString() === params.id) ||
            (p._id != null && p._id.toString() === params.id)
        ));
        if (!product) {
            return { notFound: true };
        }
        return { props: { product } };
    } catch (error) {
        console.error('Error fetching product from combined API:', error);
        return { notFound: true };
    }
}
