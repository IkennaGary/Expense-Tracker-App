import { gql } from "@apollo/client";

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($input: createTransactionInput!) {
    createTransaction(input: $input) {
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $transactionId: ID!
    $input: updateTransactionInput
  ) {
    updateTransaction(transactionId: $transactionId, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      success
      message
    }
  }
`;
