'use client';

import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CVDocument from './CVDocument';

const FILE_NAME = 'antonio-gonzalez-valdepenas-ios-engineer.pdf';

export default function CVDownloadLink() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <PDFDownloadLink
      document={<CVDocument />}
      fileName={FILE_NAME}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '0.5rem',
        padding:        '11px 22px',
        borderRadius:    9999,
        background:      hovered ? '#4F4FFF' : '#23335C',
        color:           '#FAFBFD',
        fontFamily:     'Nohemi, sans-serif',
        fontSize:       '0.84rem',
        fontWeight:     600,
        letterSpacing:  '-0.01em',
        textDecoration: 'none',
        boxShadow:       hovered
          ? '0 18px 40px -14px rgba(79,79,255,0.50), 0 4px 14px -4px rgba(35,51,92,0.40)'
          : '0 8px 24px -10px rgba(35,51,92,0.50)',
        transform:       pressed ? 'translateY(0) scale(0.985)' : hovered ? 'translateY(-1px)' : 'translateY(0)',
        transition:     'transform 0.18s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, box-shadow 0.3s ease',
      }}
    >
      {({ loading }) =>
        loading ? 'Preparing PDF…' : (
          <>
            Download CV
            <span
              aria-hidden
              style={{
                display:    'inline-flex',
                fontSize:   '0.95em',
                transform:  hovered ? 'translateY(2px)' : 'translateY(0)',
                transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              ↓
            </span>
          </>
        )
      }
    </PDFDownloadLink>
  );
}
