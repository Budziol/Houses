import { db } from "@/lib/prisma";
import AdminOfferCard from "./admin-offer-card";
import { Offer } from "@prisma/client";

const OfferContainer = async () => {
  const data: Offer[] = await db.offer.findMany();

  return data.length <= 0 ? (
    <div className="">Brak ofert</div>
  ) : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {data.map((o, i) => (
        <AdminOfferCard
          key={o.id}
          title={o.title}
          slug={o.slug}
          coverImage={o.coverImage}
          images={o.images}
          description={o.description}
          price={o.price}
          size={o.size}
          bedrooms={o.bedrooms}
          bathrooms={o.bathrooms}
          garage={o.garage}
          balcony={o.balcony}
          story={o.story}
          published={o.published}
          publishedAt={o.publishedAt}
          createdAt={o.createdAt}
          updatedAt={o.updatedAt}
          authorId={o.authorId}
        />
      ))}
    </div>
  );
};
export default OfferContainer;
