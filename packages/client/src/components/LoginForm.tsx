import useLoginForm from "@/hooks/useLoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginForm(props: { children?: any }) {
  const nav = useNavigate();

  const {
    form: {
      onSubmit,
      register,
      formState: { errors },
    },
    loading,
    error,
  } = useLoginForm(() => nav("/"));

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label>Email</label>
        <input type="email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </fieldset>
      <p>{error.value}</p>
      {props.children}
    </form>
  );
}
