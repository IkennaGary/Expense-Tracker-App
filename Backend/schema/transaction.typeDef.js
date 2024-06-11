export const transactionTypeDef = `#graphql

    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String!
        user: User
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
        categoryStatistics: [CategoryStatistics!]
    }

    type Mutation {
        createTransaction(input: createTransactionInput ): Transaction!
        updateTransaction( transactionId: ID!, input: updateTransactionInput): UpdateTransactionResponse!
        deleteTransaction( transactionId: ID!): DeleteTransactionResponse!
    }

    type CategoryStatistics {
        category: String!
        totalAmount: Float!
    }

    input createTransactionInput {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String!
    }
    input updateTransactionInput {   
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }
    type DeleteTransactionResponse {
    success: Boolean!
    message: String!
    }
    type UpdateTransactionResponse {
    success: Boolean!
    message: String!
    }
`;
