import React, { useCallback, useEffect, useRef } from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { Slide } from "./Slide";
import { CircleArrowLeft } from "lucide-react";
// import { useIsDesktop, useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

const data = [
  {
    step: 1,
    text: "Đổ bỏ thức ăn thừa vào thùng chất thải thực phẩm",
    trashImage: "/trashGreen.png",
    bgColor: "bg-[#FFD960]"
  },
  {
    step: 3,
    text: "Nếu bẩn thì đổ vào thùng rác thải còn lại ",
    trashImage: "/trashRed.png",
    bgColor: "bg-[#19AEF0]"
  },
  {
    step: 2,
    text: "Nếu sạch thì đổ vào thùng rác thải tái chế",
    trashImage: "/trashYellow.png",
    bgColor: "bg-[#5DC264]"
  },
];

type CarouselRef = { goNext: () => void; goBack: () => void };

const StackedCarouselContainer = ({ startDelay = 10000 }: { startDelay?: number }) => {
  const ref = useRef<CarouselRef | null>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  // const [cycle, setCycle] = useState(0);

  // const isMobile = useIsMobile();
  // const isTablet = useIsTablet();
  // const isDesktop = useIsDesktop();

//   const goNext = useCallback(() => {
//     ref.current?.goNext();
//   }, []);

  const goBack = useCallback(() => {
    ref.current?.goBack();
  }, []);

  useEffect(() => {
    // Start auto-advance after startDelay ms, then every 3s.
    // Stop the repeating interval after it fires twice.
    // clear any existing timers first (safety)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timeoutRef.current = window.setTimeout(() => {
      ref.current?.goBack();

      let runs = 0;
      intervalRef.current = window.setInterval(() => {
        ref.current?.goBack();
        runs += 1;
        if (runs >= 1 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 3000);
    }, startDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startDelay]);

  return (
    <div className="flex h-full w-full">
      <div className="w-full relative">
        <ResponsiveContainer
          carouselRef={
            ref as React.MutableRefObject<StackedCarousel | undefined>
          }
          render={(width, carouselRef) => {
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={Math.min(700, Math.max(800, width * 0.8))}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
                height={600}
              />
            );
          }}
        />
        <div className="absolute left-0 bottom-0 h-full" onClick={() => goBack()}>
            <CircleArrowLeft className="size-20 opacity-0"/>
        </div>
      </div>
    </div>
  );
};

export default StackedCarouselContainer;
