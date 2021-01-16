import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { category, categoryVariables } from "../../api-types/category";
import { ListFooter } from "../../components/list-footer";
import { Restaurant } from "../../components/restaurant";
import { TopSearch } from "../../components/top-search";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      success
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const params = useParams<ICategoryParams>();
  const [page, setPage] = useState(1);

  const onNextPageClick = () => setPage(current => current + 1);
  const onPrevPageClick = () => setPage(current => current - 1);

  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );

  return (
    <div>
      <Helmet>
        <title>{params.slug} | Nuber Eats</title>
      </Helmet>
      <TopSearch />
      <div className="pb-20 px-5 lg:px-16 mx-auto mt-2">
        <div className="flex space-x-1 lg:space-x-5 items-center py-3 md:pt-7 w-full border-b">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cover max-w-full"
            style={{
              backgroundImage: `url(${data?.category.category?.coverImage})`,
            }}
          ></div>
          <span className="text-xl md:text-2xl text-center font-uber font-bold">
            {data?.category.category?.name} delivery for you
          </span>
        </div>
        {!loading && (
          <div className="py-3 md:py-7">
            <span className="text-xl md:text-2xl font-uber font-bold">
              {data?.category.totalResults} Restaurants
            </span>
            <div className="grid md:grid-cols-3 gap-x-7 gap-y-10 mt-7">
              {data?.category.restaurants?.map(restaurant => (
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
              totalPages={data?.category.totalPages || 1}
              onNextPageClick={onNextPageClick}
              onPrevPageClick={onPrevPageClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
