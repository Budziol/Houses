import { RevealContainer } from "@/utils/Anim/reveal-container";
import ProcessCard from "./process-card";
import { RevealItem } from "@/utils/Anim/reveal-item";

const Process = () => {
  return (
    <RevealContainer>
      <section id="process" className="min-h-screen w-full px-8 py-30 flex">
        <div className="max-w-[1440px] w-full m-auto space-y-20 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-center text-center lg:text-left">
            <div className="">
              <RevealItem>
                <h3 className="mt-2 uppercase text-[clamp(var(--text-lg),5vw,var(--text-2xl))] font-semiBold leading-none">
                  Wszystkie kroki
                </h3>
              </RevealItem>
              <RevealItem>
                <h2 className="uppercase text-[clamp(var(--text-3xl),5vw,var(--text-4xl))] font-bold leading-none">
                  jak wygląda caly proces
                </h2>
              </RevealItem>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-20">
            <RevealItem>
              <ProcessCard
                subTitle="01"
                title="Konsultacja"
                description="Omawiamy potrzeby, lokalizację i budżet. Dobieramy optymalną konfigurację modułów."
              />
            </RevealItem>
            <RevealItem>
              <ProcessCard
                subTitle="02"
                title="Projekt"
                description="Przygotowujemy dokumentację architektoniczną i techniczną. Ustalamy ostateczną cenę."
              />
            </RevealItem>
            <RevealItem>
              <ProcessCard
                subTitle="03"
                title="Produkcja"
                description="Moduły powstają w fabryce w kontrolowanych warunkach, niezależnie od pogody."
              />
            </RevealItem>
            <RevealItem>
              <ProcessCard
                subTitle="04"
                title="Montaż"
                description="Transport i montaż na działce. Od fundamentu do gotowego domu w kilka dni."
              />
            </RevealItem>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Process;
