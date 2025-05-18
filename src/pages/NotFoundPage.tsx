import { Link } from "react-router-dom";
import Lottie from "lottie-react";
// import animationData from "../assets/not-found.lottie";
import animationData from "../assets/not-found.json"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="w-full max-w-md">
        <Lottie animationData={animationData} loop={true} />
      </div>

      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] drop-shadow-lg mt-4">
        404
      </h1>

      <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-2">
        Page Not Found
      </p>
      <p className="text-gray-500 mt-1 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white font-semibold hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
