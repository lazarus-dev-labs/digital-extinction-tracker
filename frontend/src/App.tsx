import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import RootLayout from "./layout/RootLayout";
import { useAuth } from "./hooks/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Preserve from "./pages/Preserve";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import UserDashboard from "./pages/UserDashboard";
import CategoryPage from "./pages/CategoryPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { user } = useAuth()!;
  // console.log(user["accessToken"]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="category" element={<CategoryPage />} />
          {/* <Route path="category/:categoryName" element={<CategoryPage />} /> */}
          <Route
            path="login"
            element={!!user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="register"
            element={<Signup />}
          />

          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="admindashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="preserve" element={<Preserve />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "relative flex p-5 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-[#0f172a] text-white"
        }
      /> */}
    </>
  );
}

export default App;