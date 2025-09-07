"use client";

import { ChangeEvent, useEffect, useState } from "react";

const CSearch = ({
  onSearch,
  placeholder,
}: {
  // eslint-disable-next-line no-unused-vars
  onSearch: (v: string) => void;
  placeholder?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center rounded-sm border bg-white p-2 ">
      <input
        type="text"
        className="focus-visible:outline-none"
        onChange={handleInputChange}
        value={searchTerm}
        placeholder={placeholder}
      />
      <i className="fa-solid fa-magnifying-glass cursor-pointer text-[#536485FF]"></i>
    </div>
  );
};

export default CSearch;
