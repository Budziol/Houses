import Image from "next/image";
import { GhostButton } from "../../../../../components/buttons";
import { Calendar, MoveRight, Pencil } from "lucide-react";
import { GhostLink } from "../../../../../components/links";
import { formatDate } from "@/utils/formatDate";

type Props = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const AdminBlogCard = ({
  title,
  slug,
  excerpt,
  content,
  coverImage,
  published,
  publishedAt,
  createdAt,
  updatedAt,
}: Props) => {
  return (
    <div className="relative rounded-xl overflow-hidden group shadow flex flex-col h-full">
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
        <p className="">{excerpt}</p>
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
        <div className="mt-auto pt-4">
          <GhostLink
            href={`/admin/blog/${slug}`}
            className="transition-all! duration-300! border-background-hover!"
          >
            Edytuj
            <MoveRight size={16} />
          </GhostLink>
        </div>
      </div>
    </div>
  );
};
export default AdminBlogCard;
