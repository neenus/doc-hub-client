import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Header/Header.component";
import Loader from "./Loader/Loader.component";

const Layout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader loading={true} />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
