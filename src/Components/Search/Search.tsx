import { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { SearchItem } from "./SearchItem";

export const Search = () => {
  const [searchResult, setSearchResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const handleChange = (e: any) => {
    const searchValues = e.target.value;
    if (!searchValues.startsWith(" ")) {
      setSearchResult(searchValues);
      setShowResult(true);
    }
  };
  return (
    <div className="wrapper">
      <Tippy
        interactive
        visible={showResult && searchResult.length > 0}
        onClickOutside={() => setShowResult(false)}
        render={(attrs) => (
          <div {...attrs} tabIndex={-1}>
            <SearchItem />
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
