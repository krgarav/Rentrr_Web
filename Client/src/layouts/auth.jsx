import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import routes from "@/routes";
import { SignIn, SignUp } from "@/pages/auth";

export function Auth() {
  const navbarRoutes = [
    {
      name: "sign up",
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      name: "sign in",
      path: "/sign-in",
      element: <SignIn />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {navbarRoutes.map((pages) => (
          <Route exact path={pages.path} element={pages.element} />
        ))}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
