import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}
export default function MobileNav(props : MobileNavProps){
  const {open = false,onClose} = props
  const {pathname} = useRouter();
  return (
    <div className={classNames("mobile-side-nav md:hidden",{open})}>
      <div className="w-[24] h-[24] flex items-center justify-center cursor-pointer" onClick={onClose}>
        <img src="/images/icon-right-arrow.png"/>
      </div>
      <div className="menu-list mt-[44]">
        <Link href="/">
          <div className="mobile-menu-item flex items-center">
            <div className="w-[24] h-[24] items-center justify-center">
              <img src="/images/icon-home-white.png"/>
            </div>
            <div className={classNames("mobile-menu-text ml-[12]",{active: pathname === '/'})}>Home</div>
          </div>
        </Link>
        <Link href="/our-blog">
          <div className="mobile-menu-item flex items-center mt-[20]">
            <div className="w-[24] h-[24] items-center justify-center">
              <img src="/images/icon-blog-white.png"/>
            </div>
            <div className={classNames("mobile-menu-text ml-[12]",{"active": pathname === '/our-blog'})}>Our Blog</div>
          </div>
        </Link>
      </div>
    </div>
  )
}