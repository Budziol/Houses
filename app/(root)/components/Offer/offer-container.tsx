import { db } from "@/lib/prisma";
import OfferCard from "./offer-card";
import { RevealItem } from "@/utils/Anim/reveal-item";

const OfferContainer = async () => {
  const data = await db.offer.findMany({
    take: 4,
    where: { published: true },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return data.length <= 0 ? (
    <div className="">Brak ofert</div>
  ) : (
    <div className="grid sm:grid-cols-2 gap-10">
      {data.map((o, i) => (
        <RevealItem key={o.id}>
          <OfferCard
            badge={o.badge}
            image={o.coverImage}
            title={o.title}
            description={o.description}
            price={o.price}
            size={o.size}
            bedrooms={o.bedrooms}
            bathrooms={o.bathrooms}
            slug={o.slug}
          />
        </RevealItem>
      ))}
    </div>
  );
};
export default OfferContainer;
