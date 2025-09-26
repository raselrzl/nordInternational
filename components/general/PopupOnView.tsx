'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PopupOnView() {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (inView) {
      setShowPopup(true);
    }
  }, [inView]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div ref={ref} className="relative">
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-md px-4 py-2 max-w-[600px]">
          <div className="relative w-[370px] md:w-[600px] h-[150px] rounded-xl overflow-hidden">
            <Image
              src="/noad.png"
              alt="no ad. image"
              fill
              className="object-cover rounded-xl"
              priority
            />
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition cursor-pointer text-gray-700 text-lg"
            >
              ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
