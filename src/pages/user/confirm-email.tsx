import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  verifyEmailMutation,
  verifyEmailMutationVariables,
} from "../../api-types/verifyEmailMutation";
import { useMe } from "../../hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailMutation($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      success
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  // const [isMounted, setIsMounted] = useState(true);

  const onCompleted = (data: verifyEmailMutation) => {
    console.log("complete");
    const {
      verifyEmail: { success },
    } = data;
    if (success) {
      if (userData?.me.id) {
        client.writeFragment({
          id: `User:${userData.me.id}`,
          fragment: gql`
            fragment VerifiedUser on User {
              verified
            }
          `,
          data: { verified: true },
        });
      }
      alert("Your account is now active");
    } else {
      alert("Verification code is invalid");
    }
    console.log("history push");
    history.push("/");
  };

  const [
    verifyEmailMutation,
    { data: verifyEmailMutationResults, loading: verifyingEmail },
  ] = useMutation<verifyEmailMutation, verifyEmailMutationVariables>(
    VERIFY_EMAIL_MUTATION,
    { onCompleted }
  );

  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // setIsMounted(true);
    const [_, code] = window.location.href.split("code=");

    verifyEmailMutation({
      variables: { verifyEmailInput: { code } },
    });

    console.log("mutation");

    return () => {
      console.log("unmounted");
      setIsUnmounted(true);
    };
  }, [verifyEmailMutation]);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-2 font-medium">Confirming email</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page.
      </h4>
    </div>
  );
};
