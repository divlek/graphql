import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import * as userQueries from './queries/users';
import * as postQueries from './queries/posts';
import { QueryAllUsers_users } from './queries/types/QueryAllUsers';
import { QueryAllPosts_posts } from './queries/types/QueryAllPosts';
import { subscribePost, subscribeCount } from './subscriptions/subscription';
import { SubscribePost_post } from './subscriptions/types/SubscribePost';
import { SubscribeCount } from './subscriptions/types/SubscribeCount';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = (getMainDefinition(
      query
    ) as any) as OperationDefinitionNode;
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

// const client = new ApolloClient({
//   uri: 'http://localhost:4000'
// });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

client
  .query({
    query: userQueries.getUsers
  })
  .then(response => {
    console.log(response.data);
    let html = ``;
    response.data.users.forEach((user: QueryAllUsers_users) => {
      html += `
        <div>
            <h3>${user.name}</h3>
        </div>
        `;
    });

    document.querySelector('#users')!.innerHTML = html;
  });

client
  .query({
    query: postQueries.getPosts
  })
  .then(response => {
    console.log(response.data);
    let html = ``;
    response.data.posts.forEach((post: QueryAllPosts_posts) => {
      html += `
        <div>
            <h3>${post.title} - ${post.body} - ${post.author.name}</h3>
        </div>
        `;
    });

    document.querySelector('#posts')!.innerHTML = html;
  });

client
  .mutate({
    mutation: userQueries.createUser,
    variables: {
      data: {
        name: 'Mukund',
        age: 8,
        email: 'mmknd@gmail.com'
      }
    }
  })
  .then(response => {
    const createdUser = response.data.createUser;
    document.querySelector(
      '#newUser'
    )!.innerHTML = `<div> ${createdUser.name}, ${createdUser.email}</div>`;
  })
  .catch((error: Error) => {
    debugger;
    document.querySelector(
      '#newUser'
    )!.innerHTML = `<div> User not created. Error ${error?.message} </div>`;
  });

client
  .subscribe({
    query: subscribeCount
  })
  .subscribe(result => {
    console.log(result?.data?.count);
    const data: SubscribeCount = result.data;
    document.querySelector(
      '#counter'
    )!.innerHTML = `<div> ${data.count} </div>`;
  });

client
  .subscribe({
    query: subscribePost
  })
  .subscribe(result => {
    const post: SubscribePost_post = result.data.post;
    document.querySelector('#newPost')!.innerHTML = `<div> ${JSON.stringify(
      post
    )} </div>`;
  });
