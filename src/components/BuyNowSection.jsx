'use client'
import Link from 'next/link';
import Image from 'next/image';

/**
 * Sección de promoción con imagen de fondo y llamado a la acción
 * @param {{ imageSrc: string, title: string, subtitle?: string, showButton?: boolean }} props
 */
export default function BuyNowSection({ imageSrc, title, subtitle, showButton = false }) {
    return (
        <section className="relative w-full h-[600px] overflow-hidden">
            <Link href="/shop" className="absolute inset-0 block">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </Link>

            <div className="relative z-10 flex flex-col justify-center items-start h-full px-8 space-y-4">
                <h2 className="text-white text-5xl font-bold">{title}</h2>
                {subtitle && <p className="text-white text-2xl">{subtitle}</p>}
                {showButton && (
                    <Link href="/shop">
                        <button className="self-start bg-white text-black font-semibold py-3 px-8 rounded">
                            COMPRA AHORA
                        </button>
                    </Link>
                )}
            </div>
        </section>
    );
}

