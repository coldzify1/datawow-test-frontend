import classNames from "classnames";
import { useState } from "react"

type SearchInputProps = {
  open: boolean;
  setOpen: (value:boolean) => void
}
const SearchInput = ({open,setOpen} : SearchInputProps) => {
  return (
    <>
      <div 
        className={classNames("items-center justify-center md:hidden cursor-pointer",open ? "hidden" : "flex")} 
        onClick={() => setOpen(true)}
      >
        <img src="/images/icon-search.png" className="search-img" />
      </div>
      <div className={classNames("search-input-box z-50",open ? "flex" : "hidden md:flex")}>
        <img src="/images/icon-search.png" className="search-img" />
        <input id="search-input" className="search-input" placeholder="Search" onBlur={() => setOpen(false)} />
      </div>
    </>
 
  )
}

export default SearchInput