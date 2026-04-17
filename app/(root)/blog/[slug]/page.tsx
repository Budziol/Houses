import { db } from "@/lib/prisma";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Nie znaleziono posta",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 150),
  };
}

const SinglePostPage = async ({ params }: Props) => {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
  });

  return (
    <RevealContainer>
      <section className="min-h-screen w-full flex pt-40 pb-40 px-8">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-10">
          {!post ? (
            <RevealItem>
              <div>Nie znaleziono postu</div>
            </RevealItem>
          ) : (
            <div className="flex flex-col gap-10 justify-between">
              <RevealItem>
                <h2 className="">{post.title}</h2>
              </RevealItem>
              <RevealItem>
                <div className="relative w-full aspect-video bg-gray-50">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={slug}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 italic text-xs">
                      Brak zdjęcia
                    </div>
                  )}
                </div>
              </RevealItem>
              <RevealItem>
                <p className="">{post.content}</p>
              </RevealItem>
            </div>
          )}
        </div>
      </section>
    </RevealContainer>
  );
};
export default SinglePostPage;
