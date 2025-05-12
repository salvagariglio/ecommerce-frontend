"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!nombre || !email || !password || !confirm) {
            return setError("Todos los campos son obligatorios.");
        }

        if (password !== confirm) {
            return setError("Las contraseñas no coinciden.");
        }

        try {
            await register({ username: nombre, email, password });
            router.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div className="w-full sm:max-w-md p-5 mx-auto">
                <h2 className="mb-12 text-center text-5xl font-extrabold">Crear cuenta</h2>

                <form onSubmit={handleRegister}>
                    {error && (
                        <div className="mb-4 text-sm text-red-600 bg-red-100 rounded p-2">{error}</div>
                    )}

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="telefono">
                            Teléfono
                        </label>
                        <input
                            id="telefono"
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm w-full"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1" htmlFor="confirm">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="py-2 px-3 border border-gray-300 rounded-md shadow-sm w-full"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                        >
                            Registrarme
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="underline text-sm text-gray-700 hover:text-red-600"
                        >
                            Ya tengo una cuenta
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
