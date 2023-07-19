import GoTo from "@/components/GoTo"
import { accountPage } from "@/loaders/accountPage"
import { AccountPage } from "@/pages/AccountPage"
import { AccountsPage } from "@/pages/AccountsPage"
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import { TransactionsPage } from "@/pages/TransactionsPage"
import me from "@/services/me"
import currentUser from "@/state/currentUser"
import authorizationToken from "@/utils/authorizationToken"
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom"

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
                    const token = authorizationToken()
                    const user = await me()
                    currentUser.set(user)
                    return user
                }}
            >
                <Route
                    path="account/:id"
                    element={<AccountPage />}
                    loader={accountPage}
                ></Route>
                <Route path="accounts" element={<AccountsPage />}></Route>
                <Route
                    path="transactions"
                    element={<TransactionsPage />}
                ></Route>
            </Route>
        </>
    )
)

export default router
