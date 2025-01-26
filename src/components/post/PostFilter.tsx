import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import IconChevron from "../common/IconChevron"
import { postFilterList } from "@/constants/postFilter.constant"

type PostFilterProps = {
  selectedKey?: string
  onChange?: (key: string) => void
  placeHolder?: string
}
const PostFilter = ({ selectedKey = 'community',onChange,placeHolder="Community" }: PostFilterProps) => {
  const restFilter = postFilterList.filter(item => item.key !== selectedKey);
  return (
    <Menu as="div" className="dropdown-menu relative inline-block text-left min-w-[128] ml-5">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset">
          {selectedKey ? postFilterList.find(item => item.key === selectedKey)?.name : placeHolder}
          <div className="ml-[5]">
            <IconChevron direction="down" />
          </div>
  
        </MenuButton>
      </div>


      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {
            restFilter.map(item => (
              <MenuItem key={item.name}>
                <a
                  style={{cursor:'pointer'}}
                  onClick={() => onChange?.(item.key)}
                  className="dropdown-menu-item block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))
          }
        </div>
      </MenuItems>
    </Menu>
  )
}

export default PostFilter