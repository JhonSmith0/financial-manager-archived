import useRegisterForm from "@/hooks/useRegisterForm";
import { IRegisterSchema } from "@/interface";
import { HTMLInputTypeAttribute, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm(props: { children?: any }) {
  const nav = useNavigate();

  const {
    form: {
      register,
      onSubmit,
      formState: { errors },
    },
    loading,
    error,
  } = useRegisterForm(() => nav("/"));

  const Input = useCallback(
    function Input({
      type,
      registerKey,
    }: {
      registerKey: keyof IRegisterSchema;
      type: HTMLInputTypeAttribute;
    }) {
      return (
        <>
          <input type={type} {...register(registerKey)} />
          <p>{errors[registerKey]?.message}</p>
        </>
      );
    },
    [errors, register]
  );

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <label>Email</label>
        <Input registerKey={"email"} type="email" />
      </fieldset>
      <fieldset>
        <label>Name</label>
        <Input registerKey={"name"} type="text" />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <Input registerKey={"password"} type="password" />
      </fieldset>
      <p>{error.value}</p>
      {props.children}
    </form>
  );
}
