import { gql, useQuery } from "@apollo/client";
import { allCategoriesQuery } from "../api-types/allCategoriesQuery";

const ALL_CATEGORIES_QUERY = gql`
  query allCategoriesQuery {
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
  }
`;

export const useAllCategories = () => {
  return useQuery<allCategoriesQuery>(ALL_CATEGORIES_QUERY);
};
