"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toast } from 'react-toastify';
import { BsArrowRight } from 'react-icons/bs';

/**
 * Tarjeta de producto para catálogo y carrusel (Next.js)
 * @param {{ product: { _id?: string; id?: number; title: string; image: string; price: number; description: string; category: string; isNew?: boolean; oldPrice?: number; } }} props
 */
export default function ProductsCard({ product }) {
    const dispatch = useDispatch();

    const productId = product.id ?? product._id;

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                _id: productId,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: 1,
                description: product.description,
                category: product.category,
            })
        );
        toast.success(`${product.title} added to cart`);
    };

    return (
        <div className="group relative">
            <Link
                href={`/shop/${productId}`}
                className="block relative w-full overflow-hidden h-48 sm:h-80 md:h-96"
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </Link>

            <div className="w-full px-2 py-4">
                <h2 className="font-titleFont text-base font-bold mb-2">
                    {product.title.length > 15
                        ? `${product.title.substring(0, 15)}...`
                        : product.title}
                </h2>
                <div className="flex justify-between items-center text-sm mb-4">
                    {product.oldPrice != null && (
                        <p className="line-through text-gray-500">${product.oldPrice}</p>
                    )}
                    <p className="font-semibold">${product.price}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition duration-300"
                >
                    Add to cart <BsArrowRight />
                </button>
                <p className="mt-2 text-sm text-gray-600">{product.category}</p>
                {product.isNew && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-black text-white font-semibold px-4 py-1 text-xs">
                            Sale
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
