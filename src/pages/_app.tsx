import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { Orbitron, Exo_2 } from "next/font/google";
import { ToastContainer } from "react-toastify";

const orbitron = Orbitron({
    variable: "--font-titulo",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

const exo_2 = Exo_2({
    variable: "--font-padrao",
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={`${orbitron.variable} ${exo_2.variable}`}>
            <Component {...pageProps} />
            <ToastContainer aria-label="Notificações" /> 
        </main>
    );
}