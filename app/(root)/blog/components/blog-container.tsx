import { db } from "@/lib/prisma";
import BlogCard from "../../components/Blog/blog-card";
import { RevealItem } from "@/utils/Anim/reveal-item";
import { Post } from "@prisma/client";

type Props = {
  query: string;
  currentPage: number;
  limit: number;
};

const BlogContainer = async ({ query, currentPage, limit }: Props) => {
  const where = {
    published: true,
    ...(query && {
      title: {
        contains: query,
        mode: "insensitive" as const,
      },
    }),
  };

  const data: Post[] = await db.post.findMany({
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
      {data.map((p, i) => (
        <RevealItem key={p.id}>
          <BlogCard
            key={p.id}
            title={p.title}
            slug={p.slug}
            excerpt={p.excerpt}
            image={p.coverImage}
          />
        </RevealItem>
      ))}
    </div>
  );
};
export default BlogContainer;
