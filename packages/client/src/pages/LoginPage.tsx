import LoginForm from "@/components/LoginForm"
import { Button } from "@/components/styled/Button"
import { Link } from "react-router-dom"

export default function LoginPage() {
    return (
        <div>
            <LoginForm>
                <p>
                    Dont have an account?{" "}
                    <Link to={"/register"}>register here</Link>{" "}
                </p>
                <Button type="submit">Login</Button>
            </LoginForm>
        </div>
    )
}
