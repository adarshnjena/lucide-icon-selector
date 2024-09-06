"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash-es";
import { icons } from "lucide-react";

type IconName = keyof typeof icons;

const IconSelector: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [iconList, setIconList] = useState<IconName[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log("Icons object:", icons);
      const iconNames = Object.keys(icons) as IconName[];
      console.log("Icon names:", iconNames);

      if (iconNames.length === 0) {
        throw new Error("No icons found in the icons object");
      }

      setIconList(iconNames);
    } catch (err) {
      console.error("Error in useEffect:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  }, []);

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value.toLowerCase());
    }, 300),
    []
  );

  const handleIconClick = (iconName: IconName) => {
    setSelectedIcon(iconName);
    console.log("Selected icon:", iconName);
  };

  const isIconMatched = (iconName: string): boolean => {
    return searchTerm === "" || iconName.toLowerCase().includes(searchTerm);
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <div>Total icons: {Object.keys(icons).length}</div>
        <div>First few icons: {Object.keys(icons).slice(0, 5).join(", ")}</div>
      </div>
    );
  }

  if (iconList.length === 0) {
    return <div className="p-4">Loading icons... (Icon count: {Object.keys(icons).length})</div>;
  }

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Search icons..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
        className="mb-4"
      />
      <div className="grid grid-cols-6 gap-4">
        {iconList.map((iconName) => {
          const isMatched = isIconMatched(iconName);
          const IconComponent = icons[iconName];
          return (
            <div
              key={iconName}
              className={`p-2 border rounded cursor-pointer transition-all duration-300 ${
                isMatched ? "bg-green-100 scale-105" : "opacity-50"
              } ${selectedIcon === iconName ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => handleIconClick(iconName)}
            >
              <div className="flex flex-col items-center">
                {IconComponent ? (
                  <IconComponent className="w-6 h-6 mb-1" />
                ) : (
                  <div className="w-6 h-6 mb-1 bg-red-200">No Icon</div>
                )}
                <p
                  className={`text-xs text-center ${
                    isMatched ? "font-bold" : ""
                  }`}
                >
                  {iconName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {selectedIcon && (
        <div className="mt-4 flex items-center">
          <p className="mr-2">Selected Icon:</p>
          {React.createElement(icons[selectedIcon], {
            className: "w-6 h-6 mr-2",
          })}
          <p>{selectedIcon}</p>
        </div>
      )}
    </div>
  );
};

export default IconSelector;