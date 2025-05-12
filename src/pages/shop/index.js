import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Products from '@/components/Shop';
import FilterBar from '@/components/FilterBar';
import { productsData } from '@/services/api';

export default function Shop({ products, categories, brands, priceRange }) {
    const [all, setAll] = useState(products);
    const [filtered, setFiltered] = useState(products);

    useEffect(() => {
        setAll(products);
        setFiltered(products);
    }, [products]);

    const handleFilterChange = (filters) => {
        let tmp = [...all];

        if (filters.category) {
            tmp = tmp.filter(p => p.category === filters.category);
        }
        if (filters.brand) {
            tmp = tmp.filter(p => p.brand && p.brand === filters.brand);
        }
        if (
            filters.priceMin != null &&
            filters.priceMax != null
        ) {
            tmp = tmp.filter(
                p => p.price >= filters.priceMin && p.price <= filters.priceMax
            );
        }

        setFiltered(tmp);
    };

    const handleSortChange = (sortKey) => {
        const tmp = [...filtered];
        if (sortKey === 'price-asc') {
            tmp.sort((a, b) => a.price - b.price);
        } else if (sortKey === 'price-desc') {
            tmp.sort((a, b) => b.price - a.price);
        }
        setFiltered(tmp);
    };

    return (
        <>
            <Head>
                <title>Shop – My E-commerce</title>
                <meta name="description" content="Browse all products in our shop." />
            </Head>
            <main className="container mx-auto px-4 pb-20">
                <div className=" mt-10 flex flex-col items-center gap-4">
                    <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
                        Shopping Every Day
                    </h1>
                    <span className="w-20 h-[3px] bg-black"></span>
                    <p className="max-w-[700px] text-gray-600 text-center px-4">
                        Discover a world of products at your fingertips. From cutting-edge electronics
                        to trendy fashion, home essentials, and more, we bring you the best deals every day.
                        Shop with confidence and enjoy fast delivery, easy returns, and exceptional customer service.
                    </p>
                </div>
                <FilterBar
                    categories={categories}
                    brands={brands}
                    priceRange={priceRange}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />
                <Products products={filtered} />
            </main>
        </>
    );
}

export async function getStaticProps() {
    const products = await productsData();

    const categories = Array.from(
        new Set(products.map(p => p.category).filter(Boolean))
    );
    const brands = Array.from(
        new Set(products.map(p => p.brand).filter(Boolean))
    );

    const prices = products
        .map(p => p.price)
        .filter(v => typeof v === 'number');
    const priceRange = {
        min: Math.min(...prices),
        max: Math.max(...prices),
    };

    return {
        props: { products, categories, brands, priceRange },
        revalidate: 60,
    };
}
