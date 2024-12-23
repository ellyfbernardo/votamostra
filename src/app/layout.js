import localFont from "next/font/local";
import "./globals.css";

const agrandirheavy = localFont({
  src: "./fonts/Agrandir-GrandHeavy.otf",
  variable: "--agradir-grandheavy",
  weight: "100 900",
});

export const agrandirgl = localFont({
  src: "./fonts/Agrandir-GrandLight.otf",
  variable: "--agradir-grandlight",
  weight: "100 900",
});

const agrandirnglight = localFont({
  src: "./fonts/Agrandir-Narrow.otf",
  variable: "--agradir-narrowgrandlight",
  weight: "100 900",
});

const agrandirregular = localFont({
  src: "./fonts/Agrandir-Regular.otf",
  variable: "--agradir-regular",
  weight: "100 900",
});

const agrandirbold = localFont({
  src: "./fonts/Agrandir-TextBold.otf",
  variable: "--agradir-bold",
  weight: "100 900",
});

const agrandirthinitalic = localFont({
  src: "./fonts/Agrandir-ThinItalic.otf",
  variable: "--agradir-thinitalic",
  weight: "100 900",
});

const agrandirtight = localFont({
  src: "./fonts/Agrandir-Tight.otf",
  variable: "--agradir-thinitalic",
  weight: "100 900",
});

const agrandirblackitalic = localFont({
  src: "./fonts/Agrandir-WideBlackItalic.otf",
  variable: "--agradir-wideblackitalic",
  weight: "100 900",
});

const agrandirwl = localFont({
  src: "./fonts/Agrandir-WideLight.otf",
  variable: "--agradir-widelight",
  weight: "100 900",
});

export const metadata = {
  title: "VotaMostra",
  description: "criado por Ellyf Bernardo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${agrandirgl.variable} ${agrandirwl.variable} ${agrandirnglight.variable} ${agrandirregular.variable} ${agrandirbold.variable} ${agrandirthinitalic.variable} ${agrandirtight.variable} ${agrandirblackitalic.variable} ${agrandirheavy.variable} `}>
        {children}
      </body>
    </html>
  );
}
