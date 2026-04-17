import PostForm from "@/app/(dashboard)/admin/blog/components/post-form";

const NewPostPage = () => {
  return (
    <section className="min-h-screen w-full flex pt-30 pb-20 px-8">
      <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
        <h2 className="">Nowy post</h2>
        <PostForm />
      </div>
    </section>
  );
};
export default NewPostPage;
