import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../api-types/searchRestaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { TopSearch } from "../../components/top-search";
import { Restaurant } from "../../components/restaurant";
import { ListFooter } from "../../components/list-footer";

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

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const onNextPageClick = () => setPage(current => current + 1);
  const onPrevPageClick = () => setPage(current => current - 1);

  const [queryReadyToStart, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    const [_, query] = location.search.split("?term=");

    if (!query) {
      return history.replace("/");
    }
    setQuery(query);
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location, queryReadyToStart]);

  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <TopSearch />
      <div className="pb-20 w-full px-5 xl:px-1 max-w-7xl mx-auto mt-8">
        <div className="flex space-x-5 items-center h-36 w-full border-b">
          <span className="text-3xl text-center font-uber font-bold">
            "{query}"
          </span>
        </div>
        {!loading && (
          <div className="py-7">
            <span className="text-3xl font-uber font-bold">
              {data?.searchRestaurant.totalResults} Restaurants
            </span>
            <div className="grid md:grid-cols-3 gap-x-7 gap-y-10 mt-7">
              {data?.searchRestaurant.restaurants?.map(restaurant => (
                <Restaurant
                  key={restaurant.id}
                  id={restaurant.id + ""}
                  coverImage={restaurant.coverImage}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
            <ListFooter
              page={page}
              totalPages={data?.searchRestaurant.totalPages || 1}
              onNextPageClick={onNextPageClick}
              onPrevPageClick={onPrevPageClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
