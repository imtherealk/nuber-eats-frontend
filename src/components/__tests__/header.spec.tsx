import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "../../test-utils";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ME_QUERY } from "../../hooks/useMe";
import { Header } from "../header";

describe("<Header />", () => {
  it("renders verify banner", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Header />
        </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 0));

      getByText("Please verify your email.");
    });
  });
  it("renders without verify banner", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(queryByText("Please verify your email.")).toBeNull();
    });
  });
  it("renders fixed header on scroll", async () => {
    await waitFor(async () => {
      const { getByTestId } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      await new Promise(resolve => setTimeout(resolve, 0));
      fireEvent.scroll(window, { target: { pageYOffset: 300 } });
      expect(getByTestId("main-header")).toHaveStyle({ position: "fixed" });
      fireEvent.scroll(window, { target: { pageYOffset: 0 } });
      expect(getByTestId("main-header")).toHaveStyle({ position: "static" });
    });
  });
});
