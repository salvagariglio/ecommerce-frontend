import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapiserver.reactbd.com';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export async function productsData() {
    try {
        const [resp1, resp2, resp3] = await Promise.all([
            api.get('/products'),
            api.get('/nextamazon'),
            api.get('/amazonproducts'),
        ]);
        return [
            ...resp1.data,
            ...resp2.data,
            ...resp3.data,
        ];
    } catch (error) {
        console.error('Error fetching productsData:', error);
        throw error;
    }
}

export default api;
