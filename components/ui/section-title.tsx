"use client";

import React from "react";

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  className = "",
}) => {
  return (
    <div className={`flex items-center mb-6 ${className}`}>
      <div className="w-2 h-10 bg-secondary rounded-sm mr-2"></div>
      <div className="bg-muted/50 px-2 py-1 rounded-sm">
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      </div>
    </div>
  );
};

export default SectionTitle;
