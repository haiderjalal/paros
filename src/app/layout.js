import '@fontsource/lilita-one/400.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import './globals.css';
import MotionProvider from '@/components/MotionProvider';

export const metadata = {
  title: 'Paros | Fresh from the fire to your table',
  description:
    'Pizza, burgers, wings, wraps, pasta and fried chicken, made fresh to order on University Road, Chakdara.',
  icons: { icon: '/logo.png', apple: '/logo.png' },
};

export const viewport = {
  themeColor: '#4a0b17',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
