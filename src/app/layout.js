import localFont from 'next/font/local';
import './globals.css';

// Títulos, botões e chamadas
const lexendGiga = localFont({
  src: [
    { path: './fonts/LexendGiga-Regular.ttf', weight: '400' },
    { path: './fonts/LexendGiga-SemiBold.ttf', weight: '600' },
    { path: './fonts/LexendGiga-Bold.ttf', weight: '700' },
  ],
  variable: '--font-giga',
  display: 'swap',
});

// Data da sessão, textos de apoio e rótulos de formulário
const lexend = localFont({
  src: [
    { path: './fonts/Lexend-Regular.ttf', weight: '400' },
    { path: './fonts/Lexend-SemiBold.ttf', weight: '600' },
  ],
  variable: '--font-lexend',
  display: 'swap',
});

// Fichas técnicas e sinopses
const elza = localFont({
  src: [
    { path: './fonts/elza-text.otf', weight: '400' },
    { path: './fonts/elza-text-medium.otf', weight: '500' },
    { path: './fonts/elza-text-bold.otf', weight: '700' },
  ],
  variable: '--font-elza',
  display: 'swap',
});

export const metadata = {
  title: 'VotaMostra – 13ª Mostra de Cinema de Gostoso',
  description: 'Votação do público da Mostra Competitiva – criado por Ellyf Bernardo',
  icons: {
    icon: '/favicon.ico?v=3',
  },
};

export const viewport = {
  themeColor: '#923F94',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${lexendGiga.variable} ${lexend.variable} ${elza.variable}`}>
        {children}
      </body>
    </html>
  );
}
