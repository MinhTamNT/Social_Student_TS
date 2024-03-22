import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Import Tippy CSS
import { SearchItem } from "./SearchItem";

export const Search = () => {
  const [searchResult, setSearchResult] = useState("");

  return (
    <div className="wrapper">
      <Tippy
        render={(attrs) => (
          <div {...attrs} tabIndex={-1}>
            <SearchItem />
          </div>
        )}
        visible={searchResult.length > 0}
      >
        <input
          placeholder="Search...."
          className="h-[46px] w-[420px] rounded-lg p-4 md:block hidden"
          onChange={(e) => setSearchResult(e.target.value)}
        />
      </Tippy>
    </div>
  );
};
