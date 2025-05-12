"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function HeroSlider() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [navigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        setNavigationReady(true);
    }, []);

    const slides = [
        { id: 1, src: "/images/slide1.jpg", alt: "Slide 1" },
        { id: 2, src: "/images/slide2.jpg", alt: "Slide 2" },
        { id: 3, src: "/images/slide3.jpg", alt: "Slide 3" },
    ];

    return (
        <section className="w-full py-6 px-4 sm:px-8 md:px-16">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[70vh] sm:h-[85vh]">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    autoplay={{ delay: 4000 }}
                    pagination={{
                        clickable: true,
                        bulletClass: "swiper-bullet-custom",
                        bulletActiveClass: "swiper-bullet-active-custom",
                    }}
                    navigation={
                        navigationReady
                            ? {
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }
                            : false
                    }
                    onSwiper={(swiper) => {
                        if (swiper.params.navigation) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }}
                    loop={true}
                    className="w-full h-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative w-full h-full">
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    ref={prevRef}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-md hover:bg-red-600 hover:text-white transition"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
                <button
                    ref={nextRef}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 p-3 rounded-full shadow-md hover:bg-red-600 hover:text-white transition"
                >
                    <FaArrowRight className="text-xl" />
                </button>
            </div>

            <style jsx global>{`
                .swiper-bullet-custom {
                    width: 12px;
                    height: 12px;
                    background-color: #d1d5db;
                    border-radius: 9999px;
                    margin: 0 4px;
                    opacity: 1;
                }

                .swiper-bullet-active-custom {
                    background-color: #dc2626 !important;
                }
            `}</style>
        </section>
    );
}
