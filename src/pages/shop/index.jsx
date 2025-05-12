import React from 'react';
import Head from 'next/head';
import Products from '@/components/Shop';
import { productsData } from '@/services/api';


export default function Shop({ products }) {
    return (
        <>
            <Head>
                <title>Shop - My E-commerce</title>
                <meta name="description" content="Browse all products in our shop." />
            </Head>
            <main className="pb-20">
                <Products products={products} />
            </main>
        </>
    );
}

export async function getStaticProps() {
    const products = await productsData();
    return {
        props: { products },
        revalidate: 60,
    };
}
