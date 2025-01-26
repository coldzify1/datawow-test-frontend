import Head from "next/head";
import Header from "./Header";
import SideNav from "./SideNav";
import classNames from "classnames";

type LayoutProps = {
  children?: React.ReactNode;
  withPadding?: boolean
  loading?: boolean
};

const Layout = (props: LayoutProps) => {
  const {loading} = props;
  return (
    <div className="base-layout">
      <Head>
        <title>Datawow Test</title>
      </Head>
      <Header />
      <div className="flex">
        <SideNav/>
        <div className={classNames("main w-full",{"px-[16] py-[47] md:py-[35] md:px-[40]" : props.withPadding})}>
          {!loading ? props.children : null}
        </div>
      </div>
 
 
    </div>
  );
}

export default Layout;