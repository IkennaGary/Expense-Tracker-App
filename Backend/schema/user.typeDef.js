export const userTypeDef = `#graphql

    type User {
        _id: ID!
        username: String!
        name: String!
        password:  String!
        profilePicture: String
        gender: String!
    }

    type Query {
        authUser: User
        user(userId: ID!): User
    }

    type Mutation {
        signUp(input: signUpInput): User
        signIn(input: signInInput): User
        logout: LogoutResponse
    }

    input signUpInput {
        username: String!
        name: String!
        password:  String!
        gender: String!
    }

    input signInInput {
        username: String!
        password:  String!
    }

    type LogoutResponse {
        message: String!
    }
`;
