/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import type { StackedCarouselSlideProps } from "react-stacked-center-carousel";

type Item = {
  step: number;
  text: string;
  trashImage: string;
  bgColor: string;
};

type SlideProps = StackedCarouselSlideProps & { data: Item[] };

export const Slide = React.memo(function Slide(props: SlideProps) {
  const { data, dataIndex, isCenterSlide } = props;

  const item = data?.[dataIndex];
  if (!item) return null;

  const step = item.step;
  const text = item.text;
  const trashImage = item.trashImage;
  const bgColor = item.bgColor;

  return (
    <div
      className={`w-full relative bg-white transition-all duration-300 shadow-lg rounded-md`}
      draggable={false}
    >
      {/* <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isCenterSlide ? "opacity-0 -z-10" : "opacity-100 z-10"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-60 transition-all duration-300 select-none"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div> */}

      <div className={`relative flex w-full h-full rounded-md ${bgColor}`}>
        <div
          className="grow flex w-full h-full flex-col justify-center pl-8"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
        {step != 3 &&  <div className="text-white font-bold text-3xl">Bước {step}:</div>}
         
          <div className="tracking-wide font-bold">{text}</div>
        </div>
        <div className="relative grow-0 w-[500px] flex h-[500px] flex-col justify-center items-center">
          <div className="absolute rounded-lg bottom-10 bg-white w-[90%] h-12 z-0"></div>
          <img src={trashImage} alt={text} className="z-10"/>
        </div>
      </div>
    </div>
  );
});
