import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import type { SubmitHandler } from "react-hook-form"
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";


type FormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  //Add Users to Firestore
  const addUserToFirestore = async (uid: string, email: string | null) => {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      role: "user",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
       // Add user to Firestore
      await addUserToFirestore(userCredential.user.uid, userCredential.user.email);
      toast.success("Account created successfully! Welcome to Rune.");
      navigate("/dashboard"); // Redirect after successful signup
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || "Failed to create an account.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Add user to Firestore
      const user = result.user;
      await addUserToFirestore(user.uid, user.email);
      
      toast.success("Welcome to Rune! Your account has been created.");
      navigate("/dashboard"); // Redirect after successful signup
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || "Google signup failed.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-[#8b3f1f]">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#8b3f1f] mb-6">
          Create Rune Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email (Username) */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="name@example.com"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-[#8b3f1f]"
              } focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Create a password"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-[#8b3f1f]"
                } focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-[#8b3f1f]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-1 text-[#8b3f1f]">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.confirmPassword ? "border-red-500" : "border-[#8b3f1f]"
              } focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Signup button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#8b3f1f] text-white py-2 rounded-lg font-semibold hover:bg-[#70301a] transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
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