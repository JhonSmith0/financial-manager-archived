import { backgroundCl1, textColor2, textColor3, textColor4 } from "@/colors"
import LoginForm, { StyledLoginForm } from "@/components/LoginForm"
import { Button } from "@/components/styled/Button"
import { FieldSet } from "@/components/styled/FieldSet"
import { Input } from "@/components/styled/Input"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledLoginPage = styled.div`
    background: ${backgroundCl1};
    display: grid;
    place-items: center;
    height: 100vh;
`

export const StyledLoginCard = styled.div`
    padding: 4.4rem;
    width: 45rem;
    border-radius: 9px;

    box-shadow: 0px 0px 40px 17px rgba(0, 0, 0, 0.03);

    h2 {
        text-align: center;
        color: ${textColor2};
        font-weight: normal;
        font-size: 2.4rem;
    }

    a {
        all: none;
        text-decoration: none;
        text-align: right;
        color: ${textColor4} !important;
    }

    ${StyledLoginForm} {
        width: 100%;
        ${Input}, ${FieldSet} {
            width: 100%;
        }
        gap: 2rem;
    }
    ${Button} {
        margin-top: 0.5rem;
        background: ${textColor3};
        border-radius: 1.6rem;
        width: 100%;
        padding: 1.6rem;
        font-size: 1.8rem;
    }
`

export default function LoginPage() {
    return (
        <StyledLoginPage>
            <StyledLoginCard>
                <h2>Login</h2>
                <LoginForm>
                    <Link to={"/register"}>Dont have an account?</Link>
                    <Button type="submit">Login</Button>
                </LoginForm>
            </StyledLoginCard>
        </StyledLoginPage>
    )
}
