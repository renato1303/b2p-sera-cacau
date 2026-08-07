import React from 'react';
import { SERA_CACAU_LOGO } from '../assets/logo';

interface SeraCacauIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const SeraCacauIcon: React.FC<SeraCacauIconProps> = ({ className = "w-4.5 h-4.5", style }) => {
  return (
    <span 
      className={`inline-block bg-current shrink-0 ${className}`}
      style={{
        maskImage: `url("${SERA_CACAU_LOGO}")`,
        WebkitMaskImage: `url("${SERA_CACAU_LOGO}")`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        ...style
      }}
      aria-hidden="true"
    />
  );
};
