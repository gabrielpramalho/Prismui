import Hero from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { MainFeatures } from "@/components/sections/main-features";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <MainFeatures />
      <Footer />
    </main>
  );
}
