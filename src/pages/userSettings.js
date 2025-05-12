"use client";

import { useRouter } from 'next/router';
import UserSettings from '@/components/UserSettings';

export default function UserSettingsPage() {
    const router = useRouter();
    const { tab } = router.query;              // 'email', 'profile' o 'password'
    const initialTab = Array.isArray(tab) ? tab[0] : tab;

    return <UserSettings initialTab={initialTab || 'profile'} />;
}
