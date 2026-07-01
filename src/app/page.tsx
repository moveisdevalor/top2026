import { HeroConcept } from "@/components/HeroConcept";
import { Stats } from "@/components/Stats";
import { AppHome } from "@/components/AppHome";
import {
  Pillars,
  FAQ,
  Editions,
  CTA,
  Footer,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <main>
        <AppHome />
        <HeroConcept />
        <Stats />
        <Pillars />
        <FAQ />
        <Editions />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
