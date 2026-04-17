import Pagination from "@/components/pagination";
import { db } from "@/lib/prisma";
import { Suspense } from "react";
import Search from "@/components/search";
import Loading from "./loading";
import BlogContainer from "./components/blog-container";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

const BlogPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const pageSize = 9;

  const where = {
    published: true,
    ...(query && {
      title: {
        contains: query,
        mode: "insensitive" as const,
      },
    }),
  };

  const totalCount = await db.post.count({ where });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <RevealContainer>
      <section className="min-h-screen w-full flex pt-40 pb-40 px-8">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-20 justify-between h-full">
            <div className="flex flex-col lg:flex-row gap-10 justify-between items-center">
              <RevealItem>
                <h2 className="">Blog</h2>
              </RevealItem>
              <RevealItem>
                <Search />
              </RevealItem>
            </div>
            <Suspense key={query + currentPage} fallback={<Loading />}>
              <BlogContainer
                query={query}
                currentPage={currentPage}
                limit={pageSize}
              />
            </Suspense>
            <RevealItem>
              <div className="mx-auto">
                <Pagination totalPages={totalPages} />
              </div>
            </RevealItem>
          </div>
        </div>
      </section>
    </RevealContainer>
  );
};
export default BlogPage;
