import LoginPage from "@/pages/LoginPage";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />}></Route>
    </>
  )
);

export default router;
