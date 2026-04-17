import { db } from "@/lib/prisma";
import AdminBlogCard from "./admin-blog-card";
import { Post } from "@prisma/client";

const PostsContainer = async () => {
  const data: Post[] = await db.post.findMany();

  return data.length <= 0 ? (
    <div className="">Brak postów</div>
  ) : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {data.map((p, i) => (
        <AdminBlogCard
          key={p.id}
          title={p.title}
          slug={p.slug}
          excerpt={p.excerpt}
          content={p.content}
          coverImage={p.coverImage}
          published={p.published}
          publishedAt={p.publishedAt}
          createdAt={p.createdAt}
          updatedAt={p.updatedAt}
        />
      ))}
    </div>
  );
};
export default PostsContainer;
