import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm();
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
              validate: (email: string) => email.includes("@gmail.com"),
            })}
            name="email"
            type="email"
            placeholder="email"
          />
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
        </div>
        <button className="bg-yellow-300 text-white">submit</button>
      </form>
    </div>
  );
};
