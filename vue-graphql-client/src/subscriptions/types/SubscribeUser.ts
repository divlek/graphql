/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeUser
// ====================================================

export interface SubscribeUser_user {
  __typename: "User";
  id: string;
  name: string;
  age: number | null;
  email: string;
}

export interface SubscribeUser {
  user: SubscribeUser_user;
}
