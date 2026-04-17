import { GhostLink } from "@/components/links";
import { Plus } from "lucide-react";
import OfferContainer from "./components/offer-container";

const OfferPage = () => {
  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        <div className="flex gap-10 justify-between items-center">
          <h2 className="">Oferta</h2>
          <GhostLink href={"/admin/oferta/nowa"}>
            <Plus size={18} /> Nowa oferta
          </GhostLink>
        </div>
        <OfferContainer />
      </div>
    </section>
  );
};
export default OfferPage;
