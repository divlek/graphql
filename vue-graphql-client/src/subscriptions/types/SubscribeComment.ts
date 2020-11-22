/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeComment
// ====================================================

export interface SubscribeComment_comment_author {
  __typename: "User";
  id: string;
  name: string;
}

export interface SubscribeComment_comment {
  __typename: "Comment";
  text: string;
  author: SubscribeComment_comment_author;
}

export interface SubscribeComment {
  comment: SubscribeComment_comment;
}
