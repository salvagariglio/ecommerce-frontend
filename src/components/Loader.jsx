'use client'
export default function Loader({ size = 20 }) {
    return (
        <div
            style={{ width: size, height: size }}
            className="border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"
        />
    );
}