import RegisterForm from "@/components/RegisterForm";
import { StyledButton } from "@/components/styled";
import { Link } from "react-router-dom";

export default function RegisterPage() {
	return (
		<>
			<RegisterForm>
				<p>
          Already have an account? <Link to={"/login"}>log-in here</Link>
				</p>
				<StyledButton type="submit">Register</StyledButton>
			</RegisterForm>
		</>
	);
}

