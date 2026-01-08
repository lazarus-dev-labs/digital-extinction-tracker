import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "@/hooks/AuthContext";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const { setUser } = useAuth()!;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, data.username, data.password);
      setUser(cred.user);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user)
      navigate("/");
    } catch (err) {
      console.error("Google login error", err);
      setError("Failed to login with Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-[#8b3f1f]">
        <h2 className="text-3xl font-bold text-center text-[#8b3f1f] mb-6">
          Login to Rune
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter username"
              className="w-full px-4 py-2 rounded-lg border border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-lg border border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-[#8b3f1f]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#8b3f1f] text-white py-2 rounded-lg font-semibold hover:bg-[#70301a] transition-all"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-[#F4F1EA] text-[#8b3f1f] py-2 rounded-lg hover:bg-[#f0e6dd] transition-all"
        >
          <FaGoogle />
          Login with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Not signed up yet?{" "}
          <Link
            to="/register"
            className="text-[#8b3f1f] hover:underline font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
