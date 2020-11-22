/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryAllUsers
// ====================================================

export interface QueryAllUsers_users {
  __typename: "User";
  id: string;
  name: string;
  age: number | null;
  email: string;
}

export interface QueryAllUsers {
  users: QueryAllUsers_users[];
}
