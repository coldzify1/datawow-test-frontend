import { useState } from "react";
import PostFilter from "../post/PostFilter"
import SearchInput from "./SearchInput"
import Button from "./Button";

type HomeBarType = {
  onClickCreatePost: () => void
  selectedCommunity: string
  setSelectedCommunity: (value: string) => void
}

const HomeBar = ({ onClickCreatePost, selectedCommunity, setSelectedCommunity }: HomeBarType) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [open, setOpen] = useState(false);

  const onToggle = (isOpen: boolean) => {
    setOpen(isOpen);
    if(isOpen){
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      },100)
      
    }
  }
  return (
    <div className="home-bar flex items-center">
      <div className="flex-1">
        <SearchInput open={open} setOpen={onToggle} />

      </div>
      {
        !open && (
          <>
            <PostFilter selectedKey={selectedCommunity} onChange={(key) => setSelectedCommunity(key)} />
            <Button className="block ml-[10] mt-0 min-w-[105] text-white" type="button" onClick={onClickCreatePost} >Create +</Button>
          </>
        )
      }

    </div>
  )
}

export default HomeBar