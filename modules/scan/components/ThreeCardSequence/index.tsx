import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const CARD_W_COLLAPSED = 360;     // initial narrow width to show partial content
const CARD_W_EXPANDED = 600;      // full width on expand
const A_HEIGHT = 500;
const BC_HEIGHT = 300;
const REVEAL_OFFSET = 200;        // vertical overlap so 1/3 shows; tweak per design
const STEP_MS = 2000;

export function ThreeCardSequence() {
  // Stages: 0=initial stack; 1=A expand; 2=A exit + B promote; 3=B expand; 4=B exit + C promote; 5=C expand; 6=C exit (optional)
  const [stage, setStage] = useState(0);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial positions (y) to reveal 1/3 of the next card
  const yA = 0;
  const yB = A_HEIGHT - REVEAL_OFFSET;
  const yC = yB + BC_HEIGHT - REVEAL_OFFSET;

  // Card A spring
  const aSpring = useSpring({
    to: {
      y: stage >= 2 ? yA : yA,
      x: stage >= 2 ? 1200 : 0, // slide off to the right at stage >= 2
      width: stage >= 1 ? CARD_W_EXPANDED : CARD_W_COLLAPSED,
      opacity: stage >= 2 ? 0 : 1,
      zIndex: 3
    },
    from: { y: yA, x: 0, width: CARD_W_COLLAPSED, opacity: 1, zIndex: 3 },
    config: { duration: STEP_MS },
    immediate: false
  });

  // Card B spring
  const bSpring = useSpring({
    to: {
      y: stage >= 2 ? yA : yB,                       // promote to top when stage >= 2
      x: stage >= 4 ? 1200 : 0,                      // slide off to right at stage >= 4
      width: stage >= 3 ? CARD_W_EXPANDED : CARD_W_COLLAPSED, // expand when stage >= 3
      opacity: stage >= 4 ? 0 : 1,
      zIndex: stage >= 2 ? 3 : 2
    },
    from: { y: yB, x: 0, width: CARD_W_COLLAPSED, opacity: 1, zIndex: 2 },
    config: { duration: STEP_MS },
    immediate: false
  });

  // Card C spring
  const cSpring = useSpring({
    to: {
      y: stage >= 4 ? yB : yC,                        // step up when B exits
      x: stage >= 6 ? 1200 : 0,                       // optional final exit
      width: stage >= 5 ? CARD_W_EXPANDED : CARD_W_COLLAPSED, // expand when stage >= 5
      opacity: stage >= 6 ? 0 : 1,
      zIndex: stage >= 4 ? 3 : 1
    },
    from: { y: yC, x: 0, width: CARD_W_COLLAPSED, opacity: 1, zIndex: 1 },
    config: { duration: STEP_MS },
    immediate: false
  });

  // Stage timeline
  useEffect(() => {
    // Clear any previous timers
    if (timeRef.current) clearTimeout(timeRef.current);

    const run = async () => {
      // 0 -> 1: A expand after 2s
      await tickTo(1);
      // 1 -> 2: A slide out, B promote
      await tickTo(2);
      // 2 -> 3: B expand
      await tickTo(3);
      // 3 -> 4: B slide out, C promote
      await tickTo(4);
      // 4 -> 5: C expand
      await tickTo(5);
      // Optional: 5 -> 6: C slide out
      // await tickTo(6);
    };

    run();

    function tickTo(next: number): Promise<void> {
      return new Promise<void>((resolve) => {
        timeRef.current = setTimeout(() => {
          setStage(next);
          resolve();
        }, STEP_MS);
      });
    }

    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: yC + BC_HEIGHT }}>
      {/* Card A */}
      <animated.div
        className="absolute left-0 bg-white shadow-xl rounded-lg overflow-hidden"
        style={{
          height: A_HEIGHT,
          width: aSpring.width,
          transform: aSpring.x.to((x) => `translate3d(${x}px, 0, 0)`)
        }}
      >
        <animated.div
          style={{
            transform: aSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
            opacity: aSpring.opacity,
            position: "relative",
            height: "100%"
          }}
        >
          <div className="h-full flex items-center justify-center text-3xl">A</div>
        </animated.div>
      </animated.div>

      {/* Card B */}
      <animated.div
        className="absolute left-0 bg-white shadow-xl rounded-lg overflow-hidden"
        style={{
          height: BC_HEIGHT,
          width: bSpring.width,
          transform: bSpring.x.to((x) => `translate3d(${x}px, 0, 0)`)
        }}
      >
        <animated.div
          style={{
            transform: bSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
            opacity: bSpring.opacity,
            position: "relative",
            height: "100%"
          }}
        >
          <div className="h-full flex items-center justify-center text-2xl">B</div>
        </animated.div>
      </animated.div>

      {/* Card C */}
      <animated.div
        className="absolute left-0 bg-white shadow-xl rounded-lg overflow-hidden"
        style={{
          height: BC_HEIGHT,
          width: cSpring.width,
          transform: cSpring.x.to((x) => `translate3d(${x}px, 0, 0)`)
        }}
      >
        <animated.div
          style={{
            transform: cSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
            opacity: cSpring.opacity,
            position: "relative",
            height: "100%"
          }}
        >
          <div className="h-full flex items-center justify-center text-2xl">C</div>
        </animated.div>
      </animated.div>
    </div>
  );
}
