"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { icons } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";
import { FixedSizeList as List } from "react-window";
import {
  setSearchTerm,
  setSelectedIcon,
  setIconList,
  setIsOpen,
} from "@/store";

type IconName = keyof typeof icons;

const ITEM_HEIGHT = 36;
const LIST_HEIGHT = 300;

const IconSelectorDropdownClient: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedIcon, iconList, isOpen } = useSelector(
    (state: {
      iconSelector: {
        searchTerm: string;
        selectedIcon: string | null;
        iconList: IconName[];
        isOpen: boolean;
      };
    }) => state.iconSelector
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setIconList(Object.keys(icons) as IconName[]));
  }, [dispatch]);

  const filteredIcons = useMemo(() => {
    if (!searchTerm) return iconList;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return iconList.filter((iconName: string) =>
      iconName.toLowerCase().includes(lowerSearchTerm)
    );
  }, [iconList, searchTerm]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      dispatch(setIsOpen(open));
      if (open) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      } else {
        dispatch(setSearchTerm(""));
      }
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchTerm(e.target.value));
    },
    [dispatch]
  );

  const IconItem = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const iconName = filteredIcons[index];
      const IconComponent = icons[iconName as IconName];
      return (
        <div
          style={style}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => dispatch(setSelectedIcon(iconName))}
        >
          <IconComponent className="mr-2 h-4 w-4" />
          <span className="flex-grow">{iconName}</span>
          {selectedIcon === iconName && (
            <IconComponent className="ml-auto h-4 w-4 text-blue-500" />
          )}
        </div>
      );
    },
    [filteredIcons, selectedIcon, dispatch]
  );

  return (
    <div className="relative w-[300px]">
      <DropdownMenu.Root open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenu.Trigger asChild>
          <button className="w-[90%] px-3 py-2 text-sm bg-white border border-gray-300 rounded-md flex items-center justify-between">
            <span className="flex-grow text-left">
              {selectedIcon ? selectedIcon : "Select an icon"}
            </span>
            {selectedIcon &&
              React.createElement(icons[selectedIcon as IconName], {
                className: "mx-2 h-4 w-4",
              })}
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="w-[300px] bg-white border border-gray-200 rounded-md shadow-lg"
            align="start"
          >
            <div className="p-2">
              <Input
                ref={searchInputRef}
                placeholder="Search icons..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-8"
              />
            </div>
            <List
              height={Math.min(LIST_HEIGHT, filteredIcons.length * ITEM_HEIGHT)}
              itemCount={filteredIcons.length}
              itemSize={ITEM_HEIGHT}
              width="100%"
              itemData={filteredIcons}
            >
              {IconItem}
            </List>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      {selectedIcon && (
        <button
          onClick={() => dispatch(setSelectedIcon(null))}
          className="absolute right-0 top-0 p-2"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default IconSelectorDropdownClient;
