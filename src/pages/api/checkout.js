import { MercadoPagoConfig, Preference } from "mercadopago";

const mpConfig = new MercadoPagoConfig({
    accessToken: process.env.NEXT_ACCESS_TOKEN,
    options: { locale: "es-AR" },
});
const preferenceClient = new Preference(mpConfig);

export default async function handler(req, res) {
    if (req.method !== "POST")
        return res.status(405).json({ message: "Method not allowed" });

    const products = Array.isArray(req.body.products) ? req.body.products : [];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    console.log("▶️ Generando preferencia, baseUrl =", baseUrl);

    try {
        const items = products.map((p) => ({
            title: p.title,
            unit_price: p.price,
            quantity: p.quantity || 1,
        }));

        const preference = {
            items,
            auto_return: "approved",
            back_urls: {
                success: baseUrl,
                failure: baseUrl,
            },
            notification_url: `${baseUrl}/api/notify`,
        };

        const { body } = await preferenceClient.create({ body: preference });
        return res.status(200).json({ url: body.init_point });
    } catch (error) {
        console.error("MP Checkout Error:", error);
        return res.status(500).json({ error: "Error creating preference" });
    }
}
