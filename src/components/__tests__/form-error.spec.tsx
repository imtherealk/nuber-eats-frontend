import { render } from "../../test-utils";
import React from "react";
import { FormError } from "../form-error";

describe("<FormError />", () => {
  it("renders OK with props", () => {
    const { getByText } = render(<FormError errorMessage="test" />);
    getByText("test");
  });
});
