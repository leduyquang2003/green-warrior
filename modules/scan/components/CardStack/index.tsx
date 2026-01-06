import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

type Card = { id: number; title: string; color: string };

const cards: Card[] = [
  { id: 1, title: "A", color: "bg-red-500" },
  { id: 2, title: "B", color: "bg-green-500" },
  { id: 3, title: "C", color: "bg-yellow-500" },
];

const CARD_W_COLLAPSED = 111;
const CARD_W_EXPANDED = 600;
const A_HEIGHT = 300;
const BC_HEIGHT = 300;
const REVEAL_OFFSET = 100; // adjust so ~1/3 is revealed visually
const STEP_MS = 2000;

export function ThreeCardSequenceReversed() {
  const [stage, setStage] = useState(0);
  const tRef = useRef<number | null>(null);

  // Layout
  const yA = 0;
  const yB = A_HEIGHT - REVEAL_OFFSET;
  const yC = yB + BC_HEIGHT - REVEAL_OFFSET;

  // Reverse means slide out to left, so x goes negative
  // A
  const aSpring = useSpring({
    to: {
      y: yA,
      x: stage >= 2 ? -1200 : 0, // slide off-screen to the LEFT
      width: stage >= 1 ? CARD_W_EXPANDED : CARD_W_COLLAPSED,
      opacity: stage >= 2 ? 0 : 1,
      zIndex: 30,
    },
    from: { y: yA, x: 0, width: CARD_W_COLLAPSED, opacity: 1, zIndex: 30 },
    config: { duration: STEP_MS },
  });

  // B
  const bSpring = useSpring({
    to: {
      y: stage >= 2 ? yA : yB,
      x: stage >= 4 ? -1200 : 0,
      width: stage >= 3 ? CARD_W_EXPANDED : CARD_W_COLLAPSED,
      opacity: stage >= 4 ? 0 : 1,
      zIndex: stage >= 2 ? 30 : 20,
    },
    from: { y: yB, x: 0, width: CARD_W_COLLAPSED, opacity: 1, zIndex: 20 },
    config: { duration: STEP_MS },
  });

  // C
  const cSpring = useSpring({
    to: {
      y: stage >= 4 ? yA : stage >= 2 ? yB : yC,
      x: stage >= 6 ? -1200 : 0, // optional final exit
      width: stage >= 5 ? CARD_W_EXPANDED : CARD_W_COLLAPSED,
      opacity: stage >= 6 ? 0 : 1,
      zIndex: stage >= 4 ? 30 : 10,
    },
    from: { y: yC, x: 0, width: CARD_W_COLLAPSED, opacity: 1, zIndex: 10 },
    config: { duration: STEP_MS },
  });

  useEffect(() => {
    const tickTo = (next: number) =>
      new Promise<void>((resolve) => {
        tRef.current = window.setTimeout(() => {
          setStage(next);
          resolve();
        }, STEP_MS);
      });

    (async () => {
      await tickTo(1); // A expand
      await tickTo(2); // A exit left + B promote
      await tickTo(3); // B expand
      await tickTo(4); // B exit left + C promote
      await tickTo(5); // C expand
      // optional: await tickTo(6); // C exit left
    })();

    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: yC + BC_HEIGHT }}>
      {/* Card A */}
      <animated.div
        className={`absolute left-0 rounded-lg shadow-xl overflow-hidden ${cards[0].color}`} // per-card Tailwind color
        style={{
          height: BC_HEIGHT,
          width: aSpring.width,
          transform: aSpring.x.to((x) => `translate3d(${x}px, 0, 0)`),
          zIndex: 30,
        }}
      >
        <animated.div
          style={{
            transform: aSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
            opacity: aSpring.opacity,
            height: "100%",
          }}
          className="flex items-center justify-center text-white text-3xl"
        >
          {cards[0].title}
        </animated.div>
      </animated.div>

      {/* Card B */}
      <animated.div
        className={`absolute left-0 rounded-lg shadow-xl overflow-hidden ${cards[1].color}`}
        style={{
          height: BC_HEIGHT,
          width: bSpring.width,
          transform: bSpring.x.to((x) => `translate3d(${x}px, 0, 0)`),
          zIndex: 20,
        }}
      >
        <animated.div
          style={{
            transform: bSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
            opacity: bSpring.opacity,
            height: "100%",
          }}
          className="flex items-center justify-center text-white text-2xl"
        >
          {cards[1].title}
        </animated.div>
      </animated.div>

      {/* Card C */}
      <animated.div
        className={`absolute left-0 rounded-lg shadow-xl overflow-hidden ${cards[2].color}`}
        style={{
          height: BC_HEIGHT,
          width: cSpring.width,
          transform: cSpring.x.to((x) => `translate3d(${x}px, 0, 0)`),
          zIndex: 10,
        }}
      >
        <animated.div
          style={{
            transform: cSpring.y.to((y) => `translate3d(0, ${y}px, 0)`),
            opacity: cSpring.opacity,
            height: "100%",
          }}
          className="flex items-center justify-center text-white text-2xl"
        >
          {cards[2].title}
        </animated.div>
      </animated.div>
    </div>
  );
}
