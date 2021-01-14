import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../api-types/restaurantsPageQuery";
import { Button } from "../../components/button";
import { Categories } from "../../components/categories";
import { Restaurant } from "../../components/restaurant";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      success
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      success
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onNextPageClick = () => setPage(current => current + 1);
  const onPrevPageClick = () => setPage(current => current - 1);

  return (
    <div>
      <div className="bg-yellow-100 relative flex overflow-hidden h-96 z-0 w-full">
        <img
          alt="Foods on left"
          src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/c7e1c939303e270185f0e891858e04ee.svg"
          className="h-full w-1/2 object-cover flex-none"
        />
        <form className="flex-auto flex -mx-52 md:-mx-72 items-center justify-center">
          <input
            type="Search"
            className="input rounded-md border-0 w-full"
            placeholder="Search restaurants"
          />
        </form>
        <img
          alt="Foods on right"
          src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/27ec7839cfd96d0aae01e6c442741e2c.svg"
          className="h-full w-1/2 object-cover flex-none"
        />
      </div>
      {!loading && (
        <div className="pb-20 w-full px-5 xl:px-1 max-w-7xl mx-auto mt-8">
          <div className="flex justify-around mx-auto">
            <Categories />
          </div>
          <div className="grid md:grid-cols-3 gap-x-7 gap-y-10 mt-14">
            {data?.restaurants.results?.map(restaurant => (
              <Restaurant
                id={restaurant.id + ""}
                coverImage={restaurant.coverImage}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md mt-10 items-center mx-auto">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="font-medium text-2xl focus:outline-none"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="font-medium text-2xl focus:outline-none"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
