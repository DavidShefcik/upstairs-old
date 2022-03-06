import { gql } from "@apollo/client";

export const CURRENT_USER_FRAGMENT = gql`
  fragment CurrentUser on User {
    id
    email
    firstName
    lastName
    fullName
  }
`;
