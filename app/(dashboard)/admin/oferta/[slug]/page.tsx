import DeleteItem from "@/components/delete-item";
import { db } from "@/lib/prisma";
import { deleteoffer } from "./actions/deleteOffer";
import OfferForm from "../components/offer-form";

type Props = {
  params: Promise<{ slug: string }>;
};

const OfferEditPage = async ({ params }: Props) => {
  const { slug } = await params;

  const offer = await db.offer.findUnique({
    where: { slug },
  });

  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        {!offer ? (
          <div>Nie znaleziono ofert</div>
        ) : (
          <>
            <div className="flex gap-10 justify-between items-center">
              <h2 className="">
                Oferta: <span className="text-base">{offer.id}</span>
              </h2>
              <DeleteItem
                id={offer.id}
                itemName="post"
                deleteAction={deleteoffer}
              />
            </div>
            <OfferForm defaultValues={offer} editing={true} />
          </>
        )}
      </div>
    </section>
  );
};
export default OfferEditPage;
