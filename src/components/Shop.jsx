import ProductsCard from '@/components/ProductCard'; // Ajusta el alias o ruta relativa según tu configuración

/**
 * Componente Products: muestra un grid de tarjetas de productos
 * @param {{ products: Array<{ id?: number; _id?: string; title: string; image: string; price: number; description: string; category: string; isNew?: boolean; oldPrice?: number; }> }} props
 */
export default function Products({ products }) {
    return (
        <section className="pb-10">
            <div className="max-w-screen-xl mx-auto  px-2 sm:px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
