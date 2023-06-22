import { backgroundCl1 } from "@/colors"
import LoginForm from "@/components/LoginForm"
import { AuthPageCard } from "@/components/styled/AuthPageCard"
import { Button } from "@/components/styled/Button"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledLoginPage = styled.div`
    background: ${backgroundCl1};
    display: grid;
    place-items: center;
    height: 100vh;
`

export default function LoginPage() {
    return (
        <StyledLoginPage>
            <AuthPageCard>
                <h2>Login</h2>
                <LoginForm>
                    <Link to={"/register"}>Dont have an account?</Link>
                    <Button type="submit">Login</Button>
                </LoginForm>
            </AuthPageCard>
        </StyledLoginPage>
    )
}
