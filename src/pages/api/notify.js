import { MercadoPagoConfig, Payment } from "mercadopago";

const mpConfig = new MercadoPagoConfig({
    accessToken: process.env.NEXT_ACCESS_TOKEN,
    options: { locale: "es-AR" },
});
const paymentClient = new Payment(mpConfig);

export default async function handler(req, res) {
    const topic = req.query.topic || req.query.type;
    console.log("📬 Notificación MP recibida:", req.query);

    try {
        if (topic === "payment") {
            const paymentId = req.query.id || req.query["data.id"];
            const { body } = await paymentClient.get({ paymentId: Number(paymentId) });
            console.log("🔔 Estado de pago:", body.status);
        }
        return res.status(200).send("OK");
    } catch (err) {
        console.error("MP Notify Error:", err);
        return res.status(500).send("Error handling notification");
    }
}
