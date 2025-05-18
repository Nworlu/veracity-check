import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOGIN_API = "https://reqres.in/api/login";
const SIGNUP_API = "https://reqres.in/api/register";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a login check, e.g., checking localStorage for token
    const token = localStorage.getItem("mock_token");
    if (token) {
      navigate("/verify");
    }
  }, [navigate]);

  const signInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (
      event.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    const password = (
      event.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;
    try {
      const res = await axios.post(LOGIN_API, { email, password });
      localStorage.setItem("mock_token", res.data.token);
      navigate("/verify");
    } catch (err) {
      alert("Login failed. Use: eve.holt@reqres.in / any password.");
      console.log(err);
    }
  };

  const handleSignup = async () => {
    const email = prompt("Enter your email for signup:");
    const password = prompt("Choose a password:");
    if (email && password) {
      try {
        const res = await axios.post(SIGNUP_API, { email, password });
        console.log({ res });
        alert(
          "Signup successful! (mocked)\nUse the same email and any password to log in."
        );
      } catch {
        alert(
          "Signup failed. Use: eve.holt@reqres.in / any password for demo."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f6f6f7] via-[#E5DEFF] to-[#7E69AB] animate-fade-in">
      <form
        className="bg-white/80 rounded-xl p-8 shadow-xl flex flex-col gap-4 w-full max-w-sm animate-scale-in"
        onSubmit={signInWithEmail}
      >
        <div>
          <h2 className="text-2xl font-bold mb-1 text-center">Login</h2>
          <p className="text-sm text-center text-gray-600">
            Sign in with your email
            <br />
            Try <b>eve.holt@reqres.in</b> for demo
          </p>
        </div>
        <input
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <input
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold rounded-md py-2 transition hover-scale mt-2"
        >
          Sign In
        </button>
        <hr className="my-2" />
        <button
          type="button"
          onClick={handleSignup}
          className="bg-secondary text-primary rounded-md font-semibold py-2 hover-scale"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
