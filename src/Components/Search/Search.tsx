import { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { SearchItem } from "./SearchItem";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value.trim()); 
  };

  return (
    <div className="wrapper">
      <Tippy
        interactive
        visible={searchQuery.length > 0} 
        onClickOutside={() => setSearchQuery("")} 
        render={(attrs) => (
          <div {...attrs} tabIndex={-1}>
            <SearchItem searchQuery={searchQuery} />{" "}
          </div>
        )}
      >
        <input
          placeholder="Search...."
          className="h-[46px] w-[520px] rounded-lg p-4 md:block hidden"
          onChange={handleChange}
        />
      </Tippy>
    </div>
  );
};
