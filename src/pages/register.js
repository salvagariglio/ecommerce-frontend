"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

export default function RegisterPage() {
    const router = useRouter();
    const { user, loading, register } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading && user) {
            router.replace("/");
        }
    }, [user, loading, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            await register({ username, email, password });
            router.push("/");
        } catch (err) {
            setError(err.message || "Error al registrar");
        }
    };

    if (loading || user) {
        return <p className="text-center py-10">Cargando…</p>;
    }

    return (
        <div className="max-w-md mx-auto py-16">
            <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="username" className="block font-medium mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block font-medium mb-1">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-6 text-center">
                Already have an account? {" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
}