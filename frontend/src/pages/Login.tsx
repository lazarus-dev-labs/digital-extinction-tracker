import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { useAuth, type ExtendedUser } from "@/hooks/AuthContext";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser } = useAuth()!;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  // Fetch user doc with role
  const fetchUserWithRole = async (uid: string): Promise<ExtendedUser | null> => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        ...(auth.currentUser as ExtendedUser),
        role: data.role as "admin" | "user",
      };
    }
    return null;
  };

  const handleNavigation = (userData: ExtendedUser) => {
    if (userData.role === "admin") {
      navigate("/admindashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, data.email, data.password);
      const fullUser = await fetchUserWithRole(cred.user.uid);
      if (!fullUser) throw new Error("No user data found");

      setUser(fullUser);
      handleNavigation(fullUser);
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // Create Firestore doc if missing
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }

      const fullUser = await fetchUserWithRole(user.uid);
      if (!fullUser) throw new Error("No user data found");

      setUser(fullUser);
      handleNavigation(fullUser);
    } catch (err) {
      console.error("Google login error", err);
      setError("Failed to login with Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-[#8b3f1f]">
        <h2 className="text-3xl font-bold text-center text-[#8b3f1f] mb-6">Login to Rune</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Email</label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-lg border border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

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
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#8b3f1f] text-white py-2 rounded-lg font-semibold hover:bg-[#70301a] transition-all"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-[#F4F1EA] text-[#8b3f1f] py-2 rounded-lg hover:bg-[#f0e6dd] transition-all"
        >
          <FaGoogle /> Login with Google
        </button>

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
