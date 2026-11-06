import React from 'react';
import { CharacterId, CharacterFacing } from '../../types/game';

/**
 * 2D Character Outfit SVG Vector Graphics Library for 《一二布布》
 * All assets share the unified master coordinate system: viewBox="0 0 392 530"
 * Directly calibrated against canonical 392x530 pixel landmarks.
 */

interface OutfitSVGProps {
  itemId: string;
  character: CharacterId;
  facing?: CharacterFacing;
}

export const OutfitSVG: React.FC<OutfitSVGProps> = ({ itemId, character, facing = 'front' }) => {
  // Only front facing currently has full dress-up suite; back/side can render neutral or rear layer
  if (facing !== 'front') {
    return null;
  }

  const strokeColor = '#4B2925';
  const strokeWidth = 3;

  switch (itemId) {
    // =========================================================================
    // 1. 帽子 (Hat) - Calibrated to head dome (Y=50..95), between/around ears
    // =========================================================================

    // 1.1 向阳小雏菊发卡 (Daisy Hairclip) - Pinned near ear
    case 'hat_daisy':
      return (
        <g id="outfit-hat_daisy" className="outfit-layer">
          <g transform="translate(108, 76)">
            {/* 8 White Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-13"
                rx="6"
                ry="11"
                fill="#FFFFFF"
                stroke={strokeColor}
                strokeWidth={2}
                transform={`rotate(${angle})`}
              />
            ))}
            {/* Golden center pollen */}
            <circle cx="0" cy="0" r="8" fill="#FDE047" stroke={strokeColor} strokeWidth={2.5} />
            <circle cx="0" cy="0" r="5" fill="#F59E0B" opacity="0.6" />
            {/* Little hair clip pin */}
            <path d="M-8,10 L-2,18 L6,14" fill="none" stroke="#6B7280" strokeWidth={2.5} strokeLinecap="round" />
          </g>
        </g>
      );

    // 1.2 草莓波波画家帽 (Strawberry Beret) - Tilted on head
    case 'hat_beret':
      return (
        <g id="outfit-hat_beret" className="outfit-layer">
          {/* Beret body */}
          <path
            d="M 148,82 C 142,65 160,38 198,36 C 242,34 262,62 254,82 C 245,92 160,94 148,82 Z"
            fill="#EF4444"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Beret band / fold shadow */}
          <path
            d="M 154,82 C 180,88 220,88 248,82"
            fill="none"
            stroke="#B91C1C"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* Strawberry seeds */}
          <circle cx="178" cy="56" r="1.8" fill="#FDE047" />
          <circle cx="204" cy="50" r="1.8" fill="#FDE047" />
          <circle cx="225" cy="62" r="1.8" fill="#FDE047" />
          <circle cx="192" cy="70" r="1.8" fill="#FDE047" />
          <circle cx="168" cy="74" r="1.8" fill="#FDE047" />
          {/* Cute green stem on top */}
          <path
            d="M 198,36 C 196,25 204,18 206,14 C 203,24 200,30 200,36 Z"
            fill="#22C55E"
            stroke={strokeColor}
            strokeWidth={2}
          />
          <path
            d="M 198,34 C 188,32 186,26 188,24 C 193,28 196,31 198,34 Z"
            fill="#16A34A"
            stroke={strokeColor}
            strokeWidth={1.5}
          />
        </g>
      );

    // 1.3 欢庆生日派对尖顶帽 (Party Cone Hat)
    case 'hat_party':
      return (
        <g id="outfit-hat_party" className="outfit-layer">
          {/* Hat cone */}
          <path
            d="M 172,78 L 196,16 L 224,78 C 208,82 188,82 172,78 Z"
            fill="#F472B6"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Colorful party stripes */}
          <path d="M 180,62 L 206,38" stroke="#FDE047" strokeWidth={5} strokeLinecap="round" />
          <path d="M 186,74 L 218,48" stroke="#60A5FA" strokeWidth={5} strokeLinecap="round" />
          <path d="M 198,78 L 222,64" stroke="#34D399" strokeWidth={4} strokeLinecap="round" />
          {/* Pom pom at the peak */}
          <circle cx="196" cy="14" r="7" fill="#FEF08A" stroke={strokeColor} strokeWidth={2.5} />
          {/* Scalloped brim */}
          <path
            d="M 168,78 Q 174,82 180,78 Q 186,82 192,78 Q 198,82 204,78 Q 210,82 216,78 Q 222,82 228,78"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );

    // 1.4 焦糖毛球暖冬针织帽 (Caramel Knit Beanie)
    case 'hat_knit':
      return (
        <g id="outfit-hat_knit" className="outfit-layer">
          {/* Main Beanie dome */}
          <path
            d="M 152,78 C 146,50 168,26 196,24 C 228,26 248,50 242,78 Z"
            fill="#D97706"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Knit rib vertical lines */}
          <path d="M 174,38 L 174,74" stroke="#B45309" strokeWidth={2} strokeLinecap="round" />
          <path d="M 188,32 L 188,74" stroke="#B45309" strokeWidth={2} strokeLinecap="round" />
          <path d="M 204,32 L 204,74" stroke="#B45309" strokeWidth={2} strokeLinecap="round" />
          <path d="M 218,38 L 218,74" stroke="#B45309" strokeWidth={2} strokeLinecap="round" />
          {/* Fold-over brim */}
          <rect
            x="146"
            y="72"
            width="102"
            height="18"
            rx="9"
            fill="#F59E0B"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Large fluffy pompom on top */}
          <circle cx="196" cy="18" r="11" fill="#FFFBEB" stroke={strokeColor} strokeWidth={2.5} />
          <circle cx="196" cy="18" r="8" fill="#FDE68A" opacity="0.6" />
        </g>
      );

    // =========================================================================
    // 2. 上衣 (Top) - Torso: Y=330..435, Arms: X=50..115 (L) & X=277..342 (R)
    // =========================================================================

    // 2.1 暖阳小熊软萌毛衣 (Warm Bear Sweater) - The user's primary test item!
    case 'top_bear_sweater':
      return (
        <g id="outfit-top_bear_sweater" className="outfit-layer">
          {/* Left Sleeve (covers left arm X:50..115, Y:340..415) */}
          <path
            d="M 124,342 C 96,346 64,360 55,392 C 52,404 60,414 74,414 C 92,414 116,396 128,375 Z"
            fill="#FBBF24"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Left sleeve ribbed cuff */}
          <path
            d="M 55,398 L 76,414"
            stroke={strokeColor}
            strokeWidth={strokeWidth + 1}
            strokeLinecap="round"
          />

          {/* Right Sleeve (covers right arm X:277..342, Y:340..415) */}
          <path
            d="M 268,342 C 296,346 328,360 337,392 C 340,404 332,414 318,414 C 300,414 276,396 264,375 Z"
            fill="#FBBF24"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Right sleeve ribbed cuff */}
          <path
            d="M 337,398 L 316,414"
            stroke={strokeColor}
            strokeWidth={strokeWidth + 1}
            strokeLinecap="round"
          />

          {/* Main Sweater Torso (Shoulders to Hem Y:334..438) */}
          <path
            d="M 124,340 C 145,348 196,350 268,340 C 285,365 292,400 280,432 C 274,438 118,438 112,432 C 100,400 107,365 124,340 Z"
            fill="#FBBF24"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />

          {/* Knitted Cable Ribbing Details */}
          <g stroke="#D97706" strokeWidth={2} strokeLinecap="round" opacity="0.8">
            {/* Center cable braid lines */}
            <path d="M 188,365 Q 192,375 188,385 Q 184,395 188,405 Q 192,415 188,425" fill="none" />
            <path d="M 204,365 Q 200,375 204,385 Q 208,395 204,405 Q 200,415 204,425" fill="none" />
            {/* Side texture lines */}
            <path d="M 152,375 L 150,420" />
            <path d="M 240,375 L 242,420" />
          </g>

          {/* Bottom Hem Band with Ribbing */}
          <rect
            x="110"
            y="426"
            width="172"
            height="14"
            rx="6"
            fill="#F59E0B"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Hem vertical rib stitch marks */}
          {[124, 140, 156, 172, 188, 204, 220, 236, 252, 268].map(x => (
            <line key={x} x1={x} y1="428" x2={x} y2="438" stroke="#B45309" strokeWidth={1.5} />
          ))}

          {/* Neck Ribbed Collar (snugly fitted around neck/chin) */}
          <path
            d="M 140,336 C 160,350 232,350 252,336 C 242,344 150,344 140,336 Z"
            fill="#F59E0B"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />

          {/* Embroidered Cute Bear / Heart Patch on Chest */}
          <g transform="translate(196, 392)">
            {/* White felt backing */}
            <circle cx="0" cy="0" r="16" fill="#FFFBEB" stroke={strokeColor} strokeWidth={2} />
            {/* Mini cute bear face or heart */}
            <circle cx="-10" cy="-10" r="5" fill="#78350F" />
            <circle cx="10" cy="-10" r="5" fill="#78350F" />
            <circle cx="0" cy="2" r="11" fill="#D97706" />
            <circle cx="-4" cy="0" r="2" fill="#4B2925" />
            <circle cx="4" cy="0" r="2" fill="#4B2925" />
            <ellipse cx="0" cy="4" rx="4" ry="2.5" fill="#FFFBEB" />
            <ellipse cx="0" cy="3" rx="1.5" ry="1" fill="#4B2925" />
          </g>
        </g>
      );

    // 2.2 经典蓝白条纹海魂衫 (Sailor Striped T-shirt)
    case 'top_striped':
      return (
        <g id="outfit-top_striped" className="outfit-layer">
          {/* Left Sleeve */}
          <path
            d="M 124,342 C 96,346 64,360 55,392 C 52,404 60,414 74,414 C 92,414 116,396 128,375 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Right Sleeve */}
          <path
            d="M 268,342 C 296,346 328,360 337,392 C 340,404 332,414 318,414 C 300,414 276,396 264,375 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Main Torso */}
          <path
            d="M 124,340 C 145,348 196,350 268,340 C 285,365 292,400 280,432 C 274,438 118,438 112,432 C 100,400 107,365 124,340 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Navy Blue Stripes */}
          <g stroke="#2563EB" strokeWidth={6} strokeLinecap="round">
            <path d="M 116,360 C 150,366 242,366 276,360" />
            <path d="M 112,380 C 150,386 242,386 280,380" />
            <path d="M 112,400 C 150,406 242,406 280,400" />
            <path d="M 114,420 C 150,426 242,426 278,420" />
            {/* Sleeve stripes */}
            <path d="M 72,374 L 108,360" />
            <path d="M 64,394 L 98,380" />
            <path d="M 320,374 L 284,360" />
            <path d="M 328,394 L 294,380" />
          </g>
          {/* Navy Blue Round Collar */}
          <path
            d="M 144,336 C 160,348 232,348 248,336"
            fill="none"
            stroke="#1E40AF"
            strokeWidth={5}
            strokeLinecap="round"
          />
        </g>
      );

    // 2.3 甜心樱桃纯白短袖 (Cherry White Tee)
    case 'top_cherry_tshirt':
      return (
        <g id="outfit-top_cherry_tshirt" className="outfit-layer">
          {/* Left Sleeve */}
          <path
            d="M 124,342 C 96,346 64,360 55,392 C 52,404 60,414 74,414 C 92,414 116,396 128,375 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Right Sleeve */}
          <path
            d="M 268,342 C 296,346 328,360 337,392 C 340,404 332,414 318,414 C 300,414 276,396 264,375 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Torso */}
          <path
            d="M 124,340 C 145,348 196,350 268,340 C 285,365 292,400 280,432 C 274,438 118,438 112,432 C 100,400 107,365 124,340 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Pink Ribbed Collar */}
          <path
            d="M 144,336 C 160,348 232,348 248,336"
            fill="none"
            stroke="#FB7185"
            strokeWidth={4.5}
            strokeLinecap="round"
          />
          {/* Embroidered Cherries on Chest */}
          <g transform="translate(196, 386)">
            {/* Green Stem and Leaf */}
            <path d="M -6,-2 C -4,-12 4,-16 8,-18 C 6,-10 2,-4 8,0" fill="none" stroke="#16A34A" strokeWidth={2.5} strokeLinecap="round" />
            <path d="M 6,-16 Q 14,-20 18,-14 Q 12,-12 6,-16 Z" fill="#22C55E" stroke="#16A34A" strokeWidth={1} />
            {/* Left Cherry */}
            <circle cx="-6" cy="3" r="8" fill="#EF4444" stroke={strokeColor} strokeWidth={2} />
            <circle cx="-8" cy="1" r="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Right Cherry */}
            <circle cx="8" cy="5" r="8" fill="#DC2626" stroke={strokeColor} strokeWidth={2} />
            <circle cx="6" cy="3" r="2.5" fill="#FFFFFF" opacity="0.8" />
          </g>
        </g>
      );

    // =========================================================================
    // 3. 裤子 (Bottom) - Waistline Y=425..440, Shorts cuffs Y=475..485
    // =========================================================================

    // 3.1 经典工装牛仔背带裤 (Denim Overalls)
    case 'bottom_overalls':
      return (
        <g id="outfit-bottom_overalls" className="outfit-layer">
          {/* Left Suspender Strap */}
          <path
            d="M 146,346 L 146,400"
            stroke="#2563EB"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <path d="M 146,346 L 146,400" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
          <circle cx="146" cy="402" r="3.5" fill="#F59E0B" stroke={strokeColor} strokeWidth={1.5} />

          {/* Right Suspender Strap */}
          <path
            d="M 246,346 L 246,400"
            stroke="#2563EB"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <path d="M 246,346 L 246,400" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
          <circle cx="246" cy="402" r="3.5" fill="#F59E0B" stroke={strokeColor} strokeWidth={1.5} />

          {/* Front Center Bib (Chest pocket) */}
          <path
            d="M 136,396 L 256,396 L 256,432 L 136,432 Z"
            fill="#3B82F6"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Front Bib Pocket */}
          <path
            d="M 174,406 L 218,406 L 214,426 L 178,426 Z"
            fill="#2563EB"
            stroke={strokeColor}
            strokeWidth={1.8}
          />

          {/* Lower Shorts Section */}
          <path
            d="M 108,428 C 104,452 108,474 116,482 C 146,484 172,480 186,464 C 200,480 226,484 256,482 C 264,474 268,452 264,428 Z"
            fill="#3B82F6"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Crotch divider line */}
          <path d="M 186,450 L 186,464" stroke={strokeColor} strokeWidth={2.5} strokeLinecap="round" />
          {/* Yellow Contrast Stitching details */}
          <path d="M 118,476 L 166,476" stroke="#FDE047" strokeWidth={1.5} strokeDasharray="3 2" />
          <path d="M 206,476 L 254,476" stroke="#FDE047" strokeWidth={1.5} strokeDasharray="3 2" />
        </g>
      );

    // 3.2 奶茶色休闲小短裤 (Khaki Explorer Shorts)
    case 'bottom_khaki':
      return (
        <g id="outfit-bottom_khaki" className="outfit-layer">
          {/* Waistband with belt loops */}
          <rect
            x="110"
            y="426"
            width="172"
            height="14"
            rx="5"
            fill="#B45309"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Belt Loops */}
          <line x1="140" y1="426" x2="140" y2="440" stroke="#78350F" strokeWidth={2.5} />
          <line x1="196" y1="426" x2="196" y2="440" stroke="#78350F" strokeWidth={2.5} />
          <line x1="252" y1="426" x2="252" y2="440" stroke="#78350F" strokeWidth={2.5} />

          {/* Shorts body */}
          <path
            d="M 108,438 C 104,456 108,476 116,482 C 146,484 172,480 186,462 C 200,480 226,484 256,482 C 264,476 268,456 264,438 Z"
            fill="#D97706"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Slant pocket slits */}
          <path d="M 124,444 L 140,460" stroke="#78350F" strokeWidth={2} strokeLinecap="round" />
          <path d="M 268,444 L 252,460" stroke="#78350F" strokeWidth={2} strokeLinecap="round" />
          {/* Rolled cuffs */}
          <path d="M 116,478 L 168,478" stroke="#FBBF24" strokeWidth={3} strokeLinecap="round" />
          <path d="M 204,478 L 256,478" stroke="#FBBF24" strokeWidth={3} strokeLinecap="round" />
        </g>
      );

    // =========================================================================
    // 4. 连衣裙 (Dress) - Full body coverage from neck Y=334 to flared hem Y=475
    // =========================================================================

    // 4.1 元气蓝白水手海军裙 (Sailor Dress)
    case 'dress_sailor':
      return (
        <g id="outfit-dress_sailor" className="outfit-layer">
          {/* Sleeves */}
          <path
            d="M 124,342 C 96,346 64,360 55,392 C 52,404 60,414 74,414 C 92,414 116,396 128,375 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d="M 268,342 C 296,346 328,360 337,392 C 340,404 332,414 318,414 C 300,414 276,396 264,375 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Bodice and Flared Pleated Skirt */}
          <path
            d="M 124,340 C 145,348 196,350 268,340 C 285,370 292,410 298,460 C 298,474 94,474 94,460 C 100,410 107,370 124,340 Z"
            fill="#1E40AF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* White Double Hem Stripes on skirt */}
          <path d="M 98,458 C 140,466 252,466 294,458" stroke="#FFFFFF" strokeWidth={3} fill="none" />
          <path d="M 102,466 C 140,474 252,474 290,466" stroke="#FFFFFF" strokeWidth={2.5} fill="none" />
          {/* Sailor Square Collar with White Striping */}
          <path
            d="M 132,336 L 118,370 L 160,370 L 196,354 L 232,370 L 274,370 L 260,336 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          <path d="M 124,364 L 158,364" stroke="#1E40AF" strokeWidth={2} />
          <path d="M 234,364 L 268,364" stroke="#1E40AF" strokeWidth={2} />
          {/* Red Tie / Ribbon Bow at Neck Center */}
          <g transform="translate(196, 360)">
            <ellipse cx="0" cy="0" rx="6" ry="5" fill="#EF4444" stroke={strokeColor} strokeWidth={2} />
            <path d="M -5,2 L -14,16 L -4,15 L -2,3 Z" fill="#DC2626" stroke={strokeColor} strokeWidth={1.5} />
            <path d="M 5,2 L 14,16 L 4,15 L 2,3 Z" fill="#DC2626" stroke={strokeColor} strokeWidth={1.5} />
          </g>
        </g>
      );

    // 4.2 草莓泡泡袖洛丽塔裙 (Lolita Strawberry Dress)
    case 'dress_princess':
      return (
        <g id="outfit-dress_princess" className="outfit-layer">
          {/* Puffy Bubble Sleeves */}
          <circle cx="95" cy="372" r="24" fill="#F472B6" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="297" cy="372" r="24" fill="#F472B6" stroke={strokeColor} strokeWidth={strokeWidth} />
          {/* White sleeve frill cuffs */}
          <path d="M 76,386 Q 84,394 92,386 Q 100,394 108,386" stroke="#FFFFFF" strokeWidth={3} fill="none" />
          <path d="M 284,386 Q 292,394 300,386 Q 308,394 316,386" stroke="#FFFFFF" strokeWidth={3} fill="none" />

          {/* Dress Body & Wide Tiered Frill Skirt */}
          <path
            d="M 132,342 C 150,350 242,350 260,342 C 280,380 306,424 312,470 C 312,478 80,478 80,470 C 86,424 112,380 132,342 Z"
            fill="#EC4899"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />

          {/* White Lace Apron / Stomacher at Center */}
          <path
            d="M 164,348 L 228,348 L 222,416 L 170,416 Z"
            fill="#FFF1F2"
            stroke={strokeColor}
            strokeWidth={2}
          />
          {/* Criss-cross ribbon lacing on chest */}
          <path d="M 174,360 L 218,384 M 218,360 L 174,384 M 174,384 L 218,408 M 218,384 L 174,408" stroke="#DB2777" strokeWidth={2} />

          {/* Double tier ruffles at bottom hem */}
          <path
            d="M 80,462 Q 95,470 110,462 Q 125,470 140,462 Q 155,470 170,462 Q 185,470 200,462 Q 215,470 230,462 Q 245,470 260,462 Q 275,470 290,462 Q 305,470 312,462"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={4}
          />
          {/* Satin Bow on Waist */}
          <g transform="translate(196, 422)">
            <ellipse cx="0" cy="0" rx="8" ry="6" fill="#BE185D" stroke={strokeColor} strokeWidth={2} />
            <path d="M -7,0 C -20,-8 -22,8 -7,2 Z" fill="#BE185D" stroke={strokeColor} strokeWidth={1.5} />
            <path d="M 7,0 C 20,-8 22,8 7,2 Z" fill="#BE185D" stroke={strokeColor} strokeWidth={1.5} />
            <path d="M -4,4 L -10,18" stroke="#BE185D" strokeWidth={3} strokeLinecap="round" />
            <path d="M 4,4 L 10,18" stroke="#BE185D" strokeWidth={3} strokeLinecap="round" />
          </g>
        </g>
      );

    // =========================================================================
    // 5. 外套 (Coat)
    // =========================================================================

    // 5.1 牛角扣学院风大衣 (Duffle Coat)
    case 'coat_duffle':
      return (
        <g id="outfit-coat_duffle" className="outfit-layer">
          {/* Left Sleeve */}
          <path
            d="M 124,342 C 94,344 60,358 52,392 C 48,408 58,420 74,420 C 94,420 120,400 130,375 Z"
            fill="#B45309"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Right Sleeve */}
          <path
            d="M 268,342 C 298,344 332,358 340,392 C 344,408 334,420 318,420 C 298,420 272,400 262,375 Z"
            fill="#B45309"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Coat Body */}
          <path
            d="M 122,338 C 145,346 247,346 270,338 C 290,370 298,415 292,455 C 286,462 106,462 100,455 C 94,415 102,370 122,338 Z"
            fill="#B45309"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Wide Duffle Lapel Collar */}
          <path
            d="M 122,338 L 158,370 L 196,352 L 234,370 L 270,338"
            fill="#92400E"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Center Front Button Placket */}
          <line x1="196" y1="352" x2="196" y2="455" stroke={strokeColor} strokeWidth={2.5} />

          {/* 3 Wooden Toggle Buttons (牛角扣) with dark cord loops */}
          {[374, 402, 430].map(y => (
            <g key={y} transform={`translate(196, ${y})`}>
              {/* Cord loop */}
              <path d="M -16,0 C -8,-6 8,-6 16,0 C 8,6 -8,6 -16,0" fill="none" stroke="#78350F" strokeWidth={2} />
              {/* Horn Toggle Peg */}
              <polygon points="0,-7 3,0 0,7 -3,0" fill="#FEF3C7" stroke={strokeColor} strokeWidth={1.8} transform="rotate(25)" />
            </g>
          ))}

          {/* Flap Pockets on left and right */}
          <rect x="120" y="420" width="34" height="18" rx="4" fill="#92400E" stroke={strokeColor} strokeWidth={2} />
          <rect x="238" y="420" width="34" height="18" rx="4" fill="#92400E" stroke={strokeColor} strokeWidth={2} />
        </g>
      );

    // 5.2 毛茸茸小羊羔绒马甲 (Fleece Sherpa Vest)
    case 'coat_fleece':
      return (
        <g id="outfit-coat_fleece" className="outfit-layer">
          {/* Fluffy Sherpa Body */}
          <path
            d="M 126,340 C 145,348 247,348 266,340 C 284,370 286,410 280,442 C 274,448 118,448 112,442 C 106,410 108,370 126,340 Z"
            fill="#F8FAFC"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Fluffy textured scalloped edges */}
          <g fill="#F1F5F9" stroke="#CBD5E1" strokeWidth={1.5}>
            <circle cx="120" cy="370" r="10" />
            <circle cx="118" cy="395" r="11" />
            <circle cx="120" cy="420" r="10" />
            <circle cx="272" cy="370" r="10" />
            <circle cx="274" cy="395" r="11" />
            <circle cx="272" cy="420" r="10" />
          </g>
          {/* Caramel Contrast Zipper and Trim */}
          <line x1="196" y1="344" x2="196" y2="446" stroke="#B45309" strokeWidth={4} strokeLinecap="round" />
          <circle cx="196" cy="348" r="3.5" fill="#F59E0B" stroke={strokeColor} strokeWidth={1.5} />
          {/* Armhole brown piping */}
          <path d="M 126,344 C 114,370 114,400 126,420" fill="none" stroke="#B45309" strokeWidth={3} strokeLinecap="round" />
          <path d="M 266,344 C 278,370 278,400 266,420" fill="none" stroke="#B45309" strokeWidth={3} strokeLinecap="round" />
        </g>
      );

    // =========================================================================
    // 6. 鞋子 (Shoes) - Left Foot: X=98..178, Y=485..524; Right Foot: X=214..294, Y=485..524
    // =========================================================================

    // 6.1 暖黄色小雨靴 (Yellow Rain Boots)
    case 'shoes_boots':
      return (
        <g id="outfit-shoes_boots" className="outfit-layer">
          {/* Left Boot */}
          <g>
            {/* Shaft */}
            <path
              d="M 112,482 L 158,482 L 164,514 C 164,524 102,524 104,514 Z"
              fill="#FACC15"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* White Rubber Sole */}
            <path
              d="M 100,514 C 100,526 166,526 166,514 Z"
              fill="#FFFFFF"
              stroke={strokeColor}
              strokeWidth={2}
            />
            {/* Boot opening collar */}
            <ellipse cx="135" cy="482" rx="23" ry="5" fill="#EAB308" stroke={strokeColor} strokeWidth={2} />
          </g>

          {/* Right Boot */}
          <g>
            {/* Shaft */}
            <path
              d="M 234,482 L 280,482 L 288,514 C 288,524 226,524 228,514 Z"
              fill="#FACC15"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* White Rubber Sole */}
            <path
              d="M 226,514 C 226,526 292,526 292,514 Z"
              fill="#FFFFFF"
              stroke={strokeColor}
              strokeWidth={2}
            />
            {/* Boot opening collar */}
            <ellipse cx="257" cy="482" rx="23" ry="5" fill="#EAB308" stroke={strokeColor} strokeWidth={2} />
          </g>
        </g>
      );

    // 6.2 经典红白帆布板鞋 (Red Canvas Sneakers)
    case 'shoes_sneakers':
      return (
        <g id="outfit-shoes_sneakers" className="outfit-layer">
          {/* Left Sneaker */}
          <g>
            <path
              d="M 108,488 L 160,488 L 164,516 L 102,516 Z"
              fill="#EF4444"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* White rubber toe cap */}
            <path d="M 102,504 C 102,516 130,518 130,504 Z" fill="#FFFFFF" stroke={strokeColor} strokeWidth={1.8} />
            {/* White laces */}
            <line x1="124" y1="492" x2="148" y2="492" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
            <line x1="126" y1="498" x2="152" y2="498" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
            {/* White sole with red foxing stripe */}
            <rect x="100" y="514" width="66" height="8" rx="3" fill="#FFFFFF" stroke={strokeColor} strokeWidth={2} />
            <line x1="102" y1="518" x2="164" y2="518" stroke="#DC2626" strokeWidth={1.5} />
          </g>

          {/* Right Sneaker */}
          <g>
            <path
              d="M 232,488 L 284,488 L 290,516 L 228,516 Z"
              fill="#EF4444"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* White rubber toe cap */}
            <path d="M 262,504 C 262,518 290,516 290,504 Z" fill="#FFFFFF" stroke={strokeColor} strokeWidth={1.8} />
            {/* White laces */}
            <line x1="244" y1="492" x2="268" y2="492" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
            <line x1="240" y1="498" x2="266" y2="498" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
            {/* White sole */}
            <rect x="226" y="514" width="66" height="8" rx="3" fill="#FFFFFF" stroke={strokeColor} strokeWidth={2} />
            <line x1="228" y1="518" x2="290" y2="518" stroke="#DC2626" strokeWidth={1.5} />
          </g>
        </g>
      );

    // =========================================================================
    // 7. 围巾 (Scarf) - Wraps neck at Y=315..355, tails hang to Y=410
    // =========================================================================

    // 7.1 温暖粗棒针圣诞红围巾 (Chunky Red Wool Scarf)
    case 'scarf_red':
      return (
        <g id="outfit-scarf_red" className="outfit-layer">
          {/* Hanging tails down the chest */}
          <path
            d="M 152,342 L 144,410 L 176,410 L 180,344 Z"
            fill="#DC2626"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* White Fringe Tassels */}
          {[148, 154, 160, 166, 172].map(x => (
            <line key={x} x1={x} y1="410" x2={x} y2="422" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
          ))}

          {/* Thick Wrapped Neck Ring */}
          <path
            d="M 124,324 C 150,344 242,344 268,324 C 274,342 248,358 196,358 C 144,358 118,342 124,324 Z"
            fill="#EF4444"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Knitted ribbed lines */}
          <path d="M 144,330 L 140,350 M 172,336 L 170,356 M 204,336 L 206,356 M 236,330 L 240,350" stroke="#B91C1C" strokeWidth={2} />
          {/* Knot bulge */}
          <ellipse cx="166" cy="344" rx="14" ry="11" fill="#DC2626" stroke={strokeColor} strokeWidth={2.5} />
        </g>
      );

    // 7.2 苏格兰黄绿格子围脖 (Green Plaid Infinity Cowl)
    case 'scarf_plaid':
      return (
        <g id="outfit-scarf_plaid" className="outfit-layer">
          {/* Main Snood loop */}
          <path
            d="M 124,322 C 150,344 242,344 268,322 C 278,344 248,362 196,362 C 144,362 114,344 124,322 Z"
            fill="#15803D"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Plaid stripes */}
          <g stroke="#FDE047" strokeWidth={2.5} strokeDasharray="5 3">
            <path d="M 134,332 C 160,348 232,348 258,332" fill="none" />
            <path d="M 136,342 C 160,356 232,356 256,342" fill="none" />
          </g>
          <g stroke="#1E3A8A" strokeWidth={2}>
            <line x1="152" y1="326" x2="148" y2="354" />
            <line x1="182" y1="332" x2="180" y2="360" />
            <line x1="210" y1="332" x2="212" y2="360" />
            <line x1="240" y1="326" x2="244" y2="354" />
          </g>
        </g>
      );

    // =========================================================================
    // 8. 配饰 (Accessory) - Handheld, pinned, or hanging across body
    // =========================================================================

    // 8.1 心动爱心魔法手杖 (Magic Heart Wand) - Held in right paw
    case 'acc_wand':
      return (
        <g id="outfit-acc_wand" className="outfit-layer">
          {/* Golden Handle Wand */}
          <line x1="316" y1="395" x2="352" y2="330" stroke="#F59E0B" strokeWidth={5} strokeLinecap="round" />
          <line x1="316" y1="395" x2="352" y2="330" stroke={strokeColor} strokeWidth={2} fill="none" />
          {/* Ribbons around handle */}
          <path d="M 342,348 Q 350,358 346,366" stroke="#F472B6" strokeWidth={3} fill="none" strokeLinecap="round" />
          {/* Glowing Pink Crystal Heart Tip */}
          <g transform="translate(354, 326)">
            <path
              d="M 0,-4 C -8,-16 -20,-4 -12,8 Q -2,18 0,22 Q 2,18 12,8 C 20,-4 8,-16 0,-4 Z"
              fill="#EC4899"
              stroke={strokeColor}
              strokeWidth={2.5}
            />
            {/* Sparkles around wand */}
            <circle cx="14" cy="-6" r="3" fill="#FDE047" />
            <circle cx="-16" cy="12" r="2.5" fill="#FDE047" />
            <path d="M 0,-18 L 0,-10 M -4,-14 L 4,-14" stroke="#FDE047" strokeWidth={2} strokeLinecap="round" />
          </g>
        </g>
      );

    // 8.2 微笑星星漂浮气球 (Smiling Star Balloon)
    case 'acc_balloon':
      return (
        <g id="outfit-acc_balloon" className="outfit-layer">
          {/* String held in Right Paw */}
          <path
            d="M 324,402 Q 346,360 338,300 Q 330,240 348,160"
            fill="none"
            stroke="#94A3B8"
            strokeWidth={2}
          />
          {/* Big Golden Smiling Star Balloon */}
          <g transform="translate(348, 140)">
            {/* Star Body */}
            <polygon
              points="0,-36 10,-12 36,-10 16,10 22,36 0,22 -22,36 -16,10 -36,-10 -10,-12"
              fill="#FBBF24"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Balloon knot */}
            <polygon points="-4,22 4,22 0,28" fill="#D97706" stroke={strokeColor} strokeWidth={1.5} />
            {/* Cute Smiling Face on Star */}
            <circle cx="-8" cy="2" r="2.5" fill="#4B2925" />
            <circle cx="8" cy="2" r="2.5" fill="#4B2925" />
            <circle cx="-14" cy="5" r="3" fill="#F472B6" opacity="0.6" />
            <circle cx="14" cy="5" r="3" fill="#F472B6" opacity="0.6" />
            <path d="M -4,6 Q 0,11 4,6" fill="none" stroke="#4B2925" strokeWidth={2} strokeLinecap="round" />
          </g>
        </g>
      );

    // 8.3 复古挂颈小拍立得 (Vintage Instant Camera)
    case 'acc_camera':
      return (
        <g id="outfit-acc_camera" className="outfit-layer">
          {/* Brown Leather Neck Strap across chest */}
          <path
            d="M 152,336 Q 165,360 180,392"
            fill="none"
            stroke="#78350F"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <path
            d="M 240,336 Q 225,360 212,392"
            fill="none"
            stroke="#78350F"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          {/* Camera Body resting on lower chest/belly */}
          <g transform="translate(196, 404)">
            {/* Main box */}
            <rect
              x="-28"
              y="-18"
              width="56"
              height="36"
              rx="6"
              fill="#E0F2FE"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            {/* Upper retro accent stripe */}
            <path d="M -28,-8 L 28,-8" stroke="#38BDF8" strokeWidth={3} />
            {/* Big Center Lens */}
            <circle cx="2" cy="2" r="12" fill="#0284C7" stroke={strokeColor} strokeWidth={2.5} />
            <circle cx="2" cy="2" r="8" fill="#0C4A6E" />
            <circle cx="4" cy="0" r="3" fill="#FFFFFF" opacity="0.8" />
            {/* Flash & Viewfinder */}
            <rect x="-22" y="-14" width="8" height="6" rx="1.5" fill="#FDE047" stroke={strokeColor} strokeWidth={1.5} />
            <circle cx="20" cy="-12" r="3" fill="#EF4444" stroke={strokeColor} strokeWidth={1} />
          </g>
        </g>
      );

    // =========================================================================
    // 9. 情侣套装 (Couple Set) - 1-Click Complete Look adapted for Yi Er & Bubu
    // =========================================================================

    // 9.1 甜蜜梦乡波点睡衣套 (Sweet Dream Pajamas)
    case 'set_pajamas':
      return (
        <g id="outfit-set_pajamas" className="outfit-layer">
          {/* Full body onesie covers arms, torso, and legs */}
          {/* Left Sleeve */}
          <path
            d="M 124,342 C 96,346 64,360 55,392 C 52,404 60,414 74,414 C 92,414 116,396 128,375 Z"
            fill="#FEF08A"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Right Sleeve */}
          <path
            d="M 268,342 C 296,346 328,360 337,392 C 340,404 332,414 318,414 C 300,414 276,396 264,375 Z"
            fill="#FEF08A"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Torso & Pants unit */}
          <path
            d="M 124,340 C 145,348 196,350 268,340 C 285,365 292,400 280,442 C 274,472 258,482 250,482 C 226,482 200,476 186,460 C 172,476 146,482 122,482 C 114,482 98,472 92,442 C 86,400 107,365 124,340 Z"
            fill="#FEF08A"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Cute White Polka Dots */}
          <g fill="#FFFFFF" opacity="0.9">
            <circle cx="140" cy="370" r="5" />
            <circle cx="170" cy="385" r="5" />
            <circle cx="222" cy="375" r="5" />
            <circle cx="250" cy="395" r="5" />
            <circle cx="148" cy="415" r="5" />
            <circle cx="185" cy="430" r="5" />
            <circle cx="225" cy="425" r="5" />
            <circle cx="140" cy="455" r="5" />
            <circle cx="235" cy="460" r="5" />
            {/* Sleeves */}
            <circle cx="85" cy="380" r="4" />
            <circle cx="305" cy="380" r="4" />
          </g>
          {/* Star Buttons Down Center */}
          {[365, 395, 425].map(y => (
            <polygon
              key={y}
              points="0,-4 1,-1 4,-1 2,1 3,4 0,2 -3,4 -2,1 -4,-1 -1,-1"
              fill="#F59E0B"
              stroke={strokeColor}
              strokeWidth={1}
              transform={`translate(196, ${y})`}
            />
          ))}
          {/* Sleepy Nightcap on Head */}
          <path
            d="M 160,70 C 160,40 180,24 212,20 C 235,18 248,35 240,65 Z"
            fill="#FEF08A"
            stroke={strokeColor}
            strokeWidth={2.5}
          />
          <circle cx="244" cy="45" r="6" fill="#FDE047" stroke={strokeColor} strokeWidth={1.5} />
        </g>
      );

    // 9.2 蜜糖午后约会情侣服 (Honey Date Couple Set)
    case 'set_honey_date':
      if (character === 'yier') {
        // Yi Er's Romantic Blush Frill Dress
        return (
          <g id="outfit-set_honey_date_yier" className="outfit-layer">
            {/* Puffy Sleeves */}
            <circle cx="95" cy="372" r="22" fill="#FCE7F3" stroke={strokeColor} strokeWidth={strokeWidth} />
            <circle cx="297" cy="372" r="22" fill="#FCE7F3" stroke={strokeColor} strokeWidth={strokeWidth} />
            {/* Dress Body & Flounce Skirt */}
            <path
              d="M 124,340 C 145,348 196,350 268,340 C 285,370 292,410 304,465 C 304,475 88,475 88,465 C 100,410 107,370 124,340 Z"
              fill="#FBCFE8"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Honey Ribbon Belt */}
            <rect x="114" y="415" width="164" height="12" rx="4" fill="#FB923C" stroke={strokeColor} strokeWidth={2} />
            <circle cx="196" cy="421" r="7" fill="#F97316" stroke={strokeColor} strokeWidth={1.5} />
            {/* White Frill Collar */}
            <path
              d="M 136,336 C 150,350 242,350 256,336"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={6}
              strokeLinecap="round"
            />
          </g>
        );
      } else {
        // Bubu's Dapper Honey Plaid Vest & Bowtie
        return (
          <g id="outfit-set_honey_date_bubu" className="outfit-layer">
            {/* White Inner Shirt Sleeves */}
            <path
              d="M 124,342 C 96,346 64,360 55,392 C 52,404 60,414 74,414 C 92,414 116,396 128,375 Z"
              fill="#FFFFFF"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d="M 268,342 C 296,346 328,360 337,392 C 340,404 332,414 318,414 C 300,414 276,396 264,375 Z"
              fill="#FFFFFF"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            {/* Honey Brown Plaid Vest */}
            <path
              d="M 128,342 C 145,348 247,348 264,342 C 280,370 284,410 278,440 L 236,448 L 196,436 L 156,448 L 114,440 C 108,410 112,370 128,342 Z"
              fill="#D97706"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Plaid check lines */}
            <g stroke="#92400E" strokeWidth={2}>
              <line x1="160" y1="350" x2="160" y2="442" />
              <line x1="232" y1="350" x2="232" y2="442" />
              <line x1="126" y1="380" x2="266" y2="380" />
              <line x1="120" y1="410" x2="272" y2="410" />
            </g>
            {/* Golden Watch Chain across vest */}
            <path d="M 160,410 Q 180,422 196,410" fill="none" stroke="#FDE047" strokeWidth={2.5} />
            {/* Burgundy Velvet Bowtie at Collar */}
            <g transform="translate(196, 342)">
              <polygon points="-12,-6 -12,6 0,0" fill="#BE123C" stroke={strokeColor} strokeWidth={1.5} />
              <polygon points="12,-6 12,6 0,0" fill="#BE123C" stroke={strokeColor} strokeWidth={1.5} />
              <circle cx="0" cy="0" r="4" fill="#9F1239" stroke={strokeColor} strokeWidth={1.5} />
            </g>
          </g>
        );
      }

    default:
      return null;
  }
};

