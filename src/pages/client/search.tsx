import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../api-types/searchRestaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      success
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();

  const [queryReadyToStart, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, query] = location.search.split("?term=");

    if (!query) {
      return history.replace("/");
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location, queryReadyToStart]);

  console.log(loading, data, called);
  return (
    <h1>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      search page
    </h1>
  );
};
