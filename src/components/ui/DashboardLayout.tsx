import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
