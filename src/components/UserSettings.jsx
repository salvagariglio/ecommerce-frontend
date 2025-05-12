"use client";

import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/authContext';

export default function UserSettings({ initialTab = 'profile' }) {
    const {
        user,
        loading,
        logout,
        updateUserProfile,
        changePassword,
    } = useAuth();

    const [activeTab, setActiveTab] = useState(initialTab);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleSave = async () => {
        setError('');
        setSuccess('');

        try {
            if (activeTab === 'password') {
                if (!currentPassword || !newPassword || !confirmNewPassword) {
                    setError('Completa todos los campos de contraseña.');
                    return;
                }
                if (newPassword !== confirmNewPassword) {
                    setError('Las contraseñas nuevas no coinciden.');
                    return;
                }
                await changePassword({ currentPassword, newPassword });
                setSuccess('Contraseña actualizada correctamente.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                if (!username || !email) {
                    setError('Nombre y email no pueden estar vacíos.');
                    return;
                }
                await updateUserProfile({ username, email });
                setSuccess('Perfil actualizado correctamente.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p className="text-center py-10">Cargando…</p>;
    }

    return (
        <div className="mb-30 flex flex-col md:flex-row pt-6 pb-14 p-6 gap-6">
            <div className="md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-2 text-lg ${activeTab === 'profile' ? 'font-bold text-yellow-600' : 'text-gray-700'
                                }`}
                        >
                            <FaUser /> Profile
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('email')}
                            className={`flex items-center gap-2 text-lg ${activeTab === 'email' ? 'font-bold text-yellow-600' : 'text-gray-700'
                                }`}
                        >
                            <FaEnvelope /> Email
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={`flex items-center gap-2 text-lg ${activeTab === 'password' ? 'font-bold text-yellow-600' : 'text-gray-700'
                                }`}
                        >
                            <FaLock /> Password
                        </button>
                    </li>
                    <li className="pt-4 border-t">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-lg text-red-500 hover:text-red-700"
                        >
                            <FaSignOutAlt /> Log out
                        </button>
                    </li>
                </ul>
            </div>

            <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-600 mb-4">{success}</p>}

                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'email' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'password' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                )}

                <button
                    onClick={handleSave}
                    className="mt-6 w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
