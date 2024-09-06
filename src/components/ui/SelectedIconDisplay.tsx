"use client";

import React from "react";
import { useSelector } from "react-redux";
import { icons } from "lucide-react";
import { RootState } from "@/store"; // Adjust this import path as needed

const SelectedIconDisplay: React.FC = () => {
  const selectedIcon = useSelector(
    (state: RootState) => state.iconSelector.selectedIcon
  );

  if (!selectedIcon) {
    return <div className="text-gray-500">No icon selected</div>;
  }

  const IconComponent = icons[selectedIcon as keyof typeof icons];

  return (
    <div className="flex items-center gap-2">
      <IconComponent className="h-6 w-6" />
      <span>{selectedIcon}</span>
    </div>
  );
};

export default SelectedIconDisplay;
