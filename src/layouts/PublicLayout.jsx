import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
const PublicLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
