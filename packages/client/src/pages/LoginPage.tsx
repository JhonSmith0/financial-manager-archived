import LoginForm from "@/components/LoginForm";
import { StyledButton } from "@/components/styled";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <LoginForm>
        <p>
          Dont have an account? <Link to={"/register"}>register here</Link>{" "}
        </p>
        <StyledButton type="submit">Login</StyledButton>
      </LoginForm>
    </div>
  );
}

