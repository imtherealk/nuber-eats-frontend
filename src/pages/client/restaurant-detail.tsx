import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { restaurant, restaurantVariables } from "../../api-types/restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      success
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

export const RestaurantDetail = () => {
  const params = useParams<IRestaurantParams>();

  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    { variables: { input: { restaurantId: +params.id } } }
  );

  return (
    <div>
      <Helmet>
        <title>
          Order {data?.restaurant.restaurant?.name} Delivery | Nuber Eats
        </title>
      </Helmet>
      <h1>Restaurant</h1>
    </div>
  );
};
