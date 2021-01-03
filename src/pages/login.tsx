import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  loginMutation,
  loginMutationVariables,
} from "../api-types/loginMutation";
import nuberLogo from "../images/logo.svg";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { isLoggedInVar } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      success
      token
      error
    }
  }
`;

interface ILoginform {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ILoginform>({
    mode: "onChange",
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { success, token },
    } = data;
    if (success) {
      console.log(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({ variables: { loginInput: { email, password } } });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-8 md:mt-24 lg:mt-24">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={nuberLogo} alt="nuber logo" className="w-48 mb-10" />
        <h4 className="w-full font-medium text-2xl mb-5">Welcome Back!</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 my-5 w-full"
        >
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <input
            ref={register({ required: "Password is required", minLength: 8 })}
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 8 characters" />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log In"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
