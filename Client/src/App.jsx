import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { useTokenRedirect } from "./component/useTokenRedirect";
import ProtectedRoute from "./component/ProtectedRoute";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // ⬅️ Call the auth check hook
  useTokenRedirect(setUser);
  useEffect(() => {
    if (user) {
      navigate("/dashboard/home", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [user]);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/signin" element={<SignIn />} />

      {/* Protected Route */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Optional: Auth page or signup */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Default redirect based on user state */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
