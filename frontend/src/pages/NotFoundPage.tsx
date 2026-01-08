import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#0f172a] to-[#121c32] text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Page Not Found</h2>
      <p className="mb-6 text-gray-400 text-center">
        The page you are looking for might have been removed <br />
        or the URL is incorrect. You will be redirected to the home page in 5 seconds.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
      >
        Go to Home Now
      </Link>
    </div>
  );
};

export default NotFoundPage;
