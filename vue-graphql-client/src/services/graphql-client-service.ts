/* tslint:disable */
/* eslint-disable */
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import {
  HttpLink,
  split,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  FetchResult
} from 'apollo-boost';
import { OperationDefinitionNode } from 'graphql';
import { getMainDefinition } from 'apollo-utilities';
import { QueryAllUsers } from '@/queries/types/QueryAllUsers';
import * as userQueries from './../queries/users';
import * as postQueries from './../queries/posts';
import { QueryAllPosts } from '@/queries/types/QueryAllPosts';
import {
  subscribeCount,
  subscribePost,
  subscribeComment,
  subscribeUser
} from '../subscriptions/subscription';
import { SubscribeCount } from '@/subscriptions/types/SubscribeCount';
import { SubscribePost } from '@/subscriptions/types/SubscribePost';
import {createUser_createUser} from '@/queries/types/createUser';
import { updateUser_updateUser } from '@/queries/types/updateUser';
import { deleteUser_deleteUser } from '@/queries/types/deleteUser';
import { SubscribeComment } from '@/subscriptions/types/SubscribeComment';
import { SubscribeUser } from '@/subscriptions/types/SubscribeUser';

export class GraphQLClientService {
  private _apolloClient!: ApolloClient<NormalizedCacheObject>;

  private _setUpClient() {
    const httpLink = new HttpLink({
      uri: 'http://localhost:4000'
    });
    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:4000',
      options: {
        reconnect: true
      }
    });
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(
          query
        ) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    this._apolloClient = new ApolloClient({
      link,
      cache: new InMemoryCache()
    });
  }

  constructor() {
    if (!this._apolloClient) {
      this._setUpClient();
    }
  }

  queryAllUsers(): Promise<QueryAllUsers> {
    return this._apolloClient
      .query({
        query: userQueries.getUsers
      })
      .then(response => {
        return response.data;
      });
  }

  queryAllPost(): Promise<QueryAllPosts> {
    return this._apolloClient
      .query({
        query: postQueries.getPosts
      })
      .then(response => {
        return response.data;
      });
  }

  addUser(newuser: userQueries.User): Promise<createUser_createUser> {
    return this._apolloClient
      .mutate({
        mutation: userQueries.createUser,
        variables: {
          data: newuser
        }
      })
      .then(response => {
        return response.data;
      });
  }

  updateUser(
    id: string,
    edituser: userQueries.User
  ): Promise<updateUser_updateUser> {
    return this._apolloClient
      .mutate({
        mutation: userQueries.updateUser,
        variables: {
          id: id,
          data: edituser
        }
      })
      .then(response => {
        return response.data;
      });
  }

  deleteUser(id: string): Promise<deleteUser_deleteUser> {
    return this._apolloClient
      .mutate({
        mutation: userQueries.deleteUser,
        variables: {
          id: id
        }
      })
      .then(response => {
        return response.data;
      });
  }

  subscribeCount(): Observable<FetchResult<SubscribeCount>> {
    return this._apolloClient.subscribe({
      query: subscribeCount
    });
  }

  subscribeUser(): Observable<FetchResult<SubscribeUser>> {
    return this._apolloClient.subscribe({
      query: subscribeUser
    });
  }

  subscribePost(): Observable<FetchResult<SubscribePost>> {
    return this._apolloClient.subscribe({
      query: subscribePost
    });
  }

  subscribeComment(): Observable<FetchResult<SubscribeComment>> {
    return this._apolloClient.subscribe({
      query: subscribeComment
    });
  }
}
