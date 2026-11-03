import React from 'react';

export function BcaLogo({ width = 72, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="32" rx="4" fill="#00529C" />
      {/* BCA text */}
      <text x="50" y="22" fill="#FFFFFF" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="19" textAnchor="middle" letterSpacing="1">
        BCA
      </text>
    </svg>
  );
}

export function BniLogo({ width = 72, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 4 teal/green slashes */}
      <rect x="6" y="8" width="3.5" height="16" rx="1" fill="#005E5D" transform="skewX(-18)" />
      <rect x="12" y="6" width="3.5" height="20" rx="1" fill="#005E5D" transform="skewX(-18)" />
      <rect x="18" y="4" width="3.5" height="24" rx="1" fill="#005E5D" transform="skewX(-18)" />
      <rect x="24" y="6" width="3.5" height="20" rx="1" fill="#F15A24" transform="skewX(-18)" />
      {/* BNI text in orange */}
      <text x="66" y="23" fill="#F15A24" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="21" textAnchor="middle" letterSpacing="0.5">
        BNI
      </text>
    </svg>
  );
}

export function MandiriLogo({ width = 72, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="32" rx="4" fill="#002D62" />
      {/* Yellow ribbon accent */}
      <path d="M 68 8 Q 80 5 88 12 Q 78 10 68 8 Z" fill="#FDB813" />
      {/* mandiri text */}
      <text x="50" y="21" fill="#FFFFFF" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="15" textAnchor="middle">
        mandiri
      </text>
    </svg>
  );
}

export function GopayLogo({ width = 64, height = 22 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gopay cyan icon */}
      <circle cx="14" cy="14" r="11" fill="#00AED6" />
      <circle cx="14" cy="14" r="5" fill="#FFFFFF" />
      <text x="52" y="20" fill="#00AED6" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="16">
        gopay
      </text>
    </svg>
  );
}

export function DanaLogo({ width = 64, height = 22 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="90" height="28" rx="4" fill="#118EEA" />
      <text x="45" y="19" fill="#FFFFFF" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="15" textAnchor="middle" letterSpacing="0.8">
        DANA
      </text>
    </svg>
  );
}

export function BankLogoBadge({ bankCode, width = 72, height = 24 }) {
  switch (bankCode?.toUpperCase()) {
    case 'BCA':
      return <BcaLogo width={width} height={height} />;
    case 'BNI':
      return <BniLogo width={width} height={height} />;
    case 'MANDIRI':
      return <MandiriLogo width={width} height={height} />;
    default:
      return (
        <div style={{
          width,
          height,
          background: '#03AC0E',
          color: '#FFF',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700
        }}>
          {bankCode}
        </div>
      );
  }
}
