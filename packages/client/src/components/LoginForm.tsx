import useLoginForm from "@/hooks/useLoginForm";

export default function LoginForm(props: { children?: any }) {
  const { onSubmit, register, formState: {errors} } = useLoginForm();

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
      <button type="submit">Login</button>
      {props.children}
    </form>
  );
}
