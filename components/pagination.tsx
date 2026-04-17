"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    if (query) params.set("query", query);
    return `?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    router.push(createPageURL(page));
  };

  // --- LOGIKA GENEROWANIA STRON ---
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    // Zawsze pokazuj pierwszą stronę
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Zakres stron wokół aktualnej (np. currentPage - 1, currentPage, currentPage + 1)
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Zawsze pokazuj ostatnią stronę (jeśli jest więcej niż 1 strona)
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center gap-2 mt-6">
      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-2 py-2 border border-background-hover rounded-full disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer duration-150 shadow"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Numbers & Dots */}
      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="px-3 py-1 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => goToPage(page as number)}
            className={`px-3 py-2 transition-colors cursor-pointer duration-150 ${
              page === currentPage ? "text-accent" : "hover:text-text-main/80"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-2 py-2 border border-background-hover rounded-full disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer duration-150 shadow"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
