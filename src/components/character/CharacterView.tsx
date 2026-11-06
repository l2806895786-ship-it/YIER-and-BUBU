import React from 'react';
import { CharacterId, CharacterFacing, ExpressionType, PoseType, EquippedOutfits } from '../../types/game';
import { ClothingPiece } from './ClothingPiece';

interface CharacterViewProps {
  type: CharacterId;
  facing?: CharacterFacing;
  size?: number;
  expression?: ExpressionType;
  pose?: PoseType;
  outfits?: EquippedOutfits;
  onClick?: () => void;
  className?: string;
  showShadow?: boolean;
}

export const CharacterView: React.FC<CharacterViewProps> = ({
  type,
  facing = 'front',
  size = 180,
  expression = 'normal',
  pose = 'idle',
  outfits,
  onClick,
  className = '',
  showShadow = true
}) => {
  const isYiEr = type === 'yier';

  // Map exact canonical transparent assets directly extracted from reference drawing
  const spriteMap: Record<CharacterId, Record<CharacterFacing, string>> = {
    yier: {
      front: '/assets/characters/yier_front.png',
      back: '/assets/characters/yier_back.png',
      side_left: '/assets/characters/yier_side_left.png',
      side_right: '/assets/characters/yier_side_right.png'
    },
    bubu: {
      front: '/assets/characters/bubu_front.png',
      back: '/assets/characters/bubu_back.png',
      side_left: '/assets/characters/bubu_side_left.png',
      side_right: '/assets/characters/bubu_side_right.png'
    }
  };

  const spriteSrc = spriteMap[type][facing] || spriteMap[type].front;

  // Pose animations
  let poseAnimationClass = '';
  if (pose === 'idle') {
    poseAnimationClass = 'animate-breathing';
  } else if (pose === 'bounce' || pose === 'celebrate') {
    poseAnimationClass = 'animate-gentle-bounce';
  } else if (pose === 'wave') {
    poseAnimationClass = 'animate-wiggle';
  } else if (pose === 'dance') {
    poseAnimationClass = 'animate-wiggle';
  } else if (pose === 'sleep') {
    poseAnimationClass = 'opacity-90';
  }

  // Normalized outfit item IDs from equipped slots
  const hat = outfits?.hat || outfits?.head;
  const top = outfits?.top || outfits?.body;
  const bottom = outfits?.bottom;
  const dress = outfits?.dress;
  const coat = outfits?.coat;
  const shoes = outfits?.shoes;
  const scarf = outfits?.scarf;
  const accessory = outfits?.accessory;
  const coupleSet = outfits?.couple_set;

  // Master sprite ratio: 392 x 530 => aspect ratio ~ 1.352
  const height = Math.round(size * 1.352);

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none transition-transform duration-200 ${
        onClick ? 'cursor-pointer active:scale-95 hover:scale-105' : ''
      } ${className}`}
      style={{ width: size, height: height + (showShadow ? 12 : 0) }}
    >
      <div className={`relative w-full flex items-center justify-center ${poseAnimationClass}`} style={{ height }}>
        {/* Canonical Master Character Sprite directly from IMG_3850_61747c17 */}
        <img
          src={spriteSrc}
          alt={`${isYiEr ? '一二' : '布布'} (${facing})`}
          className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
          draggable={false}
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Expression Overlays (Only on Front facing) */}
        {facing === 'front' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Blinking / Sleeping closed eyes */}
            {(expression === 'blink' || expression === 'sleep') && (
              <div className="absolute top-[37.5%] inset-x-0 flex justify-center gap-[34%]">
                <span className="w-4 h-1 bg-[#4B2925] rounded-full" />
                <span className="w-4 h-1 bg-[#4B2925] rounded-full" />
              </div>
            )}

            {/* Happy arched smiling eyes */}
            {expression === 'happy' && (
              <div className="absolute top-[36.5%] inset-x-0 flex justify-center gap-[33%]">
                <span className="text-xs font-bold text-[#4B2925] leading-none">^</span>
                <span className="text-xs font-bold text-[#4B2925] leading-none">^</span>
              </div>
            )}

            {/* Love Heart Eyes */}
            {expression === 'love' && (
              <div className="absolute top-[36%] inset-x-0 flex justify-center gap-[32%] text-xs animate-bounce">
                <span>💖</span>
                <span>💖</span>
              </div>
            )}

            {/* Extra Shy / Blush */}
            {expression === 'blush' && (
              <div className="absolute top-[39%] inset-x-0 flex justify-center gap-[46%] pointer-events-none">
                <span className="w-4 h-4 rounded-full bg-[#FF8080]/60 blur-xs" />
                <span className="w-4 h-4 rounded-full bg-[#FF8080]/60 blur-xs" />
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TRUE 2D CLOTHING LAYER RENDERER (100% Vector, Zero Text Badges) */}
        {/* Master Coordinate: 392 x 530 ViewBox matching original sprite   */}
        {/* ============================================================== */}
        {facing === 'front' && (
          <svg
            viewBox="0 0 392 530"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Layer 1: Pants & Bottoms (over lower torso and legs) */}
            {bottom && (
              <ClothingPiece itemId={bottom} character={type} />
            )}

            {/* Layer 2: Shoes & Boots (over feet) */}
            {shoes && (
              <ClothingPiece itemId={shoes} character={type} />
            )}

            {/* Layer 3: Main Body Clothing (Sweater, T-Shirt, Dress, Coat, or Couple Set) */}
            {coupleSet && (
              <ClothingPiece itemId={coupleSet} character={type} />
            )}

            {!coupleSet && dress && (
              <ClothingPiece itemId={dress} character={type} />
            )}

            {!coupleSet && !dress && top && top !== 'body_default' && (
              <ClothingPiece itemId={top} character={type} />
            )}

            {!coupleSet && coat && (
              <ClothingPiece itemId={coat} character={type} />
            )}

            {/* Layer 4: Neckwear & Scarves (wrapped naturally around neck) */}
            {scarf && (
              <ClothingPiece itemId={scarf} character={type} />
            )}

            {/* Layer 5: Hats & Headwear (nestled nicely on head) */}
            {hat && hat !== 'head_flower' && (
              <ClothingPiece itemId={hat} character={type} />
            )}
            {/* Backward-compat for legacy starter flower */}
            {hat === 'head_flower' && (
              <ClothingPiece itemId="hat_daisy" character={type} />
            )}

            {/* Layer 6: Handheld & Front Accessories (wand, camera, balloon) */}
            {accessory && (
              <ClothingPiece itemId={accessory} character={type} />
            )}
          </svg>
        )}
      </div>

      {/* Ground Ellipse Shadow */}
      {showShadow && (
        <div
          className="rounded-full bg-[#D7C2B2]/50 mt-1 pointer-events-none"
          style={{
            width: size * 0.62,
            height: Math.max(6, size * 0.08)
          }}
        />
      )}
    </div>
  );
};
