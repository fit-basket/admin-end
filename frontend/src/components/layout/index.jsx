import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";

import { sidebarNavigation } from "../../constants/navigation";
import logo from "../../assets/logo/logo.png";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { ConfirmationModal } from "../modal";
import { modalText } from "../../constants/modalText";
import SideBar from "./SideBar";
import Navbar from "./Navbar";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { logOutText } = modalText;

  const [open, setOpen] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [navLinks, setNavLinks] = useState(sidebarNavigation);

  const handleOpen = () => setOpen(true);

  // Sign out function
  const handleSignout = (e) => {
    e.preventDefault();
    axios
      .get("/auth/admin/signout")
      .then((res) => {
        if (res.data.success) {
          dispatch(signOut());
          navigate("/login");
        }
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    const updatedLinks = sidebarNavigation.map((link) => {
      if (link.to === location.pathname) {
        return { ...link, current: true };
      } else {
        return { ...link, current: false };
      }
    });
    setNavLinks(updatedLinks);
  }, [location]);

  return (
    <>
      <div>
        <SideBar
          logo={logo}
          navLinks={navLinks}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="md:pl-64 flex flex-col flex-1">
          <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleOpen={handleOpen}
          />
          <main className="flex-1 bg-gray-50">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
      <ConfirmationModal
        setOpen={setOpen}
        open={open}
        confirm={handleSignout}
        title={logOutText.title}
        message={logOutText.message}
      />
    </>
  );
}
