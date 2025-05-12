"use client";
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductsCard from './ProductCard';


export default function Discounts({ products, category }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    if (!Array.isArray(products) || !category) return null;
    const filtered = products.filter(item => item.category === category);
    if (filtered.length === 0) return null;

    return (
        <div className="relative w-full px-4 lg:px-4">
            <div
                ref={prevRef}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer border bg-white p-1.5 rounded-full text-black hover:text-yellow-500 transition"
            >
                <FaArrowLeft size={30} />
            </div>
            <div
                ref={nextRef}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer border bg-white p-1.5 rounded-full text-black hover:text-yellow-500 transition"
            >
                <FaArrowRight size={30} />
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {filtered.map((product) => (
                    <SwiperSlide key={product._id ?? product.id}>
                        <ProductsCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
