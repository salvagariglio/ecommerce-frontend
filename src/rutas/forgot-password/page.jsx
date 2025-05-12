"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:1337/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else {
                throw new Error(data?.error?.message || "No se pudo enviar el email.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <div className="max-w-md w-full bg-white rounded shadow p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Recuperar contraseña</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        {loading ? "Enviando..." : "Enviar enlace"}
                    </button>
                </form>

                {success && (
                    <p className="mt-4 text-green-600 text-sm text-center">
                        Revisa tu correo para continuar el proceso de recuperación.
                    </p>
                )}

                {error && (
                    <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
                )}
            </div>
        </main>
    );
}
