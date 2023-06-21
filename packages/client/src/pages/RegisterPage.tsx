import RegisterForm from "@/components/RegisterForm"
import { Button } from "@/components/styled/Button"
import { Link } from "react-router-dom"

export default function RegisterPage() {
    return (
        <>
            <RegisterForm>
                <p>
                    Already have an account?{" "}
                    <Link to={"/login"}>log-in here</Link>
                </p>
                <Button type="submit">Register</Button>
            </RegisterForm>
        </>
    )
}
