import { GhostLink } from "@/components/links";
import { MoveRight } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
};

const BlogCard = ({ title, slug, excerpt, image }: Props) => {
  return (
    <div className="relative rounded-xl overflow-hidden group shadow flex flex-col w-full">
      <div className="relative w-full aspect-video bg-gray-50">
        {image ? (
          <Image
            src={image}
            alt={slug}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 italic text-xs">
            Brak zdjęcia
          </div>
        )}
      </div>
      <div className="p-6 space-y-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="">{excerpt}</p>
        <GhostLink
          href={`/blog/${slug}`}
          linkClassName="mt-auto!"
          className="transition-all! duration-300! border-background-hover!"
        >
          Czytaj
          <MoveRight size={16} />
        </GhostLink>
      </div>
    </div>
  );
};
export default BlogCard;
