import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Story from '@/components/Story';
import Brand from '@/components/Brand';
import Menu from '@/components/Menu';
import FullMenu from '@/components/FullMenu';
import Order from '@/components/Order';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Brand />
        <Menu />
        <FullMenu />
      </main>
      <Order />
      <Footer />
    </>
  );
}
