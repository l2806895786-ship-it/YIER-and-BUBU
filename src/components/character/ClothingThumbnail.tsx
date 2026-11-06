import React from 'react';
import { ClothingPiece } from './ClothingPiece';
import { CharacterId, OutfitCategory } from '../../types/game';
import { OUTFITS } from '../../data/outfits';

interface ClothingThumbnailProps {
  itemId: string;
  character?: CharacterId;
  size?: number;
  className?: string;
}

export const ClothingThumbnail: React.FC<ClothingThumbnailProps> = ({
  itemId,
  character = 'yier',
  size = 56,
  className = ''
}) => {
  const outfit = OUTFITS.find(o => o.id === itemId);
  const category: OutfitCategory = outfit?.category || 'top';

  // Compute focused viewBox so each item is nicely framed in its card thumbnail
  let viewBox = '0 0 392 530';

  if (category === 'hat') {
    if (itemId === 'hat_daisy') {
      viewBox = '250 35 90 90';
    } else {
      viewBox = '110 5 172 105';
    }
  } else if (category === 'top') {
    viewBox = '45 340 302 125';
  } else if (category === 'bottom') {
    viewBox = '80 345 232 160';
  } else if (category === 'dress') {
    viewBox = '55 335 282 175';
  } else if (category === 'coat') {
    viewBox = '45 335 302 165';
  } else if (category === 'shoes') {
    viewBox = '80 455 232 75';
  } else if (category === 'scarf') {
    viewBox = '70 320 252 135';
  } else if (category === 'accessory') {
    if (itemId === 'acc_balloon') {
      viewBox = '290 50 100 130';
    } else if (itemId === 'acc_wand') {
      viewBox = '305 295 85 145';
    } else {
      viewBox = '135 340 120 115';
    }
  } else if (category === 'couple_set') {
    viewBox = '50 340 292 165';
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#F8F2EC] border border-[#4B2925]/15 shadow-2xs overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={viewBox}
        className="w-[88%] h-[88%] object-contain drop-shadow-xs"
      >
        <ClothingPiece itemId={itemId} character={character} isThumbnail={true} />
      </svg>
    </div>
  );
};
