import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <LoginForm>
        <p>
          Dont have an account? <Link to={"/register"}>register here</Link>{" "}
        </p>
        <button type="submit">Login</button>
      </LoginForm>
    </div>
  );
}
