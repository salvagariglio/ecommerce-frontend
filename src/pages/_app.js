import '../rutas/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import Script from 'next/script'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/context/authContext'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Script
                src="https://sdk.mercadopago.com/js/v2"
                strategy="afterInteractive"
            />

            <Provider store={store}>
                <AuthProvider>
                    <Header />
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                    <ToastContainer position="bottom-right" />
                </AuthProvider>
            </Provider>
        </>
    )
}
