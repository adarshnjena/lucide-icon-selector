"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash-es";
import { icons } from "lucide-react";

type IconName = keyof typeof icons;

const isIconMatched = (iconName: string, searchTerm: string): boolean => {
  return searchTerm === "" || iconName.toLowerCase().includes(searchTerm);
};

const IconSelector: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [iconList, setIconList] = useState<IconName[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const iconNames = Object.keys(icons) as IconName[];
      if (iconNames.length === 0) {
        throw new Error("No icons found in the icons object");
      }
      setIconList(iconNames);
    } catch (err) {
      console.error("Error in useEffect:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
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
  };

  const filteredIcons = useMemo(
    () => iconList.filter((iconName) => isIconMatched(iconName, searchTerm)),
    [iconList, searchTerm]
  );

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (iconList.length === 0) {
    return <div className="p-4">Loading icons...</div>;
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
        aria-label="Search icons"
      />
      <div
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"
        role="grid"
      >
        {filteredIcons.map((iconName) => {
          const IconComponent = icons[iconName];
          return (
            <div
              key={iconName}
              className={`p-2 border rounded cursor-pointer transition-all duration-300 ${
                selectedIcon === iconName ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleIconClick(iconName)}
              onKeyDown={(e) => e.key === "Enter" && handleIconClick(iconName)}
              tabIndex={0}
              role="gridcell"
            >
              <div className="flex flex-col items-center">
                {IconComponent ? (
                  <IconComponent className="w-6 h-6 mb-1" aria-hidden="true" />
                ) : (
                  <div className="w-6 h-6 mb-1 bg-red-200">No Icon</div>
                )}
                <p className="text-xs text-center">{iconName}</p>
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
            "aria-hidden": "true",
          })}
          <p>{selectedIcon}</p>
        </div>
      )}
    </div>
  );
};

export default IconSelector;
