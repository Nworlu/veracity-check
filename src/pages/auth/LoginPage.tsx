import { Link } from "react-router-dom";
import { useLoginMutation } from "../../hook/auth.hook";
import { useState } from "react";

const LoginPage = () => {
  const loginMutation = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false); // 👈 new state
  
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;

    const payload = {
      email,
      password,
    };

    loginMutation.mutate(payload);
  };

  return (
    <div className="min-h-[110vh] flex items-center justify-center bg-gradient-to-tr from-[#f6f6f7] via-[#E5DEFF] to-[#7E69AB] px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white/90 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-sm space-y-5"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#7E69AB]">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back please login to your account
          </p>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter your password"
            className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-lg mt-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2.5 rounded-lg shadow transition"
        >
          {loginMutation.isPending ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-[#7E69AB] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
