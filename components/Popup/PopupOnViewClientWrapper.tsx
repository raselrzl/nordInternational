'use client';

import dynamic from 'next/dynamic';

const PopupOnView = dynamic(() => import('@/components/general/PopupOnView'), {
  ssr: false,
});

export default function PopupOnViewClientWrapper() {
  return <PopupOnView />;
}
