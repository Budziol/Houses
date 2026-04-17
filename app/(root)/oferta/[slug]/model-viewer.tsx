"use client";

import { useState } from "react";
import OfferScene from "./offer-scene";
import { GhostButton } from "@/components/buttons";
import {
  ArrowLeft,
  BrickWall,
  ChevronUp,
  Layers,
  Layers2,
  Sofa,
} from "lucide-react";

type Props = {
  floorNumber: number;
};

const ModelViewer = ({ floorNumber = 2 }: Props) => {
  const [showModel, setShowModel] = useState(false);

  const [floor, setFloor] = useState(floorNumber);
  const [showWalls, setShowWalls] = useState(true);
  const [showFurnitures, setShowFurnitures] = useState(true);
  const [showRoof, setShowRoof] = useState(true);
  const [showFoundation, setShowFoundation] = useState(true);
  const [showSecondWalls, setShowSecondWalls] = useState(true);
  const [showSecondFurnitures, setShowSecondFurnitures] = useState(true);

  return (
    <div className="min-h-[80vh] relative w-full rounded-xl overflow-hidden">
      {!showModel && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-30 flex">
          <GhostButton
            className="w-fit! m-auto"
            onClick={() => setShowModel(true)}
          >
            Pokaż model 3D
          </GhostButton>
        </div>
      )}

      <div className="absolute w-full flex gap-10 justify-between z-20 bg-gray-100 rounded-xl rounded-b-none border-b border-gray-200">
        <button
          className="w-13.75 h-13.75 text-text-main hover:bg-gray-200 transition-all duration-150 flex items-center justify-center cursor-pointer"
          onClick={() => setShowModel(false)}
        >
          <ArrowLeft />
        </button>
        <div className="flex items-center gap-3 left-0">
          <label htmlFor="level" className="">
            <Layers />
          </label>
          <select
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
            className="w-fit! cursor-pointer rounded-lg"
          >
            {Array.from({ length: floorNumber }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full md:w-fit h-auto md:h-full absolute left-0 md:left-auto md:right-0 z-10 pt-13.75 bg-gray-100 rounded-xl rounded-b-none border-b md:border-b-none md:border-l border-gray-200">
        {floor === 1 ? (
          <div className="flex flex-row md:flex-col">
            <button
              onClick={() => setShowWalls(!showWalls)}
              className="w-13.75 h-13.75 text-text-main hover:bg-gray-200 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <BrickWall />
            </button>
            <button
              onClick={() => setShowFurnitures(!showFurnitures)}
              className="w-13.75 h-13.75 text-text-main hover:bg-gray-200 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <Sofa />
            </button>
            <button
              onClick={() => setShowFoundation(!showFoundation)}
              className="w-13.75 h-13.75 text-text-main hover:bg-gray-200 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <Layers2 />
            </button>
          </div>
        ) : (
          <div className="flex flex-row md:flex-col">
            <button
              onClick={() => setShowSecondWalls(!showSecondWalls)}
              className="w-13.75 h-13.75 text-text-main hover:bg-gray-200 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <BrickWall />
            </button>
            <button
              onClick={() => setShowSecondFurnitures(!showSecondFurnitures)}
              className="w-13.75 h-13.75 text-text-main hover:bg-gray-200 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <Sofa />
            </button>
            <button
              onClick={() => setShowRoof(!showRoof)}
              className="w-13.75 h-13.75 text-text-main hover:bg-gray-200 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <ChevronUp />
            </button>
          </div>
        )}
      </div>

      {showModel && (
        <OfferScene
          floor={floor}
          showWalls={showWalls}
          showFurnitures={showFurnitures}
          showRoof={showRoof}
          showSecondWalls={showSecondWalls}
          showSecondFurnitures={showSecondFurnitures}
          showFoundation={showFoundation}
        />
      )}
    </div>
  );
};
export default ModelViewer;
