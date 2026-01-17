import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
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
import Tradition from "./pages/categories/Tradition";
import Knowledge from "./pages/categories/Knowledge";
import Crafts from "./pages/categories/Crafts";
import Festivals from "./pages/categories/Festivals";
import Arts from "./pages/categories/Arts";

function App() {
  const { user } = useAuth()!;
  
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
          <Route path="category/tradition" element={<Tradition />} />
          <Route path="/category/arts" element={<Arts />} />
          <Route path="category/knowledge" element={<Knowledge />} />
          <Route path="category/crafts" element={<Crafts />} />
          <Route path="category/festivals" element={<Festivals />} />
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
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;