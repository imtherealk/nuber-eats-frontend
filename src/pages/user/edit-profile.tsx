import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../../api-types/editProfileMutation";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { useMe } from "../../hooks/useMe";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      success
      error
    }
  }
`;

interface IEditProfileform {
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export const EditProfile = () => {
  const client = useApolloClient();

  const { data: userData } = useMe();
  const onCompleted = (data: editProfileMutation) => {
    const {
      editProfile: { success },
    } = data;
    if (success && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: { email: newEmail, verified: false },
        });
      }
    }
  };
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState,
    watch,
    errors,
  } = useForm<IEditProfileform>({
    mode: "onChange",
  });
  const watchFields = watch();

  const [
    editProfileMutation,
    { data: editProfileMutationResult, loading },
  ] = useMutation<editProfileMutation, editProfileMutationVariables>(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      if (email !== userData?.me.email || password !== "") {
        editProfileMutation({
          variables: {
            editProfileInput: {
              ...(email !== userData?.me.email && { email }),
              ...(password !== "" && { password }),
            },
          },
        });
      }
    }
  };
  useEffect(() => {
    setValue("email", userData?.me.email, { shouldValidate: true });
    setValue("password", "", { shouldValidate: true });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 my-5 w-full"
      >
        <input
          ref={register({
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          name="email"
          type="email"
          placeholder="email"
        />

        {errors.email?.type === "pattern" && (
          <FormError errorMessage={"Please enter a valid email"} />
        )}
        <input
          ref={register({
            minLength: 8,
          })}
          className="input"
          name="password"
          type="password"
          placeholder="password"
        />

        {errors.password?.type === "minLength" && (
          <FormError errorMessage="Password must be more than 8 characters" />
        )}
        <input
          ref={register({
            validate: {
              match: value => value === getValues("password"),
            },
          })}
          className="input"
          name="passwordConfirm"
          type="password"
          placeholder="Retype password"
        />
        {errors.passwordConfirm?.type === "match" && (
          <FormError errorMessage="Passwords do not match" />
        )}
        <Button
          loading={loading}
          canClick={
            (watchFields.password !== "" ||
              watchFields.email !== userData?.me.email) &&
            formState.isValid
          }
          actionText="Edit Profile"
        />

        {editProfileMutationResult?.editProfile.error && (
          <FormError
            errorMessage={editProfileMutationResult.editProfile.error}
          />
        )}
      </form>
    </div>
  );
};
