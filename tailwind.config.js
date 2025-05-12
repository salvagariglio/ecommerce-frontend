/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        // require('@tailwindcss/forms'),
        // require('@tailwindcss/typography'),
    ],
};

export default tailwindConfig;
