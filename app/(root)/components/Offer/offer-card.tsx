import { GhostLink } from "@/components/links";
import { Bath, BedDouble, Maximize2, MoveRight } from "lucide-react";
import Image from "next/image";

type Props = {
  badge?: string;
  image: string | null;
  title: string;
  description: string;
  price: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  slug: string;
};

const OfferCard = ({
  badge,
  image,
  title,
  description,
  price,
  size,
  bedrooms,
  bathrooms,
  slug,
}: Props) => {
  return (
    <div className="relative rounded-xl overflow-hidden group shadow">
      {badge && (
        <div className="absolute top-2 left-2 px-3 py-1 bg-accent rounded-full text-[12px] text-white font-semibold z-10">
          {badge}
        </div>
      )}
      <div className="relative w-full aspect-video bg-gray-50">
        {image ? (
          <Image
            src={image}
            alt={slug}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 italic text-xs">
            Brak zdjęcia
          </div>
        )}
      </div>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center gap-5">
          <h3 className="text-lg font-bold">{title}</h3>
          <h4 className="text-accent font-bold text-lg">{price} zł</h4>
        </div>
        <p className="">{description}</p>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex items-center gap-2 text-background-muted text-sm">
            <Maximize2 size={18} />
            <p className="">{size}</p>
          </div>
          <div className="flex items-center gap-2 text-background-muted text-sm">
            <BedDouble size={18} />
            <p className="">{bedrooms}</p>
          </div>
          <div className="flex items-center gap-2 text-background-muted text-sm">
            <Bath size={18} />
            <p className="">{bathrooms}</p>
          </div>
        </div>
        <GhostLink
          href={`/oferta/${slug}`}
          className="transition-all! duration-300! border-background-hover!"
        >
          Szczególy
          <MoveRight size={16} />
        </GhostLink>
      </div>
    </div>
  );
};
export default OfferCard;
