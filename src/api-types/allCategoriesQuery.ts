/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allCategoriesQuery
// ====================================================

export interface allCategoriesQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface allCategoriesQuery_allCategories {
  __typename: "AllCategoriesOutput";
  success: boolean;
  error: string | null;
  categories: allCategoriesQuery_allCategories_categories[] | null;
}

export interface allCategoriesQuery {
  allCategories: allCategoriesQuery_allCategories;
}
