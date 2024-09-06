import IconSelectorDropdown from "@/components/IconSelectorDropdown";
import SelectedIconDisplay from "@/components/ui/SelectedIconDisplay";

export default function IconSelectorDropdownPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Icon Selector Dropdown</h1>
      <div className="space-y-4 flex flex-row space-x-32">
        <IconSelectorDropdown />
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Selected Icon:</h2>
          <SelectedIconDisplay />
        </div>
      </div>
    </div>
  );
}
