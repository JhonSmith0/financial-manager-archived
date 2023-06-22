import { backgroundCl1 } from "@/colors"
import RegisterForm from "@/components/RegisterForm"
import { AuthPageCard } from "@/components/styled/AuthPageCard"
import { Button } from "@/components/styled/Button"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledRegisterPage = styled.div`
    background: ${backgroundCl1};
    display: grid;
    place-items: center;
    height: 100vh;
`

export default function RegisterPage() {
    return (
        <StyledRegisterPage>
            <AuthPageCard>
                <h2>Register</h2>
                <RegisterForm>
                    <Link to={"/login"}>Already have an account?</Link>
                    <Button type="submit">Register</Button>
                </RegisterForm>
            </AuthPageCard>
        </StyledRegisterPage>
    )
}
