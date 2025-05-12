"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`${API_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                    setJwt(token);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    setJwt(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const register = async ({ username, email, password }) => {
        const res = await fetch(`${API_URL}/api/auth/local/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Error en el registro");
        localStorage.setItem("token", data.jwt);
        setUser(data.user);
        setJwt(data.jwt);
    };

    const login = async ({ identifier, password }) => {
        const res = await fetch(`${API_URL}/api/auth/local`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Error en el login");
        localStorage.setItem("token", data.jwt);
        setUser(data.user);
        setJwt(data.jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setJwt(null);
        router.push("/login");
    };

    const updateUserProfile = async ({ username, email }) => {
        if (!jwt || !user) throw new Error("No autorizado");
        const res = await fetch(`${API_URL}/api/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: { username, email } }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error?.message || `Error ${res.status}`);
        setUser(result.data || result);
    };

    const changePassword = async ({ currentPassword, newPassword }) => {
        if (!jwt) throw new Error("No autorizado");
        const res = await fetch(`${API_URL}/api/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ currentPassword, password: newPassword }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error?.message || `Error ${res.status}`);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                jwt,
                loading,
                login,
                register,
                logout,
                updateUserProfile,
                changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
