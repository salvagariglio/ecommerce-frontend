"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return setError("Todos los campos son obligatorios.");
        }

        try {
            await login({ identifier: email, password });
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div className="w-full sm:max-w-md p-5 mx-auto">
                <h2 className="mb-12 text-center text-5xl font-extrabold">Bienvenido</h2>
                <form onSubmit={handleLogin}>
                    {error && (
                        <div className="mb-4 text-sm text-red-600 bg-red-100 rounded p-2">{error}</div>
                    )}

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                            />
                            <label
                                htmlFor="remember_me"
                                className="ml-2 block text-sm leading-5 text-gray-900"
                            >
                                Recordarme
                            </label>
                        </div>
                        <Link href="/forgot-password" className="text-sm text-red-600 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                        >
                            Ingresa
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/register"
                            className="underline text-sm text-gray-700 hover:text-red-600"
                        >
                            Crear una cuenta
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
