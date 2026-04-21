import React from 'react';

interface BlobProps {
  size?:    string;
  top?:     string;
  left?:    string;
  right?:   string;
  bottom?:  string;
  opacity?: number;
}

/** Soft editorial blob — absolute positioned, sits behind content. */
export default function SectionBlob({
  size    = '60vw',
  top,
  left,
  right,
  bottom,
  opacity = 1,
}: BlobProps) {
  return (
    <div
      aria-hidden
      style={{
        position:     'absolute',
        width:        size,
        height:       size,
        top,
        left,
        right,
        bottom,
        background:   '#E5E9F0',
        borderRadius: '43% 57% 61% 39% / 51% 44% 56% 49%',
        filter:       'blur(80px)',
        opacity,
        pointerEvents:'none',
        zIndex:        0,
      }}
    />
  );
}
