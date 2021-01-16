import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
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
          {`Order ${data?.restaurant.restaurant?.name} Delivery | Nuber Eats`}
        </title>
      </Helmet>
      <div
        className="bg-gray-500 bg-center bg-cover h-64 grid grid-rows-2"
        style={{
          backgroundImage: `linear-gradient(transparent, rgba(38, 38, 38, 0.6)), url(${data?.restaurant.restaurant?.coverImage})`,
        }}
      >
        <div></div>
        <div className="flex items-center">
          <h4 className="px-5 lg:px-16 font-uber-bold text-4xl text-white">
            {data?.restaurant.restaurant?.name}
          </h4>
        </div>
      </div>
      <div className="px-5 py-5 lg:px-16 space-y-3">
        <div className="font-uber text-sm text-gray-600">
          <Link
            to={`/category/${data?.restaurant.restaurant?.category?.slug}`}
            className="hover:underline"
          >
            {data?.restaurant.restaurant?.category?.name}
          </Link>
        </div>
        <div className="font-uber text-sm">
          {data?.restaurant.restaurant?.address}
        </div>
      </div>
    </div>
  );
};
