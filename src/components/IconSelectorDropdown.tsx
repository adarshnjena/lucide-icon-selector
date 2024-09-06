"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { icons } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, Copy, Check } from "lucide-react";
import { FixedSizeList as List } from "react-window";

type IconName = keyof typeof icons;

const ITEM_HEIGHT = 36; // Height of each icon item
const LIST_HEIGHT = 300; // Max height of the dropdown list

const IconSelectorDropdown: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [iconList, setIconList] = useState<IconName[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIconList(Object.keys(icons) as IconName[]);
  }, []);

  const filteredIcons = useMemo(() => {
    if (!searchTerm) return iconList;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return iconList.filter((iconName) =>
      iconName.toLowerCase().includes(lowerSearchTerm)
    );
  }, [iconList, searchTerm]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setSearchTerm("");
    }
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const copyIconName = useCallback((iconName: string) => {
    navigator.clipboard.writeText(iconName);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  }, []);

  const IconItem = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const iconName = filteredIcons[index];
      const IconComponent = icons[iconName];
      return (
        <div
          style={style}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
        >
          <IconComponent className="mr-2 h-4 w-4" />
          <span className="flex-grow">{iconName}</span>
          <button
            className="ml-auto p-1 hover:bg-gray-200 rounded"
            onClick={(e) => {
              e.stopPropagation();
              copyIconName(iconName);
            }}
          >
            {copiedIcon === iconName ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      );
    },
    [filteredIcons, copyIconName, copiedIcon]
  );

  return (
    <div className="relative w-[200px]">
      <DropdownMenu.Root open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenu.Trigger asChild>
          <button className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md flex items-center justify-between">
            {selectedIcon ? (
              <>
                {React.createElement(icons[selectedIcon], {
                  className: "mr-2 h-4 w-4",
                })}
                {selectedIcon}
              </>
            ) : (
              "Select an icon"
            )}
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
        <div className="mt-2 flex items-center">
          {React.createElement(icons[selectedIcon], {
            className: "mr-2 h-4 w-4",
          })}
          <span>{selectedIcon}</span>
          <button
            onClick={() => setSelectedIcon(null)}
            className="ml-auto p-1 hover:bg-gray-200 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default IconSelectorDropdown;
