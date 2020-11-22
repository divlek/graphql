import gql from 'graphql-tag';

export const subscribeCount = gql`
  subscription SubscribeCount {
    count
  }
`;

export const subscribeUser = gql`
  subscription SubscribeUser {
    user {
      id
      name
      age
      email
    }
  }
`;

export const subscribePost = gql`
  subscription SubscribePost {
    post {
      id
      title
      body
      author {
        name
      }
      comments {
        text
        author {
          name
        }
      }
    }
  }
`;

export const subscribeComment = gql`
  subscription SubscribeComment {
    comment(postId: "10") {
      text
      author {
        id
        name
      }
    }
  }
`;
