import GoTo from "@/components/GoTo";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import me from "@/services/me";
import currentUser from "@/state/currentUser";
import authorizationToken from "@/utils/authorizationToken";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route
        path="/"
        element={<HomePage />}
        errorElement={<GoTo path="/login" />}
        loader={async () => {
          const token = authorizationToken();
          const user = await me();
          currentUser.set(user);
          return user;
        }}
      ></Route>
    </>
  )
);

export default router;
