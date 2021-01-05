import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../api-types/restaurantsPageQuery";

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

  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input rounded-md border-0 w-4/12"
          placeholder="Search restaurants"
        />
      </form>
      {!loading && (
        <div className="w-full  px-5 xl:px-1 max-w-7xl mx-auto mt-8">
          <div className="flex justify-around">
            {data?.allCategories.categories?.map(category => (
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full bg-cover hover:bg-gray-100 cursor-pointer max-w-full"
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className="text-sm text-center font-medium mt-1">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
