import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"; // Adjust path to where your modular card file is

interface CardForHomeProps {
  title: string;
  description: string;
  image: string;
}

const CardForHome: React.FC<CardForHomeProps> = ({ title, description, image }) => {
  return (
    <Card className="max-w-xs mx-auto overflow-hidden bg-[#F4F1EA] border-[6px] border-[#F0C17F] rounded-[30px] shadow-md flex flex-col h-full gap-0 p-0">
      {/* 1. Image remains outside of padding sections to stay "edge-to-edge" */}
      <img 
        className="w-full h-32 object-cover" 
        src={image} 
        alt={title} 
      />

      {/* 2. Using CardHeader for Title and Badge */}
      <CardHeader className="px-5 py-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-[#9F3B0F] leading-tight">
            {title}
          </CardTitle>
          <div className="flex items-center space-x-1 text-green-600 font-medium">
            <span className="bg-green-600 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]">★</span>
            <span className="text-[10px]">Low</span>
          </div>
        </div>
      </CardHeader>

      {/* 3. Using CardContent for Description and Button */}
      <CardContent className="px-5 pb-4 flex flex-col flex-grow">
        <p className="text-gray-700 text-xs leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        <button className="w-full bg-[#9F3B0F] hover:bg-[#EF9829] text-white text-sm font-bold py-2 rounded-lg transition-colors duration-300">
          Read more
        </button>
      </CardContent>
    </Card>
  );
};

export default CardForHome;