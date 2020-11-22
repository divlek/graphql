import gql from 'graphql-tag';

export const getPosts = gql`
  query QueryAllPosts {
    posts {
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
