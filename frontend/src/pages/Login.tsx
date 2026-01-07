import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, password });
    // login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // google auth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-[#8b3f1f]">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#8b3f1f] mb-6">
          Login to Rune
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 rounded-lg border border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-lg border border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-[#8b3f1f]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-[#8b3f1f] text-white py-2 rounded-lg font-semibold hover:bg-[#70301a] transition-all"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-[#F4F1EA] text-[#8b3f1f] py-2 rounded-lg hover:bg-[#f0e6dd] transition-all"
        >
          <FaGoogle />
          Login with Google
        </button>

        {/* Signup link */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Not signed up yet?{" "}
          <Link to="/register" className="text-[#8b3f1f] hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
