/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryAllPosts
// ====================================================

export interface QueryAllPosts_posts_author {
  __typename: "User";
  name: string;
}

export interface QueryAllPosts_posts_comments_author {
  __typename: "User";
  name: string;
}

export interface QueryAllPosts_posts_comments {
  __typename: "Comment";
  text: string;
  author: QueryAllPosts_posts_comments_author;
}

export interface QueryAllPosts_posts {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  author: QueryAllPosts_posts_author;
  comments: QueryAllPosts_posts_comments[];
}

export interface QueryAllPosts {
  posts: QueryAllPosts_posts[];
}
