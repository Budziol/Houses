import { GhostButton, PrimaryButton } from "@/components/buttons";
import KVScene from "@/app/(root)/components/Hero/scene";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

const Hero = () => {
  return (
    <RevealContainer>
      <section id="hero" className="min-h-screen w-full flex pt-20 px-8">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:h-full flex flex-col justify-start lg:justify-center items-center lg:items-start gap-5">
            <div className="max-w-[575px] lg:mb-40 flex flex-col text-center lg:text-left">
              <RevealItem>
                <h1 className="">Domy modułowe</h1>
              </RevealItem>
              <RevealItem>
                <h2 className="">szybko, łatwo i bez stresu</h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-8 text-sm leading-relaxed">
                  Łączymy innowacyjne technologie z ponadczasowym designem.
                  Każdy projekt realizujemy w oparciu o najwyższe standardy
                  jakości i dbałość o detale. Dzięki nowoczesnej technologii
                  powstaje on w krótkim czasie, bez uciążliwej i długiej budowy.
                </p>
              </RevealItem>
              <div className="flex flex-col lg:flex-row gap-4 items-center mt-8">
                <RevealItem>
                  <PrimaryButton className="w-fit!">
                    Sprawdź oferte
                  </PrimaryButton>
                </RevealItem>
                <RevealItem>
                  <GhostButton className="w-fit!">Kontakt</GhostButton>
                </RevealItem>
              </div>
            </div>
          </div>
          {/* <div className="w-full min-h-[800px] lg:min-h-full"> */}
          <RevealItem className={"w-full"}>
            <KVScene />
          </RevealItem>
          {/* </div> */}
        </div>
      </section>
    </RevealContainer>
  );
};

export default Hero;
