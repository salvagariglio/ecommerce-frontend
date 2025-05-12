"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';
import { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import car from '../assets/carrito.png';
import userLogo from '../assets/usuario.png';

export default function NavBar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full bg-white border-b border-gray-300 font-titleFont sticky top-0 z-50 shadow-sm min-h-[100px] py-3">
            <div className="md:py-6 relative max-w-screen-xl mx-auto flex flex-col items-center">
                <div className="absolute left-3 md:left-4 top-1/3 md:top-1/2 transform -translate-y-1/2">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Logo"
                            className="w-28 md:w-60 h-auto cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="absolute right-4 top-1/3 md:top-1/2 transform -translate-y-1/2 flex items-center gap-6">
                    <Link href="/cart">
                        <Image src={car} alt="Carrito" className="w-6 md:w-9 h-auto" />
                    </Link>

                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setMenuOpen(prev => !prev)}>
                                <Image
                                    src={userLogo}
                                    alt="Usuario"
                                    className="w-5 md:w-7 h-auto cursor-pointer"
                                />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                                    <Link href="/userSettings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        User Settings
                                    </Link>
                                    <button
                                        onClick={() => { setMenuOpen(false); logout(); }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-lg md:text-xl text-black hover:text-yellow-500">
                                <button onClick={() => setMenuOpen(prev => !prev)}>
                                    <Image
                                        src={userLogo}
                                        alt="Usuario"
                                        className="w-5 md:w-7 h-auto cursor-pointer"
                                    />
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                <nav className="w-full pt-14 md:pt-0 flex flex-wrap justify-center gap-x-10 gap-y-2">
                    <Link
                        href="/"
                        className="text-lg md:text-2xl font-bold text-black hover:text-yellow-500 hover:underline underline-offset-2"
                    >
                        Home
                    </Link>
                    <Link
                        href="/shop"
                        className="text-lg md:text-2xl font-bold text-black hover:text-yellow-500 hover:underline underline-offset-2"
                    >
                        Shop
                    </Link>
                    <Link
                        href="/delivery"
                        className="text-lg md:text-2xl font-bold text-black hover:text-yellow-500 hover:underline underline-offset-2"
                    >
                        Delivery
                    </Link>
                </nav>
            </div>
        </div>
    );
}
