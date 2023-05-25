import useLoginForm from "@/hooks/useLoginForm";
import { useHookstate } from "@hookstate/core";

export default function LoginForm(props: { children?: any }) {
  const {
    onSubmit,
    register,
    formState: { errors },
  } = useLoginForm(onError);

  const error = useHookstate("");

  function onError(message: string) {
    error.set(message);
  }

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
      {error.value && <p>{error.value}</p>}
      <button type="submit">Login</button>
      {props.children}
    </form>
  );
}
