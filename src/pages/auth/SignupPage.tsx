import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../hook/auth.hook";
import type { ISignupType } from "../../types";

const SignupPage = () => {
  const signupMutation = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false); // 👈 new state

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstname = (e.currentTarget.elements.namedItem("firstname") as HTMLInputElement).value;
    const lastname = (e.currentTarget.elements.namedItem("lastname") as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
    const gender = (e.currentTarget.elements.namedItem("gender") as HTMLSelectElement).value;

    const payload: ISignupType = {
      firstname,
      lastname,
      email,
      password,
      gender,
    };
    signupMutation.mutate(payload);
  };

  return (
    <div className="min-h-[120vh] flex items-center justify-center bg-gradient-to-tr from-[#f6f6f7] via-[#E5DEFF] to-[#7E69AB]">
      <form
        onSubmit={handleSignup}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-5"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#7E69AB]">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-1">Create your account</p>
        </div>

        {/* Input Fields */}
        {[
          { id: "firstname", label: "First Name", type: "text" },
          { id: "lastname", label: "Last Name", type: "text" },
          { id: "email", label: "Email", type: "email" },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              required
              placeholder={`Enter your ${label.toLowerCase()}`}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
            />
          </div>
        ))}

        {/* Password input with toggle */}
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

        {/* Gender Select */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            defaultValue=""
            className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] transition"
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-2.5 rounded-lg shadow transition"
        >
          {signupMutation.isPending ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#7E69AB] hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
