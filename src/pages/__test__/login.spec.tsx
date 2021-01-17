import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import { Login, LOGIN_MUTATION } from "../login";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });
  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });
  it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@fail");
    });
    const emailValidError = getByRole("alert");

    expect(emailValidError).toHaveTextContent(/Please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    const emailRequiredError = getByRole("alert");
    expect(emailRequiredError).toHaveTextContent(/Email is required/i);
  });
  it("displays password validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitButton = getByRole("button");

    await waitFor(() => {
      userEvent.type(email, "this@ok.com");
      userEvent.type(password, "short");
    });
    const passwordValidError = getByRole("alert");
    expect(passwordValidError).toHaveTextContent(
      /Password must be more than 8 characters/i
    );
    await waitFor(() => {
      userEvent.clear(password);
      userEvent.click(submitButton);
    });
    const passwordRequiredError = getByRole("alert");
    expect(passwordRequiredError).toHaveTextContent(/Password is required/i);
  });
  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitButton = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "11111111",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: { success: true, token: "xxx", error: "mutation-error" },
      },
    });

    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitButton);
    });

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    const mutationError = getByRole("alert");
    expect(mutationError).toHaveTextContent("mutation-error");
    expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "xxx");
  });
});
