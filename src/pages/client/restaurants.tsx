import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../api-types/restaurantsPageQuery";
import { Categories } from "../../components/categories";
import { ListFooter } from "../../components/list-footer";
import { Restaurant } from "../../components/restaurant";
import { TopSearch } from "../../components/top-search";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      success
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      success
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

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

  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <TopSearch />
      {!loading && (
        <div className="pb-20 w-full px-5 xl:px-1 max-w-7xl mx-auto mt-8">
          <div className="grid grid-cols-6 lg:grid-cols-12  justify-around mx-auto">
            <Categories />
          </div>
          <div className="grid md:grid-cols-3 gap-x-7 gap-y-10 mt-14">
            {data?.restaurants.results?.map(restaurant => (
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
            totalPages={data?.restaurants.totalPages || 1}
            onNextPageClick={onNextPageClick}
            onPrevPageClick={onPrevPageClick}
          />
        </div>
      )}
    </div>
  );
};
