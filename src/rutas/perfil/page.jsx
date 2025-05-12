"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const tabs = [
    { id: "nombre", label: "Nombre" },
    { id: "email", label: "Email" },
    { id: "telefono", label: "Teléfono" },
    { id: "direcciones", label: "Direcciones" }
];

export default function PerfilPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("nombre");
    const [addresses, setAddresses] = useState([""]);

    useEffect(() => {
        if (!user) router.push("/login");
    }, [user, router]);

    const handleAddAddress = () => {
        setAddresses([...addresses, ""]);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "nombre":
                return (
                    <div>
                        <label className="block font-semibold mb-2">Nombre</label>
                        <input
                            defaultValue={user?.username}
                            className="border px-3 py-2 rounded w-full"
                        />
                    </div>
                );
            case "email":
                return (
                    <div>
                        <label className="block font-semibold mb-2">Email</label>
                        <input
                            defaultValue={user?.email}
                            className="border px-3 py-2 rounded w-full"
                        />
                    </div>
                );
            case "telefono":
                return (
                    <div>
                        <label className="block font-semibold mb-2">Teléfono</label>
                        <input
                            placeholder="(a definir en backend)"
                            className="border px-3 py-2 rounded w-full"
                        />
                    </div>
                );
            case "direcciones":
                return (
                    <div>
                        <label className="block font-semibold mb-2">Direcciones</label>
                        {addresses.map((addr, index) => (
                            <input
                                key={index}
                                value={addr}
                                onChange={(e) => {
                                    const updated = [...addresses];
                                    updated[index] = e.target.value;
                                    setAddresses(updated);
                                }}
                                className="border px-3 py-2 rounded w-full mb-2"
                            />
                        ))}
                        <button
                            type="button"
                            onClick={handleAddAddress}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Agregar otra dirección
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!user) return null;

    return (
        <main className="w-full min-h-screen px-6 py-12 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-6">Configuración de mi perfil</h2>

                <div className="flex gap-4 mb-6 overflow-x-auto border-b">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-2 px-2 text-sm font-medium border-b-2 transition ${activeTab === tab.id
                                    ? "border-red-600 text-red-600"
                                    : "border-transparent text-gray-500 hover:text-red-500"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form className="space-y-4">
                    {renderTabContent()}
                    <div className="text-right pt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}