"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

export default function LoginPage() {
    const router = useRouter();
    const { user, loading, login } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading && user) {
            router.replace("/");
        }
    }, [user, loading, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login({ identifier, password });
            router.push("/");
        } catch (err) {
            setError(err.message || "Error al iniciar sesión");
        }
    };

    if (loading || user) {
        return <p className="text-center py-10">Cargando…</p>;
    }

    return (
        <div className="max-w-md mx-auto py-16">
            <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="identifier" className="block font-medium mb-1">
                        Email / Username
                    </label>
                    <input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
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
                    <div className="text-right pt-1">
                        <Link href="/forgot-password" className=" text-sm text-blue-600 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                >
                    Log In
                </button>
            </form>
            <p className="mt-6 text-center">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
