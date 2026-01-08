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
// import ContactUs from "./pages/ContactUs";
// import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import Preloader from "./components/Preloader";
// import { useAuth } from "./hooks/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// import AdminLayout from "./layout/AdminLayout";
import RootLayout from "./layout/RootLayout";

function App() {
  // const { isAuthenticated, loading } = useAuth();

  // if (loading) {
  //   return <Preloader />;
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route path="cars" element={<CarList />} />
          <Route path="car-details/:id" element={<CarDetails />} />
          <Route path="contact-us" element={<ContactUs />} /> */}

          <Route
            path="login"
            element={
              true ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="signup"
            element={
              true ? <Signup /> : <Navigate to="/dashboard" />
            }
          />

          {/* <Route element={<ProtectedRoute />}>
            <Route path="user" element={<UserProfile />} />
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} /> */}
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