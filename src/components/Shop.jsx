import ProductsCard from '@/components/ProductCard'; // Ajusta el alias o ruta relativa según tu configuración

/**
 * Componente Products: muestra un grid de tarjetas de productos
 * @param {{ products: Array<{ id?: number; _id?: string; title: string; image: string; price: number; description: string; category: string; isNew?: boolean; oldPrice?: number; }> }} props
 */
export default function Shop({ products }) {
    return (
        <section className="py-10">
            <div className="flex flex-col items-center gap-4">
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

            <div className="max-w-screen-xl mx-auto py-10 px-2 sm:px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((item) => {
                        const key = item.id ?? item._id;
                        return <ProductsCard key={key} product={item} />;
                    })
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products available.</p>
                )}
            </div>
        </section>
    );
}
