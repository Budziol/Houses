import { DefaultLink } from "@/components/links";
import { MoveRight } from "lucide-react";
import OfferContainer from "./offer-container";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

const Offer = () => {
  return (
    <RevealContainer>
      <section id="offer" className="min-h-screen w-full px-8 py-30 flex">
        <div className="max-w-[1440px] w-full mx-auto space-y-20 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-center text-center lg:text-left">
            <div className="">
              <RevealItem className={""}>
                <h3 className="mt-2 uppercase text-[clamp(var(--text-lg),5vw,var(--text-2xl))] font-semiBold leading-none mx-auto lg:ml-0">
                  Nasza kolekcja
                </h3>
              </RevealItem>
              <RevealItem className={""}>
                <h2 className="uppercase text-[clamp(var(--text-3xl),5vw,var(--text-4xl))] font-bold leading-none mx-auto lg:ml-0">
                  Wybierz swój dom
                </h2>
              </RevealItem>
            </div>
            <RevealItem>
              <p className="">
                Każdy model jest w pełni konfigurowalny. Wybierz bazowy <br />
                projekt i stwórz go na własnych zasadach.
              </p>
            </RevealItem>
          </div>
          <OfferContainer />
          <RevealItem>
            <DefaultLink
              href="/oferta"
              linkClassName="mx-auto flex gap-3 items-center text-accent hover:text-accent-hover"
            >
              Pelna oferta <MoveRight size={16} />
            </DefaultLink>
          </RevealItem>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Offer;
