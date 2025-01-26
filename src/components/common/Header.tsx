import Link from "next/link";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import Burger from "./Burger";
import MobileNav from "./MobileNav";
import { useState } from "react";
import classNames from "classnames";

type HeaderProps = {
  
};

const Header = (props: HeaderProps) => {
  const [mobileNavOpen,setMobileNavOpen] = useState(false)
  const {user} = useUser();
  return (
    <div className="header">
      <div className="header-left">
        <Link href="/">
          <h2 className="font-castoro">a Board</h2>
        </Link>
      </div>
      <div className="header-right">
        <div className="md:hidden">
          <Burger onClick={() => setMobileNavOpen(true)}/>
        </div>
        <div className="hidden md:flex items-center">
          {
            user ? (
              <div className="flex items-center">
                <h3 className="font-inter text-base">{user.name}</h3>
                <img className="profile-image w-10 h-10 ml-5" src="/images/Avatar.png" />
              </div>
            )
            : (
              <Link href="/login">
                <Button className="w-full block mt-0 min-w-[105]" type="button" >Sign in</Button>
              </Link>
            )
          }
         
        </div>
      </div>
      <div className={classNames("mobile-backdrop",{"block" : mobileNavOpen,"hidden" : !mobileNavOpen})}/>
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </div>
  );
}

export default Header;