/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  age: number | null;
}

export interface updateUser {
  updateUser: updateUser_updateUser;
}

export interface updateUserVariables {
  id: string;
  data: UpdateUserInput;
}
