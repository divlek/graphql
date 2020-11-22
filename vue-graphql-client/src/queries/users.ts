/* tslint:disable */
/* eslint-disable */
import gql from 'graphql-tag';

export const getUsers = gql`
  query QueryAllUsers {
    users {
      id
      name
      age
      email
    }
  }
`;

export const createUser = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      age
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
      age
    }
  }
`;

export interface User {
  id?: string;
  name: string;
  age?: number;
  email: string;
}
