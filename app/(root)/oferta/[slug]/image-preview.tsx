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
      <div className="flex gap-5">
        {coverImage && (
          <Image
            src={coverImage}
            alt=""
            width={100}
            height={100}
            onClick={() => setImagePreview(coverImage)}
          />
        )}
        {images.map((image, i) => (
          <Image
            key={image}
            src={image}
            alt=""
            width={100}
            height={100}
            onClick={() => setImagePreview(image)}
          />
        ))}
      </div>
    </div>
  );
};
export default ImagePreview;
