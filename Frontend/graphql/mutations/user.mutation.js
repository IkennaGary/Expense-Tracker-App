import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation SignUp($input: signUpInput!) {
    signUp(input: $input) {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignIn($input: signInInput!) {
    signIn(input: $input) {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
