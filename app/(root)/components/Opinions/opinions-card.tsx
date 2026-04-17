import { Star } from "lucide-react";

type Props = {
  rating: number;
  description: string;
  name: string;
};

const OpinionsCard = ({ rating, description, name }: Props) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex gap-1">
        {Array.from({ length: full }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />
        ))}

        {hasHalf && (
          <div className="relative w-5 h-5">
            {/* tło (pusta) */}
            <Star className="absolute w-5 h-5 text-gray-300" />

            {/* połowa wypełniona */}
            <div className="absolute w-1/2 h-full overflow-hidden">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}

        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
      </div>
      <p className="">{description}</p>
      <p className="text-text-main font-semibold">{name}</p>
    </div>
  );
};
export default OpinionsCard;
