import Image from "next/image";
import { Calendar, MoveRight, Pencil } from "lucide-react";
import { GhostLink } from "../../../../../components/links";
import { formatDate } from "@/utils/formatDate";

type Props = {
  title: string;
  slug: string;
  coverImage: string | null;
  images: string[];
  description: string;
  price: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  garage: Boolean;
  balcony: number;
  story: number;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

const AdminOfferCard = ({
  title,
  slug,
  coverImage,
  images,
  description,
  price,
  size,
  bedrooms,
  bathrooms,
  garage,
  balcony,
  story,
  published,
  publishedAt,
  createdAt,
  updatedAt,
  authorId,
}: Props) => {
  return (
    <div className="relative rounded-xl overflow-hidden group shadow">
      <div className="relative w-full aspect-video bg-gray-50">
        {coverImage ? (
          <Image
            src={coverImage}
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
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-xs">{slug}</p>
        </div>
        <p className="">{description}</p>
        <p
          className={`text-xs font-semibold py-1 px-3 w-fit! rounded-lg ${published ? "bg-accent text-background" : "border border-text-main"}`}
        >
          {published ? "opublikowano" : "nieopublikowano"}
        </p>
        <p className="">{publishedAt ? formatDate(publishedAt) : "Brak"}</p>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex items-center gap-2 text-background-muted text-sm">
            <Calendar size={18} />
            <p className="">{formatDate(createdAt)}</p>
          </div>
          <div className="flex items-center gap-2 text-background-muted text-sm">
            <Pencil size={18} />
            <p className="">{formatDate(updatedAt)}</p>
          </div>
        </div>
        <p className="text-xs">{authorId}</p>
        <GhostLink
          href={`/admin/oferta/${slug}`}
          linkClassName="mt-auto"
          className="transition-all! duration-300! border-background-hover!"
        >
          Edytuj
          <MoveRight size={16} />
        </GhostLink>
      </div>
    </div>
  );
};
export default AdminOfferCard;
