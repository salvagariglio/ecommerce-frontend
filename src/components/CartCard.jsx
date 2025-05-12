"use client";
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '@/store/slices/cartSlice';
import { MdDelete } from 'react-icons/md';

export default function CartCard({ item }) {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-4">
                <div className="w-24 h-24 relative">
                    <Image src={item.image} alt={item.title} fill className="object-cover rounded-md" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">${item.price} each</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div>
                    <button
                        onClick={() => dispatch(decrementQuantity(item._id))}
                        className="mr-2 px-2 py-1 border hover:bg-gray-700 hover:text-white duration-300"
                    >-</button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                        onClick={() => dispatch(incrementQuantity(item._id))}
                        className="ml-2 px-2 py-1 border hover:bg-gray-700 hover:text-white duration-300"
                    >+</button>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-red-800 hover:text-red-600"
                    >
                        <MdDelete size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
