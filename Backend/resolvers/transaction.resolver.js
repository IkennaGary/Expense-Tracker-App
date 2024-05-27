import Transaction from "../model/transaction.model.js";

export const transactionResolver = {
  Query: {
    transactions: async (_, args, context) => {
      try {
        const user = await context.getUser();
        if (!user) throw new Error("Unauthorized request");
        const transactions = await Transaction.find({ userId: user._id });
        return transactions;
      } catch (error) {
        console.log(`Error getting all transactions: ${error}`);
        throw new Error(error.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        if (!transactionId) {
          throw new Error("Transaction id is required");
        }
        const user = await context.getUser();
        if (!user) throw new Error("Unauthorized request");
        const transaction = await Transaction.findById({
          userId: user._id,
          _id: transactionId,
        });
        return transaction;
      } catch (error) {
        console.log(`Error getting transaction: ${error}`);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      const { description, paymentType, category, amount, location, date } =
        input;
      try {
        if (!description || !paymentType || !category || !amount || !date) {
          throw new Error("All fields are required");
        }

        const user = await context.getUser();
        if (!user) throw new Error("Unauthorized request");
        const newTransaction = new Transaction({
          userId: user._id,
          description,
          paymentType,
          category,
          amount,
          location,
          date,
        });

        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.log(`Error creating transaction: ${error}`);
        throw new Error(error.message || "Internal server error");
      }
    },
    updateTransaction: async (_, { transactionId, input }, context) => {
      try {
        if (!transactionId) {
          throw new Error("Transaction id is required");
        }
        const user = await context.getUser();
        if (!user) throw new Error("Unauthorized request");
        const transactionExist = await Transaction.findById({
          _id: transactionId,
        });
        if (!transactionExist) {
          throw new Error("Transaction does not exist");
        }
        const transaction = await Transaction.findByIdAndUpdate(
          { userId: user._id, _id: transactionId },
          input,
          { new: true }
        );
        console.log("Transaction", transaction);
        return {
          success: true,
          message: "Transaction successfully updated",
        };
      } catch (error) {
        console.log(`Error updtating transaction: ${error.message}`);
        throw new Error(error.message || "Internal server error");
      }
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        if (!transactionId) {
          throw new Error("Transaction id is required");
        }
        const transactionExist = await Transaction.findOne({
          _id: transactionId,
        });
        if (!transactionExist) {
          throw new Error("Transaction does not exist");
        }
        const user = await context.getUser();
        if (!user) throw new Error("Unauthorized request");
        await Transaction.deleteOne({
          userId: user._id,
          _id: transactionId,
        });
        return {
          success: true,
          message: "Transaction successfully deleted",
        };
      } catch (error) {
        console.log(`Error deleting transaction: ${error}`);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};
