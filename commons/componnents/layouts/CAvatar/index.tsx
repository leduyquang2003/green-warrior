import Image from "next/image";
import { useEffect, useState } from "react";

const CAvatar = ({ name, avatar }: { name?: string; avatar?: string }) => {
  const [bgColor, setBgColor] = useState("#000000");

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  useEffect(() => {
    setBgColor(generateRandomColor());
  }, []);

  return (
    <>
      {avatar ? (
        <div
          className="flex h-10 w-10 mr-2 items-center justify-center rounded-full text-lg font-bold text-white"
          // style={{ backgroundImage: `url(${avatar})` }}
        >
          <Image
            alt=""
            src={avatar || ""}
            width={40}
            height={40}
            className=" h-10 w-10 rounded-full"
          />
        </div>
      ) : (
        name && (
          <div
            className="mr-2 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{ backgroundColor: bgColor }}
          >
            {getInitial(name)}
          </div>
        )
      )}
    </>
  );
};

export default CAvatar;
