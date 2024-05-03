import React from 'react';

interface ImageTooltipProps {
  title: string;
  description: string;
}

const ImageTooltip: React.FC<ImageTooltipProps> = ({ title, description }) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="rounded-md bg-white bg-opacity-50 p-4 shadow-md">
        <h3 className="text-md font-semibold text-black">{title}</h3>
        <p className="text-sm text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default ImageTooltip;
