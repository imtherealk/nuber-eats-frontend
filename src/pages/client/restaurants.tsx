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
      <div className="relative">
        <div className="bg-yellow-400 h-screen flex overflow-hidden">
          <img
            alt="Foods on left"
            src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f54fdfb464db5da7c42e62c735bdf8f1.svg"
            className="h-full object-cover flex-none"
          />
          <div className="flex-auto"></div>
          <img
            alt="Foods on right"
            src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/bab80ef67bbbc99f2b7d45cfc395eb1b.svg"
            className="h-full object-cover flex-none"
          />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center text-black">
          <div className="w-full px-5 xl:px-1 max-w-7xl mx-auto my-0 box-border">
            <h1 className="m-0 text-5xl font-semibold mb-10">
              Eat what you like
            </h1>
            <form className="flex items-center">
              <input
                type="Search"
                className="input rounded-md border-0 w-8/12 md:w-6/12 mr-3"
                placeholder="Search restaurants"
              />
              <div>
                <Button actionText="Search" canClick={true} loading={false} />
              </div>
            </form>
          </div>
        </div>
      </div>
      {!loading && (
        <div className="pb-20 w-full px-5 xl:px-1 max-w-7xl mx-auto mt-8">
          <div className="flex justify-around mx-auto">
            <Categories />
          </div>
          <div className="grid grid-cols-3 gap-x-7 gap-y-10 mt-14">
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
