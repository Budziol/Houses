import { GhostLink } from "@/components/links";
import { Plus } from "lucide-react";
import PostsContainer from "./components/posts-container";

const BlogPage = () => {
  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        <div className="flex gap-10 justify-between items-center">
          <h2 className="">Blog</h2>
          <GhostLink href={"/admin/blog/nowy"}>
            <Plus size={18} /> Nowy post
          </GhostLink>
        </div>
        <PostsContainer />
      </div>
    </section>
  );
};
export default BlogPage;
