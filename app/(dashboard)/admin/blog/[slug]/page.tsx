import PostForm from "@/app/(dashboard)/admin/blog/components/post-form";
import DeleteItem from "@/components/delete-item";
import { db } from "@/lib/prisma";
import { deletePost } from "./actions/deletePost";

type Props = {
  params: Promise<{ slug: string }>;
};

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
  });

  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        {!post ? (
          <div>Nie znaleziono postu</div>
        ) : (
          <>
            <div className="flex gap-10 justify-between items-center">
              <h2 className="">
                Post: <span className="text-base">{post.id}</span>
              </h2>
              <DeleteItem
                id={post.id}
                itemName="post"
                deleteAction={deletePost}
              />
            </div>
            <PostForm defaultValues={post} editing={true} />
          </>
        )}
      </div>
    </section>
  );
};
export default PostPage;
