import { RevealContainer } from "@/utils/Anim/reveal-container";
import OpinionsCard from "./opinions-card";
import { RevealItem } from "@/utils/Anim/reveal-item";

const Opinions = () => {
  return (
    <RevealContainer>
      <section id="opinions" className="min-h-screen w-full px-8 py-30 flex">
        <div className="max-w-[1440px] w-full m-auto space-y-20 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-center text-center lg:text-left">
            <div className="">
              <RevealItem>
                <h3 className="mt-2 uppercase text-[clamp(var(--text-lg),5vw,var(--text-2xl))] font-semiBold leading-none">
                  Opinie
                </h3>
              </RevealItem>
              <RevealItem>
                <h2 className="uppercase text-[clamp(var(--text-3xl),5vw,var(--text-4xl))] font-bold leading-none">
                  Co mówią nasi klienci?
                </h2>
              </RevealItem>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-20">
            <RevealItem>
              <OpinionsCard
                rating={5}
                description="„Cały proces przebiegł sprawnie i bez stresu. Dom został postawiony szybciej, niż się spodziewaliśmy, a jakość wykonania naprawdę nas zaskoczyła.”"
                name="Patryk B."
              />
            </RevealItem>
            <RevealItem>
              <OpinionsCard
                rating={5}
                description="„Najbardziej doceniam możliwość dopasowania projektu do naszych potrzeb. Wszystko było jasno ustalone od początku, bez ukrytych kosztów.”"
                name="Kacper S."
              />
            </RevealItem>
            <RevealItem>
              <OpinionsCard
                rating={4.5}
                description="„Świetna komunikacja i pełen profesjonalizm. Dom jest energooszczędny i bardzo komfortowy — dokładnie taki, jak chcieliśmy.”"
                name="Andrzej W."
              />
            </RevealItem>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Opinions;
