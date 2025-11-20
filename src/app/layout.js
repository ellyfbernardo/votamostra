import localFont from "next/font/local";
import "./globals.css";


const titulosefrases = localFont({
  src: "./fonts/Outfit-Bold.ttf",
  variable: "--bold",
  weight: "100 900",
});

const tecdirparagrafos = localFont({
  src: "./fonts/NeueHaasUnica-Regular.ttf",
  variable: "--neue-regular",
  weight: "100 900",
});

const titulofilmebotoes = localFont({
  src: "./fonts/NeueHaasUnica-Bold.ttf",
  variable: "--neue-bold",
  weight: "100 900",
});

export const metadata = {
  title: "VotaMostra",
  description: "Site de votação para festivais de cinema - criado por Ellyf Bernardo",  
  icons: {
    icon: "/favicon.ico?v=2",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${titulosefrases.variable} ${tecdirparagrafos.variable} ${titulofilmebotoes.variable}`}>
        {children}
      </body>
    </html>
  );
}
