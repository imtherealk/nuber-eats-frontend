import { render } from "../../test-utils";
import React from "react";
import { Restaurant } from "../restaurant";

describe("<Restaurant />", () => {
  it("renders OK with props", () => {
    const restaurantProps = {
      id: "1",
      name: "name",
      categoryName: "categoryName",
      coverImage: "x",
    };
    const { getByText, container } = render(
      <Restaurant {...restaurantProps} />
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurants/${restaurantProps.id}`
    );
  });
});
