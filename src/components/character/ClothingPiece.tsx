import React from 'react';
import { CharacterId } from '../../types/game';

interface ClothingPieceProps {
  itemId: string;
  character: CharacterId;
  /** If true, renders with a focused bounding box for shop/wardrobe card thumbnails */
  isThumbnail?: boolean;
}

/**
 * 2D Character Clothing Layer Renderer for 《一二布布》
 * Master coordinate system: 392 x 530
 * 
 * Bear anatomical anchor points:
 * - Head: y: 40 ~ 330, x: 16 ~ 376 (center x=196)
 * - Ears: left (x: 60, y: 35), right (x: 335, y: 35)
 * - Neck: y: 330 ~ 350, x: 70 ~ 320
 * - Torso: y: 340 ~ 450, x: 75 ~ 317
 * - Left Arm: x: 52 ~ 95, y: 350 ~ 420
 * - Right Arm: x: 297 ~ 340, y: 350 ~ 420
 * - Legs & Feet: left (x: 85 ~ 160, y: 450 ~ 522), right (x: 232 ~ 307, y: 450 ~ 522)
 */
export const ClothingPiece: React.FC<ClothingPieceProps> = ({
  itemId,
  character,
  isThumbnail = false
}) => {
  const isYier = character === 'yier';

  switch (itemId) {
    // =========================================================================
    // 1. 帽子 (hat)
    // =========================================================================
    case 'hat_daisy':
      // 向阳小雏菊发卡: clipped near the bear's right ear (x: 295, y: 70)
      return (
        <g id="hat_daisy" className="transition-all duration-300">
          {/* Stem & tiny leaf */}
          <path
            d="M 285 88 Q 280 98 274 105"
            stroke="#15803D"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 278 98 Q 268 95 264 100 Q 272 104 278 98 Z"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="1.5"
          />
          {/* Daisy Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="295"
              cy="72"
              rx="9"
              ry="21"
              fill="#FFFFFF"
              stroke="#D1D5DB"
              strokeWidth="2"
              transform={`rotate(${angle} 295 72)`}
            />
          ))}
          {/* Inner Golden Center */}
          <circle cx="295" cy="72" r="13" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="293" cy="70" r="10" fill="#FDE047" />
          <circle cx="291" cy="67" r="3" fill="#FFFFFF" opacity="0.8" />
        </g>
      );

    case 'hat_beret':
      // 草莓波波画家帽: sweet strawberry-red beret resting snugly between the ears (y: 28 ~ 95)
      return (
        <g id="hat_beret" className="transition-all duration-300">
          {/* Beret Main Cap */}
          <path
            d="M 125 78 C 110 50 160 22 215 24 C 270 26 295 52 280 82 C 265 96 145 95 125 78 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Lower Headband */}
          <path
            d="M 142 82 Q 200 96 265 85"
            stroke="#991B1B"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Strawberry Top Calyx (3-leaf green cap) */}
          <path
            d="M 198 25 Q 185 10 180 18 Q 192 23 198 25 Z"
            fill="#22C55E"
            stroke="#166534"
            strokeWidth="1.5"
          />
          <path
            d="M 206 25 Q 218 8 224 16 Q 212 23 206 25 Z"
            fill="#22C55E"
            stroke="#166534"
            strokeWidth="1.5"
          />
          <path
            d="M 202 24 Q 202 2 206 2 Q 208 12 202 24 Z"
            fill="#16A34A"
            stroke="#166534"
            strokeWidth="1.5"
          />
          {/* Strawberry seeds */}
          <circle cx="160" cy="58" r="2" fill="#FEE2E2" />
          <circle cx="190" cy="52" r="2" fill="#FEE2E2" />
          <circle cx="220" cy="50" r="2" fill="#FEE2E2" />
          <circle cx="250" cy="62" r="2" fill="#FEE2E2" />
          <circle cx="175" cy="72" r="2" fill="#FEE2E2" />
          <circle cx="210" cy="70" r="2" fill="#FEE2E2" />
          <circle cx="238" cy="74" r="2" fill="#FEE2E2" />
        </g>
      );

    case 'hat_party':
      // 欢庆生日派对尖顶帽: striped party cone with pompom
      return (
        <g id="hat_party" className="transition-all duration-300">
          <defs>
            <clipPath id="partyConeClip">
              <polygon points="196,15 150,92 242,92" />
            </clipPath>
          </defs>
          <g clipPath="url(#partyConeClip)">
            <polygon points="196,15 150,92 242,92" fill="#F472B6" />
            <polygon points="196,15 130,92 165,92" fill="#FBBF24" />
            <polygon points="196,15 180,92 215,92" fill="#60A5FA" />
            <polygon points="196,15 230,92 265,92" fill="#34D399" />
          </g>
          {/* Cone Outline */}
          <polygon
            points="196,15 150,92 242,92"
            fill="none"
            stroke="#4B2925"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Bottom Ruffle Border */}
          <path
            d="M 148 92 Q 196 100 244 92"
            stroke="#FDE047"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Fluffy Top Pompom */}
          <circle cx="196" cy="14" r="11" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="194" cy="11" r="5" fill="#FFFFFF" opacity="0.9" />
        </g>
      );

    case 'hat_knit':
      // 焦糖毛球暖冬针织帽: cozy caramel knit beanie with white pompom
      return (
        <g id="hat_knit" className="transition-all duration-300">
          {/* Beanie Main Dome */}
          <path
            d="M 125 82 C 115 40 160 16 196 16 C 232 16 277 40 267 82 Z"
            fill="#D97706"
            stroke="#78350F"
            strokeWidth="4"
          />
          {/* Ribbed Knit Lines */}
          <path d="M 160 30 Q 155 58 152 82" stroke="#B45309" strokeWidth="2.5" fill="none" />
          <path d="M 180 20 Q 178 54 176 82" stroke="#B45309" strokeWidth="2.5" fill="none" />
          <path d="M 196 18 Q 196 54 196 82" stroke="#B45309" strokeWidth="2.5" fill="none" />
          <path d="M 212 20 Q 214 54 216 82" stroke="#B45309" strokeWidth="2.5" fill="none" />
          <path d="M 232 30 Q 237 58 240 82" stroke="#B45309" strokeWidth="2.5" fill="none" />
          {/* Folded Brim */}
          <rect
            x="118"
            y="76"
            width="156"
            height="18"
            rx="9"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="3.5"
          />
          {/* Big Fluffy Wool Pompom */}
          <circle cx="196" cy="10" r="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="192" cy="6" r="6" fill="#FFFFFF" />
        </g>
      );

    // =========================================================================
    // 2. 上衣 (top)
    // =========================================================================
    case 'top_bear_sweater':
      // 【KEY TEST ITEM】暖阳小熊软萌毛衣:
      // Mustard-amber knit sweater with ribbed collar, sleeves covering both arms,
      // body covering torso, ribbed cuffs & hem, and an embroidered bear face / heart patch on chest!
      return (
        <g id="top_bear_sweater" className="transition-all duration-300">
          {/* Left Sleeve (covering left arm) */}
          <path
            d="M 112 338 C 76 348 48 372 44 406 C 42 418 54 426 74 424 C 94 420 114 396 122 368 Z"
            fill="#FBBF24"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M 44 406 C 56 422 74 424 82 416"
            stroke="#D97706"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Sleeve (covering right arm) */}
          <path
            d="M 280 338 C 316 348 344 372 348 406 C 350 418 338 426 318 424 C 298 420 278 396 270 368 Z"
            fill="#FBBF24"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M 348 406 C 336 422 318 424 310 416"
            stroke="#D97706"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Torso Main Body (covering x: 94..298, y: 340..452) */}
          <path
            d="M 114 340 C 142 350 250 350 278 340 C 296 385 298 422 292 446 C 280 452 112 452 100 446 C 94 422 96 385 114 340 Z"
            fill="#FBBF24"
            stroke="#78350F"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Bottom Hem Band with Ribbing */}
          <path
            d="M 100 446 C 145 454 247 454 292 446"
            stroke="#D97706"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cable Knit V-stitch texture accents */}
          <path d="M 152 372 Q 155 382 152 392 Q 149 402 152 412 Q 155 422 152 432" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 240 372 Q 237 382 240 392 Q 243 402 240 412 Q 237 422 240 432" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Center Chest Patch: Embroidered Bear Heart Patch */}
          <g transform="translate(196, 396)">
            {/* Patch Backing */}
            <circle cx="0" cy="0" r="20" fill="#FFFBEB" stroke="#78350F" strokeWidth="2" strokeDasharray="3 2" />
            {/* Cute Little Brown Bear Face inside Patch */}
            <circle cx="-11" cy="-10" r="4.5" fill="#78350F" />
            <circle cx="11" cy="-10" r="4.5" fill="#78350F" />
            <ellipse cx="0" cy="-1" rx="12" ry="10" fill="#92400E" />
            <ellipse cx="0" cy="2" rx="5.5" ry="4" fill="#FDE68A" />
            <circle cx="-4" cy="-2" r="1.5" fill="#451A03" />
            <circle cx="4" cy="-2" r="1.5" fill="#451A03" />
            <path d="M -1.5 1 Q 0 2.2 1.5 1" stroke="#451A03" strokeWidth="1" fill="none" />
          </g>

          {/* Ribbed Crewneck Collar (Curved ribbed band framing neck cleanly) */}
          <path
            d="M 126 338 C 150 358 242 358 266 338"
            fill="none"
            stroke="#D97706"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 126 338 C 150 358 242 358 266 338"
            fill="none"
            stroke="#78350F"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );

    case 'top_striped':
      // 经典蓝白条纹海魂衫: Sailor striped tee with navy neckline
      return (
        <g id="top_striped" className="transition-all duration-300">
          <defs>
            <clipPath id="stripedTorsoClip">
              <path d="M 108 355 C 102 388 94 420 98 448 C 145 456 247 456 294 448 C 298 420 290 388 284 355 C 255 365 137 365 108 355 Z" />
            </clipPath>
            <clipPath id="stripedLeftArmClip">
              <path d="M 96 352 Q 62 368 55 412 Q 74 424 95 414 Q 106 385 108 358 Z" />
            </clipPath>
            <clipPath id="stripedRightArmClip">
              <path d="M 296 352 Q 330 368 337 412 Q 318 424 297 414 Q 286 385 284 358 Z" />
            </clipPath>
          </defs>

          {/* Left Sleeve */}
          <g clipPath="url(#stripedLeftArmClip)">
            <rect x="50" y="340" width="60" height="90" fill="#FFFFFF" />
            {[360, 376, 392, 408].map(y => (
              <rect key={y} x="45" y={y} width="70" height="8" fill="#2563EB" />
            ))}
          </g>
          <path
            d="M 96 352 Q 62 368 55 412 Q 74 424 95 414 Q 106 385 108 358 Z"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />

          {/* Right Sleeve */}
          <g clipPath="url(#stripedRightArmClip)">
            <rect x="280" y="340" width="60" height="90" fill="#FFFFFF" />
            {[360, 376, 392, 408].map(y => (
              <rect key={y} x="280" y={y} width="70" height="8" fill="#2563EB" />
            ))}
          </g>
          <path
            d="M 296 352 Q 330 368 337 412 Q 318 424 297 414 Q 286 385 284 358 Z"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />

          {/* Torso Striped Fill */}
          <g clipPath="url(#stripedTorsoClip)">
            <rect x="90" y="340" width="220" height="120" fill="#FFFFFF" />
            {[360, 376, 392, 408, 424, 440].map(y => (
              <rect key={y} x="85" y={y} width="230" height="8" fill="#2563EB" />
            ))}
          </g>
          <path
            d="M 108 355 C 102 388 94 420 98 448 C 145 456 247 456 294 448 C 298 420 290 388 284 355 C 255 365 137 365 108 355 Z"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="4"
          />

          {/* Clean Crewneck Ribbed Collar */}
          <path d="M 128 340 C 150 358 242 358 264 340" fill="none" stroke="#1E3A8A" strokeWidth="8" strokeLinecap="round" />
          <path d="M 128 340 C 150 358 242 358 264 340" fill="none" stroke="#172554" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );

    case 'top_cherry_tshirt':
      // 甜心樱桃纯白短袖: Pure white t-shirt with sweet twin cherries
      return (
        <g id="top_cherry_tshirt" className="transition-all duration-300">
          {/* Sleeves */}
          <path
            d="M 96 352 Q 62 368 55 412 Q 74 424 95 414 Q 106 385 108 358 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="4"
          />
          <path
            d="M 296 352 Q 330 368 337 412 Q 318 424 297 414 Q 286 385 284 358 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="4"
          />
          {/* Torso */}
          <path
            d="M 108 355 C 102 388 94 420 98 448 C 145 456 247 456 294 448 C 298 420 290 388 284 355 C 255 365 137 365 108 355 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="4"
          />
          {/* Crew Neck */}
          <path d="M 130 340 C 152 358 240 358 262 340" fill="none" stroke="#F1F5F9" strokeWidth="8" strokeLinecap="round" />
          <path d="M 130 340 C 152 358 240 358 262 340" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Twin Cherries Print in center */}
          <g transform="translate(196, 400)">
            {/* Stems */}
            <path d="M 0 -12 Q -6 -2 0 10" stroke="#15803D" strokeWidth="2.5" fill="none" />
            <path d="M 0 -12 Q 10 -4 14 10" stroke="#15803D" strokeWidth="2.5" fill="none" />
            {/* Green Leaf */}
            <path d="M 0 -12 Q -12 -18 -8 -22 Q -2 -18 0 -12 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            {/* Left Cherry */}
            <circle cx="0" cy="11" r="9.5" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
            <circle cx="-3" cy="8" r="2.5" fill="#FFFFFF" opacity="0.8" />
            {/* Right Cherry */}
            <circle cx="15" cy="11" r="9.5" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
            <circle cx="12" cy="8" r="2.5" fill="#FFFFFF" opacity="0.8" />
          </g>
        </g>
      );

    // =========================================================================
    // 3. 裤子 (bottom)
    // =========================================================================
    case 'bottom_overalls':
      // 经典工装牛仔背带裤: Denim overalls with brass buckles, bib, and shorts covering legs
      return (
        <g id="bottom_overalls" className="transition-all duration-300">
          {/* Left Strap going up over left shoulder */}
          <path d="M 125 352 L 132 405" stroke="#1D4ED8" strokeWidth="11" strokeLinecap="round" />
          <path d="M 125 352 L 132 405" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />
          {/* Right Strap going up over right shoulder */}
          <path d="M 267 352 L 260 405" stroke="#1D4ED8" strokeWidth="11" strokeLinecap="round" />
          <path d="M 267 352 L 260 405" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />

          {/* Brass Buttons */}
          <circle cx="132" cy="405" r="5" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
          <circle cx="260" cy="405" r="5" fill="#FACC15" stroke="#A16207" strokeWidth="2" />

          {/* Chest Bib (y: 395..440, x: 124..268) */}
          <rect
            x="126"
            y="398"
            width="140"
            height="40"
            rx="6"
            fill="#2563EB"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />
          {/* Bib Pocket */}
          <rect
            x="166"
            y="408"
            width="60"
            height="24"
            rx="5"
            fill="#1D4ED8"
            stroke="#FDE047"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />

          {/* Lower Shorts Body Covering Tummy and Legs (y: 432..492) */}
          <path
            d="M 92 438 C 92 470 82 488 95 492 C 110 494 158 494 165 480 C 172 465 220 465 227 480 C 234 494 282 494 297 492 C 310 488 300 470 300 438 Z"
            fill="#2563EB"
            stroke="#1E3A8A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Leg Cuffs Fold */}
          <path d="M 94 492 Q 130 496 164 485" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 228 485 Q 262 496 298 492" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      );

    case 'bottom_khaki':
      // 奶茶色休闲小短裤: Khaki shorts with elastic waist and side pockets
      return (
        <g id="bottom_khaki" className="transition-all duration-300">
          <path
            d="M 94 430 C 94 466 84 488 96 492 C 110 494 158 494 165 480 C 172 465 220 465 227 480 C 234 494 282 494 296 492 C 308 488 298 466 298 430 Z"
            fill="#D97706"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Waistband */}
          <path d="M 94 430 Q 196 440 298 430" stroke="#B45309" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Left Pocket */}
          <path d="M 112 444 L 142 444 L 138 468 L 115 466 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          {/* Right Pocket */}
          <path d="M 250 444 L 280 444 L 277 466 L 254 468 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        </g>
      );

    // =========================================================================
    // 4. 连衣裙 (dress)
    // =========================================================================
    case 'dress_sailor':
      // 元气蓝白水手海军裙: Deep navy sailor dress with big sailor collar, red ribbon, pleated flared skirt
      return (
        <g id="dress_sailor" className="transition-all duration-300">
          {/* Sleeves */}
          <path
            d="M 96 352 Q 62 368 55 412 Q 74 424 95 414 Q 106 385 108 358 Z"
            fill="#FFFFFF"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />
          <path
            d="M 296 352 Q 330 368 337 412 Q 318 424 297 414 Q 286 385 284 358 Z"
            fill="#FFFFFF"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />

          {/* White Bodice */}
          <path
            d="M 108 355 C 102 388 100 415 105 425 C 145 428 247 428 287 425 C 292 415 290 388 284 355 Z"
            fill="#FFFFFF"
            stroke="#1E3A8A"
            strokeWidth="3.5"
          />

          {/* Pleated Navy Skirt Flaring Out (y: 422..485, x: 74..318) */}
          <path
            d="M 105 425 C 80 455 70 480 75 486 C 115 494 277 494 317 486 C 322 480 312 455 287 425 Z"
            fill="#1E3A8A"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Skirt White Border Stripes */}
          <path d="M 82 480 Q 196 492 310 480" stroke="#FFFFFF" strokeWidth="4" fill="none" />
          <path d="M 86 473 Q 196 485 306 473" stroke="#FFFFFF" strokeWidth="2" fill="none" />

          {/* Big Sailor Flap Collar across shoulders (y: 338..375) */}
          <path
            d="M 118 348 C 100 375 125 385 155 378 L 196 360 L 237 378 C 267 385 292 375 274 348 Z"
            fill="#1E3A8A"
            stroke="#0F172A"
            strokeWidth="3.5"
          />
          <path
            d="M 125 352 Q 135 372 155 372 L 196 356 L 237 372 Q 257 372 267 352"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Red Neckerchief Knot */}
          <polygon points="196,362 188,382 196,392 204,382" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          <path d="M 188 382 L 180 405 L 194 402 Z" fill="#DC2626" />
          <path d="M 204 382 L 212 405 L 198 402 Z" fill="#DC2626" />
        </g>
      );

    case 'dress_princess':
      // 草莓泡泡袖洛丽塔裙: Strawberry pink Lolita dress with puffed sleeves, ruffles and lace
      return (
        <g id="dress_princess" className="transition-all duration-300">
          {/* Puffy Gathered Sleeves */}
          <circle cx="78" cy="380" r="26" fill="#F472B6" stroke="#BE185D" strokeWidth="3" />
          <circle cx="78" cy="380" r="21" fill="#FBCFE8" />
          <circle cx="314" cy="380" r="26" fill="#F472B6" stroke="#BE185D" strokeWidth="3" />
          <circle cx="314" cy="380" r="21" fill="#FBCFE8" />

          {/* Bodice */}
          <path
            d="M 108 355 C 104 388 108 410 115 420 C 145 424 247 424 277 420 C 284 410 288 388 284 355 Z"
            fill="#F472B6"
            stroke="#BE185D"
            strokeWidth="3.5"
          />
          {/* White Lace Front Panel */}
          <polygon points="170,358 222,358 214,420 178,420" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2" />
          <line x1="176" y1="375" x2="216" y2="375" stroke="#E11D48" strokeWidth="2" />
          <line x1="177" y1="392" x2="215" y2="392" stroke="#E11D48" strokeWidth="2" />

          {/* Flared Tiered Ruffle Skirt (y: 416..495) */}
          <path
            d="M 115 420 C 75 450 62 485 70 494 C 115 504 277 504 322 494 C 330 485 317 450 277 420 Z"
            fill="#F472B6"
            stroke="#BE185D"
            strokeWidth="4"
          />
          {/* Scalloped White Lace Hemline */}
          <path
            d="M 72 494 Q 90 502 110 495 Q 130 503 150 496 Q 170 504 196 498 Q 222 504 242 496 Q 262 503 282 495 Q 302 502 320 494"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cute Strawberry Bow at Neck */}
          <circle cx="196" cy="358" r="5" fill="#E11D48" />
          <ellipse cx="184" cy="358" rx="8" ry="5" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1.5" />
          <ellipse cx="208" cy="358" rx="8" ry="5" fill="#FDA4AF" stroke="#E11D48" strokeWidth="1.5" />
        </g>
      );

    // =========================================================================
    // 5. 外套 (coat)
    // =========================================================================
    case 'coat_duffle':
      // 牛角扣学院风大衣: Rich camel coat with wood toggle buttons & structured collar
      return (
        <g id="coat_duffle" className="transition-all duration-300">
          {/* Left Sleeve */}
          <path
            d="M 96 350 Q 56 366 50 416 Q 74 426 95 418 Q 106 385 108 358 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="4"
          />
          {/* Right Sleeve */}
          <path
            d="M 296 350 Q 336 366 342 416 Q 318 426 297 418 Q 286 385 284 358 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="4"
          />
          {/* Coat Body */}
          <path
            d="M 108 355 C 98 400 88 450 94 485 C 145 492 247 492 298 485 C 304 450 294 400 284 355 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="4.5"
          />
          {/* Lapel / Placket divider */}
          <line x1="196" y1="365" x2="196" y2="485" stroke="#78350F" strokeWidth="3" />

          {/* 3 Wooden Toggle Buttons */}
          {[385, 415, 445].map(y => (
            <g key={y}>
              {/* Rope loop */}
              <path d={`M 180 ${y} Q 196 ${y-4} 212 ${y}`} stroke="#FEF3C7" strokeWidth="3" fill="none" />
              {/* Horn Toggle */}
              <ellipse cx="196" cy={y} rx="10" ry="3.5" fill="#451A03" stroke="#78350F" strokeWidth="1.5" />
            </g>
          ))}

          {/* Pockets */}
          <rect x="110" y="440" width="34" height="26" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="2" />
          <rect x="248" y="440" width="34" height="26" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="2" />

          {/* Coat Collar */}
          <polygon points="150,345 196,366 170,378 126,356" fill="#78350F" />
          <polygon points="242,345 196,366 222,378 266,356" fill="#78350F" />
        </g>
      );

    case 'coat_fleece':
      // 毛茸茸小羊羔绒马甲: Cloud-like sherpa fleece vest
      return (
        <g id="coat_fleece" className="transition-all duration-300">
          <path
            d="M 115 352 Q 100 395 106 448 Q 150 456 242 456 Q 288 448 277 352 Q 245 362 196 362 Q 147 362 115 352 Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="4"
          />
          {/* Cloud fluffy scalloped border */}
          <path
            d="M 106 448 Q 120 458 135 450 Q 150 460 165 452 Q 180 462 196 454 Q 212 462 227 452 Q 242 460 257 450 Q 272 458 277 448"
            stroke="#CBD5E1"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Golden Center Zipper */}
          <line x1="196" y1="364" x2="196" y2="452" stroke="#F59E0B" strokeWidth="3" strokeDasharray="3 2" />
          <circle cx="196" cy="370" r="4" fill="#D97706" />
        </g>
      );

    // =========================================================================
    // 6. 鞋子 (shoes)
    // =========================================================================
    case 'shoes_boots':
      // 暖黄色小雨靴: Bright yellow rubber boots on left paw (x: 88..155) & right paw (x: 237..304)
      return (
        <g id="shoes_boots" className="transition-all duration-300">
          {/* Left Boot */}
          <g>
            <path
              d="M 94 480 L 102 462 Q 138 460 148 464 L 152 485 Q 165 500 155 518 Q 135 524 95 522 Q 85 505 94 480 Z"
              fill="#FACC15"
              stroke="#A16207"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Dark Tread Sole */}
            <path d="M 88 518 Q 125 526 158 518" stroke="#713F12" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Boot Collar Trim */}
            <path d="M 102 462 Q 125 466 148 464" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Glossy highlight */}
            <path d="M 102 485 Q 98 505 108 512" stroke="#FEF9C3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Right Boot */}
          <g>
            <path
              d="M 298 480 L 290 462 Q 254 460 244 464 L 240 485 Q 227 500 237 518 Q 257 524 297 522 Q 307 505 298 480 Z"
              fill="#FACC15"
              stroke="#A16207"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Dark Tread Sole */}
            <path d="M 234 518 Q 267 526 304 518" stroke="#713F12" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Boot Collar Trim */}
            <path d="M 244 464 Q 267 466 290 462" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Glossy highlight */}
            <path d="M 290 485 Q 294 505 284 512" stroke="#FEF9C3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </g>
      );

    case 'shoes_sneakers':
      // 经典红白帆布板鞋: Classic red canvas sneakers with white toe cap & laces
      return (
        <g id="shoes_sneakers" className="transition-all duration-300">
          {/* Left Sneaker */}
          <g>
            <path
              d="M 96 480 L 108 472 L 146 474 L 152 492 Q 162 505 155 518 Q 135 522 96 520 Q 86 505 96 480 Z"
              fill="#EF4444"
              stroke="#991B1B"
              strokeWidth="3"
            />
            {/* White Rubber Toe Cap */}
            <path d="M 125 500 Q 155 502 155 518 Q 135 522 125 520 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            {/* White Foxing Sole */}
            <path d="M 90 518 Q 125 524 156 518" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Laces */}
            <line x1="112" y1="486" x2="132" y2="486" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="116" y1="494" x2="134" y2="494" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right Sneaker */}
          <g>
            <path
              d="M 296 480 L 284 472 L 246 474 L 240 492 Q 230 505 237 518 Q 257 522 296 520 Q 306 505 296 480 Z"
              fill="#EF4444"
              stroke="#991B1B"
              strokeWidth="3"
            />
            {/* White Rubber Toe Cap */}
            <path d="M 267 500 Q 237 502 237 518 Q 257 522 267 520 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            {/* White Foxing Sole */}
            <path d="M 236 518 Q 267 524 302 518" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Laces */}
            <line x1="260" y1="486" x2="280" y2="486" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="258" y1="494" x2="276" y2="494" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      );

    // =========================================================================
    // 7. 围巾 (scarf)
    // =========================================================================
    case 'scarf_red':
      // 温暖粗棒针圣诞红围巾: Chunky red knit scarf wrapped around neck with fringed tail
      return (
        <g id="scarf_red" className="transition-all duration-300">
          {/* Main Neck Wrap (y: 332..368, x: 74..318) */}
          <ellipse
            cx="196"
            cy="350"
            rx="86"
            ry="20"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="4"
          />
          {/* Front Fold Loop */}
          <path
            d="M 125 352 Q 196 370 267 352"
            stroke="#B91C1C"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Hanging Scarf Tail (hanging down right side y: 350..440) */}
          <g>
            <path
              d="M 215 355 L 245 435 L 210 438 L 195 365 Z"
              fill="#DC2626"
              stroke="#991B1B"
              strokeWidth="3.5"
            />
            {/* Fringe Tassels */}
            {[212, 220, 228, 236, 244].map(x => (
              <line key={x} x1={x} y1="436" x2={x-2} y2="448" stroke="#FEF2F2" strokeWidth="2.5" strokeLinecap="round" />
            ))}
          </g>
        </g>
      );

    case 'scarf_plaid':
      // 苏格兰黄绿格子围脖: Tartan plaid cowl neck gaiter
      return (
        <g id="scarf_plaid" className="transition-all duration-300">
          <defs>
            <clipPath id="plaidScarfClip">
              <ellipse cx="196" cy="350" rx="84" ry="20" />
            </clipPath>
          </defs>
          <g clipPath="url(#plaidScarfClip)">
            <rect x="100" y="325" width="200" height="50" fill="#15803D" />
            {/* Yellow Lines */}
            <line x1="100" y1="340" x2="300" y2="340" stroke="#FDE047" strokeWidth="4" />
            <line x1="100" y1="358" x2="300" y2="358" stroke="#FDE047" strokeWidth="4" />
            <line x1="160" y1="320" x2="160" y2="380" stroke="#FDE047" strokeWidth="4" />
            <line x1="232" y1="320" x2="232" y2="380" stroke="#FDE047" strokeWidth="4" />
            {/* Black Lines */}
            <line x1="100" y1="349" x2="300" y2="349" stroke="#0F172A" strokeWidth="2" />
            <line x1="196" y1="320" x2="196" y2="380" stroke="#0F172A" strokeWidth="2" />
          </g>
          <ellipse
            cx="196"
            cy="350"
            rx="84"
            ry="20"
            fill="none"
            stroke="#14532D"
            strokeWidth="4"
          />
        </g>
      );

    // =========================================================================
    // 8. 配饰 (accessory)
    // =========================================================================
    case 'acc_wand':
      // 心动爱心魔法手杖: Held at right paw with sparkling star-heart topper
      return (
        <g id="acc_wand" className="transition-all duration-300">
          {/* Wand Shaft */}
          <line x1="316" y1="418" x2="350" y2="320" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
          <line x1="316" y1="418" x2="350" y2="320" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          {/* Heart Topper */}
          <path
            d="M 350 320 C 340 305 325 315 338 332 L 350 342 L 362 332 C 375 315 360 305 350 320 Z"
            fill="#F472B6"
            stroke="#BE185D"
            strokeWidth="3"
          />
          {/* Magic Sparkle Stars */}
          <path d="M 366 308 L 368 314 L 374 316 L 368 318 L 366 324 L 364 318 L 358 316 L 364 314 Z" fill="#FACC15" />
          <path d="M 330 300 L 332 304 L 336 306 L 332 308 L 330 312 L 328 308 L 324 306 L 328 304 Z" fill="#60A5FA" />
        </g>
      );

    case 'acc_balloon':
      // 微笑星星漂浮气球: Floating golden star balloon with curly string to hand
      return (
        <g id="acc_balloon" className="transition-all duration-300">
          {/* Balloon String */}
          <path
            d="M 345 158 Q 355 240 338 310 Q 328 360 330 405"
            stroke="#A855F7"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            fill="none"
          />
          {/* Star Balloon Shape */}
          <g transform="translate(345, 110)">
            <polygon
              points="0,-48 14,-15 48,-15 20,6 30,40 0,20 -30,40 -20,6 -48,-15 -14,-15"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Cute Smile Face on Balloon */}
            <circle cx="-10" cy="-2" r="3" fill="#78350F" />
            <circle cx="10" cy="-2" r="3" fill="#78350F" />
            <path d="M -5 8 Q 0 14 5 8" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Rosy cheeks on balloon */}
            <circle cx="-16" cy="6" r="3.5" fill="#F87171" opacity="0.7" />
            <circle cx="16" cy="6" r="3.5" fill="#F87171" opacity="0.7" />
          </g>
        </g>
      );

    case 'acc_camera':
      // 复古挂颈小拍立得: Vintage mint-teal instant camera with neck strap
      return (
        <g id="acc_camera" className="transition-all duration-300">
          {/* Leather Neck Strap */}
          <path
            d="M 148 352 Q 196 392 244 352"
            stroke="#78350F"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Camera Body (resting on belly x: 165..227, y: 395..445) */}
          <g transform="translate(196, 420)">
            <rect x="-32" y="-22" width="64" height="44" rx="8" fill="#14B8A6" stroke="#0F766E" strokeWidth="3" />
            <rect x="-32" y="-22" width="64" height="12" rx="4" fill="#0D9488" />
            {/* Viewfinder & Flash */}
            <rect x="14" y="-18" width="10" height="6" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
            {/* Large Lens */}
            <circle cx="-6" cy="2" r="14" fill="#334155" stroke="#1E293B" strokeWidth="3" />
            <circle cx="-6" cy="2" r="8" fill="#0284C7" />
            <circle cx="-9" cy="-1" r="3" fill="#FFFFFF" opacity="0.9" />
            {/* Red Shutter Button */}
            <rect x="-24" y="-27" width="10" height="5" rx="2" fill="#EF4444" />
          </g>
        </g>
      );

    // =========================================================================
    // 9. 情侣套装 (couple_set)
    // =========================================================================
    case 'set_pajamas':
      // 甜蜜梦乡波点睡衣套: Pastel yellow one-piece pajama set with star buttons and white dots
      return (
        <g id="set_pajamas" className="transition-all duration-300">
          {/* Sleeves */}
          <path
            d="M 96 352 Q 62 368 55 412 Q 74 424 95 414 Q 106 385 108 358 Z"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="4"
          />
          <path
            d="M 296 352 Q 330 368 337 412 Q 318 424 297 414 Q 286 385 284 358 Z"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="4"
          />
          {/* Pajama One-piece Body (covering torso down to legs) */}
          <path
            d="M 108 355 C 102 388 88 440 92 485 C 108 490 155 490 162 478 C 172 460 220 460 230 478 C 237 490 284 490 300 485 C 304 440 290 388 284 355 Z"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* White Polka Dots */}
          {[
            [130, 385], [165, 380], [225, 380], [260, 385],
            [120, 420], [150, 425], [240, 425], [270, 420],
            [125, 460], [265, 460]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="#FFFFFF" opacity="0.9" />
          ))}

          {/* Center Placket with Star Buttons */}
          <line x1="196" y1="365" x2="196" y2="455" stroke="#EAB308" strokeWidth="2.5" />
          {[385, 415, 442].map(y => (
            <g key={y} transform={`translate(196, ${y})`}>
              <polygon points="0,-4 1.2,-1.2 4,-1.2 1.8,0.5 2.6,3.5 0,1.8 -2.6,3.5 -1.8,0.5 -4,-1.2 -1.2,-1.2" fill="#F59E0B" />
            </g>
          ))}

          {/* Pajama Collar */}
          <path d="M 130 340 C 152 358 240 358 262 340" fill="none" stroke="#FDE047" strokeWidth="8" strokeLinecap="round" />
          <path d="M 130 340 C 152 358 240 358 262 340" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );

    case 'set_honey_date':
      // 蜜糖午后约会情侣服:
      // If Yi Er (white bear): Charming peach-pink dress with white ruffled collar and heart belt.
      // If Bubu (brown bear): Classy caramel plaid vest with crisp white collar and bow tie!
      if (isYier) {
        return (
          <g id="set_honey_date_yier" className="transition-all duration-300">
            {/* Sleeves */}
            <path
              d="M 96 352 Q 62 368 55 412 Q 74 424 95 414 Q 106 385 108 358 Z"
              fill="#FBCFE8"
              stroke="#DB2777"
              strokeWidth="3.5"
            />
            <path
              d="M 296 352 Q 330 368 337 412 Q 318 424 297 414 Q 286 385 284 358 Z"
              fill="#FBCFE8"
              stroke="#DB2777"
              strokeWidth="3.5"
            />
            {/* Dress Body with gentle flare */}
            <path
              d="M 108 355 C 98 400 84 455 88 488 C 135 498 257 498 304 488 C 308 455 294 400 284 355 Z"
              fill="#F472B6"
              stroke="#BE185D"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Ruffled hem */}
            <path
              d="M 88 488 Q 142 498 196 490 Q 250 498 304 488"
              stroke="#FFFFFF"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            {/* Waist Sash with Heart Buckle */}
            <path d="M 100 425 Q 196 432 292 425" stroke="#BE185D" strokeWidth="5" fill="none" />
            <polygon points="196,424 191,419 186,424 196,434 206,424 201,419" fill="#FDE047" stroke="#A16207" strokeWidth="1.5" />
            {/* Lace Collar */}
            <ellipse cx="196" cy="354" rx="60" ry="12" fill="#FFFFFF" stroke="#DB2777" strokeWidth="3" />
          </g>
        );
      } else {
        // Bubu's Gentleman Plaid Vest & Bowtie
        return (
          <g id="set_honey_date_bubu" className="transition-all duration-300">
            {/* Crisp White Shirt Sleeves */}
            <path
              d="M 96 352 Q 62 368 55 412 Q 74 424 95 414 Q 106 385 108 358 Z"
              fill="#FFFFFF"
              stroke="#4B2925"
              strokeWidth="3.5"
            />
            <path
              d="M 296 352 Q 330 368 337 412 Q 318 424 297 414 Q 286 385 284 358 Z"
              fill="#FFFFFF"
              stroke="#4B2925"
              strokeWidth="3.5"
            />
            {/* Caramel British Vest Body */}
            <path
              d="M 108 355 C 102 388 94 420 98 450 C 145 456 196 465 196 465 C 196 465 247 456 294 450 C 298 420 290 388 284 355 Z"
              fill="#B45309"
              stroke="#78350F"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* White Shirt V-opening */}
            <polygon points="172,356 220,356 196,410" fill="#FFFFFF" stroke="#78350F" strokeWidth="2" />
            {/* Golden Vest Buttons */}
            <circle cx="196" cy="422" r="3.5" fill="#FACC15" stroke="#78350F" strokeWidth="1.5" />
            <circle cx="196" cy="438" r="3.5" fill="#FACC15" stroke="#78350F" strokeWidth="1.5" />
            {/* Red Bow Tie */}
            <polygon points="196,364 184,357 184,371" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <polygon points="196,364 208,357 208,371" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <circle cx="196" cy="364" r="3.5" fill="#B91C1C" />
          </g>
        );
      }

    default:
      return null;
  }
};
