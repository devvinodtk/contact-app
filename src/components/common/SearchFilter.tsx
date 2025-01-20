import { Input } from "@material-tailwind/react";
import { Search } from "lucide-react";
import React from "react";
import debounce from "lodash/debounce";

interface searchFilterProps {
  onChangeSearchText: (value: string) => void;
}

const SearchFilter = ({ onChangeSearchText }: searchFilterProps) => {
  const debouncedChangeHandler = debounce((newValue: string) => {
    onChangeSearchText(newValue);
  }, 200); // 200ms debounce delay

  // Normal onChange handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debouncedChangeHandler(newValue); // Call debounced function
  };

  return (
    <Input
      type="text"
      {...({} as React.ComponentProps<typeof Input>)}
      onChange={handleChange}
      label="Search"
      icon={<Search className="h-5 w-5" />}
    />
  );
};

export default SearchFilter;