/**
 * Standalone Garment SVG Icon for Store Cards & Wardrobe Item previews
 * Centers and frames the specific garment nicely inside an icon box (viewBox 64x64 or dedicated view).
 */
export const OutfitPreviewIcon: React.FC<{ itemId: string; className?: string }> = ({ itemId, className = 'w-10 h-10' }) => {
  // Map item to a focused viewBox clipping window on the 392x530 canvas
  // Hat: viewBox="120 10 152 110"
  // Top: viewBox="50 325 292 135"
  // Bottom: viewBox="95 385 202 115"
  // Dress: viewBox="75 325 242 165"
  // Coat: viewBox="50 325 292 150"
  // Shoes: viewBox="90 475 212 60"
  // Scarf: viewBox="110 310 172 125"
  // Acc: viewBox="300 310 75 140" or specialized
  // Set: viewBox="60 325 272 170"

  let vb = '0 0 392 530';
  if (itemId.startsWith('hat_')) {
    vb = '130 10 132 100';
  } else if (itemId.startsWith('top_')) {
    vb = '45 325 302 125';
  } else if (itemId.startsWith('bottom_')) {
    vb = '95 385 202 115';
  } else if (itemId.startsWith('dress_')) {
    vb = '70 325 252 165';
  } else if (itemId.startsWith('coat_')) {
    vb = '45 325 302 145';
  } else if (itemId.startsWith('shoes_')) {
    vb = '90 475 212 60';
  } else if (itemId.startsWith('scarf_')) {
    vb = '110 310 172 125';
  } else if (itemId === 'acc_wand') {
    vb = '305 310 70 100';
  } else if (itemId === 'acc_balloon') {
    vb = '300 90 90 120';
  } else if (itemId === 'acc_camera') {
    vb = '145 330 102 100';
  } else if (itemId.startsWith('set_')) {
    vb = '50 320 292 175';
  }

  return (
    <svg
      viewBox={vb}
      className={`${className} object-contain shrink-0`}
      style={{ overflow: 'visible' }}
    >
      <OutfitSVG itemId={itemId} character="yier" facing="front" />
    </svg>
  );
};
