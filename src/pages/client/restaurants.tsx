import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../api-types/restaurantsPageQuery";
import { Button } from "../../components/button";
import { Categories } from "../../components/categories";

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
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);

  return (
    <div>
      <div className="relative">
        <div className="bg-yellow-400 h-screen flex overflow-hidden">
          <img
            alt="Hungry? You're in the right place"
            src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f54fdfb464db5da7c42e62c735bdf8f1.svg"
            className="h-full object-cover flex-none"
          />
          <div
            className="flex-auto"
            // style={{ flexBasis: "auto" }}
          ></div>
          <img
            alt="Hungry? You're in the right place"
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
        <div className="w-full px-5 xl:px-1 max-w-7xl mx-auto mt-8">
          <div className="flex justify-around">
            <Categories />
          </div>
          <div className="grid grid-cols-3 gap-x-7 gap-y-10 mt-10">
            {data?.restaurants.results?.map(restaurant => (
              <div>
                <div
                  className="bg-cover bg-center bg-red-500 py-24 mb-3"
                  style={{ backgroundImage: `url(${restaurant.coverImage})` }}
                ></div>
                <h3 className="text-lg font-medium">{restaurant.name}</h3>
                <span>{restaurant.category?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
