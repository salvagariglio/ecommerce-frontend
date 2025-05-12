"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get("code");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!code) return setError("Token no válido");
        if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres");
        if (password !== confirm) return setError("Las contraseñas no coinciden");

        try {
            const res = await fetch("http://localhost:1337/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, password, passwordConfirmation: confirm }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 3000);
            } else {
                throw new Error(data?.error?.message || "No se pudo restablecer la contraseña.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <div className="max-w-md w-full bg-white rounded shadow p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Restablecer contraseña</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Cambiar contraseña
                    </button>
                </form>

                {success && (
                    <p className="mt-4 text-green-600 text-sm text-center">
                        Contraseña actualizada correctamente. Redirigiendo al login...
                    </p>
                )}

                {error && (
                    <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
                )}
            </div>
        </main>
    );
}
