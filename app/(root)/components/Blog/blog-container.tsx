import { db } from "@/lib/prisma";
import BlogCard from "./blog-card";
import { RevealItem } from "@/utils/Anim/reveal-item";

const BlogContainer = async () => {
  const data = await db.post.findMany({
    take: 3,
    where: { published: true },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return data.length <= 0 ? (
    <div className="">Brak ofert</div>
  ) : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {data.map((p, i) => (
        <RevealItem key={p.id}>
          <BlogCard
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
