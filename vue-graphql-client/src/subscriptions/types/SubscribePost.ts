/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribePost
// ====================================================

export interface SubscribePost_post_author {
  __typename: "User";
  name: string;
}

export interface SubscribePost_post_comments_author {
  __typename: "User";
  name: string;
}

export interface SubscribePost_post_comments {
  __typename: "Comment";
  text: string;
  author: SubscribePost_post_comments_author;
}

export interface SubscribePost_post {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  author: SubscribePost_post_author;
  comments: SubscribePost_post_comments[];
}

export interface SubscribePost {
  post: SubscribePost_post;
}
