import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  return (
    <div className="side-nav pt-[35] pl-[28] hidden md:block">
      <div className="side-nav-list">
        <Link href="/">
          <div className="side-nav-item">
            <img src="/images/icon-home.png"/>
            <div className={classNames("side-nav-item-text",{active : router.pathname === '/'})}>Home</div>
          </div>
        </Link>
     
        <Link href="/our-blog">
          <div className="side-nav-item">
            <img src="/images/icon-blog.png"/>
            <div className={classNames("side-nav-item-text",{active : router.pathname === '/our-blog'})}>Our Blog</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideNav;