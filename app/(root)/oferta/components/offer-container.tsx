import { db } from "@/lib/prisma";
import OfferCard from "../../components/Offer/offer-card";
import { RevealItem } from "@/utils/Anim/reveal-item";
import { Offer } from "@prisma/client";

type Props = {
  query: string;
  currentPage: number;
  limit: number;
};

const OfferContainer = async ({ query, currentPage, limit }: Props) => {
  const where = {
    published: true,
    ...(query && {
      title: {
        contains: query,
        mode: "insensitive" as const,
      },
    }),
  };

  const data: Offer[] = await db.offer.findMany({
    where,
    take: limit,
    skip: (currentPage - 1) * limit,
    orderBy: {
      publishedAt: "desc",
    },
  });

  return data.length <= 0 ? (
    <RevealItem>
      <div className="">Brak postów</div>
    </RevealItem>
  ) : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {data.map((o, i) => (
        <RevealItem>
          <OfferCard
            key={o.id}
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
