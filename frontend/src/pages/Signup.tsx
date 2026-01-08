import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ email, password });
    // signup logic here
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // google auth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-[#8b3f1f]">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#8b3f1f] mb-6">
          Create Rune Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email (Username) */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
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
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded-lg border border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]"
              required
            />
          </div>

          {/* Signup button */}
          <button
            type="submit"
            className="w-full bg-[#8b3f1f] text-white py-2 rounded-lg font-semibold hover:bg-[#70301a] transition-all"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-[#F4F1EA] text-[#8b3f1f] py-2 rounded-lg hover:bg-[#f0e6dd] transition-all"
        >
          <FaGoogle />
          Sign up with Google
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#8b3f1f] hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;