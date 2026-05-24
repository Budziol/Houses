"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  coverImage: string | null;
  images: string[];
};

const ImagePreview = ({ coverImage, images }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setImagePreview(coverImage);
  }, [coverImage]);

  return (
    <div className="space-y-6 w-full">
      <div className="relative w-full aspect-video bg-gray-50 rounded-xl overflow-hidden">
        {imagePreview && (
          <Image
            src={imagePreview}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5 w-full">
        {coverImage && (
          <div
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
            onClick={() => setImagePreview(coverImage)}
          >
            <Image
              src={coverImage}
              alt="Cover"
              fill
              sizes="(max-width: 768px) 140px, 200px"
              className="object-cover"
            />
          </div>
        )}

        {images.map((image, i) => (
          <div
            key={`${image}-${i}`}
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
            onClick={() => setImagePreview(image)}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 140px, 200px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImagePreview;
