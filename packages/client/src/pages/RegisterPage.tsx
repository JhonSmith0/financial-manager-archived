import RegisterForm from "@/components/RegisterForm";
import {Link} from 'react-router-dom'

export default function RegisterPage() {
  return (
    <>
      <RegisterForm>
        <p>Already have an account? <Link to={"/login"}>log-in here</Link></p>
        <button type="submit">Register</button>
      </RegisterForm>
    </>
  );
}
