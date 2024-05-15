import DB from "../dummyData/data.js";

export const transactionResolver = {
  Query: {
    // Get all transactions
    transactions: () => DB.transactions,
    // Get a single transaction
    transaction: (_, args) =>
      DB.transactions.find(
        (transaction) => transaction._id === args.transactionId
      ),
  },
  Mutation: {},
};
