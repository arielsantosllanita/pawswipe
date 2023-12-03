"use client"; // This is a client component
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const pawWidth = 50;

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.deltaX < 0) {
        setSwipeOffset(eventData.deltaX);
      } else {
        setSwipeOffset(0);
      }
    },
    onSwipedLeft: () => {
      setCurrentPage((prevPage) => (prevPage === 1 ? 2 : 1));
      router.push('/dashboard/home');
    },
    onSwipedRight: () => {
      setSwipeOffset(0);
    },
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      className="h-screen w-screen overflow-hidden flex items-center justify-center relative"
      style={{
        backgroundImage: `url(/home.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center h-screen ">
        {/* <div
          className="flex items-center justify-center w-full max-w-xl relative"
          style={{
            backgroundImage: `url(${homeBackground.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        > */}
        {/* Swipeable content */}
        <div className="w-full h-full flex flex-col items-center justify-start pt-64">
          <p className="mb-4 text-lg">Paw needs to be swipe to the left in order to proceed</p>
          <div className="relative" style={{ width: "80%", maxWidth: "400px" }}>
            <div className="absolute left-0 w-1/2 h-1 bg-gray-400 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute right-0 w-1/2 h-1 bg-gray-400 top-1/2 transform -translate-y-1/2"></div>
            <div className="paw-container" {...swipeHandlers} style={{ width: "100%" }}>
              <div
                className="paw-image-container"
                style={{
                  transform: `translateX(${swipeOffset}px)`,
                  cursor: "grab",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={'/paw-print.png'}
                  alt="Paw"
                  className="paw-image"
                  width={pawWidth}
                  height={pawWidth}
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
