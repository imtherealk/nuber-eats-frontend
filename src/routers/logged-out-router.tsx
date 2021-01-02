import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

interface IForm {
  email: string;
  password: string;
}
export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch());
  };

  const onInvalid = () => {
    console.log(errors);
    console.log("cannot create account");
  };
  return (
    <div>
      <h1>Logged Out</h1>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: "This is required",
              validate: {
                gmail: (email: string) => email.includes("@gmail.com"),
              },
            })}
            name="email"
            type="email"
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="font-bold text-red-600">
              {errors.email?.message}
            </span>
          )}
          {errors.email?.type === "gmail" && (
            <span className="font-bold text-red-600">Use gmail</span>
          )}
        </div>
        <div>
          <input
            ref={register({
              required: "This is required",
            })}
            name="password"
            type="password"
            placeholder="password"
          />
          {errors.password?.message && (
            <span className="font-bold text-red-600">
              {errors.password?.message}
            </span>
          )}
        </div>
        <button className="bg-yellow-300 text-white">submit</button>
      </form>
    </div>
  );
};
