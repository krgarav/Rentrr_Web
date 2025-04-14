import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import RentTable from "./pages/dashboard/RentTable";

function App() {
  const useTokenRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.Role === "Operator") {
            if (location.pathname.includes("operator")) {
              navigate(location.pathname);
            } else {
              navigate("/operator/index", { replace: true });
            }
          } else if (decoded.Role === "Admin") {
            if (location.pathname.includes("admin")) {
              navigate(location.pathname);
            } else {
              navigate("/admin/index", { replace: true });
            }
          } else if (decoded.Role === "Moderator") {
            if (location.pathname.includes("moderator")) {
              navigate(location.pathname);
            } else {
              navigate("/moderator/index", { replace: true });
            }
          }
        } catch (error) {
          console.error("Invalid token:", error);
          navigate("/auth/login", { replace: true });
        }
      } else {
        navigate("/auth/login", { replace: true });
      }
    }, []);
  };
  return (
    <Routes>
      <Route path="/*" element={<SignIn />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      {/* <Route path="/dashboard/tables/rentTable" element={<RentTable />} /> */}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
