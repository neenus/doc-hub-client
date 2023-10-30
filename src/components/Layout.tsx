import { Outlet } from "react-router-dom";
import Header from "./Header/Header.component";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
