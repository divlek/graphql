/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  age: number | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser;
}

export interface deleteUserVariables {
  id: string;
}
