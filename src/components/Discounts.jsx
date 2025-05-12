"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductsCard from './ProductCard';

export default function Discounts({ products, category }) {
    if (!Array.isArray(products) || !category) return null;
    const filtered = products.filter(item => item.category === category);
    if (filtered.length === 0) return null;

    return (
        <div className="relative w-full px-4 lg:px-4">
            <div className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer border bg-white p-1.5 rounded-full text-black hover:text-yellow-500 transition">
                <FaArrowLeft size={30} />
            </div>
            <div className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer border bg-white p-1.5 rounded-full text-black hover:text-yellow-500 transition">
                <FaArrowRight size={30} />
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                    clickable: true,
                }}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {filtered.map(product => (
                    <SwiperSlide key={product.id ?? product._id}>
                        <ProductsCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
