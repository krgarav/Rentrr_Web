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
import CookieConsent from "react-cookie-consent";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // ⬅️ Call the auth check hook
  useTokenRedirect(setUser);
  useEffect(() => {
    if (user) {
      navigate("/dashboard/home", { replace: true });
    } else if (location.pathname.includes("register")) {
      // do nothing
    } else {
      navigate("/signin", { replace: true });
    }
  }, [user]);

  return (
    <>
      <CookieConsent
        buttonText="I understand"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={7}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
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
    </>
  );
}

export default App;
