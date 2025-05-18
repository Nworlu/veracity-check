import { Link, useLocation } from "react-router-dom";
import { links } from "../../data";
import { useAuth } from "../../context/AuthProvider";
import { useLogoutMutation } from "../../hook/auth.hook";

const SideBar = () => {
  const pathname = useLocation().pathname;
//   const navigate = useNavigate();
  const { user } = useAuth()
  const logoutMutation =  useLogoutMutation()

  const handleLogout = () => {
    logoutMutation.mutate()
  };


  const filteredLinks = links.filter((link) => {
    if (user?.userType === "user") {
      return link.name === "Documents" || link.name === "Profile";
    } else if (user?.userType === "admin") {
      return link.name !== "Documents";
    }
    return false;
  });

  return (
    <aside className="h-screen w-64 p-4 relative z-10 flex flex-col justify-between">
      <div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-[#E5DEFF] via-[#9b87f5] to-[#403E43]" />
        <h1 className="text-5xl md:text-3xl font-extrabold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-transparent bg-clip-text mb-2 drop-shadow-lg">
          Veracity Check
        </h1>
        <div className="mt-9">
          <ul className="flex flex-col gap-7">
            {filteredLinks.map((link, indx) => (
              <li key={indx}>
                <Link
                  to={link.href}
                  className={`flex items-center py-3 px-2 rounded-lg ${
                    pathname === link.href
                      ? "bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white"
                      : ""
                  }`}
                >
                  <link.Icon />
                  <span className="ml-2">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout and Footer */}
      <div className="space-y-4">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
        >
          {logoutMutation.isPending? "Logging out....." : "Logout"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Veracity Check. All rights reserved.
        </p>
      </div>
    </aside>
  );
};

export default SideBar;
