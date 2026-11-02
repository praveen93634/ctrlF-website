import Hero from "@/components/landing-page/hero";
import Customer from "@/components/landing-page/Customer";
import Feature from "@/components/landing-page/Feature";
import HighlightedFeature from "@/components/landing-page/HighlightedFeature";
import Tools from "@/components/landing-page/Tools";
import Footer from "@/reuseable/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#faf8f5] dark:bg-zinc-950">
      <Hero />
      <Customer />
      <Feature />
      <Tools />
      <HighlightedFeature />
      <Footer />
    </div>
  );
}
