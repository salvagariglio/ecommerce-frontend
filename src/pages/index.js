import React from 'react';
import { productsData } from '@/services/api';
import Discounts from '@/components/Discounts';
import BuyNowSection from '@/components/BuyNowSection';
import portadaWomen from '@/assets/portada1.jpg';
import portadaJewelry from '@/assets/portada2.jpg';
import portadaTech from '@/assets/portada3.jpg';

export default function Home({ products }) {
    const womenProducts = products.filter(
        (p) => p.category === 'women'
    );
    const jewelryProducts = products.filter(
        (p) => p.category === 'jewelery'
    );
    const electronicsProducts = products.filter(
        (p) => p.category === 'electronics'
    );

    return (
        <div className="pb-20 ">
            <BuyNowSection
                imageSrc={portadaWomen.src}
                title="Encuentra lo que necesitas"
                subtitle="Todo lo que buscás, lo tenés acá"
                showButton
            />
            <div className="py-5">
                <Discounts products={womenProducts} category="women" />
            </div>

            <BuyNowSection
                imageSrc={portadaJewelry.src}
                title="Encuentra lo que necesitas"
                subtitle="Todo lo que buscás, lo tenés acá"
                showButton
            />
            <div className="py-5">
                <Discounts
                    products={jewelryProducts}
                    category="jewelery"
                />
            </div>

            <BuyNowSection
                imageSrc={portadaTech.src}
                title="Encuentra lo que necesitas"
                subtitle="Todo lo que buscás, lo tenés acá"
                showButton
            />
            <div className="py-5">
                <Discounts
                    products={electronicsProducts}
                    category="electronics"
                />
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const products = await productsData();
    return {
        props: { products },
        revalidate: 60,
    };
}
