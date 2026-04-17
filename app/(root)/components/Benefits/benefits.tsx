import { Clock, Leaf, User } from "lucide-react";
import BenefitsCard from "./benefits-card";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

const Benefits = () => {
  return (
    <RevealContainer>
      <section
        id="about"
        className="min-h-screen w-full px-8 py-30 flex trigger-benefits"
      >
        <div className="max-w-[1440px] w-full m-auto flex flex-col lg:flex-row gap-10">
          <div className="text-center">
            <RevealItem>
              <h3 className="mt-2 uppercase text-[clamp(var(--text-lg),5vw,var(--text-2xl))] font-semiBold leading-none mx-auto">
                Twoja przestrzeń do życia
              </h3>
            </RevealItem>
            <RevealItem>
              <h2 className="uppercase text-[clamp(var(--text-3xl),5vw,var(--text-4xl))] font-bold leading-none mx-auto">
                Odkryj możliwości domów modułowych
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-8 text-sm leading-relaxed">
                Domy modułowe to innowacyjne podejście do budownictwa, które
                łączy szybkość realizacji, wysoką jakość wykonania oraz pełną
                kontrolę nad kosztami. Powstają z gotowych elementów (modułów),
                które są produkowane w kontrolowanych warunkach, a następnie
                transportowane i montowane na działce klienta.
              </p>
            </RevealItem>
            <div className="grid lg:grid-cols-3 gap-20 mt-30">
              <RevealItem>
                <BenefitsCard
                  icon={<Clock />}
                  title={"Szybka realizacja"}
                  description={
                    "Budowa domu modułowego trwa znacznie krócej niż w przypadku tradycyjnych metod. Gotowy dom może powstać nawet w kilka tygodni."
                  }
                />
              </RevealItem>
              <RevealItem>
                <BenefitsCard
                  icon={<Leaf />}
                  title={"Energooszczędność"}
                  description={
                    "Nowoczesne technologie i materiały sprawiają, że domy modułowe są dobrze izolowane i tanie w utrzymaniu."
                  }
                />
              </RevealItem>
              <RevealItem>
                <BenefitsCard
                  icon={<User />}
                  title={"Elastyczność projektu"}
                  description={
                    "Dom modułowy można łatwo dostosować do indywidualnych potrzeb - zarówno pod względem układu pomieszczeń, jak i wykończenia."
                  }
                />
              </RevealItem>
            </div>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Benefits;
