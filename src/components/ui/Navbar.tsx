import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="sticky top-0 z-50 h-20 bg-white shadow-lg flex items-center justify-between px-6 md:px-10 border-b">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-transparent bg-clip-text drop-shadow-md">
        Dashboard
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium hidden md:block">
          {user?.firstname} {user?.lastname}
        </span>
        {user?.image ? (
          <img
            src={user.image}
            alt="User Avatar"
            className="h-12 w-12 rounded-full border-2 border-[#9b87f5] object-cover"
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="h-12 w-12 rounded-full border-2 border-[#9b87f5] object-cover"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
