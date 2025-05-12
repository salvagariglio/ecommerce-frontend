"use client";
import { useState } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdWarehouse } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';


export default function Delivery() {
    const router = useRouter();

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const user = useSelector(state => state.auth.user);

    const handleSelection = method => {
        setSelectedMethod(method);
        setIsModalOpen(true);
    };

    const handleChangeEmail = () => {
        router.push({ pathname: '/userSettings', query: { tab: 'email' } });
    };

    return (
        <div className="px-6 py-20 md:p-10 flex flex-col items-center justify-center gap-5 w-full max-w-4xl mx-auto">
            <div className="w-full text-center">
                <div className="py-5">
                    <p className="text-lg text-gray-700">
                        Your registered email is <span className="font-semibold text-black">{user?.email || 'email@example.com'}</span>
                    </p>
                    <button onClick={handleChangeEmail} className="font-bold underline text-blue-600 hover:text-blue-800">
                        Change email account
                    </button>
                </div>
                <div className="py-5">
                    <p className="text-xl font-semibold text-black">Choose a delivery method</p>
                    <p className="text-gray-600 text-sm">
                        To provide you with a better shopping experience, please tell us how you would like to receive your order.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
                <button
                    onClick={() => handleSelection('delivery')}
                    className={`w-full md:w-1/2 border-2 rounded-lg overflow-hidden hover:border-yellow-400 transition-all ${selectedMethod === 'delivery' ? 'border-yellow-400' : 'border-gray-700'
                        }`}
                >
                    <div className="flex items-center justify-center bg-gray-100 p-5">
                        <TbTruckDelivery size={120} className="text-gray-700" />
                    </div>
                    <div className="p-5 text-center">
                        <p className="font-bold text-lg">Home Delivery</p>
                        <p className="text-gray-600 text-sm">Minimum purchase amount $3500</p>
                    </div>
                </button>
                <button
                    onClick={() => handleSelection('pickup')}
                    className={`w-full md:w-1/2 border-2 rounded-lg overflow-hidden hover:border-yellow-400 transition-all ${selectedMethod === 'pickup' ? 'border-yellow-400' : 'border-gray-700'
                        }`}
                >
                    <div className="flex items-center justify-center bg-gray-100 p-5">
                        <MdWarehouse size={120} className="text-gray-700" />
                    </div>
                    <div className="p-5 text-center">
                        <p className="font-bold text-lg">Pickup at Warehouse</p>
                        <p className="text-gray-600 text-sm">Minimum purchase amount $2000</p>
                    </div>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <p className="text-gray-700 mt-2">
                            You have selected {selectedMethod === 'delivery' ? 'Home Delivery' : 'Pickup at Warehouse'}.
                        </p>
                        {selectedMethod === 'delivery' && (
                            <div className="mt-4">
                                <label className="block text-gray-700 font-semibold">Shipping address</label>
                                <input
                                    type="text"
                                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold">Select a date</label>
                            <input
                                type="date"
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                max={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold">Select a time slot</label>
                            <select
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                                value={selectedTime}
                                onChange={e => setSelectedTime(e.target.value)}
                            >
                                <option value="">Select a time</option>
                                {[...Array(7)].map((_, i) => (
                                    <option key={i} value={`${9 + i}:00`}>{`${9 + i}:00`}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                className="w-44 h-12 px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition-all"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="w-44 h-12 border border-black rounded-md bg-black text-white hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
