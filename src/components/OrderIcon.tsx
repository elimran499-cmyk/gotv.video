import React from 'react';
import cartUrl from '../assets/brand/order-cart.png';

/** Speeding-cart mark for order buttons. A mask, so it takes the button's text colour. */
export const OrderIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <span
    aria-hidden="true"
    className={`inline-block shrink-0 bg-current ${className}`}
    style={{
      WebkitMask: `url(${cartUrl}) center / contain no-repeat`,
      mask: `url(${cartUrl}) center / contain no-repeat`,
    }}
  />
);
