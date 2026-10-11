import React from 'react';
import markUrl from '../assets/brand/gotv-mark.png';

interface BrandMarkProps {
  /** Size and corner radius of the tile, e.g. "w-9 h-9 rounded-xl". */
  className?: string;
}

/** GOTV logo: the dark glyph on its lime tile. The glyph is a mask, so it stays crisp at any size. */
export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'w-9 h-9 rounded-xl' }) => (
  <span className={`brand-tile relative inline-flex shrink-0 items-center justify-center ${className}`}>
    <span
      className="brand-glyph w-[58%] h-[58%]"
      style={{ '--mark': `url(${markUrl})` } as React.CSSProperties}
    />
  </span>
);
