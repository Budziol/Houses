import { DefaultLink } from "@/components/links";
import BlogContainer from "./blog-container";
import { MoveRight } from "lucide-react";
import { RevealContainer } from "@/utils/Anim/reveal-container";
import { RevealItem } from "@/utils/Anim/reveal-item";

const Blog = () => {
  return (
    <RevealContainer>
      <section id="blog" className="min-h-screen w-full px-8 py-30 flex">
        <div className="max-w-[1440px] w-full mx-auto space-y-20 flex flex-col">
          <div className="flex flex-col gap-10 justify-between items-center text-center">
            <div className="">
              <RevealItem>
                <h3 className="mt-2 uppercase text-[clamp(var(--text-lg),5vw,var(--text-2xl))] font-semiBold leading-none mx-auto">
                  Blog
                </h3>
              </RevealItem>
              <RevealItem>
                <h2 className="uppercase text-[clamp(var(--text-3xl),5vw,var(--text-4xl))] font-bold leading-none">
                  Dodatkowe materiały
                </h2>
              </RevealItem>
            </div>
          </div>
          <BlogContainer />
          <RevealItem>
            <DefaultLink
              href="/blog"
              linkClassName="mx-auto flex gap-3 items-center text-accent hover:text-accent-hover"
            >
              Wszystkie posty <MoveRight size={16} />
            </DefaultLink>
          </RevealItem>
        </div>
      </section>
    </RevealContainer>
  );
};
export default Blog;
