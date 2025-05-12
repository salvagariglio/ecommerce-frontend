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
        const endpoints = ['/products', '/nextamazon', '/amazonproducts'];

        const responses = await Promise.all(
            endpoints.map((url) => api.get(url))
        );

        const allItems = responses.flatMap((resp) => resp.data);

        const unified = allItems.map((item, index) => ({
            ...item,
            originalId: item.id ?? item._id,
            id: index + 1,
        }));

        return unified;
    } catch (error) {
        console.error('Error fetching productsData:', error);
        throw error;
    }
}

export default api;
