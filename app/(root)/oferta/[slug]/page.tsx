import { db } from "@/lib/prisma";
import { Metadata } from "next";
import ImagePreview from "./image-preview";
import ModelViewer from "./model-viewer";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const offer = await db.offer.findUnique({
    where: { slug },
  });

  if (!offer) {
    return {
      title: "Nie znaleziono posta",
    };
  }

  return {
    title: offer.title,
    description: offer.description,
  };
}

const SingleOfferPage = async ({ params }: Props) => {
  const { slug } = await params;

  const offer = await db.offer.findUnique({
    where: { slug },
  });
  return (
    <RevealContainer>
      <section className="min-h-screen w-full flex pt-40 pb-40 px-8">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
          {!offer ? (
            <RevealItem>
              <div>Nie znaleziono oferty</div>
            </RevealItem>
          ) : (
            <div className="flex flex-col gap-20">
              <div className="flex flex-col lg:flex-row gap-10 justify-between">
                <div className="lg:order-2 space-y-6">
                  {offer.badge && (
                    <RevealItem>
                      <div className="w-fit px-3 py-1 bg-accent rounded-full text-[12px] text-white font-semibold z-10">
                        {offer.badge}
                      </div>
                    </RevealItem>
                  )}
                  <RevealItem>
                    <h2 className="">{offer.title}</h2>
                  </RevealItem>
                  <RevealItem>
                    <h4 className="text-accent font-bold text-lg">
                      {offer.price} zł
                    </h4>
                  </RevealItem>
                  <RevealItem>
                    <p className="">{offer.description}</p>
                  </RevealItem>
                </div>
                <div className="w-full">
                  <RevealItem>
                    <ImagePreview
                      coverImage={offer.coverImage}
                      images={offer.images}
                    />
                  </RevealItem>
                </div>
              </div>
              <RevealItem>
                <h2 className="">Model 3D</h2>
              </RevealItem>
              <RevealItem>
                <ModelViewer floorNumber={offer.story} />
              </RevealItem>
            </div>
          )}
        </div>
      </section>
    </RevealContainer>
  );
};
export default SingleOfferPage;
